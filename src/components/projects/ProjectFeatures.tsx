'use client';

import { motion } from 'framer-motion';
import { Star, Zap, Shield, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnrichedProject } from '@/lib/github';

interface ProjectFeaturesProps {
  project: EnrichedProject;
}

export default function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const featureIcons = [Star, Zap, Shield, Users];
  
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
          Key Features
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The standout features that make this project unique and valuable
        </p>
      </div>

      {project.keyFeatures && project.keyFeatures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.keyFeatures.map((feature, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-white/10 h-full hover:border-white/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Feature {index + 1}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card className="glass border-white/10">
          <CardContent className="p-8 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">Feature details will be added soon.</p>
          </CardContent>
        </Card>
      )}

      {/* Screenshots Carousel Placeholder */}
      {project.screenshots && project.screenshots.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glass border-white/10">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Project Screenshots</h3>
              <div className="bg-white/5 rounded-lg p-8 text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Screenshot carousel will be implemented here</p>
                <p className="text-sm mt-2">This will showcase the project in action</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.section>
  );
}
