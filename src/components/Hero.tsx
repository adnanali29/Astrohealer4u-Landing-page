"use client";

import { Moon, Sparkle, Compass } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";

interface HeroProps {
  onShowToast?: (msg: string) => void;
  externalSelection?: {
    serviceId?: string;
    modeText?: string;
  };
}

export default function Hero({ onShowToast, externalSelection }: HeroProps) {
  return (
    <section className="relative flex items-center justify-center pt-4 sm:pt-6 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-nebula overflow-hidden">
      {/* Astrological Geometric Rings Visual Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full border border-celestial-gold/40 animate-spin-slow" />
        <div className="absolute w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full border border-dashed border-celestial-amethyst/50 animate-spin-reverse-slow" />
        <div className="absolute w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] rounded-full border border-celestial-gold/30" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Right side on desktop (Col 8-12) / Top on phone (order-1 lg:order-2) */}
          <div className="w-full lg:col-span-5 order-1 lg:order-2">
            <ConsultationForm onShowToast={onShowToast} externalSelection={externalSelection} />
          </div>

          {/* Left side on desktop (Col 1-7) / Bottom on phone (order-2 lg:order-1) */}
          <div className="w-full lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-celestial-gold/40 text-celestial-gold text-xs uppercase tracking-widest mb-6 animate-pulse">
              <Moon className="w-3.5 h-3.5" />
              <span>✦ Fear-Free & Pure Logical Vedic Alchemy ✦</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-5">
              <span className="gold-gradient-text block">“Only I Know What</span>
              <span className="purple-gradient-text">You Are Hiding” 💫</span>
            </h1>

            <p className="max-w-2xl mx-auto lg:mx-0 text-sm sm:text-lg text-slate-300 font-light leading-relaxed mb-7">
              With <span className="text-amber-300 font-semibold">10+ years of deep Vedic mastery</span> and over{" "}
              <span className="text-amber-300 font-semibold">15,000+ seekers helped worldwide</span>, Master Astrologer Garima Verma decodes your{" "}
              <span className="text-amber-300 font-medium">8th house secrets</span>, karmic debts, and
              hidden celestial roadblocks to guide your career, marriage, and soul path into effortless
              alignment. Zero fear tactics. Pure logical clarity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#hero-consultation-form"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-cosmic-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(243,201,106,0.4)] hover:shadow-[0_0_35px_rgba(243,201,106,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkle className="w-4 h-4 text-cosmic-950" />
                <span>Begin Soul Reading</span>
              </a>
              <a
                href="#blueprint"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-panel border border-white/20 text-white font-medium text-xs tracking-wider hover:border-celestial-gold hover:text-celestial-gold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-celestial-purple" />
                <span>Generate Natal Matrix</span>
              </a>
            </div>

            {/* Authority / Trust Proof Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0">
              <div className="p-3.5 rounded-2xl glass-card text-center">
                <div className="font-cinzel text-xl sm:text-2xl font-bold gold-gradient-text">
                  10+ Years
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                  Vedic Experience
                </p>
              </div>
              <div className="p-3.5 rounded-2xl glass-card text-center">
                <div className="font-cinzel text-xl sm:text-2xl font-bold purple-gradient-text">
                  15,000+
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                  Seekers Helped
                </p>
              </div>
              <div className="p-3.5 rounded-2xl glass-card text-center">
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-300 flex items-center justify-center gap-1">
                  4.96 <span className="text-sm">★</span>
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                  Verified Praise
                </p>
              </div>
              <div className="p-3.5 rounded-2xl glass-card text-center">
                <div className="font-cinzel text-xl sm:text-2xl font-bold text-emerald-400">
                  35+
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">
                  Countries Worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
