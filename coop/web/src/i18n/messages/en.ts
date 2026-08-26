import type { Messages } from "./fr";

export const en = {
  meta: {
    title: "Pi COOP — Citizen cooperative",
    description:
      "Pre-register for Pi COOP: pooled organic groceries at wholesale price + 20 cents on dry goods (50 cents on fresh and pricier items), transparency and solidarity.",
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
      "of your citizen supermarket. Pre-registration is free. At opening, the principle is simple: a share (€25 minimum), a €10 / month subscription, and 2 hours of mutual aid per adult (18–65).",
    footnote:
      "20\u00a0cents on dry goods · 50\u00a0cents on fresh and pricier products — details in “How it works”.",
    ctaUnlock: "Unlock prices in my city",
    ctaHow: "How it works",
  },
  folder: {
    title: "Pi digital leaflet",
    intro:
      "Compare for yourself. The same product, 100%\u00a0organic, from the wholesaler to your plate.",
    badge: "Pi digital leaflet",
    organicBadge: "Organic",
    formula: "Wholesale + fixed margin (20\u00a0or\u00a050\u00a0cents) = Pi price",
    inStore: "€{price} in store",
    piPrice: "Pi price",
    wholesale: "of which wholesale €{price}",
    markup: "+{cents}\u00a0cents fixed margin",
    unavailable: "Catalogue temporarily unavailable. Please try again shortly.",
    disclaimer: "* Target prices for guidance only. Non-contractual.",
  },
  gauges: {
    title: "Unlock the first Pi supermarket",
    introLead: "5,000 households",
    introMid:
      "= the tipping point to launch the project (each sign-up = one household). Not a conventional hypermarket: ours, together. Communes are grouped into life basins to show where mobilisation is strongest. Beyond that, the gauge keeps going: the more of us there are, the stronger our bargaining power. The",
    introStrong: "most mobilised zone",
    introEnd:
      "will be prioritised for opening. You pay nothing today. The share (€25 minimum) and the subscription only start once there is a premises and the cooperative is constituted.",
    postalLabel: "Your postal code",
    placeholder: "e.g. 1090",
    unknownPostal: "Unknown postal code",
    pioneer: "You can be the pioneer here — share the link locally.",
    needPostal: "Enter your postal code to see where your life basin stands.",
    people: "{count} / 5,000",
    goal: "Goal: 5,000 households to launch.",
    yourCp: "Your postal code: {code}",
    cp: "PC {code}",
    exploded: "Target smashed — next tier {tier}",
    explodedBody:
      "Interest threshold reached for this zone. Opening only happens if there is a premises and statutes. Keep going: the more of us there are, the stronger our bargaining power.",
    remaining:
      "{pct}% · {remaining} more households to reach the goal here",
    showBreakdown: "See breakdown by commune",
    hideBreakdown: "Hide breakdown by commune",
    nextMilestone: "Next milestone ({count}): {label}",
    nextBasinInfo:
      "Next info session in this basin: at {count} households (every 50).",
    milestones: {
      m1: "500 — product preference survey",
      m2: "2,000 — cooperative constitution",
      m3: "3,000 — share reservation",
      m4: "4,000 — first payments + lease",
      m5: "5,000 — imminent opening",
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
    title: "Which zone is most mobilised?",
    intro:
      "Strength in numbers. Goal: 5,000 households to launch. Brussels life basins progress in parallel — the more mobilised a zone is, the higher its priority.",
    progress: "{pct}%",
    communeFallback: "Commune {cp}",
    brusselsZones: "Brussels zones",
    outsideBrussels: "Elsewhere in Belgium",
    breakdown: "Breakdown by commune",
    expand: "Show",
    collapse: "Hide",
    remaining: "{count} more to the goal",
    exploded: "Opening target smashed · next tier {tier}",
  },
  how: {
    title: "How it works",
    intro:
      "The Pi COOP recipe in four rules. A human-scale supermarket, not a conventional hypermarket: a citizen cooperative where purchasing power returns to members.",
    flows: {
      subtitle:
        "At Pi COOP, the store’s survival does not depend on a %-margin on your groceries.",
      share: {
        title: "€25 share",
        body: "Fridges, shelves, checkouts — store equipment.",
      },
      abo: {
        title: "€10 / month subscription",
        body: "Rent, cold energy, supervising team.",
      },
      margin: {
        title: "20 / 50 cent margin",
        body: "Spoilage and unsold stock only — nothing else.",
      },
      prepaidTitle: "Why prepaying changes everything",
      prepaidBody:
        "Members top up their card before buying. That money is used to order in bulk (pallets / trucks), at wholesale price, as close as possible to producers — without stacking the “distributor + percentage margin” logic. Result: sharper negotiation than a classic shop with middlemen and often ~20% (or more) on the ticket. At Pi: wholesale + 20 or 50 cents. The €10 subscription? It pays rent and supervision — and with the price gap from the first shops, that subscription is in practice amortised quickly on the basket.",
    },
    simulator: {
      title: "Estimate your Pi COOP budget",
      intro:
        "About €250 purchase cap per person / month → 1 subscription at €10. Stack if needed.",
      peopleLabel: "Number of people shopping for",
      result:
        "You need {abos} subscription(s) → {cap} € / month cap (subscription {monthly} € / month).",
      hint: "A guideline. At opening, you choose according to your real budget.",
    },
    pillars: [
      {
        title: "You’re in charge",
        subtitle: "The share",
        bullets: [
          {
            label: "The principle",
            text: "You become co-owner of your cooperative supermarket — no invisible shareholders.",
          },
          {
            label: "The amount",
            text: "€25 minimum per household (one-time payment at opening).",
          },
          {
            label: "What it funds",
            text: "Equipment only: fridges, shelves, checkouts.",
          },
        ],
      },
      {
        title: "Fair running costs",
        subtitle: "The subscription",
        bullets: [
          { label: "The amount", text: "€10 / month." },
          {
            label: "The benefit",
            text: "A €250 purchase cap (roughly one person’s monthly food budget).",
          },
          {
            label: "What it covers",
            text: "Fixed costs: rent, electricity, supervision.",
          },
        ],
        note: "Larger families simply stack subscriptions (e.g. €20 for a €500 cap).",
      },
      {
        title: "Our bargaining power",
        subtitle: "The prepaid card",
        bullets: [
          {
            label: "How it works",
            text: "Top up your member card by bank transfer, then pay at checkout.",
          },
          {
            label: "Our superpower",
            text: "Pooled cash lets us buy full truckloads from producers — no bank dependency!",
          },
          {
            label: "Shelf price",
            text: "True product cost plus a tiny fixed margin (€0.20 dry, €0.50 fresh) for spoilage. Nothing hidden.",
          },
        ],
      },
      {
        title: "The secret of our prices",
        subtitle: "Mutual aid",
        bullets: [
          {
            label: "The rule",
            text: "Every adult member (18–65) gives 2 hours a month to keep the store running.",
          },
          {
            label: "Tasks",
            text: "Shelving, checkout, welcome desk, cleaning…",
          },
          {
            label: "The result",
            text: "The heart of the project. By slashing wage costs, we slash your shelf prices!",
          },
        ],
        note: "Under-18s and 65+ are not required to take part (unless they wish to).",
        legalNote:
          "The 2 h / month are a condition for shopping once you are a member — not employment. Before opening: agreement, insurance and brief training.",
      },
    ],
    v2: {
      title: "Pi COOP: the “price” version of citizen co-ops",
      intro:
        "Other citizen supermarkets already exist: mutual aid, organic, healthier products. We share the same spirit.",
      bullets: [
        "The subscription pays rent and staff — not a hidden margin on every product.",
        "The small fixed margin (20 or 50 cents) covers spoilage only.",
        "The prepaid card lets us buy in bulk, as close as possible to producers.",
      ],
      closing:
        "In short: same co-op spirit, different price rule — no %-margin on every item.",
      examplesLead:
        "Illustration (how the margin works, not a penny-perfect promise):",
      examples: [
        "Hypothetical €5 wholesale: shop at +20% ≈ €6 → at Pi: €5.20 (dry).",
        "Hypothetical €10 wholesale: shop at +20% ≈ €12 → at Pi: €10.20 (dry) or €10.50 (fresh).",
      ],
      examplesNote:
        "If pooled buying lets us negotiate even lower wholesale, your shelf price drops too: always actual purchase price + 20 or 50 cents.",
    },
    openingStagesTitle: "Opening: what you find from day one",
    openingStagesBody:
      "From day one: dry food, pre-packed fruit and vegetables (piece, net or punnet), dairy, and meat — cold cuts or poultry only pre-packed —, no butcher counter.",
    zeroWasteTitle: "Zero-waste goal",
    zeroWasteBody:
      "From day one, a small “cold” prep kitchen can cut, vacuum-seal and freeze fresh products that might otherwise be lost. A “hot” processing kitchen (sauces, jams) will come in a second phase, once the store is up and running.",
  },
  manifesto: {
    eyebrow: "Our manifesto",
    title: "Take back control, together.",
    p1: "For too long, we were told that faced with inflation, there was nothing to be done. That we had to accept, in silence, opaque margins and prices that rise without explanation. Isolated, each in our own trolley, we become small. And alone, we change little.",
    p2Before: "They forgot one thing:",
    p2Strong: "small is not a weakness when we come together.",
    p3: "That is where Pi COOP was born. Like the number π: a small sign, a force that never ends.",
    p4: "Pi COOP is not just another supermarket. It is a citizen cooperative born of an urgency: to stop putting up with it.",
    ticket:
      "On a classic checkout receipt, you are not only paying for what is in the basket. You are also funding the rent of giant stores, the salaries of a management pyramid, advertising, and margins that do not belong to you.",
    ruleLead:
      "At Pi COOP, the rule is the opposite — simple, and it will not change:",
    rule:
      "we buy together, at true wholesale price (direct from the producer); we show that price; we add a fixed margin — 20\u00a0cents on dry goods, 50\u00a0cents on fresh and pricier products — to absorb spoilage and unsold stock. Nothing hidden.",
    volunteer:
      "From opening day, every adult aged 18 to 65 gives 2 hours a month. Younger people and those over 65 are exempt, unless they wish to take part. Fewer middlemen, prices that hold, and neighbourhood ties that return.",
    closing:
      "It is time to take back power over our groceries — and over our lives.",
    cta: "I pre-register for free",
  },
  social: {
    title: "Your neighbours are already here",
    intro:
      "Check whether neighbours have already signed up on your street — without showing any address or name.",
    cp: "PC",
    street: "Street",
    see: "See",
    loading: "…",
    hint: "Select a street, then click See.",
    none: "Not enough neighbours shown here yet — invite someone on your street.",
    anonymous:
      "Anonymous display — only the number of signed-up households (from 2 up), never a house number.",
    chooseStreet: "Choose or type a street",
    volume: "{count} neighbours have already signed up on {street}!",
    error: "Error",
  },
  join: {
    title: "Join the cooperative, together",
    whereHeading: "Where is the project today?",
    whereParagraphs: [
      "Pi COOP is not yet incorporated before a notary. That is normal at this stage.",
      "To open, we need registered households — and people ready to help the project move forward.",
    ],
    howHeading: "Two ways to take part",
    paths: [
      {
        title: "Future co-operator",
        lines: [
          "Free pre-registration, no commitment.",
          "Every household feeds the gauge and our bargaining power.",
        ],
      },
      {
        title: "Project pioneer",
        lines: [
          "Neighbourhood outreach, premises, legal, producers…",
          "Write to us if you want to help carry the project.",
        ],
      },
    ],
    statusHeading: "No financial commitment today",
    status:
      "Share capital and subscription will only be requested as opening approaches.",
    ctaRegister: "Pre-register for free",
    ctaHelp: "Offer my help",
    ctaHelpSubject: "Pi COOP — offer to help the project",
    helpEmail: "info@picoop.be",
  },
  register: {
    sectionTitle: "Become a future co-operator",
    sectionIntro:
      "Enter your household and address. Your household counts toward the goal of 5,000 households.",
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
      AGE_18_64: "18–65 years (volunteering)",
      AGE_65_PLUS: "65+ years",
    },
    toastTitle: "Welcome, future co-operator!",
    toastOne:
      "Registration confirmed. Thanks to you, Pi gains a decimal — your household is digit {total}.",
    toastMany:
      "Registration confirmed. Thanks to you, Pi gains a decimal — your household is digit {total}.",
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
    empty: "Be the first household to sign up: you will write the “1” in 3.14…",
    filled:
      "{count} {coopWord} = {count} {decWord}. Join us to lengthen the chain!",
    coopOne: "household",
    coopMany: "households",
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
    manifesto: "Manifesto",
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
      "The project aims to open a human-scale cooperative supermarket with a broad range (dry goods and pre-packed fresh), not a conventional hypermarket. No payment or contribution is requested at this stage — including no bank transfer or prepaid-card top-up. A share (€25 minimum) and a monthly subscription will only be offered once the cooperative has been constituted before a notary and premises have been identified.",
    ipTitle: "Intellectual property",
    ipBody:
      "The texts, the π logo, the visual identity and the other elements of the site are protected. Unauthorised reproduction is prohibited.",
    lawTitle: "Applicable law",
    lawBody:
      "The site is governed by Belgian law. In the event of a dispute, Belgian courts have jurisdiction, without prejudice to mandatory consumer-protection rules.",
    relatedPrivacy: "Privacy policy",
    updated: "Last updated: 26 August 2026",
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
      "Postal code, street, house number (kept for the account; the house number is never shown publicly)",
      "Technical security data (Cloudflare Turnstile anti-bot verification)",
      "Aggregated audience measurement (Vercel Analytics), without advertising cookies",
      "Language preference (pi_locale cookie)",
    ],
    purposeTitle: "Purposes",
    purposes: [
      "Create and secure your pre-registration account",
      "Count households by postal code and aggregate by life basin for public display (goal of 5,000 households to launch the project)",
      "Inform you of the launch by email",
      "Display an anonymous count of signed-up households per street (from 2 households up, without house numbers)",
      "Protect the form against automated sign-ups",
      "Understand site traffic, without targeted advertising",
      "Remember the display language",
    ],
    legalTitle: "Legal basis",
    legalBody:
      "Pre-contractual steps at your request (creating the account), and legitimate interest in organising the cooperative project, securing the site, and showing anonymous street-level volumes to encourage local mobilisation.",
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
      "We do not create accounts for children. Household age bands (including 0–4 and 5–17) are recorded without exact age and without first names, solely to explain future contribution and volunteering rules.",
    rightsTitle: "Your rights",
    rightsBody:
      "Under the GDPR, you have the right of access, rectification, erasure, restriction, objection and portability. Write to",
    rightsAfter:
      "You may also lodge a complaint with the Belgian Data Protection Authority (APD / GBA), Rue de la Presse 35, 1000 Brussels.",
    apdLabel: "autoriteprotectiondonnees.be",
    apdUrl: "https://www.autoriteprotectiondonnees.be",
    relatedLegal: "Legal notice",
    updated: "Last updated: 26 August 2026",
  },
} satisfies Messages;
