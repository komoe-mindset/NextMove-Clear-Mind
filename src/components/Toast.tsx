import React from 'react';
import { ToastData } from '../types';

interface ToastProps {
  toast: ToastData | null;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-ink-900 text-white dark:bg-white dark:text-ink-900 text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2.5 transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in"
    >
      <span className="text-base">{toast.icon}</span>
      <span>{toast.message}</span>
    </div>
  );
};
