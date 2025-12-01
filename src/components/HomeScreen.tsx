import React, { useState } from 'react';
import { BeachAnimation } from './BeachAnimation';
import { BottleMessageModal } from './BottleMessageModal';
import { User, Bell } from 'lucide-react';

interface HomeScreenProps {
  onAskHelp: () => void;
  onGiveHelp: () => void;
  onProfile: () => void;
  onNotifications?: () => void;
  onRespondToBottle?: (messageId: number) => void;
}

const bottleMessages = [
  {
    id: 1,
    text: 'Yazılım mühendisliğinden aşçılığa geçiş yapmayı düşünüyorum. Böyle radikal bir kariyer değişikliği yapan var mı?',
    tags: ['Kariyer', 'Yaşam'],
    timeAgo: '5dk önce',
    distance: '~120 km',
  },
  {
    id: 2,
    text: 'İlişkimde sürekli aynı konuda tartışıyoruz. Nasıl kırılma noktasını bulabiliriz?',
    tags: ['İlişkiler'],
    timeAgo: '12dk önce',
    distance: '~340 km',
  },
  {
    id: 3,
    text: 'Yeni bir hobi edinmek istiyorum ama ne yapacağımı bilmiyorum. 30lu yaşlarda yeni başlamak için önerileriniz var mı?',
    tags: ['Hobi', 'Yaşam'],
    timeAgo: '18dk önce',
    distance: '~50 km',
  },
];

export function HomeScreen({ onAskHelp, onGiveHelp, onProfile, onNotifications, onRespondToBottle }: HomeScreenProps) {
  const [selectedBottle, setSelectedBottle] = useState<number | null>(null);

  const handleBottleClick = (index: number) => {
    setSelectedBottle(index);
  };

  const handleRespond = (messageId: number) => {
    setSelectedBottle(null);
    onRespondToBottle?.(messageId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4">
        <button
          onClick={onProfile}
          className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <User className="w-6 h-6 text-[var(--text-primary)]" />
        </button>
        
        <button
          onClick={onNotifications}
          className="p-2 rounded-full hover:bg-[var(--bg-secondary)] transition-colors relative"
        >
          <Bell className="w-6 h-6 text-[var(--text-primary)]" />
          {bottleMessages.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-green)] rounded-full"></span>
          )}
        </button>
      </div>

      {/* Beach Animation */}
      <div className="flex-1 flex items-center justify-center px-6">
        <BeachAnimation bottles={bottleMessages.length} onBottleClick={handleBottleClick} />
      </div>

      {/* Info text */}
      <div className="px-6 pb-4 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          {bottleMessages.length > 0
            ? `${bottleMessages.length} şişe sahile vurdu`
            : 'Sahil sakin... Yardım iste veya et'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 grid grid-cols-2 gap-4">
        <button
          onClick={onAskHelp}
          className="py-6 rounded-full border-2 border-[var(--string-color)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-400"
        >
          Yardım İste
        </button>
        
        <button
          onClick={onGiveHelp}
          className="py-6 rounded-full bg-[var(--string-color)] text-[var(--bg-primary)] hover:opacity-80 transition-all duration-400"
        >
          Yardım Et
        </button>
      </div>

      {/* Bottle Message Modal */}
      {selectedBottle !== null && (
        <BottleMessageModal
          message={bottleMessages[selectedBottle]}
          onClose={() => setSelectedBottle(null)}
          onRespond={handleRespond}
        />
      )}
    </div>
  );
}