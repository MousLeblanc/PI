import Link from "next/link";

export const metadata = {
  title: "Confidentialité — Pi COOP",
  description: "Politique de confidentialité de la préinscription Pi COOP.",
};

export default function ConfidentialitePage() {
  return (
    <main className="mx-auto w-[min(720px,calc(100%-2rem))] py-16">
      <p className="mb-6 text-sm">
        <Link href="/" className="text-emerald-800 underline-offset-4 hover:underline">
          ← Retour
        </Link>
      </p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Politique de confidentialité
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Responsable du traitement
          </h2>
          <p>
            Pi COOP traite vos données pour gérer la préinscription à la
            coopérative citoyenne. Contact :{" "}
            <a className="text-emerald-800 underline" href="mailto:contact@picoop.be">
              contact@picoop.be
            </a>
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Données collectées
          </h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Email et mot de passe (hashé)</li>
            <li>Taille du ménage et tranches d’âge (pas d’âges exacts)</li>
            <li>Code postal, rue, numéro de maison</li>
            <li>
              Consentement optionnel à l’affichage anonyme du numéro dans la rue
            </li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">Finalités</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Créer et sécuriser votre compte de préinscription</li>
            <li>Mesurer l’intérêt par code postal (ouverture de magasin)</li>
            <li>Vous informer du lancement (email)</li>
            <li>
              Afficher des numéros de maison anonymes si vous y avez consenti
            </li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Base légale
          </h2>
          <p>
            Exécution de mesures précontractuelles à votre demande, intérêt
            légitime à organiser la coopérative, et consentement pour
            l’affichage public du numéro de maison.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Conservation
          </h2>
          <p>
            Les données sont conservées le temps de la phase de préinscription
            et du lancement, puis selon les obligations légales applicables.
          </p>
        </section>
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d’un droit d’accès,
            de rectification, d’effacement, de limitation et d’opposition.
            Écrivez à contact@picoop.be. Vous pouvez aussi introduire une
            plainte auprès de l’Autorité de protection des données (APD,
            Belgique).
          </p>
        </section>
      </div>
    </main>
  );
}
