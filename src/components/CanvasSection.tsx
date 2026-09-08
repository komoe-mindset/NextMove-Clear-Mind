import React, { useState } from 'react';
import { Plus, Lightbulb, Trash2, ArrowRight, ArrowLeft, Download, X } from 'lucide-react';
import { Category, SorterItem } from '../types';

interface CanvasSectionProps {
  items: SorterItem[];
  onAddItem: (text: string, category: Category) => void;
  onMoveItem: (id: string, targetCategory: Category) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onLoadDemo: () => void;
  onSyncToPlanner: () => void;
}

export const CanvasSection: React.FC<CanvasSectionProps> = ({
  items,
  onAddItem,
  onMoveItem,
  onDeleteItem,
  onClearAll,
  onLoadDemo,
  onSyncToPlanner,
}) => {
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('control');

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newText.trim()) return;
    onAddItem(newText.trim(), newCategory);
    setNewText('');
  };

  const controlItems = items.filter((i) => i.category === 'control');
  const influenceItems = items.filter((i) => i.category === 'influence');
  const acceptItems = items.filter((i) => i.category === 'accept');

  return (
    <section id="sorter" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-brand-600 dark:text-brand-400 font-bold">
            03
          </span>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
              Interactive CIA Canvas
            </h2>
            <p className="text-sm text-ink-500 dark:text-ink-300 mt-1">
              သင့်စိတ်ထဲ ရောက်နေတဲ့ အတွေးစများ သို့မဟုတ် ပြဿနာအပိုင်းအစများကို ရေးထည့်ပြီး သက်ဆိုင်ရာ Bucket ထဲသို့ လွှဲပြောင်းနေရာချပါ။
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onLoadDemo}
            className="text-xs px-3 py-2 rounded-lg bg-ink-900/5 dark:bg-white/10 hover:bg-ink-900/10 dark:hover:bg-white/15 font-semibold text-ink-700 dark:text-ink-200 transition flex items-center gap-1.5 min-h-[38px]"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>ဥပမာအချက်အလက် ထည့်မယ်</span>
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs px-3 py-2 rounded-lg border border-ink-900/15 dark:border-white/15 text-ink-500 hover:text-red-600 hover:border-red-300 transition flex items-center gap-1.5 min-h-[38px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>အားလုံးဖျက်မည်</span>
          </button>
        </div>
      </div>

      {/* Quick Thought Input Form */}
      <form
        onSubmit={handleAdd}
        className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-ink-900/60 border border-ink-900/10 dark:border-white/10 flex flex-col sm:flex-row gap-2.5 shadow-sm"
      >
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="သင့်အတွေး သို့မဟုတ် လုပ်ဆောင်ရမည့်အရာ တစ်ခုရေးပါ (ဥပမာ: Interviewer ဆီ polite follow-up mail ပို့ရန်)..."
          className="flex-1 px-4 py-3 rounded-xl border border-ink-900/15 dark:border-white/15 bg-ink-50 dark:bg-ink-950/60 text-sm outline-none focus:ring-2 focus:ring-brand-500 text-ink-900 dark:text-white placeholder:text-ink-400"
        />

        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as Category)}
          className="px-3 py-3 rounded-xl border border-ink-900/15 dark:border-white/15 bg-ink-50 dark:bg-ink-950/60 text-xs font-bold outline-none focus:ring-2 focus:ring-brand-500 text-ink-700 dark:text-ink-200"
        >
          <option value="control">🟢 CONTROL ထဲထည့်မယ်</option>
          <option value="influence">🟡 INFLUENCE ထဲထည့်မယ်</option>
          <option value="accept">🔵 ACCEPT ထဲထည့်မယ်</option>
        </select>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-ink-900 dark:bg-brand-500 hover:bg-ink-800 dark:hover:bg-brand-400 text-white dark:text-ink-900 font-bold text-xs transition flex items-center justify-center gap-1.5 min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>ထည့်မည်</span>
        </button>
      </form>

      {/* 3 Buckets / Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Bucket 1: Control */}
        <div className="flex flex-col rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-600/25 p-4 min-h-[280px]">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-600/15 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
              <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                1. CONTROL
              </h4>
            </div>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-600/15 text-emerald-800 dark:text-emerald-200">
              {controlItems.length}
            </span>
          </div>
          <p className="text-[11px] text-emerald-800/70 dark:text-emerald-300/70 mb-3">
            ၁၀၀% ကိုယ်တိုင် ပြုလုပ်နိုင်သော Action များ
          </p>
          <div className="flex-1 space-y-2.5">
            {controlItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white dark:bg-ink-900 border border-ink-900/10 dark:border-white/10 text-xs text-ink-800 dark:text-ink-200 flex flex-col justify-between gap-2.5 shadow-sm transition hover:shadow"
              >
                <div className="leading-snug break-words">{item.text}</div>
                <div className="flex items-center justify-between pt-1 border-t border-ink-900/10 dark:border-white/10 gap-1 flex-wrap">
                  <div className="flex gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onMoveItem(item.id, 'influence')}
                      className="px-2 py-1 rounded text-[10px] bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 font-semibold flex items-center gap-0.5"
                    >
                      <span>Influence</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onMoveItem(item.id, 'accept')}
                      className="px-2 py-1 rounded text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 font-semibold flex items-center gap-0.5"
                    >
                      <span>Accept</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="text-ink-400 hover:text-red-600 p-1"
                    title="ဖျက်မည်"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {controlItems.length === 0 && (
              <div className="h-32 flex items-center justify-center text-xs text-emerald-700/50 dark:text-emerald-300/50 border border-dashed border-emerald-600/20 rounded-xl">
                အချက်အလက် မရှိသေးပါ
              </div>
            )}
          </div>
        </div>

        {/* Bucket 2: Influence */}
        <div className="flex flex-col rounded-2xl bg-amber-50/50 dark:bg-amber-950/15 border border-amber-600/25 p-4 min-h-[280px]">
          <div className="flex items-center justify-between pb-3 border-b border-amber-600/15 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-600"></span>
              <h4 className="font-bold text-sm text-amber-800 dark:text-amber-300">
                2. INFLUENCE
              </h4>
            </div>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-amber-600/15 text-amber-800 dark:text-amber-200">
              {influenceItems.length}
            </span>
          </div>
          <p className="text-[11px] text-amber-800/70 dark:text-amber-300/70 mb-3">
            ဆက်သွယ်ခြင်း၊ တောင်းဆိုခြင်းဖြင့် အားထုတ်ရမည့်အရာများ
          </p>
          <div className="flex-1 space-y-2.5">
            {influenceItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white dark:bg-ink-900 border border-ink-900/10 dark:border-white/10 text-xs text-ink-800 dark:text-ink-200 flex flex-col justify-between gap-2.5 shadow-sm transition hover:shadow"
              >
                <div className="leading-snug break-words">{item.text}</div>
                <div className="flex items-center justify-between pt-1 border-t border-ink-900/10 dark:border-white/10 gap-1 flex-wrap">
                  <div className="flex gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onMoveItem(item.id, 'control')}
                      className="px-2 py-1 rounded text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 font-semibold flex items-center gap-0.5"
                    >
                      <ArrowLeft className="w-2.5 h-2.5" />
                      <span>Control</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onMoveItem(item.id, 'accept')}
                      className="px-2 py-1 rounded text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 font-semibold flex items-center gap-0.5"
                    >
                      <span>Accept</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="text-ink-400 hover:text-red-600 p-1"
                    title="ဖျက်မည်"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {influenceItems.length === 0 && (
              <div className="h-32 flex items-center justify-center text-xs text-amber-700/50 dark:text-amber-300/50 border border-dashed border-amber-600/20 rounded-xl">
                အချက်အလက် မရှိသေးပါ
              </div>
            )}
          </div>
        </div>

        {/* Bucket 3: Accept */}
        <div className="flex flex-col rounded-2xl bg-blue-50/50 dark:bg-blue-950/15 border border-blue-600/25 p-4 min-h-[280px]">
          <div className="flex items-center justify-between pb-3 border-b border-blue-600/15 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <h4 className="font-bold text-sm text-blue-800 dark:text-blue-300">
                3. ACCEPT
              </h4>
            </div>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-blue-600/15 text-blue-800 dark:text-blue-200">
              {acceptItems.length}
            </span>
          </div>
          <p className="text-[11px] text-blue-800/70 dark:text-blue-300/70 mb-3">
            မပြောင်းလဲနိုင်သည့် Reality ကို လက်ခံပြီး စိတ်ငြိမ်းချမ်းမှု ယူပါ
          </p>
          <div className="flex-1 space-y-2.5">
            {acceptItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white dark:bg-ink-900 border border-ink-900/10 dark:border-white/10 text-xs text-ink-800 dark:text-ink-200 flex flex-col justify-between gap-2.5 shadow-sm transition hover:shadow"
              >
                <div className="leading-snug break-words">{item.text}</div>
                <div className="flex items-center justify-between pt-1 border-t border-ink-900/10 dark:border-white/10 gap-1 flex-wrap">
                  <div className="flex gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onMoveItem(item.id, 'control')}
                      className="px-2 py-1 rounded text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 font-semibold flex items-center gap-0.5"
                    >
                      <ArrowLeft className="w-2.5 h-2.5" />
                      <span>Control</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onMoveItem(item.id, 'influence')}
                      className="px-2 py-1 rounded text-[10px] bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 font-semibold flex items-center gap-0.5"
                    >
                      <ArrowLeft className="w-2.5 h-2.5" />
                      <span>Influence</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="text-ink-400 hover:text-red-600 p-1"
                    title="ဖျက်မည်"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {acceptItems.length === 0 && (
              <div className="h-32 flex items-center justify-center text-xs text-blue-700/50 dark:text-blue-300/50 border border-dashed border-blue-600/20 rounded-xl">
                အချက်အလက် မရှိသေးပါ
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sync to Planner CTA */}
      <div className="p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/30 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-ink-800 dark:text-brand-200 font-medium text-center sm:text-left">
          💡 စီစဉ်ထားသော ကတ်များကို အောက်ပါ <strong>Action Plan & 20-Min Execution Workspace</strong> ထဲသို့ တိုက်ရိုက်ကူးယူမလား?
        </div>
        <button
          type="button"
          onClick={onSyncToPlanner}
          className="px-4 py-2.5 rounded-xl bg-ink-900 dark:bg-brand-500 hover:bg-ink-800 dark:hover:bg-brand-400 text-white dark:text-ink-900 text-xs font-bold transition flex items-center gap-1.5 shadow-sm min-h-[40px] whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Action Plan ထဲသို့ ထည့်သွင်းမည်</span>
        </button>
      </div>
    </section>
  );
};
