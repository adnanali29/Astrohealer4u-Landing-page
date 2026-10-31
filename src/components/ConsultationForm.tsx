"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Mail,
  ArrowRight,
  Compass,
} from "lucide-react";
import { playHarmonicChime } from "@/lib/audio";
import { consultationsCatalog } from "@/lib/data";

interface ConsultationFormProps {
  onShowToast?: (msg: string) => void;
}

export default function ConsultationForm({ onShowToast }: ConsultationFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    consultation: "Complete Analysis of Chart (₹5,100) — Most Popular",
    dob: "",
    tob: "",
    pob: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (onShowToast) {
      onShowToast(`Booking submitted for ${formData.name}!`);
    }

    try {
      sessionStorage.setItem("astro_booking", JSON.stringify(formData));
    } catch {
      // ignore
    }

    // Persist to server /admin backend
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Hero Form (Book 1-on-1 Guidance)",
        }),
      });
    } catch (err) {
      console.error("Failed to store booking:", err);
    }

    setTimeout(() => {
      router.push("/thank-you");
    }, 400);
  };

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
          Direct personal analysis with Master Astrologer <strong>Garima Verma</strong>.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-2.5 text-[11px]">
        {/* Name (Mandatory) */}
        <div>
          <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-amber-600" />
              <span>Full Name</span>
            </span>
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

        {/* Consultation Service Dropdown (Mandatory) */}
        <div>
          <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3 text-amber-600" />
              <span>Select Consultation Service</span>
            </span>
            <span className="text-amber-600 font-bold text-xs">*</span>
          </label>
          <select
            name="consultation"
            required
            value={formData.consultation}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-3 py-1.5 text-slate-900 text-[11px] font-medium focus:outline-none transition cursor-pointer"
          >
            {consultationsCatalog.map((c) => {
              const startingPrice = c.tiers[0]?.price ?? 2100;
              const isComplete = c.id === "c2";
              return (
                <option
                  key={c.id}
                  value={`${c.title} (₹${startingPrice.toLocaleString("en-IN")})`}
                >
                  {c.title} — ₹{startingPrice.toLocaleString("en-IN")}{" "}
                  {isComplete ? "★ (Popular)" : ""}
                </option>
              );
            })}
            <option value="General Natal Consultation (Custom)">
              General Natal Consultation & Custom Life Analysis
            </option>
          </select>
        </div>

        {/* Date of Birth & Time of Birth (Mandatory) */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-600" />
                <span>Date of Birth</span>
              </span>
              <span className="text-amber-600 font-bold text-xs">*</span>
            </label>
            <input
              type="date"
              name="dob"
              required
              value={formData.dob}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-2.5 py-1.5 text-slate-900 text-xs focus:outline-none transition [color-scheme:light]"
            />
          </div>
          <div>
            <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>Time of Birth</span>
              </span>
              <span className="text-amber-600 font-bold text-xs">*</span>
            </label>
            <input
              type="time"
              name="tob"
              required
              value={formData.tob}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-2.5 py-1.5 text-slate-900 text-xs focus:outline-none transition [color-scheme:light]"
            />
          </div>
        </div>

        {/* Place of Birth & Contact Number (Mandatory) */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" />
                <span>Place of Birth</span>
              </span>
              <span className="text-amber-600 font-bold text-xs">*</span>
            </label>
            <input
              type="text"
              name="pob"
              required
              value={formData.pob}
              onChange={handleChange}
              placeholder="City, State"
              className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-2.5 py-1.5 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-amber-600" />
                <span>Phone / WhatsApp</span>
              </span>
              <span className="text-amber-600 font-bold text-xs">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-2.5 py-1.5 text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition"
            />
          </div>
        </div>

        {/* Appointment Date and Time (Mandatory) */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-600" />
                <span>Appointment Date</span>
              </span>
              <span className="text-amber-600 font-bold text-xs">*</span>
            </label>
            <input
              type="date"
              name="appointmentDate"
              required
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-2.5 py-1.5 text-slate-900 text-xs focus:outline-none transition [color-scheme:light]"
            />
          </div>
          <div>
            <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>Appointment Time</span>
              </span>
              <span className="text-amber-600 font-bold text-xs">*</span>
            </label>
            <input
              type="time"
              name="appointmentTime"
              required
              value={formData.appointmentTime}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-300 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500/20 rounded-lg px-2.5 py-1.5 text-slate-900 text-xs focus:outline-none transition [color-scheme:light]"
            />
          </div>
        </div>

        {/* Email Address (Optional) */}
        <div>
          <label className="block text-slate-800 mb-0.5 font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" />
              <span>Email Address</span>
              <span className="text-[10px] text-slate-400 font-normal ml-1">(Optional)</span>
            </span>
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
