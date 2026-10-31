"use client";

import { useState } from "react";
import { Sparkles, Star } from "lucide-react";

interface Review {
  name: string;
  sign: string;
  initial: string;
  quote: string;
  category?: string;
}

const clientReviews: Review[] = [
  {
    name: "Amit Sharma",
    sign: "Aries",
    initial: "A",
    quote: "Stunning chart reading. Predicted my promotion timeline exactly.",
  },
  {
    name: "Sarah Jenkins",
    sign: "Leo",
    initial: "S",
    quote: "The Pyrite bracelet is gorgeous. Favour and fortune followed immediately!",
  },
  {
    name: "Priya Patel",
    sign: "Virgo",
    initial: "P",
    quote: "Detailed Vastu analysis of my home changed the entire family vibe.",
  },
  {
    name: "Michael Vance",
    sign: "Libra",
    initial: "M",
    quote: "Accurate career transit calculations. Cleared all my doubts about the launch.",
  },
  {
    name: "Swati Iyer",
    sign: "Pisces",
    initial: "S",
    quote: "Highly professional Vedic consultation. Non-judgmental and very logical remedies.",
  },
  {
    name: "David Miller",
    sign: "Sagittarius",
    initial: "D",
    quote: "Very logical approach to Vedic charts. No fear-mongering.",
  },
  {
    name: "Vikram Singh",
    sign: "Capricorn",
    initial: "V",
    quote: "Solid Vastu consulting. Home entrance alignment corrected.",
  },
  {
    name: "Dev Bajwa",
    sign: "Leo",
    initial: "D",
    quote: "Detailed marriage compatibility matching. Recommended.",
  },
  {
    name: "Emma Watson",
    sign: "Gemini",
    initial: "E",
    quote: "Loved the Amethyst tree. Very peaceful vibe in my study room.",
  },
  {
    name: "Sunita Rao",
    sign: "Cancer",
    initial: "S",
    quote: "Aura cleansing advice was useful. Highly recommend.",
  },
  {
    name: "Ananya Das",
    sign: "Aquarius",
    initial: "A",
    quote: "Liked the Gomti Chakra Rakhi. Very fast shipping too.",
  },
  {
    name: "Rajesh Kumar",
    sign: "Leo",
    initial: "R",
    quote: "Helped me plan my relocation timings correctly.",
  },
  {
    name: "Emily Rose",
    sign: "Virgo",
    initial: "E",
    quote: "Beautiful self confidence bracelet. Feels energetic.",
  },
  {
    name: "Gaurav Sen",
    sign: "Pisces",
    initial: "G",
    quote: "Clean, direct readings. Appreciate the logical approach.",
  },
  {
    name: "Meera Bai",
    sign: "Sagittarius",
    initial: "M",
    quote: "The Dhan Yog bracelet looks stunning and feels great.",
  },
  {
    name: "Pooja Bhatia",
    sign: "Virgo",
    initial: "P",
    quote: "Beautiful packaging of crystal relics. High vibration.",
  },
  {
    name: "Alok Nath",
    sign: "Libra",
    initial: "A",
    quote: "Peaceful remedies. Grounding guidance.",
  },
  {
    name: "Ritu Phogat",
    sign: "Scorpio",
    initial: "R",
    quote: "Excellent gemstones recommendations. Feeling more focused.",
  },
  {
    name: "Shruti Hegde",
    sign: "Aries",
    initial: "S",
    quote: "Prompt chat consultation. Cleared my job doubts.",
  },
  {
    name: "Deepak Joshi",
    sign: "Sagittarius",
    initial: "D",
    quote: "Appreciated the detailed breakdown of houses and yogas.",
  },
  {
    name: "Alexander Grey",
    sign: "Gemini",
    initial: "A",
    quote: "Professional support. Quick query response on WhatsApp.",
  },
  {
    name: "Sanjay Dutt",
    sign: "Capricorn",
    initial: "S",
    quote: "Vastu advice resolved long-standing family arguments.",
  },
  {
    name: "Manish Pandey",
    sign: "Aquarius",
    initial: "M",
    quote: "Logical Kundli analysis. Good explanations.",
  },
  {
    name: "Kavita Nair",
    sign: "Libra",
    initial: "K",
    quote: "Satisfactory chart overview. Precise remedies suggested.",
  },
];

// Split into two balanced tracks for seamless marquee animation
const track1 = clientReviews.slice(0, 12);
const track2 = clientReviews.slice(12);

export default function Testimonials() {
  const [filterSign, setFilterSign] = useState<string>("ALL");

  const signs = ["ALL", "Aries", "Leo", "Virgo", "Libra", "Pisces", "Sagittarius", "Capricorn"];

  const filtered = filterSign === "ALL"
    ? clientReviews
    : clientReviews.filter((r) => r.sign.toLowerCase() === filterSign.toLowerCase());

  return (
    <section id="reviews" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-cosmic-950/80">
      {/* Background Soft Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header matching astrohealer4u.in */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>✦ Aligned Client Experiences ✦</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Reviews &amp; Cosmic Testimonies
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Real feedback from verified clients locally and globally. Hover over cards to pause autoscrolling.
          </p>

          {/* Quick Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-3">
            {signs.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterSign(s)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition cursor-pointer ${
                  filterSign === s
                    ? "bg-amber-400/20 border border-amber-400/50 text-amber-200"
                    : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filterSign !== "ALL" ? (
          /* Static filtered view */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filtered.map((r, i) => (
              <div
                key={i}
                className="bg-cosmic-900/90 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-5 transition shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-purple-300 font-bold uppercase font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                      {r.sign}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed italic">
                    “{r.quote}”
                  </p>
                </div>
                <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-slate-800/80">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-900/80 to-amber-900/80 border border-amber-400/30 flex items-center justify-center text-xs font-bold text-amber-200">
                    {r.initial}
                  </div>
                  <span className="text-xs font-semibold text-white">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Marquee View with Hover Pause */
          <div className="space-y-4 pause-hover relative select-none">
            {/* Left & Right Soft Blur Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-cosmic-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-cosmic-950 to-transparent z-10 pointer-events-none" />

            {/* Row 1: Left to Right marquee */}
            <div className="overflow-hidden">
              <div className="animate-marquee flex gap-4 py-1">
                {[...track1, ...track1].map((r, i) => (
                  <div
                    key={`r1-${i}`}
                    className="w-[280px] sm:w-[320px] shrink-0 bg-cosmic-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-4.5 sm:p-5 transition shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-purple-300 font-bold uppercase font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                          {r.sign}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs font-light leading-relaxed italic">
                        “{r.quote}”
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-slate-800/80">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-900/80 to-amber-900/80 border border-amber-400/30 flex items-center justify-center text-[11px] font-bold text-amber-200">
                        {r.initial}
                      </div>
                      <span className="text-xs font-medium text-white">{r.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Right to Left marquee */}
            <div className="overflow-hidden">
              <div className="animate-marquee-reverse flex gap-4 py-1">
                {[...track2, ...track2].map((r, i) => (
                  <div
                    key={`r2-${i}`}
                    className="w-[280px] sm:w-[320px] shrink-0 bg-cosmic-900/90 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-4.5 sm:p-5 transition shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-purple-300 font-bold uppercase font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                          {r.sign}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs font-light leading-relaxed italic">
                        “{r.quote}”
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-slate-800/80">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-900/80 to-amber-900/80 border border-amber-400/30 flex items-center justify-center text-[11px] font-bold text-amber-200">
                        {r.initial}
                      </div>
                      <span className="text-xs font-medium text-white">{r.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
