'use client';

import React from 'react';
import { Compass, Check } from 'lucide-react';

interface ContextualGuidanceBarProps {
  category: string;
  activePreference: string;
  onSelectPreference: (pref: string) => void;
}

export const ContextualGuidanceBar: React.FC<ContextualGuidanceBarProps> = ({
  activePreference,
  onSelectPreference
}) => {
  const contexts = [
    'First time buying',
    'Best value',
    'Premium quality',
    'Healthy choice',
    'Everyday use',
    'Gift purchase'
  ];

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-emerald-50/50 to-amber-50/50 p-3.5 sm:p-4 rounded-2xl border border-emerald-100/80 mb-4">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-blinkit-green" />
          <span className="text-xs font-bold text-gray-900">Select Decision Context</span>
        </div>
        <span className="text-[10px] text-gray-500 font-medium">Optional</span>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {contexts.map((ctx) => {
          const isSelected = activePreference.toLowerCase() === ctx.toLowerCase();
          return (
            <button
              key={ctx}
              onClick={() => onSelectPreference(isSelected ? '' : ctx)}
              className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl font-semibold transition-all border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blinkit-green text-white border-blinkit-green shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blinkit-green hover:text-blinkit-green'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-blinkit-yellow shrink-0" />}
              <span>{ctx}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
