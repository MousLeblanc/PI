import { CityLeaderboard } from "@/components/CityLeaderboard";
import { FolderPi } from "@/components/FolderPi";
import { HowItWorks } from "@/components/HowItWorks";
import { PiCounter } from "@/components/PiCounter";
import { PostalGauges } from "@/components/PostalGauges";
import { RegisterForm } from "@/components/RegisterForm";
import { SocialProof } from "@/components/SocialProof";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] items-center justify-between py-4">
          <p className="font-display text-xl font-semibold tracking-tight text-foreground">
            Pi COOP
          </p>
          <Button asChild size="sm">
            <a href="#inscription">Préinscription</a>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col items-center px-1 pb-20 pt-16 text-center sm:pt-24">
          <div className="animate-fade-up">
            <PiCounter />
          </div>

          <h1 className="animate-fade-up-delay mt-8 max-w-4xl font-display text-[clamp(2.1rem,5.5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
            Vos courses à prix grossiste +&nbsp;20&nbsp;centimes
            <a
              href="#comment-ca-marche"
              className="align-super text-[0.45em] font-semibold text-emerald-800 no-underline hover:underline"
              aria-label="Voir le détail des marges fixes"
            >
              *
            </a>
            .
          </h1>

          <p className="animate-fade-up-delay mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Marge fixe, jamais cachée. Devenez{" "}
            <strong className="font-medium text-foreground">
              coopérateur · co-propriétaire
            </strong>{" "}
            de votre supermarché citoyen : 10&nbsp;€/mois de part coopérative et
            2&nbsp;h de bénévolat. Préinscription 100&nbsp;% gratuite.
          </p>
          <p className="animate-fade-up-delay mt-3 max-w-xl text-xs text-muted-foreground/90">
            <a href="#comment-ca-marche" className="text-emerald-800 hover:underline">
              *
            </a>{" "}
            20&nbsp;centimes sur l’essentiel du rayon · 50&nbsp;centimes sur les
            produits plus chers (huile, langes…) — détail dans «&nbsp;Comment ça
            marche&nbsp;?&nbsp;».
          </p>

          <div className="animate-fade-up-delay mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              asChild
              size="xl"
              className="min-w-[16rem] shadow-lg shadow-emerald-900/15"
            >
              <a href="#inscription">Débloquer les prix dans ma ville</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#comment-ca-marche">Comment ça marche&nbsp;?</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="folder" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Folder Digital Pi
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-muted-foreground">
            Comparez par vous-même. Le même produit, en qualité 100&nbsp;% bio,
            directement du grossiste à votre assiette.
          </p>
          <FolderPi />
        </div>
      </section>

      <section id="jauge" className="scroll-mt-24 bg-white/50 py-16 sm:py-20">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Débloquez le magasin dans votre ville
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-muted-foreground">
            <strong>10&nbsp;000 personnes</strong> = le point de bascule pour
            ouvrir (chaque membre du foyer compte — une famille de 5 = +5). Au‑delà,
            la jauge continue : plus on est nombreux, plus le pouvoir de
            négociation est fort. La{" "}
            <strong>première ville</strong> à franchir le cap accueille le
            magasin historique&nbsp;; les suivantes suivent sur une roadmap
            d’ouverture.
          </p>
          <PostalGauges />
          <CityLeaderboard />
        </div>
      </section>

      <section
        id="comment-ca-marche"
        className="scroll-mt-24 py-16 sm:py-20"
      >
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <HowItWorks />
        </div>
      </section>

      <section className="scroll-mt-24 bg-white/50 py-16 sm:py-20">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Vos voisins sont déjà là
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-muted-foreground">
            Vérifiez si vos voisins sont déjà inscrits dans votre rue (les
            données sont 100&nbsp;% anonymisées).
          </p>
          <SocialProof />
        </div>
      </section>

      <section
        id="inscription"
        className="scroll-mt-24 bg-emerald-50/40 py-16 sm:py-24"
      >
        <div className="mx-auto w-[min(720px,calc(100%-2rem))]">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Devenir coopérateur
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Rejoignez la chaîne Pi dans votre code postal. Aucun paiement
              aujourd’hui — vous entrez comme futur co-propriétaire.
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Pi ·{" "}
              <Link href="/" className="text-foreground">
                COOP
              </Link>{" "}
              · Finance · Academy
            </span>
            <nav className="flex flex-wrap gap-4">
              <a
                href="#comment-ca-marche"
                className="hover:text-foreground hover:underline"
              >
                Comment ça marche
              </a>
              <Link
                href="/mentions-legales"
                className="hover:text-foreground hover:underline"
              >
                Mentions légales
              </Link>
              <Link
                href="/confidentialite"
                className="hover:text-foreground hover:underline"
              >
                Confidentialité
              </Link>
            </nav>
          </div>
          <p className="text-xs text-muted-foreground/90">
            Pi COOP n’est que la Phase&nbsp;1. Bientôt : Pi Academy et Pi
            Finance.
          </p>
        </div>
      </footer>
    </main>
  );
}
