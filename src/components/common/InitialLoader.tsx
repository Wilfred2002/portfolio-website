'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function InitialLoader() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      setShow(false);
      return;
    }
    // Progress-driven loader: 0 → 99 linearly; snap to 100 on finish (consistent pacing)
    const onLoad = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });
    const minTimer = new Promise<void>((resolve) => setTimeout(resolve, 800));
    const maxTimer = new Promise<void>((resolve) => setTimeout(resolve, 1800));
    // Drive a smooth numeric progress
    const start = performance.now();
    const duration = 1500; // linear run-up; min/max timers still gate visibility
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const pct = Math.min(99, Math.floor(t * 100));
      setProgress(pct);
      if (pct < 99) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    Promise.all([minTimer, Promise.race([onLoad, maxTimer])]).then(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setProgress(100);
      setTimeout(() => setShow(false), 200); // brief settle so 100 is visible
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname]);

  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="initial-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Center mark + numeric progress */}
          <div className="relative z-10 flex flex-col items-center gap-6 text-white">
            <motion.div
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, repeat: 3, repeatType: 'reverse', ease: 'easeInOut' }}
              className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">W</span>
            </motion.div>
            <div className="text-center font-display text-5xl md:text-6xl tracking-wide">
              {progress}%
            </div>
          </div>

          {/* Reveal wipe on exit */}
          <motion.div
            className="absolute inset-0 bg-black z-0 pointer-events-none"
            initial={{ scaleY: 1, originY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0, originY: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


