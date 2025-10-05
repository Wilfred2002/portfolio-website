# Modern Portfolio Website

A cutting-edge portfolio website built with Next.js 14, TypeScript, and Tailwind CSS, featuring a "Digital Workshop" design aesthetic with interactive animations and modern UI components.

## ✨ Features

### 🎨 Design System
- **Dark Theme**: Deep space black background with vibrant accent colors
- **Glass Morphism**: Modern glassmorphism effects throughout the interface
- **Custom Typography**: Inter, JetBrains Mono, and Space Grotesk fonts
- **Responsive Design**: Mobile-first approach with smooth breakpoints

### 🚀 Core Functionality
- **Projects Showcase**: Bento-grid layout with filtering and sorting
- **Interactive Skills Constellation**: SVG-based skill visualization
- **Command Palette**: Quick navigation with Cmd/Ctrl + K
- **GitHub Integration**: Real-time project data from GitHub API
- **Dynamic Project Pages**: Detailed project views with code showcases

### 🎭 Animations & Effects
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Magnetic Hover Effects**: Interactive elements with physics-based animations
- **Staggered Animations**: Coordinated entrance animations
- **Glow Effects**: Subtle color glows on hover states
- **Code Rain**: Animated background effects

### 📱 Responsive Features
- **Mobile Navigation**: Full-screen overlay with staggered animations
- **Touch Optimizations**: Swipe gestures and touch-friendly interactions
- **Adaptive Layouts**: Different layouts for mobile, tablet, and desktop
- **Performance Optimized**: Lazy loading and code splitting

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **shadcn/ui** - Component library

### Data & State
- **React Query** - Server state management
- **Zustand** - Client state management
- **GitHub API** - Project data integration

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- GitHub account (for API integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/modern-portfolio.git
   cd modern-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your GitHub credentials:
   ```env
   GITHUB_USERNAME=your-github-username
   GITHUB_TOKEN=your-github-token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects listing
│   ├── project/[slug]/    # Dynamic project pages
│   ├── about/             # About page
│   ├── skills/            # Skills page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── common/           # Shared components
│   ├── projects/         # Project-related components
│   ├── skills/           # Skills visualization
│   └── providers/        # Context providers
├── lib/                  # Utility functions
│   ├── animations.ts     # Framer Motion variants
│   ├── github.ts         # GitHub API integration
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
├── data/                 # Static data and metadata
└── styles/               # Global styles
```

## 🎨 Customization

### Colors & Themes
The design system uses CSS custom properties defined in `globals.css`:

```css
:root {
  --color-background: #0a0a0f;
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-accent: #06b6d4;
  /* ... more colors */
}
```

### Adding Projects
1. Update `src/data/projects.ts` with your project metadata
2. Ensure your GitHub repositories have proper topics and descriptions
3. The system will automatically fetch and display your projects

### Customizing Skills
Edit `src/data/projects.ts` to modify the skills constellation:

```typescript
export const skillsData = {
  'Your Skill': {
    level: 85,
    category: 'Development',
    relatedSkills: ['Related Skill 1', 'Related Skill 2'],
    projects: ['project-1', 'project-2']
  }
};
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The project is compatible with any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and images load on demand
- **Caching**: React Query for efficient data caching
- **Bundle Analysis**: Built-in bundle analyzer

## 🎯 SEO & Accessibility

- **Meta Tags**: Comprehensive meta tags for social sharing
- **Semantic HTML**: Proper HTML structure for screen readers
- **ARIA Labels**: Accessible component labels
- **Keyboard Navigation**: Full keyboard support
- **Reduced Motion**: Respects user motion preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
- [GitHub](https://github.com/) for API integration

## 📞 Contact

- **Portfolio**: [yourname.dev](https://yourname.dev)
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **LinkedIn**: [Your Name](https://linkedin.com/in/yourname)

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.