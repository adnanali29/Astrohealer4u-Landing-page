"use client";

import { useState } from "react";
import { Sun, Sparkles, Eye, RefreshCw, Compass } from "lucide-react";
import { oracleCards } from "@/lib/data";
import { playHarmonicChime } from "@/lib/audio";

interface TarotOracleProps {
  onShowToast: (msg: string) => void;
}

export default function TarotOracle({ onShowToast }: TarotOracleProps) {
  // Array of flipped state booleans for each of the 3 cards
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const handleCardClick = (index: number) => {
    setFlipped((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      if (next[index]) {
        playHarmonicChime(528);
      }
      return next;
    });
  };

  const handleReshuffle = () => {
    setFlipped([false, false, false]);
    playHarmonicChime(432);
    onShowToast("Sacred deck shuffled. Choose your card.");
  };

  const renderFrontIcon = (icon: string) => {
    switch (icon) {
      case "sun":
        return <Sun className="w-10 h-10 text-celestial-gold" />;
      case "sparkles":
        return <Sparkles className="w-10 h-10 text-celestial-amethyst" />;
      case "eye":
        return <Eye className="w-10 h-10 text-teal-300" />;
      default:
        return <Sparkles className="w-10 h-10 text-celestial-gold" />;
    }
  };

  return (
    <section
      id="oracle"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-cosmic-900/50 border-t border-b border-celestial-purple/20 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-celestial-amethyst uppercase">
            ✦ Interactive Divine Oracle ✦
          </span>
          <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-1 mb-3">
            Your Daily Cosmic Tarot Guidance
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Focus deeply on a current confusion or decision. Click any card below to flip and
            synthesize your real-time cosmic vibration.
          </p>
        </div>

        {/* Tarot Cards Container (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 max-w-4xl mx-auto">
          {oracleCards.map((card, idx) => {
            const isFlipped = flipped[idx];

            return (
              <div
                key={card.id}
                className="perspective-1000 h-96 cursor-pointer select-none"
                onClick={() => handleCardClick(idx)}
              >
                <div
                  className={`relative w-full h-full duration-700 transform-style-3d transition-transform rounded-2xl shadow-xl ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front Cover */}
                  <div
                    className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl glass-card border-2 ${card.frontBg} p-6 flex flex-col items-center justify-between bg-gradient-to-b from-[#181236] to-[#0c081c]`}
                  >
                    <div className="text-[10px] tracking-widest text-celestial-gold uppercase font-cinzel">
                      AstroHealer Oracle
                    </div>
                    <div className="w-20 h-20 rounded-full border border-celestial-gold/30 flex items-center justify-center animate-pulse">
                      {renderFrontIcon(card.frontIcon)}
                    </div>
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                        {card.subtitle}
                      </p>
                      <span className="text-[11px] text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                        Tap to Reveal ✦
                      </span>
                    </div>
                  </div>

                  {/* Back Revealed Content */}
                  <div
                    className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl glass-card border-2 ${card.borderColor} p-6 flex flex-col justify-between bg-gradient-to-b from-cosmic-850 to-cosmic-950`}
                  >
                    <div>
                      <div className="flex justify-between items-center text-[10px] uppercase text-celestial-gold font-bold">
                        <span>{card.element} Element</span>
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-white mt-3 mb-2">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        “{card.text}”
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/10 text-[11px] text-amber-300">
                      <strong>Remedy:</strong> {card.remedy}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reshuffle Deck Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleReshuffle}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-600 hover:border-celestial-gold text-slate-300 hover:text-celestial-gold text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reshuffle Sacred Deck</span>
          </button>
        </div>
      </div>
    </section>
  );
}

