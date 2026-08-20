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
  brand: {
    slogan: "Strength in numbers",
  },
  hero: {
    title: "Your groceries at wholesale price +\u00a020\u00a0cents",
    titleAria: "See the fixed-margin details",
    subtitleBefore: "Fixed margin, never hidden. Become a",
    subtitleStrong: "future co-operator",
    subtitleAfter:
      "of your citizen supermarket. Pre-registration is free. The €10/month and 2 hours of volunteering start only at opening, once the cooperative is constituted.",
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
    organicBadge: "Organic",
    formula: "Wholesale + fixed margin (€0.20 or €0.50) = Pi price",
    inStore: "€{price} in store",
    piPrice: "Pi price",
    wholesale: "of which wholesale €{price}",
    markup: "+{cents}\u00a0cents fixed margin",
    unavailable: "Catalogue temporarily unavailable. Please try again shortly.",
    disclaimer: "* Target prices for guidance only. Non-contractual.",
  },
  gauges: {
    title: "Unlock the first Pi supermarket in your life basin",
    introLead: "10,000 people",
    introMid:
      "= the tipping point to open a human-scale supermarket (every household member counts — a family of 5 = +5). Not a conventional hypermarket: ours, together. Smaller communes are grouped into equivalent life basins. Beyond that, the gauge keeps going: the more of us there are, the stronger our bargaining power. The",
    introStrong: "first zone",
    introEnd:
      "to cross the line opens first. You pay nothing today; the opening pack is only paid once there is a premises and statutes.",
    postalLabel: "Your postal code",
    placeholder: "e.g. 1090",
    unknownPostal: "Unknown postal code",
    pioneer: "You can be the pioneer here — share the link locally.",
    needPostal: "Enter your postal code to see where your life basin stands.",
    people: "{count} / 10,000",
    goal: "Goal: 10,000 people to open the zone.",
    yourCp: "Your postal code: {code}",
    cp: "PC {code}",
    exploded: "Target smashed — next tier {tier}",
    explodedBody:
      "Interest threshold reached for this zone. Opening only happens if there is a premises and statutes. Keep going: the more of us there are, the stronger our bargaining power.",
    remaining:
      "{pct}% · {remaining} more people to unlock opening here",
    showBreakdown: "See breakdown by commune",
    hideBreakdown: "Hide breakdown by commune",
    nextMilestone: "Next milestone ({count}): {label}",
    milestones: {
      m1: "Tier 1 — enough neighbours for a first local meeting",
      m2: "Tier 2 — first commercial feasibility step",
      m3: "Tier 3 — active search for premises",
      m4: "Tier 4 — opening eligible (premises + statutes required)",
    },
  },
  zones: {
    "brussels-nord-ouest": {
      name: "North-West Zone",
      communes: "Jette, Koekelberg, Berchem-Sainte-Agathe, Ganshoren",
    },
    "brussels-ouest": {
      name: "West Zone",
      communes: "Molenbeek-Saint-Jean",
    },
    "brussels-sud-ouest": {
      name: "South-West Zone",
      communes: "Anderlecht",
    },
    "brussels-centre-nord": {
      name: "North Centre Zone",
      communes: "Laeken, Neder-Over-Heembeek, Haren",
    },
    "brussels-centre": {
      name: "Centre Zone",
      communes: "Brussels City",
    },
    "brussels-nord-est": {
      name: "North-East Zone",
      communes: "Schaerbeek",
    },
    "brussels-nord-compact": {
      name: "Compact North Zone",
      communes: "Saint-Josse-ten-Noode, Evere",
    },
    "brussels-centre-est": {
      name: "East Centre Zone",
      communes: "Ixelles, Etterbeek",
    },
    "brussels-est": {
      name: "East Zone",
      communes: "Woluwe-Saint-Lambert, Woluwe-Saint-Pierre, Auderghem, Watermael-Boitsfort",
    },
    "brussels-sud": {
      name: "South Zone",
      communes: "Uccle",
    },
    "brussels-sud-compact": {
      name: "Compact South Zone",
      communes: "Forest, Saint-Gilles",
    },
  },
  leaderboard: {
    kicker: "Race to open",
    title: "Which zone will open first?",
    intro:
      "Strength in numbers. Brussels life basins in a friendly race — every household member counts. The first zone to 10,000 opens first.",
    progress: "{pct}%",
    communeFallback: "Commune {cp}",
    outsideBrussels: "Elsewhere in Belgium",
    remaining: "{count} more to unlock",
    exploded: "Opening target smashed · next tier {tier}",
  },
  how: {
    title: "How it works",
    intro:
      "The Pi COOP recipe in three rules. A human-scale supermarket, not a conventional hypermarket: a citizen cooperative where purchasing power returns to members.",
    pillars: [
      {
        title: "Your share in the cooperative",
        body: "No invisible shareholders here. From opening day, once the cooperative is constituted, every household member contributes €10 / month — this is not a subscription: it is your share. You are not customers: you become co-owners of your store. This collective fund is used to buy in volume.",
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
    openingStagesTitle: "Opening in stages",
    openingStagesBody:
      "The first Pi store opens without fridges, with a broad but easy-to-run range: dry and long-life food (starches, sauces, tins, oils…), drinks, household and cleaning products, hygiene and cosmetics, and other everyday essentials that don’t need a cold chain. Fridges and fresh products come later, once the store, volunteering and logistics are stable.",
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
    sectionTitle: "Become a future co-operator",
    sectionIntro:
      "Enter your household and address. You count toward the 10,000-person threshold for your life basin.",
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
    submit: "I become a future co-operator — it’s free",
    submitting: "Sending…",
    success: "Pre-registration successful. A welcome email will be sent.",
    sharePrompt:
      "Share around you — you just joined the {zone} team!",
    shareCta: "Share Pi COOP",
    shareCopied: "Message copied",
    shareMessage:
      "I joined the {zone} team at Pi COOP! Help us open our cooperative supermarket: {url}",
    ageBands: {
      AGE_0_4: "0–4 years (baby quotas)",
      AGE_5_17: "5–17 years",
      AGE_18_64: "18–64 years (volunteering)",
      AGE_65_PLUS: "65+ years",
    },
    toastTitle: "Welcome, future co-operator!",
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
    empty: "Be the first to sign up: you will write the “1” in 3.14…",
    filled:
      "{count} {coopWord} = {count} {decWord}. Join us to lengthen the chain!",
    coopOne: "person",
    coopMany: "people",
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
    facebook: "Facebook",
    legal: "Legal notice",
    privacy: "Privacy",
    phase: "Pi COOP is only Phase\u00a01. Coming soon: Pi Academy and Pi Invest.",
  },
  legal: {
    metaTitle: "Legal notice — Pi COOP",
    metaDescription: "Legal notice for the Pi COOP pre-registration site.",
    back: "← Back",
    title: "Legal notice",
    publisherTitle: "Publisher",
    publisherIntro:
      "The website www.picoop.be is published by Mustapha El Abyad, a natural-person enterprise, trading as “à votre service”.",
    publisherItems: [
      "Enterprise number: 1007.072.509",
      "VAT: BE 1007.072.509",
      "Address: Avenue Emile de Beco 51, 1050 Ixelles, Belgium",
    ],
    publisherCoop:
      "Pi COOP is a citizen cooperative project. The cooperative entity has not yet been constituted. These notices will be updated once it is created.",
    contact: "Contact:",
    contactEmail: "info@picoop.be",
    hostingTitle: "Hosting",
    hosting: [
      "Website: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.",
      "API: Railway Corp., 548 Market Street PMB 42068, San Francisco, CA 94104, United States.",
      "Database: Neon, Inc., hosted in the European Union.",
    ],
    natureTitle: "Nature of the service",
    natureIntro:
      "Pre-registration is 100\u00a0% free, without obligation, and does not constitute a purchase or subscription commitment. Prices shown (on the site or in the Pi digital leaflet) are estimated target prices and are strictly non-contractual.",
    natureStore:
      "The project aims to open a pilot supermarket at human scale, not a conventional hypermarket. No payment or contribution is requested at this stage. Share capital or an opening pack will only be offered to the public once the cooperative has been formally constituted before a notary and commercial premises have been identified.",
    ipTitle: "Intellectual property",
    ipBody:
      "The texts, the π logo, the visual identity and the other elements of the site are protected. Unauthorised reproduction is prohibited.",
    lawTitle: "Applicable law",
    lawBody:
      "The site is governed by Belgian law. In the event of a dispute, Belgian courts have jurisdiction, without prejudice to mandatory consumer-protection rules.",
    relatedPrivacy: "Privacy policy",
    updated: "Last updated: 18 August 2026",
  },
  privacy: {
    metaTitle: "Privacy — Pi COOP",
    metaDescription: "Privacy policy for Pi COOP pre-registration.",
    back: "← Back",
    title: "Privacy policy",
    controllerTitle: "Data controller",
    controllerBody:
      "The data controller is Mustapha El Abyad, a natural-person enterprise (trading as “à votre service”), enterprise number 1007.072.509, Avenue Emile de Beco 51, 1050 Ixelles, Belgium. Contact:",
    contactEmail: "info@picoop.be",
    dataTitle: "Data collected",
    data: [
      "Email and password (stored only as a hash)",
      "Household size and age bands (no exact ages, no names of household members)",
      "Postal code, street, house number",
      "Optional consent to display the house number anonymously on the street",
      "Technical security data (Cloudflare Turnstile anti-bot verification)",
      "Aggregated audience measurement (Vercel Analytics), without advertising cookies",
      "Language preference (pi_locale cookie)",
    ],
    purposeTitle: "Purposes",
    purposes: [
      "Create and secure your pre-registration account",
      "Count persons by postal code and aggregate by life basin for public display (10,000-person opening threshold per zone)",
      "Inform you of the launch by email",
      "Display anonymous house numbers if you consented",
      "Protect the form against automated sign-ups",
      "Understand site traffic, without targeted advertising",
      "Remember the display language",
    ],
    legalTitle: "Legal basis",
    legalBody:
      "Pre-contractual steps at your request (creating the account), legitimate interest in organising the cooperative project and securing the site, and consent for the public display of the house number. You may withdraw that consent at any time by writing to the contact address.",
    recipientsTitle: "Recipients",
    recipients: [
      "Vercel (website hosting)",
      "Railway (API)",
      "Neon (database, European Union)",
      "Resend (welcome email)",
      "Cloudflare (Turnstile anti-bot)",
    ],
    recipientsAfter:
      "These providers act only to operate the service. We do not sell your data. There is no Facebook pixel and no targeted advertising on picoop.be.",
    transfersTitle: "Transfers outside the European Economic Area",
    transfersBody:
      "Vercel, Railway, Resend and Cloudflare are established in the United States. Transfers rely on their contractual safeguards (including standard contractual clauses where applicable). The Neon database is hosted in the European Union.",
    cookiesTitle: "Cookies and similar technologies",
    cookies: [
      "pi_locale: essential cookie, stores FR / NL / EN, one-year duration",
      "Cloudflare Turnstile: strictly necessary for the security of the registration form",
      "Vercel Analytics: audience measurement without advertising cookies",
    ],
    cookiesAfter:
      "No consent banner is shown, because the site does not use advertising cookies or marketing tracking.",
    retentionTitle: "Retention",
    retentionBody:
      "Account data is kept for the pre-registration phase. It is erased on request, or reviewed when the cooperative is constituted (taken over by the new entity with notice, or deleted). Technical security logs are kept only as long as needed.",
    childrenTitle: "Household and children",
    childrenBody:
      "We do not create accounts for children. Household age bands (including 0–4 and 5–17) are recorded without exact age and without first names, solely to count persons and explain future contribution rules.",
    rightsTitle: "Your rights",
    rightsBody:
      "Under the GDPR, you have the right of access, rectification, erasure, restriction, objection, portability, and withdrawal of consent for the house-number display. Write to",
    rightsAfter:
      "You may also lodge a complaint with the Belgian Data Protection Authority (APD / GBA), Rue de la Presse 35, 1000 Brussels.",
    apdLabel: "autoriteprotectiondonnees.be",
    apdUrl: "https://www.autoriteprotectiondonnees.be",
    relatedLegal: "Legal notice",
    updated: "Last updated: 17 August 2026",
  },
} satisfies Messages;
