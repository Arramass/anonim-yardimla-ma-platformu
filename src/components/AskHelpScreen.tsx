import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { X } from 'lucide-react';

interface AskHelpScreenProps {
  onBack: () => void;
  onSend: (question: string, tags: string[]) => void;
}

const topicTags = [
  'Teknoloji',
  'Kariyer',
  'İlişkiler',
  'Sağlık',
  'Eğitim',
  'Finans',
  'Yaşam',
  'Hobi',
  'Seyahat',
  'Aile',
];

export function AskHelpScreen({ onBack, onSend }: AskHelpScreenProps) {
  const [question, setQuestion] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const maxChars = 500;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSend = () => {
    if (question.trim() && selectedTags.length > 0) {
      onSend(question, selectedTags);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-[var(--text-secondary)] border-opacity-20">
        <button onClick={onBack} className="p-2 hover:opacity-70">
          <ArrowLeft className="w-6 h-6 text-[var(--text-primary)]" />
        </button>
        <h2 className="ml-4">Yardım İste</h2>
      </div>

      {/* Topic Tags */}
      <div className="px-6 py-4 border-b border-[var(--text-secondary)] border-opacity-20">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {topicTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-[var(--string-color)] text-[var(--bg-primary)]'
                    : 'border border-[var(--text-secondary)] text-[var(--text-primary)]'
                }`}
              >
                {tag}
                {isSelected && <X className="inline-block ml-1 w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 px-6 py-6">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, maxChars))}
          placeholder="Neye yardım lazım?"
          className="w-full h-full resize-none bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none text-lg"
          autoFocus
        />
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[var(--text-secondary)] border-opacity-20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[var(--text-secondary)]">
            {question.length} / {maxChars}
          </span>
          <button
            onClick={handleSend}
            disabled={!question.trim() || selectedTags.length === 0}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-400 ${
              question.trim() && selectedTags.length > 0
                ? 'bg-[var(--string-color)] text-[var(--bg-primary)] hover:opacity-80'
                : 'bg-[var(--text-secondary)] text-[var(--bg-primary)] opacity-30 cursor-not-allowed'
            }`}
          >
            Gönder
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
