import React from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { AnonymousAvatar } from "./AnonymousAvatar";

interface GiveHelpScreenProps {
  onBack: () => void;
  onSelectQuestion: (questionId: number) => void;
  onRespondToBottle?: (messageId: number) => void;
}

const waitingQuestions = [
  {
    id: 1,
    seed: 3421,
    text: "Yazılım mühendisliğinden aşçılığa geçiş yapmayı düşünüyorum. Böyle radikal bir kariyer değişikliği yapan var mı?",
    tags: ["Kariyer", "Yaşam"],
    timeAgo: "2dk önce",
    distance: "~120 km",
  },
  {
    id: 2,
    seed: 7892,
    text: "İlişkimde sürekli aynı konuda tartışıyoruz. Nasıl kırılma noktasını bulabiliriz?",
    tags: ["İlişkiler"],
    timeAgo: "5dk önce",
    distance: "~340 km",
  },
  {
    id: 3,
    seed: 1256,
    text: "Yeni bir hobi edinmek istiyorum ama ne yapacağımı bilmiyorum. 30lu yaşlarda yeni başlamak için önerileriniz var mı?",
    tags: ["Hobi", "Yaşam"],
    timeAgo: "12dk önce",
    distance: "~50 km",
  },
  {
    id: 4,
    seed: 9834,
    text: "Meditasyon ve mindfulness pratiği yapmak istiyorum ama zihin çok hareketli. Nereden başlamalıyım?",
    tags: ["Sağlık", "Yaşam"],
    timeAgo: "18dk önce",
    distance: "~890 km",
  },
  {
    id: 5,
    seed: 4567,
    text: "Minimalist yaşam tarzına geçmek istiyorum. İlk adımlar neler olmalı?",
    tags: ["Yaşam"],
    timeAgo: "25dk önce",
    distance: "~210 km",
  },
];

export function GiveHelpScreen({
  onBack,
  onSelectQuestion,
}: GiveHelpScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-[var(--text-secondary)] border-opacity-20">
        <button
          onClick={onBack}
          className="p-2 hover:opacity-70"
        >
          <ArrowLeft className="w-6 h-6 text-[var(--text-primary)]" />
        </button>
        <div className="ml-4">
          <h2>Yardım Et</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Birinin ipini yakala
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 py-4 bg-[var(--bg-secondary)] bg-opacity-30">
        <p className="text-sm text-[var(--text-secondary)] text-center">
          Sana yakın birisi yardım bekliyor. İstediğin soruya
          cevap verebilirsin.
        </p>
      </div>

      {/* Questions List */}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {waitingQuestions.map((question) => (
          <div
            key={question.id}
            onClick={() => onSelectQuestion(question.id)}
            className="p-5 rounded-2xl border border-[var(--string-color)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] transition-all duration-400 cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <AnonymousAvatar
                seed={question.seed}
                size="small"
                trustLevel={0}
              />

              <div className="flex-1">
                <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-3">
                  {question.text}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-[var(--string-color)] bg-opacity-10 text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>{question.timeAgo}</span>
                  <span>{question.distance}</span>
                </div>
              </div>

              <MessageCircle className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[var(--text-secondary)] border-opacity-20">
        <p className="text-xs text-center text-[var(--text-secondary)]">
          Yardım ettiğin her kişi, HelpRank'ini artırır.
        </p>
      </div>
    </div>
  );
}