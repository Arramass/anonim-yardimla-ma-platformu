import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LevelUpModalProps {
  onClose: () => void;
  newLevel: number;
}

const levelMessages = [
  {
    level: 1,
    title: 'El Sıkışma',
    message: 'Bir şeyler değişti...',
    description: 'Artık takma ad ve ülke bilgisini görebilirsin.',
  },
  {
    level: 2,
    title: 'Harita',
    message: 'Biraz daha yaklaştınız.',
    description: 'Şehir, yaş aralığı ve ilgi alanları artık görünür.',
  },
  {
    level: 3,
    title: 'Kişi',
    message: 'Maskeler düşmeye başlıyor.',
    description: 'Hobiler, kişilik özellikleri ve bulanık fotoğraf paylaşıldı.',
  },
  {
    level: 4,
    title: 'Gerçeklik',
    message: 'Tam güven sağlandı.',
    description: 'Tam profil görünümü aktif.',
  },
];

export function LevelUpModal({ onClose, newLevel }: LevelUpModalProps) {
  const levelInfo = levelMessages[newLevel - 1] || levelMessages[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-[var(--bg-primary)] rounded-3xl p-8 max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <Sparkles className="w-16 h-16 text-[var(--accent-green)]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <Sparkles className="w-16 h-16 text-[var(--accent-blue)] opacity-30" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-2">{levelInfo.message}</h2>
          <h3 className="text-[var(--text-secondary)] mb-4">Seviye {newLevel}: {levelInfo.title}</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {levelInfo.description}
          </p>
        </motion.div>

        {/* Trust Level Dots */}
        <div className="flex justify-center gap-2 my-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
              className={`w-3 h-3 rounded-full ${
                i < newLevel ? 'bg-[var(--accent-green)]' : 'bg-[var(--text-secondary)] opacity-30'
              }`}
            />
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={onClose}
          className="w-full py-4 rounded-full bg-[var(--string-color)] text-[var(--bg-primary)] hover:opacity-80 transition-opacity"
        >
          Harika!
        </motion.button>
      </motion.div>
    </div>
  );
}
