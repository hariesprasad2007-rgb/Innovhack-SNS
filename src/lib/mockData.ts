export function getProductImage(productName: string): string {
  const name = productName.toLowerCase();
  if (name.includes('bose') || name.includes('quietcomfort')) return 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80';
  if (name.includes('sony') || name.includes('xm5')) return 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80';
  if (name.includes('airpods') || name.includes('apple')) return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';
  if (name.includes('sennheiser') || name.includes('momentum')) return 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80';
  if (name.includes('steelcase') || name.includes('gesture')) return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80';
  if (name.includes('aeron') || name.includes('posturefit') || name.includes('chair')) return 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80';
  if (name.includes('sayl') || name.includes('herman')) return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80';
  if (name.includes('profitec') || name.includes('go')) return 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80';
  if (name.includes('flair')) return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80';
  if (name.includes('lelit') || name.includes('mara')) return 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80';
  if (name.includes('keychron') || name.includes('keyboard')) return 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80';
  if (name.includes('nuphy')) return 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80';
  if (name.includes('logitech') || name.includes('mx master')) return 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80';
  if (name.includes('peak design') || name.includes('backpack')) return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80';
  if (name.includes('anker') || name.includes('power')) return 'https://images.unsplash.com/photo-1609592424074-b52e37976e5d?auto=format&fit=crop&w=600&q=80';
  if (name.includes('framework') || name.includes('laptop')) return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80';
  return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
}

export function getProductRating(productName: string): string {
  const name = productName.toLowerCase();
  if (name.includes('bose')) return '4.9 ★ (1,420)';
  if (name.includes('steelcase')) return '4.9 ★ (890)';
  if (name.includes('profitec')) return '4.9 ★ (640)';
  if (name.includes('sony')) return '4.8 ★ (2,100)';
  if (name.includes('airpods') || name.includes('apple')) return '4.7 ★ (3,500)';
  if (name.includes('sennheiser')) return '4.8 ★ (980)';
  if (name.includes('herman') || name.includes('aeron')) return '4.9 ★ (1,850)';
  if (name.includes('keychron')) return '4.8 ★ (1,120)';
  if (name.includes('logitech')) return '4.9 ★ (4,200)';
  return '4.8 ★ (850)';
}

export interface BuyingScenario {
  id: string;
  category: string;
  query: string;
  targetBudget: string;
  confidenceScore: number;
  verdict: string;
  tradeoffs: {
    label: string;
    impact: 'low' | 'medium' | 'high';
    description: string;
  }[];
  hiddenTraps: string[];
  durabilityRating: string;
  topRecommendation: {
    name: string;
    subtitle: string;
    estimatedPrice: string;
    matchReasons: string[];
    image?: string;
  };
  image?: string;
}

export interface EditorialDossier {
  id: string;
  dossierNumber: string;
  category: string;
  title: string;
  subtitle: string;
  heroQuote: string;
  confidenceScore: number;
  confidenceBreakdown: {
    ergonomicsOrAcoustics: number;
    materialsDurability: number;
    repairabilityIndex: number;
    unbiasedValue: number;
  };
  recommendedProduct: {
    name: string;
    modelCode: string;
    estimatedPrice: string;
    primaryMaterial: string;
    countryOfOrigin: string;
    warrantyTerm: string;
    image?: string;
  };
  whyRecommended: {
    thesis: string;
    engineeringHighlights: string[];
    contextualFit: string;
  };
  bestUseCases: {
    title: string;
    scenario: string;
    suitability: 'Optimal' | 'Strong' | 'Conditional';
    notes: string;
  }[];
  decisionReasoning: {
    unSponsoredVerdict: string;
    auditedTradeoffsAccepted: string;
    whatMarketCompetitorsGotWrong: string;
  };
  alternativeProducts: {
    id: string;
    name: string;
    subtitle: string;
    price: string;
    whenToChoose: string;
    keyDifference: string;
    pivotScore: number;
    image?: string;
  }[];
}

export const MOCK_EDITORIAL_DOSSIERS: EditorialDossier[] = [
  {
    id: 'dossier-audio',
    dossierNumber: 'DOSSIER 01',
    category: 'Acoustic Engineering & Ergonomics',
    title: 'Acoustic Isolation Without Eyeglass Frame Compression',
    subtitle: 'An empirical audit of headband clamping vectors, earcup memory foam density, and active acoustic damping.',
    heroQuote: '“High clamping pressure on standard ANC headphones creates intense temporal pressure points for eyeglass wearers within 90 minutes. Bose QuietComfort Ultra solves this through asymmetric earcup cavity geometry.”',
    confidenceScore: 96,
    confidenceBreakdown: {
      ergonomicsOrAcoustics: 98,
      materialsDurability: 91,
      repairabilityIndex: 92,
      unbiasedValue: 95,
    },
    recommendedProduct: {
      name: 'Bose QuietComfort Ultra',
      modelCode: 'QC-ULTRA-BLK',
      estimatedPrice: '$429',
      primaryMaterial: 'Soft-touch Anodized Aluminum Yoke & Protein Leather',
      countryOfOrigin: 'Designed in USA / Assembled in Malaysia',
      warrantyTerm: '2-Year Unconditional Hardware Warranty',
    },
    whyRecommended: {
      thesis: 'Most active noise-canceling headphones achieve high passive noise isolation by applying 4.5+ Newtons of lateral clamping force. For users wearing acetate or titanium eyeglass frames, this compresses the spectacle arm against the temporal bone, breaking the acoustic seal and inducing headaches.',
      engineeringHighlights: [
        'Custom asymmetric memory foam density creates a low-resistance canal for eyeglass frames without acoustic bass leakage.',
        'Physical multi-position power & pair toggle switch prevents standby phantom battery drain.',
        'Custom Snapdragon Sound aptX Adaptive codec maintains low-latency audio transmission without digital dropouts.',
      ],
      contextualFit: 'Ideal for software engineers, research analysts, and knowledge workers who wear prescription glasses during 8+ hour continuous desk sessions.',
    },
    bestUseCases: [
      {
        title: '8+ Hour Coding & Research Sessions with Glasses',
        scenario: 'Wearing thick-arm prescription or blue-light glasses while listening to ambient focus audio or silence.',
        suitability: 'Optimal',
        notes: '0% frame pinch reported across 1,200 hours of continuous test subjects.',
      },
      {
        title: 'Flight & Transit Noise Suppression',
        scenario: 'Damping low-frequency jet engine drone (sub-200Hz frequencies).',
        suitability: 'Optimal',
        notes: 'Outperforms passive earmuffs by 32dB in low-frequency spectrum.',
      },
      {
        title: 'High-Impact Gym & Athletic Training',
        scenario: 'Heavy running, vertical jumping, or high-sweat cardiovascular exercises.',
        suitability: 'Conditional',
        notes: 'Lower clamping force allows subtle position shifts during vertical bouncing.',
      },
    ],
    decisionReasoning: {
      unSponsoredVerdict: 'While Sony WH-1000XM5 holds a minor edge in high-frequency beamforming microphones for voice calls, its rigid circular earcup seal creates unbearable pinches against eyeglass frames. Bose QC Ultra remains the single uncompromised choice for dual-wearing eyeglass users.',
      auditedTradeoffsAccepted: 'Earpad replacement requires proprietary twist-clip rings ($38 replacement fee every 24 months) rather than standard stretch-fit lips.',
      whatMarketCompetitorsGotWrong: 'Competitors over-rely on physical headband tightness to pass robotic dummy head tests, ignoring human head anatomy with glasses.',
    },
    alternativeProducts: [
      {
        id: 'alt-1',
        name: 'Sennheiser Momentum 4 Wireless',
        subtitle: '60-Hour Battery Marathon Champion',
        price: '$379',
        whenToChoose: 'Choose if multi-day battery endurance without recharging is your absolute top priority.',
        keyDifference: 'Delivers 60h playback vs Bose 24h, but has a stiffer headband arch that exerts 12% higher clamping pressure.',
        pivotScore: 88,
      },
      {
        id: 'alt-2',
        name: 'Apple AirPods Max',
        subtitle: 'Stainless Steel Mesh Canopy Architecture',
        price: '$549',
        whenToChoose: 'Choose if deep Apple ecosystem integration and physical crown volume dials outweigh the 385g mass weight penalty.',
        keyDifference: 'Superb aluminum build quality and knit mesh canopy, but weighs 385g (vs Bose 254g), accelerating neck fatigue.',
        pivotScore: 84,
      },
    ],
  },
  {
    id: 'dossier-chair',
    dossierNumber: 'DOSSIER 02',
    category: 'Kinetic Ergonomics & Spinal Support',
    title: 'The Remanufactured Task Chair Matrix for 10-Hour Sitting',
    subtitle: 'Biomechanical spine tracking, 360-degree limb articulation, and grade-A frame remanufacturing.',
    heroQuote: '“Fixed lumbar pads force the human spine into an artificial curve that fatigues lumbar vertebrae over 6+ hours. Steelcase Gesture’s kinetic spine flexes with natural human body shift.”',
    confidenceScore: 94,
    confidenceBreakdown: {
      ergonomicsOrAcoustics: 97,
      materialsDurability: 96,
      repairabilityIndex: 89,
      unbiasedValue: 94,
    },
    recommendedProduct: {
      name: 'Steelcase Gesture (Remanufactured Precision)',
      modelCode: 'GESTURE-360-REMAN',
      estimatedPrice: '$840',
      primaryMaterial: 'Die-cast Aluminum Core & High-Density Remanufactured Textile',
      countryOfOrigin: 'Frame Manufactured in USA / Remanufactured in Michigan',
      warrantyTerm: '12-Year Structural Frame Warranty',
    },
    whyRecommended: {
      thesis: 'Retail task chairs priced under $500 rely on static plastic lumbar bars that press into the L4-L5 vertebrae when reclining. Steelcase Gesture uses an interconnected core mechanism that adapts as you shift between laptop typing, tablet reading, and reclined brainstorming.',
      engineeringHighlights: [
        '360-degree armrests pivot along the shoulder girdle axis, eliminating wrist strain when holding phone or typing on angled split keyboards.',
        'Contoured seat pan uses air pockets under foam to prevent thigh pressure point constriction.',
        'Die-cast steel base eliminates the structural creaks and wobble common in glass-filled nylon bases after 3 years.',
      ],
      contextualFit: 'Engineered for software engineers, traders, and creators who sit 8 to 12 hours daily and shift postures continuously.',
    },
    bestUseCases: [
      {
        title: 'Multi-Device Posture Switching (Laptop + Ultrawide + Tablet)',
        scenario: 'Frequent shifts from upright typing to reclined phone review or tablet sketching.',
        suitability: 'Optimal',
        notes: 'Armrests follow arm movement throughout 135 degrees of recline motion.',
      },
      {
        title: 'Taller & Heavy-Set Users (Up to 6ft 4in / 300 lbs)',
        scenario: 'Longer femur length requiring deep seat pan adjustment.',
        suitability: 'Optimal',
        notes: 'Seat pan depth slides up to 3 inches without exposing bare frame edges.',
      },
      {
        title: 'Non-Air Conditioned Hot & Humid Environments',
        scenario: 'Rooms above 28°C / 82°F without climate control.',
        suitability: 'Conditional',
        notes: 'Cushioned fabric seat holds more ambient body heat than full mesh seats.',
      },
    ],
    decisionReasoning: {
      unSponsoredVerdict: 'Brand new retail task chairs ($1,400+) carry inflated office dealer margins. Grade-A remanufactured units retain 100% of the die-cast steel structural integrity at a 42% discount while replacing all soft wear parts.',
      auditedTradeoffsAccepted: '4D armrest joints exhibit minor mechanical play (1.5mm tolerance) at maximum upper extension stops.',
      whatMarketCompetitorsGotWrong: 'Gaming chair manufacturers use bucket seat side bolsters designed for racecars, which rotate pelvis backward and pinch thighs together.',
    },
    alternativeProducts: [
      {
        id: 'alt-chair-1',
        name: 'Herman Miller Aeron (PosturedFit SL)',
        subtitle: 'Pellicle Mesh Climate Master',
        price: '$1,295',
        whenToChoose: 'Choose if you work in warm ambient climates and demand 100% airflow mesh over seat cushioning.',
        keyDifference: 'Superior thermal breathability, but rigid plastic seat frame edge restricts wide leg stance sitting postures.',
        pivotScore: 91,
      },
      {
        id: 'alt-chair-2',
        name: 'Herman Miller Sayl',
        subtitle: 'Y-Tower Suspension Compact Chair',
        price: '$795',
        whenToChoose: 'Choose if home office footprint is under 100 sq ft and lightweight aesthetic is preferred.',
        keyDifference: 'Compact footprint, but lacks 360-degree armrest articulation and deep seat depth adjustment.',
        pivotScore: 85,
      },
    ],
  },
  {
    id: 'dossier-espresso',
    dossierNumber: 'DOSSIER 03',
    category: 'Mechanical Engineering & Thermal Stability',
    title: 'An Analog-First Espresso Boiler Free of Display Failure Modes',
    subtitle: 'Heavy-duty brass solenoids, physical toggle switches, and a zero-touchscreen monoblock architecture.',
    heroQuote: '“Modern coffee machines fail because delicate microcontrollers sit directly above 100°C steam boilers. Profitec Go isolates its analog circuits for decades of home repairability.”',
    confidenceScore: 97,
    confidenceBreakdown: {
      ergonomicsOrAcoustics: 93,
      materialsDurability: 99,
      repairabilityIndex: 98,
      unbiasedValue: 96,
    },
    recommendedProduct: {
      name: 'Profitec Go (PID Monoblock)',
      modelCode: 'PROF-GO-STAINLESS',
      estimatedPrice: '$1,099',
      primaryMaterial: 'Heavy-gauge Stainless Steel Chassis & Brass Boiler',
      countryOfOrigin: 'Designed in Germany / Hand-assembled in Heidelberg',
      warrantyTerm: '3-Year Mechanical Component Guarantee',
    },
    whyRecommended: {
      thesis: 'Consumer espresso machines fail prematurely due to unshielded surface-mount PCBs glued directly above thermal boilers. Profitec Go uses industrial tactile toggle switches, an analog group-head pressure gauge, and standard commercial 58mm brass portafilters.',
      engineeringHighlights: [
        'Externally adjustable expansion valve (OPV) allows custom 9-bar pressure calibration without opening the machine casing.',
        'Brass boiler lined with food-grade nickel provides thermal mass stability within ±0.5°C during shot extraction.',
        'Zero glued sub-assemblies; every valve, silicone gasket, and heating element can be unbolted with standard wrenches.',
      ],
      contextualFit: 'Built for coffee purists and mechanical enthusiasts who value repairable German hardware over ephemeral touchscreens.',
    },
    bestUseCases: [
      {
        title: 'Daily Single-Origin Espresso Extraction',
        scenario: 'Pulling 2-4 precision espresso shots daily with exact 9-bar pressure profile.',
        suitability: 'Optimal',
        notes: 'PID temperature control allows 1°C incremental adjustments for light roasts.',
      },
      {
        title: 'Decadal Home Repairability',
        scenario: 'Maintaining a kitchen appliance for 10-20 years with off-the-shelf replacement parts.',
        suitability: 'Optimal',
        notes: 'Standard E61 group gaskets and brass solenoid valves available globally.',
      },
      {
        title: 'High-Speed Party Milk Steaming (>6 consecutive lattes)',
        scenario: 'Steaming milk for large dinner parties back-to-back.',
        suitability: 'Conditional',
        notes: 'Single boiler design requires a 45-second boiler ramp between espresso and steam phases.',
      },
    ],
    decisionReasoning: {
      unSponsoredVerdict: 'Automated bean-to-cup machines incorporate plastic internal gears that crack under bean density resistance. Profitec Go delivers true commercial 58mm extraction physics in a compact, repairable desktop chassis.',
      auditedTradeoffsAccepted: 'Single boiler dual-use requires a 45-second thermal transition phase between pulling espresso and steaming milk.',
      whatMarketCompetitorsGotWrong: 'Competitors lock users into proprietary portafilter sizes (54mm) and sell sealed thermoblocks that cannot be descaled when mineral buildup occurs.',
    },
    alternativeProducts: [
      {
        id: 'alt-esp-1',
        name: 'Flair 58+ Manual Lever Espresso',
        subtitle: 'Zero Electrical Pump Lever Unit',
        price: '$640',
        whenToChoose: 'Choose if you want absolute manual pressure profiling freedom and zero pump motor noise.',
        keyDifference: 'Requires manual arm pressure and external milk frothing device, but has zero moving motor parts.',
        pivotScore: 92,
      },
      {
        id: 'alt-esp-2',
        name: 'Lelit Mara X (V2 Dual Probe)',
        subtitle: 'Heat Exchanger Simultaneous Steam Machine',
        price: '$1,699',
        whenToChoose: 'Choose if you regularly prepare back-to-back milk lattes for multi-person households.',
        keyDifference: 'Allows simultaneous espresso extraction and milk steaming, but increases footprint and cost by 55%.',
        pivotScore: 89,
      },
    ],
  },
];


export interface ComparisonStudioProduct {
  id: string;
  name: string;
  tagline: string;
  price: number;
  isWinner: boolean;
  decisionScore: number;
  confidenceMeter: number;
  badge: string;
  image?: string;
  pros: { title: string; detail: string }[];
  cons: { title: string; detail: string; severity: 'low' | 'medium' | 'high' }[];
  budgetAnalysis: {
    upfrontPrice: number;
    maintenance5Yr: number;
    resale5Yr: number;
    realCostPerYear: number;
    valueRating: string;
  };
  expandableSpecs: {
    ergonomicsAndComfort: string;
    buildMaterials: string;
    repairabilityAndParts: string;
    softwareDependence: string;
  };
}

export interface TradeoffVector {
  id: string;
  vectorName: string;
  description: string;
  lowLabel: string;
  highLabel: string;
  productScores: Record<string, { score: number; label: string; detail: string }>;
}

export interface ComparisonStudioCategory {
  id: string;
  title: string;
  categoryLabel: string;
  userContextQuery: string;
  aiVerdict: {
    winningProductId: string;
    winningProductName: string;
    decisionScore: number;
    confidenceMeter: number;
    verdictSummary: string;
    keyReasonToBuy: string;
    budgetVerdict: string;
  };
  tradeoffVectors: TradeoffVector[];
  products: ComparisonStudioProduct[];
}

export const MOCK_COMPARISON_STUDIOS: ComparisonStudioCategory[] = [
  {
    id: 'studio-audio',
    title: 'Acoustic Architecture & Eyeglass Ergonomics',
    categoryLabel: 'Audio Hardware Comparison',
    userContextQuery: 'Evaluating noise-canceling headphones for 8-hour continuous coding sessions while wearing prescription glasses frames.',
    aiVerdict: {
      winningProductId: 'bose-qc-ultra',
      winningProductName: 'Bose QuietComfort Ultra',
      decisionScore: 96,
      confidenceMeter: 94,
      verdictSummary: 'Bose QuietComfort Ultra takes the top verdict due to asymmetric memory foam channels that exert 38% less temporal clamping force against eyeglass frames compared to Sony and Apple.',
      keyReasonToBuy: 'Zero frame-pinching pressure during long sessions with active low-frequency ANC.',
      budgetVerdict: 'Priced at $429 with high resale liquidity ($210 after 5 years). Lowest total cost per wear hour for eyeglass wearers.',
    },
    tradeoffVectors: [
      {
        id: 'vector-1',
        vectorName: 'Lateral Clamping Force vs Acoustic Seal',
        description: 'Lower clamping force prevents temporal eyeglass headaches but risks slight acoustic sub-bass seal loss during rapid head motion.',
        lowLabel: 'Gentle (3.2N)',
        highLabel: 'Tight (5.8N)',
        productScores: {
          'bose-qc-ultra': { score: 35, label: '3.4 Newtons', detail: 'Optimal for eyeglasses; zero temporal pressure' },
          'sony-xm5': { score: 75, label: '5.2 Newtons', detail: 'High seal, but pinches eyeglass arms after 90m' },
          'airpods-max': { score: 85, label: '5.6 Newtons', detail: 'Heavy stainless headband exerts firm side pressure' },
          'sennheiser-m4': { score: 50, label: '4.2 Newtons', detail: 'Balanced pressure with thick plush ear padding' },
        },
      },
      {
        id: 'vector-2',
        vectorName: 'Physical Tactile Controls vs Touch Surface Sensitivity',
        description: 'Physical switches work reliably in winter and with gloves, while capacitive swipe surfaces risk accidental track pauses.',
        lowLabel: '100% Tactile Switches',
        highLabel: 'Capacitive Touch Only',
        productScores: {
          'bose-qc-ultra': { score: 20, label: 'Physical + Volume Strip', detail: 'Toggle switch for power/pairing, touch strip for volume' },
          'sony-xm5': { score: 90, label: 'Full Capacitive Panel', detail: 'Swipe gestures on right earcup; prone to accidental pauses' },
          'airpods-max': { score: 10, label: 'Digital Crown + Button', detail: 'Tactile mechanical crown watch dial for precision steps' },
          'sennheiser-m4': { score: 80, label: 'Touch Panel Dominant', detail: 'Pinch-to-zoom transparency gesture surface' },
        },
      },
      {
        id: 'vector-3',
        vectorName: 'Structural Chassis Mass & Neck Strain Index',
        description: 'Lighter headband materials reduce cervical spine fatigue during 8+ hour sedentary desk sessions.',
        lowLabel: 'Ultra-Light (250g)',
        highLabel: 'Heavy Metal (385g)',
        productScores: {
          'bose-qc-ultra': { score: 25, label: '254 grams', detail: 'Featherweight plastic alloy yoke; zero top-head pressure' },
          'sony-xm5': { score: 20, label: '250 grams', detail: 'Extremely lightweight, but non-folding headband yoke' },
          'airpods-max': { score: 95, label: '385 grams', detail: 'Stainless steel arms & aluminum earcups cause neck fatigue' },
          'sennheiser-m4': { score: 45, label: '293 grams', detail: 'Comfortable weight distribution across fabric headband' },
        },
      },
    ],
    products: [
      {
        id: 'bose-qc-ultra',
        name: 'Bose QuietComfort Ultra',
        tagline: 'Precision Asymmetric Cushioning for Eyeglass Clearance',
        price: 429,
        isWinner: true,
        decisionScore: 96,
        confidenceMeter: 94,
        badge: 'Top Decision Pick',
        pros: [
          { title: 'Zero Frame Pressure', detail: 'Asymmetric foam cavity creates zero temporal arm pinching' },
          { title: 'Sub-200Hz ANC Isolation', detail: 'Silences ambient HVAC & jet engine low-frequency rumble' },
          { title: 'Physical Power Toggle', detail: 'Hardware switch prevents standby battery drain in travel bag' },
          { title: 'Immersive Spatial Audio', detail: 'Onboard DSP head-tracking without requiring source phone app' },
        ],
        cons: [
          { title: 'Proprietary Pad Clips', detail: 'Earpad replacements require custom $38 snap rings', severity: 'medium' },
          { title: 'Microphone Wind Noise', detail: 'Outdoor gusty wind creates minor microphone flutter', severity: 'low' },
        ],
        budgetAnalysis: {
          upfrontPrice: 429,
          maintenance5Yr: 76,
          resale5Yr: 210,
          realCostPerYear: 59,
          valueRating: 'Optimal TCO Ratio',
        },
        expandableSpecs: {
          ergonomicsAndComfort: 'Asymmetric protein leather cups with dual-density memory foam. Clamping force tuned to 3.4N.',
          buildMaterials: 'Anodized aluminum yokes with glass-filled polymer earcups and plush microfiber headband cushion.',
          repairabilityAndParts: 'User-replaceable earpads and headband cushion. Battery service available via authorized Bose repair centers.',
          softwareDependence: 'Full standalone operation via physical toggle switches. Companion app only needed for custom EQ profiles.',
        },
      },
      {
        id: 'sony-xm5',
        name: 'Sony WH-1000XM5',
        tagline: 'High-Bitrate LDAC & Dual-Processor Noise Cancellation',
        price: 398,
        isWinner: false,
        decisionScore: 89,
        confidenceMeter: 88,
        badge: 'Acoustic Runner-Up',
        pros: [
          { title: 'Dual V1 Processor ANC', detail: 'Market-leading high-frequency voice & office noise suppression' },
          { title: 'Hi-Res LDAC Support', detail: '990kbps wireless streaming codec for lossless audio files' },
          { title: '8 Beamforming Microphones', detail: 'Exceptional call clarity with AI noise suppression filter' },
        ],
        cons: [
          { title: 'Frame Pressure Points', detail: '5.2N clamping force pinches eyeglass arms against temples', severity: 'high' },
          { title: 'Non-Folding Yoke', detail: 'Occupies 35% larger volume in backpack or travel case', severity: 'medium' },
          { title: 'Auto-ANC App Lock', detail: 'Auto-optimizer adjusts ANC unexpectedly without manual override', severity: 'medium' },
        ],
        budgetAnalysis: {
          upfrontPrice: 398,
          maintenance5Yr: 60,
          resale5Yr: 180,
          realCostPerYear: 55,
          valueRating: 'Strong Budget Fit',
        },
        expandableSpecs: {
          ergonomicsAndComfort: 'Soft-fit synthetic leather earcups. Stepless friction slider headband with 5.2N clamping force.',
          buildMaterials: 'Recycled ABS plastic housing with silent friction arm joints.',
          repairabilityAndParts: 'Clip-on earpads available from 3rd parties ($25). Non-removable internal battery.',
          softwareDependence: 'High dependence on Sony Headphones Connect app for adaptive sound control & auto-optimizer.',
        },
      },
      {
        id: 'airpods-max',
        name: 'Apple AirPods Max',
        tagline: 'Machined Stainless Steel Yoke & Computational Audio',
        price: 549,
        isWinner: false,
        decisionScore: 84,
        confidenceMeter: 82,
        badge: 'Luxury Ecosystem Pick',
        pros: [
          { title: 'Digital Crown Dial', detail: 'Unmatched tactile tactile volume control wheel' },
          { title: 'Knit Mesh Canopy', detail: 'Distributes weight across crown of head without hotspot' },
          { title: 'Seamless Apple Switch', detail: 'Instant audio handoff across Mac, iPad, and iPhone' },
        ],
        cons: [
          { title: '385g Heavy Mass', detail: 'Causes noticeable cervical neck strain after 3 hours', severity: 'high' },
          { title: 'No Power Button', detail: 'Requires Smart Case to enter low power state, draining battery', severity: 'high' },
          { title: 'Condensation Buildup', detail: 'Moisture gathers inside aluminum earcups during long sessions', severity: 'medium' },
        ],
        budgetAnalysis: {
          upfrontPrice: 549,
          maintenance5Yr: 150,
          resale5Yr: 280,
          realCostPerYear: 83,
          valueRating: 'Premium Investment',
        },
        expandableSpecs: {
          ergonomicsAndComfort: 'Acoustically engineered memory foam ear cushions with magnetic attachment. 5.6N clamping force.',
          buildMaterials: 'Anodized aluminum earcups, stainless steel telescoping arms, breathable knit mesh headband canopy.',
          repairabilityAndParts: 'Magnetic snap-on ear cushions ($69 replacement). Zero user-serviceable screws.',
          softwareDependence: 'Requires iOS/macOS for spatial audio tracking and firmware updates. Limited function on Windows/Android.',
        },
      },
      {
        id: 'sennheiser-m4',
        name: 'Sennheiser Momentum 4',
        tagline: '60-Hour Marathon Battery & Audiophile Tuning',
        price: 379,
        isWinner: false,
        decisionScore: 87,
        confidenceMeter: 85,
        badge: 'Battery Endurance Champion',
        pros: [
          { title: '60-Hour Battery Life', detail: 'Requires charging only once every two weeks of work sessions' },
          { title: '42mm Transducer Sound', detail: 'Deep musical bass response with natural acoustic soundstage' },
          { title: 'Fast USB-C Passthrough', detail: 'Supports 24-bit/96kHz wired digital audio over USB-C' },
        ],
        cons: [
          { title: 'Moderate ANC Depth', detail: 'ANC is 15% less effective at blocking sudden high-pitch noises', severity: 'medium' },
          { title: 'Fussy Wear Sensor', detail: 'Auto-pause wear sensors trigger inadvertently when moving head', severity: 'medium' },
        ],
        budgetAnalysis: {
          upfrontPrice: 379,
          maintenance5Yr: 45,
          resale5Yr: 150,
          realCostPerYear: 54,
          valueRating: 'High Endurance Value',
        },
        expandableSpecs: {
          ergonomicsAndComfort: 'Padded textile headband with deep synthetic ear cushions. 4.2N clamping pressure.',
          buildMaterials: 'Textile-wrapped headband top with matte polycarbonate earcups.',
          repairabilityAndParts: 'Standard snap-fit earpads ($30). Easily accessible battery compartment for authorized techs.',
          softwareDependence: 'Sennheiser Smart Control app provides 5-band EQ and zone-based sound setting presets.',
        },
      },
    ],
  },
  {
    id: 'studio-chair',
    title: 'Kinetic Ergonomics & Spinal Alignment',
    categoryLabel: 'Task Chair Comparison',
    userContextQuery: 'Evaluating task chairs for 10-hour daily coding sessions under $900 budget with focus on lumbar posture and durability.',
    aiVerdict: {
      winningProductId: 'steelcase-gesture',
      winningProductName: 'Steelcase Gesture (Remanufactured)',
      decisionScore: 95,
      confidenceMeter: 92,
      verdictSummary: 'Steelcase Gesture Remanufactured wins due to its 360-degree articulating arms that match modern multi-device posture switching without rigid frame edges.',
      keyReasonToBuy: 'Dynamic core spine tracking that adjusts as you shift positions without forcing artificial lumbar curves.',
      budgetVerdict: 'At $840 remanufactured with a 12-year frame warranty, it delivers $1,400+ new chair performance at a 40% savings.',
    },
    tradeoffVectors: [
      {
        id: 'chair-vec-1',
        vectorName: 'Full Breathable Mesh vs Contoured Cushioned Seat',
        description: 'Mesh offers maximum thermal airflow in warm rooms, while cushioned foam prevents thigh perimeter pressure pinching.',
        lowLabel: 'Contoured Cushion',
        highLabel: 'Suspension Mesh',
        productScores: {
          'steelcase-gesture': { score: 20, label: 'Dual-Density Foam', detail: 'Air pockets under seat prevent thigh edge numbness' },
          'herman-aeron': { score: 95, label: 'Pellicle 8Z Mesh', detail: '100% breathable suspension; cooler in non-AC rooms' },
          'herman-sayl': { score: 40, label: 'Foam Seat + Elastomer Back', detail: 'Hybrid elastomer web back with padded seat cushion' },
        },
      },
      {
        id: 'chair-vec-2',
        vectorName: 'Armrest Axis Articulation & Device Posture',
        description: '360-degree armrests follow wrist angle when holding phone or typing on split keyboards.',
        lowLabel: 'Fixed Height',
        highLabel: '360° Spherical Pivot',
        productScores: {
          'steelcase-gesture': { score: 98, label: '360° Ball-and-Socket', detail: 'Moves inward for phone use, outward for wide mouse tracking' },
          'herman-aeron': { score: 65, label: '3D Pivot Arms', detail: 'Height, depth, and angle pivot; no lateral width shift' },
          'herman-sayl': { score: 50, label: '4D Standard Track', detail: 'Standard linear adjustments with slight friction play' },
        },
      },
    ],
    products: [
      {
        id: 'steelcase-gesture',
        name: 'Steelcase Gesture (Remanufactured)',
        tagline: '360-Degree Armrest Articulation for Multi-Device Posture',
        price: 840,
        isWinner: true,
        decisionScore: 95,
        confidenceMeter: 92,
        badge: 'Top Decision Pick',
        pros: [
          { title: '360-Degree Arm Movement', detail: 'Supports typing, tablet, and smartphone holding positions' },
          { title: 'CoreCentric Lumbar Track', detail: 'Flexes with human spinal shifts without hard plastic edges' },
          { title: 'Flexible Seat Edge', detail: 'Prevents pressure on hamstring tendons during deep recline' },
        ],
        cons: [
          { title: 'Warmer Seat Foam', detail: 'Holds more ambient body heat than full mesh seats in hot rooms', severity: 'medium' },
          { title: 'Heavy Die-Cast Frame', detail: 'Chair weighs 58 lbs; requires two hands to lift over stairs', severity: 'low' },
        ],
        budgetAnalysis: {
          upfrontPrice: 840,
          maintenance5Yr: 0,
          resale5Yr: 520,
          realCostPerYear: 64,
          valueRating: 'Outstanding Value',
        },
        expandableSpecs: {
          ergonomicsAndComfort: 'Pneumatic height cylinder with synchronized 3D recline. 360-degree ball-joint armrests.',
          buildMaterials: 'Die-cast aluminum structural base, glass-filled nylon back shell, high-resilience remanufactured foam.',
          repairabilityAndParts: 'All cylinder components and casters are modular and standard 2-inch fitment.',
          softwareDependence: '100% mechanical analog adjustments; zero electronics or sensors.',
        },
      },
      {
        id: 'herman-aeron',
        name: 'Herman Miller Aeron (PosturedFit SL)',
        tagline: 'Iconic 8Z Pellicle Suspension Mesh Architecture',
        price: 1295,
        isWinner: false,
        decisionScore: 91,
        confidenceMeter: 90,
        badge: 'Mesh Benchmark',
        pros: [
          { title: 'Unmatched Thermal Mesh', detail: '100% airflow mesh eliminates seat sweating entirely' },
          { title: 'PostureFit SL Dual Pads', detail: 'Supports both sacrum and lumbar spine independently' },
          { title: '12-Year Factory Warranty', detail: 'Industry-best structural warranty covering all mechanical parts' },
        ],
        cons: [
          { title: 'Rigid Hard Frame Edge', detail: 'Plastic seat perimeter cuts into thighs if sitting cross-legged', severity: 'high' },
          { title: 'Strict Sizing (A/B/C)', detail: 'Must buy exact size; non-adjustable seat pan depth', severity: 'medium' },
        ],
        budgetAnalysis: {
          upfrontPrice: 1295,
          maintenance5Yr: 0,
          resale5Yr: 800,
          realCostPerYear: 99,
          valueRating: 'High Resale Asset',
        },
        expandableSpecs: {
          ergonomicsAndComfort: 'Zonal pellicle tension mesh. PostureFit SL sacral support. Harmonic 2 tilt mechanism.',
          buildMaterials: 'Recycled aluminum frame base and composite plastic rim.',
          repairabilityAndParts: 'Modular replacement parts widely available worldwide due to 30-year production run.',
          softwareDependence: '100% mechanical levers and tilt tension controls.',
        },
      },
      {
        id: 'herman-sayl',
        name: 'Herman Miller Sayl',
        tagline: 'Y-Tower Suspension Elastomer Compact Chair',
        price: 795,
        isWinner: false,
        decisionScore: 85,
        confidenceMeter: 84,
        badge: 'Compact Space Pick',
        pros: [
          { title: 'Frameless Back Elastomer', detail: 'Y-Tower suspension offers unrestricted torso twisting' },
          { title: 'Compact Footprint', detail: 'Ideal for small apartment desks under 100 sq ft' },
          { title: 'Lightweight Mobility', detail: 'Weighs 37 lbs; easy to slide across timber floors' },
        ],
        cons: [
          { title: 'Basic Lumbar Support', detail: 'Optional lumbar bar is basic plastic slider with limited travel', severity: 'medium' },
          { title: 'No Forward Tilt', detail: 'Standard model lacks forward posture tilt feature', severity: 'low' },
        ],
        budgetAnalysis: {
          upfrontPrice: 795,
          maintenance5Yr: 0,
          resale5Yr: 420,
          realCostPerYear: 75,
          valueRating: 'Compact Budget Fit',
        },
        expandableSpecs: {
          ergonomicsAndComfort: 'Elastomer web strands vary in thickness for lumbar vs upper back support.',
          buildMaterials: 'Injected molded polymer back with eco-textile upholstered foam seat.',
          repairabilityAndParts: 'Standard gas cylinder and casters.',
          softwareDependence: '100% mechanical adjustment controls.',
        },
      },
    ],
  },
];

export const MOCK_BUYING_SCENARIOS: BuyingScenario[] = [
  {
    id: 'headphones',
    category: 'Audio Architecture',
    query: 'Noise-canceling headphones for 8-hour coding sessions that do not press on glasses frames',
    targetBudget: '$350 - $450',
    confidenceScore: 94,
    verdict: 'High-confidence alignment with Sony WH-1000XM5 and Bose QuietComfort Ultra, but Bose wins on zero frame-pressure headband geometry.',
    tradeoffs: [
      {
        label: 'Clamping Force vs Acoustic Seal',
        impact: 'medium',
        description: 'Lower clamping pressure reduces sub-bass seal slightly when moving head rapidly.',
      },
      {
        label: 'Folding Hinge Durability',
        impact: 'high',
        description: 'Non-folding yoke arms increase travel case volume by 35%.',
      },
    ],
    hiddenTraps: [
      'Automatic ANC auto-adjust cannot be permanently disabled in app version 4.2 without offline mode',
      'Earpad replacement requires proprietary twist-clip ($38 replacement cost)',
    ],
    durabilityRating: '4.8 / 5.0 (Audited 1,200h driver fatigue test)',
    topRecommendation: {
      name: 'Bose QuietComfort Ultra (Custom Seal)',
      subtitle: 'Engineered for zero-pressure eyeglass clearance & passive acoustic damping',
      estimatedPrice: '$429',
      matchReasons: [
        'Oval earcup cavity prevents arm pinches on acetate frames',
        'Physical power switch avoids standby battery drain',
        'Multipoint Bluetooth seamlessly bridges laptop & phone without app re-pair',
      ],
    },
  },
  {
    id: 'chair',
    category: 'Ergonomic Hardware',
    query: 'Ergonomic task chair for lumbar support during 10-hour desk sessions under $900',
    targetBudget: '$600 - $900',
    confidenceScore: 89,
    verdict: 'Herman Miller Sayl & Steelcase Gesture refurb tops new retail options; Steelcase Series 2 provides best out-of-box mesh tension.',
    tradeoffs: [
      {
        label: 'Mesh Back vs Cushioned Seat',
        impact: 'low',
        description: 'Full mesh seats require climate control to prevent lower thigh pressure point chill.',
      },
      {
        label: 'Armrest Axis Flexibility',
        impact: 'medium',
        description: '4D armrests add slight mechanical play at maximum height extension.',
      },
    ],
    hiddenTraps: [
      'Standard cylinder bottoms out on plush carpet without hard-floor caster upgrade ($25 extra)',
      'Fabric mesh variant absorbs dust; micro-vacuuming required bi-monthly',
    ],
    durabilityRating: '4.9 / 5.0 (12-year manufacturer frame warranty)',
    topRecommendation: {
      name: 'Steelcase Gesture (Remanufactured Precision)',
      subtitle: '360-degree adaptive armrests designed for multi-device posture switching',
      estimatedPrice: '$840',
      matchReasons: [
        'CoreCentric lumbar track maintains natural S-curve without hard plastic edges',
        'Seat depth slide accommodates longer femur length without knee constriction',
        'Metal die-cast base eliminates structural squeaks over 5+ year lifespan',
      ],
    },
  },
  {
    id: 'espresso',
    category: 'Mechanical Engineering',
    query: 'Manual lever or dual-boiler espresso machine with zero electronic display failure points',
    targetBudget: '$1,200 - $1,800',
    confidenceScore: 96,
    verdict: 'Flair 58+ or Profitec Go offer maximum mechanical repairability and standard 58mm portafilter compatibility.',
    tradeoffs: [
      {
        label: 'Manual Temperature Profiling',
        impact: 'low',
        description: 'Requires 12-minute portafilter preheat time before first extraction.',
      },
      {
        label: 'Steam Wand Throughput',
        impact: 'medium',
        description: 'Single-boiler PID architecture requires 45-second steam transition phase.',
      },
    ],
    hiddenTraps: [
      'Descaling with vinegar corrodes brass solenoid valves; organic citric acid required',
      'Stock tamper has 0.4mm side clearance causing subtle edge channeling',
    ],
    durabilityRating: '5.0 / 5.0 (Full mechanical component replacement availability)',
    topRecommendation: {
      name: 'Profitec Go (PID Monoblock)',
      subtitle: 'Single-boiler German precision unit with brass boiler and analog pressure gauge',
      estimatedPrice: '$1,099',
      matchReasons: [
        'Zero touchscreen microcontrollers; physical heavy-duty toggle switches',
        'Externally adjustable expansion valve (OPV) for custom 9-bar extraction',
        'Standard commercial 58mm group head with stainless steel boiler lining',
      ],
    },
  },
];

export interface DecisionLedgerItem {
  id: string;
  title: string;
  category: string;
  decisionDate: string;
  purchasePrice: string;
  confidenceAtPurchase: number;
  outcomeStatus: 'Loved & Kept' | 'Under 90-Day Audit' | 'Pivot Swapped' | 'Deliberating';
  regretScore: number; // e.g. 0% = no regret
  auditNotes: string;
  unsponsoredPivotSavings: string;
  usageFrequency: string;
  dossierRef?: string;
  image?: string;
}

export interface SavedRecommendationItem {
  id: string;
  productName: string;
  category: string;
  confidenceScore: number;
  price: string;
  status: 'Shortlisted' | 'Price Trigger' | 'Awaiting Monograph';
  reasonToBuy: string;
  triggerCondition: string;
  alternative: string;
  image?: string;
}

export interface WishlistItem {
  id: string;
  item: string;
  category: string;
  targetPrice: string;
  currentPrice: string;
  urgency: 'High' | 'Medium' | 'Low';
  whyInWishlist: string;
  nonSponsoredVerdict: string;
  image?: string;
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  category: string;
  eventSummary: string;
  verdictOutcome: string;
  confidenceScore: number;
  savedAmount: string;
  badge: string;
}

export interface DashboardInsights {
  shoppingHabitsProfile: {
    archetype: string;
    tagline: string;
    researchPeriodAvg: string;
    repairabilityBias: number;
    impulsePurchaseRate: string;
    brandLoyaltyIndex: string;
    topValuedQualities: string[];
  };
  budgetMetrics: {
    totalCapitalCommitted: string;
    totalSavedViaUnsponsoredPivots: string;
    regretAvoidanceRate: string;
    averageCostPerWearHour: string;
    categoryAllocation: { category: string; spent: string; percentage: number; color: string }[];
  };
  decisionLedger: DecisionLedgerItem[];
  savedRecommendations: SavedRecommendationItem[];
  wishlist: WishlistItem[];
  recommendationTimeline: TimelineMilestone[];
}

export const MOCK_DASHBOARD_INSIGHTS: DashboardInsights = {
  shoppingHabitsProfile: {
    archetype: 'The Anti-Obsolescence Pragmatist',
    tagline: 'Prioritizes decadal repairability, tactile analog hardware, and zero app-lock dependencies.',
    researchPeriodAvg: '14.2 Days per High-Intent Item',
    repairabilityBias: 94,
    impulsePurchaseRate: '0% (Mandatory 48-Hour Deliberation)',
    brandLoyaltyIndex: 'Spec & Material Agnostic (Zero Marketing Bias)',
    topValuedQualities: [
      'Decadal Mechanical Repairability',
      'Zero Software / App Dependency',
      'Tactile Analog Hardware Controls',
      'High Resale Secondary Liquidity',
    ],
  },
  budgetMetrics: {
    totalCapitalCommitted: '$3,420',
    totalSavedViaUnsponsoredPivots: '$1,280',
    regretAvoidanceRate: '100%',
    averageCostPerWearHour: '$0.42 / hour',
    categoryAllocation: [
      { category: 'Ergonomic Desk & Seating', spent: '$1,295', percentage: 38, color: 'emerald' },
      { category: 'Mechanical Engineering', spent: '$1,099', percentage: 32, color: 'amber' },
      { category: 'Audio Architecture', spent: '$828', percentage: 24, color: 'sky' },
      { category: 'Everyday Carry Mechanics', spent: '$198', percentage: 6, color: 'rose' },
    ],
  },
  decisionLedger: [
    {
      id: 'dec-01',
      title: 'Profitec Go PID Espresso Machine',
      category: 'Mechanical Engineering',
      decisionDate: 'May 14, 2026',
      purchasePrice: '$1,099',
      confidenceAtPurchase: 96,
      outcomeStatus: 'Loved & Kept',
      regretScore: 0,
      auditNotes: 'Completed 240+ extractions. Zero microcontroller errors. Analog pressure gauge provides real-time puck feedback.',
      unsponsoredPivotSavings: '+$450 saved vs dual-boiler display units',
      usageFrequency: 'Daily (2.4x / day)',
      dossierRef: 'DOS-2026-003',
    },
    {
      id: 'dec-02',
      title: 'Herman Miller Aeron (PostureFit SL)',
      category: 'Ergonomic Seating',
      decisionDate: 'March 2, 2026',
      purchasePrice: '$1,295',
      confidenceAtPurchase: 91,
      outcomeStatus: 'Loved & Kept',
      regretScore: 0,
      auditNotes: 'Eliminated lower back tightness during 9-hour coding stints. Mesh thermal airflow keeps seat zero-sweat in summer.',
      unsponsoredPivotSavings: '+$600 saved on remanufactured posture mesh',
      usageFrequency: 'Daily (9.5h / day)',
      dossierRef: 'DOS-2026-002',
    },
    {
      id: 'dec-03',
      title: 'Bose QuietComfort Ultra',
      category: 'Audio Architecture',
      decisionDate: 'January 18, 2026',
      purchasePrice: '$429',
      confidenceAtPurchase: 94,
      outcomeStatus: 'Under 90-Day Audit',
      regretScore: 2,
      auditNotes: 'Day 72 of 90-day trial. Asymmetric cushions completely eliminated eyeglass frame pinching on acetate arms.',
      unsponsoredPivotSavings: '+$120 saved vs AirPods Max neck strain',
      usageFrequency: '5x / week (4h / session)',
      dossierRef: 'DOS-2026-001',
    },
    {
      id: 'dec-04',
      title: 'Peak Design Everyday Backpack 20L V2',
      category: 'Everyday Carry',
      decisionDate: 'November 10, 2025',
      purchasePrice: '$259',
      confidenceAtPurchase: 88,
      outcomeStatus: 'Loved & Kept',
      regretScore: 0,
      auditNotes: 'MagLatch hardware holds tension flawlessly after 6 months of daily train commutes.',
      unsponsoredPivotSavings: '+$80 saved vs overhyped luxury leather bags',
      usageFrequency: 'Daily travel',
    },
  ],
  savedRecommendations: [
    {
      id: 'saved-01',
      productName: 'Steelcase Gesture Task Chair',
      category: 'Ergonomic Hardware',
      confidenceScore: 95,
      price: '$840',
      status: 'Shortlisted',
      reasonToBuy: '360-degree articulating arms follow wrist angles when using split mechanical keyboards.',
      triggerCondition: 'Acquire if daily desk hours exceed 10h/day or when current chair gas cylinder fails.',
      alternative: 'Herman Miller Sayl ($795)',
    },
    {
      id: 'saved-02',
      productName: 'Keychron Q1 Pro Wireless Custom Keyboard',
      category: 'Tactile Hardware',
      confidenceScore: 92,
      price: '$199',
      status: 'Price Trigger',
      reasonToBuy: 'Gasket-mounted CNC aluminum plate delivers damp acoustic resonance.',
      triggerCondition: 'Trigger purchase on secondary market refurbished batch under $165.',
      alternative: 'NuPhy Air75 V2 ($129)',
    },
    {
      id: 'saved-03',
      productName: 'Sennheiser Momentum 4 Headphones',
      category: 'Audio Hardware',
      confidenceScore: 87,
      price: '$379',
      status: 'Awaiting Monograph',
      reasonToBuy: '60-hour marathon battery life requiring charge only twice per month.',
      triggerCondition: 'Awaiting Teardown Monograph on headband textile fray resistance.',
      alternative: 'Sony WH-1000XM5 ($398)',
    },
  ],
  wishlist: [
    {
      id: 'wish-01',
      item: 'Anker Prime 27,650mAh Power Bank (250W)',
      category: 'Power Engineering',
      targetPrice: '$139',
      currentPrice: '$179',
      urgency: 'Medium',
      whyInWishlist: 'Fast USB-C PD 3.1 charging outputs 140W to power MacBook Pro at full speed during long flights.',
      nonSponsoredVerdict: 'Hold purchase until Amazon prime flash deal drops price by 22%.',
    },
    {
      id: 'wish-02',
      item: 'Framework Laptop 13 (Intel Core Ultra)',
      category: 'Computing Hardware',
      targetPrice: '$1,049',
      currentPrice: '$1,199',
      urgency: 'High',
      whyInWishlist: '100% modular expansion cards and user-replaceable mainboard & battery.',
      nonSponsoredVerdict: 'Top candidate for anti-obsolescence hardware setup.',
    },
    {
      id: 'wish-03',
      item: 'Fellow Stagg EKG Pro Electric Kettle',
      category: 'Thermal Mechanics',
      targetPrice: '$165',
      currentPrice: '$195',
      urgency: 'Low',
      whyInWishlist: 'PID temperature control holding water within 1°F for manual pour-over precision.',
      nonSponsoredVerdict: 'Current stovetop kettle works fine; upgrade only on secondary deal.',
    },
  ],
  recommendationTimeline: [
    {
      id: 'time-01',
      date: 'May 2026',
      title: 'Coffee Extraction Mechanics Solved',
      category: 'Mechanical Engineering',
      eventSummary: 'Transitioned from capsule pods to manual PID brass boiler extraction.',
      verdictOutcome: 'Profitec Go Selected (96% Confidence)',
      confidenceScore: 96,
      savedAmount: '$450 Saved',
      badge: 'High-Intent Milestones',
    },
    {
      id: 'time-02',
      date: 'March 2026',
      title: 'Lumbar Spinal Posture Overhaul',
      category: 'Ergonomics',
      eventSummary: 'Replaced sagging gaming chair with Herman Miller PostureFit mesh.',
      verdictOutcome: 'Aeron Size B Remanufactured (91% Confidence)',
      confidenceScore: 91,
      savedAmount: '$600 Saved',
      badge: 'Ergonomic Overhaul',
    },
    {
      id: 'time-03',
      date: 'January 2026',
      title: 'Acoustic & Eyeglass Frame Clearance',
      category: 'Audio Hardware',
      eventSummary: 'Evaluated Bose, Sony, and Apple over-ear noise cancellation headphones.',
      verdictOutcome: 'Bose QuietComfort Ultra Selected (94% Confidence)',
      confidenceScore: 94,
      savedAmount: '$120 Saved',
      badge: 'Acoustic Precision',
    },
    {
      id: 'time-04',
      date: 'November 2025',
      title: 'Everyday Carry Hardware Streamlining',
      category: 'Carry Gear',
      eventSummary: 'Selected weatherproof camera & laptop commuter pack with lifetime warranty.',
      verdictOutcome: 'Peak Design Everyday Backpack 20L V2 (88% Confidence)',
      confidenceScore: 88,
      savedAmount: '$80 Saved',
      badge: 'Carry Mechanics',
    },
  ],
};

