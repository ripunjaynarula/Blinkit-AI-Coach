'use client';

import React from 'react';
import { Sparkles, Check } from 'lucide-react';

interface ContextualGuidanceBarProps {
  category: string;
  activePreference: string;
  onSelectPreference: (pref: string) => void;
}

export const ContextualGuidanceBar: React.FC<ContextualGuidanceBarProps> = ({
  category,
  activePreference,
  onSelectPreference
}) => {
  const getOptions = () => {
    if (category.toLowerCase().includes('protein')) {
      return ['Beginner friendly', 'Budget', 'Easy digestion', 'Muscle gain'];
    } else if (category.toLowerCase().includes('skin')) {
      return ['Gentle skin', 'Budget', 'Acne control', 'Fast results'];
    } else {
      return ['Beginner friendly', 'Budget', 'Best taste', 'Instant prep'];
    }
  };

  const options = getOptions();

  return (
    <div className="bg-gradient-to-r from-emerald-50 via-emerald-50/50 to-amber-50/50 p-4 rounded-2xl border border-emerald-100/80 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-blinkit-green" />
        <span className="text-xs font-bold text-gray-900">What matters most today?</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = activePreference.toLowerCase() === opt.toLowerCase();
          return (
            <button
              key={opt}
              onClick={() => onSelectPreference(opt)}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-blinkit-green text-white border-blinkit-green shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blinkit-green hover:text-blinkit-green'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-blinkit-yellow" />}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
