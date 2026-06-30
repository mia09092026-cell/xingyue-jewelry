import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LocalizedCollectionPage from "./[locale]/collections/[slug]/page";
import LocalizedContactPage from "./[locale]/contact/page";
import LocalizedHomePage from "./[locale]/page";
import LocalizedProductsPage from "./[locale]/products/page";
import AboutPage from "./about/page";
import CollectionsPage from "./collections/page";
import ContactPage from "./contact/page";
import EducationPage from "./education/page";
import FaqPage from "./faq/page";
import Home from "./page";
import ProductsPage from "./products/page";
import ProductDetailPage from "./products/[slug]/page";

describe("XINGYUE independent site pages", () => {
  it("renders the Home page with wholesale and fine jewelry positioning", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByText(/XINGYUE/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Wholesale Moissanite Jewelry/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Lab-grown Diamond Jewelry/i).length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(
      /Moissanite Diamond Wholesale|first homepage version|can be added later|Sample Products/i,
    );
  });

  it("renders the Collections page", () => {
    render(<CollectionsPage />);

    expect(screen.getByRole("heading", { name: "Collections", level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/Bulk Loose Stone Supply/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Quality Testing/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Certificate Options/i).length).toBeGreaterThan(0);
    expect(screen.getAllByAltText(/B2B jewelry quality testing/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "Product Detail" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Custom Manufacturing/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "View Product" }).length).toBeGreaterThan(0);
  });

  it("renders the sample Product Detail page", async () => {
    const page = await ProductDetailPage({
      params: Promise.resolve({ slug: "moissanite-solitaire-ring" }),
    });

    render(page);

    expect(screen.getByRole("heading", { name: /Moonlight Moissanite Solitaire Ring/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Request Wholesale Quote/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bulk Loose Stone Supply/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Quality Testing Before Shipment/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sample & Packaging Support/i).length).toBeGreaterThan(0);
    expect(screen.getAllByAltText(/certificate and packaging support/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /Back to Wholesale Moissanite Jewelry/i }),
    ).toHaveAttribute("href", "/collections/moissanite-wholesale");
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(breadcrumb).toBeInTheDocument();
    expect(within(breadcrumb).getByRole("link", { name: "Wholesale Moissanite Jewelry" })).toHaveAttribute(
      "href",
      "/collections/moissanite-wholesale",
    );
  });

  it("renders the English Products and FAQ landing pages", () => {
    const productsPage = render(<ProductsPage />);

    expect(screen.getByRole("heading", { name: /B2B Jewelry Products/i })).toBeInTheDocument();
    expect(screen.getAllByText(/OEM \/ ODM/i).length).toBeGreaterThan(0);
    productsPage.unmount();

    render(<FaqPage />);
    expect(screen.getByRole("heading", { name: /FAQ/i })).toBeInTheDocument();
    expect(screen.getAllByText(/MOQ/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/WhatsApp/i).length).toBeGreaterThan(0);
  });

  it("renders the Education page", () => {
    const { container } = render(<EducationPage />);

    expect(screen.getByRole("heading", { name: /Education/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Moissanite/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Lab-grown Diamond/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /Buyer Knowledge Center/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Certificates & Materials/i })).toBeInTheDocument();
    expect(screen.getByAltText(/loose moissanite stones for wholesale buyers/i)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/[\u4e00-\u9fff]/);
  });

  it("renders the About Us page", () => {
    const { container } = render(<AboutPage />);

    expect(screen.getByRole("heading", { name: /About XINGYUE/i })).toBeInTheDocument();
    expect(screen.getAllByText(/overseas/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/15\+ Years/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1000\+ sqm/i).length).toBeGreaterThan(0);
    expect(screen.getByAltText(/XINGYUE jewelry factory workshop/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /One factory, one accountable workflow/i })).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/[\u4e00-\u9fff]/);
  });

  it("renders the Contact inquiry page", () => {
    const { container } = render(<ContactPage />);

    expect(screen.getByRole("heading", { name: /Request a Quote/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Contact Person")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone / WhatsApp")).toBeInTheDocument();
    expect(screen.getByLabelText("Company / Brand")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Estimated Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Delivery City")).toBeInTheDocument();
    expect(screen.getByLabelText("Budget Range")).toBeInTheDocument();
    expect(screen.getByLabelText("Requirements")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Inquiry/i })).toBeInTheDocument();
    const salesEmailLinks = screen.getAllByRole("link", { name: "Email: sales@xingyuejewelry.com" });
    expect(salesEmailLinks.map((link) => link.getAttribute("href"))).toContain(
      "mailto:sales@xingyuejewelry.com",
    );
    expect(
      screen.getByText(
        "For wholesale pricing, OEM/ODM customization, and catalog requests, please contact us by email or WhatsApp.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Email Your Inquiry/i })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry",
    );
    expect(container.textContent).not.toMatch(/front-end design only|next version|[\u4e00-\u9fff]/);
  });

  it("renders Arabic localized B2B pages with RTL buyer language", async () => {
    const home = await LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) });
    const { unmount } = render(home);

    expect(screen.getByRole("heading", { name: /مصنع مجوهرات الألماس المزروع/i })).toBeInTheDocument();
    expect(screen.getAllByText(/احصل على سعر الجملة/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/OEM \/ ODM/i).length).toBeGreaterThan(0);
    unmount();

    const contact = await LocalizedContactPage({ params: Promise.resolve({ locale: "ar" }) });
    render(contact);
    expect(screen.getByLabelText("الشخص المسؤول")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /أرسل استفساراً/i })).toBeInTheDocument();
    const salesEmailLinks = screen.getAllByRole("link", { name: "Email: sales@xingyuejewelry.com" });
    expect(salesEmailLinks.map((link) => link.getAttribute("href"))).toContain(
      "mailto:sales@xingyuejewelry.com",
    );
    expect(screen.getByRole("link", { name: /أرسل عبر البريد/i })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry",
    );
  });

  it("renders Spanish localized products and collection pages", async () => {
    const productsPage = await LocalizedProductsPage({ params: Promise.resolve({ locale: "es" }) });
    const { unmount } = render(productsPage);

    expect(screen.getByRole("heading", { name: /Productos B2B de joyería/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Solicitar precio mayorista/i).length).toBeGreaterThan(0);
    unmount();

    const collection = await LocalizedCollectionPage({
      params: Promise.resolve({ locale: "es", slug: "lab-grown-diamond-jewelry" }),
    });
    const collectionPage = render(collection);
    expect(
      screen.getByRole("heading", { name: /Fabricante de joyería con diamantes de laboratorio/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/IGI \/ GIA/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Contactar por WhatsApp/i })).toHaveAttribute(
      "href",
      "https://wa.me/8613324888759",
    );
    collectionPage.unmount();

    const contact = await LocalizedContactPage({ params: Promise.resolve({ locale: "es" }) });
    render(contact);
    const salesEmailLinks = screen.getAllByRole("link", { name: "Email: sales@xingyuejewelry.com" });
    expect(salesEmailLinks.map((link) => link.getAttribute("href"))).toContain(
      "mailto:sales@xingyuejewelry.com",
    );
    expect(screen.getByRole("link", { name: /Enviar por email/i })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Wholesale%20Jewelry%20Inquiry",
    );
  });
});
