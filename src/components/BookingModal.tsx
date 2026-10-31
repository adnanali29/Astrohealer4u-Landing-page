"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { playHarmonicChime } from "@/lib/audio";

export interface BookingModalData {
  isOpen: boolean;
  title: string;
  mode: string;
  price: number;
}

interface BookingModalProps {
  modalData: BookingModalData;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export default function BookingModal({ modalData, onClose, onShowToast }: BookingModalProps) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!modalData.isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    playHarmonicChime(528);
    onShowToast(`Consultation slot initiated for ${name || "Seeker"}!`);

    let assignedId = "AH4U-01";
    // Persist to admin panel backend
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          consultation: `${modalData.title} (${modalData.mode}) — ₹${modalData.price}`,
          dob,
          tob: time,
          pob: city,
          phone,
          appointmentDate: "To be confirmed via WhatsApp",
          appointmentTime: "Flexible",
          notes: note,
          source: `Modal (${modalData.mode})`,
        }),
      });
      const data = await res.json();
      if (data.success && data.booking?.id) {
        assignedId = data.booking.id;
      }
    } catch (err) {
      console.error("Failed to save booking:", err);
    }

    try {
      sessionStorage.setItem(
        "astro_booking",
        JSON.stringify({
          name,
          consultation: `${modalData.title} (${modalData.mode})`,
          id: assignedId,
        })
      );
    } catch {
      // ignore
    }

    const whatsappText = encodeURIComponent(
      `Hello Garima Ji, I have booked a consultation for: "${modalData.title}" (${modalData.mode}) on astrohealer4U.\n\nBooking Reference: ${assignedId}\nName: ${name}\nDOB: ${dob}\nTime: ${time}\nBirth City: ${city}\nPhone: ${phone}\nQuestion/Notes: ${note || "None"}\n\nPlease confirm slot availability.`
    );

    setTimeout(() => {
      window.open(`https://wa.me/919999999999?text=${whatsappText}`, "_blank");
      window.location.href = `/thank-you?booking_id=${encodeURIComponent(assignedId)}`;
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border-2 border-celestial-gold/40 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-[10px] tracking-widest text-celestial-gold uppercase font-bold">
            Consultation Reservation
          </span>
          <h3 className="font-cinzel text-xl font-bold text-white mt-0.5">{modalData.title}</h3>
          <p className="text-xs text-slate-300 mt-1">
            Mode: {modalData.mode} • Fee: ₹{modalData.price.toLocaleString("en-IN")}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-medium">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-cosmic-950/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-celestial-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-cosmic-950/90 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-celestial-gold"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Birth Time</label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-cosmic-950/90 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-celestial-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Birth City / Country</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Pune, Maharashtra"
                className="w-full bg-cosmic-950/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-celestial-gold"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">
                WhatsApp Contact Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-cosmic-950/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-celestial-gold"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">
                Key Question or Concern (Optional)
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Asking regarding promotion timeline in current company..."
                className="w-full bg-cosmic-950/90 border border-slate-700 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-celestial-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-celestial-gold via-yellow-400 to-amber-500 text-cosmic-950 font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-celestial-gold/50 transition mt-2 cursor-pointer"
            >
              Confirm & Connect With Garima →
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-cinzel text-lg font-bold text-white mb-1">
              Thank You! Your Consultation Has Been Booked
            </h4>
            <p className="text-xs text-slate-300 mb-4">
              Our team will get back to you in sometime. In the meantime please visit our official website:
            </p>
            <a
              href="https://www.astrohealer4u.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-4 px-4 py-2 rounded-xl bg-celestial-gold text-cosmic-950 font-bold text-xs uppercase tracking-wider"
            >
              Visit www.astrohealer4u.in ➔
            </a>
            <div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-cosmic-900 border border-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

