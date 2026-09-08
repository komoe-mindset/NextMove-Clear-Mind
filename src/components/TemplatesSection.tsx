import React from 'react';
import { TEMPLATES } from '../data/templates';
import { TemplateItem } from '../types';
import { ArrowDownRight } from 'lucide-react';

interface TemplatesSectionProps {
  onSelectTemplate: (template: TemplateItem) => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  onSelectTemplate,
}) => {
  return (
    <section id="cases" className="scroll-mt-24 space-y-6">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-brand-600 dark:text-brand-400 font-bold">
          05
        </span>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
            လက်တွေ့ဘဝ ပြဿနာ ဥပမာများ
          </h2>
          <p className="text-sm text-ink-500 dark:text-ink-300 mt-1">
            အောက်ပါ ဥပမာတစ်ခုခုကို နှိပ်ပြီး Framework အလုပ်လုပ်ပုံကို အလွယ်တကူ လေ့လာနိုင်ပါသည်။
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEMPLATES.map((tmpl) => (
          <div
            key={tmpl.id}
            className="p-5 rounded-xl border border-ink-900/10 dark:border-white/10 hover:border-brand-500/60 transition space-y-3 flex flex-col justify-between bg-white dark:bg-ink-900/40 shadow-sm hover:shadow"
          >
            <div>
              <div className="text-2xl mb-1">{tmpl.icon}</div>
              <h3 className="font-bold text-sm text-ink-900 dark:text-white leading-snug">
                {tmpl.title}
              </h3>
              <div className="text-[11px] text-ink-600 dark:text-ink-300 space-y-2 mt-3 leading-relaxed">
                <p>
                  <strong className="text-emerald-700 dark:text-emerald-400">
                    Control:
                  </strong>{' '}
                  {tmpl.control.split('\n')[0].replace('• ', '')}
                </p>
                <p>
                  <strong className="text-amber-700 dark:text-amber-400">
                    Influence:
                  </strong>{' '}
                  {tmpl.influence.split('\n')[0].replace('• ', '')}
                </p>
                <p>
                  <strong className="text-blue-700 dark:text-blue-400">
                    Accept:
                  </strong>{' '}
                  {tmpl.accept.split('\n')[0].replace('• ', '')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectTemplate(tmpl)}
              className="w-full py-2.5 rounded-lg bg-ink-900/5 dark:bg-white/10 hover:bg-brand-100 dark:hover:bg-white/15 hover:text-brand-800 text-xs font-bold text-ink-700 dark:text-ink-200 transition flex items-center justify-center gap-1.5 min-h-[38px] mt-2"
            >
              <span>ဒီ Template သုံးမည်</span>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
