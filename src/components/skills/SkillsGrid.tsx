'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { skillsData, technologyCategories } from '@/data/projects';

export default function SkillsGrid() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-bold mb-4">By Category</h2>
        <p className="text-muted-foreground">
          Skills organized by area
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(technologyCategories).map(([category, technologies], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-white/10 h-full hover:border-white/20 transition-colors">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
