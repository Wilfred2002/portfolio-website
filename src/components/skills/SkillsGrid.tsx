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
        <h2 className="text-3xl font-display font-bold mb-4">Skills by Category</h2>
        <p className="text-muted-foreground">
          Organized view of my technical skills and expertise
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
                <div className="space-y-3">
                  {technologies.map(tech => {
                    const skillData = Object.entries(skillsData).find(([key]) => key === tech);
                    const level = skillData ? skillData[1].level : 0;
                    
                    return (
                      <div key={tech} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{tech}</span>
                          <span className="text-xs text-muted-foreground">{level}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <motion.div 
                            className="bg-primary h-1.5 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
