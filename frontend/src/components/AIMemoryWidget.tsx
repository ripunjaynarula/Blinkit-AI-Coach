'use client';

import React, { useState } from 'react';
import { ShieldCheck, ThumbsUp, Minus, ThumbsDown, Check } from 'lucide-react';
import { MemoryItem } from '../lib/store';

interface AIMemoryWidgetProps {
  productName: string;
  productId: string;
  existingMemories: MemoryItem[];
  onSaveMemory: (memory: Omit<MemoryItem, 'id' | 'date'>) => void;
}

export const AIMemoryWidget: React.FC<AIMemoryWidgetProps> = ({
  productName,
  productId,
  existingMemories,
  onSaveMemory
}) => {
  const existing = existingMemories.find(m => m.product_id === productId);

  const [selectedRating, setSelectedRating] = useState<'loved' | 'okay' | 'avoid' | null>(
    existing ? existing.rating : null
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    existing ? existing.tags : []
  );
  const [submitted, setSubmitted] = useState(false);

  const availableTags = [
    'Taste', 'Price', 'Effectiveness', 'Digestibility', 'Skin reaction', 'Texture', 'Packaging', 'Instant Prep'
  ];

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = (rating: 'loved' | 'okay' | 'avoid') => {
    setSelectedRating(rating);
    onSaveMemory({
      product_id: productId,
      product_name: productName,
      rating: rating,
      tags: selectedTags
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="bg-amber-50/50 rounded-2xl border border-amber-200/80 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Remember this product? (AI Memory)</span>
        </div>
        {submitted && (
          <span className="text-[11px] font-bold text-blinkit-green flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> AI Memory Updated!
          </span>
        )}
      </div>

      <p className="text-xs text-amber-800">
        Rate your experience with <strong className="text-gray-900">{productName}</strong> so Blinkit AI can personalize your future recommendations.
      </p>

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleSave('loved')}
          className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
            selectedRating === 'loved'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-500'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>Loved it</span>
        </button>

        <button
          onClick={() => handleSave('okay')}
          className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
            selectedRating === 'okay'
              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:border-amber-500'
          }`}
        >
          <Minus className="w-3.5 h-3.5" />
          <span>It was okay</span>
        </button>

        <button
          onClick={() => handleSave('avoid')}
          className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
            selectedRating === 'avoid'
              ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
              : 'bg-white text-gray-700 border-gray-200 hover:border-rose-500'
          }`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          <span>Wouldn&apos;t buy again</span>
        </button>
      </div>

      {/* Tags */}
      {selectedRating && (
        <div className="pt-2 border-t border-amber-200/50">
          <span className="text-[11px] font-semibold text-amber-900 block mb-1.5">Why? (Select key factors)</span>
          <div className="flex flex-wrap gap-1.5">
            {availableTags.map(tag => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleToggleTag(tag)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                    active
                      ? 'bg-amber-900 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
