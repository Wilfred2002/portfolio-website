'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroVariants } from '@/lib/animations';

export default function HomePageClient() {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef({ frame: 1 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({ target: canvasContainerRef, offset: ['start start', 'end end'] });
  const overlayOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);
  const overlayY = useTransform(scrollYProgress, [0.75, 1], [40, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, -20]);

  useEffect(() => {
    const totalFrames = 240;
    const frameUrl = (i: number) => `/frames/frame-${String(i).padStart(3, '0')}.jpg`;

    const loadImages = async () => {
      const loaded = await Promise.all(
        Array.from({ length: totalFrames }, (_, idx) => {
          const img = new Image();
          img.src = frameUrl(idx + 1);
          return new Promise<HTMLImageElement | null>((resolve) => {
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
          });
        })
      );
      imagesRef.current = loaded.filter(Boolean) as HTMLImageElement[];
    };

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[index - 1];
      if (!canvas || !img) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };

    loadImages().then(async () => {
      if (imagesRef.current.length === 0) {
        console.warn('No frames loaded');
        return;
      }
      drawFrame(1);
      
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const gsap = gsapModule.default || gsapModule;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

        if (typeof gsap.registerPlugin === 'function') {
          gsap.registerPlugin(ScrollTrigger);
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: canvasContainerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(frameRef.current, {
          frame: totalFrames,
          ease: 'none',
          onUpdate: () => drawFrame(Math.round(frameRef.current.frame)),
        });
      } catch (error) {
        console.error('GSAP initialization error:', error);
      }
    }).catch(error => {
      console.error('Frame loading error:', error);
    });

    const handleResize = () => drawFrame(Math.round(frameRef.current.frame));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Sticky canvas with hero overlay that fades in near the end */}
      <section ref={canvasContainerRef} className="relative h-[500vh] -mt-16">
        <div className="sticky top-0 h-screen">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
          {/* Intro line that shows at the very start, fades out as you scroll */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute inset-0 flex items-start pt-32"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Hey, It&apos;s Wilfred, scroll down!
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {
                      const e = new KeyboardEvent('keydown', { key: 'k', metaKey: navigator.platform.includes('Mac'), ctrlKey: !navigator.platform.includes('Mac') });
                      window.dispatchEvent(e);
                    }}
                  >
                    <Command className="w-4 h-4" />
                    <span>Open Command Palette</span>
                    <span className="ml-1 text-xs text-muted-foreground hidden sm:inline">(⌘K)</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{ opacity: overlayOpacity, y: overlayY }}
            className="absolute inset-0 flex items-center"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                className="text-center max-w-4xl mx-auto"
              >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-10">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Wilfred Naraga
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="group bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/50 hover:shadow-primary/60 transition-all px-10 py-7 text-xl font-bold ring-4 ring-primary/50 ring-offset-4 ring-offset-background hover:ring-primary/70 hover:scale-105">
              <Link href="/projects">
                Explore Projects
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/wilfred2002" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OpenSesame Creative Project Answers */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-semibold text-primary">OpenSesame Summer 2026 Internship</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Why OpenSesame?
            </h2>
          </motion.div>

          {/* Paragraph 1 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
          >
            I see OpenSesame fitting into my career as a pivotal point where I can experience working in a professional team environment. I can meet people with the same tech interests and career goals like myself. Also, because OpenSesame is an AI-forward team, it won&apos;t be very different from the workflow I use right now—I always leverage AI to develop features in half the time.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
          >
            I bring a founder perspective to the team. I think from the user experience all the way down to the core behind the app itself. I first think: how can I bring more value to the user, retain them, or what makes sense before building anything in the backend? I believe education is the future, and OpenSesame will be a key player in workforce development—I&apos;m confident I can ship new features that guarantee better user feedback.
          </motion.p>

          {/* Paragraph 3 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12"
          >
            What excites me about working with AI is how fast modern industry workflows change. Two years ago, I was prompting ChatGPT to get the code output I wanted. Now many engineers prompt ChatGPT to create a prompt for the Claude CLI to do their task. People have their own way of doing things, but it&apos;s cool to see how people leverage AI to build and ship faster.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button size="lg" asChild className="group">
              <Link href="/projects">
                View Projects
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                Get in Touch
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
