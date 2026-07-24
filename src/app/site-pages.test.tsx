import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LocalizedCollectionPage from "./[locale]/collections/[slug]/page";
import LocalizedContactPage from "./[locale]/contact/page";
import LocalizedHomePage from "./[locale]/page";
import LocalizedProductsPage from "./[locale]/products/page";
import LocalizedAboutPage from "./[locale]/about/page";
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
    expect(
      screen.getByRole("heading", { name: /Products & Manufacturing Capabilities/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Lab Grown Diamond Jewelry/i).length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(
      /Moissanite Diamond Wholesale|first homepage version|can be added later|Sample Products/i,
    );
    expect(screen.getByRole("link", { name: "View Products" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(
      screen.getByText("From Wuzhou to the World"),
    ).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "Request Collection Quote" })).toHaveAttribute(
      "href",
      "/contact?locale=en&source=collection-detail&contactMethod=form&interest=other",
    );
  });

  it("renders the sample Product Detail page", async () => {
    const page = await ProductDetailPage({
      params: Promise.resolve({ slug: "moissanite-solitaire-ring" }),
    });

    render(page);

    expect(screen.getByRole("heading", { name: /Moonlight Moissanite Solitaire Ring/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Request Wholesale Quote/i })).toHaveAttribute(
      "href",
      "/contact?locale=en&source=products&contactMethod=form&interest=moissanite-jewelry",
    );
    expect(screen.getAllByText(/Bulk Loose Stone Supply/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Quality Testing Before Shipment/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sample & Packaging Support/i).length).toBeGreaterThan(0);
    expect(screen.getAllByAltText(/certificate and packaging support/i).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /Back to Wholesale Moissanite Jewelry/i }),
    ).toHaveAttribute("href", "/collections/moissanite-wholesale");
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(breadcrumb).toBeInTheDocument();
    expect(within(breadcrumb).getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
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

  it("renders accurate product media and a complete text-only card without a placeholder", () => {
    render(<ProductsPage />);

    const ringCard = screen
      .getByRole("heading", { name: "Lab Grown Diamond Rings" })
      .closest("article");
    const pendantCard = screen
      .getByRole("heading", { name: "Lab Grown Diamond Pendants" })
      .closest("article");

    expect(ringCard).toHaveAttribute("data-image-state", "available");
    expect(
      within(ringCard as HTMLElement).getByRole("img").getAttribute("src"),
    ).toContain(encodeURIComponent("/images/xingyue-ring-sample.jpg"));
    expect(pendantCard).toHaveAttribute("data-image-state", "none");
    expect(within(pendantCard as HTMLElement).queryByRole("img")).not.toBeInTheDocument();
    expect(pendantCard?.querySelector("[data-product-media]")).toBeNull();
    expect(within(pendantCard as HTMLElement).getByText("Necklaces")).toBeInTheDocument();
    expect(
      within(pendantCard as HTMLElement).getByText("IGI / GIA certificate options by project"),
    ).toBeInTheDocument();
    expect(
      within(pendantCard as HTMLElement).getByText(
        "Pendant and chain programs for boutiques, online brands and gift collections.",
      ),
    ).toBeInTheDocument();
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
    expect(screen.getAllByText(/emerging brands/i).length).toBeGreaterThan(0);
    expect(screen.getByAltText(/jewelry production workshop/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /One partner, one coordinated workflow/i })).toBeInTheDocument();
    expect(screen.getByText("How We Work With Brands")).toBeInTheDocument();
    expect(screen.getAllByText("Who We Support").length).toBeGreaterThan(0);
    expect(
      screen.getByText("Boutique Jewelry Stores & Design Studios"),
    ).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/\bfactory\b|\bmanufacturer\b|1000\+|15\+ Years/i);
    expect(container.textContent).not.toMatch(/[\u4e00-\u9fff]/);
  });

  it("renders natural Spanish and Arabic brand-partner copy on About pages", async () => {
    const spanishPage = await LocalizedAboutPage({
      params: Promise.resolve({ locale: "es" }),
    });
    const spanish = render(spanishPage);

    expect(screen.getAllByText("Cómo trabajamos con las marcas").length).toBeGreaterThan(0);
    expect(screen.getAllByText("A quién ayudamos").length).toBeGreaterThan(0);
    expect(screen.getByText("Joyerías boutique y estudios de diseño")).toBeInTheDocument();
    spanish.unmount();

    const arabicPage = await LocalizedAboutPage({
      params: Promise.resolve({ locale: "ar" }),
    });
    render(arabicPage);

    expect(screen.getAllByText("كيف نعمل مع العلامات التجارية").length).toBeGreaterThan(0);
    expect(screen.getByText("من نخدم")).toBeInTheDocument();
    expect(
      screen.getByText("متاجر المجوهرات الراقية واستوديوهات التصميم"),
    ).toBeInTheDocument();
  });

  it("renders the Contact inquiry page", () => {
    const { container } = render(<ContactPage />);

    expect(screen.getByRole("heading", { name: /Request a Quote/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Company")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("WhatsApp / Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Interest")).toBeInTheDocument();
    expect(screen.getByLabelText("Target Quantity or Range")).toBeInTheDocument();
    expect(screen.getByLabelText("Custom Requirement")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit Inquiry/i })).toBeInTheDocument();
    const salesEmailLinks = screen.getAllByRole("link", { name: "Email: sales@xingyuejewelry.com" });
    expect(salesEmailLinks.map((link) => link.getAttribute("href"))).toContain(
      "mailto:sales@xingyuejewelry.com?subject=Jewelry%20Project%20Inquiry&locale=en&source=contact-page&interest=other&contactMethod=email",
    );
    expect(
      screen.getByText(
        "For wholesale pricing, OEM/ODM customization, and catalog requests, please contact us by email or WhatsApp.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Email Your Inquiry/i })).toHaveAttribute(
      "href",
      "mailto:sales@xingyuejewelry.com?subject=Jewelry%20Project%20Inquiry&locale=en&source=contact-page&interest=other&contactMethod=email",
    );
    expect(container.textContent).not.toMatch(/front-end design only|next version|[\u4e00-\u9fff]/);
  });

  it("renders Arabic localized B2B pages with RTL buyer language", async () => {
    const home = await LocalizedHomePage({ params: Promise.resolve({ locale: "ar" }) });
    const { container, unmount } = render(home);

    expect(
      screen.getByRole("heading", {
        name: /شريك لتصنيع الألماس المزروع والأحجار الكريمة الملونة/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/اطلب عرض سعر للتصنيع/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/علامات المجوهرات التجارية الناشئة/i)).toBeInTheDocument();
    expect(container.querySelector("main")).toHaveAttribute("dir", "rtl");
    expect(container.textContent).not.toMatch(/مصنع/);
    unmount();

    const contact = await LocalizedContactPage({ params: Promise.resolve({ locale: "ar" }) });
    render(contact);
    expect(screen.getByLabelText("الاسم")).toBeInTheDocument();
    expect(screen.getByLabelText("اسم الشركة")).toBeInTheDocument();
    expect(screen.getByLabelText("البريد الإلكتروني")).toHaveAttribute("dir", "ltr");
    expect(screen.getByLabelText("واتساب / الهاتف")).toHaveAttribute("dir", "ltr");
    expect(screen.getByLabelText("الدولة")).toBeInTheDocument();
    expect(screen.getByLabelText("المنتج المطلوب")).toBeInTheDocument();
    expect(screen.getByLabelText("الكمية المستهدفة أو نطاقها")).toBeInTheDocument();
    expect(screen.getByLabelText("متطلبات التخصيص")).toBeInTheDocument();
    expect(screen.getByLabelText("الرسالة")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /أرسل استفساراً/i })).toBeInTheDocument();
    expect(document.querySelector('input[name="website"]')?.parentElement?.parentElement).toHaveClass("sr-only");
    const salesEmailLinks = screen.getAllByRole("link", { name: "البريد الإلكتروني: sales@xingyuejewelry.com" });
    expect(salesEmailLinks.map((link) => link.getAttribute("href"))).toContain(
      `mailto:sales@xingyuejewelry.com?subject=${encodeURIComponent("استفسار عن مشروع مجوهرات")}&locale=ar&source=contact-page&interest=other&contactMethod=email`,
    );
    expect(screen.getByRole("link", { name: /أرسل عبر البريد/i })).toHaveAttribute(
      "href",
      `mailto:sales@xingyuejewelry.com?subject=${encodeURIComponent("استفسار عن مشروع مجوهرات")}&locale=ar&source=contact-page&interest=other&contactMethod=email`,
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
      screen.getByRole("heading", { name: /Socio de fabricación de joyería con diamantes de laboratorio/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/IGI \/ GIA/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Contactar por WhatsApp/i })).toHaveAttribute(
      "href",
      "https://wa.me/8613324888759?text=Hola+Xingyue%2C+me+interesa+analizar+este+producto+para+mi+colecci%C3%B3n.&locale=es&source=collection-detail&interest=lab-grown-diamond-jewelry&contactMethod=whatsapp",
    );
    collectionPage.unmount();

    const contact = await LocalizedContactPage({ params: Promise.resolve({ locale: "es" }) });
    render(contact);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Empresa")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("WhatsApp / Teléfono")).toBeInTheDocument();
    expect(screen.getByLabelText("País")).toBeInTheDocument();
    expect(screen.getByLabelText("Producto de interés")).toBeInTheDocument();
    expect(screen.getByLabelText("Cantidad prevista o rango")).toBeInTheDocument();
    expect(screen.getByLabelText("Requisitos de personalización")).toBeInTheDocument();
    expect(screen.getByLabelText("Mensaje")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar consulta/i })).toBeInTheDocument();
    const salesEmailLinks = screen.getAllByRole("link", { name: "Correo electrónico: sales@xingyuejewelry.com" });
    expect(salesEmailLinks.map((link) => link.getAttribute("href"))).toContain(
      `mailto:sales@xingyuejewelry.com?subject=${encodeURIComponent("Consulta de proyecto de joyería")}&locale=es&source=contact-page&interest=other&contactMethod=email`,
    );
    expect(screen.getByRole("link", { name: /Enviar por email/i })).toHaveAttribute(
      "href",
      `mailto:sales@xingyuejewelry.com?subject=${encodeURIComponent("Consulta de proyecto de joyería")}&locale=es&source=contact-page&interest=other&contactMethod=email`,
    );
  });
});
