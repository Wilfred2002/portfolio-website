'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Command, ChevronDown } from 'lucide-react';
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
                <div className="mt-6 flex items-center justify-center gap-3">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => {
                      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                    <span>Scroll down</span>
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Wilfred Naraga
            </span>
          </h1>
                {/* Intro line is shown at the start; we omit it here for the end reveal */}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" asChild className="group">
              <Link href="/projects">
                Explore Projects
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/wilfred2002" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">6+</div>
              <div className="text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">11+</div>
              <div className="text-muted-foreground">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">2+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/projects" className="group">
            <div className="glass rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
              <div className="text-primary mb-3">
                <ExternalLink className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                Discover my projects from GitHub.
              </p>
            </div>
          </Link>

          <Link href="/about" className="group">
            <div className="glass rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-secondary/10">
              <div className="text-secondary mb-3">
                <Github className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">
                About
              </h3>
              <p className="text-sm text-muted-foreground">
                My journey from computer science student to passionate full-stack developer.
              </p>
            </div>
          </Link>

          <Link href="/skills" className="group">
            <div className="glass rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent/10">
              <div className="text-accent mb-3">
                <ArrowRight className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                Skills
              </h3>
              <p className="text-sm text-muted-foreground">
                Explore my technical expertise in React, Node.js, Python, and modern web technologies.
              </p>
            </div>
          </Link>

          <Link href="/contact" className="group">
            <div className="glass rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
              <div className="text-primary mb-3">
                <ExternalLink className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                Contact
              </h3>
              <p className="text-sm text-muted-foreground">
                Let&apos;s connect! Open to opportunities, collaborations, and meaningful conversations.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
