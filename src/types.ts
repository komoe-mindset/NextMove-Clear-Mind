export type Category = 'control' | 'influence' | 'accept';

export interface SorterItem {
  id: string;
  text: string;
  category: Category;
}

export interface Plan {
  id: string;
  title: string;
  control: string;
  influence: string;
  accept: string;
  nextAction: string;
}

export type DiagnosticLevel = 'high' | 'medium' | 'low';

export interface DiagnosticAnswers {
  control: DiagnosticLevel | null;
  influence: DiagnosticLevel | null;
  accept: DiagnosticLevel | null;
}

export interface DiagnosticResult {
  title: string;
  badge: string;
  summary: string;
  points: {
    category: Category;
    text: string;
  }[];
  questionToAsk?: string;
  borderClass: string;
  bgClass: string;
}

export interface TemplateItem {
  id: string;
  icon: string;
  title: string;
  control: string;
  influence: string;
  accept: string;
  nextAction: string;
}

export interface ToastData {
  id: string;
  message: string;
  icon: string;
}
