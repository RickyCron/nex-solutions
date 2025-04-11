import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const loadingTexts = [
  "Loading smarter solutions... almost there.",
  "Optimizing your future... hang tight."
];

export default function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    const loadingTimeout = setTimeout(() => {
      onLoadComplete();
    }, 3000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(loadingTimeout);
    };
  }, [onLoadComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-primary flex flex-col items-center justify-center"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <Brain className="w-16 h-16 text-accent" />
          <motion.div
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-secondary" />
          </motion.div>
          <motion.div
            animate={{
              opacity: [0, 1, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-2 -left-2"
          >
            <Zap className="w-6 h-6 text-secondary" />
          </motion.div>
        </motion.div>
      </div>

      <motion.p
        key={currentTextIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mt-8 text-xl text-light font-rajdhani"
      >
        {loadingTexts[currentTextIndex]}
      </motion.p>

      <div className="mt-8 w-48 h-1 bg-dark/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-secondary via-accent to-secondary"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </motion.div>
  );
}