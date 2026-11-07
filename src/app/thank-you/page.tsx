"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Starfield from "@/components/Starfield";
import {
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [bookingId, setBookingId] = useState<string>("AH4U-01");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const idFromUrl =
      searchParams.get("booking_id") ||
      searchParams.get("bookingId") ||
      searchParams.get("id");

    if (idFromUrl) {
      setBookingId(idFromUrl);
    } else {
      try {
        const stored = sessionStorage.getItem("astro_booking");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.id) setBookingId(parsed.id);
        }
      } catch {
        // ignore
      }
    }

    // Fire Meta (Facebook) Pixel Lead Event with Booking ID
    if (typeof window !== "undefined") {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof w.fbq === "function") {
        w.fbq("track", "Lead", {
          content_name: "Astro Consultation Booking",
          booking_id: idFromUrl || "AH4U-01",
          currency: "INR",
        });
      }
    }
  }, [searchParams]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste Garima Ji, I have just booked my consultation on AstroHealer4U. My Booking ID is ${bookingId}. Please confirm my appointment timing.`
  );

  return (
    <div className="max-w-2xl w-full glass-card rounded-3xl p-6 sm:p-10 border border-celestial-gold/30 text-center relative shadow-[0_0_50px_rgba(246,207,122,0.15)]">
      {/* Glowing Checkmark */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-lg animate-pulse">
        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 inline-block mb-3">
        ✦ Consultation Confirmed ✦
      </span>

      <h1 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
        Thank You! Your Consultation Has Been Booked
      </h1>

      {/* Prominent Sequential Booking ID */}
      <div className="my-5 p-3.5 sm:p-4 rounded-2xl bg-cosmic-950/90 border border-amber-400/40 inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mx-auto shadow-md">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
          Your Booking Reference ID:
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg sm:text-xl font-bold text-amber-300 tracking-wider">
            {bookingId}
          </span>
          <button
            type="button"
            onClick={handleCopyId}
            title="Copy Booking ID"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-6">
        Your consultation request and contact details have been securely received.{" "}
        <span className="text-amber-200 font-semibold">
          Our team will get back to you in sometime
        </span>{" "}
        via WhatsApp / phone to confirm your final slot.
      </p>

      {/* Website Link Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/50 via-cosmic-900/90 to-amber-950/50 border border-slate-800 mb-6">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-2 font-medium">
          In the meantime, please visit our website
        </p>
        <a
          href="https://www.astrohealer4u.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-cosmic-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
        >
          <span>Visit www.astrohealer4u.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 text-xs">
        <a
          href={`https://wa.me/919999999999?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-semibold transition flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Priority WhatsApp Connect</span>
        </a>
        <Link
          href="/"
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold border border-slate-700 transition flex items-center justify-center gap-2"
        >
          <span>Return to Landing Page</span>
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="relative min-h-screen bg-cosmic-950 text-slate-200 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Background Starfield */}
      <Starfield />

      {/* Header Bar */}
      <header className="relative z-20 w-full glass-panel border-b border-celestial-gold/15 py-4 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 via-purple-500 to-cosmic-900 p-[1px] overflow-hidden">
            <div className="w-full h-full rounded-full bg-cosmic-950 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          </div>
          <span className="font-cinzel font-bold text-lg tracking-wider text-white">
            astrohealer<span className="text-amber-300 font-cinzelDeco">4U</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-amber-300 transition font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content with Suspense */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:py-20">
        <Suspense
          fallback={
            <div className="text-amber-300 text-sm animate-pulse">
              Loading confirmation...
            </div>
          }
        >
          <ThankYouContent />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-5 text-center text-xs text-slate-500 border-t border-slate-800">
        <p>© {new Date().getFullYear()} AstroHealer4U • Master Astrologer Garima Verma</p>
      </footer>
    </div>
  );
}
