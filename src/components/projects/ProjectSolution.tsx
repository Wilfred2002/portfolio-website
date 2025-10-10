'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Code2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { EnrichedProject } from '@/lib/github';

interface ProjectSolutionProps {
  project: EnrichedProject;
}

export default function ProjectSolution({ project }: ProjectSolutionProps) {
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
          Solution
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          How I solved it
        </p>
      </div>

      <Card className="glass border-white/10">
        <CardContent className="p-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                Implementation details.
              </p>
            </div>
          </div>

          {project.solutions && project.solutions.length > 0 ? (
            <div className="space-y-4">
              {project.solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 p-4 rounded-lg bg-white/5"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-muted-foreground">{solution}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Solution details will be added soon.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}
