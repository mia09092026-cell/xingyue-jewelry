import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CircleDot,
  Gem,
  Heart,
  Mail,
  Medal,
  Moon,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "Custom", href: "#custom" },
  { label: "Certificates", href: "#certificates" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const categories = [
  {
    name: "Rings",
    cn: "戒指",
    detail: "Solitaire, halo, promise and daily sparkle styles.",
    note: "Moissanite / Lab-grown Diamond",
    icon: CircleDot,
  },
  {
    name: "Necklaces",
    cn: "项链",
    detail: "Clean pendants and refined pieces for layering.",
    note: "S925 Silver / K Gold Custom",
    icon: Moon,
  },
  {
    name: "Earrings",
    cn: "耳饰",
    detail: "Studs, drops and small luxuries with bright fire.",
    note: "Brilliant Cut / Pear / Cushion",
    icon: Sparkles,
  },
  {
    name: "Bracelets",
    cn: "手链",
    detail: "Minimal tennis and charm silhouettes for gifting.",
    note: "Daily Fine Jewelry",
    icon: Heart,
  },
  {
    name: "K Gold Custom",
    cn: "K 金定制",
    detail: "Custom 10K, 14K or 18K settings by request.",
    note: "Stone, size, cut and setting",
    icon: Gem,
  },
];

const materials = [
  {
    title: "Moissanite Fire",
    cn: "莫桑钻火彩",
    copy: "High brilliance, crisp sparkle and strong durability for everyday fine jewelry.",
    icon: Sparkles,
  },
  {
    title: "Lab-grown Diamond",
    cn: "培育钻石",
    copy: "Real diamond beauty with a modern, traceable and value-conscious path.",
    icon: Gem,
  },
  {
    title: "S925 Silver",
    cn: "S925 银托镶嵌",
    copy: "Elegant silver settings with polished finishing and approachable pricing.",
    icon: ShieldCheck,
  },
  {
    title: "Custom K Gold",
    cn: "定制 K 金镶嵌",
    copy: "Upgrade selected designs to 10K, 14K or 18K gold settings for special orders.",
    icon: BadgeCheck,
  },
];

const advantages = [
  "Ethical sourcing and traceable stone options / 甄选来源，信息清晰",
  "Strong sparkle for daily luxury / 日常佩戴也有明亮火彩",
  "Flexible stone size, cut and setting / 支持尺寸、切工与镶口定制",
  "Better value for gifts and milestones / 适合礼物与纪念日预算",
];

const certificates = [
  {
    name: "IGI",
    detail: "Available for selected lab-grown diamond orders.",
    cn: "部分培育钻订单可配套。",
  },
  {
    name: "GIA",
    detail: "Optional documentation depends on stone type and availability.",
    cn: "证书以石种和供应情况为准。",
  },
  {
    name: "NGTC",
    detail: "China-recognized testing support for eligible pieces.",
    cn: "符合条件的款式可支持检测。",
  },
  {
    name: "S925",
    detail: "Material mark and silver care guidance included.",
    cn: "提供材质标识与银饰养护说明。",
  },
];

const reviews = [
  {
    name: "Mia L.",
    location: "Singapore",
    quote:
      "The ring is delicate but very bright. The team helped me choose the right stone size.",
    cn: "戒指很精致，火彩比预期更亮，客服也帮我确认了合适尺寸。",
  },
  {
    name: "陈小姐",
    location: "Shanghai",
    quote:
      "I ordered a S925 moissanite necklace first, then upgraded a custom K gold setting.",
    cn: "先入了 S925 莫桑钻项链，后来又定制了 K 金镶嵌，沟通很顺。",
  },
  {
    name: "Olivia W.",
    location: "Sydney",
    quote:
      "Soft, elegant packaging and a clean certificate explanation made the gift feel premium.",
    cn: "包装温柔高级，证书说明也清楚，送礼很体面。",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f6ef] text-[#17202a]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-[#0f1f33]/50 text-white backdrop-blur-md">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10">
              <Moon aria-hidden="true" className="h-4 w-4" />
            </span>
            <span className="font-serif text-lg">XINGYUE 星悦</span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-white/82 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
          <a
            href="#collections"
            className="inline-flex items-center gap-2 rounded-md bg-[#e6cf96] px-4 py-2 text-sm font-medium text-[#17202a] transition hover:bg-[#f0dca8]"
          >
            View Collection
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </nav>
      </header>

      <section
        id="home"
        className="relative flex min-h-[84svh] items-center overflow-hidden bg-[#102039] px-5 pt-28 text-white sm:px-8"
      >
        <Image
          src="/images/xingyue-hero.png"
          alt="Moonlit silver ring and pendant jewelry with brilliant stones"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071221]/92 via-[#071221]/54 to-[#071221]/14" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8f6ef] to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl pb-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-4 py-2 text-sm text-white/88 backdrop-blur">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-[#e6cf96]" />
              Moissanite, Lab-grown Diamond & S925 Silver
            </div>
            <p className="mb-4 text-sm uppercase text-[#e6cf96]">XINGYUE 星悦</p>
            <h1 className="text-balance font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
              Moonlit jewelry for every luminous promise.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/86">
              莫桑钻、培育钻石与 S925 银托镶嵌珠宝，支持定制 K 金镶嵌。Soft sparkle,
              transparent materials, and refined everyday luxury.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#collections"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f1eadc]"
              >
                Shop Collection
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a
                href="#custom"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/38 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Custom Design
                <Gem aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="bg-[#f8f6ef] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm text-[#8a734b]">Collections / 产品分类</p>
              <h2 className="font-serif text-4xl text-[#17202a]">Designed around your light.</h2>
            </div>
            <p className="max-w-xl leading-7 text-[#596575]">
              From S925 silver daily pieces to K gold custom settings, XINGYUE keeps each
              category focused, wearable and gift-ready.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <article
                  key={category.name}
                  className="rounded-md border border-[#dfd7c6] bg-white/74 p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#d4b76d]"
                >
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-md bg-[#eef3f5] text-[#6e7f8b]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl">{category.name}</h3>
                  <p className="mt-1 text-base text-[#8a734b]">{category.cn}</p>
                  <p className="mt-4 min-h-20 leading-7 text-[#596575]">{category.detail}</p>
                  <p className="mt-5 border-t border-[#e5dece] pt-4 text-sm text-[#17202a]">
                    {category.note}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="custom" className="bg-[#eef3f5] px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm text-[#8a734b]">Materials & Custom / 材质与定制</p>
            <h2 className="text-balance font-serif text-4xl leading-tight text-[#17202a]">
              Fine sparkle, flexible settings, clear choices.
            </h2>
            <p className="mt-6 leading-8 text-[#596575]">
              主营莫桑钻、培育钻与 S925 银托镶嵌，适合日常佩戴、礼物和轻奢定制。
              Selected designs can be made in K gold for engagement, anniversary and
              bespoke orders.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {materials.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-md border border-white/70 bg-white/80 p-6 diamond-glow"
                >
                  <Icon aria-hidden="true" className="mb-6 h-6 w-6 text-[#b59a5a]" />
                  <h3 className="font-serif text-2xl text-[#17202a]">{item.title}</h3>
                  <p className="mt-1 text-[#8a734b]">{item.cn}</p>
                  <p className="mt-4 leading-7 text-[#596575]">{item.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#17202a] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm text-[#e6cf96]">
              Lab-grown & Moissanite Advantages / 培育钻与莫桑钻优势
            </p>
            <h2 className="text-balance font-serif text-4xl leading-tight">
              Brilliant choices for modern fine jewelry.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((advantage, index) => (
              <div key={advantage} className="rounded-md border border-white/12 bg-white/7 p-5">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-[#e6cf96]">
                  <Star aria-hidden="true" className="h-4 w-4" />
                </div>
                <p className="leading-7 text-white/82">
                  <span className="mr-2 text-[#e6cf96]">0{index + 1}</span>
                  {advantage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="bg-[#fbfaf7] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm text-[#8a734b]">Certificates / 证书与保障</p>
              <h2 className="font-serif text-4xl text-[#17202a]">Clarity before sparkle.</h2>
            </div>
            <p className="max-w-2xl leading-7 text-[#596575]">
              Certificate availability depends on stone type, size and order details. We keep
              material notes transparent before production.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {certificates.map((certificate) => (
              <article
                key={certificate.name}
                className="rounded-md border border-[#e3dbcb] bg-[#f8f6ef] p-6"
              >
                <Medal aria-hidden="true" className="mb-8 h-6 w-6 text-[#b59a5a]" />
                <h3 className="font-serif text-3xl text-[#17202a]">{certificate.name}</h3>
                <p className="mt-4 leading-7 text-[#596575]">{certificate.detail}</p>
                <p className="mt-3 text-sm text-[#8a734b]">{certificate.cn}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-[#eef3f5] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="mb-3 text-sm text-[#8a734b]">Reviews / 客户评价</p>
            <h2 className="font-serif text-4xl text-[#17202a]">Quiet luxury, warmly received.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-md bg-white/82 p-6 shadow-sm">
                <Quote aria-hidden="true" className="mb-7 h-7 w-7 text-[#b59a5a]" />
                <p className="min-h-28 leading-8 text-[#344150]">“{review.quote}”</p>
                <p className="mt-5 leading-7 text-[#596575]">{review.cn}</p>
                <div className="mt-7 border-t border-[#e3dbcb] pt-5">
                  <p className="font-semibold text-[#17202a]">{review.name}</p>
                  <p className="text-sm text-[#8a734b]">{review.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f6ef] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-md bg-[#17202a] p-8 text-white md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 text-sm text-[#e6cf96]">Official Domain / 官方独立站域名</p>
              <h2 className="font-serif text-4xl">xingyuejewelry.com</h2>
              <p className="mt-5 max-w-2xl leading-8 text-white/76">
                The official online boutique for XINGYUE 星悦 collections, custom requests,
                certificate support and new jewelry launches.
              </p>
            </div>
            <a
              href="mailto:hello@xingyuejewelry.com"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e6cf96] px-6 py-3 text-sm font-semibold text-[#17202a] transition hover:bg-[#f0dca8]"
            >
              Contact Studio
              <Mail aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#0f1722] px-5 py-14 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/24 bg-white/8">
                <Moon aria-hidden="true" className="h-4 w-4 text-[#e6cf96]" />
              </span>
              <span className="font-serif text-xl">XINGYUE 星悦</span>
            </div>
            <p className="max-w-sm leading-7 text-white/68">
              Moissanite, lab-grown diamond, S925 silver and custom K gold jewelry with a
              softly luminous point of view.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm text-[#e6cf96]">Products</h3>
            <ul className="space-y-3 text-sm text-white/68">
              <li>Rings / 戒指</li>
              <li>Necklaces / 项链</li>
              <li>Earrings / 耳饰</li>
              <li>Bracelets / 手链</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm text-[#e6cf96]">Services</h3>
            <ul className="space-y-3 text-sm text-white/68">
              <li>K Gold Custom / K 金定制</li>
              <li>Stone Selection / 石种选择</li>
              <li>Certificate Support / 证书支持</li>
              <li>Gift Orders / 礼品订单</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm text-[#e6cf96]">Contact</h3>
            <ul className="space-y-3 text-sm text-white/68">
              <li>xingyuejewelry.com</li>
              <li>hello@xingyuejewelry.com</li>
              <li>Instagram / WeChat</li>
              <li>© 2026 XINGYUE</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
