import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useProject } from '@/hooks/useProjects';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  return {
    title: `${params.slug} | Portfolio`,
    description: 'Project details and technical information.',
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetailClient slug={params.slug} />;
}