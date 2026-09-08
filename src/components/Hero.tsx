import React from 'react';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="max-w-3xl space-y-6 pt-2">
      <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.2] text-ink-900 dark:text-white">
        အရာရာကို ခွဲခြားသိမြင်ပြီး{' '}
        <span className="text-emerald-600 dark:text-emerald-400">Control</span> →{' '}
        <span className="text-amber-600 dark:text-amber-400">Influence</span> →{' '}
        <span className="text-blue-600 dark:text-blue-400">Accept</span>{' '}
        လုပ်ပါ
      </h1>

      <p className="text-base sm:text-lg text-ink-700 dark:text-ink-200 leading-relaxed">
        ပြဿနာတစ်ခုလုံးကို ခေါင်းထဲထည့်ပြီး ပူပန်နေမယ့်အစား —{' '}
        <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">
          ကိုယ်တိုင်လုပ်နိုင်တာ
        </strong>
        ၊{' '}
        <strong className="text-amber-700 dark:text-amber-400 font-semibold">
          သက်ရောက်မှုဖန်တီးနိုင်တာ
        </strong>{' '}
        နဲ့{' '}
        <strong className="text-blue-700 dark:text-blue-400 font-semibold">
          လက်ခံရမယ့်အဖြစ်မှန်
        </strong>{' '}
        ဆိုပြီး အပိုင်း ၃ ပိုင်း ခွဲထုတ်လိုက်ပါ။
      </p>

      <blockquote className="border-l-4 border-brand-500 pl-4 py-1.5 text-ink-800 dark:text-ink-100 font-medium italic text-sm sm:text-base leading-relaxed bg-brand-50/40 dark:bg-brand-950/20 rounded-r-xl">
        “ကိုယ်ထိန်းချုပ်နိုင်တာကို မဆိုင်းမတွ လုပ်ပါ။ သက်ရောက်နိုင်တာကို အကောင်းဆုံးကြိုးစားပါ။ မပြောင်းလဲနိုင်တာကို လက်ခံပြီး အရှေ့ဆက်ရမယ့် Next Best Action ကို ရွေးချယ်ပါ။”
      </blockquote>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <a
          href="#sorter"
          id="hero-start-canvas-btn"
          className="px-5 sm:px-6 py-3 rounded-xl bg-ink-900 dark:bg-brand-500 text-white dark:text-ink-900 font-semibold text-sm hover:bg-ink-800 dark:hover:bg-brand-400 shadow-sm transition active:scale-[0.98] flex items-center gap-2 min-h-[44px]"
        >
          <span>ပြဿနာကို စတင်ခွဲခြမ်းစိတ်ဖြာမယ်</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <a
          href="#triage"
          id="hero-triage-btn"
          className="px-4 sm:px-5 py-3 rounded-xl border border-ink-900/20 dark:border-white/20 text-ink-800 dark:text-ink-100 font-semibold text-sm hover:bg-ink-900/5 dark:hover:bg-white/5 transition flex items-center gap-2 min-h-[44px]"
        >
          <HelpCircle className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>မေးခွန်း ၃ ခုဖြင့် စစ်ဆေးမယ်</span>
        </a>

        <a
          href="https://gemini.google.com/gem/1bNY_IEaT7nQddwbfVO-t4OrDpfJCEcfT?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          id="hero-gemini-btn"
          className="px-4 sm:px-5 py-3 rounded-xl border border-brand-500/40 bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900/50 text-brand-700 dark:text-brand-300 font-semibold text-sm flex items-center gap-2 transition active:scale-[0.98] min-h-[44px]"
        >
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Gemini AI Gem ဖြင့် တိုင်ပင်မယ်</span>
          <span className="text-xs opacity-70">↗</span>
        </a>
      </div>
    </section>
  );
};
