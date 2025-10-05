'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Eye, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cardVariants } from '@/lib/animations';
import { EnrichedProject } from '@/lib/github';

interface ProjectCardProps {
  project: EnrichedProject;
  index: number;
  size: 'small' | 'medium' | 'large';
}

export default function ProjectCard({ project, index, size }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCardClasses = () => {
    const baseClasses = "relative group cursor-pointer overflow-hidden";
    
    switch (size) {
      case 'large':
        return `${baseClasses} md:col-span-2 md:row-span-2`;
      case 'medium':
        return `${baseClasses} md:col-span-1 md:row-span-2`;
      case 'small':
      default:
        return `${baseClasses} md:col-span-1 md:row-span-1`;
    }
  };

  const getContentPadding = () => {
    switch (size) {
      case 'large':
        return 'p-8';
      case 'medium':
        return 'p-6';
      case 'small':
      default:
        return 'p-4';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className={getCardClasses()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/project/${project.slug}`}>
        <Card className="h-full glass border-white/10 hover:border-white/20 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10">
          <CardContent className={`${getContentPadding()} h-full flex flex-col`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className={`font-semibold group-hover:text-primary transition-colors ${
                    size === 'large' ? 'text-2xl' : size === 'medium' ? 'text-xl' : 'text-lg'
                  }`}>
                    {project.displayName}
                  </h3>
                  {project.featured && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
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

            {/* Thumbnail */}
            {project.thumbnail && (
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={`${project.displayName} thumbnail`}
                  width={400}
                  height={size === 'large' ? 200 : size === 'medium' ? 150 : 120}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Description */}
            <p className={`text-muted-foreground mb-4 flex-1 ${
              size === 'large' ? 'text-base' : 'text-sm'
            }`}>
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies?.slice(0, size === 'large' ? 8 : size === 'medium' ? 6 : 4).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies && project.technologies.length > (size === 'large' ? 8 : size === 'medium' ? 6 : 4) && (
                <Badge variant="outline" className="text-xs">
                  +{project.technologies.length - (size === 'large' ? 8 : size === 'medium' ? 6 : 4)}
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {project.liveUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Live
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.html_url, '_blank', 'noopener,noreferrer');
                  }}
                  className="text-xs"
                >
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </Button>
              </div>
              
              <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-primary"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </CardContent>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </Card>
      </Link>
    </motion.div>
  );
}
