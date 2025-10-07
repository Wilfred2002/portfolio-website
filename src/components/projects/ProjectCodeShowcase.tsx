'use client';

import { motion } from 'framer-motion';
import { Code2, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { EnrichedProject } from '@/lib/github';

interface ProjectCodeShowcaseProps {
  project: EnrichedProject;
}

export default function ProjectCodeShowcase({ project }: ProjectCodeShowcaseProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Mock code snippets - in a real app, these would come from the project data
  const codeSnippets = [
    {
      language: 'typescript',
      title: 'Main Component',
      code: `import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onSelect 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold">{project.name}</h3>
      <p className="text-muted-foreground">{project.description}</p>
    </motion.div>
  );
};`
    },
    {
      language: 'javascript',
      title: 'API Integration',
      code: `async function fetchProjects() {
  try {
    const response = await fetch('/api/projects');
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export { fetchProjects };`
    },
    {
      language: 'css',
      title: 'Styling',
      code: `.project-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}`
    }
  ];

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

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
          Code Showcase
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A glimpse into the code that powers this project
        </p>
      </div>

      <div className="space-y-6">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-white/10">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <Code2 className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{snippet.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {snippet.language}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(snippet.code, index)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="p-4">
                  <pre className="text-sm text-muted-foreground overflow-x-auto">
                    <code className={`language-${snippet.language}`}>
                      {snippet.code}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
