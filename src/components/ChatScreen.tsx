import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Languages, MoreVertical } from 'lucide-react';
import { AnonymousAvatar } from './AnonymousAvatar';
import { motion } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
}

interface ChatScreenProps {
  onBack: () => void;
  partnerId: number;
  trustLevel: number;
  onTrustLevelUp?: () => void;
}

export function ChatScreen({ onBack, partnerId, trustLevel, onTrustLevelUp }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Sana nasıl yardımcı olabilirim?',
      sender: 'other',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        'Anlıyorum. Devam et, dinliyorum.',
        'Bu çok ilginç bir bakış açısı.',
        'Peki bu konuda ne hissediyorsun?',
        'Daha önce böyle bir durum yaşadın mı?',
        'Belki farklı bir açıdan bakabiliriz.',
      ];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'other',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, responseMessage]);
      setIsTyping(false);

      // Level up simulation
      if (messages.length > 5 && trustLevel === 0 && onTrustLevelUp) {
        setTimeout(() => onTrustLevelUp(), 2000);
      }
    }, 2000);
  };

  const getPartnerName = () => {
    if (trustLevel === 0) return 'Anonim';
    if (trustLevel === 1) return `Anonim #${partnerId}`;
    if (trustLevel === 2) return `Kullanıcı #${partnerId}`;
    return `Arkadaş #${partnerId}`;
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--text-secondary)] border-opacity-20">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:opacity-70">
            <ArrowLeft className="w-5 h-5 text-[var(--text-primary)]" />
          </button>
          <AnonymousAvatar seed={partnerId} size="small" trustLevel={trustLevel} />
          <div>
            <h3 className="text-sm">{getPartnerName()}</h3>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i < trustLevel ? 'bg-[var(--accent-green)]' : 'bg-[var(--text-secondary)] opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="p-2 hover:opacity-70">
          <MoreVertical className="w-5 h-5 text-[var(--text-primary)]" />
        </button>
      </div>

      {/* String Indicator */}
      <div className="h-1 bg-[var(--bg-secondary)] relative overflow-hidden">
        {isTyping && (
          <motion.div
            className="absolute inset-0 bg-[var(--string-color)]"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-3xl ${
                message.sender === 'me'
                  ? 'bg-[var(--string-color)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[var(--bg-secondary)] px-5 py-3 rounded-3xl">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-[var(--text-secondary)] rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-[var(--text-secondary)] border-opacity-20">
        <div className="flex items-center gap-2 bg-[var(--bg-secondary)] rounded-full px-4 py-2">
          <button className="p-2 hover:opacity-70">
            <Languages className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Mesaj yaz..."
            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-2 rounded-full transition-colors ${
              inputText.trim()
                ? 'bg-[var(--string-color)] text-[var(--bg-primary)] hover:opacity-80'
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
