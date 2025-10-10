import { Metadata } from 'next';
import SkillsClient from '@/components/skills/SkillsClient';

export const metadata: Metadata = {
  title: 'Skills | Portfolio',
  description: 'Technologies I work with.',
};

export default function SkillsPage() {
  return <SkillsClient />;
}
