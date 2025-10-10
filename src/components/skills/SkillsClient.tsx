'use client';

import { motion } from 'framer-motion';
import { heroVariants } from '@/lib/animations';
import dynamic from 'next/dynamic';
const SkillConstellation = dynamic(() => import('./SkillConstellation'), { ssr: false, loading: () => null });

export default function SkillsClient() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Skills
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Technologies I work with.
          </p>
        </div>

        {/* Interactive Constellation */}
        <div className="mb-20">
          <SkillConstellation />
        </div>
      </motion.section>
    </div>
  );
}
