import type { Messages } from "./fr";

export const en = {
  meta: {
    title: "Pi COOP — Citizen cooperative",
    description:
      "Pre-register for Pi COOP: pooled organic groceries at wholesale price + 20 cents (50 cents on pricier items), transparency and solidarity.",
  },
  header: {
    cta: "Pre-register",
    langLabel: "Language",
  },
  hero: {
    title: "Your groceries at wholesale price +\u00a020\u00a0cents",
    titleAria: "See the fixed-margin details",
    subtitleBefore: "Fixed margin, never hidden. Become a",
    subtitleStrong: "co-operator · co-owner",
    subtitleAfter:
      "of your citizen store: €10/month cooperative share and 2\u00a0hours of volunteering. Pre-registration is 100%\u00a0free.",
    footnote:
      "20\u00a0cents on everyday items · 50\u00a0cents on pricier products (oil, nappies…) — details in “How it works”.",
    ctaUnlock: "Unlock prices in my city",
    ctaHow: "How it works",
  },
  folder: {
    title: "Pi digital leaflet",
    intro:
      "Compare for yourself. The same product, 100%\u00a0organic, from the wholesaler to your plate.",
    badge: "Pi digital leaflet",
    formula: "Wholesale + fixed margin (€0.20 or €0.50) = Pi price",
    inStore: "€{price} in store",
    piPrice: "Pi price",
    wholesale: "of which wholesale €{price}",
    markup: "+{cents}\u00a0cents fixed margin",
    unavailable: "Catalogue temporarily unavailable. Please try again shortly.",
    disclaimer: "* Target prices for guidance only. Non-contractual.",
  },
  gauges: {
    title: "Unlock the first Pi store in your city",
    introLead: "10,000 people",
    introMid:
      "= the tipping point to open a neighbourhood store (every household member counts — a family of 5 = +5). Not a hypermarket: ours, together. Beyond that, the gauge keeps going: the more of us there are, the stronger our bargaining power. The",
    introStrong: "first city",
    introEnd:
      "to cross the line opens first. You pay nothing today; the opening pack is only paid once there is a premises and statutes. The next ones follow on an opening roadmap.",
    postalLabel: "Your postal code",
    placeholder: "e.g. 1050",
    unknownPostal: "Unknown postal code",
    pioneer: "You can be the pioneer here — share the link locally.",
    cp: "PC {code}",
    exploded: "Target smashed — next tier {tier}",
    explodedBody:
      "Opening confirmed for this city. Keep going: the more of us there are, the stronger our bargaining power.",
    remaining:
      "{pct}% · {remaining} more people to unlock opening here",
  },
  leaderboard: {
    kicker: "National race",
    title: "The race for the first store",
    intro:
      "Which city will hit 10,000 people first? The first tier opens a Pi neighbourhood store, for members. The next cities join the opening roadmap.",
    remaining: "{count} more to unlock",
    exploded: "Opening target smashed · next tier {tier}",
  },
  how: {
    title: "How it works",
    intro:
      "The Pi COOP recipe in three rules. Not a classic supermarket: a citizen cooperative where purchasing power returns to members.",
    pillars: [
      {
        title: "Your share in the cooperative",
        body: "No invisible shareholders here. From opening day, every household member contributes €10 / month — this is not a subscription: it is your share in the cooperative. You are not customers, you are co-owners of your store. This collective fund is used to buy in volume.",
      },
      {
        title: "Mutual aid (2 h / month)",
        body: "No payroll = genuinely low prices. Every adult aged 18–64 gives 2 hours a month. Ages 0–17 and 65+ are exempt: solidarity does the rest.",
      },
      {
        title: "Full transparency",
        body: "The wholesale price is shown on the shelf. We add a small fixed operating margin: 20 cents on everyday products, and 50 cents on pricier ones (oil, nappies…). Nothing is hidden — you know where every cent goes. (Estimated target prices.)",
      },
    ],
  },
  social: {
    title: "Your neighbours are already here",
    intro:
      "Check whether your neighbours have already signed up on your street (data is 100%\u00a0anonymised).",
    cp: "PC",
    street: "Street",
    see: "See",
    loading: "…",
    hint: "Select a street, then click See.",
    none: "No public number for this street.",
    anonymous:
      "Anonymous display — only numbers whose residents have agreed.",
    chooseStreet: "Choose or type a street",
    houseNo: "No. {n}",
    error: "Error",
  },
  register: {
    sectionTitle: "Become a co-operator",
    sectionIntro:
      "Join the Pi chain in your postal code. No payment today — you come in as a future co-owner.",
    title: "Become a co-operator",
    description:
      "Free pre-registration · you join the Pi chain · no payment today",
    email: "Email",
    password: "Password (8+)",
    household: "Household size",
    composition:
      "Household composition (bands for baby quotas and volunteering — no exact ages are stored).",
    person: "Pers. {n}",
    bandPlaceholder: "Band",
    postalCode: "Postal code",
    street: "Street",
    houseNumber: "No.",
    unknownPostal: "Unknown postal code",
    optIn:
      "Lead by example on my street: show my house number to encourage neighbours (anonymous — no name).",
    submit: "I become a co-operator — it’s free",
    submitting: "Sending…",
    success: "Pre-registration successful. A welcome email will be sent.",
    ageBands: {
      AGE_0_4: "0–4 years (baby quotas)",
      AGE_5_17: "5–17 years",
      AGE_18_64: "18–64 years (volunteering)",
      AGE_65_PLUS: "65+ years",
    },
    toastTitle: "Welcome, co-operator!",
    toastOne:
      "Registration confirmed. Thanks to you, Pi gains a decimal — you are digit {total}.",
    toastMany:
      "Registration confirmed. Your household extends Pi by {added} decimals (digits {from} to {total}). The chain now has {total} digits.",
    errors: {
      generic: "Registration error",
      impossible: "Registration failed",
      turnstile: "Anti-bot verification failed",
      emailTaken: "An account already exists with this email",
      postal: "Belgian 4-digit postal code",
      household: "The number of age bands must match the household size",
      rateLimit: "Too many attempts. Please try again in a few minutes.",
    },
  },
  pi: {
    empty: "Be the first co-operator: you will write the “1” in 3.14…",
    filled:
      "{count} {coopWord} = {count} {decWord}. Join us to lengthen the chain!",
    coopOne: "co-operator",
    coopMany: "co-operators",
    decOne: "decimal",
    decMany: "decimals",
  },
  street: {
    placeholder: "Type the start of the street…",
    needPostal: "Enter the postal code first",
    none: "No street found",
  },
  common: {
    close: "Close",
  },
  footer: {
    how: "How it works",
    legal: "Legal notice",
    privacy: "Privacy",
    phase: "Pi COOP is only Phase\u00a01. Coming soon: Pi Academy and Pi Finance.",
  },
  legal: {
    metaTitle: "Legal notice — Pi COOP",
    metaDescription: "Legal notice for Pi COOP pre-registration.",
    back: "← Back",
    title: "Legal notice",
    publisherTitle: "Publisher",
    publisherBody:
      "The Pi COOP pre-registration site is published as part of the Pi citizen cooperative project (Belgium). Full identity details (legal form, company number, registered office) will be completed once the entity is formally constituted.",
    contact: "Provisional contact:",
    hostingTitle: "Hosting",
    hostingBody:
      "Frontend: Vercel Inc. — Backend / database: cloud providers (e.g. Railway, Neon) depending on the production environment.",
    natureTitle: "Nature of the service",
    natureBefore: "Pre-registration is",
    natureFree: "free",
    natureMid:
      "and does not constitute a purchase commitment. Prices shown in the Pi digital leaflet are",
    natureEstimates: "non-contractual estimates",
    natureEnd: ".",
  },
  privacy: {
    metaTitle: "Privacy — Pi COOP",
    metaDescription: "Privacy policy for Pi COOP pre-registration.",
    back: "← Back",
    title: "Privacy policy",
    controllerTitle: "Data controller",
    controllerBody:
      "Pi COOP processes your data to manage pre-registration for the citizen cooperative. Contact:",
    dataTitle: "Data collected",
    data: [
      "Email and password (hashed)",
      "Household size and age bands (no exact ages)",
      "Postal code, street, house number",
      "Optional consent to display the house number anonymously on the street",
    ],
    purposeTitle: "Purposes",
    purposes: [
      "Create and secure your pre-registration account",
      "Measure interest by postal code (store opening)",
      "Inform you about the launch (email)",
      "Display anonymous house numbers if you consented",
    ],
    legalTitle: "Legal basis",
    legalBody:
      "Performance of pre-contractual steps at your request, legitimate interest in organising the cooperative, and consent for the public display of the house number.",
    retentionTitle: "Retention",
    retentionBody:
      "Data is kept for the pre-registration and launch phase, then according to applicable legal obligations.",
    rightsTitle: "Your rights",
    rightsBody:
      "Under the GDPR, you have the right of access, rectification, erasure, restriction and objection. Write to contact@picoop.be. You may also lodge a complaint with the Belgian Data Protection Authority (APD / GBA).",
  },
} satisfies Messages;
