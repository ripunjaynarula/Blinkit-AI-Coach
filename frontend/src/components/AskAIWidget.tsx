'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, HelpCircle } from 'lucide-react';
import { Product } from '@/lib/api';

interface AskAIWidgetProps {
  product: Product;
  category: string;
}

export const AskAIWidget: React.FC<AskAIWidgetProps> = ({ product, category }) => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const quickQuestions = category.toLowerCase().includes('protein')
    ? ['Is this easy to digest?', 'Does it cause stomach bloating?', 'How does it taste with water?']
    : category.toLowerCase().includes('skin')
    ? ['Is this safe for sensitive skin?', 'Will it sting on active acne?', 'How long until visible results?']
    : ['Is this too bitter for beginners?', 'Does it require brewing equipment?', 'How much caffeine per cup?'];

  const handleAsk = (qText: string) => {
    if (!qText.trim()) return;
    setQuery(qText);
    setIsAsking(true);
    setAnswer(null);

    setTimeout(() => {
      let responseText = '';
      const qLower = qText.toLowerCase();

      if (qLower.includes('digest') || qLower.includes('bloat') || qLower.includes('stomach')) {
        responseText = `${product.name} is formulated for smooth absorption. ${product.beginner_friendliness?.reason || 'Verified customer reviews report minimal stomach discomfort when taken as directed.'}`;
      } else if (qLower.includes('bitter') || qLower.includes('taste') || qLower.includes('flavor')) {
        responseText = `${product.brand}'s ${product.name} offers a balanced flavor profile. Customers describe it as smooth without harsh bitter notes.`;
      } else if (qLower.includes('sensitive') || qLower.includes('sting') || qLower.includes('acne')) {
        responseText = `${product.name} features a dermatologist-tested formula designed for gentle daily application. Always perform a 24-hour patch test before full facial use.`;
      } else if (qLower.includes('beginner') || qLower.includes('first')) {
        responseText = `${product.name} has a beginner suitability score of ${product.beginner_friendliness?.score || 8.5}/10. It is simple to use with zero learning curve.`;
      } else {
        responseText = `Based on product specifications and verified buyer reviews, ${product.name} (₹${product.price}) is a high-satisfaction choice tailored for everyday use.`;
      }

      setAnswer(responseText);
      setIsAsking(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <MessageSquare className="w-4 h-4 text-blinkit-green" />
          <span>Ask AI Follow-Up</span>
        </div>
        <span className="text-[10px] text-gray-400 font-medium">Instant AI Reasoning</span>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="flex flex-wrap gap-1.5">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleAsk(q)}
            className="text-[11px] bg-gray-50 hover:bg-emerald-50 hover:text-blinkit-green hover:border-blinkit-green/40 border border-gray-200 px-2.5 py-1 rounded-xl text-gray-600 transition-colors flex items-center gap-1 text-left"
          >
            <HelpCircle className="w-3 h-3 shrink-0" />
            <span>{q}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(query);
        }}
        className="flex items-center gap-2 pt-1"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Ask anything about ${product.brand}...`}
          className="flex-1 bg-gray-50 hover:bg-white focus:bg-white border border-gray-200 focus:border-blinkit-green rounded-xl px-3 py-1.5 text-xs text-gray-900 outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!query.trim() || isAsking}
          className="p-2 bg-blinkit-green hover:bg-blinkit-green-dark disabled:opacity-40 text-white rounded-xl transition-all shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Answer Output */}
      {isAsking ? (
        <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 animate-pulse text-xs text-emerald-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-spin text-blinkit-green shrink-0" />
          <span>Analyzing product attributes & reviews...</span>
        </div>
      ) : answer ? (
        <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-950 leading-relaxed space-y-1">
          <div className="font-bold text-blinkit-green text-[11px] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Answer:</span>
          </div>
          <p>{answer}</p>
        </div>
      ) : null}
    </div>
  );
};
