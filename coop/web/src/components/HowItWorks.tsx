import { HandHeart, Scale, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PILLARS = [
  {
    icon: Landmark,
    title: "Votre part dans la coopérative",
    body: "Ici, pas d’actionnaires invisibles. Dès l’ouverture, chaque membre du foyer contribue 10 € / mois — ce n’est pas un abonnement : c’est votre part dans la coopérative. Vous n’êtes pas clients, vous êtes co-propriétaires de votre supermarché. Ce fonds collectif sert à acheter en volume.",
  },
  {
    icon: HandHeart,
    title: "L’entraide (2 h / mois)",
    body: "Pas de masse salariale = des prix vraiment bas. Chaque adulte de 18–64 ans donne 2 heures par mois. Les 0–17 ans et les 65+ sont exemptés : la solidarité fait le reste.",
  },
  {
    icon: Scale,
    title: "Transparence totale",
    body: "Le prix du grossiste s’affiche en rayon. On y ajoute une marge de fonctionnement fixe et minime : 20 centimes sur les produits du quotidien, et 50 centimes sur les produits plus chers (huile, langes…). Rien n’est caché — vous savez où va chaque centime. (Prix cibles estimés.)",
  },
] as const;

export function HowItWorks() {
  return (
    <div>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Comment ça marche&nbsp;?
        </h2>
        <p className="mt-3 text-muted-foreground">
          La recette Pi COOP en trois règles. Pas un supermarché classique :
          une coopérative citoyenne où le pouvoir d’achat revient aux membres.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <Card
              key={pillar.title}
              className="border-emerald-100/80 bg-white/90 shadow-sm"
            >
              <CardHeader className="space-y-3 pb-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-800 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <Icon className="h-5 w-5 text-emerald-800" aria-hidden />
                </div>
                <CardTitle className="text-xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
