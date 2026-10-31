"use client";

import { useState } from "react";
import { Compass, ArrowRight } from "lucide-react";
import { zodiacData, ZodiacSign } from "@/lib/data";

interface ZodiacRadarProps {
  onOpenBooking: (title: string, mode: string, price: number) => void;
}

export default function ZodiacRadar({ onOpenBooking }: ZodiacRadarProps) {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign>(zodiacData[0]);

  return (
    <section id="zodiac" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <span className="text-xs font-semibold tracking-widest text-celestial-gold uppercase">
            ✦ Planetary Transit Radar ✦
          </span>
          <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-1 mb-3">
            Your Celestial Zodiac Oracle
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Select your native Moon or Ascendant sign to inspect current cosmic frequencies, lucky
            numbers, and intuitive alignments.
          </p>
        </div>

        {/* 12 Zodiac Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 justify-start lg:justify-center no-scrollbar mb-8">
          <div className="flex gap-2">
            {zodiacData.map((z) => {
              const isSelected = selectedZodiac.id === z.id;
              return (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => setSelectedZodiac(z)}
                  className={`px-4 py-2 rounded-2xl text-xs whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-celestial-gold text-cosmic-950 shadow-md font-bold"
                      : "glass-panel text-slate-300 hover:text-white border border-white/10"
                  }`}
                >
                  <span>{z.symbol}</span>
                  <span>{z.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Sign Card Display */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl glass-card border border-celestial-gold/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-cosmic-950 border-2 border-celestial-gold/50 flex items-center justify-center text-3xl text-celestial-gold">
                {selectedZodiac.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-cinzel text-2xl font-bold text-white">
                    {selectedZodiac.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-200 border border-purple-500/30 uppercase tracking-widest">
                    {selectedZodiac.element} Element
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Governing Ruler:{" "}
                  <span className="text-amber-300 font-medium">{selectedZodiac.planet}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Aura Vibration</div>
                <div className="text-xl font-bold text-emerald-400 font-cinzel">
                  {selectedZodiac.vibration}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-b border-white/10 text-xs">
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                Aura Color
              </span>
              <span className="text-white font-semibold">{selectedZodiac.color}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                Lucky Numbers
              </span>
              <span className="text-white font-semibold">{selectedZodiac.lucky}</span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase tracking-wider text-[10px]">
                High Synergy Sign
              </span>
              <span className="text-amber-300 font-semibold">{selectedZodiac.synergy}</span>
            </div>
          </div>

          <div className="pt-6">
            <h5 className="text-xs font-bold text-celestial-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Current Intuitive Transit Guidance</span>
            </h5>
            <p className="text-sm text-slate-200 leading-relaxed italic">
              “{selectedZodiac.desc}”
            </p>
            <div className="mt-5 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/5">
              <span className="text-xs text-slate-400">
                Facing specific transit turbulence in {selectedZodiac.name}?
              </span>
              <button
                type="button"
                onClick={() =>
                  onOpenBooking(
                    `Transit Consultation for ${selectedZodiac.name}`,
                    "Detailed Chat",
                    2100
                  )
                }
                className="px-4 py-2 rounded-xl bg-celestial-gold text-cosmic-950 font-bold text-xs uppercase tracking-wider hover:bg-yellow-300 transition flex items-center gap-1 cursor-pointer"
              >
                <span>Book Transit Reading</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

