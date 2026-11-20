import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeriesCatalog } from "@/components/series-catalog";
import {
  catalogSeriesMeta,
  getStockProductsBySeries,
  type StockSeries,
} from "@/lib/catalog";
import { createPageMetadata } from "@/lib/seo";

type SeriesPageProps = {
  params: Promise<{ series: string }>;
};

const seriesValues = Object.keys(catalogSeriesMeta) as StockSeries[];

export function generateStaticParams() {
  return seriesValues
    .filter((series) => getStockProductsBySeries(series).length > 0)
    .map((series) => ({ series }));
}

function readSeries(value: string): StockSeries | null {
  return seriesValues.includes(value as StockSeries) ? (value as StockSeries) : null;
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { series } = await params;
  const value = readSeries(series);
  if (!value) {
    return { title: "Series Not Found | ZARIVELLE" };
  }
  const meta = catalogSeriesMeta[value];
  return createPageMetadata({
    title: `${meta.title} Ready Stock | ZARIVELLE`,
    description: meta.description,
    path: `/products/series/${value}`,
  });
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series } = await params;
  const value = readSeries(series);
  if (!value || getStockProductsBySeries(value).length === 0) {
    notFound();
  }
  return <SeriesCatalog series={value} page={1} />;
}
