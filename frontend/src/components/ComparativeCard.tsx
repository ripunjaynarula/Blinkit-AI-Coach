'use client';

import React from 'react';
import { ArrowRightLeft, CheckCircle2 } from 'lucide-react';

interface ComparativeItem {
  competitor_name: string;
  competitor_brand: string;
  tradeoffs: string[];
}

interface ComparativeCardProps {
  currentBrand: string;
  comparisons: ComparativeItem[];
}

export const ComparativeCard: React.FC<ComparativeCardProps> = ({
  currentBrand,
  comparisons
}) => {
  if (!comparisons || comparisons.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
        <ArrowRightLeft className="w-4 h-4 text-blinkit-green" />
        <span>Why this over similar products?</span>
      </div>

      <div className="space-y-3">
        {comparisons.map((comp, idx) => (
          <div key={idx} className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
            <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center justify-between">
              <span>Compared with <strong className="text-gray-900">{comp.competitor_brand}</strong> ({comp.competitor_name})</span>
            </div>

            <ul className="space-y-1.5">
              {comp.tradeoffs.map((bullet, bIdx) => (
                <li key={bIdx} className="text-xs text-gray-700 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blinkit-green shrink-0 mt-0.5" />
                  <span>{bullet.replace(/^✓\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
