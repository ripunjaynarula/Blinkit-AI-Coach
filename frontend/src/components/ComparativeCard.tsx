'use client';

import React from 'react';
import { ArrowRightLeft, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface ComparativeItem {
  competitor_name: string;
  competitor_brand: string;
  tradeoffs: string[];
}

interface ComparativeCardProps {
  currentBrand: string;
  comparisons: ComparativeItem[];
  matchTier?: string;
}

export const ComparativeCard: React.FC<ComparativeCardProps> = ({
  comparisons,
  matchTier = 'Good Match'
}) => {
  if (!comparisons || comparisons.length === 0) return null;

  const isNegativeOrWeak = matchTier === 'Not Recommended' || matchTier === 'Worth Considering';

  return (
    <div className={`rounded-2xl border p-4 shadow-sm space-y-3 ${
      matchTier === 'Not Recommended' 
        ? 'bg-rose-50/40 border-rose-200' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          {isNegativeOrWeak ? (
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          ) : (
            <ArrowRightLeft className="w-4 h-4 text-blinkit-green" />
          )}
          <span>{isNegativeOrWeak ? 'Recommended Alternative' : 'Why this over similar products?'}</span>
        </div>
        {isNegativeOrWeak && (
          <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
            Stronger Choice Available
          </span>
        )}
      </div>

      <div className="space-y-3">
        {comparisons.slice(0, isNegativeOrWeak ? 1 : 2).map((comp, idx) => (
          <div key={idx} className={`rounded-xl p-3 border ${
            isNegativeOrWeak ? 'bg-white border-rose-200 shadow-sm' : 'bg-gray-50/80 border-gray-100'
          }`}>
            <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center justify-between">
              <span>Alternative Option: <strong className="text-gray-900">{comp.competitor_brand}</strong> ({comp.competitor_name})</span>
            </div>

            {isNegativeOrWeak && (
              <div className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded-lg mb-2 flex items-center gap-1.5 border border-emerald-100">
                <Sparkles className="w-3.5 h-3.5 text-blinkit-green shrink-0" />
                <span>Why it's better for your context: Higher beginner safety score & lower dissatisfaction risk.</span>
              </div>
            )}

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
