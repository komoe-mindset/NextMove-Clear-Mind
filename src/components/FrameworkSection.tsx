import React, { useState } from 'react';

export const FrameworkSection: React.FC = () => {
  const [highlightedCircle, setHighlightedCircle] = useState<'control' | 'influence' | 'accept' | null>(null);

  return (
    <section id="framework" className="scroll-mt-24 space-y-8">
      {/* Section Header */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-brand-600 dark:text-brand-400 font-bold">
          01
        </span>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
            CIA Decision Framework
          </h2>
          <p className="text-sm text-ink-500 dark:text-ink-300 mt-1">
            ပြဿနာတစ်ခုကြုံလာပါက စွမ်းအင်ကို အချိုးကျ ခွဲဝေအသုံးချရန် စိတ်ပိုင်းဆိုင်ရာ မူဘောင်
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-center">
        {/* Concentric Circles Graphic */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-ink-900/10 dark:border-white/10 flex flex-col items-center justify-center bg-white/40 dark:bg-ink-900/40">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
            {/* Outer: Accept */}
            <div
              onMouseEnter={() => setHighlightedCircle('accept')}
              onMouseLeave={() => setHighlightedCircle(null)}
              className={`absolute inset-0 rounded-full border-2 border-blue-400/60 bg-blue-500/[0.06] flex items-start justify-center pt-3 transition-transform duration-300 cursor-pointer ${
                highlightedCircle === 'accept' ? 'scale-105 bg-blue-500/[0.12] border-blue-500' : 'hover:scale-[1.02]'
              }`}
            >
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 tracking-wide">
                3. ACCEPT
              </span>
            </div>

            {/* Middle: Influence */}
            <div
              onMouseEnter={() => setHighlightedCircle('influence')}
              onMouseLeave={() => setHighlightedCircle(null)}
              className={`absolute inset-8 rounded-full border-2 border-amber-400/70 bg-amber-500/[0.08] flex items-start justify-center pt-3 transition-transform duration-300 cursor-pointer ${
                highlightedCircle === 'influence' ? 'scale-105 bg-amber-500/[0.15] border-amber-500' : 'hover:scale-[1.03]'
              }`}
            >
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 tracking-wide">
                2. INFLUENCE
              </span>
            </div>

            {/* Inner: Control */}
            <div
              onMouseEnter={() => setHighlightedCircle('control')}
              onMouseLeave={() => setHighlightedCircle(null)}
              className={`absolute inset-16 sm:inset-20 rounded-full bg-emerald-600 text-white flex flex-col items-center justify-center p-2 text-center shadow-md transition-transform duration-300 cursor-pointer ${
                highlightedCircle === 'control' ? 'scale-110 shadow-lg' : 'hover:scale-105'
              }`}
            >
              <span className="text-xs font-black tracking-wide">1. CONTROL</span>
              <span className="text-[10px] opacity-90 font-medium">100% Direct Action</span>
            </div>
          </div>

          <p className="text-xs text-center text-ink-500 dark:text-ink-300 mt-3 leading-relaxed">
            Energy ကို အလယ်ဗဟို (Control) မှာ စုစည်းပြီး အပြင်ဘက်အလွှာ (Accept) ကို လက်ခံပေးပါ။
          </p>
        </div>

        {/* 3 Color-Coded Cards */}
        <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
          {/* Control Card */}
          <div
            className={`p-5 rounded-xl border border-ink-900/10 dark:border-white/10 border-t-4 border-t-emerald-600 bg-white dark:bg-ink-900/70 flex flex-col justify-between transition-all duration-200 ${
              highlightedCircle === 'control' ? 'ring-2 ring-emerald-500 shadow-md scale-[1.02]' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-sm font-black flex items-center justify-center">
                  1
                </span>
                <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">
                  ACT NOW
                </span>
              </div>
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                CONTROL
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 mt-2 leading-relaxed">
                ကိုယ်တိုင် တိုက်ရိုက်ဆုံးဖြတ်၊ စတင်၊ ရပ်တန့်၊ ပြင်ဆင်၊ ပြောဆို၊ လေ့ကျင့်နိုင်တဲ့အရာများ။
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-900/10 dark:border-emerald-100/10">
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-600/20 text-emerald-800 dark:text-emerald-200">
                  ကိုယ့်စကား
                </span>
                <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-600/20 text-emerald-800 dark:text-emerald-200">
                  ပြင်ဆင်မှု
                </span>
                <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-600/20 text-emerald-800 dark:text-emerald-200">
                  တုံ့ပြန်ပုံ
                </span>
              </div>
            </div>
          </div>

          {/* Influence Card */}
          <div
            className={`p-5 rounded-xl border border-ink-900/10 dark:border-white/10 border-t-4 border-t-amber-600 bg-white dark:bg-ink-900/70 flex flex-col justify-between transition-all duration-200 ${
              highlightedCircle === 'influence' ? 'ring-2 ring-amber-500 shadow-md scale-[1.02]' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-600 text-white text-sm font-black flex items-center justify-center">
                  2
                </span>
                <span className="text-[11px] font-extrabold text-amber-700 dark:text-amber-400">
                  TRY WISELY
                </span>
              </div>
              <h3 className="text-lg font-bold text-amber-700 dark:text-amber-300">
                INFLUENCE
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 mt-2 leading-relaxed">
                ၁၀၀% မထိန်းချုပ်နိုင်သော်လည်း တောင်းဆိုခြင်း၊ ဆက်သွယ်ညှိနှိုင်းခြင်းဖြင့် အလားအလာကောင်းအောင် ပြုလုပ်နိုင်သောအရာများ။
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-900/10 dark:border-amber-100/10">
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-600/20 text-amber-800 dark:text-amber-200">
                  ဆွေးနွေးညှိနှိုင်း
                </span>
                <span className="text-[11px] bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-600/20 text-amber-800 dark:text-amber-200">
                  Follow-up
                </span>
                <span className="text-[11px] bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-600/20 text-amber-800 dark:text-amber-200">
                  တောင်းဆိုမှု
                </span>
              </div>
            </div>
          </div>

          {/* Accept Card */}
          <div
            className={`p-5 rounded-xl border border-ink-900/10 dark:border-white/10 border-t-4 border-t-blue-600 bg-white dark:bg-ink-900/70 flex flex-col justify-between transition-all duration-200 ${
              highlightedCircle === 'accept' ? 'ring-2 ring-blue-500 shadow-md scale-[1.02]' : ''
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-black flex items-center justify-center">
                  3
                </span>
                <span className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400">
                  ADAPT & LET GO
                </span>
              </div>
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">
                ACCEPT
              </h3>
              <p className="text-xs text-ink-600 dark:text-ink-300 mt-2 leading-relaxed">
                လက်ရှိအချိန်တွင် မပြောင်းလဲနိုင်သော Reality။ လက်လျှော့ခြင်း မဟုတ်ဘဲ မပြောင်းနိုင်သည့်အရာနှင့် တိုက်ခိုက်နေသော စိတ်အားကို Next Step ဆီ ရွှေ့ခြင်း။
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-900/10 dark:border-blue-100/10">
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-600/20 text-blue-800 dark:text-blue-200">
                  အတိတ်
                </span>
                <span className="text-[11px] bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-600/20 text-blue-800 dark:text-blue-200">
                  တခြားသူ့ဆုံးဖြတ်ချက်
                </span>
                <span className="text-[11px] bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-600/20 text-blue-800 dark:text-blue-200">
                  မသေချာမှု
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Step Clarity to Action Flow */}
      <div className="p-6 sm:p-8 rounded-2xl bg-ink-900 dark:bg-ink-950 dark:border dark:border-white/10 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h3 className="text-xl sm:text-2xl font-bold">
            7-Step Clarity to Action Flow
          </h3>
          <span className="text-xs text-ink-200/70 font-normal">
            “မပူနဲ့လို့ပြောတာမဟုတ်ပါ၊ ပူပန်မှုကို Decision အဖြစ် ပြောင်းလဲတာဖြစ်ပါတယ်”
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-left">
          <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <span className="text-ink-200/60 font-mono font-bold text-xs">01</span>
            <h4 className="font-bold text-sm text-white my-1">Pause</h4>
            <p className="text-[11px] text-ink-200/70 leading-relaxed">
              စိတ်ရှုပ်ထွေးမှု လျော့ကျအောင် အရင်ရပ်ကြည့်ပါ
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <span className="text-ink-200/60 font-mono font-bold text-xs">02</span>
            <h4 className="font-bold text-sm text-white my-1">Deconstruct</h4>
            <p className="text-[11px] text-ink-200/70 leading-relaxed">
              အချက်အလက် (Fact) နဲ့ စိုးရိမ်မှု (Fear) ကိုခွဲထုတ်ပါ
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.04] border border-emerald-500/40 flex flex-col justify-between">
            <span className="text-emerald-400 font-mono font-bold text-xs">03</span>
            <h4 className="font-bold text-sm text-emerald-300 my-1">Control</h4>
            <p className="text-[11px] text-ink-200/70 leading-relaxed">
              ကိုယ်တိုင် တိုက်ရိုက်လုပ်နိုင်တာကို ရှာဖွေပါ
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.04] border border-amber-500/40 flex flex-col justify-between">
            <span className="text-amber-400 font-mono font-bold text-xs">04</span>
            <h4 className="font-bold text-sm text-amber-300 my-1">Influence</h4>
            <p className="text-[11px] text-ink-200/70 leading-relaxed">
              ဆက်သွယ်၊ တောင်းဆို၊ ညှိနှိုင်းကြည့်ပါ
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.04] border border-blue-500/40 flex flex-col justify-between">
            <span className="text-blue-400 font-mono font-bold text-xs">05</span>
            <h4 className="font-bold text-sm text-blue-300 my-1">Accept</h4>
            <p className="text-[11px] text-ink-200/70 leading-relaxed">
              မပြောင်းလဲနိုင်သည့် Reality ကို လက်ခံပါ
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.04] border border-brand-500/50 flex flex-col justify-between">
            <span className="text-brand-400 font-mono font-bold text-xs">06</span>
            <h4 className="font-bold text-sm text-brand-300 my-1">Act (Next Step)</h4>
            <p className="text-[11px] text-ink-200/70 leading-relaxed">
              ၂၀ မိနစ်အတွင်း လုပ်နိုင်သည့် Single Action ရွေးပါ
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/10 flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-ink-200/60 font-mono font-bold text-xs">07</span>
            <h4 className="font-bold text-sm text-white my-1">Review</h4>
            <p className="text-[11px] text-ink-200/70 leading-relaxed">
              ရလဒ်ကို အေးအေးဆေးဆေး ပြန်လည်သုံးသပ်ပါ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
