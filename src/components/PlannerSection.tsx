import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Save, Copy, Printer, Download, Trash2, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { Plan } from '../types';
import { playChime } from '../utils/audio';

interface PlannerSectionProps {
  plans: Record<string, Plan>;
  currentPlanId: string;
  onSelectPlan: (id: string) => void;
  onSavePlan: (updated: Plan) => void;
  onRequestNewPlan: () => void;
  onRequestDeletePlan: (id: string) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const PlannerSection: React.FC<PlannerSectionProps> = ({
  plans,
  currentPlanId,
  onSelectPlan,
  onSavePlan,
  onRequestNewPlan,
  onRequestDeletePlan,
  showToast,
}) => {
  const currentPlan = plans[currentPlanId] || {
    id: 'default',
    title: '',
    control: '',
    influence: '',
    accept: '',
    nextAction: '',
  };

  const [title, setTitle] = useState(currentPlan.title);
  const [control, setControl] = useState(currentPlan.control);
  const [influence, setInfluence] = useState(currentPlan.influence);
  const [accept, setAccept] = useState(currentPlan.accept);
  const [nextAction, setNextAction] = useState(currentPlan.nextAction);

  // Sync form state when plan changes
  useEffect(() => {
    setTitle(currentPlan.title);
    setControl(currentPlan.control);
    setInfluence(currentPlan.influence);
    setAccept(currentPlan.accept);
    setNextAction(currentPlan.nextAction);
  }, [currentPlanId, plans]);

  // 20-minute Focus Timer
  const TIMER_DEFAULT = 20 * 60;
  const [timerRemaining, setTimerRemaining] = useState(TIMER_DEFAULT);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            playChime('bell');
            showToast('🎉 ၂၀ မိနစ် Sprint ပြီးဆုံးပါပြီ! အလွန်ကောင်းမွန်သော ခြေလှမ်းဖြစ်ပါသည်', '🔔');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, showToast]);

  const toggleTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      playChime('pop');
      showToast('Timer ကို ခေတ္တရပ်ထားပါသည်', '⏸️');
    } else {
      if (timerRemaining === 0) {
        setTimerRemaining(TIMER_DEFAULT);
      }
      setIsTimerRunning(true);
      playChime('pop');
      showToast('၂၀ မိနစ် Focus Sprint စတင်ပါပြီ! အာရုံစိုက်ပါ', '🚀');
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerRemaining(TIMER_DEFAULT);
    showToast('Timer ကို ၂၀ မိနစ်သို့ ပြန်လည်သတ်မှတ်ပြီးပါပြီ', '↺');
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    const updated: Plan = {
      id: currentPlanId,
      title: title.trim() || 'Untitled Plan',
      control: control.trim(),
      influence: influence.trim(),
      accept: accept.trim(),
      nextAction: nextAction.trim(),
    };
    onSavePlan(updated);
    playChime('success');
    showToast('Plan ကို သင့်စက်ထဲတွင် အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ', '💾');
  };

  const handleCopy = () => {
    const formatted = `=== ${title || 'CIA Action Plan'} ===\n(Control → Influence → Accept Framework)\n\n🟢 1. CONTROL (တိုက်ရိုက်လုပ်နိုင်တာ):\n${
      control || '- None'
    }\n\n🟡 2. INFLUENCE (သက်ရောက်နိုင်တာ):\n${
      influence || '- None'
    }\n\n🔵 3. ACCEPT (လက်ခံရမယ့်အပိုင်း):\n${
      accept || '- None'
    }\n\n🎯 NEXT BEST ACTION (ချက်ချင်းလုပ်မယ့်အရာ):\n${
      nextAction || '- None'
    }\n\nCreated with NextMove CIA App`;

    navigator.clipboard
      .writeText(formatted)
      .then(() => {
        playChime('pop');
        showToast('Plan စာသားကို Clipboard ထဲ ကူးယူပြီးပါပြီ', '📋');
      })
      .catch(() => {
        showToast('Copy ပြုလုပ်၍ မရပါ', '⚠️');
      });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(plans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `nextmove_cia_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('JSON Backup ကို ဒေါင်းလုဒ်လုပ်ပြီးပါပြီ', '📥');
  };

  return (
    <section id="planner" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-brand-600 dark:text-brand-400 font-bold">
            04
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
              Action Plan & Focus Station
            </h2>
            <p className="text-sm text-ink-500 dark:text-ink-300 mt-1">
              Browser ထဲတွင် Offline သိမ်းဆည်းနိုင်ပြီး၊ ချက်ချင်း လက်တွေ့စတင်နိုင်ရန် ၂၀ မိနစ် Focus Timer ပါဝင်ပါသည်။
            </p>
          </div>
        </div>

        {/* Plan Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={currentPlanId}
            onChange={(e) => onSelectPlan(e.target.value)}
            className="px-3 py-2 rounded-xl border border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 text-xs font-semibold text-ink-800 dark:text-ink-200 outline-none max-w-[200px] truncate"
          >
            {Object.keys(plans).map((id) => (
              <option key={id} value={id}>
                {plans[id].title || 'Untitled Plan'}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onRequestNewPlan}
            className="px-3 py-2 rounded-xl bg-ink-900/5 dark:bg-white/10 text-ink-700 dark:text-ink-200 text-xs font-bold hover:bg-ink-900/10 dark:hover:bg-white/15 transition flex items-center gap-1 min-h-[38px]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>အသစ်</span>
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-ink-900/60 border border-ink-900/10 dark:border-white/10 space-y-6 shadow-sm print-border">
        {/* Goal Title */}
        <div>
          <label
            htmlFor="planTitle"
            className="block text-xs font-bold text-ink-500 dark:text-ink-300 mb-1.5"
          >
            🎯 ပန်းတိုင် သို့မဟုတ် ဖြေရှင်းမည့် ပြဿနာအမည်
          </label>
          <input
            id="planTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ဥပမာ: Interview စိုးရိမ်မှုကို ကျော်လွှားပြီး နောက်ထပ်အလုပ်အသစ် လျှောက်ထားခြင်း..."
            className="w-full px-4 py-3 rounded-xl border border-ink-900/15 dark:border-white/15 bg-ink-50 dark:bg-ink-950/60 text-sm font-semibold text-ink-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* 3 CIA Breakdown Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Control */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <label
                htmlFor="planControlText"
                className="text-xs font-bold text-emerald-700 dark:text-emerald-300"
              >
                🟢 CONTROL (ငါတိုက်ရိုက်လုပ်ဆောင်မည့်အရာများ)
              </label>
            </div>
            <textarea
              id="planControlText"
              rows={6}
              value={control}
              onChange={(e) => setControl(e.target.value)}
              placeholder={`• CV update လုပ်မည်\n• ကုမ္ပဏီ ၂ ခုကို အသစ်ဆက်လျှောက်မည်\n• Interview အမေးအဖြေ အသံသွင်းလေ့ကျင့်မည်`}
              className="w-full p-3.5 rounded-xl border border-emerald-600/25 bg-emerald-50/30 dark:bg-ink-950/60 text-xs sm:text-sm text-ink-800 dark:text-ink-200 outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed placeholder:text-ink-400"
            />
          </div>

          {/* Influence */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <label
                htmlFor="planInfluenceText"
                className="text-xs font-bold text-amber-700 dark:text-amber-300"
              >
                🟡 INFLUENCE (သက်ရောက်မှုရှိအောင် ကြိုးစားမည့်အရာ)
              </label>
            </div>
            <textarea
              id="planInfluenceText"
              rows={6}
              value={influence}
              onChange={(e) => setInfluence(e.target.value)}
              placeholder={`• HR ဆီသို့ ယဉ်ကျေးသော polite follow-up mail ပို့မည်\n• အသိမိတ်ဆွေထံ အကြံဉာဏ်တောင်းခံမည်`}
              className="w-full p-3.5 rounded-xl border border-amber-600/25 bg-amber-50/30 dark:bg-ink-950/60 text-xs sm:text-sm text-ink-800 dark:text-ink-200 outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed placeholder:text-ink-400"
            />
          </div>

          {/* Accept */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <label
                htmlFor="planAcceptText"
                className="text-xs font-bold text-blue-700 dark:text-blue-300"
              >
                🔵 ACCEPT (လက်ခံရမည့်အဖြစ်မှန်)
              </label>
            </div>
            <textarea
              id="planAcceptText"
              rows={6}
              value={accept}
              onChange={(e) => setAccept(e.target.value)}
              placeholder={`• ကုမ္ပဏီ၏ နောက်ဆုံးဆုံးဖြတ်ချက်နှင့် အချိန်ဇယားကို ငါ မထိန်းချုပ်နိုင်\n• ပယ်ချခံရလျှင်ပင် နောက်အခွင့်အလမ်းအတွက် သင်ခန်းစာယူမည်`}
              className="w-full p-3.5 rounded-xl border border-blue-600/25 bg-blue-50/30 dark:bg-ink-950/60 text-xs sm:text-sm text-ink-800 dark:text-ink-200 outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed placeholder:text-ink-400"
            />
          </div>
        </div>

        {/* Next Best Action & 20-Min Sprint Timer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-brand-50/80 dark:bg-ink-950/60 border border-brand-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex-1 space-y-2 w-full">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-ink-900 dark:bg-brand-500 text-white dark:text-ink-900 text-[10px] font-black">
                NEXT STEP
              </span>
              <label
                htmlFor="nextBestAction"
                className="font-bold text-sm text-ink-800 dark:text-white"
              >
                ✅ Next Best Action (အခုချက်ချင်း လုပ်မည့် တစ်ခုတည်းသော အသေးငယ်ဆုံးအလုပ်)
              </label>
            </div>
            <input
              id="nextBestAction"
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="ဥပမာ: အခု ၂၀ မိနစ်အတွင်း CV ကို အချက်အလက်သစ် ထည့်ပြီး export ထုတ်မယ်"
              className="w-full px-4 py-3 rounded-xl border border-brand-500/30 dark:border-white/15 bg-white dark:bg-ink-900 text-sm text-ink-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-ink-900 p-3 rounded-xl border border-brand-500/25 self-stretch lg:self-auto justify-between sm:justify-start shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold font-mono text-ink-400 dark:text-ink-300">
                20-MIN SPRINT
              </span>
              <span
                id="timerDisplay"
                className="text-2xl font-black font-mono tracking-tight text-brand-700 dark:text-brand-400"
              >
                {formatTimer(timerRemaining)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleTimer}
                className="px-3.5 py-2.5 rounded-xl bg-ink-900 dark:bg-brand-500 hover:bg-ink-800 dark:hover:bg-brand-400 text-white dark:text-ink-900 text-xs font-bold transition flex items-center gap-1.5 min-h-[40px]"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>ရပ်တန့်မည်</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>{timerRemaining < TIMER_DEFAULT ? 'ဆက်လုပ်မည်' : 'စတင်မည်'}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="p-2.5 rounded-xl border border-ink-900/15 dark:border-white/15 hover:bg-ink-900/5 dark:hover:bg-white/10 text-xs text-ink-500 transition min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Reset 20 min"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 no-print">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm min-h-[40px]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Offline သိမ်းဆည်းမည်</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2.5 rounded-xl border border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 hover:bg-ink-900/5 dark:hover:bg-white/10 text-ink-700 dark:text-ink-200 text-xs font-semibold transition flex items-center gap-1.5 min-h-[40px]"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy စာသားကူးမည်</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-xl border border-ink-900/15 dark:border-white/15 bg-white dark:bg-ink-900 hover:bg-ink-900/5 dark:hover:bg-white/10 text-ink-700 dark:text-ink-200 text-xs font-semibold transition flex items-center gap-1.5 min-h-[40px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportJSON}
              className="text-xs text-ink-500 hover:text-ink-800 dark:hover:text-ink-100 flex items-center gap-1 py-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>
            <button
              type="button"
              onClick={() => onRequestDeletePlan(currentPlanId)}
              className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 py-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>ဒီ Plan ကိုဖျက်မည်</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
