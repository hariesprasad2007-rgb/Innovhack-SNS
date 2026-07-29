/**
 * CSV-backed product source. The browser fetches the uploaded dataset once;
 * the resolved promise is shared by every caller for the lifetime of the app.
 */
export interface Product {
  invoiceNo: string;
  stockCode: string;
  description: string;
  quantity: number;
  invoiceDate: string;
  unitPrice: number;
  customerId: string;
  country: string;
}

interface ProductSummary {
  stockCode: string;
  description: string;
  unitsSold: number;
  revenue: number;
  averageUnitPrice: number;
  countries: Set<string>;
}

export interface ComparisonStudioProduct {
  id: string;
  name: string;
  brand: string;
  modelCode: string;
  estimatedPrice: string;
  confidenceScore: number;
  isTopRecommendation: boolean;
  pros: string[];
  specs: { driverType: string; ancMode: string; batteryHours: number };
  image?: string;
}

export interface TradeoffVector {
  id: string;
  name: string;
  description: string;
}

export interface ComparisonStudioCategory {
  id: string;
  title: string;
  products: ComparisonStudioProduct[];
  tradeoffVectors: TradeoffVector[];
}

let productCache: Promise<ComparisonStudioCategory[]> | undefined;

const parseNumber = (value: string) => Number.parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;

// Handles quoted commas with a max row limit to maintain smooth UI performance.
const parseCsvRows = (csv: string, maxRows: number = 3000): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    if (rows.length >= maxRows) break;

    const character = csv[index];
    if (character === '"') {
      if (quoted && csv[index + 1] === '"') {
        field += '"';
        index += 1;
      } else quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && csv[index + 1] === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = '';
    } else field += character;
  }
  if (row.some((value) => value.trim()) && rows.length < maxRows) rows.push(row);
  return rows;
};

const toProduct = (headers: string[], values: string[]): Product => {
  const row = Object.fromEntries(headers.map((header, index) => [header.trim().toLowerCase(), values[index]?.trim() ?? '']));
  return {
    invoiceNo: row.invoiceno || row.invoice_no || row.invoice || '',
    stockCode: row.stockcode || row.stock_code || row.sku || row.productcode || '',
    description: row.description || row.productname || row.product_name || row.name || '',
    quantity: parseNumber(row.quantity || row.qty || '0'),
    invoiceDate: row.invoicedate || row.invoice_date || row.date || '',
    unitPrice: parseNumber(row.unitprice || row.unit_price || row.price || '0'),
    customerId: row.customerid || row.customer_id || row.customer || '',
    country: row.country || row.region || '',
  };
};

const toStudioProduct = (summary: ProductSummary, index: number): ComparisonStudioProduct => ({
  id: `csv-${summary.stockCode || index}`,
  name: summary.description || `Product ${summary.stockCode || index + 1}`,
  brand: summary.countries.size === 1 ? [...summary.countries][0] : 'Multi-market retail',
  modelCode: summary.stockCode || 'N/A',
  estimatedPrice: `$${summary.averageUnitPrice.toFixed(2)}`,
  confidenceScore: Math.max(50, 98 - index * 5),
  isTopRecommendation: index === 0,
  pros: [
    `${Math.max(0, summary.unitsSold).toLocaleString()} units recorded in dataset`,
    `$${summary.revenue.toLocaleString(undefined, { maximumFractionDigits: 2 })} recorded sales value`,
    `Available across ${summary.countries.size || 1} market${summary.countries.size === 1 ? '' : 's'}`,
  ],
  specs: {
    driverType: `SKU ${summary.stockCode || 'unavailable'}`,
    ancMode: `${summary.countries.size || 1} market${summary.countries.size === 1 ? '' : 's'} recorded`,
    batteryHours: Math.max(1, Math.round(summary.averageUnitPrice)),
  },
});

const DEFAULT_CURATED_STUDIOS: ComparisonStudioCategory[] = [
  {
    id: 'studio-audio',
    title: 'Acoustic Audio & ANC Headphones',
    products: [
      {
        id: 'aud-01',
        name: 'Bose QuietComfort Ultra',
        brand: 'Bose',
        modelCode: 'QC-ULTRA',
        estimatedPrice: '$429',
        confidenceScore: 96,
        isTopRecommendation: true,
        pros: [
          'Asymmetric earcup memory foam eliminates spectacle frame pinch',
          'Physical toggle switch prevents standby battery drain',
          'Snapdragon aptX low-latency transmission',
        ],
        specs: { driverType: '40mm Custom TriPort Dynamic', ancMode: 'CustomTune ANC & Aware', batteryHours: 24 },
      },
      {
        id: 'aud-02',
        name: 'Sony WH-1000XM5 Headphones',
        brand: 'Sony',
        modelCode: 'XM5-BLK',
        estimatedPrice: '$398',
        confidenceScore: 92,
        isTopRecommendation: false,
        pros: [
          'Dual V1 processors provide class-leading voice isolation',
          'Lightweight 250g synthetic leather chassis',
          'Auto NC Optimizer adapts to barometric pressure',
        ],
        specs: { driverType: '30mm Carbon Fiber Dome', ancMode: 'Dual Processor Auto NC', batteryHours: 30 },
      },
      {
        id: 'aud-03',
        name: 'Sennheiser Momentum 4 Wireless',
        brand: 'Sennheiser',
        modelCode: 'M4-AEBT',
        estimatedPrice: '$379',
        confidenceScore: 88,
        isTopRecommendation: false,
        pros: [
          '60-hour marathon battery playback per charge',
          'Audiophile 42mm transducer acoustic tuning',
          'Smart pause sensor on earcup removal',
        ],
        specs: { driverType: '42mm Audiophile Transducer', ancMode: 'Adaptive ANC', batteryHours: 60 },
      },
    ],
    tradeoffVectors: [
      { id: 'v-1', name: 'Eyeglass Frame Clearance', description: 'Lateral clamping force pressure against prescription glasses frames.' },
      { id: 'v-2', name: 'Microphone Isolation', description: 'Beamforming noise rejection during noisy video conference calls.' },
      { id: 'v-3', name: 'Battery Endurance', description: 'Continuous wireless playback hours per charging cycle.' },
    ],
  },
  {
    id: 'studio-ergo',
    title: 'Kinetic Task Chairs & Ergonomics',
    products: [
      {
        id: 'erg-01',
        name: 'Steelcase Gesture Task Chair',
        brand: 'Steelcase',
        modelCode: 'GESTURE-360',
        estimatedPrice: '$1,399',
        confidenceScore: 95,
        isTopRecommendation: true,
        pros: [
          '360-degree articulating armrests track arm movements',
          'Die-cast steel core rated for 12+ years continuous duty',
          'Zero plastic lumbar fatigue under heavy recline',
        ],
        specs: { driverType: '360° Articulating Joint', ancMode: 'Dynamic Core Flex', batteryHours: 12 },
      },
      {
        id: 'erg-02',
        name: 'Herman Miller Aeron PostureFit',
        brand: 'Herman Miller',
        modelCode: 'AERON-B',
        estimatedPrice: '$1,495',
        confidenceScore: 91,
        isTopRecommendation: false,
        pros: [
          'Pellicle 8Z breathable mesh eliminates heat traps',
          'Dual PostureFit SL sacral back support',
          '100% recyclable aluminum chassis',
        ],
        specs: { driverType: 'Pellicle 8Z Elastomer', ancMode: 'PostureFit Sacral', batteryHours: 12 },
      },
    ],
    tradeoffVectors: [
      { id: 've-1', name: 'Armrest Articulation', description: 'Range of arm joint movement for typing and tablet usage.' },
      { id: 've-2', name: 'Thermal Dissipation', description: 'Mesh vs foam seat heat accumulation over 8-hour sessions.' },
    ],
  },
];

const createStudios = (products: Product[]): ComparisonStudioCategory[] => {
  const summaries = new Map<string, ProductSummary>();
  products.forEach((product) => {
    if (!product.stockCode && !product.description) return;
    const key = product.stockCode || product.description;
    const summary = summaries.get(key) || {
      stockCode: product.stockCode,
      description: product.description,
      unitsSold: 0,
      revenue: 0,
      averageUnitPrice: 0,
      countries: new Set<string>(),
    };
    summary.unitsSold += product.quantity;
    summary.revenue += product.quantity * product.unitPrice;
    summary.averageUnitPrice = summary.unitsSold > 0 ? summary.revenue / summary.unitsSold : product.unitPrice;
    if (product.country) summary.countries.add(product.country);
    summaries.set(key, summary);
  });

  const valid = [...summaries.values()].filter((product) => product.description && product.averageUnitPrice >= 0);
  const volume = [...valid].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 6);
  const revenue = [...valid].sort((a, b) => b.revenue - a.revenue).slice(0, 6);
  const vectors: TradeoffVector[] = [
    { id: 'sales-volume', name: 'Recorded Sales Volume', description: 'Comparison based on quantities in the uploaded CSV.' },
    { id: 'sales-value', name: 'Recorded Sales Value', description: 'Comparison based on quantity multiplied by unit price in the uploaded CSV.' },
  ];

  const csvCategories: ComparisonStudioCategory[] = [
    { id: 'csv-volume', title: 'Highest Recorded Sales Volume', products: volume.map(toStudioProduct), tradeoffVectors: vectors },
    { id: 'csv-revenue', title: 'Highest Recorded Sales Value', products: revenue.map(toStudioProduct), tradeoffVectors: vectors },
  ];

  return [...DEFAULT_CURATED_STUDIOS, ...csvCategories];
};

export const ProductService = {
  loadComparisonStudios(): Promise<ComparisonStudioCategory[]> {
    productCache ??= fetch('/products.csv')
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load uploaded CSV (${response.status})`);
        return response.text();
      })
      .then((csv) => {
        const [headers = [], ...rows] = parseCsvRows(csv, 3000);
        return createStudios(rows.map((row) => toProduct(headers, row)));
      })
      .catch((err) => {
        console.warn('ProductService: Using default curated comparison studios fallback.', err);
        return DEFAULT_CURATED_STUDIOS;
      });
    return productCache;
  },
};
