'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, Lightbulb, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EnrichedProject } from '@/lib/github';

interface ProjectOutcomesProps {
  project: EnrichedProject;
}

export default function ProjectOutcomes({ project }: ProjectOutcomesProps) {
  const outcomes = [
    {
      icon: TrendingUp,
      title: 'Performance Impact',
      description: 'Significant improvements in user experience and system performance',
      color: 'text-green-400'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Positive feedback from users and the development community',
      color: 'text-yellow-400'
    },
    {
      icon: Lightbulb,
      title: 'Key Learnings',
      description: 'Valuable insights gained during the development process',
      color: 'text-blue-400'
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
          Outcomes
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Results and metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {outcomes.map((outcome, index) => {
          const Icon = outcome.icon;
          return (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass border-white/10 h-full">
                <CardContent className="p-6 text-center">
                  <div className={`${outcome.color} mb-4`}>
                    <Icon className="w-8 h-8 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{outcome.title}</h3>
                  <p className="text-muted-foreground text-sm">{outcome.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glass border-white/10 h-full">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">GitHub Stars</span>
                  <span className="font-semibold">{project.stargazers_count}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Forks</span>
                  <span className="font-semibold">{project.forks_count}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Repository Size</span>
                  <span className="font-semibold">{project.size} KB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-semibold">
                    {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Future Improvements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="glass border-white/10 h-full">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Future Improvements</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    Enhanced mobile responsiveness
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    Performance optimizations
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    Additional features and integrations
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">
                    Comprehensive test coverage
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Card className="glass border-white/10">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4">Check it out</h3>
            <p className="text-muted-foreground mb-6">
              View the code or try the live demo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {project.liveUrl && (
                <Button size="lg" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Try Live Demo
                  </a>
                </Button>
              )}
              <Button variant="outline" size="lg" asChild>
                <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                  View Source Code
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
