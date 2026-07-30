'use client';

import React from 'react';
import { Eye, Check } from 'lucide-react';

interface ExplainableCardProps {
  checklist: string[];
}

export const ExplainableCard: React.FC<ExplainableCardProps> = ({ checklist }) => {
  if (!checklist || checklist.length === 0) return null;

  return (
    <div className="bg-emerald-50/40 rounded-2xl border border-emerald-100 p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 border-b border-emerald-100 pb-2">
        <Eye className="w-4 h-4 text-blinkit-green" />
        <span>Why you&apos;re seeing this recommendation</span>
      </div>

      <div className="space-y-1.5">
        {checklist.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
            <div className="w-4 h-4 rounded-full bg-blinkit-green text-white flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span>{item.replace(/^✓\s*/, '')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
