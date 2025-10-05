'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Github, 
  FileText, 
  User, 
  Code, 
  Mail, 
  ExternalLink,
  Command,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { commandPaletteVariants } from '@/lib/animations';

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  category: string;
  keywords: string[];
}

const commands: CommandItem[] = [
  {
    id: 'projects',
    title: 'View Projects',
    description: 'Browse all projects and repositories',
    icon: <Code className="w-4 h-4" />,
    href: '/projects',
    category: 'Navigation',
    keywords: ['projects', 'repos', 'work', 'portfolio']
  },
  {
    id: 'about',
    title: 'About Me',
    description: 'Learn about my background and experience',
    icon: <User className="w-4 h-4" />,
    href: '/about',
    category: 'Navigation',
    keywords: ['about', 'bio', 'background', 'experience']
  },
  {
    id: 'skills',
    title: 'Skills & Technologies',
    description: 'Explore my technical skills and expertise',
    icon: <FileText className="w-4 h-4" />,
    href: '/skills',
    category: 'Navigation',
    keywords: ['skills', 'tech', 'technologies', 'expertise']
  },
  {
    id: 'contact',
    title: 'Get in Touch',
    description: 'Contact me for opportunities',
    icon: <Mail className="w-4 h-4" />,
    href: '/contact',
    category: 'Navigation',
    keywords: ['contact', 'email', 'reach', 'connect']
  },
  {
    id: 'github',
    title: 'GitHub Profile',
    description: 'View my GitHub repositories',
    icon: <Github className="w-4 h-4" />,
    href: 'https://github.com/yourusername',
    category: 'External',
    keywords: ['github', 'repos', 'code', 'profile']
  }
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter commands based on query
  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            handleCommandSelect(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommandSelect = (command: CommandItem) => {
    if (command.href.startsWith('http')) {
      window.open(command.href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(command.href);
    }
    setIsOpen(false);
    setQuery('');
  };

  const handleOpen = () => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  };

  // Expose open function globally for keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleOpen();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Command Palette */}
          <motion.div
            variants={commandPaletteVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 z-50"
          >
            <div className="glass rounded-xl border border-white/10 overflow-hidden">
              {/* Header */}
              <div className="flex items-center px-4 py-3 border-b border-white/10">
                <Search className="w-4 h-4 text-muted-foreground mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands, projects, or navigate..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
                />
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <kbd className="px-2 py-1 bg-white/10 rounded text-xs">⌘K</kbd>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.length > 0 ? (
                  <div className="py-2">
                    {filteredCommands.map((command, index) => (
                      <motion.div
                        key={command.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                          index === selectedIndex
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-white/5'
                        }`}
                        onClick={() => handleCommandSelect(command)}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <div className="flex-shrink-0 mr-3 text-muted-foreground">
                          {command.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{command.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {command.description}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {command.category}
                          </span>
                          {command.href.startsWith('http') && (
                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                          )}
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No commands found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">↑</kbd>
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">↓</kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">↵</kbd>
                      <span>Select</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">esc</kbd>
                    <span>Close</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
