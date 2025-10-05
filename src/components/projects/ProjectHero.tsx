'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Calendar, GitBranch, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { heroVariants, typewriterVariants } from '@/lib/animations';
import { EnrichedProject } from '@/lib/github';

interface ProjectHeroProps {
  project: EnrichedProject;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const title = project.displayName;
    let index = 0;
    
    const typeWriter = () => {
      if (index < title.length) {
        setDisplayedTitle(title.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 100);
      } else {
        setIsTyping(false);
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, [project.displayName]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated code rain */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <div className="absolute inset-0 opacity-10">
          {/* Code rain effect */}
          <div className="code-rain">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-400 font-mono text-xs opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
                animate={{
                  y: [0, window.innerHeight + 100],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Project Thumbnail */}
        {project.thumbnail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden glass border border-white/10">
              <Image
                src={project.thumbnail}
                alt={`${project.displayName} hero image`}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        )}

        {/* Project Title with Typewriter Effect */}
        <motion.h1
          variants={typewriterVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {displayedTitle}
            {isTyping && <span className="animate-pulse">|</span>}
          </span>
        </motion.h1>

        {/* Project Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {project.detailedDescription || project.description}
        </motion.p>

        {/* Project Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <Badge variant="secondary" className="bg-primary/10 text-primary px-4 py-2">
            {project.category}
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            {project.complexity}
          </Badge>
          {project.language && (
            <Badge variant="outline" className="px-4 py-2">
              {project.language}
            </Badge>
          )}
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
        >
          <div className="glass rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-foreground">{project.stargazers_count}</div>
            <div className="text-sm text-muted-foreground">Stars</div>
          </div>
          
          <div className="glass rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-center mb-2">
              <GitBranch className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-foreground">{project.forks_count}</div>
            <div className="text-sm text-muted-foreground">Forks</div>
          </div>
          
          <div className="glass rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {new Date(project.updated_at).getFullYear()}
            </div>
            <div className="text-sm text-muted-foreground">Updated</div>
          </div>
          
          <div className="glass rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-center mb-2">
              <Eye className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-foreground">{project.size}</div>
            <div className="text-sm text-muted-foreground">Size (KB)</div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {project.liveUrl && (
            <Button size="lg" asChild className="group">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Live Demo
              </a>
            </Button>
          )}
          
          <Button variant="outline" size="lg" asChild className="group">
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              View Source Code
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/40 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
