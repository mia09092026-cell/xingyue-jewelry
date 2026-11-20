import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeriesCatalog } from "@/components/series-catalog";
import {
  catalogSeriesMeta,
  getSeriesPageCount,
  getStockProductsBySeries,
  type StockSeries,
} from "@/lib/catalog";
import { createPageMetadata } from "@/lib/seo";

const PAGE_SIZE = 48;

type SeriesPageProps = {
  params: Promise<{ series: string; page: string }>;
};

const seriesValues = Object.keys(catalogSeriesMeta) as StockSeries[];

export function generateStaticParams() {
  return seriesValues.flatMap((series) => {
    const totalPages = getSeriesPageCount(series, PAGE_SIZE);
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
      series,
      page: String(index + 2),
    }));
  });
}

function readSeries(value: string): StockSeries | null {
  return seriesValues.includes(value as StockSeries) ? (value as StockSeries) : null;
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { series, page } = await params;
  const value = readSeries(series);
  if (!value) {
    return { title: "Series Not Found | ZARIVELLE" };
  }
  const meta = catalogSeriesMeta[value];
  return createPageMetadata({
    title: `${meta.title} Ready Stock — Page ${page} | ZARIVELLE`,
    description: meta.description,
    path: `/products/series/${value}/page/${page}`,
  });
}

export default async function SeriesPageNumber({ params }: SeriesPageProps) {
  const { series, page } = await params;
  const value = readSeries(series);
  const pageNumber = Number(page);
  if (
    !value ||
    !Number.isInteger(pageNumber) ||
    pageNumber < 2 ||
    pageNumber > getSeriesPageCount(value, PAGE_SIZE) ||
    getStockProductsBySeries(value).length === 0
  ) {
    notFound();
  }
  return <SeriesCatalog series={value} page={pageNumber} pageSize={PAGE_SIZE} />;
}
