import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThirtySixQuestionsScreenProps {
  onClose: () => void;
}

const questions = [
  {
    category: 'Hafif',
    question: 'Dünyada herhangi birisiyle akşam yemeği yiyebilseydin, kim olurdu?',
  },
  {
    category: 'Hafif',
    question: 'Ünlü olmak ister miydin? Nasıl bir şekilde?',
  },
  {
    category: 'Orta',
    question: 'Telefon etmeden önce ne söyleyeceğini prova eder misin? Neden?',
  },
  {
    category: 'Orta',
    question: 'Senin için "mükemmel" bir gün nasıl olurdu?',
  },
  {
    category: 'Orta',
    question: 'En son ne zaman kendin için şarkı söyledin? Ya başkası için?',
  },
  {
    category: 'Derin',
    question: 'Eğer 90 yaşına kadar yaşayabilseydin ve son 60 yılını ya 30 yaşındaki zihinle ya da 30 yaşındaki bedenle geçirebilseydin, hangisini seçerdin?',
  },
  {
    category: 'Derin',
    question: 'Kendi ölümün hakkında gizli bir önsezin var mı?',
  },
  {
    category: 'Derin',
    question: 'Kendini tanımla ve partnerini tanımla. Sırayla 3 "biz" cümlesi kur. Örneğin, "Biz ikimiz de bu odadayız ve..."',
  },
];

export function ThirtySixQuestionsScreen({ onClose }: ThirtySixQuestionsScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentQuestion = questions[currentIndex];

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Hafif':
        return 'bg-[var(--accent-blue)]';
      case 'Orta':
        return 'bg-[var(--accent-green)]';
      case 'Derin':
        return 'bg-[#AB47BC]';
      default:
        return 'bg-[var(--text-secondary)]';
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h2>36 Soru</h2>
        <button onClick={onClose} className="p-2 hover:opacity-70">
          <X className="w-6 h-6 text-[var(--text-primary)]" />
        </button>
      </div>

      {/* Progress */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[var(--text-secondary)]">
            Soru {currentIndex + 1} / {questions.length}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full text-white ${getCategoryColor(currentQuestion.category)}`}>
            {currentQuestion.category}
          </span>
        </div>
        <div className="h-1 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--string-color)] transition-all duration-400"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 300 : -300, rotateY: direction > 0 ? 45 : -45 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -300 : 300, rotateY: direction > 0 ? -45 : 45 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full max-w-md"
          >
            <div className="bg-[var(--string-color)] text-[var(--bg-primary)] rounded-3xl p-8 shadow-2xl min-h-[400px] flex items-center justify-center">
              <p className="text-xl text-center leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-full transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'border border-[var(--string-color)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
            }`}
          >
            Önceki
          </button>

          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[var(--string-color)] w-4'
                    : index < currentIndex
                    ? 'bg-[var(--accent-green)]'
                    : 'bg-[var(--text-secondary)] opacity-30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
              currentIndex === questions.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'bg-[var(--string-color)] text-[var(--bg-primary)] hover:opacity-80'
            }`}
          >
            Sonraki
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-center text-[var(--text-secondary)] mt-6">
          Her soruyu cevaplamak için zaman ayırın. Derin düşünün.
        </p>
      </div>
    </div>
  );
}
