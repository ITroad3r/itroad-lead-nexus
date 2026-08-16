import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Download, Phone, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppButton, whatsappHref } from "@/components/WhatsAppButton";
import { ClientReferences } from "@/components/ClientReferences";
import { VideoEmbed } from "@/components/VideoEmbed";
import logoAsset from "@/assets/itroad-logo.jpg.asset.json";
import pdfAsset from "@/assets/offre-nearshore.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Nearshore Hybride Maroc-France | IT ROAD GROUP",
      },
      {
        name: "description",
        content:
          "Renforcez vos équipes IT en 4 semaines avec le modèle Nearshore Hybride d'IT ROAD GROUP : pilotage en France, centre de service au Maroc. Réserver une consultation gratuite.",
      },
      { property: "og:title", content: "Nearshore Hybride Maroc-France | IT ROAD GROUP" },
      {
        property: "og:description",
        content:
          "Pilotage stratégique en France, excellence technique au Maroc. Réduisez vos coûts IT sans compromis sur la qualité.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const highlights = [
  "Pilotage en France, équipes techniques au Maroc",
  "1h de décalage horaire, 3h de vol",
  "Contrat français, conforme RGPD",
  "Démarrage en 4 semaines",
];

function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="IT ROAD GROUP"
      className={`${className} w-auto brightness-0 invert`}
      width={320}
      height={160}
    />
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <WhatsAppButton />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 surface-navy">
        <div className="section-shell grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <Logo className="h-12 sm:h-14" />
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="onNavy" size="sm" className="hidden sm:inline-flex" asChild>
              <a href={pdfAsset.url} download>
                <Download className="h-4 w-4" />
                Brochure PDF
              </a>
            </Button>
            <Button variant="brand" size="sm" asChild>
              <a href="#contact" className="whitespace-nowrap text-xs sm:text-sm">
                Réserver une consultation gratuite
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Video Hero */}
      <section className="surface-navy pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider sm:text-xs">
              <PlayCircle className="h-3.5 w-3.5 shrink-0 text-brand" />
              <span className="min-w-0">Offre Nearshore Hybride Maroc – France</span>
            </span>
            <h1 className="mt-5 text-[1.75rem] font-bold leading-tight sm:text-4xl lg:text-5xl">
              Renforcez vos équipes IT en{" "}
              <span className="text-gradient-brand">4 semaines</span>, sans exploser votre budget.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Découvrez en 2 minutes comment IT ROAD GROUP combine pilotage stratégique en France
              et centre d'excellence technique au Maroc.
            </p>
          </div>

          <VideoEmbed />

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button variant="brand" size="lg" className="w-full sm:w-auto" asChild>
              <a href="#contact">
                Réserver une consultation gratuite
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="onNavy" size="lg" className="w-full sm:w-auto" asChild>
              <a href={pdfAsset.url} download>
                <Download className="h-4 w-4" />
                <span className="truncate">Télécharger la brochure PDF</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* First Form */}
      <section id="contact-top" className="py-14 sm:py-20">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Short Description */}
      <section className="border-y border-border bg-card py-14 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              Le Nearshore Hybride, c'est quoi ?
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Un modèle simple : vos équipes restent pilotées depuis la France, tandis que nos
              experts Cloud, DevOps, Full Stack, Data et Cybersécurité basés au Maroc accélèrent
              votre delivery. Même fuseau horaire, même exigence qualité, un budget maîtrisé.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Vous préférez échanger maintenant ?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Écrivez-nous sur WhatsApp. Nous répondons rapidement et sans engagement.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="brand" size="lg" className="w-full sm:w-auto" asChild>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-4 w-4" />
                  Discuter sur WhatsApp
                </a>
              </Button>
              <Button variant="outlineBrand" size="lg" className="w-full sm:w-auto" asChild>
                <a href={pdfAsset.url} download>
                  <Download className="h-4 w-4" />
                  Brochure PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ClientReferences />



      {/* Final Form CTA */}
      <section id="contact" className="surface-navy py-14 sm:py-20">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              Lancez votre équipe hybride dès aujourd'hui
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Réservez votre consultation gratuite. Un consultant vous contactera pour cadrer
              votre besoin — sans engagement.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <LeadForm variant="dark" />
          </div>
        </div>
      </section>

      <footer className="surface-navy border-t border-white/10 py-10 pb-24 sm:pb-10">
        <div className="section-shell flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <Logo className="h-14" />
          <p className="text-sm text-white/70">
            IT ROAD GROUP — Votre partenaire de confiance pour l'excellence hybride.
          </p>
          <a
            href="https://itroadgroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand hover:underline"
          >
            itroadgroup.com
          </a>
        </div>
      </footer>
    </div>
  );
}
