"use client";

import { useState } from "react";
import {
  Compass,
  Sparkles,
  Briefcase,
  Heart,
  PlaneTakeoff,
  Coins,
  Baby,
  Home,
  Gem,
  Activity,
  Calendar,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { consultationsCatalog, ConsultationItem } from "@/lib/data";

interface AllConsultationsProps {
  onOpenBooking: (title: string, mode: string, price: number) => void;
}

export default function AllConsultations({ onOpenBooking }: AllConsultationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "core" | "relationships" | "career" | "healing"
  >("all");

  // State mapping consultationId -> selectedTierIndex
  const [selectedTiers, setSelectedTiers] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    consultationsCatalog.forEach((c) => {
      // Complete chart default tier 1 (45 min call), others default tier 0
      initial[c.id] = c.id === "c2" ? 1 : 0;
    });
    return initial;
  });

  const filteredConsultations =
    selectedCategory === "all"
      ? consultationsCatalog
      : consultationsCatalog.filter((c) => c.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "Heart":
        return <Heart className="w-6 h-6" />;
      case "PlaneTakeoff":
        return <PlaneTakeoff className="w-6 h-6" />;
      case "Coins":
        return <Coins className="w-6 h-6" />;
      case "Baby":
        return <Baby className="w-6 h-6" />;
      case "Home":
        return <Home className="w-6 h-6" />;
      case "Gem":
        return <Gem className="w-6 h-6" />;
      case "Activity":
        return <Activity className="w-6 h-6" />;
      case "Calendar":
        return <Calendar className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleSelectTier = (consultationId: string, tierIndex: number) => {
    setSelectedTiers((prev) => ({
      ...prev,
      [consultationId]: tierIndex,
    }));
  };

  const handleBook = (item: ConsultationItem) => {
    const tierIndex = selectedTiers[item.id] ?? 0;
    const tier = item.tiers[tierIndex] || item.tiers[0];
    onOpenBooking(item.title, tier.mode, tier.price);
  };

  return (
    <section
      id="all-consultations"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-cosmic-950 relative overflow-hidden border-b border-celestial-gold/15"
    >
      {/* Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-900/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Astro Guidance Live Marquee Strip */}
        <div className="mb-6 rounded-2xl border border-celestial-gold/25 bg-gradient-to-r from-purple-950/60 via-cosmic-900/90 to-amber-950/60 p-3 sm:p-4 overflow-hidden relative shadow-lg">
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-celestial-gold text-cosmic-950 flex items-center gap-1.5 shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Astro Guidance</span>
            </span>
            <div className="overflow-hidden whitespace-nowrap w-full">
              <div className="inline-block animate-[marquee_28s_linear_infinite] text-xs font-medium text-amber-200 space-x-6">
                <span>✦ Shadi me rukawat hai?</span>
                <span>✦ Foreign PR me dikkat?</span>
                <span>✦ Paiso ki dikkat?</span>
                <span>✦ Pregnancy me dikkat?</span>
                <span>✦ Business ya Job Career me confusion?</span>
                <span>✦ Shadi me rukawat hai?</span>
                <span>✦ Foreign PR me dikkat?</span>
                <span>✦ Paiso ki dikkat?</span>
                <span>✦ Pregnancy me dikkat?</span>
                <span>✦ Business ya Job Career me confusion?</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-widest text-celestial-gold uppercase flex items-center justify-center gap-2 mb-2">
            <Compass className="w-4 h-4" />
            <span>Vedic Jyotish Consultation Registry</span>
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white mb-4">
            All 10 Specialized Consultations
          </h2>
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Select from our full catalog of consultations given on{" "}
            <span className="text-celestial-gold font-medium">astrohealer4u.in</span>. Every reading
            is personally conducted by <strong>Garima Verma</strong> with pure logical Vedic
            alignment and pragmatic remedies.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-celestial-gold text-cosmic-950 shadow-md font-bold"
                  : "glass-panel text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              All Consultations (10)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("core")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === "core"
                  ? "bg-celestial-gold text-cosmic-950 shadow-md font-bold"
                  : "glass-panel text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              Core Destiny & Kundli
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("relationships")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === "relationships"
                  ? "bg-celestial-gold text-cosmic-950 shadow-md font-bold"
                  : "glass-panel text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              Marriage & Family
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("career")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === "career"
                  ? "bg-celestial-gold text-cosmic-950 shadow-md font-bold"
                  : "glass-panel text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              Career, Foreign & Wealth
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("healing")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === "healing"
                  ? "bg-celestial-gold text-cosmic-950 shadow-md font-bold"
                  : "glass-panel text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              Vastu, Health & Crystals
            </button>
          </div>
        </div>

        {/* 10 Consultations Grid - Reference Centered Layout with Cosmic Theme Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultations.map((item) => {
            const currentTierIndex = selectedTiers[item.id] ?? 0;

            return (
              <div
                key={item.id}
                className={`glass-card rounded-3xl p-6 sm:p-7 border flex flex-col justify-between hover:border-celestial-gold/50 transition duration-300 relative group text-center ${
                  item.isPopular
                    ? "border-2 border-celestial-gold bg-gradient-to-b from-[#1c163b] to-[#0c081c] shadow-[0_0_30px_rgba(246,207,122,0.25)]"
                    : "border-white/15"
                }`}
              >
                {/* Ribbon on Top */}
                {item.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-cosmic-950 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    🔥 Most Popular & Recommended
                  </div>
                )}

                <div>
                  {/* Centered Icon Container */}
                  <div className={`w-14 h-14 rounded-2xl bg-cosmic-950/80 border border-celestial-gold/30 flex items-center justify-center text-celestial-gold mx-auto mb-3.5 shadow-[0_0_20px_rgba(246,207,122,0.12)] group-hover:scale-105 group-hover:border-celestial-gold transition ${item.isPopular ? "mt-2" : ""}`}>
                    {getIcon(item.iconName)}
                  </div>

                  {/* Centered Category Badge */}
                  <div className="mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border inline-block ${item.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Centered Title */}
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Centered Description */}
                  <p className="text-xs text-slate-300 mb-6 leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>

                  {/* Horizontal Side-by-Side Tiers (Reference Layout) */}
                  <div
                    className={`grid ${
                      item.tiers.length === 3 ? "grid-cols-3" : "grid-cols-2"
                    } gap-2 mb-6`}
                  >
                    {item.tiers.map((tier, idx) => {
                      const isSelected = currentTierIndex === idx;

                      let shortLabel = "CHAT";
                      if (tier.mode.includes("Chat")) shortLabel = "💬 CHAT";
                      else if (tier.mode.includes("Voice") || tier.mode.includes("Call"))
                        shortLabel = "📞 CALL";
                      else if (tier.mode.includes("Video")) shortLabel = "📹 VIDEO";
                      else if (tier.mode.includes("Audit")) shortLabel = "📐 AUDIT";
                      else shortLabel = "📄 REPORT";

                      return (
                        <button
                          key={tier.mode}
                          type="button"
                          onClick={() => handleSelectTier(item.id, idx)}
                          className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${
                            isSelected
                              ? "border-2 border-celestial-gold bg-celestial-gold/20 shadow-[0_0_15px_rgba(246,207,122,0.25)]"
                              : "border-white/10 bg-cosmic-950/60 hover:border-white/30"
                          }`}
                        >
                          <span className="text-[10px] text-slate-300 font-semibold whitespace-nowrap mb-0.5">
                            {shortLabel}
                          </span>
                          <span
                            className={`text-xs font-extrabold ${
                              isSelected ? "text-amber-300" : "text-emerald-400"
                            }`}
                          >
                            ₹{tier.price.toLocaleString("en-IN")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Full-width Book Consultation Button */}
                <button
                  type="button"
                  onClick={() => handleBook(item)}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    item.isPopular
                      ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-cosmic-950 shadow-lg hover:shadow-celestial-gold/50 hover:scale-[1.01]"
                      : "bg-cosmic-900 border border-celestial-gold/40 text-celestial-gold hover:bg-celestial-gold hover:text-cosmic-950"
                  }`}
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Fast Guidance Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-cinzel text-lg font-bold text-white">Need Help Choosing a Plan?</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Speak directly with Garima’s coordinator on WhatsApp to select your best custom
                consultation slot.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/919999999999?text=Hello%20Garima%20Ji%2C%20I%20have%20a%20question%20regarding%20astrohealer4U%20consultations"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold tracking-wider uppercase transition flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
