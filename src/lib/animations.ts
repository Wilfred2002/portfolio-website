import { Variants } from 'framer-motion';

export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      type: "spring",
      stiffness: 100
    }
  },
  hover: { 
    scale: 1.02,
    rotateY: 5,
    z: 50,
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const navVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const pageVariants: Variants = {
  initial: { 
    opacity: 0, 
    x: -20 
  },
  in: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  },
  out: { 
    opacity: 0, 
    x: 20,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const heroVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2
    }
  }
};

export const typewriterVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const skillNodeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "backOut"
    }
  },
  hover: { 
    scale: 1.1,
    transition: { 
      duration: 0.2 
    }
  }
};

export const commandPaletteVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
    transition: { 
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

export const glowVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    opacity: 0.8,
    scale: 1.05,
    transition: { 
      duration: 0.3 
    }
  }
};

export const particleVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1,
      ease: "easeOut"
    }
  }
};

export const mobileMenuVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: "100%" 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: "100%",
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const filterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -10 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const codeRainVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 0.1,
    transition: { 
      duration: 2,
      ease: "easeIn"
    }
  }
};

export const createStaggerDelay = (index: number, baseDelay: number = 0.1) => ({
  transition: {
    delay: baseDelay * index
  }
});

export const springConfig = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 1
};

export const easing = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  backOut: [0.34, 1.56, 0.64, 1]
} as const;
