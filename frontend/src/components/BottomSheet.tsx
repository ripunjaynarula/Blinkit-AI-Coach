'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}) => {
  // Prevent background scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Sheet Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-2xl bg-white rounded-t-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
          >
            {/* Drag Handle & Header */}
            <div className="pt-3 pb-2 px-6 bg-white border-b border-gray-100 sticky top-0 z-20 flex items-center justify-between">
              <div className="flex-1">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-3" />
                {title && (
                  <div>
                    <h2 className="text-lg font-extrabold text-gray-900 leading-tight">{title}</h2>
                    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto no-scrollbar space-y-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
