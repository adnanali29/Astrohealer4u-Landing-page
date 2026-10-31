"use client";

import { useState } from "react";
import { Briefcase, Sparkles, Heart, Check, ArrowRight } from "lucide-react";

interface FeaturedConsultationsProps {
  onOpenBooking: (title: string, mode: string, price: number) => void;
}

export default function FeaturedConsultations({ onOpenBooking }: FeaturedConsultationsProps) {
  const [careerMode, setCareerMode] = useState<{ mode: string; price: number }>({
    mode: "Detailed Chat Session",
    price: 2100,
  });

  const [completeMode, setCompleteMode] = useState<{ mode: string; price: number }>({
    mode: "Priority Voice Call (45 min)",
    price: 5100,
  });

  const [marriageMode, setMarriageMode] = useState<{ mode: string; price: number }>({
    mode: "Detailed Chat Session",
    price: 2100,
  });

  return (
    <section id="consultations" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-widest text-celestial-gold uppercase">
            ✦ Honest 1-on-1 Guidance ✦
          </span>
          <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-1 mb-3">
            Vedic Jyotish Consultation Services
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            No automated computer-generated reports. Every reading is personally calibrated by{" "}
            <strong>Garima Verma</strong> with custom remedies and real-time guidance.
          </p>
        </div>

        {/* Pricing Matrix (3 Core Offerings) - Centered Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: Career Consultation */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between hover:border-celestial-gold/50 transition text-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cosmic-950/80 border border-purple-500/30 flex items-center justify-center text-celestial-amethyst mx-auto mb-3 shadow-[0_0_20px_rgba(171,87,247,0.15)]">
                <Briefcase className="w-6 h-6 text-celestial-gold" />
              </div>

              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-celestial-purple px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 inline-block">
                  Career & PR
                </span>
              </div>

              <h4 className="font-cinzel text-xl font-bold text-white mb-2">
                Career & Business Blueprint
              </h4>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed max-w-xs mx-auto">
                Job stagnation, corporate politics, promotions, ideal business timing, and foreign
                relocation / PR prospects.
              </p>

              {/* Horizontal Tier Selectors */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() =>
                    setCareerMode({ mode: "Detailed Chat Session", price: 2100 })
                  }
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                    careerMode.price === 2100
                      ? "border-2 border-celestial-gold bg-celestial-gold/20 shadow-[0_0_15px_rgba(246,207,122,0.25)]"
                      : "border-white/10 bg-cosmic-950/60 hover:border-white/30"
                  }`}
                >
                  <span className="text-[10px] text-slate-300 font-semibold mb-0.5">💬 CHAT</span>
                  <span
                    className={`text-xs font-extrabold ${
                      careerMode.price === 2100 ? "text-amber-300" : "text-emerald-400"
                    }`}
                  >
                    ₹2,100
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCareerMode({ mode: "Direct Voice Call (30 min)", price: 3100 })
                  }
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                    careerMode.price === 3100
                      ? "border-2 border-celestial-gold bg-celestial-gold/20 shadow-[0_0_15px_rgba(246,207,122,0.25)]"
                      : "border-white/10 bg-cosmic-950/60 hover:border-white/30"
                  }`}
                >
                  <span className="text-[10px] text-slate-300 font-semibold mb-0.5">📞 CALL</span>
                  <span
                    className={`text-xs font-extrabold ${
                      careerMode.price === 3100 ? "text-amber-300" : "text-emerald-400"
                    }`}
                  >
                    ₹3,100
                  </span>
                </button>
              </div>

              <ul className="text-xs text-slate-300 space-y-2 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-celestial-gold shrink-0" /> Exact timing of job switches
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-celestial-gold shrink-0" /> Foreign settlement check
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-celestial-gold shrink-0" /> Safe gemstone & mantra
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenBooking(
                  "Career & Business Blueprint",
                  careerMode.mode,
                  careerMode.price
                )
              }
              className="w-full py-3.5 rounded-xl bg-cosmic-900 border border-celestial-gold/40 text-celestial-gold font-bold text-xs uppercase tracking-wider hover:bg-celestial-gold hover:text-cosmic-950 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Career Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 2: Complete Kundli Analysis (FEATURED) */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-celestial-gold relative flex flex-col justify-between shadow-[0_0_35px_rgba(243,201,106,0.25)] md:scale-105 z-10 bg-gradient-to-b from-[#1c163b] to-[#0c081c] text-center">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-cosmic-950 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
              🔥 Most Popular & Recommended
            </div>

            <div>
              <div className="w-16 h-16 rounded-2xl bg-cosmic-950 border border-celestial-gold/50 flex items-center justify-center text-amber-300 mx-auto mb-3 shadow-[0_0_20px_rgba(246,207,122,0.25)] mt-2">
                <Sparkles className="w-7 h-7 text-amber-300 animate-bounce" />
              </div>

              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 inline-block">
                  Full Life Matrix
                </span>
              </div>

              <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-2">
                Complete Chart Analysis
              </h4>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed max-w-xs mx-auto">
                Exhaustive study of all 12 houses, active Mahadashas, planetary yogas, 8th house
                karmas & lifetime roadmap.
              </p>

              {/* Horizontal Tier Selectors (3 Pills) */}
              <div className="grid grid-cols-3 gap-1.5 mb-6">
                <button
                  type="button"
                  onClick={() =>
                    setCompleteMode({ mode: "Comprehensive Chat", price: 3100 })
                  }
                  className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                    completeMode.price === 3100
                      ? "border-2 border-celestial-gold bg-celestial-gold/20 shadow-[0_0_15px_rgba(246,207,122,0.25)]"
                      : "border-white/10 bg-cosmic-950/60 hover:border-white/30"
                  }`}
                >
                  <span className="text-[10px] text-slate-300 font-semibold mb-0.5">💬 CHAT</span>
                  <span
                    className={`text-xs font-extrabold ${
                      completeMode.price === 3100 ? "text-amber-300" : "text-emerald-400"
                    }`}
                  >
                    ₹3,100
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCompleteMode({
                      mode: "Priority Voice Call (45 min)",
                      price: 5100,
                    })
                  }
                  className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                    completeMode.price === 5100
                      ? "border-2 border-celestial-gold bg-celestial-gold/20 shadow-[0_0_15px_rgba(246,207,122,0.25)]"
                      : "border-white/10 bg-cosmic-950/60 hover:border-white/30"
                  }`}
                >
                  <span className="text-[10px] text-slate-300 font-semibold mb-0.5">📞 CALL</span>
                  <span
                    className={`text-xs font-extrabold ${
                      completeMode.price === 5100 ? "text-amber-300" : "text-emerald-400"
                    }`}
                  >
                    ₹5,100
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCompleteMode({
                      mode: "1-on-1 Live Video (60 min)",
                      price: 7100,
                    })
                  }
                  className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                    completeMode.price === 7100
                      ? "border-2 border-celestial-gold bg-celestial-gold/20 shadow-[0_0_15px_rgba(246,207,122,0.25)]"
                      : "border-white/10 bg-cosmic-950/60 hover:border-white/30"
                  }`}
                >
                  <span className="text-[10px] text-slate-300 font-semibold mb-0.5">📹 VIDEO</span>
                  <span
                    className={`text-xs font-extrabold ${
                      completeMode.price === 7100 ? "text-amber-300" : "text-emerald-400"
                    }`}
                  >
                    ₹7,100
                  </span>
                </button>
              </div>

              <ul className="text-xs text-slate-300 space-y-2 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" /> Lifetime Dasha & Gochar transit map
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" /> Marriage, Career & Wealth synthesis
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" /> Direct personalized remedy plan
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenBooking(
                  "Complete Chart Analysis",
                  completeMode.mode,
                  completeMode.price
                )
              }
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-cosmic-950 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-celestial-gold/50 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Complete Chart Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service 3: Marriage & Compatibility */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between hover:border-celestial-gold/50 transition text-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cosmic-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                <Heart className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 inline-block">
                  Marriage & Love
                </span>
              </div>

              <h4 className="font-cinzel text-xl font-bold text-white mb-2">
                Marriage & Relationship Milan
              </h4>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed max-w-xs mx-auto">
                Find the right match, resolve marriage delay, analyze Ashtakoot Guna Milan, and resolve
                emotional incompatibilities.
              </p>

              {/* Horizontal Tier Selectors */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() =>
                    setMarriageMode({ mode: "Detailed Chat Session", price: 2100 })
                  }
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                    marriageMode.price === 2100
                      ? "border-2 border-celestial-gold bg-celestial-gold/20 shadow-[0_0_15px_rgba(246,207,122,0.25)]"
                      : "border-white/10 bg-cosmic-950/60 hover:border-white/30"
                  }`}
                >
                  <span className="text-[10px] text-slate-300 font-semibold mb-0.5">💬 CHAT</span>
                  <span
                    className={`text-xs font-extrabold ${
                      marriageMode.price === 2100 ? "text-amber-300" : "text-emerald-400"
                    }`}
                  >
                    ₹2,100
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMarriageMode({
                      mode: "Direct Voice Call (30 min)",
                      price: 3100,
                    })
                  }
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                    marriageMode.price === 3100
                      ? "border-2 border-celestial-gold bg-celestial-gold/20 shadow-[0_0_15px_rgba(246,207,122,0.25)]"
                      : "border-white/10 bg-cosmic-950/60 hover:border-white/30"
                  }`}
                >
                  <span className="text-[10px] text-slate-300 font-semibold mb-0.5">📞 CALL</span>
                  <span
                    className={`text-xs font-extrabold ${
                      marriageMode.price === 3100 ? "text-amber-300" : "text-emerald-400"
                    }`}
                  >
                    ₹3,100
                  </span>
                </button>
              </div>

              <ul className="text-xs text-slate-300 space-y-2 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 36 Guna Milan & Manglik dosha check
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Deep psychological compatibility matrix
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Remedies for family consent & peace
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpenBooking(
                  "Marriage & Relationship Milan",
                  marriageMode.mode,
                  marriageMode.price
                )
              }
              className="w-full py-3.5 rounded-xl bg-cosmic-900 border border-celestial-gold/40 text-celestial-gold font-bold text-xs uppercase tracking-wider hover:bg-celestial-gold hover:text-cosmic-950 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Marriage Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
