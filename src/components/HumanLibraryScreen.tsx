import React from 'react';
import { ArrowLeft, Circle } from 'lucide-react';
import { AnonymousAvatar } from './AnonymousAvatar';

interface HumanLibraryScreenProps {
  onBack: () => void;
  onSelectPerson: (id: number) => void;
}

const libraryPeople = [
  {
    id: 1,
    seed: 7392,
    expertise: 'Eski Tarikat Üyesi',
    bio: 'Eski bir tarikat üyesiyim. Sor.',
    available: true,
  },
  {
    id: 2,
    seed: 4821,
    expertise: 'Profesyonel Dalgıç',
    bio: '15 yıldır derin denizlerde çalışıyorum. Korkularla yüzleşmek üzerine konuşabiliriz.',
    available: true,
  },
  {
    id: 3,
    seed: 9156,
    expertise: 'Minimalist Yaşam Koçu',
    bio: 'Her şeyimi bırakıp 30 eşyayla yaşamaya başladım. Özgürleşme yolculuğu.',
    available: false,
  },
  {
    id: 4,
    seed: 2847,
    expertise: 'Eski Hapisane Müdürü',
    bio: '20 yıl hapishane sisteminde çalıştım. İnsan doğası üzerine çok şey öğrendim.',
    available: true,
  },
  {
    id: 5,
    seed: 6193,
    expertise: 'Kanser Survivor',
    bio: '3 kez kanser atlattım. Hayat, ölüm ve anlamlar üzerine konuşalım.',
    available: true,
  },
  {
    id: 6,
    seed: 3728,
    expertise: 'Dünya Gezgini',
    bio: '87 ülke gezdim. Kültür, yalnızlık ve keşif hakkında.',
    available: false,
  },
];

export function HumanLibraryScreen({ onBack, onSelectPerson }: HumanLibraryScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-[var(--text-secondary)] border-opacity-20">
        <button onClick={onBack} className="p-2 hover:opacity-70">
          <ArrowLeft className="w-6 h-6 text-[var(--text-primary)]" />
        </button>
        <div className="ml-4">
          <h2>İnsan Kütüphanesi</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Her insan bir kitaptır</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-6 bg-[var(--bg-secondary)] bg-opacity-30">
        <p className="text-sm text-[var(--text-secondary)] text-center">
          Benzersiz deneyimlere sahip insanlarla bağlan. Onların hikayelerinden öğren.
        </p>
      </div>

      {/* Library Cards */}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {libraryPeople.map((person) => (
          <div
            key={person.id}
            onClick={() => person.available && onSelectPerson(person.id)}
            className={`p-5 rounded-2xl border border-[var(--string-color)] bg-[var(--bg-primary)] transition-all duration-400 ${
              person.available
                ? 'hover:bg-[var(--bg-secondary)] cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-start gap-4">
              <AnonymousAvatar seed={person.seed} size="medium" trustLevel={2} />
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm">{person.expertise}</h3>
                  <div className="flex items-center gap-1 ml-2">
                    <Circle
                      className={`w-2 h-2 ${
                        person.available ? 'fill-[var(--accent-green)] text-[var(--accent-green)]' : 'fill-[var(--text-secondary)] text-[var(--text-secondary)]'
                      }`}
                    />
                    <span className="text-xs text-[var(--text-secondary)]">
                      {person.available ? 'Müsait' : 'Meşgul'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {person.bio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="px-6 py-4 border-t border-[var(--text-secondary)] border-opacity-20">
        <p className="text-xs text-center text-[var(--text-secondary)]">
          Konuşmalar tamamen gönüllülük esasına dayanır ve anonimdir.
        </p>
      </div>
    </div>
  );
}
