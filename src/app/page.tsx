"use client";

import { useState } from "react";
import Starfield from "@/components/Starfield";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import AllConsultations from "@/components/AllConsultations";
import AboutGarima from "@/components/AboutGarima";
import ZodiacRadar from "@/components/ZodiacRadar";
import KundliEngine from "@/components/KundliEngine";
import FeaturedConsultations from "@/components/FeaturedConsultations";
import SacredApothecary from "@/components/SacredApothecary";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import DestinyCta from "@/components/DestinyCta";
import Footer from "@/components/Footer";
import BookingModal, { BookingModalData } from "@/components/BookingModal";
import Toast from "@/components/Toast";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalData, setModalData] = useState<BookingModalData>({
    isOpen: false,
    title: "Complete Chart Analysis",
    mode: "Priority Voice Call (45 min)",
    price: 5100,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  const handleOpenBooking = (title: string, mode: string, price: number) => {
    setModalData({
      isOpen: true,
      title,
      mode,
      price,
    });
  };

  const handleOpenOrder = (title: string, price: number) => {
    showToast(`Selected "${title}" (₹${price.toLocaleString("en-IN")})`);
    setModalData({
      isOpen: true,
      title: `Sacred Artifact: ${title}`,
      mode: "Blessed Dispatch",
      price,
    });
  };

  const handleCloseModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative min-h-screen text-slate-200">
      {/* Background Starfield */}
      <Starfield />

      {/* Header & Announcements */}
      <Header onShowToast={showToast} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onShowToast={showToast} />
        <PainPoints />
        <AllConsultations onOpenBooking={handleOpenBooking} />
        <AboutGarima />
        <ZodiacRadar onOpenBooking={handleOpenBooking} />
        <KundliEngine onShowToast={showToast} />
        <FeaturedConsultations onOpenBooking={handleOpenBooking} />
        <SacredApothecary onOpenOrder={handleOpenOrder} />
        <Testimonials />
        <FaqSection />
        <DestinyCta />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <BookingModal
        modalData={modalData}
        onClose={handleCloseModal}
        onShowToast={showToast}
      />
      <Toast message={toastMessage} />
    </div>
  );
}
