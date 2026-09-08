import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FrameworkSection } from './components/FrameworkSection';
import { DiagnosticSection } from './components/DiagnosticSection';
import { CanvasSection } from './components/CanvasSection';
import { PlannerSection } from './components/PlannerSection';
import { TemplatesSection } from './components/TemplatesSection';
import { GeminiGemSection } from './components/GeminiGemSection';
import { Footer } from './components/Footer';
import { BreathingModal } from './components/BreathingModal';
import { ConfirmModal } from './components/ConfirmModal';
import { PromptModal } from './components/PromptModal';
import { Toast } from './components/Toast';
import { INITIAL_PLAN, INITIAL_SORTER_ITEMS } from './data/templates';
import { Category, Plan, SorterItem, TemplateItem, ToastData } from './types';
import { playChime } from './utils/audio';

const STORAGE_KEY = 'nextmove_cia_app_data_v2';
const THEME_KEY = 'theme_preference';

export default function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Toast State
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback((message: string, icon: string = '✅') => {
    const id = Date.now().toString();
    setToast({ id, message, icon });
    playChime('pop');
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3200);
  }, []);

  // Data persistence state
  const [plans, setPlans] = useState<Record<string, Plan>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.plans && Object.keys(parsed.plans).length > 0) {
          return parsed.plans;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PLAN;
  });

  const [currentPlanId, setCurrentPlanId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.currentPlanId && parsed.plans?.[parsed.currentPlanId]) {
          return parsed.currentPlanId;
        }
      }
    } catch {
      // ignore
    }
    return 'default';
  });

  const [sorterItems, setSorterItems] = useState<SorterItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.sorterItems) && parsed.sorterItems.length > 0) {
          return parsed.sorterItems;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_SORTER_ITEMS;
  });

  // Save to localStorage on state changes
  useEffect(() => {
    try {
      const dataToSave = {
        currentPlanId,
        plans,
        sorterItems,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // Local storage quota limit safety
    }
  }, [currentPlanId, plans, sorterItems]);

  // Modal States
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const [promptModal, setPromptModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    defaultValue: string;
    onConfirm: (val: string) => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    defaultValue: '',
    onConfirm: () => {},
  });

  // Sorter operations
  const handleAddSorterItem = (text: string, category: Category) => {
    const newItem: SorterItem = {
      id: Date.now().toString(),
      text,
      category,
    };
    setSorterItems((prev) => [...prev, newItem]);
    showToast('ကတ်အသစ် ထည့်သွင်းပြီးပါပြီ', '➕');
  };

  const handleMoveSorterItem = (id: string, targetCategory: Category) => {
    setSorterItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, category: targetCategory } : item
      )
    );
  };

  const handleDeleteSorterItem = (id: string) => {
    setSorterItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllSorter = () => {
    setConfirmModal({
      isOpen: true,
      title: 'အားလုံးဖျက်မည်',
      message: 'Canvas ပေါ်ရှိ ကတ်အားလုံးကို ဖျက်ပစ်ရန် သေချာပါသလား?',
      onConfirm: () => {
        setSorterItems([]);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        showToast('ကတ်များ အားလုံးရှင်းပြီးပါပြီ', '🗑️');
      },
    });
  };

  const handleLoadDemoSorter = () => {
    setSorterItems([
      { id: '10', text: 'CV & Portfolio ကို အချက်အလက်သစ်များ ဖြည့်စွက်ပြင်ဆင်ခြင်း', category: 'control' },
      { id: '11', text: 'အင်တာဗျူး အမေးအဖြေများကို အသံသွင်း၍ ကိုယ်တိုင်လေ့ကျင့်ခြင်း', category: 'control' },
      { id: '12', text: 'အလုပ်လျှောက်ပြီး ၁ ပတ်အကြာတွင် polite follow-up email ပို့မေးမြန်းခြင်း', category: 'influence' },
      { id: '13', text: 'သက်ဆိုင်ရာ လုပ်ငန်းနယ်ပယ်မှ မိတ်ဆွေကို အကြံဉာဏ်တောင်းခံခြင်း', category: 'influence' },
      { id: '14', text: 'Company ၏ Final Decision နှင့် အချိန်ကို ကိုယ်တိုင် မထိန်းချုပ်နိုင်ခြင်း', category: 'accept' },
      { id: '15', text: 'လက်ရှိ ကမ္ဘာ့စီးပွားရေးနှင့် ပြိုင်ဆိုင်မှု ပြင်းထန်သော ဈေးကွက် Reality', category: 'accept' },
    ]);
    showToast('ဥပမာ အချက်အလက်များ ထည့်ပြီးပါပြီ', '💡');
  };

  const handleSyncCanvasToPlanner = () => {
    const cItems = sorterItems
      .filter((i) => i.category === 'control')
      .map((i) => `• ${i.text}`)
      .join('\n');
    const iItems = sorterItems
      .filter((i) => i.category === 'influence')
      .map((i) => `• ${i.text}`)
      .join('\n');
    const aItems = sorterItems
      .filter((i) => i.category === 'accept')
      .map((i) => `• ${i.text}`)
      .join('\n');

    setPlans((prev) => {
      const current = prev[currentPlanId] || {
        id: currentPlanId,
        title: 'Plan',
        control: '',
        influence: '',
        accept: '',
        nextAction: '',
      };
      return {
        ...prev,
        [currentPlanId]: {
          ...current,
          control: cItems || current.control,
          influence: iItems || current.influence,
          accept: aItems || current.accept,
        },
      };
    });

    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Action Plan ဇယားထဲသို့ အောင်မြင်စွာ ကူးယူပြီးပါပြီ', '✅');
  };

  // Diagnostic transfer
  const handleTransferDiagToPlan = (problemTitle: string) => {
    setPlans((prev) => {
      const current = prev[currentPlanId] || {
        id: currentPlanId,
        title: problemTitle,
        control: '',
        influence: '',
        accept: '',
        nextAction: '',
      };
      return {
        ...prev,
        [currentPlanId]: {
          ...current,
          title: problemTitle,
        },
      };
    });

    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Planner operations
  const handleSavePlan = (updated: Plan) => {
    setPlans((prev) => ({
      ...prev,
      [updated.id]: updated,
    }));
  };

  const handleRequestNewPlan = () => {
    setPromptModal({
      isOpen: true,
      title: 'Plan အသစ်ဖွင့်မည်',
      message: 'ဖြေရှင်းမည့် ပြဿနာ သို့မဟုတ် Plan ၏ အမည်ကို ထည့်ပါ:',
      defaultValue: 'Plan အသစ်',
      onConfirm: (name) => {
        const newId = 'plan_' + Date.now();
        const newPlan: Plan = {
          id: newId,
          title: name,
          control: '',
          influence: '',
          accept: '',
          nextAction: '',
        };
        setPlans((prev) => ({
          ...prev,
          [newId]: newPlan,
        }));
        setCurrentPlanId(newId);
        setPromptModal((prev) => ({ ...prev, isOpen: false }));
        showToast(`"${name}" ကို ဖန်တီးပြီးပါပြီ`, '✨');
      },
    });
  };

  const handleRequestDeletePlan = (idToDelete: string) => {
    const keys = Object.keys(plans);
    if (keys.length <= 1) {
      showToast('အနည်းဆုံး Plan တစ်ခု ရှိရပါမည်', '⚠️');
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'Plan ကို ဖျက်မည်',
      message: 'ဒီ Plan ကို အပြီးတိုင် ဖျက်ပစ်ရန် သေချာပါသလား?',
      onConfirm: () => {
        setPlans((prev) => {
          const clone = { ...prev };
          delete clone[idToDelete];
          return clone;
        });
        const remainingKeys = keys.filter((k) => k !== idToDelete);
        setCurrentPlanId(remainingKeys[0]);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        showToast('Plan ကို ဖျက်ပြီးပါပြီ', '🗑️');
      },
    });
  };

  // Template operation
  const handleSelectTemplate = (template: TemplateItem) => {
    const newId = 'template_' + template.id + '_' + Date.now();
    const newPlan: Plan = {
      id: newId,
      title: template.title,
      control: template.control,
      influence: template.influence,
      accept: template.accept,
      nextAction: template.nextAction,
    };
    setPlans((prev) => ({
      ...prev,
      [newId]: newPlan,
    }));
    setCurrentPlanId(newId);

    const plannerEl = document.getElementById('planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`"${template.title}" Template ကို Action Plan သို့ တင်သွင်းပြီးပါပြီ`, '💡');
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950 text-ink-900 dark:text-ink-100 font-burmese transition-colors duration-300">
      {/* Top Sticky Header with Mobile Rail */}
      <Header
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onOpenBreathing={() => setBreathingOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 sm:space-y-20">
        <Hero />
        <FrameworkSection />
        <DiagnosticSection
          onTransferToPlan={handleTransferDiagToPlan}
          showToast={showToast}
        />
        <CanvasSection
          items={sorterItems}
          onAddItem={handleAddSorterItem}
          onMoveItem={handleMoveSorterItem}
          onDeleteItem={handleDeleteSorterItem}
          onClearAll={handleClearAllSorter}
          onLoadDemo={handleLoadDemoSorter}
          onSyncToPlanner={handleSyncCanvasToPlanner}
        />
        <PlannerSection
          plans={plans}
          currentPlanId={currentPlanId}
          onSelectPlan={setCurrentPlanId}
          onSavePlan={handleSavePlan}
          onRequestNewPlan={handleRequestNewPlan}
          onRequestDeletePlan={handleRequestDeletePlan}
          showToast={showToast}
        />
        <TemplatesSection onSelectTemplate={handleSelectTemplate} />
        <GeminiGemSection />
      </main>

      <Footer />

      {/* Breathing Pause Modal */}
      <BreathingModal
        isOpen={breathingOpen}
        onClose={() => setBreathingOpen(false)}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Prompt Modal */}
      <PromptModal
        isOpen={promptModal.isOpen}
        title={promptModal.title}
        message={promptModal.message}
        defaultValue={promptModal.defaultValue}
        placeholder="Plan အမည် ရေးပါ..."
        onConfirm={promptModal.onConfirm}
        onCancel={() => setPromptModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Dynamic Toast Notifications */}
      <Toast toast={toast} />
    </div>
  );
}
