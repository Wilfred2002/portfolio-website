'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { EnrichedProject } from '@/lib/github';

interface ProjectChallengeProps {
  project: EnrichedProject;
}

export default function ProjectChallenge({ project }: ProjectChallengeProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          The Challenge
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Understanding the problem and identifying the key challenges
        </p>
      </div>

      <Card className="glass border-white/10">
        <CardContent className="p-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Problem Statement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every great project starts with identifying a real problem that needs solving. 
                This project addressed several key challenges in the current landscape.
              </p>
            </div>
          </div>

          {project.challenges && project.challenges.length > 0 ? (
            <div className="space-y-4">
              {project.challenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-white/5"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-400/20 rounded-full flex items-center justify-center">
                    <span className="text-orange-400 text-sm font-semibold">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{challenge}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Challenge details will be added soon.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}
