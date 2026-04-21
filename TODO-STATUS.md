# TODO Status — Alterion.nl

**Laatste update:** 2026-04-20
**Site status:** ✅ LIVE op https://www.alterion.nl
**Oplevering:** dinsdag 2026-04-21 (revisieronde maandag)

Legenda: ✅ gedaan — 🟡 deels — ⏳ openstaand — ⛔ wachtend op Jamal

---

## 💰 Financieel

- ⏳ Eindfactuur €800 excl. BTW sturen naar Jamal

---

## 🚨 P0 — Bugs & blockers

### Calculator / Besparingstool
- ⏳ Alle velden op **0** bij openen _(nu: 4500 kWh + 10 kW default — [DienstenCalculator.tsx:12-14](components/DienstenCalculator.tsx#L12-L14))_
- ⏳ Bij **0 panelen + alleen batterij (7,5 kWh)** → besparing tonen
- ⏳ Formule edge cases (0/0, alleen batterij, alleen panelen, combi)
- ⏳ Extra input: kWh batterijcapaciteit ook in onderste berekening

### Webshop bugs
- ⏳ Foto 1-fase product vervangen
- ⏳ Filters fixen: Alle / Batterijen / Omvormers / Zonnepanelen
- ⏳ Merk-dropdown toevoegen aan filters
- ⏳ Hyxipower toevoegen als merk (3-fase + 1-fase)

### Footer / Contact
- ✅ Footer `/contact` link werkt — href staat goed in [Footer.tsx:40](components/Footer.tsx#L40)
  _(nalopen: mogelijk gaat het om een andere footer-link die Jamal bedoelt)_

### Zoho CRM test
- ⏳ End-to-end test: contactformulier → Zoho Deals _(code klaar, test openstaand)_

---

## 📇 Bedrijfsgegevens

- ✅ Adres in footer: Keurmeesterstraat 53, 1187ZX Amstelveen — [Footer.tsx:58](components/Footer.tsx#L58)
- ✅ Telefoonnummer in footer: 085 222 4003 — [Footer.tsx:54](components/Footer.tsx#L54)
- ⏳ Adres consistent op contactpagina verifiëren
- ⏳ Google Maps embed op contactpagina

---

## 🔐 Security (achtergrond — gedaan voor oplevering)

- ✅ CSP + security headers
- ✅ HSTS preload
- ✅ Rate limiting contact + checkout
- ✅ Server-side prijs validatie
- ✅ Mollie webhook secret met timing-safe compare
- ✅ Webhook idempotency
- ✅ Honeypot contactformulier
- ✅ Zoho deal pas na "paid" webhook
- ✅ Server-side payment status verificatie op bevestigingspagina

---

## 🛒 Checkout / Betalingen

- ✅ Mollie iDEAL/Bancontact/Creditcard via Next.js API
- ✅ MOLLIE_WEBHOOK_SECRET op Vercel actief
- ✅ MedusaJS cart aanmaken bij checkout
- ✅ Cart completion na Mollie "paid" → order in Medusa admin
- ✅ Zoho Deal met bestelgegevens op paid

---

## 🎨 Branding & Lettertypes

- ⏳ Globale font replace (Dynet → brandbook 3 fonts: body/kopsteker/titels)
- ⏳ Bolde teksten lichter maken
- ⏳ Consistentie check per pagina

---

## 🏠 Homepage

### Hero / Boven
- ⏳ Lettertypen boven strakker + bolder
- ⏳ Sectie in vakjes/kaders met kleur
- ⏳ Slideshow eerste pagina direct in kleur (niet pas op hover)
- ⏳ Partner-logos duidelijker (minder grijs)

### Info-knop thuisbatterij
- ⏳ Info-knop met pop-up: wat/waarom batterij + BMS vs EMS + zakelijk/particulier

### Calculator sectie
- ⏳ "Bereken uw besparing" alleen tonen als eerste calculator niet gebruikt
- ⏳ kWh batterij input

---

## 🛒 Producten & Webshop — styling

- ⏳ Titel "Onze producten" + subtekst font + kleur
- ⏳ "Prijs op aanvraag" + "Offerte aanvragen" buttons stylen
- ⏳ Productcards compacter
- ⏳ Checkout labels (Afrekenen / iDEAL) brandbook font
- ⏳ NAW-velden font
- ⏳ Order summary font

### Merken & producten
- ⏳ Hyxipower (3-fase + 1-fase)
- ⏳ LANPWR-2500W EU spec verwerken
- ⏳ Uitbreidbaar houden

---

## ℹ️ Over Alterion

### Weghalen
- ⏳ "Uw specialist in zonnepanelen, thuisbatterijen" weg
- ⏳ "Voor de toekomst generatie" weg
- ⏳ "5000 tevreden klanten" balk weg

### Toevoegen
- ⛔ Nieuwe "Over Alterion" tekst _(wacht op tekst Jamal)_
- ⏳ Plaatjes consistent (warmtepomp/batterij mismatch)

### Certificeringen
- ⛔ M340 logo _(wacht op Jamal)_
- ✅ InstallQ, Techniek Nederland, VCA, NEN 3140 staan in footer certificaten-sectie
- ⏳ Editable maken + particulier/zakelijk onderscheid

### "Eerlijk over duur en kwaliteit"
- ⏳ Lettertype minder dik
- ⏳ Labels subtieler

---

## 🔄 Onze Werkwijze

- ⏳ Titels lichter
- ⏳ Pijltjes tussen 4 stappen
- ⏳ Pop-up bij klik per stap
- ⏳ CTA onderaan: één zin + knop "Vraag advies aan"
- ⏳ Alterion icoontje bij alle CTA's

---

## 📞 Contactpagina

- ⏳ Footer compleet: telefoon, adres, Google Maps
- ⏳ Adresveld contactformulier optioneel maken

### FAQ
- ⏳ Categoriseren (Installatie / Klantenservice / Anders)
- ⏳ FAQ installatie: "binnen 40 werkdagen na goedkeuring offerte" (`en betaling` weg)
- ⛔ FAQ combineren warmtepomp/balanssysteem _(wacht op tekst)_
- ⛔ FAQ service-abonnement _(wacht op tekst Jamal)_

---

## 📄 Algemene Voorwaarden

- ⛔ Alterion-specifieke AV _(wacht op tekst Jamal — niet blokkerend)_

---

## 🔌 Backend / CRM

- ✅ Mollie payments werken
- ⏳ Zoho end-to-end test (leads + offerte-aanvragen → Deals)
- ⏳ Offerte-aanvraag webshop → Zoho Deals koppelen
- ⏳ Leverancier-service handmatig (Life Frans) — workflow bij Jamal
- ⏳ Sales agent workflow (toekomst)

---

## 📧 Email & Overdracht

- ⛔ Resend email adres bevestigen bij Jamal
- ⛔ GitHub + Vercel invite email van Jamal
- ⏳ Domein/hosting beheer overdracht
- ✅ Overdrachtsdocument opgeleverd — [OVERDRACHT.md](OVERDRACHT.md)

---

## ✅ Verificatie checklist (voor oplevering dinsdag)

- ⏳ Contactformulier → lead in Zoho Deals
- ⏳ Calculator edge cases
- ⏳ Externe links open-in-new-tab check
- ⏳ Webshop filters (categorie + merk)
- ⏳ iDEAL test-transactie
- ✅ Footer contact-link werkt (href klopt)
- ⏳ Font consistentie per pagina
- ⏳ Mobile responsiveness

---

## 📦 Wachtend op Jamal

- ⛔ M340 certificering logo
- ⛔ Tekst "Over Alterion" (uitgebreid)
- ⛔ FAQ-uitbreidingen (warmtepomp + service-abonnement)
- ⛔ Uitgebreide Algemene Voorwaarden
- ⛔ Email adres voor GitHub/Vercel/Resend invites

---

## 🔔 Communicatie

- ⏳ Jamal terugbellen (gemiste afspraak 15 april + meerdere bel-verzoeken 13-18 april)
- ⏳ Status update geven over deze lijst

---

## 📊 Samenvatting

| Status | Aantal |
|---|---|
| ✅ Gedaan | 20 |
| ⏳ Openstaand | 55 |
| ⛔ Wacht op Jamal | 10 |

**Wat al klaar is:**
- Volledige security-hardening
- Mollie + MedusaJS + Zoho integratie
- Webhook idempotency + secret verification
- Footer adres/telefoon correct
- Footer contact-link werkt
- Overdrachtsdocument

**Grootste openstaande blokken voor maandag:**
1. **Branding/fonts** — globale replace (tijdsintensief)
2. **Homepage styling** (hero, info-popup, calculator sectie)
3. **Calculator fixes** (defaults + edge cases)
4. **Webshop filters + Hyxipower + foto 1-fase**
5. **Over Alterion herzien** (deels wachtend op Jamal)
6. **Werkwijze sectie** (pijltjes + popups)
7. **Contact FAQ + Google Maps**

**Niet blokkerend voor oplevering:**
- Algemene Voorwaarden definitief (kan na)
- Sales agent workflow (toekomst)
