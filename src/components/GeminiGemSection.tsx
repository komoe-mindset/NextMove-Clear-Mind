import React from 'react';
import { Lightbulb, Sparkles, ExternalLink } from 'lucide-react';

export const GeminiGemSection: React.FC = () => {
  return (
    <div className="space-y-6 pt-2">
      {/* Anti-Overthinking Golden Rule */}
      <section className="p-6 sm:p-7 rounded-2xl bg-ink-900 dark:bg-ink-950 dark:border dark:border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center gap-5 border-l-4 border-l-brand-500 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl shrink-0">
          <Lightbulb className="w-6 h-6 text-brand-300" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="text-lg font-black tracking-tight">
            Anti-Overthinking Golden Rule
          </h4>
          <p className="text-xs sm:text-sm text-ink-100/90 leading-relaxed">
            အသုံးဝင်သော စဉ်းစားတွေးခေါ်မှုသည် အဆုံးသတ်တွင်{' '}
            <strong className="text-brand-300">Decision (ဆုံးဖြတ်ချက်)</strong>၊{' '}
            <strong className="text-brand-300">Action (လုပ်ဆောင်ချက်)</strong>{' '}
            သို့မဟုတ်{' '}
            <strong className="text-brand-300">
              Radical Acceptance (လက်ခံမှု)
            </strong>{' '}
            တစ်ခုခုကို ဖြစ်ပေါ်စေရပါမည်။ ဘာရလဒ်မှ မထွက်ဘဲ စိုးရိမ်မှုတစ်ခုတည်းကိုသာ ထပ်ခါတလဲလဲ တွေးနေပါက ၎င်းသည် ပြဿနာဖြေရှင်းခြင်း မဟုတ်ဘဲ စိတ်ဆင်းရဲစေသော Rumination (စွဲတွေးခြင်း) သာ ဖြစ်ပါသည်။
          </p>
        </div>
      </section>

      {/* Gemini Gem Assistant Section */}
      <section className="p-6 sm:p-7 rounded-2xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-brand-500 text-ink-900 text-[10px] font-black tracking-wide">
              GEMINI GEM
            </span>
            <span className="text-xs text-brand-700 dark:text-brand-300 font-semibold">
              AI Problem Solving Partner
            </span>
          </div>
          <h4 className="text-lg font-bold text-ink-900 dark:text-white">
            NextMove Gemini Gem ဖြင့် 1-on-1 ဆွေးနွေးပါ
          </h4>
          <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-200 leading-relaxed">
            သင့်လက်ရှိပြဿနာကို AI Coach ထံ ပြောပြပြီး Control, Influence, Accept ခွဲခြမ်းစိတ်ဖြာမှု အကြံဉာဏ်များနှင့် Next Step အစီအစဉ်များကို အချိန်မရွေး တိုက်ရိုက်ရယူပါ။
          </p>
        </div>
        <a
          href="https://gemini.google.com/gem/1bNY_IEaT7nQddwbfVO-t4OrDpfJCEcfT?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-ink-900 dark:bg-brand-500 hover:bg-ink-800 dark:hover:bg-brand-400 text-white dark:text-ink-900 text-xs font-bold transition flex items-center gap-2 whitespace-nowrap shadow-sm active:scale-[0.98] min-h-[44px]"
        >
          <Sparkles className="w-4 h-4 text-brand-400 dark:text-ink-900" />
          <span>Open in Gemini</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </section>
    </div>
  );
};
