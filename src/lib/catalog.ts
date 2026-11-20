import { products, type Product, type ProductSeries } from "@/lib/site-data";

export type StockSeries = Exclude<ProductSeries, "sample">;

export const catalogSeriesOrder: StockSeries[] = [
  "loose-stones",
  "925-silver",
  "18k-gold",
  "other",
];

export const catalogSeriesMeta: Record<
  StockSeries,
  { title: string; copy: string; description: string }
> = {
  "loose-stones": {
    title: "Loose Stones",
    copy: "Lab-grown diamond loose stones in assorted shapes and sizes.",
    description:
      "Ready-stock lab-grown diamond loose stones for jewelers, brands and repair work. Shapes, sizes and availability are confirmed before quotation.",
  },
  "925-silver": {
    title: "925 Silver",
    copy: "Ready-stock 925 sterling silver jewelry.",
    description:
      "Ready-stock 925 sterling silver jewelry with lab-grown stones, moissanite and jade options. Mix any in-stock styles to reach the USD 800 order minimum.",
  },
  "18k-gold": {
    title: "18K Gold",
    copy: "Ready-stock 18K gold fine jewelry.",
    description:
      "Ready-stock 18K gold fine jewelry from the Limon collection. Styles, stone details and availability are confirmed before quotation.",
  },
  "14k-gold": {
    title: "14K Gold",
    copy: "Ready-stock 14K gold fine jewelry.",
    description:
      "Ready-stock 14K gold fine jewelry. Styles, stone details and availability are confirmed before quotation.",
  },
  other: {
    title: "Other / Material to Confirm",
    copy: "Ready-stock pieces whose material or stone type is confirmed on inquiry.",
    description:
      "Ready-stock jewelry where the material or stone type is confirmed on inquiry. SKUs are available for quotation and mixed orders.",
  },
};

const categoryOrder = [
  "Rings",
  "Earrings",
  "Necklaces",
  "Bracelets",
  "Bangles",
  "Pendants",
  "Loose Stones",
  "Other",
];

export function getStockProductsBySeries(series: StockSeries): Product[] {
  return products
    .filter((product) => product.orderType === "stock" && product.series === series)
    .sort((a, b) => {
      const categoryDiff =
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
      if (categoryDiff !== 0) {
        return categoryDiff;
      }
      return (a.sku ?? a.name).localeCompare(b.sku ?? b.name);
    });
}

export function getStockSeriesCounts(): Array<{
  series: StockSeries;
  count: number;
}> {
  return catalogSeriesOrder
    .map((series) => ({
      series,
      count: getStockProductsBySeries(series).length,
    }))
    .filter((entry) => entry.count > 0);
}

export function getSeriesPageCount(series: StockSeries, pageSize: number) {
  return Math.max(1, Math.ceil(getStockProductsBySeries(series).length / pageSize));
}
