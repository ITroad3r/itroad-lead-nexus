import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock3,
  Cloud,
  Database,
  Download,
  Gauge,
  Languages,
  Layers,
  LineChart,
  Lock,
  Phone,
  Plane,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppButton, whatsappHref } from "@/components/WhatsAppButton";
import logoAsset from "@/assets/itroad-logo.jpg.asset.json";
import heroBg from "@/assets/hero-bg.jpg.asset.json";
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
          "Renforcez vos équipes IT en 4 semaines avec le modèle Nearshore Hybride d'IT ROAD GROUP : pilotage en France, centre de service au Maroc. Devis et consultation sous 24h.",
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

const painPoints = [
  { value: "71%", label: "des entreprises subissent une tension sur les profils IT qualifiés" },
  { value: "63%", label: "des DSI constatent un impact direct sur les délais de livraison" },
  { value: "83%", label: "de difficultés de recrutement accrues en région" },
];

const advantages = [
  {
    icon: Clock3,
    title: "Alignement temporel",
    text: "1 heure de décalage seulement : collaboration instantanée et fluide entre vos équipes et les nôtres.",
  },
  {
    icon: Languages,
    title: "Excellence culturelle",
    text: "Bilinguisme total et proximité culturelle forte pour une compréhension parfaite de vos enjeux métier.",
  },
  {
    icon: Wallet,
    title: "Rentabilité optimale",
    text: "Optimisation significative de votre TCO IT grâce à un modèle de coûts compétitif et maîtrisé.",
  },
  {
    icon: Lock,
    title: "Conformité juridique",
    text: "Cadre contractuel français sécurisé et respect strict du RGPD et des normes européennes.",
  },
  {
    icon: Plane,
    title: "Agilité & proximité",
    text: "3 heures de vol : ateliers de co-conception, déplacements réguliers et management hybride.",
  },
  {
    icon: Gauge,
    title: "Delivery mesurable",
    text: "SLA contractualisés, reporting consolidé et vélocité DevOps suivie sprint après sprint.",
  },
];

const model = [
  {
    icon: Building2,
    title: "Pilotage stratégique — France",
    points: [
      "Gouvernance de proximité et pilotage opérationnel local",
      "Gestion de projet AMOA et interface client directe",
      "Alignement permanent avec vos enjeux métiers",
    ],
  },
  {
    icon: Users,
    title: "Centre de service — Maroc",
    points: [
      "Équipes d'experts techniques dédiées sur site",
      "Développement agile et usine logicielle",
      "Optimisation des coûts sans compromis sur la qualité",
    ],
  },
  {
    icon: Layers,
    title: "Contexte technique sur mesure",
    points: [
      "Infrastructure hybride sécurisée et résiliente",
      "Scalabilité des ressources et continuité de service",
      "Outils collaboratifs intégrés pour une synergie totale",
    ],
  },
];

const expertise = [
  { icon: Cloud, label: "Cloud & DevOps" },
  { icon: Layers, label: "Full Stack" },
  { icon: Database, label: "Data & IA" },
  { icon: ShieldCheck, label: "Cybersécurité" },
  { icon: BadgeCheck, label: "QA & Test Automation" },
];

const guarantees = [
  {
    title: "Transparence totale",
    text: "Visibilité complète sur les processus, les KPI et la gestion opérationnelle quotidienne.",
  },
  {
    title: "Flexibilité d'exécution",
    text: "Adaptation agile aux évolutions de périmètre et aux besoins spécifiques de votre infrastructure.",
  },
  {
    title: "Transition transparente",
    text: "Migration de services fluide et sécurisée, sans impact utilisateur ni rupture d'activité.",
  },
  {
    title: "Performance financière",
    text: "Contrôle rigoureux des coûts et optimisation constante pour un ROI maîtrisé.",
  },
];

const clients = [
  "SUEZ",
  "Groupe Moniteur",
  "ADLPartner",
  "Auto Hebdo",
  "Newsmed",
  "MarchésOnline",
  "emploipublic.fr",
  "La Gazette",
];

function Logo({ className = "h-11" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="IT ROAD GROUP"
      className={`${className} w-auto rounded-md bg-white p-1.5`}
      width={200}
      height={200}
    />
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <WhatsAppButton />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 surface-navy">
        <div className="section-shell flex h-16 items-center justify-between gap-4">
          <Logo className="h-10" />
          <div className="flex items-center gap-2">
            <Button variant="onNavy" size="sm" className="hidden sm:inline-flex" asChild>
              <a href={pdfAsset.url} download>
                <Download className="h-4 w-4" />
                Brochure PDF
              </a>
            </Button>
            <Button variant="brand" size="sm" asChild>
              <a href="#contact">Être rappelé</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden surface-navy">
        <img
          src={heroBg.url}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
          width={1920}
          height={1080}
        />
        <div className="section-shell relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Offre Nearshore Hybride Maroc – France
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              Renforcez vos équipes IT en <span className="text-gradient-brand">4 semaines</span>,
              sans exploser votre budget.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Pilotage stratégique en France, centre d'excellence technique au Maroc. IT ROAD GROUP
              vous livre des experts Cloud, DevOps, Full Stack, Data et Cybersécurité — dans un
              cadre contractuel français, conforme RGPD, avec des SLA engageants.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="brand" size="xl" asChild>
                <a href="#contact">
                  Obtenir une consultation gratuite
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="onNavy" size="xl" asChild>
                <a href={pdfAsset.url} download>
                  <Download className="h-4 w-4" />
                  Télécharger l'offre complète (PDF)
                </a>
              </Button>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              {[
                "Réponse d'un consultant sous 24h",
                "1h de décalage horaire seulement",
                "+20 références clients depuis 2014",
                "Contrat de droit français & RGPD",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div id="contact-top" className="lg:pl-4">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="border-b border-border bg-card py-14">
        <div className="section-shell">
          <h2 className="max-w-2xl text-2xl font-bold sm:text-3xl">
            Le marché IT français est sous tension. Vos projets ne peuvent pas attendre.
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {painPoints.map((p) => (
              <div
                key={p.value}
                className="card-lift rounded-2xl border border-border bg-background p-6"
              >
                <p className="font-display text-4xl font-bold text-brand">{p.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Inflation salariale, pénurie d'architectes Data, d'experts Cybersécurité, d'ingénieurs
            Cloud & DevOps, de Lead Developers et de Product Owners : les budgets explosent, les
            roadmaps glissent et la qualité de service se dégrade. Le Nearshore Hybride résout les
            trois problèmes à la fois.
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="py-16 sm:py-20">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
              <PlayCircle className="h-3.5 w-3.5" />
              Découvrez IT ROAD en 2 minutes
            </span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Notre modèle Nearshore Hybride expliqué
            </h2>
            <p className="mt-4 text-muted-foreground">
              Gouvernance, delivery, expertises et engagements : tout ce que vous devez savoir avant
              de lancer votre équipe hybride.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-elevated)]">
            <div className="relative aspect-video bg-navy-deep">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/X4f6frV_pNI?list=PLvCnaSchkbbQ6XdS4m0YrJsXVnygcm_BC&rel=0"
                title="IT ROAD GROUP — Offre Nearshore Hybride"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="brand" size="lg" asChild>
              <a href="#contact">
                Parler à un consultant
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outlineBrand" size="lg" asChild>
              <a href={pdfAsset.url} download>
                <Download className="h-4 w-4" />
                Télécharger la brochure PDF
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-card py-16 sm:py-20">
        <div className="section-shell">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Pourquoi le Nearshore <span className="text-brand">Maroc – France</span> ?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cinq atouts stratégiques qui font la différence face à l'offshore lointain et au
              recrutement local.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="card-lift rounded-2xl border border-border bg-background p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                  <Icon className="h-5 w-5 text-brand-foreground" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model */}
      <section className="surface-navy py-16 sm:py-20">
        <div className="section-shell">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Le Nearshore Hybride by IT ROAD</h2>
            <p className="mt-4 text-white/75">
              Un point d'entrée en France, une équipe d'experts basée au Maroc. Vous gardez le
              contrôle, nous portons l'exécution.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {model.map(({ icon: Icon, title, points }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-white/75">
                  {points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Nos pôles d'expertise
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {expertise.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm"
                >
                  <Icon className="h-4 w-4 text-brand" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Garanties & engagements SLA</h2>
            <p className="mt-4 text-muted-foreground">
              Quatre engagements clés pour assurer pérennité, excellence et performance de votre
              dispositif hybride.
            </p>
            <div className="mt-8 rounded-2xl border border-brand/40 bg-accent/50 p-6">
              <LineChart className="h-6 w-6 text-brand-foreground" />
              <p className="mt-3 text-sm leading-relaxed text-accent-foreground">
                <strong>+28% de vélocité DevOps</strong> constatée sur nos dispositifs, avec
                maintenance 24/7, livraison continue et reporting consolidé France–Maroc.
              </p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {guarantees.map((g) => (
              <div key={g.title} className="card-lift rounded-2xl border border-border bg-card p-6">
                <ShieldCheck className="h-5 w-5 text-brand" />
                <h3 className="mt-4 text-base font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="border-y border-border bg-card py-12">
        <div className="section-shell text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Plus de 20 références depuis 2014 — secteurs public, privé et digital
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {clients.map((client) => (
              <span key={client} className="font-display text-lg font-semibold text-navy/70">
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="surface-navy py-16 sm:py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Lancez votre équipe hybride dès aujourd'hui.
            </h2>
            <p className="mt-5 max-w-xl text-white/80">
              Associez la proximité stratégique française à la puissance technique marocaine pour
              transformer vos défis IT en avantages compétitifs durables. Laissez vos coordonnées :
              un consultant vous contacte sous 24h pour cadrer votre besoin — gratuitement et sans
              engagement.
            </p>

            <div className="mt-8 space-y-3 text-sm text-white/80">
              {[
                "Analyse gratuite de votre besoin en compétences",
                "Proposition de dispositif et budget indicatif",
                "Profils présentés sous 2 semaines, démarrage sous 4 semaines",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="onNavy" size="lg" asChild>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-4 w-4" />
                  Nous écrire sur WhatsApp
                </a>
              </Button>
              <Button variant="onNavy" size="lg" asChild>
                <a href={pdfAsset.url} download>
                  <Download className="h-4 w-4" />
                  Offre complète en PDF
                </a>
              </Button>
            </div>
          </div>

          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      <footer className="surface-navy border-t border-white/10 py-10">
        <div className="section-shell flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <Logo className="h-10" />
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
