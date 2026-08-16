import suez from "@/assets/refs/ref-suez.png.asset.json";
import simi from "@/assets/refs/ref-simi.png.asset.json";
import hommell from "@/assets/refs/ref-hommell.png.asset.json";
import initiativesSante from "@/assets/refs/ref-initiatives-sante.png.asset.json";
import newsmed from "@/assets/refs/ref-newsmed.png.asset.json";
import bauer from "@/assets/refs/ref-bauer.png.asset.json";
import autoHebdo from "@/assets/refs/ref-auto-hebdo.png.asset.json";
import parkopolis from "@/assets/refs/ref-parkopolis.png.asset.json";
import salonDesMaires from "@/assets/refs/ref-salon-des-maires.png.asset.json";
import emploipublic from "@/assets/refs/ref-emploipublic.png.asset.json";
import gazette from "@/assets/refs/ref-gazette-batiproduits.png.asset.json";
import groupeMoniteur from "@/assets/refs/ref-groupe-moniteur.png.asset.json";
import batiprix from "@/assets/refs/ref-batiprix.png.asset.json";
import cube from "@/assets/refs/ref-cube.png.asset.json";
import marchesOnline from "@/assets/refs/ref-marches-online.png.asset.json";
import adlPartner from "@/assets/refs/ref-adl-partner.png.asset.json";
import professionSante from "@/assets/refs/ref-groupe-profession-sante.png.asset.json";
import argus from "@/assets/refs/ref-argus-de-la-presse.png.asset.json";
import lgMark from "@/assets/refs/ref-lg-mark.png.asset.json";
import fim from "@/assets/refs/ref-fim.png.asset.json";

const logos = [
  { src: suez.url, alt: "Suez" },
  { src: simi.url, alt: "SIMI" },
  { src: hommell.url, alt: "Hommell" },
  { src: initiativesSante.url, alt: "Initiatives Santé" },
  { src: newsmed.url, alt: "Newsmed" },
  { src: bauer.url, alt: "Bauer" },
  { src: autoHebdo.url, alt: "Auto Hebdo" },
  { src: parkopolis.url, alt: "Parkopolis" },
  { src: salonDesMaires.url, alt: "Salon des Maires" },
  { src: emploipublic.url, alt: "emploipublic.fr" },
  { src: gazette.url, alt: "La Gazette / Batiproduits" },
  { src: groupeMoniteur.url, alt: "Groupe Moniteur" },
  { src: batiprix.url, alt: "Batiprix" },
  { src: cube.url, alt: "Client IT ROAD GROUP" },
  { src: marchesOnline.url, alt: "MarchésOnline.com" },
  { src: adlPartner.url, alt: "ADL Partner" },
  { src: professionSante.url, alt: "Groupe Profession Santé" },
  { src: argus.url, alt: "L'Argus de la presse" },
  { src: lgMark.url, alt: "LG Mark" },
  { src: fim.url, alt: "FIM" },
];

export function ClientReferences() {
  return (
    <section id="references" className="border-t border-border bg-muted/40 py-14 sm:py-20">
      <div className="section-shell">
        <div className="border-l-4 border-brand pl-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
            Nos références clients
          </h2>
          <p className="mt-2 text-brand">
            Partenaires de confiance depuis 2014 : secteurs public, privé et digital
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex h-20 items-center justify-center rounded-xl border border-border bg-background p-3 shadow-sm transition hover:shadow-md"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
          <div className="flex h-20 flex-col items-center justify-center rounded-xl bg-navy p-3 text-center shadow-sm">
            <span className="text-lg font-bold text-brand">20+</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
              Références depuis 2014
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
