import React from 'react';
import { motion } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';

interface BottleMessage {
  id: number;
  text: string;
  tags: string[];
  timeAgo: string;
  distance: string;
}

interface BottleMessageModalProps {
  message: BottleMessage;
  onClose: () => void;
  onRespond: (id: number) => void;
}

export function BottleMessageModal({ message, onClose, onRespond }: BottleMessageModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-[var(--bg-primary)] rounded-3xl p-8 max-w-md w-full relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5 text-[var(--text-primary)]" />
        </button>

        {/* Bottle illustration */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <svg width="80" height="100" viewBox="0 0 80 100">
            <g transform="translate(40, 50)">
              {/* Bottle body */}
              <path
                d="M -15 -25 L -15 20 L 15 20 L 15 -25 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[var(--string-color)]"
              />
              {/* Neck */}
              <path
                d="M -8 -25 L -8 -35 L 8 -35 L 8 -25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[var(--string-color)]"
              />
              {/* Cork */}
              <rect
                x="-6"
                y="-38"
                width="12"
                height="4"
                fill="currentColor"
                className="text-[var(--string-color)]"
              />
              {/* Message paper */}
              <path
                d="M -10 -10 L -10 10 L 10 10 L 10 -10 Z"
                fill="currentColor"
                opacity="0.2"
                className="text-[var(--string-color)]"
              />
              <line x1="-7" y1="-5" x2="7" y2="-5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="-7" y1="0" x2="7" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <line x1="-7" y1="5" x2="4" y2="5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </g>
          </svg>
        </motion.div>

        {/* Message content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-center mb-4 text-[var(--text-secondary)]">
            Sahile vuran bir mesaj
          </h3>
          
          <div className="bg-[var(--bg-secondary)] bg-opacity-50 rounded-2xl p-6 mb-4">
            <p className="text-[var(--text-primary)] leading-relaxed text-center">
              "{message.text}"
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {message.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-[var(--string-color)] bg-opacity-10 text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta info */}
          <div className="flex items-center justify-center gap-4 text-xs text-[var(--text-secondary)] mb-6">
            <span>{message.timeAgo}</span>
            <span>•</span>
            <span>{message.distance}</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-[var(--string-color)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
            >
              Geri Bırak
            </button>
            <button
              onClick={() => onRespond(message.id)}
              className="flex-1 py-3 rounded-full bg-[var(--string-color)] text-[var(--bg-primary)] hover:opacity-80 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Cevapla
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
