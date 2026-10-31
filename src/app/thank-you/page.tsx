import Link from "next/link";
import Starfield from "@/components/Starfield";
import { CheckCircle2, Sparkles, ExternalLink, ArrowLeft, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Thank You — astrohealer4U",
  description: "Your consultation has been booked. Our team will get back to you shortly.",
};

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-cosmic-950 text-slate-200 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Background Starfield */}
      <Starfield />

      {/* Header Bar */}
      <header className="relative z-20 w-full glass-panel border-b border-celestial-gold/15 py-4 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-celestial-gold via-celestial-purple to-cosmic-900 p-[1.5px]">
            <div className="w-full h-full rounded-full bg-cosmic-950 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-celestial-gold animate-pulse" />
            </div>
          </div>
          <span className="font-cinzel font-bold text-lg tracking-wider text-white">
            astrohealer<span className="text-celestial-gold font-cinzelDeco">4U</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-celestial-gold transition font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl w-full glass-card rounded-3xl p-8 sm:p-12 border-2 border-celestial-gold/40 text-center relative shadow-[0_0_50px_rgba(246,207,122,0.18)]">
          {/* Glowing Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(52,211,153,0.35)] animate-pulse">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-celestial-gold px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 inline-block mb-3">
            ✦ Consultation Reserved ✦
          </span>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Thank You! Your Consultation Has Been Booked
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8">
            Your birth coordinates and preferred appointment timing have been securely received.{" "}
            <span className="text-amber-300 font-semibold">
              Our team will get back to you in sometime
            </span>{" "}
            via WhatsApp / phone to confirm your final slot and intake details.
          </p>

          {/* Website Link Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 via-cosmic-900/90 to-amber-950/60 border border-celestial-gold/30 mb-8">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">
              In the meantime, please explore our official sanctum
            </p>
            <a
              href="https://www.astrohealer4u.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-cosmic-950 font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(243,201,106,0.4)] hover:shadow-[0_0_35px_rgba(243,201,106,0.7)] hover:scale-105 transition-all"
            >
              <span>Visit www.astrohealer4u.in</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-xs">
            <a
              href="https://wa.me/919999999999?text=Hello%20Garima%20Ji%2C%20I%20just%20submitted%20my%20consultation%20booking%20on%20astrohealer4U."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Priority WhatsApp Inquiry</span>
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl glass-panel border border-white/20 text-slate-300 hover:text-white font-semibold transition flex items-center justify-center gap-2"
            >
              <span>Return to Landing Page</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-6 text-center text-xs text-slate-500 border-t border-white/10">
        © 2026 astrohealer4U. All Rights Reserved. Curated with devotion for seekers globally.
      </footer>
    </div>
  );
}

