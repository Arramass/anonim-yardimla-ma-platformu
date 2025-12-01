import React, { useEffect, useState } from 'react';
import { StringAnimation } from './StringAnimation';
import { motion } from 'motion/react';

interface WaitingScreenProps {
  onConnected: () => void;
}

export function WaitingScreen({ onConnected }: WaitingScreenProps) {
  const [dots, setDots] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    const timerInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setTimeout(() => onConnected(), 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate connection after 5 seconds for demo
    const connectionTimeout = setTimeout(() => {
      onConnected();
    }, 5000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(timerInterval);
      clearTimeout(connectionTimeout);
    };
  }, [onConnected]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="mb-12">
          <StringAnimation state="sending" speed={3} />
        </div>

        <motion.p
          className="text-center text-[var(--text-primary)] mb-4"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Mesajın yolda{dots}
        </motion.p>

        <p className="text-center text-[var(--text-secondary)] text-sm">
          ~{minutes}:{seconds.toString().padStart(2, '0')}
        </p>

        <div className="mt-16 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Seni birisiyle eşleştiriyoruz.
          </p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            İp uzanıyor...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
