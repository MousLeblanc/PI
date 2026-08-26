import type { Messages } from "./fr";

export const nl = {
  meta: {
    title: "Pi COOP — Burgercoöperatie",
    description:
      "Voorinschrijving bij Pi COOP: groepsinkopen bio aan groothandelsprijs + 20 cent op droog (50 cent op vers en duurdere producten), transparantie en solidariteit.",
  },
  header: {
    cta: "Voorinschrijving",
    langLabel: "Taal",
  },
  brand: {
    slogan: "Het getal maakt de kracht",
  },
  hero: {
    title: "Jouw boodschappen aan groothandelsprijs +\u00a020\u00a0cent",
    titleAria: "Bekijk de details van de vaste marges",
    subtitleBefore: "Vaste marge, nooit verborgen. Word",
    subtitleStrong: "toekomstige coöperant",
    subtitleAfter:
      "van je burgersupermarkt. De voorinschrijving is gratis. Bij de opening is het principe eenvoudig: een aandeel (minstens 25\u00a0€), een abonnement van 10\u00a0€ / maand, en 2\u00a0u wederzijdse hulp per volwassene (18–65).",
    footnote:
      "20\u00a0cent op droog · 50\u00a0cent op vers en duurdere producten — details in «\u00a0Hoe werkt het\u00a0?\u00a0».",
    ctaUnlock: "Ontgrendel de prijzen in mijn stad",
    ctaHow: "Hoe werkt het\u00a0?",
  },
  folder: {
    title: "Digitale folder Pi",
    intro:
      "Vergelijk zelf. Hetzelfde product, 100\u00a0% bio, rechtstreeks van de groothandel op je bord.",
    badge: "Digitale folder Pi",
    organicBadge: "Bio",
    formula:
      "Groothandelsprijs + vaste marge (20\u00a0of\u00a050\u00a0cent) = Pi-prijs",
    inStore: "{price}\u00a0€ in de winkel",
    piPrice: "Pi-prijs",
    wholesale: "waarvan groothandel {price}\u00a0€",
    markup: "+{cents}\u00a0cent vaste marge",
    unavailable:
      "Catalogus tijdelijk onbeschikbaar. Probeer het zo dadelijk opnieuw.",
    disclaimer:
      "* Richtprijzen ter indicatie. Niet contractueel.",
  },
  gauges: {
    title: "Ontgrendel de eerste Pi-supermarkt",
    introLead: "5.000 gezinnen",
    introMid:
      "= het kantelpunt om het project te lanceren (elke inschrijving = één gezin). Geen klassieke hypermarkt: de onze, van ons. Gemeenten worden gegroepeerd in leefbekkens om te zien waar de mobilisatie het sterkst is. Daarna loopt de meter verder: hoe meer we zijn, hoe sterker de onderhandelingskracht. De",
    introStrong: "meest gemobiliseerde zone",
    introEnd:
      "krijgt voorrang voor de opening. Vandaag betaal je niets. Het aandeel (minstens 25\u00a0€) en het abonnement starten pas als er een pand is en de coöperatie is opgericht.",
    postalLabel: "Jouw postcode",
    placeholder: "bv. 1090",
    unknownPostal: "Onbekende postcode",
    pioneer: "Jij kan hier de pionier zijn — deel de link lokaal.",
    needPostal: "Vul je postcode in om te zien waar jouw leefbekken staat.",
    people: "{count} / 5.000",
    goal: "Doel: 5.000 gezinnen om te lanceren.",
    yourCp: "Jouw postcode: {code}",
    cp: "PC {code}",
    exploded: "Doel overschreden — volgende drempel {tier}",
    explodedBody:
      "Interessedrempel bereikt voor deze zone. Opening volgt alleen als er een pand en statuten zijn. Ga door: hoe meer we zijn, hoe sterker de onderhandelingskracht.",
    remaining:
      "{pct}\u00a0% · nog {remaining} gezinnen om het doel hier te bereiken",
    showBreakdown: "Detail per gemeente bekijken",
    hideBreakdown: "Detail per gemeente verbergen",
    nextMilestone: "Volgende drempel ({count}): {label}",
    nextBasinInfo:
      "Volgende infosessie in dit bekken: bij {count} gezinnen (elke 50).",
    milestones: {
      m1: "500 — enquête productvoorkeuren",
      m2: "2.000 — oprichting van de coöperatie",
      m3: "3.000 — reservatie van aandelen",
      m4: "4.000 — eerste betalingen + huurcontract",
      m5: "5.000 — opening nabij",
    },
  },
  zones: {
    "brussels-nord-ouest": {
      name: "Zone Noord-West",
      communes: "Jette, Koekelberg, Berchem-Saint-Agathe, Ganshoren",
    },
    "brussels-ouest": {
      name: "Zone West",
      communes: "Molenbeek-Saint-Jean",
    },
    "brussels-sud-ouest": {
      name: "Zone Zuid-West",
      communes: "Anderlecht",
    },
    "brussels-centre-nord": {
      name: "Zone Centrum-Noord",
      communes: "Laken, Neder-Over-Heembeek, Haren",
    },
    "brussels-centre": {
      name: "Zone Centrum",
      communes: "Brussel-Stad",
    },
    "brussels-nord-est": {
      name: "Zone Noord-Oost",
      communes: "Schaarbeek",
    },
    "brussels-nord-compact": {
      name: "Zone Noord compact",
      communes: "Sint-Joost-ten-Node, Evere",
    },
    "brussels-centre-est": {
      name: "Zone Centrum-Oost",
      communes: "Elsene, Etterbeek",
    },
    "brussels-est": {
      name: "Zone Oost",
      communes: "Sint-Lambrechts-Woluwe, Sint-Pieters-Woluwe, Oudergem, Watermaal-Bosvoorde",
    },
    "brussels-sud": {
      name: "Zone Zuid",
      communes: "Ukkel",
    },
    "brussels-sud-compact": {
      name: "Zone Zuid compact",
      communes: "Vorst, Sint-Gillis",
    },
  },
  leaderboard: {
    kicker: "Race naar opening",
    title: "Welke zone is het meest gemobiliseerd?",
    intro:
      "Het getal maakt de kracht. Doel: 5.000 gezinnen om te lanceren. De leefbekkens van Brussel vorderen parallel — hoe sterker een zone gemobiliseerd is, hoe hoger de prioriteit.",
    progress: "{pct}\u00a0%",
    communeFallback: "Gemeente {cp}",
    brusselsZones: "Brusselse zones",
    outsideBrussels: "Elders in België",
    breakdown: "Detail per gemeente",
    expand: "Tonen",
    collapse: "Verbergen",
    remaining: "Nog {count} tot het doel",
    exploded: "Openingsdoel overschreden · volgende drempel {tier}",
  },
  how: {
    title: "Hoe werkt het\u00a0?",
    intro:
      "Le Pi COOP-recept in vier regels. Een supermarkt op menselijke schaal, geen klassieke hypermarkt: een burgercoöperatie waar de koopkracht terug naar de leden gaat.",
    flows: {
      subtitle:
        "De overleving van de winkel hangt niet af van een %-marge op je boodschappen.",
      share: {
        title: "Aandeel 25 €",
        body: "Koelkasten, rekken, kassa’s — uitrusting van de winkel.",
      },
      abo: {
        title: "Abonnement 10 € / maand",
        body: "Huur, koude-energie, begeleidend team.",
      },
      margin: {
        title: "Marge 20 / 50 cent",
        body: "Enkel bederf en onverkocht — niets anders.",
      },
      example:
        "Hypothese aan 5 € groothandel: winkel +20 % ≈ 6 € → bij Pi: 5,20 € (droog). Hypothese aan 10 € groothandel: winkel +20 % ≈ 12 € → bij Pi: 10,20 € (droog) of 10,50 € (vers).",
      exampleNote:
        "Illustratie van de margeregel, geen prijsbelofte. Als groepsinkoop ons goedkoper laat inkopen, daalt ook de schapprijs: steeds werkelijke aankoopprijs + 20 of 50 cent.",
      prepaidTitle: "Waarom vooraf opladen alles verandert",
      prepaidBody:
        "Leden laden hun kaart op vóór aankoop. Dat geld dient om in groot volume te bestellen (palletten / vrachtwagens), tegen groothandelsprijs, zo dicht mogelijk bij de producenten — zonder de logica « distributeur + procentmarge » te stapelen. Resultaat: scherper onderhandelen dan een klassieke winkel met tussenpersonen en vaak ~20 % (of meer) op het ticket. Bij Pi: groothandelsprijs + 20 of 50 cent. De 10 € abonnement? Dat betaalt huur en begeleiding — en met het prijsverschil vanaf de eerste boodschappen is dat abonnement in de praktijk snel terugverdiend op het mandje (orde van grootte: enkele duurdere producten volstaan vaak).",
    },
    simulator: {
      title: "Hoeveel abonnementen voor mijn gezin?",
      intro:
        "Rekenregel: ongeveer 250 € aankoopplafond per persoon / maand → 1 abonnement van 10 €. Stapelen indien nodig.",
      peopleLabel: "Aantal personen voor de boodschappen",
      result:
        "Je hebt {abos} abonnement(en) nodig → plafond {cap} € / maand (abonnement {monthly} € / maand).",
      hint: "Richtlijn. Bij de opening kies je zelf volgens je echte budget.",
    },
    pillars: [
      {
        title: "Jij bent de baas",
        subtitle: "Het aandeel",
        bullets: [
          {
            label: "Het principe",
            text: "Je wordt mede-eigenaar van je coöperatieve supermarkt — geen onzichtbare aandeelhouders.",
          },
          {
            label: "Het bedrag",
            text: "Minimaal 25 € per gezin (eenmalig bij de opening).",
          },
          {
            label: "Waarvoor dient het?",
            text: "Enkel materiële uitrusting (koelkasten, rekken, kassa’s).",
          },
        ],
      },
      {
        title: "Een eerlijke werking",
        subtitle: "Het abonnement",
        bullets: [
          { label: "Het bedrag", text: "10 € / maand." },
          {
            label: "Het voordeel",
            text: "Een aankoopplafond van 250 € (gemiddeld maandbudget voor één persoon).",
          },
          {
            label: "Waarvoor dient het?",
            text: "Vaste kosten: huur, elektriciteit, begeleiding.",
          },
        ],
        note: "Grote gezinnen stapelen gewoon abonnementen (bv. 20 € voor een plafond van 500 €).",
      },
      {
        title: "Onze slagkracht",
        subtitle: "De voorafbetaalde kaart",
        bullets: [
          {
            label: "De werking",
            text: "Je laadt je ledenkaart op via overschrijving en betaalt ermee aan de kassa.",
          },
          {
            label: "Onze superkracht",
            text: "Gezamenlijke kasstroom laat ons volle vrachtwagens bij producenten kopen — zonder banken!",
          },
          {
            label: "De prijs in het schap",
            text: "De echte productprijs plus een mini vaste marge (0,20 € droog, 0,50 € vers) voor bederf. Niets verborgen.",
          },
        ],
      },
      {
        title: "Het geheim van onze prijzen",
        subtitle: "Wederzijdse hulp",
        bullets: [
          {
            label: "De regel",
            text: "Elk volwassen lid (18–65 jaar) geeft 2 uur per maand om de winkel te doen draaien.",
          },
          {
            label: "De taken",
            text: "Vakken vullen, kassa, onthaal, schoonmaak…",
          },
          {
            label: "Het resultaat",
            text: "De ziel van het project. Door de loonkosten te drukken, drukken we jouw schapprijzen!",
          },
        ],
        note: "Jongeren onder 18 en 65+ hoeven niet mee te doen (tenzij ze dat willen).",
        legalNote:
          "De 2 u / maand zijn een voorwaarde om boodschappen te doen als lid — geen arbeid. Vóór de opening: overeenkomst, verzekering en korte opleiding.",
      },
    ],
    v2: {
      title: "Pi COOP: de « prijs »-versie van burgercoöperaties",
      intro:
        "Andere coöperatieve supermarkten bestaan al: wederzijdse hulp, bio, gezondere producten. Dezelfde geest.",
      bullets: [
        "Het abonnement betaalt huur en team — geen verborgen marge op elk product.",
        "De kleine vaste marge (20 of 50 cent) dient enkel voor bederf.",
        "De voorafbetaalde kaart laat ons in groot volume kopen, zo dicht mogelijk bij producenten.",
      ],
      closing:
        "Kort gezegd: dezelfde coöp-geest, andere prijsregel — geen procentmarge op elk artikel.",
      examplesLead:
        "Illustratie (hoe de marge werkt, geen belofte tot op de cent) :",
      examples: [
        "Hypothese aan 5 € groothandel: winkel +20 % ≈ 6 € → bij Pi: 5,20 € (droog).",
        "Hypothese aan 10 € groothandel: winkel +20 % ≈ 12 € → bij Pi: 10,20 € (droog) of 10,50 € (vers).",
      ],
      examplesNote:
        "Als groepsinkoop ons nog goedkoper laat inkopen, daalt ook jouw schapprijs: steeds werkelijke aankoopprijs + 20 of 50 cent.",
    },
    openingStagesTitle: "Opening: wat je vanaf dag één vindt",
    openingStagesBody:
      "Vanaf dag één: droog voedsel, voorverpakte groenten en fruit (stuk, net of bakje), zuivel, en vlees — charcuterie of gevogelte enkel voorverpakt —, geen beenhouwerij aan de snede.",
    zeroWasteTitle: "Doel: zero waste",
    zeroWasteBody:
      "Vanaf dag één kan een kleine «\u00a0koude\u00a0» bereidingsruimte verse producten snijden, vacuüm trekken en invriezen die anders verloren gaan. Een «\u00a0warme\u00a0» verwerkingskeuken (sauzen, confituur) volgt in een tweede fase, zodra de winkel draait.",
  },
  manifesto: {
    eyebrow: "Ons manifest",
    title: "De controle terugpakken, samen.",
    p1: "Te lang kreeg men te horen dat er tegenover inflatie niets te doen viel. Dat we in stilte ondoorzichtige marges en stijgende prijzen zonder uitleg moesten aanvaarden. Geïsoleerd, ieder in de eigen winkelwagen, worden we klein. En alleen veranderen we weinig.",
    p2Before: "Men vergat één ding:",
    p2Strong: "klein is geen zwakte als we ons verenigen.",
    p3: "Daaruit is Pi COOP ontstaan. Zoals het getal π: een klein teken, een kracht zonder einde.",
    p4: "Pi COOP is geen supermarkt te meer. Het is een burgercoöperatie geboren uit urgentie: stoppen met ondergaan.",
    ticket:
      "Op een klassieke kassaticket betaal je niet alleen wat er in het mandje zit. Je betaalt ook de huur van grote winkels, de lonen van een managementpiramide, reclame, en marges die jou niet toebehoren.",
    ruleLead:
      "Bij Pi COOP is de regel omgekeerd — eenvoudig, en die verandert niet:",
    rule:
      "we kopen samen, tegen de echte groothandelsprijs (rechtstreeks van de producent); we tonen die prijs; we voegen een vaste marge toe — 20\u00a0cent op droog, 50\u00a0cent op vers en duurdere producten — om bederf en onverkocht op te vangen. Niets verborgen.",
    volunteer:
      "Vanaf de opening geeft elke volwassene van 18 tot 65 jaar 2 uur per maand. Jongeren en 65-plussers zijn vrijgesteld, tenzij ze willen meedoen. Minder tussenpersonen, prijzen die standhouden, en opnieuw band in de buurt.",
    closing:
      "Het is tijd om de macht over onze boodschappen — en over ons leven — terug te nemen.",
    cta: "Ik schrijf me gratis voor",
  },
  social: {
    title: "Je buren zijn er al",
    intro:
      "Kijk of buren al ingeschreven zijn in jouw straat — zonder adres of naam te tonen.",
    cp: "PC",
    street: "Straat",
    see: "Bekijk",
    loading: "…",
    hint: "Kies een straat en klik op Bekijk.",
    none: "Nog niet genoeg buren hier getoond — nodig iemand uit je straat uit.",
    anonymous:
      "Anonieme weergave — enkel het aantal ingeschreven gezinnen (vanaf 2), nooit een huisnummer.",
    chooseStreet: "Kies of typ een straat",
    volume: "{count} buren zijn al ingeschreven in {street}!",
    error: "Fout",
  },
  register: {
    sectionTitle: "Toekomstige coöperant worden",
    sectionIntro:
      "Geef je gezin en adres op. Jouw gezin telt mee voor het doel van 5.000 gezinnen.",
    email: "E-mail",
    password: "Wachtwoord (8+)",
    household: "Gezinsgrootte",
    composition:
      "Samenstelling van het gezin (schijven voor babyquota en vrijwilligerswerk — geen exacte leeftijd wordt bewaard).",
    person: "Pers. {n}",
    bandPlaceholder: "Schijf",
    postalCode: "Postcode",
    street: "Straat",
    houseNumber: "Nr.",
    unknownPostal: "Onbekende postcode",
    submit: "Ik word toekomstige coöperant — het is gratis",
    submitting: "Verzenden…",
    success:
      "Voorinschrijving gelukt. Je ontvangt een welkomstmail.",
    sharePrompt:
      "Deel rondom je — je bent net toegetreden tot het team {zone}!",
    shareCta: "Pi COOP delen",
    shareCopied: "Bericht gekopieerd",
    shareMessage:
      "Ik ben toegetreden tot het team {zone} van Pi COOP! Help ons onze coöperatieve supermarkt te openen: {url}",
    ageBands: {
      AGE_0_4: "0–4 jaar (babyquota)",
      AGE_5_17: "5–17 jaar",
      AGE_18_64: "18–65 jaar (vrijwilligerswerk)",
      AGE_65_PLUS: "65+ jaar",
    },
    toastTitle: "Welkom, toekomstige coöperant!",
    toastOne:
      "Inschrijving bevestigd. Dankzij jou wint Pi een decimaal — jouw gezin is cijfer {total}.",
    toastMany:
      "Inschrijving bevestigd. Dankzij jou wint Pi een decimaal — jouw gezin is cijfer {total}.",
    errors: {
      generic: "Inschrijvingsfout",
      impossible: "Inschrijving onmogelijk",
      turnstile: "Anti-botverificatie mislukt",
      emailTaken: "Er bestaat al een account met dit e-mailadres",
      postal: "Belgische postcode van 4 cijfers",
      household:
        "Het aantal leeftijdsschijven moet gelijk zijn aan de gezinsgrootte",
      rateLimit: "Te veel pogingen. Probeer het over enkele minuten opnieuw.",
    },
  },
  pi: {
    empty:
      "Wees het eerste gezin dat zich inschrijft: jij schrijft de « 1 » van 3,14…",
    filled:
      "{count} {coopWord} = {count} {decWord}. Doe mee om de keten te verlengen!",
    coopOne: "gezin",
    coopMany: "gezinnen",
    decOne: "decimaal",
    decMany: "decimalen",
  },
  street: {
    placeholder: "Typ het begin van de straat…",
    needPostal: "Vul eerst de postcode in",
    none: "Geen straat gevonden",
  },
  common: {
    close: "Sluiten",
  },
  footer: {
    how: "Hoe werkt het",
    manifesto: "Manifest",
    facebook: "Facebook",
    legal: "Wettelijke vermeldingen",
    privacy: "Privacy",
    phase:
      "Pi COOP is enkel Fase\u00a01. Binnenkort: Pi Academy en Pi Invest.",
  },
  legal: {
    metaTitle: "Wettelijke vermeldingen — Pi COOP",
    metaDescription: "Wettelijke vermeldingen van de voorinschrijvingssite Pi COOP.",
    back: "← Terug",
    title: "Wettelijke vermeldingen",
    publisherTitle: "Uitgever",
    publisherIntro:
      "De website www.picoop.be wordt uitgegeven door Mustapha El Abyad, onderneming natuurlijke persoon, handelsnaam « à votre service ».",
    publisherItems: [
      "Ondernemingsnummer: 1007.072.509",
      "BTW: BE 1007.072.509",
      "Adres: Avenue Emile de Beco 51, 1050 Elsene",
    ],
    publisherCoop:
      "Pi COOP is een burgercoöperatieproject. De coöperatieve entiteit is nog niet opgericht. Deze vermeldingen worden bijgewerkt zodra ze bestaat.",
    contact: "Contact:",
    contactEmail: "info@picoop.be",
    hostingTitle: "Hosting",
    hosting: [
      "Website: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, Verenigde Staten.",
      "API: Railway Corp., 548 Market Street PMB 42068, San Francisco, CA 94104, Verenigde Staten.",
      "Databank: Neon, Inc., hosting in de Europese Unie.",
    ],
    natureTitle: "Aard van de dienst",
    natureIntro:
      "De voorinschrijving is 100\u00a0% gratis, zonder verplichting, en vormt geen aankoop- of inschrijvingsverbintenis. De getoonde prijzen (op de site of in de Digitale folder Pi) zijn geschatte richtprijzen en strikt niet-contractueel.",
    natureStore:
      "Het project streeft naar een coöperatieve supermarkt op menselijke schaal, met een breed assortiment (droog en voorverpakt vers), geen klassieke hypermarkt. In deze fase wordt geen betaling gevraagd — inclusief geen overschrijving of oplading van een voorafbetaalde kaart. Een aandeel (minstens 25\u00a0€) en een maandelijks abonnement worden pas aangeboden zodra de coöperatie is opgericht voor notaris en er een pand is.",
    ipTitle: "Intellectuele eigendom",
    ipBody:
      "De teksten, het π-logo, de visuele identiteit en de andere elementen van de site zijn beschermd. Ongeoorloofde reproductie is verboden.",
    lawTitle: "Toepasselijk recht",
    lawBody:
      "De site valt onder Belgisch recht. Bij een geschil zijn de Belgische rechtbanken bevoegd, onverminderd dwingende regels van consumentenbescherming.",
    relatedPrivacy: "Privacybeleid",
    updated: "Laatst bijgewerkt: 26 augustus 2026",
  },
  privacy: {
    metaTitle: "Privacy — Pi COOP",
    metaDescription: "Privacybeleid van de voorinschrijving Pi COOP.",
    back: "← Terug",
    title: "Privacybeleid",
    controllerTitle: "Verwerkingsverantwoordelijke",
    controllerBody:
      "De verwerkingsverantwoordelijke is Mustapha El Abyad, onderneming natuurlijke persoon (handelsnaam « à votre service »), ondernemingsnummer 1007.072.509, Avenue Emile de Beco 51, 1050 Elsene. Contact:",
    contactEmail: "info@picoop.be",
    dataTitle: "Verzamelde gegevens",
    data: [
      "E-mail en wachtwoord (enkel als hash bewaard)",
      "Gezinsgrootte en leeftijdsschijven (geen exacte leeftijden, geen namen van gezinsleden)",
      "Postcode, straat, huisnummer (bewaard voor het account; het huisnummer wordt nooit publiek getoond)",
      "Technische beveiligingsgegevens (anti-botverificatie Cloudflare Turnstile)",
      "Geaggregeerde audiencestats (Vercel Analytics), zonder advertentiecookies",
      "Taalvoorkeur (cookie pi_locale)",
    ],
    purposeTitle: "Doelen",
    purposes: [
      "Je voorinschrijvingsaccount aanmaken en beveiligen",
      "Gezinnen per postcode tellen en aggregeren per leefbekken voor publieke weergave (doel van 5.000 gezinnen om het project te lanceren)",
      "Je per e-mail informeren over de lancering",
      "Een anoniem aantal ingeschreven gezinnen per straat tonen (vanaf 2 gezinnen, zonder huisnummer)",
      "Het formulier beschermen tegen automatische inschrijvingen",
      "Het bezoek aan de site begrijpen, zonder gerichte reclame",
      "De weergavetaal onthouden",
    ],
    legalTitle: "Rechtsgrond",
    legalBody:
      "Precontractuele maatregelen op jouw verzoek (account aanmaken), en gerechtvaardigd belang om het coöperatieproject te organiseren, de site te beveiligen en anonieme volumes per straat te tonen om de lokale mobilisatie te stimuleren.",
    recipientsTitle: "Ontvangers",
    recipients: [
      "Vercel (hosting van de site)",
      "Railway (API)",
      "Neon (databank, Europese Unie)",
      "Resend (welkomstmail)",
      "Cloudflare (anti-bot Turnstile)",
    ],
    recipientsAfter:
      "Deze dienstverleners handelen enkel om de dienst te laten werken. We verkopen je gegevens niet. Er is geen Facebookpixel en geen gerichte reclame op picoop.be.",
    transfersTitle: "Doorgiften buiten de Europese Economische Ruimte",
    transfersBody:
      "Vercel, Railway, Resend en Cloudflare zijn gevestigd in de Verenigde Staten. Doorgiften steunen op hun contractuele waarborgen (onder meer de standaardcontractbepalingen, waar van toepassing). De Neon-databank wordt in de Europese Unie gehost.",
    cookiesTitle: "Cookies en vergelijkbare technologieën",
    cookies: [
      "pi_locale: essentiële cookie, onthoudt FR / NL / EN, geldig één jaar",
      "Cloudflare Turnstile: strikt noodzakelijk voor de beveiliging van het inschrijvingsformulier",
      "Vercel Analytics: audiencestats zonder advertentiecookies",
    ],
    cookiesAfter:
      "Er wordt geen toestemmingsbanner getoond, omdat de site geen advertentiecookies of marketingtracking gebruikt.",
    retentionTitle: "Bewaring",
    retentionBody:
      "Accountgegevens worden bewaard tijdens de voorinschrijving. Ze worden op verzoek gewist, of herbekeken wanneer de coöperatie is opgericht (overname door de nieuwe entiteit met informatie, of wissing). Technische beveiligingslogboeken worden slechts zo lang bewaard als nodig.",
    childrenTitle: "Gezin en kinderen",
    childrenBody:
      "We maken geen account aan voor een kind. De leeftijdsschijven van het gezin (inclusief 0–4 en 5–17 jaar) worden geregistreerd zonder exacte leeftijd en zonder voornaam, enkel om de toekomstige bijrage- en vrijwilligersregels uit te leggen.",
    rightsTitle: "Jouw rechten",
    rightsBody:
      "Overeenkomstig de AVG heb je recht op inzage, rectificatie, wissing, beperking, bezwaar en overdraagbaarheid. Schrijf naar",
    rightsAfter:
      "Je kan ook een klacht indienen bij de Gegevensbeschermingsautoriteit (GBA), Drukpersstraat 35, 1000 Brussel.",
    apdLabel: "gegevensbeschermingsautoriteit.be",
    apdUrl: "https://www.gegevensbeschermingsautoriteit.be",
    relatedLegal: "Wettelijke vermeldingen",
    updated: "Laatst bijgewerkt: 26 augustus 2026",
  },
} satisfies Messages;
