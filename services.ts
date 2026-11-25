export interface Treatment {
  id: string
  name: string
  price: number | null
  category: "injections" | "scars" | "laser" | "whitening"
  description: string
  image: string
}

export const priceRows: Treatment[] = [
  ["botox-forehead", "بوتكس جبهة", 950],
  ["botox-brows", "بوتكس حواجب", 850],
  ["botox-lift", "بوتكس جبهة + رفع حواجب", 1650],
  ["botox-eyes", "بوتكس حول العين", 650],
  ["botox-upper", "بوتكس أعلى الوجه", 2300],
  ["neck", "خطوط الرقبة", 400],
  ["gummy-smile", "الابتسامة اللثوية", 1500],
  ["sweating", "فرط التعرق لليدين أو الرجلين أو الإبطين", 2000],
  ["smile-lines", "خطوط الابتسامة", 400],
  ["nose-contour", "كنتور الأنف", 950],
  ["nostrils", "تضييق فتحات الأنف", 950],
  ["jaw", "تحديد الفك", 1150],
  ["filler", "فيلر", 1150],
  ["profhilo", "بروفايلو", 1500],
  ["fat-dissolving", "إبرة إذابة الدهون", 800],
  ["inovial", "إنوفيال", 1000],
  ["rrs", "RRs", 1500],
  ["lip-glam", "Lip glam", 1150],
  ["sculptra", "سكالبترا", 4500],
  ["dorothy", "دورثي", 1500],
  ["radiesse", "راديس", 1450],
  ["salmon", "سلمون موضعي", 1700],
  ["plasma", "بلازما", 800],
  ["plasma-dermapen", "بلازما + ديرمابن", 900],
  ["plasma-scars", "بلازما + تقطيع ندبات", 900],
  ["meso", "ميزو", 400],
].map(([id, name, price]) => ({
  id: String(id),
  name: String(name),
  price: Number(price),
  category: "injections",
  description: "عناية متخصصة، وخطة تناسب احتياجكِ.",
  image: "/images/fillers.webp",
}))

const treatmentImages: Record<string, string> = {
  "botox-forehead": "/images/بوتكس_جبهة.jpg",
  "botox-brows": "/images/بوتكس_حواجب.jpg",
  "botox-lift": "/images/بوتكس_جبهة_رفع_حواجب.jpg",
  "botox-eyes": "/images/بوتكس_حول_العين.jpg",
  "botox-upper": "/images/بوتكس_اعلى_الوجه.jpg",
  "neck": "/images/خطوط_الرقبة.jpg",
  "gummy-smile": "/images/الابتسامة_اللثاوية.jpg",
  "sweating": "/images/فرط_لتعرق.jpg",
  "smile-lines": "/images/خطوط_الابتسامة.jpg",
  "nose-contour": "/images/كنتور_الانف.jpg",
  "nostrils": "/images/تضييف_فتحات_الانف.jpg",
  "jaw": "/images/تحديد_الفك.jpg",
  "profhilo": "/images/بروفايلو.jpg",
  "filler": "/images/fillers.webp",
  "fat-dissolving": "/images/ازالةدهون.jpg",
  "inovial": "/images/انفويال.jpg",
  "rrs": "/images/RRS.jpg",
  "lip-glam": "/images/lip.jpg",
  "sculptra": "/images/سكالبترا.jpg",
  "salmon": "/images/سلمون_موضعي.jpg",
  "plasma": "/images/بلازما.jpg",
  "plasma-dermapen": "/images/ديرمابن.jpg",
  "plasma-scars": "/images/ديرمابن.jpg",
  "meso": "/images/ميزو.jpg",
}

priceRows.forEach((row) => {
  if (treatmentImages[row.id]) row.image = treatmentImages[row.id]
})

priceRows.push(
  {
    id: "scar-injection",
    name: "علاج الندبات — حقن",
    price: 500,
    category: "scars",
    description: "عناية دقيقة لتحسين مظهر الندبات.",
    image: "/images/ندبات.jpg",
  },
  {
    id: "scar-subcision",
    name: "علاج الندبات — تقطيع",
    price: 500,
    category: "scars",
    description: "خطة علاج يحددها الطبيب لبشرتكِ.",
    image: "/images/ندبات.jpg",
  },
)

priceRows.push(
  {
    id: "whitening-brows",
    name: "تشقير حواجب",
    price: 100,
    category: "whitening",
    description: "عناية تشقير تناسب نبرة بشرتكِ.",
    image: "/images/جهاز_تشقير.jpg",
  },
  {
    id: "whitening-face",
    name: "تشقير وجه",
    price: 150,
    category: "whitening",
    description: "عناية تشقير تناسب نبرة بشرتكِ.",
    image: "/images/جهاز_تشقير.jpg",
  },
  {
    id: "whitening-face-brows",
    name: "تشقير وجه + حواجب",
    price: 220,
    category: "whitening",
    description: "عناية تشقير متكاملة للوجه والحواجب.",
    image: "/images/جهاز_تشقير.jpg",
  },
  {
    id: "whitening-back",
    name: "تشقير ظهر",
    price: 250,
    category: "whitening",
    description: "عناية تشقير تناسب نبرة بشرتكِ.",
    image: "/images/جهاز_تشقير.jpg",
  },
  {
    id: "whitening-belly",
    name: "تشقير بطن",
    price: 250,
    category: "whitening",
    description: "عناية تشقير تناسب نبرة بشرتكِ.",
    image: "/images/جهاز_تشقير.jpg",
  },
  {
    id: "whitening-neck",
    name: "تشقير رقبة",
    price: 150,
    category: "whitening",
    description: "عناية تشقير تناسب نبرة بشرتكِ.",
    image: "/images/جهاز_تشقير.jpg",
  },
)



priceRows.push(
  {
    id: "laser-full-face",
    name: "ليزر كامل الجسم ",
    price: 650,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-full-back-belly-face",
    name: "ليزر بدون ظهر وبطن مع وجه",
    price: 550,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-full-legs",
    name: "ليزر رجلين كامل",
    price: 300,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-half-legs",
    name: "ليزر نصف الرجلين",
    price: 180,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-belly",
    name: "البطن",
    price: 250,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-hips",
    name: "الأرداف",
    price: 250,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-back",
    name: "الظهر",
    price: 250,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-chest",
    name: "الصدر",
    price: 200,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-full-arms",
    name: "ليزر ذراعين كامل",
    price: 180,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-half-arms",
    name: "نصف الذراعين",
    price: 100,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-face",
    name: "الوجه",
    price: 150,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-bikini",
    name: "البكيني",
    price: 150,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-neck",
    name: "الرقبة",
    price: 150,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-upper-lip",
    name: "الشارب",
    price: 100,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-armpit",
    name: "الإبط",
    price: 100,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
  {
    id: "laser-chin",
    name: "الذقن",
    price: 50,
    category: "laser",
    description: "تقنية ليزر وعناية تراعي بشرتكِ.",
    image: "/images/ليزر.jpg",
  },
)

const featuredIds = [
  "botox-forehead",
  "filler",
  "plasma",
  "scar-injection",
  "meso",
  "profhilo",
  "plasma-dermapen",
  "lip-glam",
  "scar-subcision",
]

export const featuredTreatments: Treatment[] = featuredIds.map((id) => {
  const treatment = priceRows.find((row) => row.id === id)!
  const copy: Record<string, string> = {
    "botox-forehead": "لمسة مدروسة لخطوط الجبهة.",
    filler: "تفاصيل ناعمة تبرز جمالكِ الطبيعي.",
    plasma: "عناية بنضارة بشرتكِ وحيويتها.",
    meso: "عناية متجددة لبشرة تستحق الاهتمام.",
    profhilo: "ترطيب وعناية بمظهر البشرة.",
    "plasma-dermapen": "خطوة متكاملة في رحلة عنايتكِ.",
    "lip-glam": "لمسة خاصة لجمال شفاهكِ.",
  }
  return { ...treatment, description: copy[id] ?? treatment.description }
})

featuredTreatments.splice(4, 0, {
  id: "laser",
  name: "قسم الليزر",
  price: null,
  category: "laser",
  description: "تقنيات حديثة وعناية تراعي بشرتكِ.",
  image: "/images/ليزر_هيرو.jpg",
})

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US").format(price)
