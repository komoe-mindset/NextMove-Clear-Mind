import React, { useState } from 'react';
import { HelpCircle, RotateCcw, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { DiagnosticAnswers, DiagnosticLevel, DiagnosticResult } from '../types';

interface DiagnosticSectionProps {
  onTransferToPlan: (problemTitle: string) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const DiagnosticSection: React.FC<DiagnosticSectionProps> = ({
  onTransferToPlan,
  showToast,
}) => {
  const [problem, setProblem] = useState('');
  const [answers, setAnswers] = useState<DiagnosticAnswers>({
    control: null,
    influence: null,
    accept: null,
  });
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleSelectOption = (
    question: keyof DiagnosticAnswers,
    level: DiagnosticLevel
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: level,
    }));
  };

  const clearDiagnostic = () => {
    setProblem('');
    setAnswers({
      control: null,
      influence: null,
      accept: null,
    });
    setResult(null);
    showToast('Diagnostic စစ်ဆေးမှုကို Reset လုပ်ပြီးပါပြီ', '↺');
  };

  const runAnalysis = () => {
    const trimmed = problem.trim();
    if (!trimmed) {
      showToast('ကျေးဇူးပြု၍ သင်ကြုံတွေ့နေသော ပြဿနာကို အရင်ရေးပေးပါ', '⚠️');
      document.getElementById('diagProblem')?.focus();
      return;
    }

    if (!answers.control || !answers.influence || !answers.accept) {
      showToast('မေးခွန်း ၃ ခုလုံးအတွက် သင့်တော်ရာ ရွေးချယ်ပေးပါ', '⚠️');
      return;
    }

    const scoreMap: Record<DiagnosticLevel, number> = {
      high: 3,
      medium: 2,
      low: 1,
    };
    const cScore = scoreMap[answers.control];
    const iScore = scoreMap[answers.influence];
    const aScore = scoreMap[answers.accept];

    let newResult: DiagnosticResult;

    if (cScore >= 2 && iScore >= 2 && aScore >= 2) {
      newResult = {
        title: 'ရောထွေးနေသော ပြဿနာ (Mixed Multi-Layer Problem)',
        badge: 'Balanced Approach',
        summary:
          'ဒီပြဿနာမှာ ကိုယ်တိုင်လုပ်နိုင်တာ၊ သက်ရောက်နိုင်တာနဲ့ လက်ခံရမှာတွေ အညီအမျှ ပါဝင်နေပါတယ်။ တစ်ခုလုံးကို တစ်ပြိုင်နက် မတွေးပါနဲ့။',
        points: [
          {
            category: 'control',
            text: 'Control: အခုချက်ချင်း ၂၀ မိနစ်အတွင်း ကိုယ်တိုင်လုပ်နိုင်သော Control task တစ်ခုကို ရွေးပြီး စတင်ပါ။',
          },
          {
            category: 'influence',
            text: 'Influence: မနက်ဖြန်တွင် ဆက်သွယ်ရမည့် မိတ်ဆွေ သို့မဟုတ် ပါဝင်သူထံ မက်ဆေ့ခ်ျ သို့မဟုတ် Email ပို့ပါ။',
          },
          {
            category: 'accept',
            text: 'Accept: Outcome (ရလဒ်) သည် အချိန်ယူရမည်ဖြစ်ကြောင်း သတိပြုပြီး စိတ်အေးအေးထားပါ။',
          },
        ],
        borderClass: 'border-brand-400 dark:border-brand-600',
        bgClass: 'bg-brand-50/70 dark:bg-brand-950/30',
      };
    } else if (cScore >= iScore && cScore >= aScore) {
      newResult = {
        title: 'အဓိက ဦးတည်ရမည့်နေရာ: CONTROL (လုပ်ဆောင်မှု)',
        badge: 'High Actionable',
        summary:
          'ဒီအခြေအနေမှာ စိုးရိမ်ပူပန်နေခြင်းထက် တိုက်ရိုက် လုပ်ဆောင်မှု (Action) ပြုလုပ်ခြင်းက စိတ်ဖိစီးမှုကို အမြန်ဆုံး လျော့ကျစေမှာ ဖြစ်ပါတယ်။',
        points: [
          {
            category: 'control',
            text: 'စွမ်းအင်နှင့် အာရုံစိုက်မှုကို ကိုယ်တိုင် ပြုပြင်ပြောင်းလဲနိုင်သည့် အဆင့်များပေါ်တွင်သာ ထားပါ။',
          },
        ],
        questionToAsk:
          '“အခုချိန်မှာ ငါ့ရဲ့ စွမ်းအင်နဲ့ အာရုံစိုက်မှုကို ဘယ်နေရာမှာ ထည့်ပြီး လက်တွေ့စတင်မလဲ?”',
        borderClass: 'border-emerald-400 dark:border-emerald-600',
        bgClass: 'bg-emerald-50/70 dark:bg-emerald-950/30',
      };
    } else if (iScore >= cScore && iScore >= aScore) {
      newResult = {
        title: 'အဓိက ဦးတည်ရမည့်နေရာ: INFLUENCE (ညှိနှိုင်းသက်ရောက်မှု)',
        badge: 'Diplomatic & Negotiation',
        summary:
          'ရလဒ်ကို တစ်ယောက်တည်း ဆုံးဖြတ်၍မရသော်လည်း ဆက်သွယ်ညှိနှိုင်းမှု၊ တောင်းဆိုမှုနှင့် ပြင်ဆင်မှု ဖြင့် အလားအလာကို အများကြီး ပြောင်းလဲစေနိုင်ပါတယ်။',
        points: [
          {
            category: 'influence',
            text: 'နားလည်လွယ်သော တောင်းဆိုချက် သို့မဟုတ် ညှိနှိုင်းဆွေးနွေးမှုဖြင့် မဟာဗျူဟာကျကျ ချဉ်းကပ်ပါ။',
          },
        ],
        questionToAsk:
          '“ဘယ်သူနဲ့ စကားပြောရမလဲ? ဘယ်လို ယဉ်ကျေးပြေပြစ်စွာ တောင်းဆိုမလဲ?”',
        borderClass: 'border-amber-400 dark:border-amber-600',
        bgClass: 'bg-amber-50/70 dark:bg-amber-950/30',
      };
    } else {
      newResult = {
        title: 'အဓိက ဦးတည်ရမည့်နေရာ: ACCEPT (လက်ခံမှုနှင့် လိုက်လျောညီထွေဖြစ်စေခြင်း)',
        badge: 'Radical Acceptance',
        summary:
          'မပြောင်းလဲနိုင်သည့် အခြေအနေ (အတိတ် သို့မဟုတ် အခြားသူ၏ ရွေးချယ်မှု) နှင့် တိုက်ခိုက်နေလျှင် စိတ်စွမ်းအင်သာ ကုန်ဆုံးစေပါမည်။',
        points: [
          {
            category: 'accept',
            text: 'လက်ရှိ Reality ကို ငြိမ်းချမ်းစွာ အသိအမှတ်ပြုပြီး စိတ်စွမ်းအင်ကို အသစ်တစ်ခုဆီသို့ ရွှေ့ပါ။',
          },
        ],
        questionToAsk:
          '“ဒီ Reality ကို လက်ခံလိုက်ပြီဆိုရင် ငါ့ဘက်က အကောင်းဆုံး Plan B အနေနဲ့ ဘာဆက်လုပ်မလဲ?”',
        borderClass: 'border-blue-400 dark:border-blue-600',
        bgClass: 'bg-blue-50/70 dark:bg-blue-950/30',
      };
    }

    setResult(newResult);
    showToast('တွက်ချက်မှု ပြီးပါပြီ!', '🧭');
  };

  const handleSendToPlan = () => {
    if (!problem.trim()) return;
    onTransferToPlan(problem.trim());
    showToast('Action Plan သို့ ပြဿနာအမည် ပို့ဆောင်ပြီးပါပြီ', '✅');
  };

  return (
    <section id="triage" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-brand-600 dark:text-brand-400 font-bold">
            02
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
              Interactive Problem Diagnostic
            </h2>
            <p className="text-sm text-ink-500 dark:text-ink-300 mt-1">
              ပြဿနာတစ်ခုကို ရေးပြီး အောက်ပါ မေးခွန်း ၃ ခုကို ဖြေဆိုပါ။ Framework က သင့်အတွက် အကောင်းဆုံး ဦးတည်ချက်ကို တွက်ချက်ပေးပါမည်။
            </p>
          </div>
        </div>
        <button
          onClick={clearDiagnostic}
          className="text-xs text-ink-500 hover:text-ink-800 dark:hover:text-ink-100 underline font-medium self-start sm:self-auto flex items-center gap-1.5 py-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>စစ်ဆေးမှုကို အသစ်ပြန်စမယ်</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-ink-900/60 border border-ink-900/10 dark:border-white/10 space-y-6 shadow-sm">
        <div>
          <label
            htmlFor="diagProblem"
            className="block font-bold text-sm text-ink-800 dark:text-ink-100 mb-2"
          >
            🎯 အခု သင့်ကို စိတ်ရှုပ်ထွေးစေနေတဲ့ ပြဿနာ / အခြေအနေက ဘာလဲ?
          </label>
          <textarea
            id="diagProblem"
            rows={3}
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full p-4 rounded-xl border border-ink-900/15 dark:border-white/15 bg-ink-50 dark:bg-ink-950/60 text-ink-900 dark:text-white placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm transition"
            placeholder="ဥပမာ — အလုပ်အင်တာဗျူး ဖြေထားပြီး Result မလာသေးလို့ စိုးရိမ်ပြီး အာရုံမစိုက်နိုင်ဖြစ်နေတယ်..."
          />
        </div>

        <div className="space-y-4 pt-2">
          {/* Question 1: Control */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-600/20 space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                Q1
              </span>
              <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 leading-snug">
                ဒီအခြေအနေထဲမှာ ကိုယ်တိုင်တိုက်ရိုက် လုပ်နိုင်တဲ့ Action (ပြင်ဆင်ခြင်း၊ စာရင်းပြုစုခြင်း၊ စတင်ခြင်း) ရှိပါသလား?
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pl-8 pt-1">
              <button
                type="button"
                onClick={() => handleSelectOption('control', 'high')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.control === 'high'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-emerald-500'
                }`}
              >
                🟢 အများကြီးရှိတယ်
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption('control', 'medium')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.control === 'medium'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-emerald-500'
                }`}
              >
                🟡 အနည်းငယ်ရှိတယ်
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption('control', 'low')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.control === 'low'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-emerald-500'
                }`}
              >
                ⚪ လုံးဝမရှိသလောက်ပဲ
              </button>
            </div>
          </div>

          {/* Question 2: Influence */}
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-600/20 space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                Q2
              </span>
              <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 leading-snug">
                ကိုယ်တိုင် အပြည့်အဝမထိန်းချုပ်နိုင်သော်လည်း တောင်းဆိုခြင်း၊ ရှင်းပြခြင်း၊ ဆက်သွယ်စုံစမ်းခြင်းဖြင့် သက်ရောက်မှုဖြစ်အောင် လုပ်နိုင်ပါသလား?
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pl-8 pt-1">
              <button
                type="button"
                onClick={() => handleSelectOption('influence', 'high')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.influence === 'high'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-amber-500'
                }`}
              >
                🟢 သေချာပေါက် သက်ရောက်နိုင်တယ်
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption('influence', 'medium')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.influence === 'medium'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-amber-500'
                }`}
              >
                🟡 အနည်းငယ်ပဲ သက်ရောက်နိုင်တယ်
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption('influence', 'low')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.influence === 'low'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-amber-500'
                }`}
              >
                ⚪ လုံးဝသက်ရောက်မှု မရှိနိုင်ဘူး
              </button>
            </div>
          </div>

          {/* Question 3: Accept */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-600/20 space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                Q3
              </span>
              <p className="text-sm font-semibold text-ink-800 dark:text-ink-100 leading-snug">
                ဒီပြဿနာထဲမှာ အတိတ်ကဖြစ်ပြီးသားအရာများ၊ တခြားသူ၏ သဘောထားစိတ်နေစိတ်ထား သို့မဟုတ် မသေချာသော အနာဂတ် ရလဒ်များ ပါဝင်နေပါသလား?
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pl-8 pt-1">
              <button
                type="button"
                onClick={() => handleSelectOption('accept', 'high')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.accept === 'high'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-blue-500'
                }`}
              >
                🟢 အများကြီး ပါဝင်နေတယ်
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption('accept', 'medium')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.accept === 'medium'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-blue-500'
                }`}
              >
                🟡 အနည်းငယ် ပါဝင်တယ်
              </button>
              <button
                type="button"
                onClick={() => handleSelectOption('accept', 'low')}
                className={`px-3.5 py-2 rounded-lg border text-xs font-medium transition min-h-[36px] ${
                  answers.accept === 'low'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 hover:border-blue-500'
                }`}
              >
                ⚪ မပါဝင်ပါ
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={runAnalysis}
            className="px-6 py-3 rounded-xl bg-ink-900 dark:bg-brand-500 hover:bg-ink-800 dark:hover:bg-brand-400 text-white dark:text-ink-900 text-sm font-bold transition flex items-center gap-2 shadow-sm min-h-[44px]"
          >
            <span>🔍 တွက်ချက်ခွဲခြမ်းစိတ်ဖြာမည်</span>
          </button>
        </div>

        {/* Result Container */}
        {result && (
          <div
            className={`p-6 rounded-2xl border ${result.borderClass} ${result.bgClass} space-y-4 transition-all duration-300`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-ink-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>{result.title}</span>
              </h3>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-white dark:bg-ink-900 border border-ink-900/10 dark:border-white/10 text-ink-800 dark:text-ink-200">
                {result.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-200 leading-relaxed">
              {result.summary}
            </p>

            {result.points.length > 0 && (
              <ul className="space-y-1.5 text-xs sm:text-sm text-ink-800 dark:text-ink-200">
                {result.points.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-brand-600 dark:text-brand-400 font-bold">•</span>
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
            )}

            {result.questionToAsk && (
              <div className="p-3 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-900/10 dark:border-white/10 text-xs font-semibold text-ink-800 dark:text-ink-100 italic">
                <strong>မေးခွန်းထုတ်ပါ:</strong> {result.questionToAsk}
              </div>
            )}

            <div className="pt-2 border-t border-ink-900/10 dark:border-white/10 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSendToPlan}
                className="px-4 py-2.5 rounded-xl bg-ink-900 dark:bg-white text-white dark:text-ink-900 text-xs font-bold transition flex items-center gap-2 shadow-sm min-h-[40px]"
              >
                <ArrowDownRight className="w-4 h-4" />
                <span>📥 ဒီပြဿနာကို Action Plan သို့ ပို့ဆောင်မည်</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
