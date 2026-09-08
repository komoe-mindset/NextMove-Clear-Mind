import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-ink-900/10 dark:border-white/10 py-10 no-print">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-2.5">
        <div className="flex items-center justify-center gap-2 font-bold text-ink-800 dark:text-ink-100">
          <Compass className="w-4 h-4 text-brand-500" />
          <span>NextMove | Control → Influence → Accept</span>
        </div>
        <p className="text-xs text-ink-500 dark:text-ink-300 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>100% Client-Side & Offline Ready</span>
        </p>
        <p className="text-xs text-ink-500 dark:text-ink-300">
          ဒေတာများကို သင့် Browser ၏ Local Storage တွင်သာ လုံခြုံစွာ သိမ်းဆည်းပါသည်
        </p>
        <p className="text-[11px] text-ink-400 dark:text-ink-400">
          No External Trackers • Open Mindset & Stoic Clarity
        </p>
      </div>
    </footer>
  );
};
