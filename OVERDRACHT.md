# Overdrachtsdocument — Alterion.nl

**Opgeleverd door:** Rivaldo (RoseVibez Studio)
**Opgeleverd aan:** Jamal Badho — Alterion BV
**Oplevering:** dinsdag 2026-04-21 (na nachtelijke revisieronde 2026-04-20 → 2026-04-21)
**Live URL:** https://www.alterion.nl
**Laatste update van dit document:** 2026-04-21

---

## 1. Wat is de website

Een op maat gemaakte Next.js website voor Alterion BV met:

- **Publieke site** (home, over ons, contact, juridische pagina's)
- **Webshop** met thuisbatterijen, omvormers, zonnepanelen, laadpalen en draagbare power stations
- **Filterbare webshop** per categorie, merk, en particulier/zakelijk segment
- **Offerte-aanvraag flow** voor quote-only producten → Zoho CRM Deals
- **Online checkout** met iDEAL / Bancontact / Creditcard via Mollie
- **CRM-integratie** met Zoho: contactformulier → Leads, webshop-offertes + bestellingen → Deals
- **BMS/EMS info popup** met uitleg over thuisbatterijen
- **Klikbare werkwijze** met pop-ups per stap
- **Google Maps embed** op contactpagina
- **Certificeringen-sectie** filterbaar per particulier/zakelijk
- **FAQ met categorieën** (Installatie / Klantenservice / Anders)
- **Cookie banner** GDPR-compliant met voorkeurenpaneel
- **Meertalig voorbereid** (nu volledig Nederlands)

---

## 2. Technische stack

### Frontend
| Onderdeel | Waarom |
|---|---|
| **Next.js 16.1** (App Router) | React framework, server-side rendering, API routes |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Styling system |
| **Turbopack** | Snelle builds |

### Backend / Services
| Onderdeel | Doel |
|---|---|
| **MedusaJS v2.13** | E-commerce backend — producten, cart, orders (⚠️ zie "Architectuur-opmerking") |
| **Neon PostgreSQL** (eu-central-1) | Database voor MedusaJS |
| **Mollie** | Betalingen (iDEAL, Bancontact, Creditcard) |
| **Zoho CRM** | Leadbeheer + Deals (bestellingen + offerte-aanvragen) |
| **Cloudflare DNS** | Domein routing |
| **Vercel** | Frontend hosting |
| **Render** | MedusaJS backend hosting |

### Typografie
- **Headings (h1-h6):** League Spartan (brandbook font)
- **Body tekst:** Inter
- **Iconen:** Material Symbols Outlined (Google)

### Extra libraries (npm)
- `@mollie/api-client` — Mollie betalingen

### ⚠️ Architectuur-opmerking
Jamal houdt geen voorraad bij en bestelt pas door bij zijn leverancier nadat een order binnen is. MedusaJS is in die context overdimensioneel — het doet effectief alleen prijsopslag + cart-creatie. **Toekomstige simplificatie** mogelijk: producten naar een TypeScript array in `lib/products.ts` en MedusaJS backend afschalen. Mollie + Zoho doen het echte werk. Besparing: onderhoud, Render-builds, complexiteit.

---

## 3. Infrastructuur — waar draait wat

```
┌──────────────────────────────────────────────────────┐
│  www.alterion.nl                                     │
│  ↓                                                    │
│  Cloudflare DNS (A record naar Vercel)                │
│  ↓                                                    │
│  Vercel — Next.js frontend                            │
│  ├─ Haalt producten op van Medusa                     │
│  ├─ Maakt betalingen aan via Mollie                   │
│  ├─ Webhook bevestigt betaling + maakt Medusa-order   │
│  └─ Stuurt leads/deals naar Zoho CRM                  │
│       ↓                                               │
│  Render — MedusaJS backend                            │
│       ↓                                               │
│  Neon PostgreSQL — data opslag                        │
└──────────────────────────────────────────────────────┘
```

### URLs
- **Frontend live:** https://www.alterion.nl
- **Frontend backup URL:** https://alterion-solar-warm.vercel.app
- **MedusaJS backend:** https://alterion-medusa-backend.onrender.com
- **Backend health check:** https://alterion-medusa-backend.onrender.com/health

---

## 4. Pagina's op de website

### Publiek
- `/` — Home (hero, calculator, partners, product-sectie)
- `/over-ons` — Over Alterion + USPs + certificeringen + werkwijze
- `/contact` — Contactformulier + Google Maps + FAQ
- `/webshop` — Productoverzicht met filters (categorie / merk / segment)
- `/webshop/[slug]` — Product detailpagina
- `/winkelwagen` — Winkelmand
- `/afrekenen` — Checkout formulier
- `/afrekenen/bevestiging` — Bevestigingspagina (server-verified payment status)

### Juridisch
- `/cookies` — Cookiebeleid
- `/privacybeleid` — Privacy policy
- `/voorwaarden` — Algemene voorwaarden (Alterion-specifiek, 40 werkdagen install-term)
- `/disclaimer` — Disclaimer

### API endpoints (intern)
- `/api/contact` — Contactformulier → Zoho Leads (of Deals bij offerte-aanvragen)
- `/api/checkout` — Maakt Mollie betaling + MedusaJS cart aan
- `/api/checkout/webhook` — Ontvangt Mollie betaalbevestiging → completeert cart + maakt Zoho Deal

---

## 5. Taal en content

- **Hoofdtaal:** Nederlands (nl-NL)
- **HTML lang:** `nl`
- **Alle teksten:** Nederlands
- **Valuta:** EUR (Nederlandse format: €2.499,00)
- **BTW:** 21% wordt automatisch toegevoegd bij checkout

---

## 6. Accounts en logins

### MedusaJS Admin (Jamal's backend)
- **URL:** API only (admin dashboard uit op Render free tier)
- **Email:** jamal@alterion.nl
- **Wachtwoord:** Alterion2026!

### Vercel
- **Workspace:** macvaldo1997-gmailcoms-projects
- **Project:** alterion-solar-warm

### Render
- **Workspace:** rosevibezstudio
- **Service ID:** srv-d71hgafkijhs73cm11fg
- **Plan:** Free tier

### Mollie
- Eigen account van Jamal (API key als env var op Vercel + Render)

### Zoho CRM
- Eigen account van Jamal (zoho.eu)
- OAuth app: "Alterion Website"
- Redirect URI: https://alterion-solar-warm.vercel.app/api/zoho/callback

### Domein
- **Registrar:** Strato
- **DNS:** Cloudflare
- **Email (smtp.rzone.de):** beheerd door broer van Rivaldo

---

## 7. Belangrijke environment variabelen

### Vercel (Production)
| Variabele | Doel |
|---|---|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Medusa API URL |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Medusa publieke key |
| `NEXT_PUBLIC_MEDUSA_REGION_ID` | Benelux regio ID |
| `MOLLIE_API_KEY` | Mollie live key |
| `MOLLIE_WEBHOOK_SECRET` | Webhook beveiliging (timing-safe vergelijken) |
| `ZOHO_CLIENT_ID` | Zoho OAuth |
| `ZOHO_CLIENT_SECRET` | Zoho OAuth |
| `ZOHO_REFRESH_TOKEN` | Zoho long-lived token |

### Render (Medusa backend)
Staat in `.env` op de Render service — bevat Neon connection string, Medusa secrets, Mollie key.

---

## 8. Producten beheren

Producten worden beheerd in **MedusaJS**. Admin dashboard staat uit op Render (free tier).

**Huidige producten in MedusaJS (9):**
- Marstek Venus A / EV3 / EV3.5 (thuisbatterijen met prijs)
- Solplanet Phase 1 / Phase 3 / Omvormers (offerte)
- Container Batterij Zakelijk (offerte)
- Zonnepanelen (offerte)
- Laadpalen (offerte)

**Extra producten in Next.js code** (niet in Medusa, quote-only):
- Hyxipower 1-fase / 3-fase omvormer
- LANPWR-2500W EU draagbare power station

Deze worden automatisch bij de Medusa-lijst gevoegd via [app/webshop/page.tsx](app/webshop/page.tsx).

Prijzen in MedusaJS in centen (bv 374900 = €3.749). Lokale productafbeeldingen in `/public/products/` (zelf-gehost, geen afhankelijkheid van externe CDN's).

---

## 9. Hoe bestellingen werken

1. Klant kiest product → `/webshop`
2. Voegt toe aan winkelmand → `/winkelwagen`
3. Vult gegevens in op `/afrekenen`
4. Next.js:
   - Haalt prijzen server-side op (fraudepreventie)
   - Maakt MedusaJS cart aan met klantgegevens
   - Maakt Mollie payment aan
5. Klant wordt doorgestuurd naar Mollie betaalpagina
6. Na betaling redirect naar `/afrekenen/bevestiging` (server-verified status)
7. Mollie stuurt webhook naar `/api/checkout/webhook`:
   - Verifieert webhook secret (timing-safe compare)
   - Completet MedusaJS cart → order verschijnt in backend
   - Maakt Zoho CRM **Deal** met Stage=Closed Won + alle bestelgegevens

**Waar ziet Jamal de bestellingen?**
- **Zoho CRM → Deals** (primaire werkwijze)
- MedusaJS database
- Mollie dashboard (voor betalingen)

---

## 10. Hoe offerte-aanvragen werken (nieuw)

1. Klant klikt **"Offerte aanvragen"** op een quote-only product
2. Gaat naar `/contact?product=Productnaam`
3. Contactformulier toont gele banner "Offerte-aanvraag voor: X", onderwerp + bericht vooraf ingevuld
4. Submit → API krijgt `source=webshop-offerte` + `product=...`
5. Zoho CRM **Deal** aangemaakt met:
   - Deal Name: `Offerte-aanvraag: <product> — <klant>`
   - Stage: `Qualification` (nog niet betaald)
   - Lead Source: `Webshop offerte`

---

## 11. Hoe contactaanvragen werken

1. Klant vult `/contact` formulier in (zonder product-context)
2. Next.js valideert input + rate limit (max 10/min per IP)
3. Honeypot veld filtert bots
4. Lead wordt aangemaakt in **Zoho CRM → Leads**

---

## 12. Security maatregelen

- **HTTPS everywhere** met HSTS preload
- **Content-Security-Policy** + Permissions-Policy + X-Frame-Options: DENY
- **Rate limiting** op alle API endpoints (per IP, met Retry-After header)
- **Server-side prijs validatie** — klant kan prijzen niet manipuleren
- **Honeypot veld** tegen bots op contactformulier
- **Webhook secret verification** via `timingSafeEqual` (constant-time compare)
- **Idempotente webhooks** — geen dubbele orders bij Mollie retries
- **Geen secrets in Git repository** (.env files genegeerd)

---

## 13. Cookies en GDPR

- **Cookie banner** op eerste bezoek
- 4 categorieën: Noodzakelijk (altijd aan), Voorkeuren, Statistieken, Marketing
- Keuze opgeslagen in `alterion_cookie_consent` + `alterion_cookie_prefs` cookies (1 jaar)
- **Juridische pagina's:** cookiebeleid, privacybeleid, disclaimer, algemene voorwaarden

---

## 14. Openstaande items na oplevering

### ⛔ Wacht op input Jamal
| Item | Wat nodig |
|---|---|
| **ALT-24** Over Alterion tekst | Uitgebreide nieuwe copy van Jamal |
| **ALT-26** M340 certificering logo | Logo bestand van Jamal |
| **ALT-37** FAQ warmtepomp combineren | Tekst van Jamal |
| **ALT-38** FAQ service-abonnement | Tekst van Jamal |

### 🔧 Technische opvolg-punten (niet blokkerend)
| Item | Prio | Toelichting |
|---|---|---|
| MedusaJS simplificatie / verwijdering | Laag | Overweeg hardcoded products + MedusaJS afschalen (zie §2) |
| MedusaJS admin dashboard activeren | Laag | Render upgrade nodig, alleen als Jamal zelf wil beheren |
| `alterion.nl` (zonder www) SSL fix | Laag | Cloudflare config, nu werkt alleen www-variant |
| Rate limiter → Upstash/KV | Laag | Huidige is per-instance |
| LANPWR + Hyxipower officiële productfoto's | Laag | Nu placeholders |

### 💰 Administratief
- Eindfactuur €800 excl. BTW naar Jamal

---

## 15. Onderhoud en support

### Deployment workflow
Elke ticket krijgt een feature branch vanaf `development`. Bij akkoord:
1. Branch → `development` → `main`
2. Vercel deployt automatisch binnen 2-3 min

### Monitoring
- Vercel dashboard → deploy status + runtime logs
- Render dashboard → backend logs
- Mollie dashboard → betaalstatussen
- Zoho CRM → Leads + Deals

### Back-ups
- **Database:** Neon automatische back-ups (7 dagen retention op free tier)
- **Code:** GitHub repository
- **Media:** opgeslagen in repository (public/ folder)

---

## 16. Browser ondersteuning

- Chrome, Firefox, Safari, Edge — laatste 2 versies
- Mobiel: iOS Safari, Chrome Android
- Responsive design (mobile / tablet / desktop)

---

## 17. Performance

- **Static generation** voor contentpagina's (snel, goedkoop)
- **ISR (Incremental Static Regeneration)** voor webshop (5 min revalidatie)
- **Dynamic rendering** alleen voor betaalbevestiging en API routes
- **Google Fonts** met `display=block` (voorkomt ligature flash bij Material Icons)
- **Next/Image** voor automatische beeldoptimalisatie
- **Zelf-gehoste productfoto's** (geen externe CDN dependency)

---

## 18. Contactpersonen

| Rol | Naam | Contact |
|---|---|---|
| Developer | Rivaldo | RoseVibez Studio |
| Klant | Jamal Badho | jamal@alterion.nl |
| Email/domein beheer | Broer van Rivaldo | via Rivaldo |

---

## 19. Changelog — Revisieronde nacht 2026-04-20 → 2026-04-21

**26 tickets afgerond:**

### Security & backend
- Content-Security-Policy, HSTS preload, rate limiting, honeypot
- Mollie webhook signature verification + idempotency
- Server-verified payment redirect flow
- Zoho CRM: contactformulier → Leads, webshop-offertes + bestellingen → Deals

### Features
- BMS/EMS info popup op home
- Klikbare werkwijze-stappen met detail modals (4 stappen)
- Webshop filters: categorie + merk + particulier/zakelijk
- Hyxipower 1/3-fase + LANPWR-2500W producten toegevoegd
- Certificeringen-sectie filterbaar op segment
- Google Maps embed op contactpagina
- FAQ categorisering (Installatie/Klantenservice/Anders)
- Calculator: alle edge cases werken (0 panelen / alleen batterij / beide)
- Calculator: batterij kWh input toegevoegd
- Partner-logos klikbaar naar partner-websites (hover pauzeert scroll)

### Styling & brand
- League Spartan geadopteerd als heading-font (brandbook)
- Globale font-weight softening (900 → 800)
- Hero redesign + subtielere typografie
- Productcards compacter
- Offerte-buttons in primary-kleur met request_quote icon
- Alterion icoontje (uit logo geknipt, wit) bij primary CTA's
- Self-hosted productfoto's (thuisbatterij foto's op home hero + productsectie)

### Content
- Over-ons opgeschoond (oude claims weg, titel "Over Alterion")
- Werkwijze CTA vereenvoudigd
- AV-tekst: installatietermijn 14 → 40 werkdagen (consistent met FAQ)
- Dubbele `/diensten` pagina verwijderd, calculator alleen op home

### Bugfixes
- Material Icons ligature-flash (home/shopping_cart tekst zichtbaar) — root cause opgelost met `display=block` + CSS guard
- Hydration mismatch via `suppressHydrationWarning`
- Footer contact-link geverifieerd (werkte al)

---

**Versie:** 2.0 — Post-revisieronde oplevering 2026-04-21
**Laatste commit op main:** zie Vercel dashboard voor actuele deploy
