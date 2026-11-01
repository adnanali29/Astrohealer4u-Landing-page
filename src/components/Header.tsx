"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";

interface HeaderProps {
  onShowToast?: (msg: string) => void;
}

export default function Header({ onShowToast }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Banner */}
      <aside
        aria-label="Announcement"
        className="relative z-50 bg-gradient-to-r from-purple-950/80 via-amber-950/60 to-purple-950/80 border-b border-celestial-gold/20 py-2 px-4 text-xs tracking-wider text-center flex items-center justify-center gap-2"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-amber-200 font-medium">
          ✦ Garima Verma (10+ Years Experience • 15,000+ Seekers Helped) is accepting 1-on-1 Consultations
        </span>
        <a
          href="#hero-consultation-form"
          className="underline decoration-amber-400 font-bold hover:text-white transition ml-1"
        >
          Reserve Slot →
        </a>
      </aside>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-celestial-gold/15 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 flex-nowrap">
          {/* Logo & Brand Statement */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-amber-300 via-purple-500 to-cosmic-900 p-[1.5px] shadow-[0_0_15px_rgba(245,208,127,0.3)] group-hover:scale-105 transition-transform duration-300 shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-full bg-cosmic-950 flex items-center justify-center overflow-hidden">
                <Image
                  src="/icon.png"
                  alt="AstroHealer4U Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="whitespace-nowrap">
              <div className="font-cinzel font-bold text-lg sm:text-xl md:text-2xl tracking-wider text-white flex items-center gap-1">
                ASTROHEALER <span className="text-celestial-gold font-cinzelDeco">4U</span>
              </div>
              <p className="text-[9px] sm:text-[10px] tracking-widest text-slate-300 uppercase -mt-0.5 font-medium font-cinzel">
                ONLY I KNOW WHAT YOU ARE HIDING 💫
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Single Line, White Colour Text */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium tracking-wide whitespace-nowrap flex-nowrap">
            <a
              href="#about"
              className="text-white hover:text-celestial-gold transition whitespace-nowrap"
            >
              About Garima
            </a>
            <a
              href="#all-consultations"
              className="text-white hover:text-celestial-gold transition whitespace-nowrap"
            >
              Consultations
            </a>
            <a
              href="#zodiac"
              className="text-white hover:text-celestial-gold transition whitespace-nowrap"
            >
              Zodiac
            </a>
            <a
              href="#blueprint"
              className="text-white hover:text-celestial-gold transition whitespace-nowrap"
            >
              Kundli
            </a>
            <a
              href="#shop"
              className="text-white hover:text-celestial-gold transition whitespace-nowrap"
            >
              Apothecary
            </a>
          </nav>

          {/* Action Hub - Book Reading CTA Button (Sound toggle removed per user request) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-nowrap">
            {/* Book Reading CTA Button - Scrolls smoothly to hero consultation form */}
            <a
              href="#hero-consultation-form"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-cosmic-950 font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(246,207,122,0.4)] hover:shadow-[0_0_30px_rgba(246,207,122,0.7)] hover:scale-[1.02] transition-all whitespace-nowrap shrink-0"
            >
              <span>Book Reading</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-celestial-gold cursor-pointer"
              aria-label="Toggle Navigation Hamburger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (Hamburger) */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-panel border-t border-celestial-gold/15 px-6 py-6 space-y-4">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-white hover:text-celestial-gold"
            >
              About Garima
            </a>
            <a
              href="#all-consultations"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-white hover:text-celestial-gold"
            >
              Consultations (10)
            </a>
            <a
              href="#zodiac"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-white hover:text-celestial-gold"
            >
              Zodiac
            </a>
            <a
              href="#blueprint"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-white hover:text-celestial-gold"
            >
              Kundli
            </a>
            <a
              href="#shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-white hover:text-celestial-gold"
            >
              Apothecary
            </a>

            <div className="pt-2">
              <a
                href="#hero-consultation-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-cosmic-950 font-extrabold text-sm tracking-wide shadow-lg uppercase"
              >
                Book Reading
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
