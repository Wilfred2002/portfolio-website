import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Projects | Portfolio',
  description: 'View my projects on GitHub.',
  openGraph: {
    title: 'Projects | Portfolio',
    description: 'View my projects on GitHub.',
  },
};

export default function ProjectsPage() {
  redirect('https://github.com/wilfred2002?tab=repositories');
}
