"use client";

import { Sparkles } from "lucide-react";

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 glass-panel border border-celestial-gold/40 text-amber-200 text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
      <Sparkles className="w-4 h-4 text-celestial-gold" />
      <span>{message}</span>
    </div>
  );
}

