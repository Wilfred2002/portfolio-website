'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { staggerContainer, cardVariants } from '@/lib/animations';
import { EnrichedProject, filterProjects, sortProjects } from '@/lib/github';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: EnrichedProject[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [filters, setFilters] = useState({
    technologies: [] as string[],
    category: 'all' as 'all' | 'web-app' | 'library' | 'tool' | 'experiment',
    sortBy: 'recent' as 'recent' | 'stars' | 'complexity' | 'name',
    viewMode: 'grid' as 'grid' | 'list' | 'timeline',
    featured: null as boolean | null
  });

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply filters
    if (filters.technologies.length > 0) {
      filtered = filtered.filter(project =>
        filters.technologies.some(tech =>
          project.technologies?.includes(tech) ||
          project.topics.includes(tech.toLowerCase())
        )
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    if (filters.featured !== null) {
      filtered = filtered.filter(project => project.featured === filters.featured);
    }

    // Sort projects
    filtered = sortProjects(filtered, filters.sortBy);

    return filtered;
  }, [projects, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (filteredProjects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <div className="text-muted-foreground">
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p>Try adjusting your filters to see more projects.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grid Layout */}
      {filters.viewMode === 'grid' && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              size={getCardSize(project, index)}
            />
          ))}
        </motion.div>
      )}

      {/* List Layout */}
      {filters.viewMode === 'list' && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              className="glass rounded-xl border border-white/10 p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold">{project.displayName}</h3>
                    {project.featured && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Featured
                      </Badge>
                    )}
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 5).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies && project.technologies.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 5} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Timeline Layout */}
      {filters.viewMode === 'timeline' && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>
          
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                variants={cardVariants}
                className="relative flex items-start space-x-6"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 glass rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
                
                {/* Project content */}
                <div className="flex-1 glass rounded-xl border border-white/10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.displayName}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.featured && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.slice(0, 6).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stargazers_count}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Determine card size based on project properties and index
function getCardSize(project: EnrichedProject, index: number): 'small' | 'medium' | 'large' {
  // Featured projects get larger cards
  if (project.featured) {
    return index % 3 === 0 ? 'large' : 'medium';
  }
  
  // Complex projects get medium cards
  if (project.complexity === 'complex') {
    return 'medium';
  }
  
  // Default to small cards
  return 'small';
}
