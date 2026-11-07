"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";
import { playHarmonicChime } from "@/lib/audio";
import { consultationsCatalog } from "@/lib/data";

interface ConsultationFormProps {
  onShowToast?: (msg: string) => void;
  externalSelection?: {
    serviceId?: string;
    modeText?: string;
  };
}

export default function ConsultationForm({ onShowToast, externalSelection }: ConsultationFormProps) {
  const router = useRouter();

  // Dropdown 1: Service / Category
  const [selectedServiceId, setSelectedServiceId] = useState<string>("c1"); // Career & Business
  // Dropdown 2: Mode & Fee
  const [selectedModeText, setSelectedModeText] = useState<string>("Any One Question — ₹499");

  useEffect(() => {
    if (externalSelection?.serviceId) {
      setSelectedServiceId(externalSelection.serviceId);
      const tiers = getServiceTiers(externalSelection.serviceId);
      if (externalSelection.modeText) {
        const match = tiers.find(
          (t) =>
            externalSelection.modeText?.includes(t.mode) ||
            externalSelection.modeText?.includes(String(t.price))
        );
        if (match) {
          setSelectedModeText(`${match.mode} — ₹${match.price.toLocaleString("en-IN")}`);
        } else {
          setSelectedModeText(externalSelection.modeText);
        }
      }
    }
  }, [externalSelection]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to get tiers for current category
  const getServiceTiers = (serviceId: string) => {
    if (serviceId === "c2") {
      // Complete Analysis of Chart
      return [
        { mode: "Comprehensive Chat", price: 3100 },
        { mode: "Priority Voice Call (45 min)", price: 5100 },
        { mode: "1-on-1 Video Session (60 min)", price: 7100 },
      ];
    }
    // All other consultation categories: Any One Question (₹499), Detailed Chat (₹2,100), Voice Call (₹3,100)
    return [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ];
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newServiceId = e.target.value;
    setSelectedServiceId(newServiceId);
    const tiers = getServiceTiers(newServiceId);
    if (tiers && tiers.length > 0) {
      setSelectedModeText(`${tiers[0].mode} — ₹${tiers[0].price.toLocaleString("en-IN")}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playHarmonicChime(528);

    const serviceObj = consultationsCatalog.find((c) => c.id === selectedServiceId);
    const serviceTitle = serviceObj ? serviceObj.title : "Career & Business Consultation";
    const fullConsultationName = `${serviceTitle} (${selectedModeText})`;

    if (onShowToast) {
      onShowToast(`Booking submitted for ${formData.name}!`);
    }

    let assignedId = "AH4U-01";

    // Persist to server / Neon DB
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          consultation: fullConsultationName,
          source: "Hero Form (Book 1-on-1 Guidance)",
        }),
      });
      const data = await res.json();
      if (data.success && data.booking?.id) {
        assignedId = data.booking.id;
      }
    } catch (err) {
      console.error("Failed to store booking:", err);
    }

    try {
      sessionStorage.setItem(
        "astro_booking",
        JSON.stringify({ ...formData, consultation: fullConsultationName, id: assignedId })
      );
    } catch {
      // ignore
    }

    setTimeout(() => {
      router.push(`/thank-you?booking_id=${encodeURIComponent(assignedId)}`);
    }, 350);
  };

  const currentTiers = getServiceTiers(selectedServiceId);

  return (
    <div
      id="hero-consultation-form"
      className="w-full max-w-md mx-auto bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.5),0_0_25px_rgba(246,207,122,0.3)] border border-amber-200/80 relative transition-all scroll-mt-28"
    >
      {/* Decorative Subtle Glow */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

      {/* Header */}
      <div className="mb-3 pb-2.5 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[9px] font-bold uppercase tracking-wider mb-1.5">
          <Sparkles className="w-2.5 h-2.5 text-amber-700" />
          <span>Priority Consultation</span>
        </div>
        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-950 leading-tight">
          Book 1-on-1 Guidance
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Direct personal analysis with Master Astrologer <strong>Garima Verma</strong> (10+ Years Experience • 15,000+ Consultations Helped).
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2.5 text-[11px]">
        {/* Full Name (Mandatory) */}
        <div>
          <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
            <span>Full Name</span>
            <span className="text-amber-600 font-bold text-xs">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-3 py-1.5 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition"
          />
        </div>

        {/* Dropdown 1: Select Consultation Category / Service (Mandatory) */}
        <div>
          <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
            <span>Select Consultation Service</span>
            <span className="text-amber-600 font-bold text-xs">*</span>
          </label>
          <select
            name="selectedServiceId"
            required
            value={selectedServiceId}
            onChange={handleServiceChange}
            className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-3 py-1.5 text-slate-900 text-[11px] font-medium focus:outline-none transition cursor-pointer"
          >
            {consultationsCatalog.map((c) => {
              const isComplete = c.id === "c2";
              return (
                <option key={c.id} value={c.id}>
                  {c.title} {isComplete ? "★ (Popular)" : ""}
                </option>
              );
            })}
          </select>
        </div>

        {/* Dropdown 2: Select Consultation Mode & Fee (Mandatory) */}
        <div>
          <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
            <span>Consultation Mode &amp; Fee</span>
            <span className="text-amber-600 font-bold text-xs">*</span>
          </label>
          <select
            name="selectedModeText"
            required
            value={selectedModeText}
            onChange={(e) => setSelectedModeText(e.target.value)}
            className="w-full bg-amber-50/70 border border-amber-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-3 py-1.5 text-slate-900 text-[11px] font-bold focus:outline-none transition cursor-pointer"
          >
            {currentTiers.map((t, idx) => (
              <option
                key={idx}
                value={`${t.mode} — ₹${t.price.toLocaleString("en-IN")}`}
              >
                {t.mode} — ₹{t.price.toLocaleString("en-IN")}
              </option>
            ))}
          </select>
        </div>

        {/* Phone / WhatsApp Contact (Mandatory) */}
        <div>
          <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
            <span>Phone / WhatsApp</span>
            <span className="text-amber-600 font-bold text-xs">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-3 py-1.5 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition"
          />
        </div>

        {/* Email Address (Optional) */}
        <div>
          <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
            <div>
              <span>Email Address</span>
              <span className="text-[10px] text-slate-400 font-normal ml-1">(Optional)</span>
            </div>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-2.5 py-1.5 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-[0_3px_15px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.55)] hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
        >
          <span>{isSubmitting ? "Securing Slot..." : "✦ Confirm & Book Consultation ✦"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <p className="text-[9px] text-center text-slate-500 pt-0.5 font-medium">
          🔒 100% Confidential • Pure Vedic Logic • Zero Fear Tactics
        </p>
      </form>
    </div>
  );
}
