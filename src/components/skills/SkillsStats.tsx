'use client';

import { motion } from 'framer-motion';
import { Code, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { skillsData } from '@/data/projects';

export default function SkillsStats() {
  const stats = [
    {
      icon: Code,
      label: 'Total Skills',
      value: Object.keys(skillsData).length,
      color: 'text-blue-400'
    },
    {
      icon: Star,
      label: 'Expert Level',
      value: Object.values(skillsData).filter(skill => skill.level >= 90).length,
      color: 'text-yellow-400'
    },
    {
      icon: TrendingUp,
      label: 'Advanced Level',
      value: Object.values(skillsData).filter(skill => skill.level >= 70 && skill.level < 90).length,
      color: 'text-green-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-white/10 hover:border-white/20 transition-colors">
              <CardContent className="p-6 text-center">
                <div className={`${stat.color} mb-3`}>
                  <Icon className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
