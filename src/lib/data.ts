export interface OracleCard {
  id: number;
  title: string;
  subtitle: string;
  element: string;
  frontIcon: string;
  frontColor: string;
  frontBg: string;
  borderColor: string;
  text: string;
  remedy: string;
}

export const oracleCards: OracleCard[] = [
  {
    id: 1,
    title: "The Luminary Star",
    subtitle: "Card I: The Luminary",
    element: "Ether",
    frontIcon: "sun",
    frontColor: "text-celestial-gold",
    frontBg: "border-celestial-gold/40",
    borderColor: "border-amber-400",
    text: "A beacon of hope and unexpected clarity. What you believed was closed is actually making room for sudden expansion. Trust your inner compass today.",
    remedy: "Offer water to Surya at dawn; wear shades of yellow or gold."
  },
  {
    id: 2,
    title: "The Divine Empress",
    subtitle: "Card II: Divine Empress",
    element: "Earth",
    frontIcon: "sparkles",
    frontColor: "text-celestial-amethyst",
    frontBg: "border-purple-500/40",
    borderColor: "border-purple-400",
    text: "Physical manifestation, sensory comfort, and fertility of ideas. Nurture your body and quiet your critical intellect. Your patience is compounding.",
    remedy: "Spend 10 minutes barefoot on soil or grass; drink water stored in a silver vessel."
  },
  {
    id: 3,
    title: "The Mystic Sage",
    subtitle: "Card III: The Mystic Void",
    element: "Void",
    frontIcon: "eye",
    frontColor: "text-teal-300",
    frontBg: "border-teal-500/40",
    borderColor: "border-teal-400",
    text: "A call to pause and reflect. Silence the outside chatter. Your subconscious and dreams currently hold the exact solution to your roadblock.",
    remedy: "Practice 5-minute Chandra pranayama before sleep tonight."
  }
];

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  element: string;
  planet: string;
  vibration: string;
  color: string;
  lucky: string;
  synergy: string;
  desc: string;
}

export const zodiacData: ZodiacSign[] = [
  { id: "aries", name: "Aries", symbol: "♈", element: "Fire", planet: "Mars", vibration: "92%", color: "Amber Glow", lucky: "7, 14, 22", synergy: "Leo & Libra", desc: "Your governing rulers suggest a sudden burst of communication. An unexpected email or cosmic breakthrough is disrupting your stagnation." },
  { id: "taurus", name: "Taurus", symbol: "♉", element: "Earth", planet: "Venus", vibration: "88%", color: "Emerald Green", lucky: "6, 15, 24", synergy: "Virgo & Capricorn", desc: "Venus brings financial equilibrium. A delayed payment or contract negotiation will lean in your favor over the next lunar cycle." },
  { id: "gemini", name: "Gemini", symbol: "♊", element: "Air", planet: "Mercury", vibration: "95%", color: "Sky Cyan", lucky: "5, 14, 23", synergy: "Libra & Aquarius", desc: "Mercury activates your intellect. Clear up pending misunderstandings in your relationship or career network today." },
  { id: "cancer", name: "Cancer", symbol: "♋", element: "Water", planet: "Moon", vibration: "84%", color: "Silver Pearl", lucky: "2, 11, 20", synergy: "Scorpio & Pisces", desc: "The Moon is softening your intuition. Do not ignore gut feelings regarding people offering dubious business bargains." },
  { id: "leo", name: "Leo", symbol: "♌", element: "Fire", planet: "Sun", vibration: "96%", color: "Solar Gold", lucky: "1, 10, 19", synergy: "Aries & Sagittarius", desc: "Radiance and leadership awaken. Stand tall in professional meetings; your aura is commanding natural respect right now." },
  { id: "virgo", name: "Virgo", symbol: "♍", element: "Earth", planet: "Mercury", vibration: "90%", color: "Olive Green", lucky: "5, 12, 27", synergy: "Taurus & Capricorn", desc: "Organize what has felt chaotic. Small administrative changes will free up massive emotional bandwidth." },
  { id: "libra", name: "Libra", symbol: "♎", element: "Air", planet: "Venus", vibration: "91%", color: "Pastel Rose", lucky: "6, 15, 33", synergy: "Gemini & Aquarius", desc: "A decisive turning point in your love life or joint venture. Choose inner harmony over pleasing others." },
  { id: "scorpio", name: "Scorpio", symbol: "♏", element: "Water", planet: "Mars/Ketu", vibration: "97%", color: "Deep Crimson", lucky: "8, 17, 26", synergy: "Cancer & Pisces", desc: "The 8th house master sign. You are shedding a skin that no longer fits. Spiritual alchemy is at an all-time peak." },
  { id: "sagittarius", name: "Sagittarius", symbol: "♐", element: "Fire", planet: "Jupiter", vibration: "93%", color: "Royal Saffron", lucky: "3, 12, 21", synergy: "Aries & Leo", desc: "Foreign travel, legal matters, and philosophical expansion show strong green lights. Broaden your horizons." },
  { id: "capricorn", name: "Capricorn", symbol: "♑", element: "Earth", planet: "Saturn", vibration: "89%", color: "Obsidian Black", lucky: "4, 13, 22", synergy: "Taurus & Virgo", desc: "Saturn rewards your silent persistence. A legacy milestone or property matter begins to unfreeze." },
  { id: "aquarius", name: "Aquarius", symbol: "♒", element: "Air", planet: "Saturn/Rahu", vibration: "94%", color: "Electric Violet", lucky: "8, 17, 35", synergy: "Gemini & Libra", desc: "Sudden eureka insights. Your ideas will seem strange to average minds; trust the future you are sensing." },
  { id: "pisces", name: "Pisces", symbol: "♓", element: "Water", planet: "Jupiter", vibration: "98%", color: "Seafoam Turquoise", lucky: "3, 9, 18", synergy: "Cancer & Scorpio", desc: "Deep mystical sensitivity. Cleanse your bedroom with sage and record your dreams upon waking." }
];

export interface ConsultationTier {
  mode: string;
  price: number;
}

export interface ConsultationItem {
  id: string;
  title: string;
  badge: string;
  badgeClass: string;
  iconName: string;
  category: "core" | "relationships" | "career" | "healing";
  description: string;
  isPopular?: boolean;
  tiers: ConsultationTier[];
}

export const consultationsCatalog: ConsultationItem[] = [
  {
    id: "c1",
    title: "Career & Business Consultation",
    badge: "Career & Business",
    badgeClass: "text-amber-300 bg-amber-950/50 border-amber-500/30",
    iconName: "Briefcase",
    category: "career",
    description: "Job changes, career stagnation, corporate promotions, business partner vetting, and high-growth transit timing.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  },
  {
    id: "c2",
    title: "Complete Analysis of Chart",
    badge: "Full Life Matrix",
    badgeClass: "text-amber-300 bg-amber-950/60 border-amber-500/30",
    iconName: "Sparkles",
    category: "core",
    isPopular: true,
    description: "In-depth study of your Kundli including all 12 houses, planetary placements, yogas, dasha cycles, and lifetime predictions.",
    tiers: [
      { mode: "Comprehensive Chat", price: 3100 },
      { mode: "Priority Voice Call (45 min)", price: 5100 },
      { mode: "1-on-1 Video Session (60 min)", price: 7100 }
    ]
  },
  {
    id: "c3",
    title: "Marriage Consultation",
    badge: "Marriage & Milan",
    badgeClass: "text-pink-300 bg-pink-950/50 border-pink-500/30",
    iconName: "Heart",
    category: "relationships",
    description: "Find the right match, check Ashtakoot compatibility, solve marriage delays (Shadi me rukawat), and marital disputes.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  },
  {
    id: "c4",
    title: "Foreign PR & Relocation",
    badge: "Foreign PR & Travel",
    badgeClass: "text-celestial-teal bg-cyan-950/50 border-cyan-500/30",
    iconName: "PlaneTakeoff",
    category: "career",
    description: "Stuck with foreign PR delays (Foreign PR me dikkat), visa issues, or unsure whether overseas settlement will bring prosperity.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  },
  {
    id: "c5",
    title: "Finance & Wealth Alignment",
    badge: "Wealth & Lakshmi",
    badgeClass: "text-emerald-300 bg-emerald-950/50 border-emerald-500/30",
    iconName: "Coins",
    category: "career",
    description: "Break unexpected debt cycles (Paiso ki dikkat), unblock ancestral inheritance, and align with your wealth-giving 2nd and 11th houses.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  },
  {
    id: "c6",
    title: "Pregnancy & Santan Guidance",
    badge: "Childbirth & Santan",
    badgeClass: "text-purple-300 bg-purple-950/50 border-purple-500/30",
    iconName: "Baby",
    category: "relationships",
    description: "Clear insights on 5th house Santan Bhava, hormonal karmic blockages (Pregnancy me dikkat), and auspicious conception windows.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  },
  {
    id: "c7",
    title: "Vastu Shastra & Space Healing",
    badge: "Spatial Architecture",
    badgeClass: "text-amber-400 bg-amber-950/50 border-amber-500/30",
    iconName: "Home",
    category: "healing",
    description: "Resolve family disputes, heaviness, and commercial stagnation with zero-demolition spatial energy calibration.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  },
  {
    id: "c8",
    title: "Gemstone & Rudraksha Testing",
    badge: "Aura Amplifiers",
    badgeClass: "text-teal-300 bg-teal-950/50 border-teal-500/30",
    iconName: "Gem",
    category: "healing",
    description: "Empirical assessment of which stones and Mukhi beads harmonize with your Lagnesh and Yogakaraka without triggering negative side-effects.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  },
  {
    id: "c9",
    title: "Health & Emotional Healing",
    badge: "Aura & Longevity",
    badgeClass: "text-emerald-300 bg-emerald-950/50 border-emerald-500/30",
    iconName: "Activity",
    category: "healing",
    description: "Medical astrology analysis of the 6th and 8th houses for chronic lethargy, heavy anxiety, aura depletion, and psychosomatic blocks.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  },
  {
    id: "c10",
    title: "Yearly Varshphal Transit",
    badge: "Solar Return 2026",
    badgeClass: "text-amber-300 bg-amber-950/50 border-amber-500/30",
    iconName: "Calendar",
    category: "core",
    description: "Your comprehensive 12-month annual solar return forecast detailing month-by-month financial highs, cautions, and auspicious events.",
    tiers: [
      { mode: "Any One Question", price: 499 },
      { mode: "Detailed Chat", price: 2100 },
      { mode: "Voice Call (30 min)", price: 3100 },
    ]
  }
];

export interface ApothecaryProduct {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  iconName: string;
  badgeGradient: string;
  iconColor: string;
}

export const apothecaryProducts: ApothecaryProduct[] = [
  {
    id: "p1",
    title: "7 Mukhi Nepali Rudraksha",
    description: "Sacred energized seed ruled by Goddess Mahalakshmi to attract sustainable wealth and dissolve chronic debt.",
    originalPrice: 1999,
    discountPrice: 1199,
    iconName: "Sparkles",
    badgeGradient: "from-amber-950 to-cosmic-900 border-amber-500/20",
    iconColor: "text-amber-400/60"
  },
  {
    id: "p2",
    title: "Surya Leadership Power Mala",
    description: "Handcrafted 108-bead energized red jasper & carnelian mala for solar confidence, vitality, and career authority.",
    originalPrice: 1499,
    discountPrice: 888,
    iconName: "Sun",
    badgeGradient: "from-purple-950 to-cosmic-900 border-purple-500/20",
    iconColor: "text-purple-400/60"
  },
  {
    id: "p3",
    title: "Rose Quartz Aura Heart",
    description: "Natural Madagascar Rose Quartz to dissolve relationship anxiety and restore self-love.",
    originalPrice: 999,
    discountPrice: 549,
    iconName: "Heart",
    badgeGradient: "from-pink-950 to-cosmic-900 border-pink-500/20",
    iconColor: "text-pink-400/60"
  },
  {
    id: "p4",
    title: "Sage & Camphor Cleanser",
    description: "Small-batch sacred botanical blend to vaporize dense spatial currents and stagnant energy.",
    originalPrice: 799,
    discountPrice: 420,
    iconName: "Flame",
    badgeGradient: "from-cyan-950 to-cosmic-900 border-cyan-500/20",
    iconColor: "text-cyan-400/60"
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqList: FaqItem[] = [
  {
    question: "What if I do not have my exact birth time?",
    answer: "Garima performs Birth Time Rectification (BTR) based on key life events (graduation dates, marriage, past injuries or promotions) to calibrate your Ascendant degree accurately before conducting the reading."
  },
  {
    question: "How does the 1-on-1 Consultation take place?",
    answer: "Consultations are held securely over WhatsApp Voice/Video or Google Meet based on your booked tier. Following the session, you receive a concise written remedy summary and auspicious timeline markers."
  },
  {
    question: "Are your remedies expensive or fear-based?",
    answer: "Never. We strictly follow zero-fear ethics. Our remedies involve simple, cost-effective adjustments: elemental water offerings, specific behavioral corrections, resonant sound mantras, and optional certified gemstones."
  },
  {
    question: "Can I ask questions regarding my family members?",
    answer: "In the 'Complete Analysis of Chart' session, we include cross-reference insights for your immediate spouse or child based on Bhavat Bhavam (house-from-house principles)."
  },
  {
    question: "How soon do I receive my booking confirmation?",
    answer: "Once submitted, our team reaches out via WhatsApp within 2 to 4 hours to confirm your time zone, auspicious muhurta slot, and intake questionnaire."
  }
];

