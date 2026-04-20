// Centrale lijst van Alterion-certificeringen.
// Bij nieuwe certs: hier toevoegen — Footer en Over-ons pakken het automatisch op.

export type Segment = "particulier" | "zakelijk" | "beide";

export interface Certificaat {
  naam: string;
  segment: Segment;
  omschrijving?: string;
  link?: string;
}

export const certificaten: Certificaat[] = [
  {
    naam: "NEN 1010",
    segment: "beide",
    omschrijving: "Norm voor laagspanningsinstallaties in gebouwen.",
  },
  {
    naam: "NEN 3140",
    segment: "beide",
    omschrijving: "Veilig werken aan elektrische installaties.",
    link: "https://ekcn.nl/nen-3140/",
  },
  {
    naam: "VCA",
    segment: "zakelijk",
    omschrijving: "Veiligheid, gezondheid en milieu checklist aannemers.",
  },
  {
    naam: "InstallQ",
    segment: "beide",
    omschrijving: "Erkenningsregeling voor installatiebedrijven.",
  },
  {
    naam: "Techniek Nederland",
    segment: "beide",
    omschrijving: "Branchevereniging voor installatiebedrijven.",
  },
  {
    naam: "ELBHO",
    segment: "particulier",
    omschrijving: "Kwaliteitslabel voor particuliere installaties.",
  },
];

export function certsForSegment(segment: Segment): Certificaat[] {
  if (segment === "beide") return certificaten;
  return certificaten.filter((c) => c.segment === segment || c.segment === "beide");
}
