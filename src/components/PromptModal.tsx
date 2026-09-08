import React, { useState, useEffect } from 'react';

interface PromptModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  defaultValue?: string;
  placeholder?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: (val: string) => void;
  onCancel: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  title,
  message,
  defaultValue = '',
  placeholder = '',
  confirmLabel = 'အတည်ပြုမည်',
  cancelLabel = 'မလုပ်တော့ပါ',
  onConfirm,
  onCancel,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onConfirm(value.trim());
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-ink-900 border border-ink-900/10 dark:border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl"
      >
        <h3 className="text-base font-bold text-ink-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
          {message}
        </p>

        <input
          type="text"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-lg border border-ink-900/15 dark:border-white/15 bg-ink-50 dark:bg-ink-950/60 text-xs sm:text-sm text-ink-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500"
        />

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-xs font-semibold border border-ink-900/15 dark:border-white/15 text-ink-600 dark:text-ink-300 hover:bg-ink-900/5 dark:hover:bg-white/10 min-h-[38px]"
          >
            {cancelLabel}
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-xs font-bold bg-ink-900 dark:bg-brand-500 text-white dark:text-ink-900 hover:bg-ink-800 dark:hover:bg-brand-400 min-h-[38px]"
          >
            {confirmLabel}
          </button>
        </div>
      </form>
    </div>
  );
};
