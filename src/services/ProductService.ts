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

// Handles quoted commas and escaped quotes without adding a parsing dependency.
const parseCsvRows = (csv: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
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
  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
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
    `${Math.max(0, summary.unitsSold).toLocaleString()} units recorded in the uploaded dataset`,
    `$${summary.revenue.toLocaleString(undefined, { maximumFractionDigits: 2 })} recorded sales value`,
    `Available across ${summary.countries.size || 1} market${summary.countries.size === 1 ? '' : 's'}`,
  ],
  specs: {
    driverType: `SKU ${summary.stockCode || 'unavailable'}`,
    ancMode: `${summary.countries.size || 1} market${summary.countries.size === 1 ? '' : 's'} recorded`,
    batteryHours: Math.max(1, Math.round(summary.averageUnitPrice)),
  },
});

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
  return [
    { id: 'csv-volume', title: 'Highest Recorded Sales Volume', products: volume.map(toStudioProduct), tradeoffVectors: vectors },
    { id: 'csv-revenue', title: 'Highest Recorded Sales Value', products: revenue.map(toStudioProduct), tradeoffVectors: vectors },
  ];
};

export const ProductService = {
  loadComparisonStudios(): Promise<ComparisonStudioCategory[]> {
    productCache ??= fetch('/products.csv')
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load uploaded CSV (${response.status})`);
        return response.text();
      })
      .then((csv) => {
        const [headers = [], ...rows] = parseCsvRows(csv);
        return createStudios(rows.map((row) => toProduct(headers, row)));
      });
    return productCache;
  },
};
