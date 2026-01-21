export const AUTHOR_NAME = "Alex Welcing";
export const AUTHOR_TITLE = "Senior AI Product Leader & Engineer";
export const ARTICLE_TITLE = "Beyond Chatbots: Architecting Agentic Web Systems";
export const ARTICLE_SUBTITLE = "The Full-Stack Guide to Building AI Agents: Strategy & Code";

export const SEO_JSON_LD = {
  "@context": "https://schema.org/",
  "@type": "TechArticle",
  "headline": ARTICLE_TITLE,
  "alternativeHeadline": ARTICLE_SUBTITLE,
  "proficiencyLevel": "Expert",
  "author": {
    "@type": "Person",
    "name": AUTHOR_NAME,
    "jobTitle": AUTHOR_TITLE,
    "url": "https://agents.alexwelcing.com",
    "sameAs": [
      "https://alexwelcing.com",
      "https://www.linkedin.com/in/alexwelcing",
      "https://github.com/alexwelcing"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York",
      "addressRegion": "NY"
    }
  },
  "about": [
    { "@type": "Thing", "name": "Agentic Workflow" },
    { "@type": "Thing", "name": "Next.js Architecture" },
    { "@type": "Thing", "name": "AI Product Management" },
    { "@type": "Thing", "name": "Generative UI" },
    { "@type": "Thing", "name": "Latency Masking" },
    { "@type": "Thing", "name": "LLM Evaluation" }
  ]
};

export const CODE_SNIPPET_TOOL = `// /app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    tools: {
      getRevenueData: tool({
        description: 'Get revenue data for a specific quarter',
        parameters: z.object({
          quarter: z.string().describe('The quarter to fetch, e.g., "Q3 2024"'),
        }),
        execute: async ({ quarter }) => {
          // DB Query Logic
          return await db.query('SELECT * FROM revenue WHERE quarter = ?', [quarter]);
        },
      }),
    },
    maxSteps: 5, 
  });
  return result.toDataStreamResponse();
}`;

export const CODE_SNIPPET_UI = `// /components/ChatInterface.tsx
'use client';
import { useChat } from 'ai/react';
import { RevenueChart } from './RevenueChart';

export default function ChatInterface() {
  const { messages, input, handleSubmit } = useChat();

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
           {m.toolInvocations?.map((tool) => (
             tool.toolName === 'getRevenueData' && 
             <RevenueChart data={tool.result} />
           ))}
           <p>{m.content}</p>
        </div>
      ))}
    </div>
  );
}`;

export const OPTIMISTIC_CODE_TRADITIONAL = `// ❌ Traditional: Blocking State
const [isLoading, setIsLoading] = useState(false);

const sendMessage = async (text) => {
  setIsLoading(true); // Trigger Spinner
  
  // Wait for full roundtrip (3-10s)
  await api.sendMessage(text);
  
  setIsLoading(false); // Remove Spinner
  mutate('/api/messages');
};`;

export const OPTIMISTIC_CODE_AGENTIC = `// ✅ Agentic: Optimistic UI
// We use React 19's useOptimistic to update the UI instantly
const [optMsgs, addOptMsg] = useOptimistic(
  messages,
  (state, newMsg) => [...state, newMsg]
);

const sendMessage = async (text) => {
  // 1. Instant User Feedback (0ms)
  addOptMsg({ role: 'user', content: text });
  
  // 2. Stream Response (TTFT < 400ms)
  // The user sees the AI "thinking" skeleton immediately
  await api.sendMessage(text);
};`;

export const MODEL_METRICS_DATA = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputCost: 5.00,
    outputCost: 15.00,
    codingScore: 92,
    latencyScore: 9,
    contextWindow: '128k',
    bestFor: ['Orchestration', 'Complex Reasoning']
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    inputCost: 3.00,
    outputCost: 15.00,
    codingScore: 96,
    latencyScore: 8,
    contextWindow: '200k',
    bestFor: ['Coding', 'Content Generation']
  },
  {
    id: 'gemini-1-5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    inputCost: 0.075,
    outputCost: 0.30,
    codingScore: 84,
    latencyScore: 10,
    contextWindow: '1M',
    bestFor: ['High Volume', 'Summarization', 'RAG']
  },
  {
    id: 'llama-3-70b',
    name: 'Llama 3 (70B)',
    provider: 'Meta (Groq)',
    inputCost: 0.70,
    outputCost: 0.90,
    codingScore: 88,
    latencyScore: 10,
    contextWindow: '8k',
    bestFor: ['Real-time Chat', 'Classification']
  }
];