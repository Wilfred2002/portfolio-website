import { ProjectMetadata } from '@/lib/github';

export const projectMetadata: Record<string, ProjectMetadata> = {
  'monad-mcp-server': {
    featured: true,
    order: 1,
    thumbnail: '/images/monad-mcp-thumb.jpg',
    liveUrl: 'https://github.com/Wilfred2002/monad-mcp-server',
    detailedDescription: 'A comprehensive Model Context Protocol server for Monad and Ethereum testnets, providing 13+ developer tools for smart contract testing and debugging.',
    challenges: [
      'Building comprehensive blockchain developer tools',
      'Supporting multiple blockchain networks (Monad & Ethereum)',
      'Creating intuitive CLI commands for complex operations',
      'Handling various contract types and transaction formats'
    ],
    solutions: [
      'Developed TypeScript MCP server with modular architecture',
      'Implemented contract call, calldata decoding, and gas estimation tools',
      'Created ERC-20/721 analysis and block/transaction inspection utilities',
      'Designed organized output format for developer-friendly debugging'
    ],
    keyFeatures: [
      'Contract call and deployment tools',
      'Calldata decoding and analysis',
      'ERC-20/721 token analysis',
      'Gas estimation and optimization',
      'Block and transaction inspection',
      'Multi-network support (Monad & Ethereum)'
    ],
    technologies: ['TypeScript', 'Solidity', 'Ethereum', 'Monad', 'Web3', 'Node.js'],
    architecture: 'TypeScript MCP server with modular tool architecture and blockchain integration',
    screenshots: [
      '/images/monad-mcp-cli.jpg',
      '/images/monad-mcp-analysis.jpg',
      '/images/monad-mcp-contracts.jpg'
    ],
    demoUrl: 'https://github.com/Wilfred2002/monad-mcp-server'
  },
  
  'pokemon-ecommerce': {
    featured: true,
    order: 2,
    thumbnail: '/images/pokemon-ecommerce-thumb.jpg',
    liveUrl: 'https://github.com/Wilfred2002/pokemon-ecommerce',
    detailedDescription: 'A full-stack e-commerce platform for selling Pokémon cards and booster boxes, featuring secure payments, inventory management, and responsive design.',
    challenges: [
      'Building a complete e-commerce solution from scratch',
      'Integrating secure payment processing with Stripe',
      'Managing complex inventory and order systems',
      'Creating responsive design for mobile and desktop'
    ],
    solutions: [
      'Implemented React frontend with Context API for state management',
      'Built .NET backend with RESTful APIs for products and orders',
      'Integrated Stripe PaymentIntents for secure transactions',
      'Used PostgreSQL for reliable data storage and management'
    ],
    keyFeatures: [
      'Product catalog and inventory management',
      'Shopping cart with session persistence',
      'Secure Stripe payment integration',
      'Order tracking and management',
      'Responsive mobile-first design',
      'Real-time inventory updates'
    ],
    technologies: ['React', '.NET', 'PostgreSQL', 'Stripe', 'TypeScript', 'CSS'],
    architecture: 'React frontend with .NET backend, PostgreSQL database, and Stripe payments',
    screenshots: [
      '/images/pokemon-home.jpg',
      '/images/pokemon-cart.jpg',
      '/images/pokemon-checkout.jpg'
    ],
    demoUrl: 'https://github.com/Wilfred2002/pokemon-ecommerce'
  },

  'seoul-website': {
    featured: true,
    order: 3,
    thumbnail: '/images/seoul-website-thumb.jpg',
    liveUrl: 'https://seoul-restaurant.com',
    detailedDescription: 'A restaurant website that drove 80% of new customer acquisition within the first 3 months, featuring a scalable reservation system and mobile-first design.',
    challenges: [
      'Designing a website that significantly increases customer acquisition',
      'Building a reservation system to handle 100+ weekly bookings',
      'Ensuring mobile-first experience for restaurant customers',
      'Collaborating with managers to meet business requirements'
    ],
    solutions: [
      'Collaborated with managers to design user-focused website',
      'Implemented scalable booking system reducing manual tasks',
      'Adopted mobile-first approach for enhanced user experience',
      'Used React/Node.js for modern, maintainable codebase'
    ],
    keyFeatures: [
      'Customer acquisition optimization',
      'Scalable reservation system',
      'Mobile-first responsive design',
      'Modern React/Node.js architecture',
      'Manager collaboration tools',
      'Performance optimization'
    ],
    technologies: ['React', 'Node.js', 'JavaScript', 'CSS', 'HTML'],
    architecture: 'React frontend with Node.js backend for restaurant management',
    screenshots: [
      '/images/seoul-homepage.jpg',
      '/images/seoul-reservations.jpg',
      '/images/seoul-mobile.jpg'
    ],
    demoUrl: 'https://seoul-restaurant.com'
  },

  'hearing-loss-website': {
    featured: false,
    order: 4,
    thumbnail: '/images/hearing-loss-thumb.jpg',
    liveUrl: 'https://hearingloss.org',
    detailedDescription: 'A redesigned website for the National Hearing Loss Association focusing on accessibility and improved usability for 500+ monthly visitors.',
    challenges: [
      'Designing for accessibility and impaired users',
      'Improving usability across different devices',
      'Making key information more accessible',
      'Working with a team of developers and managers'
    ],
    solutions: [
      'Implemented accessibility-first design strategy',
      'Enhanced mobile usability for impaired users',
      'Redesigned site structure for better information access',
      'Collaborated with development team and managers'
    ],
    keyFeatures: [
      'Accessibility-focused design',
      'Mobile-first responsive layout',
      'Improved information architecture',
      'Enhanced usability for impaired users',
      'Team collaboration tools',
      'Performance optimization'
    ],
    technologies: ['React', 'CSS', 'HTML', 'JavaScript', 'Accessibility'],
    architecture: 'React-based website with accessibility-first design principles',
    screenshots: [
      '/images/hearing-loss-homepage.jpg',
      '/images/hearing-loss-accessibility.jpg',
      '/images/hearing-loss-mobile.jpg'
    ],
    demoUrl: 'https://hearingloss.org'
  },

  'csgo-aimbot': {
    featured: false,
    order: 5,
    thumbnail: '/images/csgo-aimbot-thumb.jpg',
    liveUrl: 'https://github.com/Wilfred2002/csgo-aimbot',
    detailedDescription: 'An external aim assist application for Counter-Strike: Global Offensive using C++ and Windows API for memory manipulation and real-time game interaction.',
    challenges: [
      'Implementing memory reading and writing techniques',
      'Interacting with CS:GO game process in real-time',
      'Creating natural and responsive aim assistance',
      'Handling Windows API for process manipulation'
    ],
    solutions: [
      'Used Windows API for memory manipulation and process interaction',
      'Implemented real-time data retrieval for player positions',
      'Created aim smoothing and customizable key bindings',
      'Developed user-friendly interface for natural interactions'
    ],
    keyFeatures: [
      'Real-time memory manipulation',
      'Player and entity position tracking',
      'Customizable aim smoothing',
      'Key binding customization',
      'Natural in-game interactions',
      'Windows API integration'
    ],
    technologies: ['C++', 'Windows API', 'Memory Management', 'Game Development'],
    architecture: 'External C++ application using Windows API for game process interaction',
    screenshots: [
      '/images/csgo-aimbot-interface.jpg',
      '/images/csgo-aimbot-settings.jpg',
      '/images/csgo-aimbot-gameplay.jpg'
    ],
    demoUrl: 'https://github.com/Wilfred2002/csgo-aimbot'
  },

  'manga-king': {
    featured: false,
    order: 6,
    thumbnail: '/images/manga-king-thumb.jpg',
    liveUrl: 'https://github.com/Wilfred2002/manga-king',
    detailedDescription: 'A TypeScript-based application for manga enthusiasts, providing an interactive platform for manga discovery and management.',
    challenges: [
      'Building an engaging manga discovery platform',
      'Creating intuitive user interface for manga management',
      'Implementing TypeScript for type safety and maintainability',
      'Designing responsive layout for various devices'
    ],
    solutions: [
      'Developed TypeScript application for enhanced type safety',
      'Created intuitive interface for manga discovery',
      'Implemented responsive design for mobile and desktop',
      'Built interactive features for manga enthusiasts'
    ],
    keyFeatures: [
      'Manga discovery and browsing',
      'Interactive user interface',
      'TypeScript for type safety',
      'Responsive design',
      'User-friendly navigation',
      'Modern web technologies'
    ],
    technologies: ['TypeScript', 'React', 'CSS', 'HTML', 'JavaScript'],
    architecture: 'TypeScript-based web application with modern UI components',
    screenshots: [
      '/images/manga-king-homepage.jpg',
      '/images/manga-king-browse.jpg',
      '/images/manga-king-mobile.jpg'
    ],
    demoUrl: 'https://github.com/Wilfred2002/manga-king'
  }
};

export const skillsData = {
  'Frontend Development': {
    level: 90,
    category: 'Development',
    relatedSkills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
    projects: ['seoul-website', 'hearing-loss-website', 'pokemon-ecommerce', 'manga-king']
  },
  'Backend Development': {
    level: 85,
    category: 'Development',
    relatedSkills: ['Node.js', '.NET', 'PostgreSQL', 'API Development'],
    projects: ['pokemon-ecommerce', 'monad-mcp-server']
  },
  'React': {
    level: 95,
    category: 'Frontend',
    relatedSkills: ['JavaScript', 'TypeScript', 'Context API', 'Hooks'],
    projects: ['seoul-website', 'hearing-loss-website', 'pokemon-ecommerce', 'manga-king']
  },
  'TypeScript': {
    level: 90,
    category: 'Language',
    relatedSkills: ['JavaScript', 'React', 'Node.js', 'Type Safety'],
    projects: ['monad-mcp-server', 'manga-king', 'seoul-website']
  },
  'Node.js': {
    level: 85,
    category: 'Backend',
    relatedSkills: ['JavaScript', 'Express', 'API Development', 'WebSocket'],
    projects: ['seoul-website', 'monad-mcp-server']
  },
  'C++': {
    level: 80,
    category: 'Language',
    relatedSkills: ['Windows API', 'Memory Management', 'Game Development'],
    projects: ['csgo-aimbot']
  },
  'Solidity': {
    level: 75,
    category: 'Blockchain',
    relatedSkills: ['Smart Contracts', 'Ethereum', 'Monad', 'Web3'],
    projects: ['monad-mcp-server']
  },
  'PostgreSQL': {
    level: 80,
    category: 'Database',
    relatedSkills: ['SQL', 'Database Design', 'Query Optimization'],
    projects: ['pokemon-ecommerce']
  },
  'Stripe': {
    level: 85,
    category: 'Payment',
    relatedSkills: ['Payment Processing', 'Webhooks', 'API Integration'],
    projects: ['pokemon-ecommerce']
  },
  'Lua': {
    level: 70,
    category: 'Scripting',
    relatedSkills: ['Game Development', 'Scripting', 'Roblox'],
    projects: ['lua-engineering-internship']
  },
  'Git': {
    level: 95,
    category: 'Tools',
    relatedSkills: ['Version Control', 'GitHub', 'Collaboration'],
    projects: ['seoul-website', 'hearing-loss-website', 'pokemon-ecommerce', 'monad-mcp-server', 'csgo-aimbot', 'manga-king']
  }
};

export const technologyCategories = {
  'Frontend': ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Tailwind CSS'],
  'Backend': ['Node.js', 'Python', 'Express', 'FastAPI', 'MongoDB', 'Redis'],
  'DevOps': ['Docker', 'AWS', 'Git', 'CI/CD', 'Kubernetes'],
  'Tools': ['Git', 'Webpack', 'Jest', 'Storybook', 'Figma'],
  'Languages': ['TypeScript', 'JavaScript', 'Python', 'SQL']
};

export const projectCategories = {
  'web-app': 'Web Applications',
  'library': 'Libraries & Packages',
  'tool': 'Developer Tools',
  'experiment': 'Experiments & Demos'
} as const;
