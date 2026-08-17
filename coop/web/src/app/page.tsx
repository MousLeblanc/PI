"use client";

import { CityLeaderboard } from "@/components/CityLeaderboard";
import { FolderPi } from "@/components/FolderPi";
import { HowItWorks } from "@/components/HowItWorks";
import { PiCounter } from "@/components/PiCounter";
import { PostalGauges } from "@/components/PostalGauges";
import { RegisterForm } from "@/components/RegisterForm";
import { SocialProof } from "@/components/SocialProof";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/use-t";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col items-center px-1 pb-20 pt-16 text-center sm:pt-24">
          <div className="animate-fade-up">
            <PiCounter />
          </div>

          <h1 className="animate-fade-up-delay mt-8 max-w-4xl font-display text-[clamp(2.1rem,5.5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground">
            {t("hero.title")}
            <a
              href="#comment-ca-marche"
              className="align-super text-[0.45em] font-semibold text-emerald-800 no-underline hover:underline"
              aria-label={t("hero.titleAria")}
            >
              *
            </a>
            .
          </h1>

          <p className="animate-fade-up-delay mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t("hero.subtitleBefore")}{" "}
            <strong className="font-medium text-foreground">
              {t("hero.subtitleStrong")}
            </strong>{" "}
            {t("hero.subtitleAfter")}
          </p>
          <p className="animate-fade-up-delay mt-3 max-w-xl text-xs text-muted-foreground/90">
            <a href="#comment-ca-marche" className="text-emerald-800 hover:underline">
              *
            </a>{" "}
            {t("hero.footnote")}
          </p>

          <div className="animate-fade-up-delay mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              asChild
              size="xl"
              className="min-w-[16rem] shadow-lg shadow-emerald-900/15"
            >
              <a href="#inscription">{t("hero.ctaUnlock")}</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#comment-ca-marche">{t("hero.ctaHow")}</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="folder" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("folder.title")}
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-muted-foreground">
            {t("folder.intro")}
          </p>
          <FolderPi />
        </div>
      </section>

      <section id="jauge" className="scroll-mt-24 bg-white/50 py-16 sm:py-20">
        <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("gauges.title")}
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-muted-foreground">
            <strong>{t("gauges.introLead")}</strong> {t("gauges.introMid")}{" "}
            <strong>{t("gauges.introStrong")}</strong> {t("gauges.introEnd")}
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
            {t("social.title")}
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-muted-foreground">
            {t("social.intro")}
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
              {t("register.sectionTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {t("register.sectionIntro")}
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
