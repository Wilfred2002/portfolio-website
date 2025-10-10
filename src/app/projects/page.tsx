import { Metadata } from 'next';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectFilter from '@/components/projects/ProjectFilter';
import { useProjects } from '@/hooks/useProjects';
import ProjectsClient from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'Work I\'ve built.',
  openGraph: {
    title: 'Projects | Portfolio',
    description: 'Work I\'ve built.',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
