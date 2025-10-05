'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Code, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EnrichedProject } from '@/lib/github';

interface ProjectOverviewProps {
  project: EnrichedProject;
}

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  const stats = [
    {
      icon: Calendar,
      label: 'Created',
      value: new Date(project.created_at).toLocaleDateString(),
      color: 'text-blue-400'
    },
    {
      icon: Clock,
      label: 'Last Updated',
      value: new Date(project.updated_at).toLocaleDateString(),
      color: 'text-green-400'
    },
    {
      icon: Code,
      label: 'Language',
      value: project.language || 'Mixed',
      color: 'text-purple-400'
    },
    {
      icon: Users,
      label: 'Forks',
      value: project.forks_count.toString(),
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
          Project Overview
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Quick facts and key information about this project
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                  <div className="text-2xl font-bold text-foreground mb-1">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glass border-white/10 h-full">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glass border-white/10 h-full">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
                {project.topics.map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-sm">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Architecture */}
      {project.architecture && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glass border-white/10">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Architecture</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.architecture}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.section>
  );
}
