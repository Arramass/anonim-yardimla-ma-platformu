import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingPhilosophyProps {
  onNext: () => void;
}

const pages = [
  {
    text: 'Burada hız yok. Düşünce var.',
    illustration: (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="60" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    text: 'Kimliğin değil, niyetin önemli.',
    illustration: (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <rect x="40" y="40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="60" cy="60" r="15" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    text: 'Yardım et. Yardım al.',
    illustration: (
      <svg width="120" height="120" viewBox="0 0 120 120">
        <line x1="30" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="2" />
        <circle cx="30" cy="60" r="8" fill="currentColor" />
        <circle cx="90" cy="60" r="8" fill="currentColor" />
      </svg>
    ),
  },
];

export function OnboardingPhilosophy({ onNext }: OnboardingPhilosophyProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <div className="text-[var(--text-primary)] mb-12">
              {pages[currentPage].illustration}
            </div>
            
            <p className="text-center text-[var(--text-primary)] max-w-sm">
              {pages[currentPage].text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-2 mt-16">
          {pages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-400 ${
                index === currentPage
                  ? 'bg-[var(--string-color)] w-6'
                  : 'bg-[var(--text-secondary)] opacity-30'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between mt-12">
          <button
            onClick={handlePrev}
            className={`px-6 py-2 transition-opacity ${
              currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100'
            }`}
          >
            Geri
          </button>
          
          <button
            onClick={handleNext}
            className="px-6 py-2 text-[var(--text-primary)] transition-opacity hover:opacity-70"
          >
            {currentPage === pages.length - 1 ? 'Devam' : 'İleri'}
          </button>
        </div>
      </div>
    </div>
  );
}
