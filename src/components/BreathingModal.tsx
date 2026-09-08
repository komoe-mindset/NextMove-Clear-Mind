import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle2, Wind } from 'lucide-react';
import { playChime } from '../utils/audio';

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_SESSION_SECONDS = 60; // 1 minute
const INHALE_SECONDS = 4;
const EXHALE_SECONDS = 6;
const CYCLE_SECONDS = INHALE_SECONDS + EXHALE_SECONDS; // 10s per cycle = 6 cycles in 60s

export const BreathingModal: React.FC<BreathingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(TOTAL_SESSION_SECONDS);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  // Sound ref to prevent stale closures
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setSecondsRemaining(TOTAL_SESSION_SECONDS);
      setIsActive(true);
      setHasCompleted(false);
    }
  }, [isOpen]);

  // Main timer loop
  useEffect(() => {
    if (!isOpen || !isActive || hasCompleted) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setHasCompleted(true);
          if (soundEnabledRef.current) {
            playChime('bell');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isActive, hasCompleted]);

  // Derived phase and cycle state
  const elapsed = TOTAL_SESSION_SECONDS - secondsRemaining;
  const elapsedInCycle = elapsed % CYCLE_SECONDS;
  const isExhale = elapsedInCycle >= INHALE_SECONDS;
  const currentPhaseSecondsLeft = isExhale
    ? CYCLE_SECONDS - elapsedInCycle
    : INHALE_SECONDS - elapsedInCycle;
  const currentCycleNumber = Math.min(6, Math.floor(elapsed / CYCLE_SECONDS) + 1);

  // Trigger gentle pop on phase transition if sound enabled
  const prevIsExhaleRef = useRef(isExhale);
  useEffect(() => {
    if (!isOpen || hasCompleted || !isActive) return;
    if (prevIsExhaleRef.current !== isExhale) {
      prevIsExhaleRef.current = isExhale;
      if (soundEnabled) {
        playChime('pop');
      }
    }
  }, [isExhale, isOpen, hasCompleted, isActive, soundEnabled]);

  const handleRestart = () => {
    setSecondsRemaining(TOTAL_SESSION_SECONDS);
    setIsActive(true);
    setHasCompleted(false);
    if (soundEnabled) playChime('pop');
  };

  const toggleActive = () => {
    setIsActive((prev) => !prev);
    if (soundEnabled) playChime('pop');
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      id="clarity-pause-modal"
      className="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-ink-900 border border-ink-900/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Subtle decorative background glow */}
        <div 
          className="absolute -top-24 -left-24 w-60 h-60 bg-brand-400/15 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div 
          className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-400/15 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Bar with Sound Toggle and Close */}
        <div className="flex items-center justify-between relative z-10">
          <button
            type="button"
            onClick={toggleSound}
            id="pause-toggle-sound"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition"
            title={soundEnabled ? 'အသံပိတ်မည် (Mute)' : 'အသံဖွင့်မည် (Unmute)'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>အသံ ဖွင့်ထားသည်</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-ink-400" />
                <span>အသံ ပိတ်ထားသည်</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            id="pause-close-button"
            className="text-ink-400 hover:text-ink-800 dark:hover:text-ink-100 p-2 rounded-xl hover:bg-ink-100 dark:hover:bg-ink-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Title */}
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100/70 dark:bg-brand-950/70 text-brand-800 dark:text-brand-300 text-xs font-bold mb-1">
            <Wind className="w-3.5 h-3.5" />
            <span>4s Inhale → 6s Exhale (No Hold)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-ink-950 dark:text-white">
            1-Minute Clarity Pause
          </h3>
          <p className="text-xs text-ink-600 dark:text-ink-300 max-w-sm mx-auto leading-relaxed">
            အောင့်ထားစရာမလိုဘဲ ရှူထုတ်ချိန်ကို ပိုရှည်စေခြင်းဖြင့် နှလုံးခုန်နှုန်းကို ဖြည်းညင်းစေပြီး စိတ်ကို အမြန်ဆုံး တည်ငြိမ်စေပါသည်။
          </p>
        </div>

        {/* Breathing Animation Area */}
        <div className="py-3 flex flex-col items-center justify-center relative z-10">
          <div className="relative w-56 h-56 flex items-center justify-center">
            
            {/* SVG Progress Ring for Total 60 seconds */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-ink-200 dark:stroke-ink-800"
                strokeWidth="3"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                className="stroke-brand-500 dark:stroke-brand-400 transition-all duration-1000 ease-linear"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - (TOTAL_SESSION_SECONDS - secondsRemaining) / TOTAL_SESSION_SECONDS)}
              />
            </svg>

            {/* Ripple Pulse Outer Auras */}
            {!hasCompleted && isActive && (
              <div 
                className={`absolute inset-4 rounded-full border-2 border-brand-400/30 dark:border-brand-400/20 transition-all ${
                  !isExhale ? 'scale-115 opacity-80 duration-[4000ms]' : 'scale-90 opacity-20 duration-[6000ms]'
                }`} 
              />
            )}

            {/* Breathing Bubble */}
            <div
              className={`w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-xl select-none relative transition-all ${
                hasCompleted
                  ? 'bg-emerald-500 text-white scale-100'
                  : !isExhale
                  ? 'bg-gradient-to-br from-brand-400 to-brand-500 text-ink-950 scale-115 shadow-brand-500/25 duration-[4000ms] ease-out'
                  : 'bg-gradient-to-br from-brand-500 to-amber-600 text-ink-950 scale-85 shadow-brand-500/10 duration-[6000ms] ease-in-out'
              }`}
            >
              {hasCompleted ? (
                <div className="flex flex-col items-center justify-center text-white px-2 animate-in zoom-in-90 duration-300">
                  <CheckCircle2 className="w-8 h-8 mb-1" />
                  <span className="text-xs font-black">ပြည့်မြောက်ပါပြီ</span>
                  <span className="text-[10px] opacity-90">Ready to Act</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center px-3">
                  <span className="text-base sm:text-lg font-black text-ink-950 tracking-tight">
                    {!isExhale ? 'ရှူသွင်းပါ' : 'ရှူထုတ်ပါ'}
                  </span>
                  <span className="text-[11px] font-bold tracking-wide uppercase text-ink-900/85">
                    {!isExhale ? 'Inhale (4s)' : 'Exhale (6s)'}
                  </span>
                  <span className="mt-1 font-mono text-xs font-black bg-ink-950/15 px-2 py-0.5 rounded-full text-ink-950">
                    {currentPhaseSecondsLeft}s
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Timing Meta Information */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium text-ink-600 dark:text-ink-300">
            <div className="flex items-center gap-1.5">
              <span className="text-ink-400 dark:text-ink-400">ကျန်ရှိချိန်:</span>
              <span className="font-mono font-bold text-ink-900 dark:text-ink-100 text-sm">
                {secondsRemaining}s
              </span>
            </div>
            <div className="w-1 h-1 rounded-full bg-ink-300 dark:bg-ink-700" />
            <div className="flex items-center gap-1.5">
              <span className="text-ink-400 dark:text-ink-400">အကြိမ်ရေ:</span>
              <span className="font-mono font-bold text-ink-900 dark:text-ink-100 text-sm">
                {currentCycleNumber} / 6
              </span>
            </div>
          </div>
        </div>

        {/* Step-by-Step Prompt Instruction */}
        <div className="px-4 py-2.5 rounded-xl bg-ink-50 dark:bg-ink-950/60 border border-ink-100 dark:border-white/5 text-xs text-ink-700 dark:text-ink-300">
          {!hasCompleted ? (
            <p>
              {!isExhale ? (
                <strong className="text-brand-700 dark:text-brand-400 font-bold">
                  ၄ စက္ကန့်:
                </strong>
              ) : (
                <strong className="text-amber-700 dark:text-amber-400 font-bold">
                  ၆ စက္ကန့်:
                </strong>
              )}{' '}
              {!isExhale
                ? 'နှာခေါင်းမှ လေကို အေးဆေးစွာ ဖြည့်သွင်းပါ'
                : 'အောင့်ထားစရာမလိုဘဲ လေကို ဖြည်းညင်းစွာ ပြန်ထုတ်ပါ'}
            </p>
          ) : (
            <p className="text-emerald-700 dark:text-emerald-400 font-medium">
              ✨ ၆၀ စက္ကန့် ပြီးပြည့်စုံပါပြီ! စိတ်အေးချမ်းသွားပြီဖြစ်၍ CIA Framework ဖြင့် ရှင်းလင်းစွာ စတင်နိုင်ပါပြီ။
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 relative z-10">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            {!hasCompleted && (
              <button
                type="button"
                onClick={toggleActive}
                id="pause-play-pause-btn"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700 text-ink-800 dark:text-ink-200 font-semibold text-xs transition min-h-[44px]"
              >
                {isActive ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>ခေတ္တရပ်မည်</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>ဆက်လုပ်မည်</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={handleRestart}
              id="pause-restart-btn"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700 text-ink-800 dark:text-ink-200 font-semibold text-xs transition min-h-[44px]"
              title="အစမှ ပြန်စမည်"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden xs:inline">ပြန်စမည်</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            id="pause-done-button"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-ink-900 dark:bg-brand-500 hover:bg-ink-800 dark:hover:bg-brand-400 text-white dark:text-ink-950 font-bold text-xs transition shadow-sm min-h-[44px]"
          >
            {hasCompleted ? 'ပြဿနာဖြေရှင်းမည် (Done)' : 'စိတ်ငြိမ်သွားပြီ — ဆက်လုပ်မည်'}
          </button>
        </div>
      </div>
    </div>
  );
};
