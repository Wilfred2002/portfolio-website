'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroVariants } from '@/lib/animations';

export default function HomePageClient() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Hey, It's Wilfred, welcome to my porfolio.
          </p>
          
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
                Discover my full-stack applications, web tools, and innovative solutions.
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
                Let's connect! Open to opportunities, collaborations, and meaningful conversations.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
