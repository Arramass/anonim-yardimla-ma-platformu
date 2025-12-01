import React, { useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { AnonymousAvatar } from './AnonymousAvatar';

interface ProfileScreenProps {
  onBack: () => void;
  onSettings: () => void;
  userInterests: string[];
  userId: number;
}

export function ProfileScreen({ onBack, onSettings, userInterests, userId }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'solved' | 'interests'>('active');

  const helpedCount = 23;
  const receivedCount = 8;
  const helpRank = Math.floor(Math.random() * 100);

  const activeChats = [
    { id: 1, preview: 'Kariyer değişikliği hakkında...', lastMessage: '2s önce' },
    { id: 2, preview: 'Yeni bir hobi aramak...', lastMessage: '5dk önce' },
    { id: 3, preview: 'İlişki sorunları...', lastMessage: '1s önce' },
  ];

  const solvedQuestions = [
    { id: 1, topic: 'Teknoloji', title: 'React öğrenme yolu', status: 'Çözüldü' },
    { id: 2, topic: 'Yaşam', title: 'Sabah rutini oluşturma', status: 'Çözüldü' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--text-secondary)] border-opacity-20">
        <button onClick={onBack} className="p-2 hover:opacity-70">
          <ArrowLeft className="w-6 h-6 text-[var(--text-primary)]" />
        </button>
        <h2>Profil</h2>
        <button onClick={onSettings} className="p-2 hover:opacity-70">
          <Settings className="w-6 h-6 text-[var(--text-primary)]" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center py-8 px-6">
        <AnonymousAvatar seed={userId} size="large" trustLevel={2} />
        
        <div className="mt-6 text-center">
          <h3>Anonim #{userId}</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Yardım Ruhu</p>
        </div>

        {/* HelpRank Visualization */}
        <div className="mt-8 w-full max-w-xs">
          <div className="flex justify-center items-end gap-1 h-24">
            {[...Array(10)].map((_, i) => {
              const height = Math.min(100, (helpRank / 100) * (i + 1) * 15);
              return (
                <div
                  key={i}
                  className="flex-1 bg-[var(--string-color)] rounded-t transition-all duration-1000"
                  style={{ height: `${height}%`, opacity: 0.3 + (height / 100) * 0.7 }}
                />
              );
            })}
          </div>
          <p className="text-center text-sm text-[var(--text-secondary)] mt-2">HelpRank: {helpRank}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-8">
          <div className="text-center">
            <p className="text-2xl">{helpedCount}</p>
            <p className="text-sm text-[var(--text-secondary)]">Yardım Edilen</p>
          </div>
          <div className="text-center">
            <p className="text-2xl">{receivedCount}</p>
            <p className="text-sm text-[var(--text-secondary)]">Yardım Alınan</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--text-secondary)] border-opacity-20">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 text-sm transition-all ${
            activeTab === 'active'
              ? 'text-[var(--text-primary)] border-b-2 border-[var(--string-color)]'
              : 'text-[var(--text-secondary)]'
          }`}
        >
          Aktif Sohbetler
        </button>
        <button
          onClick={() => setActiveTab('solved')}
          className={`flex-1 py-3 text-sm transition-all ${
            activeTab === 'solved'
              ? 'text-[var(--text-primary)] border-b-2 border-[var(--string-color)]'
              : 'text-[var(--text-secondary)]'
          }`}
        >
          Çözülenler
        </button>
        <button
          onClick={() => setActiveTab('interests')}
          className={`flex-1 py-3 text-sm transition-all ${
            activeTab === 'interests'
              ? 'text-[var(--text-primary)] border-b-2 border-[var(--string-color)]'
              : 'text-[var(--text-secondary)]'
          }`}
        >
          İlgi Alanları
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 px-6 py-4">
        {activeTab === 'active' && (
          <div className="space-y-3">
            {activeChats.map((chat) => (
              <div
                key={chat.id}
                className="p-4 rounded-2xl border border-[var(--text-secondary)] border-opacity-20 hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AnonymousAvatar seed={chat.id * 1000} size="small" trustLevel={1} />
                    <div>
                      <p className="text-sm">{chat.preview}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'solved' && (
          <div className="space-y-3">
            {solvedQuestions.map((question) => (
              <div
                key={question.id}
                className="p-4 rounded-2xl border border-[var(--text-secondary)] border-opacity-20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[var(--text-secondary)]">{question.topic}</span>
                    <p className="text-sm mt-1">{question.title}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[var(--accent-green)] bg-opacity-20 text-[var(--accent-green)]">
                    {question.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'interests' && (
          <div className="flex flex-wrap gap-3">
            {userInterests.map((interest) => (
              <div
                key={interest}
                className="px-4 py-2 rounded-full bg-[var(--string-color)] text-[var(--bg-primary)] text-sm"
              >
                {interest}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
