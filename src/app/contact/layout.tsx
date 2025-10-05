import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Wilfred Naraga',
  description: 'Get in touch with Wilfred Naraga for opportunities, collaborations, or just to say hello. Available for full-stack development projects and technical consulting.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
