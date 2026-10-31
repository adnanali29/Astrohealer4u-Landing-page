"use client";

import { useState } from "react";
import { Cpu, MapPin, Compass, Share2 } from "lucide-react";
import { playHarmonicChime } from "@/lib/audio";

interface KundliEngineProps {
  onShowToast: (msg: string) => void;
}

export default function KundliEngine({ onShowToast }: KundliEngineProps) {
  const [name, setName] = useState("Swati Sharma");
  const [dob, setDob] = useState("1998-05-18");
  const [time, setTime] = useState("09:42");
  const [place, setPlace] = useState("New Delhi, India");
  const [focus, setFocus] = useState<"career" | "marriage" | "wealth" | "health">("career");

  // Diagnostics output state
  const [chartData, setChartData] = useState({
    title: "Vedic Kundli Projection",
    subtitle: "Parashara D1 Chart Coordinates for Swati Sharma",
    ascSign: "Surya / Leo 1H",
    kamaSign: "Saturn ♄ 10th House",
    dasha: "Venus Mahadasha - Jupiter Antardasha",
    house8: "Transformative Career Pivot / Foreign PR Opening in 2026",
    lagnaDegree: "24° 18' Purva Phalguni",
    moonNakshatra: "Rohini Nakshatra Pada 3",
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const seekerName = name.trim() || "Seeker";

    let ascSign = "Surya / Leo 1H";
    let kamaSign = "Saturn ♄ 10th House";
    let dasha = "Venus Mahadasha - Jupiter Antardasha";
    let house8 = "Transformative Career Pivot / Foreign PR Opening in 2026";
    let lagnaDegree = "24° 18' Purva Phalguni";
    let moonNakshatra = "Rohini Nakshatra Pada 3";

    if (focus === "career") {
      ascSign = "Surya / Leo 1H";
      kamaSign = "Saturn ♄ 10th House";
      dasha = "Venus Mahadasha - Jupiter Antardasha";
      house8 = "Transformative Career Pivot / Foreign PR Opening in 2026";
      lagnaDegree = "18° 12' Magha";
      moonNakshatra = "Uttara Phalguni Pada 2";
    } else if (focus === "marriage") {
      ascSign = "Shukra / Libra 1H";
      kamaSign = "Mars ♂ 7th House";
      dasha = "Moon Mahadasha - Rahu Antardasha";
      house8 = "Harmonious Union / Karmic Resolution in 2026";
      lagnaDegree = "06° 45' Chitra";
      moonNakshatra = "Swati Nakshatra Pada 4";
    } else if (focus === "wealth") {
      ascSign = "Ketu / Scorpio 1H";
      kamaSign = "Mercury ☿ 8th House";
      dasha = "Rahu Mahadasha - Ketu Antardasha";
      house8 = "Sudden Gains / Unblocking Inherited Assets";
      lagnaDegree = "12° 30' Anuradha";
      moonNakshatra = "Jyeshtha Pada 1";
    } else {
      ascSign = "Jupiter / Pisces 1H";
      kamaSign = "Moon ☽ 4th House";
      dasha = "Jupiter Mahadasha - Saturn Dasha";
      house8 = "Spiritual Awakening / Intuitive Healing Active";
      lagnaDegree = "28° 14' Revati";
      moonNakshatra = "Uttara Bhadrapada Pada 3";
    }

    setChartData({
      title: `${seekerName}’s Natal Matrix`,
      subtitle: `D1 Parashara Ephemeris (${place})`,
      ascSign,
      kamaSign,
      dasha,
      house8,
      lagnaDegree,
      moonNakshatra,
    });

    playHarmonicChime(639);
    onShowToast(`Natal matrix calculated for ${seekerName}`);
  };

  const handleShareSummary = () => {
    const seekerName = name.trim() || "Seeker";
    const textToCopy = `astrohealer4U Kundli Coordinates for ${seekerName}: Focus [${focus.toUpperCase()}], Ascendant: ${chartData.ascSign}, Active Dasha: ${chartData.dasha}. Decoded by Garima Verma. Book your 1-on-1 reading at https://www.astrohealer4u.in/`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      onShowToast("✦ Blueprint summary copied to clipboard!");
    } else {
      onShowToast("Copied blueprint summary!");
    }
  };

  return (
    <section
      id="blueprint"
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-cosmic-900/60 border-t border-b border-celestial-gold/15 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading - Clean Center Aligned */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-celestial-gold text-xs uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Vedic Ephemeris Calculator</span>
          </div>
          <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-white">
            Procedural Natal Blueprint
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Input your exact terrestrial coordinates of descent to compute foundational planetary
            placements and house structures.
          </p>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Input Form */}
          <form
            onSubmit={handleCalculate}
            className="lg:col-span-5 glass-panel p-5 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between space-y-3.5"
          >
            <div>
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                <MapPin className="w-4 h-4 text-celestial-gold" />
                <span>Coordinates of Descent</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Swati Sharma"
                    className="w-full bg-cosmic-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-celestial-gold transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full bg-cosmic-950/80 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-celestial-gold transition [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                      Exact Time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-cosmic-950/80 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-celestial-gold transition [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                    Birth Location (City / State)
                  </label>
                  <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="e.g. New Delhi, India"
                    className="w-full bg-cosmic-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-celestial-gold transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                    Primary Area of Concern
                  </label>
                  <select
                    value={focus}
                    onChange={(e) =>
                      setFocus(e.target.value as "career" | "marriage" | "wealth" | "health")
                    }
                    className="w-full bg-cosmic-950/80 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-celestial-gold transition cursor-pointer"
                  >
                    <option value="career">Career, Job Promotion & Foreign Relocation</option>
                    <option value="marriage">Marriage Delay, Relationship & Compatibility</option>
                    <option value="wealth">8th House Secrets, Wealth & Sudden Blockages</option>
                    <option value="health">Mental Peace, Health & Spiritual Purpose</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-celestial-gold via-yellow-400 to-amber-500 text-cosmic-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-celestial-gold/30 hover:scale-[1.01] transition cursor-pointer mt-4"
            >
              Generate Chart Diagnostics
            </button>
          </form>

          {/* Right Graphical Kundli Diamond Matrix & Diagnostics */}
          <div className="lg:col-span-7 glass-panel p-5 sm:p-7 rounded-3xl border border-celestial-gold/20 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <h4 className="font-cinzel text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-celestial-amethyst" />
                  <span>{chartData.title}</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">{chartData.subtitle}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                Live Alignment
              </span>
            </div>

            {/* Diamond Chart SVG Representation (North Indian Vedic Kundli) */}
            <div className="flex justify-center my-2">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-celestial-gold/60 bg-cosmic-950/70 p-2 rounded-xl shadow-[0_0_20px_rgba(243,201,106,0.15)]">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full stroke-celestial-gold/60 fill-none stroke-[1.2]"
                >
                  {/* Main square cross */}
                  <line x1="0" y1="0" x2="200" y2="200" />
                  <line x1="200" y1="0" x2="0" y2="200" />
                  {/* Internal rotated diamond */}
                  <polygon points="100,0 200,100 100,200 0,100" />

                  {/* House text markers */}
                  <text
                    x="100"
                    y="45"
                    textAnchor="middle"
                    className="fill-amber-300 font-cinzel text-[10px] stroke-none font-bold"
                  >
                    1H (Lagna)
                  </text>
                  <text
                    x="50"
                    y="25"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] stroke-none"
                  >
                    2H
                  </text>
                  <text
                    x="25"
                    y="50"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] stroke-none"
                  >
                    3H
                  </text>
                  <text
                    x="55"
                    y="105"
                    textAnchor="middle"
                    className="fill-amber-300 font-cinzel text-[9px] stroke-none"
                  >
                    4H (Sukha)
                  </text>
                  <text
                    x="25"
                    y="155"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] stroke-none"
                  >
                    5H
                  </text>
                  <text
                    x="50"
                    y="180"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] stroke-none"
                  >
                    6H
                  </text>
                  <text
                    x="100"
                    y="160"
                    textAnchor="middle"
                    className="fill-amber-300 font-cinzel text-[10px] stroke-none font-bold"
                  >
                    7H (Kama)
                  </text>
                  <text
                    x="150"
                    y="180"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] stroke-none"
                  >
                    8H (Ayur)
                  </text>
                  <text
                    x="175"
                    y="155"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] stroke-none"
                  >
                    9H
                  </text>
                  <text
                    x="145"
                    y="105"
                    textAnchor="middle"
                    className="fill-amber-300 font-cinzel text-[9px] stroke-none"
                  >
                    10H (Karma)
                  </text>
                  <text
                    x="175"
                    y="50"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] stroke-none"
                  >
                    11H
                  </text>
                  <text
                    x="150"
                    y="25"
                    textAnchor="middle"
                    className="fill-slate-400 text-[8px] stroke-none"
                  >
                    12H
                  </text>

                  {/* Dynamic House Placements */}
                  <text
                    x="100"
                    y="65"
                    textAnchor="middle"
                    className="fill-emerald-300 text-[8px] stroke-none font-semibold"
                  >
                    {chartData.ascSign}
                  </text>
                  <text
                    x="100"
                    y="140"
                    textAnchor="middle"
                    className="fill-purple-300 text-[8px] stroke-none font-semibold"
                  >
                    {chartData.kamaSign}
                  </text>
                </svg>
              </div>
            </div>

            {/* Diagnostics Key Insights - Tabular & Clean Aligned */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-950/80 border border-white/5">
                <span className="text-slate-400 text-[11px]">Active Dasha Timeline:</span>
                <span className="font-semibold text-amber-300 text-xs">{chartData.dasha}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-950/80 border border-white/5">
                <span className="text-slate-400 text-[11px]">8th House Karmic Lesson:</span>
                <span className="font-semibold text-emerald-400 text-right text-xs">
                  {chartData.house8}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-950/80 border border-white/5">
                <span className="text-slate-400 text-[11px]">Lagna & Moon Degree:</span>
                <span className="font-semibold text-slate-200 text-xs">
                  {chartData.lagnaDegree} • {chartData.moonNakshatra}
                </span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 italic">
                *Requires manual verification of dasha balance by Guru.
              </span>
              <button
                type="button"
                onClick={handleShareSummary}
                className="px-3.5 py-1.5 rounded-xl border border-slate-700 hover:border-celestial-gold text-slate-300 hover:text-celestial-gold text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Summary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
