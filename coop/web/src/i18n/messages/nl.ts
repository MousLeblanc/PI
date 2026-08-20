import type { Messages } from "./fr";

export const nl = {
  meta: {
    title: "Pi COOP — Burgercoöperatie",
    description:
      "Voorinschrijving bij Pi COOP: groepsinkopen bio aan groothandelsprijs + 20 cent (50 cent op duurdere producten), transparantie en solidariteit.",
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
      "van je burgersupermarkt. De voorinschrijving is gratis. De 10\u00a0€/maand en 2\u00a0u vrijwilligerswerk starten pas bij de opening, zodra de coöperatie is opgericht.",
    footnote:
      "20\u00a0cent op het dagelijkse schap · 50\u00a0cent op duurdere producten (olie, luiers…) — details in «\u00a0Hoe werkt het\u00a0?\u00a0».",
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
      "Groothandelsprijs + vaste marge (0,20\u00a0€ of 0,50\u00a0€) = Pi-prijs",
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
    title: "Ontgrendel de eerste Pi-supermarkt in jouw leefbekken",
    introLead: "10.000 personen",
    introMid:
      "= het kantelpunt om een supermarkt op menselijke schaal te openen (elk gezinslid telt — een gezin van 5 = +5). Geen klassieke hypermarkt: de onze, van ons. Kleinere gemeenten worden gegroepeerd in equivalente leefbekkens. Daarna loopt de meter verder: hoe meer we zijn, hoe sterker de onderhandelingskracht. De",
    introStrong: "eerste zone",
    introEnd:
      "die de kaap haalt, opent als eerste. Vandaag betaal je niets; het openingspakket betaal je pas als er een pand en statuten zijn.",
    postalLabel: "Jouw postcode",
    placeholder: "bv. 1090",
    unknownPostal: "Onbekende postcode",
    pioneer: "Jij kan hier de pionier zijn — deel de link lokaal.",
    needPostal: "Vul je postcode in om te zien waar jouw leefbekken staat.",
    people: "{count} / 10.000",
    goal: "Doel: 10.000 personen om de zone te openen.",
    yourCp: "Jouw postcode: {code}",
    cp: "PC {code}",
    exploded: "Doel overschreden — volgende drempel {tier}",
    explodedBody:
      "Interessedrempel bereikt voor deze zone. Opening volgt alleen als er een pand en statuten zijn. Ga door: hoe meer we zijn, hoe sterker de onderhandelingskracht.",
    remaining:
      "{pct}\u00a0% · nog {remaining} personen om de opening hier te ontgrendelen",
    showBreakdown: "Detail per gemeente bekijken",
    hideBreakdown: "Detail per gemeente verbergen",
    nextMilestone: "Volgende drempel ({count}): {label}",
    milestones: {
      m1: "Drempel 1 — genoeg buren voor een eerste lokale ontmoeting",
      m2: "Drempel 2 — eerste stap in commerciële haalbaarheid",
      m3: "Drempel 3 — actief zoeken naar een pand",
      m4: "Drempel 4 — opening mogelijk (pand + statuten vereist)",
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
    title: "Welke zone opent als eerste?",
    intro:
      "Het getal maakt de kracht. De leefbekkens van Brussel in een vriendschappelijke race — elk gezinslid telt. De eerste zone met 10.000 opent als eerste.",
    progress: "{pct}\u00a0%",
    communeFallback: "Gemeente {cp}",
    outsideBrussels: "Elders in België",
    remaining: "Nog {count} om te ontgrendelen",
    exploded: "Openingsdoel overschreden · volgende drempel {tier}",
  },
  how: {
    title: "Hoe werkt het\u00a0?",
    intro:
      "Het Pi COOP-recept in drie regels. Een supermarkt op menselijke schaal, geen klassieke hypermarkt: een burgercoöperatie waar de koopkracht terug naar de leden gaat.",
    pillars: [
      {
        title: "Jouw aandeel in de coöperatie",
        body: "Hier geen onzichtbare aandeelhouders. Vanaf de opening, zodra de coöperatie is opgericht, draagt elk gezinslid 10 € / maand bij — dit is geen abonnement: het is jouw aandeel. Jullie zijn geen klanten: jullie worden mede-eigenaars van jullie winkel. Dit collectieve fonds dient om in volume te kopen.",
      },
      {
        title: "Wederzijdse hulp (2 u / maand)",
        body: "Geen loonmassa = écht lage prijzen. Elke volwassene van 18–64 jaar geeft 2 uur per maand. 0–17 jaar en 65+ zijn vrijgesteld: solidariteit doet de rest.",
      },
      {
        title: "Totale transparantie",
        body: "De groothandelsprijs staat in het schap. We tellen er een vaste, minimale werkingsmarge bij: 20 cent op dagelijkse producten, en 50 cent op duurdere producten (olie, luiers…). Niets is verborgen — je weet waar elke cent naartoe gaat. (Richtprijzen.)",
      },
    ],
    openingStagesTitle: "Stapsgewijs openen",
    openingStagesBody:
      "De eerste Pi-winkel start zonder koelkast, met een breed maar eenvoudig assortiment: droog en houdbaar voedsel (zetmeel, sauzen, conserven, oliën…), dranken, huishoud- en schoonmaakproducten, hygiëne en cosmetica, en andere dagelijkse essentials zonder koudeketen. Koelkasten en verse producten volgen later, als winkel, vrijwilligers en logistiek stabiel zijn.",
  },
  social: {
    title: "Je buren zijn er al",
    intro:
      "Kijk of je buren al ingeschreven zijn in jouw straat (de gegevens zijn 100\u00a0% geanonimiseerd).",
    cp: "PC",
    street: "Straat",
    see: "Bekijk",
    loading: "…",
    hint: "Kies een straat en klik op Bekijk.",
    none: "Geen openbaar nummer voor deze straat.",
    anonymous:
      "Anonieme weergave — enkel nummers waarvan de bewoners akkoord gingen.",
    chooseStreet: "Kies of typ een straat",
    houseNo: "nr. {n}",
    error: "Fout",
  },
  register: {
    sectionTitle: "Toekomstige coöperant worden",
    sectionIntro:
      "Geef je gezin en adres op. Je telt mee voor de drempel van 10.000 personen in jouw leefbekken.",
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
    optIn:
      "Het voorbeeld geven in mijn straat: het nummer van mijn huis tonen om mijn buren aan te moedigen (anoniem — geen naam).",
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
      AGE_18_64: "18–64 jaar (vrijwilligerswerk)",
      AGE_65_PLUS: "65+ jaar",
    },
    toastTitle: "Welkom, toekomstige coöperant!",
    toastOne:
      "Inschrijving bevestigd. Dankzij jou wint Pi een decimaal — jij bent cijfer {total}.",
    toastMany:
      "Inschrijving bevestigd. Jouw gezin verlengt Pi met {added} decimalen (cijfers {from} tot {total}). De keten telt nu {total} cijfers.",
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
      "Wees de eerste ingeschrevene: jij schrijft de « 1 » van 3,14…",
    filled:
      "{count} {coopWord} = {count} {decWord}. Doe mee om de keten te verlengen!",
    coopOne: "persoon",
    coopMany: "personen",
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
      "Het project streeft naar een pilootsupermarkt op menselijke schaal, geen klassieke hypermarkt. In deze fase wordt geen betaling of bijdrage gevraagd. Aandelen of een openingspakket worden pas aan het publiek aangeboden zodra de coöperatieve vennootschap formeel is opgericht voor notaris en een handelszaak is geïdentificeerd.",
    ipTitle: "Intellectuele eigendom",
    ipBody:
      "De teksten, het π-logo, de visuele identiteit en de andere elementen van de site zijn beschermd. Ongeoorloofde reproductie is verboden.",
    lawTitle: "Toepasselijk recht",
    lawBody:
      "De site valt onder Belgisch recht. Bij een geschil zijn de Belgische rechtbanken bevoegd, onverminderd dwingende regels van consumentenbescherming.",
    relatedPrivacy: "Privacybeleid",
    updated: "Laatst bijgewerkt: 18 augustus 2026",
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
      "Postcode, straat, huisnummer",
      "Optionele toestemming voor anonieme weergave van het nummer in de straat",
      "Technische beveiligingsgegevens (anti-botverificatie Cloudflare Turnstile)",
      "Geaggregeerde audiencestats (Vercel Analytics), zonder advertentiecookies",
      "Taalvoorkeur (cookie pi_locale)",
    ],
    purposeTitle: "Doelen",
    purposes: [
      "Je voorinschrijvingsaccount aanmaken en beveiligen",
      "Personen per postcode tellen en aggregeren per leefbekken voor publieke weergave (drempel van 10.000 personen per zone)",
      "Je per e-mail informeren over de lancering",
      "Anonieme huisnummers tonen als je daarvoor toestemming gaf",
      "Het formulier beschermen tegen automatische inschrijvingen",
      "Het bezoek aan de site begrijpen, zonder gerichte reclame",
      "De weergavetaal onthouden",
    ],
    legalTitle: "Rechtsgrond",
    legalBody:
      "Precontractuele maatregelen op jouw verzoek (account aanmaken), gerechtvaardigd belang om het coöperatieproject te organiseren en de site te beveiligen, en toestemming voor de openbare weergave van het huisnummer. Je kan die toestemming op elk moment intrekken door naar het contactadres te schrijven.",
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
      "We maken geen account aan voor een kind. De leeftijdsschijven van het gezin (inclusief 0–4 en 5–17 jaar) worden geregistreerd zonder exacte leeftijd en zonder voornaam, enkel om personen te tellen en de toekomstige bijdrageregels uit te leggen.",
    rightsTitle: "Jouw rechten",
    rightsBody:
      "Overeenkomstig de AVG heb je recht op inzage, rectificatie, wissing, beperking, bezwaar, overdraagbaarheid, en intrekking van de toestemming voor de weergave van het huisnummer. Schrijf naar",
    rightsAfter:
      "Je kan ook een klacht indienen bij de Gegevensbeschermingsautoriteit (GBA), Drukpersstraat 35, 1000 Brussel.",
    apdLabel: "gegevensbeschermingsautoriteit.be",
    apdUrl: "https://www.gegevensbeschermingsautoriteit.be",
    relatedLegal: "Wettelijke vermeldingen",
    updated: "Laatst bijgewerkt: 17 augustus 2026",
  },
} satisfies Messages;
