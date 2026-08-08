'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Server, Zap, CheckCircle2 } from 'lucide-react';

interface ServerWakeupModalProps {
  onBackendReady?: () => void;
}

const WAKEUP_MESSAGES = [
  "Waking up our AI backend engine on Render...",
  "Heating up the espresso machine for coffee specs...",
  "Waking up the 8 AI reasoning workers from sleep...",
  "Pre-warming 703 customer review intelligence records...",
  "Connecting to Blinkit Decision Assistant...",
  "Spinning up free-tier server instance...",
  "Brewing fresh coffee & protein spec derivations...",
  "Almost there! Grounding category domain knowledge...",
  "Finishing health check... Launching decision engine!"
];

export const ServerWakeupModal: React.FC<ServerWakeupModalProps> = ({ onBackendReady }) => {
  const [isWakingUp, setIsWakingUp] = useState<boolean>(false);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;
    let isMounted = true;

    // Show wakeup banner if health check takes longer than 800ms
    const timer = setTimeout(() => {
      if (!isReady && isMounted) {
        setIsWakingUp(true);
      }
    }, 800);

    const checkHealth = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://blinkit-ai-backend.onrender.com/api';
      const healthEndpoint = backendUrl.endsWith('/api') ? `${backendUrl}/health` : `${backendUrl}/api/health`;

      try {
        const response = await fetch(healthEndpoint, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          // Cache control to force fresh check
          cache: 'no-store'
        });

        if (response.ok) {
          const data = await response.json();
          if (data && (data.status === 'ok' || data.service || data.health_check)) {
            if (isMounted) {
              setIsReady(true);
              setIsWakingUp(false);
              if (onBackendReady) onBackendReady();
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Backend health check pending server spin-up:', err);
      }

      // Retry health check every 3 seconds if not yet ready
      if (isMounted && !isReady) {
        setTimeout(checkHealth, 3000);
      }
    };

    checkHealth();

    // Rotate message every 4 seconds (4000ms)
    messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % WAKEUP_MESSAGES.length);
    }, 4000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(messageInterval);
    };
  }, []);

  if (!isWakingUp || isReady) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center space-y-5 relative overflow-hidden">
        {/* Top Decorative Background Glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-blinkit-green/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blinkit-yellow/20 rounded-full blur-2xl pointer-events-none" />

        {/* Server Icon with Pulse & Spinner */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-blinkit-green/20 animate-ping opacity-75" />
          <div className="relative w-16 h-16 bg-gradient-to-tr from-blinkit-green to-emerald-700 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blinkit-green/30">
            <Server className="w-8 h-8 text-blinkit-yellow animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-blinkit-green px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5 fill-blinkit-green" />
            <span>RENDER FREE TIER BACKEND</span>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Waking Up AI Server
          </h3>
        </div>

        {/* Dynamic Rotating Message Box (Changes every 4 seconds) */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 min-h-[72px] flex items-center justify-center">
          <p 
            key={messageIndex}
            className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed transition-all duration-500 animate-fade-in flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-blinkit-green shrink-0 animate-spin" />
            <span>{WAKEUP_MESSAGES[messageIndex]}</span>
          </p>
        </div>

        {/* Progress Bar & Status Notice */}
        <div className="space-y-2">
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blinkit-green via-blinkit-yellow to-emerald-600 h-full w-full animate-pulse rounded-full" />
          </div>
          <p className="text-[11px] text-gray-400 font-medium">
            Free hosting instances spin down after inactivity. Once JSON status is returned, app continues automatically!
          </p>
        </div>
      </div>
    </div>
  );
};
