import React from 'react';
import { motion } from 'motion/react';

interface OnboardingWelcomeProps {
  onNext: () => void;
}

export function OnboardingWelcome({ onNext }: OnboardingWelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <motion.div
        className="w-6 h-6 rounded-full bg-[var(--string-color)]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.p
        className="mt-16 text-center text-[var(--text-primary)] max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Bir ip, iki yabancı, bir bağlantı.
      </motion.p>

      <motion.button
        className="mt-24 px-8 py-3 text-[var(--text-primary)] transition-opacity hover:opacity-70"
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Başla
      </motion.button>
    </div>
  );
}
