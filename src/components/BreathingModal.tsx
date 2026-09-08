import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BreathingModal: React.FC<BreathingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  const phases = [
    { text: 'ရှူသွင်းပါ... (Inhale)', scale: 'scale-125' },
    { text: 'အောင့်ထားပါ... (Hold)', scale: 'scale-125' },
    { text: 'ဖြည်းဖြည်းချင်း ရှူထုတ်ပါ... (Exhale)', scale: 'scale-85' },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-ink-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-ink-900 border border-ink-900/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-400 hover:text-ink-700 dark:hover:text-ink-100 p-2 rounded-lg transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h3 className="text-xl font-black text-ink-900 dark:text-white">
            1-Minute Clarity Pause
          </h3>
          <p className="text-xs text-ink-500 dark:text-ink-300 leading-relaxed">
            အတွေးတွေ အလွန်များနေချိန်တွင် ဝင်လေထွက်လေကို မှန်မှန်ရှူသွင်းပြီး စိတ်ကို ပြန်စုစည်းပါ။
          </p>
        </div>

        <div className="py-6 flex items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border border-brand-400/30 dark:border-brand-500/30 animate-ping opacity-25"></div>

            {/* Bubble */}
            <div
              className={`w-36 h-36 rounded-full bg-brand-500 dark:bg-brand-500 text-ink-900 font-bold text-sm flex items-center justify-center shadow-lg transition-transform duration-1000 ease-in-out select-none ${
                phases[phaseIndex].scale
              }`}
            >
              <span className="px-2 text-center text-xs sm:text-sm font-extrabold text-ink-950">
                {phases[phaseIndex].text}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-ink-900 dark:bg-brand-500 hover:bg-ink-800 dark:hover:bg-brand-400 text-white dark:text-ink-900 font-bold text-xs transition shadow-sm min-h-[44px]"
          >
            စိတ်ငြိမ်သွားပြီ — ပြဿနာဖြေရှင်းမည်
          </button>
        </div>
      </div>
    </div>
  );
};
