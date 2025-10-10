'use client';

import { motion } from 'framer-motion';
import { Layers, Database, Cpu, Network } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnrichedProject } from '@/lib/github';

interface ProjectTechDeepDiveProps {
  project: EnrichedProject;
}

export default function ProjectTechDeepDive({ project }: ProjectTechDeepDiveProps) {
  const techCategories = [
    {
      icon: Layers,
      title: 'Frontend',
      technologies: project.technologies?.filter(tech => 
        ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Tailwind CSS'].includes(tech)
      ) || [],
      color: 'text-blue-400'
    },
    {
      icon: Database,
      title: 'Backend',
      technologies: project.technologies?.filter(tech => 
        ['Node.js', 'Python', 'Express', 'FastAPI', 'MongoDB', 'Redis'].includes(tech)
      ) || [],
      color: 'text-green-400'
    },
    {
      icon: Cpu,
      title: 'DevOps',
      technologies: project.technologies?.filter(tech => 
        ['Docker', 'AWS', 'Git', 'CI/CD', 'Kubernetes'].includes(tech)
      ) || [],
      color: 'text-purple-400'
    },
    {
      icon: Network,
      title: 'Tools',
      technologies: project.technologies?.filter(tech => 
        ['Git', 'Webpack', 'Jest', 'Storybook', 'Figma'].includes(tech)
      ) || [],
      color: 'text-orange-400'
    }
  ];

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
          Tech Stack
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Technologies used
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-white/10 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={category.color}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  
                  {category.technologies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No {category.title.toLowerCase()} technologies specified
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Architecture Diagram Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="glass border-white/10">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4">Architecture Overview</h3>
            <div className="bg-white/5 rounded-lg p-8 text-center text-muted-foreground">
              <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Interactive architecture diagram will be added here</p>
              <p className="text-sm mt-2">This will show the system components and their relationships</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
