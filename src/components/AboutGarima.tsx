import Image from "next/image";
import { ShieldCheck, Check, ArrowRight } from "lucide-react";

export default function AboutGarima() {
  return (
    <section id="about" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual Column - Real Portrait of Garima Verma */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-72 sm:w-80 h-96 sm:h-[440px] rounded-3xl p-1 bg-gradient-to-b from-celestial-gold via-purple-600/60 to-transparent shadow-[0_0_40px_rgba(246,207,122,0.2)]">
            <div className="w-full h-full rounded-[22px] bg-cosmic-900 overflow-hidden relative group">
              {/* Image 4 Photo */}
              <Image
                src="/garima-verma.jpg"
                alt="Garima Verma"
                fill
                priority
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />

              {/* Name Overlay Only */}
              <div className="absolute inset-x-0 bottom-0 pt-16 pb-5 px-4 bg-gradient-to-t from-cosmic-950 via-cosmic-950/70 to-transparent flex items-center justify-center text-center">
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wider drop-shadow-md">
                  Garima Verma
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-celestial-amethyst text-xs uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The AstroHealer Philosophy • 10+ Years Experience</span>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            A Sanctuary Free from Fear, Guilt, &amp; Expensive Superstitions
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            With <strong>over 10+ years of dedicated practice</strong> in classical Vedic astrology and cosmic energy healing, Master Astrologer <strong>Garima Verma</strong> has helped more than <strong>15,000+ seekers, professionals, and families</strong> navigate critical turning points in their lives.
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Most people leave traditional astrologers feeling terrified of Saturn’s Sade Sati, Rahu Mahadasha, or Manglik doshas. At <strong>astrohealer4U</strong>, we dismantle that terror. Astrology is mathematical cosmic resonance, psychological insight, and energy mechanics—never a tool for manipulation or fear.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2.5 py-1">
            <div className="p-3 rounded-2xl glass-card border border-celestial-gold/20 text-center">
              <div className="font-cinzel text-lg sm:text-xl font-bold text-amber-300">10+ Years</div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Vedic Experience</p>
            </div>
            <div className="p-3 rounded-2xl glass-card border border-purple-500/20 text-center">
              <div className="font-cinzel text-lg sm:text-xl font-bold text-purple-300">15,000+</div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Seekers Helped</p>
            </div>
            <div className="p-3 rounded-2xl glass-card border border-emerald-500/20 text-center">
              <div className="font-cinzel text-lg sm:text-xl font-bold text-emerald-300">35+</div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Global Countries</p>
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-celestial-gold/10 border border-celestial-gold/40 flex items-center justify-center text-celestial-gold shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Empirical Parashara &amp; KP Systems</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  10+ years perfecting multi-layered dasha transit calculations and birth-time rectifications without vague guesses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-celestial-gold/10 border border-celestial-gold/40 flex items-center justify-center text-celestial-gold shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Pragmatic, Cost-Effective Remedies</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Sound mantra resonance, behavioral adjustments, planetary gemstones, and verified crystal alignments—zero superstitious rituals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-celestial-gold/10 border border-celestial-gold/40 flex items-center justify-center text-celestial-gold shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Compassionate &amp; 100% Confidential Support</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Every reading is held in strict privacy, helping you find genuine peace, confidence, and direction.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 flex items-center gap-4 flex-wrap">
            <a
              href="#all-consultations"
              className="px-6 py-3 rounded-full bg-celestial-gold text-cosmic-950 font-bold text-xs uppercase tracking-wider hover:bg-yellow-300 transition shadow-lg"
            >
              Consult With Garima Verma
            </a>
            <a
              href="#blueprint"
              className="text-xs uppercase tracking-wider text-slate-400 hover:text-white transition flex items-center gap-1 font-semibold"
            >
              <span>Explore Natal Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
