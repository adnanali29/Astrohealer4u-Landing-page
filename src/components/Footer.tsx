import Link from "next/link";
import { Sparkles, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cosmic-950 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-celestial-gold/20 flex items-center justify-center text-celestial-gold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-cinzel text-lg font-bold text-white">
              astrohealer<span className="text-celestial-gold font-cinzelDeco">4U</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Guided by Master Vedic Astrologer & Tarot Reader <strong>Garima Verma</strong>. Decoding
            soul contracts, karma, and cosmic timing across 35+ countries.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Official WhatsApp Desk</span>
            </a>
          </div>
        </div>

        {/* Consultations Column */}
        <div>
          <h4 className="font-cinzel text-white font-bold mb-4 uppercase tracking-wider text-xs">
            Consultations
          </h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <a href="#all-consultations" className="hover:text-celestial-gold transition">
                Complete Chart Analysis
              </a>
            </li>
            <li>
              <a href="#all-consultations" className="hover:text-celestial-gold transition">
                Career & Business Blueprint
              </a>
            </li>
            <li>
              <a href="#all-consultations" className="hover:text-celestial-gold transition">
                Marriage & Relationship Milan
              </a>
            </li>
            <li>
              <a href="#all-consultations" className="hover:text-celestial-gold transition">
                Foreign PR & Relocation
              </a>
            </li>
            <li>
              <a href="#all-consultations" className="hover:text-celestial-gold transition">
                Wealth & Lakshmi Alignment
              </a>
            </li>
          </ul>
        </div>

        {/* Free Cosmic Engines */}
        <div>
          <h4 className="font-cinzel text-white font-bold mb-4 uppercase tracking-wider text-xs">
            Cosmic Engines
          </h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <a href="#zodiac" className="hover:text-celestial-gold transition">
                Zodiac Transit Radar
              </a>
            </li>
            <li>
              <a href="#blueprint" className="hover:text-celestial-gold transition">
                Procedural Kundli Matrix
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-celestial-gold transition">
                Sacred Apothecary
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-celestial-gold transition">
                About Garima Verma
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Hours */}
        <div>
          <h4 className="font-cinzel text-white font-bold mb-4 uppercase tracking-wider text-xs">
            Direct Sanctum
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Sessions scheduled strictly by prior appointment across IST, GMT, EST, and PST time zones.
          </p>
          <div className="text-[11px] text-slate-300 space-y-1">
            <p>✦ Monday – Saturday: 10:00 AM – 7:30 PM IST</p>
            <p>✦ Sunday: Reserved for Sacred Havan & Yantras</p>
            <p className="pt-2 text-amber-300 font-medium">Email: contact@astrohealer4u.in</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
        <p className="text-slate-500">
          © 2026 astrohealer4U. All Rights Reserved. Curated with devotion for seekers globally.
        </p>
        <div className="flex items-center gap-6 text-slate-500">
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline">
            Terms of Consultation
          </Link>
          <Link href="#" className="hover:underline">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}

