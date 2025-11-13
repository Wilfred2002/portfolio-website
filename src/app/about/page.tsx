'use client';

import { motion } from 'framer-motion';
import { Code, GraduationCap, Briefcase, Heart, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              About Wilfred
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
          One project at a time.
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Story */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <Heart className="w-6 h-6 mr-3 text-primary" />
                    My Journey
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      My journey in tech began when I was 12 on roblox, making an FPS game.
                    </p>
                    <p>I’m currently working on Flux, a cross-platform social ticketing app that connects people through events. Right now, I see myself as an early-stage builder.</p>
                    <p>
                      I&apos;m proficient across both frontend and backend development—building responsive React/TypeScript
                      interfaces with React Native for mobile, architecting REST APIs with Node.js and PostgreSQL, and
                      implementing real-time features with Supabase. I also have experience writing smart contracts in Solidity
                      for blockchain applications and building developer tools for Web3 ecosystems.
                    </p>
                    <p>
                      When I&apos;m not coding, you&apos;ll find me playing lol or cooking a good meal(or eating it).
                      If you want to connect with me send me an email at wfnaraga@gmail.com!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Education & Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-secondary" />
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                      <p className="text-sm text-muted-foreground">West Chester University of Pennsylvania</p>
                      <p className="text-sm text-muted-foreground">Focus: Software Engineering & Web Development</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-accent" />
                    Experience
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Founder + Software Engineer</h4>
                      <p className="text-sm text-muted-foreground">Flux (Jun 2025 - Present)</p>
                      <p className="text-sm text-muted-foreground">Built cross-platform social ticketing app with React Native</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Frontend Engineer</h4>
                      <p className="text-sm text-muted-foreground">Seoul (Sep 2024 - Jun 2025)</p>
                      <p className="text-sm text-muted-foreground">Mobile-first redesign driving 30% visitor increase</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Frontend Engineer (Contract)</h4>
                      <p className="text-sm text-muted-foreground">Hearing Loss Association (Aug 2024 - Jan 2025)</p>
                      <p className="text-sm text-muted-foreground">Website rebuild with 20% increase in organic traffic</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Skills & Contact */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-primary" />
                    Core Skills
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Frontend & Mobile</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">React</Badge>
                        <Badge variant="outline" className="text-xs">React Native</Badge>
                        <Badge variant="outline" className="text-xs">TypeScript</Badge>
                        <Badge variant="outline" className="text-xs">Next.js</Badge>
                        <Badge variant="outline" className="text-xs">React Query</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Backend & Database</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Node.js</Badge>
                        <Badge variant="outline" className="text-xs">PostgreSQL</Badge>
                        <Badge variant="outline" className="text-xs">Supabase</Badge>
                        <Badge variant="outline" className="text-xs">REST API</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Blockchain & Tools</h4>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Solidity</Badge>
                        <Badge variant="outline" className="text-xs">Web3</Badge>
                        <Badge variant="outline" className="text-xs">Git</Badge>
                        <Badge variant="outline" className="text-xs">Whop SDK</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Let&apos;s Connect</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="https://github.com/Wilfred2002" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="https://linkedin.com/in/wilfrednaraga" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="mailto:wfnaraga@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
