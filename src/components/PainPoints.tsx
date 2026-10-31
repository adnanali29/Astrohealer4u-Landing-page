import { Key, HeartCrack, PlaneTakeoff, Coins } from "lucide-react";

export default function PainPoints() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-cosmic-900/40 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-celestial-gold mb-3 flex items-center justify-center gap-2">
            <Key className="w-4 h-4" />
            <span>Unearthing What Remains Unspoken</span>
          </h2>
          <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-4">
            Are These Invisible Walls Blocking Your Destiny?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Astrology at astrohealer4U is not about fatalistic fortune-telling. It is about
            diagnosing where energetic friction is suffocating your potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl glass-card relative group hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-celestial-gold mb-6 group-hover:scale-110 transition">
              <HeartCrack className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-xl font-bold text-white mb-2">
              Shadi Me Rukawat Ya Delay?
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Stuck in endless match-making dilemmas, repetitive breakups, or sudden marital
              turbulence? We analyze your 7th house, Shukra & Mangal aspects to reveal precise timing
              and clear remedies.
            </p>
            <a
              href="#all-consultations"
              className="text-xs font-semibold text-celestial-gold flex items-center gap-1 group-hover:translate-x-1 transition"
            >
              Marriage & Matchmaking Consultations →
            </a>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl glass-card relative group hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-celestial-amethyst mb-6 group-hover:scale-110 transition">
              <PlaneTakeoff className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-xl font-bold text-white mb-2">
              Foreign PR Ya Career Stagnation?
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Visa delays, constant job switches without growth, or feeling underpaid despite
              extraordinary effort? Your 9th and 12th houses hold the coordinates for cross-border
              success.
            </p>
            <a
              href="#all-consultations"
              className="text-xs font-semibold text-celestial-amethyst flex items-center gap-1 group-hover:translate-x-1 transition"
            >
              Career & Relocation Blueprint →
            </a>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl glass-card relative group hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition">
              <Coins className="w-6 h-6" />
            </div>
            <h4 className="font-cinzel text-xl font-bold text-white mb-2">
              Sudden Losses & 8th House Karmas
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Unexplained financial drainage, generational ancestral blocks (Pitru Dosha), or
              emotional shadows you share with no one? We unlock the esoteric mysteries holding your
              wealth back.
            </p>
            <a
              href="#all-consultations"
              className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition"
            >
              Karmic Cleansing & Remedies →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

