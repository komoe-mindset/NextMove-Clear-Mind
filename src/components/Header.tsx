import React from 'react';
import { Compass, Moon, Sun, Wind, ExternalLink } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenBreathing: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  onOpenBreathing,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-ink-50/85 dark:bg-ink-950/90 border-b border-ink-900/10 dark:border-ink-100/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <a
          href="#"
          id="app-logo"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight shrink-0 group"
        >
          <div className="w-9 h-9 rounded-lg bg-ink-900 dark:bg-brand-500 flex items-center justify-center text-brand-300 dark:text-ink-900 text-base shadow-sm group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-amber-300 dark:text-ink-900" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-extrabold text-ink-900 dark:text-white">
              NextMove
            </span>
            <span className="text-[11px] font-medium font-mono text-ink-400 dark:text-ink-200/70">
              Control → Influence → Accept
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-ink-700 dark:text-ink-200">
          <a
            href="#framework"
            className="px-3 py-1.5 rounded-lg hover:text-brand-700 dark:hover:text-brand-300 hover:bg-ink-900/5 dark:hover:bg-white/5 transition"
          >
            Framework
          </a>
          <a
            href="#triage"
            className="px-3 py-1.5 rounded-lg hover:text-brand-700 dark:hover:text-brand-300 hover:bg-ink-900/5 dark:hover:bg-white/5 transition"
          >
            Quick Diagnosis
          </a>
          <a
            href="#sorter"
            className="px-3 py-1.5 rounded-lg hover:text-brand-700 dark:hover:text-brand-300 hover:bg-ink-900/5 dark:hover:bg-white/5 transition"
          >
            Canvas
          </a>
          <a
            href="#planner"
            className="px-3 py-1.5 rounded-lg hover:text-brand-700 dark:hover:text-brand-300 hover:bg-ink-900/5 dark:hover:bg-white/5 transition"
          >
            Action Plan
          </a>
          <a
            href="#cases"
            className="px-3 py-1.5 rounded-lg hover:text-brand-700 dark:hover:text-brand-300 hover:bg-ink-900/5 dark:hover:bg-white/5 transition"
          >
            Examples
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://gemini.google.com/gem/1bNY_IEaT7nQddwbfVO-t4OrDpfJCEcfT?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            id="gemini-gem-btn"
            className="px-3 py-1.5 rounded-lg border border-brand-500/40 bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold flex items-center gap-1.5 transition min-h-[38px]"
            title="Open NextMove Gemini Gem"
          >
            <span>✨</span>
            <span className="hidden sm:inline">Gemini Gem</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-ink-900/15 dark:border-white/15 hover:bg-ink-900/5 dark:hover:bg-white/10 text-ink-700 dark:text-ink-200 text-sm transition min-w-[38px] min-h-[38px] flex items-center justify-center"
            title="Toggle theme"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-ink-700" />
            )}
          </button>

          <button
            id="breathing-modal-btn"
            onClick={onOpenBreathing}
            className="px-3 py-1.5 rounded-lg border border-brand-600/40 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition min-h-[38px]"
          >
            <Wind className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">1-Min Pause</span>
          </button>
        </div>
      </div>

      {/* Mobile section rail */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-4 pb-2.5 text-xs font-semibold text-ink-700 dark:text-ink-200 no-scrollbar">
        <a
          href="https://gemini.google.com/gem/1bNY_IEaT7nQddwbfVO-t4OrDpfJCEcfT?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-full border border-brand-500/40 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 whitespace-nowrap flex items-center gap-1 shrink-0"
        >
          ✨ AI Gem ↗
        </a>
        <a
          href="#framework"
          className="px-3 py-1.5 rounded-full border border-ink-900/15 dark:border-white/15 bg-white/60 dark:bg-ink-900/60 whitespace-nowrap shrink-0"
        >
          Framework
        </a>
        <a
          href="#triage"
          className="px-3 py-1.5 rounded-full border border-ink-900/15 dark:border-white/15 bg-white/60 dark:bg-ink-900/60 whitespace-nowrap shrink-0"
        >
          Diagnosis
        </a>
        <a
          href="#sorter"
          className="px-3 py-1.5 rounded-full border border-ink-900/15 dark:border-white/15 bg-white/60 dark:bg-ink-900/60 whitespace-nowrap shrink-0"
        >
          Canvas
        </a>
        <a
          href="#planner"
          className="px-3 py-1.5 rounded-full border border-ink-900/15 dark:border-white/15 bg-white/60 dark:bg-ink-900/60 whitespace-nowrap shrink-0"
        >
          Action Plan
        </a>
        <a
          href="#cases"
          className="px-3 py-1.5 rounded-full border border-ink-900/15 dark:border-white/15 bg-white/60 dark:bg-ink-900/60 whitespace-nowrap shrink-0"
        >
          Examples
        </a>
      </div>
    </header>
  );
};
