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
    const cacheBuster = typeof window !== 'undefined' ? String(Date.now()) : '1';
    const frameUrl = (i: number) => `/frames/frame-${String(i).padStart(3, '0')}.jpg?v=${cacheBuster}`;

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
      drawFrame(1);
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

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
                  Hey, It&apos;s Wilfred, welcome to my portfolio.
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

      {/* Quick Navigation */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent via-background to-surface/50">
        {/* Decorative background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Explore More
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover my work, learn about my journey, or get in touch
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10"
        >
          <a href="https://github.com/wilfred2002?tab=repositories" target="_blank" rel="noopener noreferrer" className="group">
            <div className="glass rounded-xl border border-white/10 p-8 hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 hover:bg-white/5 hover:scale-105 h-full">
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <Github className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                Projects
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                View my repositories on GitHub.
              </p>
            </div>
          </a>

          <Link href="/about" className="group">
            <div className="glass rounded-xl border border-white/10 p-8 hover:border-secondary/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-secondary/20 hover:bg-white/5 hover:scale-105 h-full">
              <div className="text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                <Github className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors">
                About
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                My journey from computer science student to passionate full-stack developer.
              </p>
            </div>
          </Link>

          <Link href="/contact" className="group">
            <div className="glass rounded-xl border border-white/10 p-8 hover:border-accent/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/20 hover:bg-white/5 hover:scale-105 h-full">
              <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                <ExternalLink className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                Contact
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Let&apos;s connect! Open to opportunities, collaborations, and meaningful conversations.
              </p>
            </div>
          </Link>
        </motion.div>

      </section>
    </div>
  );
}
