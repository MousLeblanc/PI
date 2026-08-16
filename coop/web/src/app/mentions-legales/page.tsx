import Link from "next/link";

export const metadata = {
  title: "Mentions légales — Pi COOP",
  description: "Mentions légales de la préinscription Pi COOP.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto w-[min(720px,calc(100%-2rem))] py-16">
      <p className="mb-6 text-sm">
        <Link href="/" className="text-emerald-800 underline-offset-4 hover:underline">
          ← Retour
        </Link>
      </p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Mentions légales
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">Éditeur</h2>
          <p>
            Le site de préinscription <strong className="text-foreground">Pi COOP</strong>{" "}
            est édité dans le cadre du projet de coopérative citoyenne Pi
            (Belgique). Les mentions d’identité complète (forme juridique,
            numéro d’entreprise, siège) seront complétées dès la constitution
            formelle de l’entité.
          </p>
          <p>
            Contact provisoire :{" "}
            <a className="text-emerald-800 underline" href="mailto:contact@picoop.be">
              contact@picoop.be
            </a>
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Hébergement
          </h2>
          <p>
            Frontend : Vercel Inc. — Backend / base de données : prestataires
            cloud (ex. Railway, Neon) selon l’environnement de production.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Nature du service
          </h2>
          <p>
            La préinscription est <strong className="text-foreground">gratuite</strong> et
            ne constitue pas un engagement d’achat. Les prix affichés dans le
            Folder Digital Pi sont des <strong className="text-foreground">estimations
            non contractuelles</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
