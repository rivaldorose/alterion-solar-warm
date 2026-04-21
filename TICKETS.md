# Tickets — Alterion revisieronde

**Workflow per ticket:**
1. Branch `feat/ALT-XX-slug` vanaf `development`
2. Implementeren + lokaal testen op `localhost:3000`
3. Klant akkoord → merge naar `development`
4. `development` → `main` (alleen als werkend)

**Localhost:** http://localhost:3000 (dev server draait op achtergrond)
**Base branch:** `development`

---

## 🔌 Backend (deze nacht)

### ALT-01 — Zoho end-to-end test contactformulier
- **Branch:** `feat/ALT-01-zoho-contact-test`
- **Scope:** Verifiëren dat `/api/contact` een lead aanmaakt in Zoho Deals
- **Taken:**
  - Lokaal testen door formulier in te vullen op `/contact`
  - Controleren of lead in Zoho verschijnt
  - Logs checken op Vercel indien nodig
  - Indien lead in `Leads` i.p.v. `Deals` staat: fixen
- **Acceptance:** test-lead verschijnt in Zoho Deals binnen 30s

### ALT-02 — Offerte-aanvraag webshop → Zoho Deals
- **Branch:** `feat/ALT-02-offerte-zoho`
- **Scope:** "Prijs op aanvraag" producten → offerte-formulier → Zoho Deal
- **Taken:**
  - Huidig offerte-flow onderzoeken (nu gaat het via contactpagina met prefill?)
  - Dedicated endpoint of contact-endpoint hergebruiken met `source=webshop-offerte`
  - Product + klantgegevens in Zoho Deal stoppen
  - Lokaal end-to-end testen
- **Acceptance:** klik op "Offerte aanvragen" → formulier → Zoho Deal met productnaam

---

## 🚨 P0 Bugs (frontend)

### ALT-03 — Calculator defaults naar 0
- **Branch:** `feat/ALT-03-calculator-defaults`
- **Scope:** Alle velden open op 0, niet 4500/10
- **Files:** [DienstenCalculator.tsx:12-14](components/DienstenCalculator.tsx#L12-L14)

### ALT-04 — Calculator edge cases
- **Branch:** `feat/ALT-04-calculator-edges`
- **Scope:** 0 panelen + 7,5 kWh batterij → besparing tonen. Formule nalopen voor alle combinaties.
- **Acceptance:** alle 4 combinaties (0/0, alleen batterij, alleen panelen, beide) geven kloppende output

### ALT-05 — kWh batterij-input onderste berekening
- **Branch:** `feat/ALT-05-battery-capacity-input`
- **Scope:** Extra input batterij-kWh op tweede calculator

### ALT-06 — Webshop filters fixen
- **Branch:** `feat/ALT-06-webshop-filters`
- **Scope:** Alle producten / Batterijen / Omvormers / Zonnepanelen werkend maken

### ALT-07 — Webshop merk-filter
- **Branch:** `feat/ALT-07-brand-filter`
- **Scope:** Dropdown merk toevoegen (Marstek, Solplanet, Hyxipower)

### ALT-08 — Hyxipower producten toevoegen
- **Branch:** `feat/ALT-08-hyxipower`
- **Scope:** 3-fase + 1-fase Hyxipower producten in Medusa + webshop
- **Ref:** https://www.hyxipower.com/nl

### ALT-09 — Foto 1-fase product vervangen
- **Branch:** `feat/ALT-09-1fase-foto`
- **Scope:** Kapotte afbeelding vervangen

### ALT-10 — Footer contact-link check
- **Branch:** `fix/ALT-10-footer-contact`
- **Scope:** Verifiëren of footer `/contact` link echt kapot is; href lijkt correct
- **Acceptance:** klik op Contact in footer → `/contact` pagina laadt

---

## 🎨 Branding

### ALT-11 — Globale font replace
- **Branch:** `feat/ALT-11-brandbook-fonts`
- **Scope:** 3 brandbook fonts toepassen (body/kopsteker/titels)
- **Wacht op:** brandbook files van Jamal (indien nog niet ontvangen)

### ALT-12 — Bolde teksten lichter
- **Branch:** `feat/ALT-12-typography-weight`
- **Scope:** Globaal font-weight verlagen waar te dik

---

## 🏠 Homepage

### ALT-13 — Hero lettertype + vakjes
- **Branch:** `feat/ALT-13-hero-redesign`
- **Scope:** Hero-sectie in vakjes/kaders met kleur + strakker font

### ALT-14 — Slideshow direct in kleur
- **Branch:** `feat/ALT-14-slideshow-color`
- **Scope:** Eerste pagina-slideshow direct gekleurd (niet pas op hover)

### ALT-15 — Partner-logos duidelijker
- **Branch:** `feat/ALT-15-partner-logos`
- **Scope:** Minder grijs, meer contrast

### ALT-16 — Info-knop thuisbatterij pop-up
- **Branch:** `feat/ALT-16-battery-info-popup`
- **Scope:** Info-icoon bij "thuisbatterij" → modal met wat/waarom/BMS-vs-EMS/zakelijk-particulier
- **Ref:** https://thuisbatterij.nl/blog/verschil-tussen-bms-en-ems/

### ALT-17 — Calculator-sectie conditional
- **Branch:** `feat/ALT-17-calculator-conditional`
- **Scope:** Tweede calculator alleen tonen als eerste niet gebruikt

---

## 🛒 Webshop styling

### ALT-18 — Titel "Onze producten" + subtekst
- **Branch:** `feat/ALT-18-webshop-heading`

### ALT-19 — "Prijs op aanvraag" + "Offerte aanvragen" buttons stylen
- **Branch:** `feat/ALT-19-quote-buttons`

### ALT-20 — Productcards compacter
- **Branch:** `feat/ALT-20-compact-cards`

### ALT-21 — Checkout labels font
- **Branch:** `feat/ALT-21-checkout-typography`
- **Scope:** "Afrekenen" + iDEAL/Bancontact labels + NAW + order summary

### ALT-22 — LANPWR-2500W EU product toevoegen
- **Branch:** `feat/ALT-22-lanpwr-product`
- **Ref:** spec PDF van Jamal (16 maart)

---

## ℹ️ Over Alterion

### ALT-23 — Over-ons content weghalen
- **Branch:** `feat/ALT-23-about-remove-old`
- **Scope:** "Specialist in zonnepanelen", "Voor de toekomst generatie", "5000 tevreden klanten" balk weg

### ALT-24 — Nieuwe "Over Alterion" tekst
- **Branch:** `feat/ALT-24-about-new-content`
- **Wacht op:** uitgebreide tekst van Jamal

### ALT-25 — Plaatjes over-ons consistent
- **Branch:** `feat/ALT-25-about-images`
- **Scope:** Warmtepomp/batterij mismatch fixen

### ALT-26 — M340 certificering prominent
- **Branch:** `feat/ALT-26-m340-cert`
- **Wacht op:** M340 logo van Jamal

### ALT-27 — Certificeringen editable
- **Branch:** `feat/ALT-27-certs-editable`
- **Scope:** InstallQ / Techniek NL / VCA / NEN 3140 tekstueel aanpasbaar, particulier/zakelijk onderscheid

### ALT-28 — "Eerlijk over duur en kwaliteit" typografie
- **Branch:** `feat/ALT-28-quality-section`

---

## 🔄 Werkwijze

### ALT-29 — Werkwijze titels lichter + pijltjes
- **Branch:** `feat/ALT-29-workflow-arrows`

### ALT-30 — Werkwijze pop-ups per stap
- **Branch:** `feat/ALT-30-workflow-popups`
- **Scope:** Klik op stap → pop-up (Advies / Offerte / Installatie / Monitoring)

### ALT-31 — CTA onderaan werkwijze
- **Branch:** `feat/ALT-31-workflow-cta`
- **Scope:** Lange tekst → één zin + knop "Vraag advies aan"

### ALT-32 — Alterion icoontje bij CTA's
- **Branch:** `feat/ALT-32-cta-icon`

---

## 📞 Contactpagina

### ALT-33 — Google Maps embed
- **Branch:** `feat/ALT-33-google-maps`
- **Scope:** Plattegrond Keurmeesterstraat 53 op `/contact`

### ALT-34 — Adres niet verplicht
- **Branch:** `feat/ALT-34-address-optional`
- **Scope:** Adresveld contactformulier optioneel

### ALT-35 — FAQ categoriseren
- **Branch:** `feat/ALT-35-faq-categories`
- **Scope:** Installatie / Klantenservice / Anders

### ALT-36 — FAQ installatietekst
- **Branch:** `feat/ALT-36-faq-install-text`
- **Scope:** "binnen 40 werkdagen na goedkeuring offerte" (zonder "en betaling")

### ALT-37 — FAQ warmtepomp combineren
- **Branch:** `feat/ALT-37-faq-heatpump`
- **Wacht op:** tekst Jamal

### ALT-38 — FAQ service-abonnement
- **Branch:** `feat/ALT-38-faq-service`
- **Wacht op:** tekst Jamal

---

## 📄 Algemene Voorwaarden

### ALT-39 — AV Alterion-specifiek
- **Branch:** `feat/ALT-39-terms`
- **Wacht op:** tekst Jamal — niet blokkerend voor oplevering

---

## 📧 Overdracht

### ALT-40 — Resend email adres
- **Wacht op:** Jamal

### ALT-41 — GitHub + Vercel invites
- **Wacht op:** email Jamal

---

## Vannacht-plan (deze sessie)

**Backend prio volgens Jamal:**
1. ✅ Development branch aangemaakt
2. ✅ Localhost draait
3. ➡️ **ALT-01** — Zoho end-to-end test contactformulier
4. ➡️ **ALT-02** — Offerte-aanvraag webshop → Zoho Deals
