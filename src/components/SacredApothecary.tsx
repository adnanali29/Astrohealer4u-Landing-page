import { Sparkles, Sun, Heart, Flame } from "lucide-react";
import { apothecaryProducts } from "@/lib/data";

interface SacredApothecaryProps {
  onOpenOrder: (title: string, price: number) => void;
}

export default function SacredApothecary({ onOpenOrder }: SacredApothecaryProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Sun":
        return <Sun className="w-16 h-16 text-purple-400/60 group-hover:scale-110 transition duration-300" />;
      case "Heart":
        return <Heart className="w-16 h-16 text-pink-400/60 group-hover:scale-110 transition duration-300" />;
      case "Flame":
        return <Flame className="w-16 h-16 text-cyan-400/60 group-hover:scale-110 transition duration-300" />;
      default:
        return <Sparkles className="w-16 h-16 text-amber-400/60 group-hover:scale-110 transition duration-300" />;
    }
  };

  return (
    <section
      id="shop"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-cosmic-900/40 border-t border-b border-celestial-gold/15 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-widest text-celestial-gold uppercase">
            ✦ Energized High-Frequency Artifacts ✦
          </span>
          <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mt-1 mb-3">
            Sacred Alchemical Apothecary
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Prana-pratishtha consecrated sacred tools, Vedic rudrakshas, and organic gemstones blessed
            with planetary beeja mantras.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apothecaryProducts.map((p) => (
            <div
              key={p.id}
              className="glass-card rounded-2xl p-5 border border-white/10 group flex flex-col justify-between"
            >
              <div>
                <div
                  className={`h-44 rounded-xl bg-gradient-to-tr ${p.badgeGradient} flex items-center justify-center relative overflow-hidden mb-4`}
                >
                  {renderIcon(p.iconName)}
                </div>
                <h4 className="font-cinzel text-base font-bold text-white mb-1">{p.title}</h4>
                <p className="text-[11px] text-slate-400 mb-3">{p.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <span className="text-xs text-slate-500 line-through mr-1.5">
                    ₹{p.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-bold text-amber-300">
                    ₹{p.discountPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenOrder(p.title, p.discountPrice)}
                  className="px-3.5 py-1.5 rounded-lg bg-celestial-gold text-cosmic-950 text-xs font-bold hover:bg-yellow-300 transition cursor-pointer"
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

