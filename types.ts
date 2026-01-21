export enum ViewMode {
  ENGINEERING = 'ENGINEERING',
  PRODUCT = 'PRODUCT'
}

export interface DiagramNode {
  id: string;
  label: string;
  type: 'client' | 'server' | 'tool' | 'ai';
  engDesc: string;
  pmDesc: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolInvocation?: {
    toolName: string;
    state: 'call' | 'result';
    result?: any;
  };
}

export interface RevenueData {
  quarter: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ModelMetric {
  id: string;
  name: string;
  provider: string;
  inputCost: number; // $ per 1M tokens
  outputCost: number; // $ per 1M tokens
  codingScore: number; // 0-100
  latencyScore: number; // 0-10
  contextWindow: string;
  bestFor: string[];
}