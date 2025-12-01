import React, { useState } from 'react';
import { OnboardingWelcome } from './components/OnboardingWelcome';
import { OnboardingPhilosophy } from './components/OnboardingPhilosophy';
import { OnboardingProfile } from './components/OnboardingProfile';
import { HomeScreen } from './components/HomeScreen';
import { AskHelpScreen } from './components/AskHelpScreen';
import { GiveHelpScreen } from './components/GiveHelpScreen';
import { WaitingScreen } from './components/WaitingScreen';
import { ChatScreen } from './components/ChatScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { HumanLibraryScreen } from './components/HumanLibraryScreen';
import { ThirtySixQuestionsScreen } from './components/ThirtySixQuestionsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { LevelUpModal } from './components/LevelUpModal';
import './styles/globals.css';

type Screen =
  | 'welcome'
  | 'philosophy'
  | 'profile'
  | 'home'
  | 'ask-help'
  | 'give-help'
  | 'waiting'
  | 'chat'
  | 'user-profile'
  | 'human-library'
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [trustLevel, setTrustLevel] = useState(0);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [show36Questions, setShow36Questions] = useState(false);

  const userId = 7392;
  const partnerId = 4821;

  const handleOnboardingComplete = (interests: string[]) => {
    setUserInterests(interests);
    setCurrentScreen('home');
  };

  const handleSendQuestion = (question: string, tags: string[]) => {
    console.log('Question sent:', question, 'Tags:', tags);
    setCurrentScreen('waiting');
  };

  const handleConnected = () => {
    setCurrentScreen('chat');
  };

  const handleTrustLevelUp = () => {
    const nextLevel = trustLevel + 1;
    setNewLevel(nextLevel);
    setTrustLevel(nextLevel);
    setShowLevelUpModal(true);
  };

  const handleSelectQuestion = (questionId: number) => {
    console.log('Selected question:', questionId);
    setCurrentScreen('chat');
  };

  const handleRespondToBottle = (messageId: number) => {
    console.log('Responding to bottle message:', messageId);
    setCurrentScreen('chat');
  };

  const handleSelectLibraryPerson = (personId: number) => {
    console.log('Selected person:', personId);
    setCurrentScreen('chat');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {currentScreen === 'welcome' && (
        <OnboardingWelcome onNext={() => setCurrentScreen('philosophy')} />
      )}

      {currentScreen === 'philosophy' && (
        <OnboardingPhilosophy onNext={() => setCurrentScreen('profile')} />
      )}

      {currentScreen === 'profile' && (
        <OnboardingProfile onComplete={handleOnboardingComplete} />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          onAskHelp={() => setCurrentScreen('ask-help')}
          onGiveHelp={() => setCurrentScreen('give-help')}
          onProfile={() => setCurrentScreen('user-profile')}
          onNotifications={() => {}}
          onRespondToBottle={handleRespondToBottle}
        />
      )}

      {currentScreen === 'ask-help' && (
        <AskHelpScreen
          onBack={() => setCurrentScreen('home')}
          onSend={handleSendQuestion}
        />
      )}

      {currentScreen === 'give-help' && (
        <GiveHelpScreen
          onBack={() => setCurrentScreen('home')}
          onSelectQuestion={handleSelectQuestion}
          onRespondToBottle={handleRespondToBottle}
        />
      )}

      {currentScreen === 'waiting' && (
        <WaitingScreen onConnected={handleConnected} />
      )}

      {currentScreen === 'chat' && (
        <ChatScreen
          onBack={() => setCurrentScreen('home')}
          partnerId={partnerId}
          trustLevel={trustLevel}
          onTrustLevelUp={handleTrustLevelUp}
        />
      )}

      {currentScreen === 'user-profile' && (
        <ProfileScreen
          onBack={() => setCurrentScreen('home')}
          onSettings={() => setCurrentScreen('settings')}
          userInterests={userInterests}
          userId={userId}
        />
      )}

      {currentScreen === 'human-library' && (
        <HumanLibraryScreen
          onBack={() => setCurrentScreen('home')}
          onSelectPerson={handleSelectLibraryPerson}
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen
          onBack={() => setCurrentScreen('user-profile')}
          userId={userId}
        />
      )}

      {showLevelUpModal && (
        <LevelUpModal
          onClose={() => setShowLevelUpModal(false)}
          newLevel={newLevel}
        />
      )}

      {show36Questions && (
        <ThirtySixQuestionsScreen onClose={() => setShow36Questions(false)} />
      )}

      {/* Bottom Navigation - Only shown on home screen */}
      {currentScreen === 'home' && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--bg-primary)] border-t border-[var(--text-secondary)] border-opacity-20 py-2 px-6">
          <div className="flex justify-around max-w-md mx-auto">
            <button
              onClick={() => setCurrentScreen('home')}
              className="p-3 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentScreen('human-library')}
              className="p-3 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
              </svg>
            </button>
            <button
              onClick={() => setShow36Questions(true)}
              className="p-3 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}