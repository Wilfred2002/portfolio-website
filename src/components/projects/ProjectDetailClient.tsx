'use client';

import { useProject } from '@/hooks/useProjects';
import { notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ProjectHero from '@/components/projects/ProjectHero';
import ProjectOverview from '@/components/projects/ProjectOverview';
import ProjectChallenge from '@/components/projects/ProjectChallenge';
import ProjectSolution from '@/components/projects/ProjectSolution';
import ProjectTechDeepDive from '@/components/projects/ProjectTechDeepDive';
import ProjectFeatures from '@/components/projects/ProjectFeatures';
import ProjectCodeShowcase from '@/components/projects/ProjectCodeShowcase';
import ProjectOutcomes from '@/components/projects/ProjectOutcomes';

interface ProjectDetailClientProps {
  slug: string;
}

export default function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const { project, isLoading, error, notFound: isNotFound } = useProject(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load project</p>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isNotFound || !project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <ProjectHero project={project} />

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Overview */}
        <ProjectOverview project={project} />

        {/* The Challenge */}
        <ProjectChallenge project={project} />

        {/* The Solution */}
        <ProjectSolution project={project} />

        {/* Tech Deep Dive */}
        <ProjectTechDeepDive project={project} />

        {/* Key Features */}
        <ProjectFeatures project={project} />

        {/* Code Showcase */}
        <ProjectCodeShowcase project={project} />

        {/* Outcomes */}
        <ProjectOutcomes project={project} />
      </div>
    </div>
  );
}
