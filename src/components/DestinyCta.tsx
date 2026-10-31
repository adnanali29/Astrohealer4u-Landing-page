import { Sparkles } from "lucide-react";

export default function DestinyCta() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-950 via-cosmic-900 to-amber-950 border-t border-celestial-gold/20 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        <h3 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white">
          Step Into Your Destiny With Absolute Clarity
        </h3>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Stop guessing in darkness. Your karmic blueprints, ancestral debts, and breakthrough timing
          are mapped in the stars.
        </p>
        <div className="pt-2">
          <a
            href="#hero-consultation-form"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-celestial-gold text-cosmic-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(243,201,106,0.6)] hover:scale-105 transition"
          >
            <Sparkles className="w-4 h-4 text-cosmic-950" />
            <span>Reserve 1-on-1 Natal Session</span>
          </a>
        </div>
      </div>
    </section>
  );
}

