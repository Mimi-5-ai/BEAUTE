import { useEffect, useRef, useState } from "react"
import {
  featuredTreatments,
  formatPrice,
  priceRows,
  type Treatment,
} from "./services"

const siteBase = import.meta.env.BASE_URL
const siteAsset = (path: string) => `${siteBase}${path.replace(/^\/+/, "")}`
const pricesPath = `${siteBase}prices`
const isPricesPath = () =>
  window.location.pathname.replace(/\/+$/, "") === pricesPath.replace(/\/+$/, "")

type IconName = "calendar" | "arrow" | "chevron" | "pin" | "phone" | "check" | "sparkle" | "shield" | "close" | "search" | "play" | "plus"
interface IconProps {
  name: IconName
  size?: number
}
function Icon({ name, size = 22 }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2" />
      </>
    ),
    arrow: <path d="M19 12H5m6-6-6 6 6 6" />,
    chevron: <path d="m14 6-6 6 6 6" />,
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="m7 3 3 5-3 3a15 15 0 0 0 6 6l3-3 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    sparkle: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
        <path d="M20 2v4m-2-2h4" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    play: <path d="m9 5 10 7-10 7V5Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Brand({ logo = "/images/brand-b.webp" }: { logo?: string }) {
  return (
    <a className="brand" href="#home" aria-label="أحاسيس الجمال — الرئيسية">
      <img
        src={siteAsset(logo)}
        alt="شعار أحاسيس الجمال، حرف B متوّج"
        width="52"
        height="52"
      />
      <span>
        <strong>أحاسيس الجمال</strong>
        <small>
          المجمع الطبي <span>•</span> عرعر
        </small>
      </span>
    </a>
  )
}

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("مجمع أحاسيس الجمال الطبي عرعر حي العزيزية")
type ModalState = { type: "prices" } | { type: "tour" } | {
  type: "booking"
  treatment?: Treatment
} | null
interface ModalProps {
  state: ModalState
  close: () => void
  book: (treatment?: Treatment) => void
}

function Modal({ state, close, book }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  useEffect(() => {
    if (!state || !dialog.current) return
    dialog.current.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      dialog.current?.close()
      document.body.style.overflow = previous
    }
  }, [state])
  const shown = priceRows.filter(
    (row) =>
      (filter === "all" || row.category === filter) &&
      row.name.includes(search.trim()),
  )
  return (
    <dialog
      ref={dialog}
      className={`modal ${state?.type === "prices" ? "price-modal" : ""} ${
        state?.type === "tour" ? "tour-modal" : ""
      }`}
      onCancel={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      aria-labelledby="modal-title"
    >
      {state && (
        <div className="modal-content">
          <button
            className="close-button"
            aria-label="إغلاق النافذة"
            onClick={close}
          >
            <Icon name="close" />
          </button>
          <span className="eyebrow">أحاسيس الجمال</span>
          <h2 id="modal-title">
            {state.type === "prices"
              ? "خدماتنا وأسعارها"
              : state.type === "tour"
                ? "أهلاً بكِ في عالمنا"
                : "تبدأ عنايتكِ بخطوة"}
          </h2>
          {state.type === "prices" ? (
            <>
              <p>
                أسعار الخدمات حسب القائمة المرفقة من المجمع.
              </p>
              <label className="search-field">
                <Icon name="search" size={19} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحثي عن خدمة..."
                  aria-label="البحث في الأسعار"
                />
              </label>
              <div className="price-filters" aria-label="تصفية الأسعار">
                {[
                  ["all", "كل الخدمات"],
                  ["injections", "قسم الحقن"],
                  ["scars", "علاج الندبات"],
                ].map(([value, text]) => (
                  <button
                    key={value}
                    className={filter === value ? "selected" : ""}
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                  >
                    {text}
                  </button>
                ))}
              </div>
              <div className="price-table">
                <div className="price-table-heading">
                  <span>الخدمة</span>
                  <span>السعر</span>
                  <span />
                </div>
                {shown.map((row) => (
                  <div className="price-row" key={row.id}>
                    <span>{row.name}</span>
                    <strong>
                      <bdi>{formatPrice(row.price!)}</bdi> <small>ر.س</small>
                    </strong>
                    <button
                      aria-label={`الاستفسار عن ${row.name}`}
                      onClick={() => book(row)}
                    >
                      <Icon name="plus" size={17} />
                    </button>
                  </div>
                ))}
                {shown.length === 0 && (
                  <p className="empty-state">
                    لم نجد خدمة بهذا الاسم. جرّبي كلمة أخرى.
                  </p>
                )}
              </div>
              <p className="fine-print">
                يحدد الطبيب الإجراء المناسب بعد التقييم. للاستفسار عن تفاصيل
                الجلسة والسعر النهائي، تواصلي مع استقبال المجمع.
              </p>
            </>
          ) : state.type === "tour" ? (
            <>
              <p>مساحة من الهدوء، وتفاصيل صُممت لراحتكِ.</p>
              <img
                className="tour-photo"
                src={siteAsset("/images/reception.webp")}
                alt="استقبال أحاسيس الجمال الطبي"
              />
              <a
                className="button primary"
                target="_blank"
                rel="noreferrer"
                href={mapUrl}
              >
                تعرّفي على موقعنا <Icon name="pin" size={18} />
              </a>
            </>
          ) : (
            <>
              <p>يسعدنا استقبالِك في مجمع أحاسيس الجمال الطبي.</p>
              {state.treatment && (
                <div className="booking-summary">
                  <img src={siteAsset(state.treatment.image)} alt="" />
                  <div>
                    <small>الخدمة التي اخترتِها</small>
                    <strong>{state.treatment.name}</strong>
                    <span>
                      {state.treatment.price === null ? (
                        "السعر بعد الاستشارة"
                      ) : (
                        <>
                          <bdi>{formatPrice(state.treatment.price)}</bdi> ر.س
                        </>
                      )}
                    </span>
                  </div>
                </div>
              )}
              <div className="booking-location">
                <Icon name="pin" />
                <div>
                  <strong>عرعر — حي العزيزية</strong>
                  <p>المملكة العربية السعودية</p>
                </div>
              </div>
              <div className="booking-note">
                <strong>لتنسيق موعدكِ</strong>
                <div className="booking-contact-links">
                  <a
                    href="https://wa.me/966500656345"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="phone" size={17} />
                    واتساب: 0500656345
                  </a>
                  <a href="tel:+966146642020">
                    <Icon name="phone" size={17} />
                    هاتف الاستقبال: 0146642020
                  </a>
                </div>
              </div>
              <a
                className="button primary full-width"
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                اعرضي موقع المجمع <Icon name="arrow" size={19} />
              </a>
            </>
          )}
        </div>
      )}
    </dialog>
  )
}

interface CarouselProps {
  book: (treatment: Treatment) => void
}
function ServicesCarousel({ book }: CarouselProps) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, x: 0, scroll: 0, moved: false })
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(2)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  useEffect(() => {
    const element = track.current
    if (!element) return
    const update = () => {
      const gap = parseFloat(getComputedStyle(element).columnGap) || 0
      const stride = element.clientWidth + gap
      const count = Math.max(
        1,
        Math.ceil((element.scrollWidth + gap) / stride - 0.005),
      )
      const progress = Math.abs(element.scrollLeft)
      setPages(count)
      setPage(Math.min(count - 1, Math.round(progress / stride)))
      setAtStart(progress <= 4)
      setAtEnd(progress >= element.scrollWidth - element.clientWidth - 4)
    }
    const observer = new ResizeObserver(update)
    observer.observe(element)
    element.addEventListener("scroll", update, { passive: true })
    update()
    return () => {
      observer.disconnect()
      element.removeEventListener("scroll", update)
    }
  }, [])
  const move = (direction: number) => {
    const element = track.current
    if (!element) return
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    element.scrollBy({
      left:
        direction *
        (element.clientWidth +
          (parseFloat(getComputedStyle(element).columnGap) || 0)),
      behavior: reduced ? "instant" : "smooth",
    })
  }
  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="عارض شرائح"
      aria-label="الخدمات والأسعار"
    >
      <button
        className="carousel-arrow arrow-right"
        onClick={() => move(1)}
        disabled={atStart}
        aria-label="الخدمات السابقة"
      >
        <Icon name="chevron" />
      </button>
      <div
        className="service-track"
        ref={track}
        tabIndex={0}
        aria-label="اسحبي يميناً أو يساراً لاستعراض الخدمات"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            move(-1)
          }
          if (e.key === "ArrowRight") {
            e.preventDefault()
            move(1)
          }
        }}
        onPointerDown={(e) => {
          if (
            e.pointerType !== "mouse" ||
            (e.target as HTMLElement).closest("button")
          )
            return
          drag.current = {
            down: true,
            x: e.clientX,
            scroll: e.currentTarget.scrollLeft,
            moved: false,
          }
        }}
        onPointerMove={(e) => {
          if (!drag.current.down) return
          const delta = e.clientX - drag.current.x
          if (Math.abs(delta) > 5) {
            drag.current.moved = true
            e.currentTarget.classList.add("dragging")
            e.currentTarget.setPointerCapture(e.pointerId)
            e.currentTarget.scrollLeft = drag.current.scroll - delta
          }
        }}
        onPointerUp={(e) => {
          drag.current.down = false
          e.currentTarget.classList.remove("dragging")
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId)
        }}
        onPointerCancel={(e) => {
          drag.current.down = false
          e.currentTarget.classList.remove("dragging")
        }}
        onPointerLeave={(e) => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId))
            drag.current.down = false
        }}
      >
        {featuredTreatments.map((treatment, index) => (
          <article
            className="treatment-card"
            key={treatment.id}
            role="group"
            aria-roledescription="شريحة"
            aria-label={`${index + 1} من ${featuredTreatments.length}`}
          >
            <div className={`treatment-photo treatment-${treatment.id}`}>
              <img
                src={siteAsset(treatment.image)}
                alt={
                  treatment.category === "laser"
                    ? "جلسة علاج بالليزر"
                    : treatment.category === "scars"
                      ? "عناية تجميلية متخصصة"
                      : "عناية بالبشرة وإجراءات الحقن التجميلي"
                }
                draggable="false"
                loading="lazy"
              />
              <span className="treatment-symbol">
                <Icon
                  name={
                    treatment.category === "laser"
                      ? "sparkle"
                      : treatment.category === "scars"
                        ? "shield"
                        : "plus"
                  }
                  size={20}
                />
              </span>
              {index === 0 && <span className="card-label">عناية مختارة</span>}
            </div>
            <div className="treatment-content">
              <h3>{treatment.name}</h3>
              <p>{treatment.description}</p>
              <div className="treatment-price">
                {treatment.price === null ? (
                  <span className="consult-price">
                    يُحدد السعر بعد الاستشارة
                  </span>
                ) : (
                  <>
                    <bdi>{formatPrice(treatment.price)}</bdi>
                    <span>ريال سعودي</span>
                  </>
                )}
              </div>
              <button onClick={() => book(treatment)}>
                احجزي الآن <Icon name="arrow" size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
      <button
        className="carousel-arrow arrow-left"
        onClick={() => move(-1)}
        disabled={atEnd}
        aria-label="الخدمات التالية"
      >
        <Icon name="chevron" />
      </button>
      <div className="carousel-bottom">
        <span>عناية تناسبكِ، اختاري ما يلائمكِ</span>
        <div className="carousel-dots">
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              aria-label={`مجموعة الخدمات ${index + 1}`}
              aria-current={page === index ? "true" : undefined}
              className={page === index ? "active" : ""}
              onClick={() => {
                const element = track.current
                if (element)
                  element.scrollTo({
                    left:
                      -index *
                      (element.clientWidth +
                        (parseFloat(getComputedStyle(element).columnGap) || 0)),
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "instant"
                      : "smooth",
                  })
              }}
            />
          ))}
        </div>
        <span className="swipe-hint">
          اسحبي لاكتشاف المزيد <Icon name="arrow" size={15} />
        </span>
      </div>
    </div>
  )
}

function IndibaSection() {
  const benefits = [
    "تكسير الدهون الموضعية",
    "شد البشرة ونحت القوام",
    "علاج السيلوليت",
    "إزالة علامات التمدد",
    "تعزيز نضارة البشرة ومرونتها",
    "تحفيز الكولاجين وتجديد البشرة",
  ]

  return (
    <section id="indiba" className="indiba-section" aria-labelledby="indiba-title">
      <div className="container indiba-showcase">
        <div className="section-title">
          <span className="section-kicker">تقنية متقدمة للعناية بالجسم والبشرة</span>
          <h2>
            <span /> إنديبا <em>INDIBA</em> <span />
          </h2>
          <p>الجهاز الذي لا يزال حصريًا في شمال المملكة!</p>
        </div>
        <div className="indiba-showcase-grid">
          <article className="indiba-main-card">
            <span className="indiba-card-kicker">عناية متكاملة للجمال والرشاقة</span>
            <h3 id="indiba-title">تقنية تجمع نتائج الجسم والبشرة في تجربة واحدة</h3>
            <p>
              تقنية متطورة للعناية بالجسم والبشرة، مصممة لدعم نحت القوام وتعزيز
              نضارة البشرة ومرونتها وتحفيز تجديدها بصورة متوازنة.
            </p>
            <div className="indiba-benefit-grid">
              {benefits.map((benefit) => (
                <div className="indiba-benefit" key={benefit}>
                  <span><Icon name="check" size={16} /></span>
                  <strong>{benefit}</strong>
                </div>
              ))}
            </div>
          </article>
          <aside className="indiba-exclusive-card">
            <div className="indiba-exclusive-mark">
              <Icon name="sparkle" size={28} />
            </div>
            <span>حصرياً</span>
            <h3>شمال المملكة</h3>
            <p>تقنية متقدمة تحت إشراف عناية تضع التفاصيل والجمال الطبيعي أولاً.</p>
            <strong>إنديبا.. تقنية متكاملة للجمال والرشاقة!</strong>
          </aside>
        </div>
      </div>
    </section>
  )
}

function PricesPage({ close }: { close: () => void }) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState(
    () => new URLSearchParams(window.location.search).get("category") || "all",
  )
  const shown = priceRows.filter(
    (row) =>
      (filter === "all" || row.category === filter) &&
      row.name.includes(search.trim()),
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <div className="prices-page" dir="rtl">
      <header className="prices-header">
        <div className="container prices-header-inner">
          <button className="prices-back" onClick={close} aria-label="العودة إلى الرئيسية">
            <Icon name="arrow" size={18} /> الرئيسية
          </button>
          <strong className="prices-brand-name">أحاسيس الجمال</strong>
        </div>
      </header>
      <main>
        <section className="prices-catalog container">
          <div className="prices-toolbar">
            <label className="search-field">
              <Icon name="search" size={19} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحثي عن خدمة..."
                aria-label="البحث في قائمة الأسعار"
              />
            </label>
            <div className="price-filters" aria-label="تصفية الخدمات والأسعار">
              {[
                ["all", "كل الخدمات"],
                ["injections", "قسم الحقن"],
                ["scars", "علاج الندبات"],
                ["laser", "قسم الليزر"],
                ["whitening", "قسم التشقير"],
              ].map(([value, text]) => (
                <button
                  key={value}
                  className={filter === value ? "selected" : ""}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
          <div className="prices-grid">
            {shown.map((row) => (
              <article className="price-card" key={row.id}>
                <div className="price-card-image">
                  <img
                    src={siteAsset(row.image)}
                    alt={row.name}
                    loading="lazy"
                  />
                  <span>{row.category === "scars" ? "علاج ندبات" : row.category === "laser" ? "قسم الليزر" : row.category === "whitening" ? "قسم التشقير" : "قسم الحقن"}</span>
                </div>
                <div className="price-card-content">
                  <h2>{row.name}</h2>
                  <p>{row.description}</p>
                  <div className="price-card-bottom">
                    {row.price === null ? (
                      <strong className="price-consult">السعر بعد الاستشارة</strong>
                    ) : (
                      <strong><bdi>{formatPrice(row.price)}</bdi> <small>ر.س</small></strong>
                    )}
                    <button
                      className="price-card-action"
                      onClick={() => {
                        close()
                        window.setTimeout(() => document.querySelector<HTMLButtonElement>(".header-book")?.click(), 0)
                      }}
                      aria-label={`الاستفسار عن ${row.name}`}
                    >
                      استفسري <Icon name="arrow" size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {shown.length === 0 && (
              <p className="prices-empty">
            {filter === "whitening"
              ? "قائمة خدمات التشقير ستُضاف قريباً."
              : "لم نجد خدمة بهذا الاسم. جرّبي كلمة أخرى."}
              </p>
            )}
          </div>
          <p className="prices-fine-print">
            يحدد الطبيب الإجراء المناسب بعد التقييم. قد تتغير التكلفة حسب خطة العلاج وعدد الجلسات.
          </p>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  const [modal, setModal] = useState<ModalState>(null)
  const [active, setActive] = useState("home")
  const [pricesPage, setPricesPage] = useState(() => isPricesPath())
  useEffect(() => {
    const handlePopState = () => setPricesPage(isPricesPath())
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])
  const openPrices = (category: string = "all") => {
    const selectedCategory = typeof category === "string" ? category : "all"
    const target = selectedCategory === "all"
      ? pricesPath
      : `${pricesPath}?category=${encodeURIComponent(selectedCategory)}`
    window.history.pushState({}, "", target)
    setPricesPage(true)
  }
  const closePrices = () => {
    window.history.pushState({}, "", siteBase)
    setPricesPage(false)
  }
  const book = (treatment?: Treatment) =>
    setModal({ type: "booking", treatment })
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-15% 0px -50% 0px" },
    )
    document
      .querySelectorAll("main section[id]")
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
  if (pricesPage) {
    return <PricesPage close={closePrices} />
  }

  return (
    <div dir="rtl">
      <div className="hero-shell">
        <header className="site-header">
          <div className="container header-inner">
            <Brand />
            <nav aria-label="التنقل الرئيسي">
              {[
                ["home", "الرئيسية"],
                ["services", "خدماتنا"],
                ["indiba", "إنديبا INDIBA"],
                ["about", "عن المجمع"],
                ["contact", "تواصل معنا"],
              ].map(([id, label]) => (
                <a
                  href={`#${id}`}
                  key={id}
                  className={active === id ? "active" : ""}
                >
                  {label}
                </a>
              ))}
              <button onClick={() => openPrices("all")}>
                قائمة الأسعار
              </button>
            </nav>
            <a className="mobile-home-link" href="#home">
              الرئيسية
            </a>
            <a
              className="button primary header-book"
              href="https://wa.me/966500656345"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="phone" size={17} /> احجزي موعدك
            </a>
          </div>
        </header>
        <main>
          <section id="home" className="hero">
            <div className="hero-art">
              <img
                src={siteAsset("/images/beauty-portrait.jpg")}
                alt="جمال طبيعي وعناية بالتفاصيل"
                fetchPriority="high"
              />
              <div className="hero-art-shade" />
            </div>
            <div className="container hero-inner">
              <div className="hero-copy">
                <h1>
                  جمالك ..
                  <br />
                  في أيدٍ <em>أمينة</em>
                </h1>
                <p>
                  خدمات تجميلية متكاملة بأحدث التقنيات
                  <br />
                  لإبراز جمالك الطبيعي بثقة واطمئنان.
                </p>
                <div className="hero-actions">
                  <button className="button primary" onClick={() => book()}>
                    <Icon name="calendar" size={19} /> احجزي موعدك{" "}
                    <Icon name="arrow" size={18} />
                  </button>
                </div>
                <div className="hero-footnote">
                  <Icon name="shield" size={16} /> عناية متخصصة <i /> جمال
                  بطابعكِ <i /> عرعر
                </div>
              </div>
            </div>
            <span className="hero-vertical" lang="en">
              EMOTIONS AND BEAUTY
            </span>
          </section>
          <section id="services" className="services-section">
            <div className="container">
              <div className="section-title">
                <span className="section-kicker">عناية تستحقينها</span>
                <h2>
                  <span /> أبرز خدماتنا وأسعارها <span />
                </h2>
                <p>خيارات تجميلية مختارة، لأن لكل جمال عناية خاصة.</p>
              </div>
              <ServicesCarousel book={book} />
              <div className="all-prices-link">
                <button onClick={() => openPrices("all")}>
                  استعرضي قائمة الأسعار كاملة <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="service-category-grid">
                <article className="service-category-card">
                  <img src={siteAsset("/images/laser.webp")} alt="قسم الليزر" loading="lazy" />
                  <div>
                    <span>قسم متخصص</span>
                    <h3>خدمات الليزر</h3>
                    <p>تقنيات حديثة وعناية تراعي بشرتكِ.</p>
                    <button onClick={() => openPrices("laser")}>
                      استعرضي الخدمات <Icon name="arrow" size={16} />
                    </button>
                  </div>
                </article>
                <article className="service-category-card">
                  <div className="whitening-placeholder">
                    <Icon name="sparkle" size={34} />
                  </div>
                  <div>
                    <span>قسم جديد</span>
                    <h3>خدمات التشقير</h3>
                    <p>القائمة وبيانات الخدمات ستُضاف قريباً.</p>
                    <button onClick={() => openPrices("whitening")}>
                      استعرضي الخدمات <Icon name="arrow" size={16} />
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="care-banner container" aria-label="عناية متكاملة">
            <div className="banner-decoration" />
            <div className="banner-copy">
              <Icon name="sparkle" size={30} />
              <div>
                <span>رحلة جمالكِ تبدأ من هنا</span>
                <h2>تفاصيل مدروسة، لجمال يشبهكِ.</h2>
              </div>
            </div>
            <span className="banner-divider" />
            <p>
              اختاري عنايتكِ
              <br />
              <strong>ودعي الباقي لنا</strong>
            </p>
            <button
              className="button primary"
              onClick={() => openPrices("all")}
            >
              اكتشفي خدماتنا <Icon name="arrow" size={18} />
            </button>
          </section>

          <IndibaSection />

          <section id="about" className="about-section container">
            <div className="about-copy">
              <span className="eyebrow">
                <span /> أقرب إليكِ، وأكثر اهتماماً
              </span>
              <h2>
                أحاسيس الجمال.
                <br />
                <em>مكانكِ للعناية والاطمئنان.</em>
              </h2>
              <p>
                في مجمع أحاسيس الجمال الطبي بعرعر، نؤمن أن الجمال يبدأ بالشعور
                بالراحة. نعتني بالتفاصيل، ونقدّم لكِ خيارات طبية وتجميلية تلائم
                احتياجكِ، في أجواء هادئة ترحّب بكِ.
              </p>
              <div className="about-values">
                <span>
                  <Icon name="check" size={15} /> عناية تراعي احتياجكِ
                </span>
                <span>
                  <Icon name="check" size={15} /> خصوصية واهتمام
                </span>
              </div>
              <button
                className="underlined-link"
                onClick={() => setModal({ type: "tour" })}
              >
                تعرّفي على المجمع <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="about-image">
              <img
                src={siteAsset("/images/reception.webp")}
                alt="صورة استقبال مجمع أحاسيس الجمال الطبي وشعار B على الجدار"
                loading="lazy"
              />
              <div className="about-image-caption">
                <Icon name="pin" size={18} />
                <span>عرعر، حي العزيزية</span>
                <span lang="en">A PLACE TO FEEL BEAUTIFUL</span>
              </div>
            </div>
          </section>
          <section id="contact" className="contact-section">
            <div className="container contact-inner">
              <div>
                <span className="eyebrow">دائماً بالقرب منكِ</span>
                <h2>خلّينا نبدأ رحلة جمالكِ</h2>
                <p>نرحّب بزيارتكِ واستفساراتكِ في مجمع أحاسيس الجمال الطبي.</p>
              </div>
              <div className="contact-buttons">
                <button className="button primary" onClick={() => book()}>
                  <Icon name="phone" size={18} /> تواصلي مع الاستقبال
                </button>
                <a
                  className="button whatsapp-button"
                  href="https://wa.me/966500656345"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="phone" size={18} /> واتساب
                </a>
                <a
                  className="button outlined"
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="pin" size={19} /> موقعنا على الخريطة{" "}
                  <Icon name="arrow" size={17} />
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-copyright">
            © {new Date().getFullYear()} مجمع أحاسيس الجمال الطبي. جميع الحقوق
            محفوظة.
          </span>
        </div>
      </footer>
      <Modal state={modal} close={() => setModal(null)} book={book} />
    </div>
  )
}
