import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Moon, Sun, Bell, Globe, Shield, LogOut } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  userId: number;
}

export function SettingsScreen({ onBack, userId }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const settingsSections = [
    {
      title: 'Hesap',
      items: [
        {
          icon: Shield,
          label: 'Anonim ID',
          value: `#${userId}`,
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Tercihler',
      items: [
        {
          icon: Bell,
          label: 'Bildirimler',
          toggle: true,
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
        {
          icon: darkMode ? Moon : Sun,
          label: 'Karanlık Mod',
          toggle: true,
          value: darkMode,
          onChange: toggleDarkMode,
        },
        {
          icon: Globe,
          label: 'Çeviri Dili',
          value: 'Türkçe',
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Gelişmiş',
      items: [
        {
          icon: Shield,
          label: 'Polygon ID Bağla',
          value: 'Yakında',
          disabled: true,
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Hakkında',
      items: [
        {
          icon: Shield,
          label: 'Gizlilik Politikası',
          onClick: () => {},
        },
        {
          icon: Shield,
          label: 'Kullanım Koşulları',
          onClick: () => {},
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-[var(--text-secondary)] border-opacity-20">
        <button onClick={onBack} className="p-2 hover:opacity-70">
          <ArrowLeft className="w-6 h-6 text-[var(--text-primary)]" />
        </button>
        <h2 className="ml-4">Ayarlar</h2>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="py-4">
            <h3 className="px-6 text-xs text-[var(--text-secondary)] mb-3">{section.title}</h3>
            <div className="bg-[var(--bg-primary)]">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`w-full px-6 py-4 flex items-center justify-between border-b border-[var(--text-secondary)] border-opacity-10 transition-colors ${
                      item.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[var(--text-secondary)]" />
                      <span className="text-[var(--text-primary)]">{item.label}</span>
                    </div>

                    {item.toggle !== undefined ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          item.onChange?.(!item.value);
                        }}
                        className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                          item.value ? 'bg-[var(--accent-green)]' : 'bg-[var(--text-secondary)] opacity-30'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
                            item.value ? 'translate-x-6' : 'translate-x-0.5'
                          } mt-0.5`}
                        />
                      </div>
                    ) : item.value ? (
                      <span className="text-[var(--text-secondary)] text-sm">{item.value}</span>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="px-6 py-8">
          <button className="w-full py-4 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-10 transition-colors flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-8 text-center">
          <p className="text-xs text-[var(--text-secondary)]">Help Me v1.0.0</p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">Yavaş Sosyal Ağ</p>
        </div>
      </div>
    </div>
  );
}
