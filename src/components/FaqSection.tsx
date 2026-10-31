"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqList } from "@/lib/data";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-cosmic-900/30 border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold tracking-widest text-celestial-gold uppercase">
            ✦ Clarification & Ethics ✦
          </span>
          <h3 className="font-cinzel text-3xl font-bold text-white mt-1">
            Celestial FAQ Registry
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Everything you need to know about preparing for your session.
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.question}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-celestial-gold transition cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-celestial-gold" : "text-slate-400"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

