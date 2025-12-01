import React, { useState } from 'react';
import { AnonymousAvatar } from './AnonymousAvatar';
import { X } from 'lucide-react';

interface OnboardingProfileProps {
  onComplete: (interests: string[]) => void;
}

const availableInterests = [
  'Teknoloji',
  'Sanat',
  'Psikoloji',
  'Felsefe',
  'Müzik',
  'Edebiyat',
  'Bilim',
  'Tarih',
  'Seyahat',
  'Aşçılık',
  'Spor',
  'Girişimcilik',
  'Eğitim',
  'Doğa',
  'Film',
  'Yoga',
  'Meditasyon',
  'Yazılım',
  'Tasarım',
  'Fotograf',
];

export function OnboardingProfile({ onComplete }: OnboardingProfileProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const avatarSeed = Math.floor(Math.random() * 10000);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleComplete = () => {
    if (selectedInterests.length > 0) {
      onComplete(selectedInterests);
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-12">
      <div className="flex flex-col items-center mb-8">
        <AnonymousAvatar seed={avatarSeed} size="large" />
        <p className="mt-4 text-[var(--text-secondary)] text-sm">Senin anonim profil</p>
      </div>

      <h2 className="text-center mb-2">Hangi konularda yardım edebilirsin?</h2>
      <p className="text-center text-[var(--text-secondary)] text-sm mb-6">
        Maksimum 5 alan seç
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {availableInterests.map((interest) => {
          const isSelected = selectedInterests.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                isSelected
                  ? 'bg-[var(--string-color)] text-[var(--bg-primary)]'
                  : 'border border-[var(--text-secondary)] text-[var(--text-primary)] hover:border-[var(--string-color)]'
              }`}
              disabled={!isSelected && selectedInterests.length >= 5}
            >
              {interest}
              {isSelected && <X className="inline-block ml-1 w-3 h-3" />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <p className="text-center text-[var(--text-secondary)] text-sm mb-4">
          {selectedInterests.length} / 5 seçildi
        </p>
        <button
          onClick={handleComplete}
          disabled={selectedInterests.length === 0}
          className={`w-full py-4 rounded-full transition-all duration-400 ${
            selectedInterests.length > 0
              ? 'bg-[var(--string-color)] text-[var(--bg-primary)] hover:opacity-80'
              : 'bg-[var(--text-secondary)] text-[var(--bg-primary)] opacity-30 cursor-not-allowed'
          }`}
        >
          Tamamla
        </button>
      </div>
    </div>
  );
}
