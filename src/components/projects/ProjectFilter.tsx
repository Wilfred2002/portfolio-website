'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Calendar, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { filterVariants } from '@/lib/animations';
import { EnrichedProject } from '@/lib/github';

interface FilterOptions {
  technologies: string[];
  category: EnrichedProject['category'] | 'all';
  sortBy: 'recent' | 'stars' | 'complexity' | 'name';
  viewMode: 'grid' | 'list' | 'timeline';
  featured: boolean | null;
}

interface ProjectFilterProps {
  onFilterChange?: (filters: FilterOptions) => void;
}

const technologyOptions = [
  'React', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'Docker', 'AWS', 'Git'
];

const categoryOptions = [
  { value: 'all', label: 'All Projects' },
  { value: 'web-app', label: 'Web Apps' },
  { value: 'library', label: 'Libraries' },
  { value: 'tool', label: 'Tools' },
  { value: 'experiment', label: 'Experiments' }
] as const;

const sortOptions = [
  { value: 'recent', label: 'Recently Updated', icon: Calendar },
  { value: 'stars', label: 'Most Starred', icon: Star },
  { value: 'complexity', label: 'Complexity', icon: Zap },
  { value: 'name', label: 'Name', icon: Filter }
] as const;

const viewModeOptions = [
  { value: 'grid', label: 'Grid', icon: Grid },
  { value: 'list', label: 'List', icon: List },
  { value: 'timeline', label: 'Timeline', icon: Calendar }
] as const;

export default function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    technologies: [],
    category: 'all',
    sortBy: 'recent',
    viewMode: 'grid',
    featured: null
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const toggleTechnology = (tech: string) => {
    const updatedTechs = filters.technologies.includes(tech)
      ? filters.technologies.filter(t => t !== tech)
      : [...filters.technologies, tech];
    handleFilterChange({ technologies: updatedTechs });
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      technologies: [],
      category: 'all',
      sortBy: 'recent',
      viewMode: 'grid',
      featured: null
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const hasActiveFilters = filters.technologies.length > 0 || 
                          filters.category !== 'all' || 
                          filters.featured !== null;

  return (
    <motion.div
      variants={filterVariants}
      initial="hidden"
      animate="visible"
      className="glass rounded-xl border border-white/10 p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Filter & Sort</h2>
          {hasActiveFilters && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {filters.technologies.length + (filters.category !== 'all' ? 1 : 0) + (filters.featured !== null ? 1 : 0)} active
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-6">
        {/* Featured Filter */}
        <div>
          <h3 className="text-sm font-medium mb-3">Featured</h3>
          <div className="flex space-x-2">
            <Button
              variant={filters.featured === null ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange({ featured: null })}
            >
              All
            </Button>
            <Button
              variant={filters.featured === true ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange({ featured: true })}
            >
              Featured Only
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="text-sm font-medium mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.category === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange({ category: option.value as FilterOptions['category'] })}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Technologies Filter */}
        <div>
          <h3 className="text-sm font-medium mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {technologyOptions.map((tech) => (
              <Badge
                key={tech}
                variant={filters.technologies.includes(tech) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.technologies.includes(tech)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-white/5'
                }`}
                onClick={() => toggleTechnology(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="text-sm font-medium mb-3">Sort by</h3>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={filters.sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange({ sortBy: option.value as FilterOptions['sortBy'] })}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* View Mode */}
        <div>
          <h3 className="text-sm font-medium mb-3">View Mode</h3>
          <div className="flex space-x-2">
            {viewModeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={filters.viewMode === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange({ viewMode: option.value as FilterOptions['viewMode'] })}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4 border-t border-white/10"
          >
            <div className="text-sm text-muted-foreground">
              <p>Advanced filtering options will be available here.</p>
              <p>This could include date ranges, complexity levels, and more specific technology filters.</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
