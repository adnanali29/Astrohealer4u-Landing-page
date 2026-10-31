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
            <span>The AstroHealer Philosophy</span>
          </div>

          <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            A Sanctuary Free from Fear, Guilt, & Expensive Superstitions
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Most people leave traditional astrologers feeling terrified of Saturn’s Sade Sati or
            Manglik doshas. At <strong>astrohealer4U</strong>, we dismantle that terror. Astrology
            is mathematical cosmic resonance, psychological insight, and energy mechanics.
          </p>

          <div className="space-y-3.5 pt-1">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-celestial-gold/10 border border-celestial-gold/40 flex items-center justify-center text-celestial-gold shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Empirical Parashara & KP Systems</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Deep multi-layered dasha transit calculations without vague guesses.
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
                  Mantra resonance, behavioral adjustments, color alignments, and certified natural
                  crystals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-celestial-gold/10 border border-celestial-gold/40 flex items-center justify-center text-celestial-gold shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Complete Confidentiality Guaranteed</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Your deepest vulnerabilities, career secrets, and marital challenges remain 100%
                  private.
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
