# Overdrachtsdocument — Alterion.nl

**Opgeleverd door:** Rivaldo (RoseVibez Studio)
**Opgeleverd aan:** Jamal Badho — Alterion BV
**Oplevering:** dinsdag (na revisieronde maandag)
**Live URL:** https://www.alterion.nl

---

## 1. Wat is de website

Een volledig op maat gemaakte Next.js website voor Alterion BV met:

- **Publieke site** (home, diensten, over ons, contact, juridische pagina's)
- **Webshop** met thuisbatterijen, omvormers, zonnepanelen en laadpalen
- **Offerte-aanvraag flow** voor zakelijke/aanvraag-producten
- **Online checkout** met iDEAL / Bancontact / Creditcard via Mollie
- **CRM-integratie** met Zoho (elke lead en order wordt automatisch aangemaakt)
- **Productbeheer** via MedusaJS backend (eigen admin)
- **Cookie banner** GDPR-compliant met voorkeurenpaneel
- **Meertalig voorbereid** (nu volledig Nederlands)

---

## 2. Technische stack

### Frontend
| Onderdeel | Waarom |
|---|---|
| **Next.js 16.1** (App Router) | React framework, server-side rendering, API routes |
| **React 19** | UI library |
| **TypeScript** | Type safety — minder bugs |
| **Tailwind CSS 4** | Styling system |
| **Turbopack** | Snelle builds |

### Backend / Services
| Onderdeel | Doel |
|---|---|
| **MedusaJS v2.13** | E-commerce backend — producten, voorraad, orders |
| **Neon PostgreSQL** (eu-central-1) | Database voor MedusaJS |
| **Mollie** | Betalingen (iDEAL, Bancontact, Creditcard) |
| **Zoho CRM** | Leadbeheer + orderregistratie |
| **Cloudflare DNS** | Domein routing |
| **Vercel** | Frontend hosting |
| **Render** | MedusaJS backend hosting |

### Extra libraries (npm)
- `@mollie/api-client` — Mollie betalingen
- `next/link`, `next/image` — geoptimaliseerde navigatie + afbeeldingen
- Google Material Symbols — iconen (via CDN)

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
│  └─ Stuurt leads/orders naar Zoho CRM                 │
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
- `/` — Home
- `/diensten` — Dienstenoverzicht + calculators
- `/over-ons` — Over Alterion
- `/contact` — Contactformulier (stuurt naar Zoho)
- `/webshop` — Productoverzicht met filters
- `/webshop/[slug]` — Product detailpagina
- `/winkelwagen` — Winkelmand
- `/afrekenen` — Checkout formulier
- `/afrekenen/bevestiging` — Bevestigingspagina na Mollie betaling

### Juridisch
- `/cookies` — Cookiebeleid
- `/privacybeleid` — Privacy policy
- `/voorwaarden` — Algemene voorwaarden
- `/disclaimer` — Disclaimer

### API endpoints (intern)
- `/api/contact` — Contactformulier → Zoho Leads
- `/api/checkout` — Maakt Mollie betaling + MedusaJS cart aan
- `/api/checkout/webhook` — Ontvangt betaalbevestiging van Mollie

---

## 5. Taal en content

- **Hoofdtaal:** Nederlands (nl-NL)
- **HTML lang:** `nl`
- **Alle teksten:** Nederlands
- **Valuta:** EUR (met Nederlandse format: €2.499,00)
- **Datums:** Nederlandse notatie
- **BTW:** 21% wordt automatisch toegevoegd bij checkout

---

## 6. Accounts en logins

### MedusaJS Admin (Jamal's backend)
- **URL:** API only (admin dashboard is uitgeschakeld op Render free tier)
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
- Eigen account van Jamal (API key staat als env var op Render én Vercel)

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
| `MOLLIE_WEBHOOK_SECRET` | Webhook beveiliging |
| `ZOHO_CLIENT_ID` | Zoho OAuth |
| `ZOHO_CLIENT_SECRET` | Zoho OAuth |
| `ZOHO_REFRESH_TOKEN` | Zoho long-lived token |

### Render (Medusa backend)
Staat in `.env` op de Render service — bevat Neon connection string, Medusa secrets, Mollie key.

---

## 8. Producten beheren

Producten worden beheerd in MedusaJS. Omdat het admin dashboard uitgeschakeld is op Render (free tier), zijn er twee opties:

**A) MedusaJS admin lokaal draaien** (technisch)
Vereist dat Rivaldo of een developer het admin lokaal opstart tegen dezelfde database.

**B) Admin dashboard apart deployen** (aanbevolen)
Render upgraden naar paid plan óf admin apart hosten. Dit is een openstaand item.

**Huidige producten:**
- Thuisbatterij Lite — €2.499 (5 kWh)
- Thuisbatterij Pro — €4.599 (10 kWh)
- Thuisbatterij Max — €7.299 (20 kWh)
- + meerdere offerte-aanvraag producten

Prijzen worden in centen opgeslagen in MedusaJS (249900 = €2.499).

---

## 9. Hoe bestellingen werken

1. Klant selecteert producten op `/webshop`
2. Voegt toe aan winkelmand → `/winkelwagen`
3. Vult gegevens in op `/afrekenen`
4. Next.js:
   - Haalt prijzen server-side op van MedusaJS (fraudepreventie)
   - Maakt MedusaJS cart aan met klantgegevens
   - Maakt Mollie betaling aan
5. Klant wordt doorgestuurd naar Mollie betaalpagina
6. Na betaling redirect naar `/afrekenen/bevestiging`
7. Mollie stuurt webhook naar `/api/checkout/webhook`:
   - Verifieert betaling status
   - Completet MedusaJS cart → order verschijnt in backend
   - Maakt Zoho CRM "Deal" aan met alle bestelgegevens

**Waar ziet Jamal de bestellingen?**
- **Zoho CRM → Deals** (primaire werkwijze)
- MedusaJS database (via API of admin dashboard indien geactiveerd)
- Mollie dashboard (voor betalingen)

---

## 10. Hoe contactaanvragen werken

1. Klant vult `/contact` formulier in
2. Next.js valideert input + rate limit (max 10/min per IP)
3. Lead wordt aangemaakt in Zoho CRM → Leads
4. Jamal krijgt melding in Zoho

---

## 11. Security maatregelen

- **HTTPS everywhere** met HSTS preload
- **Content-Security-Policy** — beschermt tegen XSS
- **X-Frame-Options: DENY** — voorkomt iframe embedding
- **Rate limiting** op alle API endpoints
- **Server-side prijs validatie** — klant kan prijzen niet manipuleren
- **Honeypot veld** tegen bots op contactformulier
- **Webhook secret verification** via timing-safe compare
- **Idempotente webhooks** — geen dubbele orders bij retries
- **Geen secrets in Git repository** (.env files genegeerd)

---

## 12. Cookies en GDPR

- **Cookie banner** op eerste bezoek
- 4 categorieën: Noodzakelijk (altijd aan), Voorkeuren, Statistieken, Marketing
- Keuze opgeslagen in `alterion_cookie_consent` + `alterion_cookie_prefs` cookies (1 jaar)
- **Juridische pagina's:** cookiebeleid, privacybeleid, disclaimer, algemene voorwaarden

---

## 13. Openstaande items na oplevering

| Item | Prioriteit | Toelichting |
|---|---|---|
| MedusaJS admin dashboard activeren | Middel | Render upgraden of apart deployen zodat Jamal producten zelf kan beheren |
| `alterion.nl` (zonder www) SSL fix | Laag | Nu werkt alleen `www.alterion.nl` — Cloudflare config |
| Rate limiter upgraden naar Upstash/KV | Laag | Huidige is per-instance, niet globaal |
| Product search/filters aan MedusaJS koppelen | Laag | Filters zijn nu hardcoded |

---

## 14. Onderhoud en support

### Deployment
- **Automatisch:** elke `git push` naar `main` → Vercel deployt binnen 2-3 min
- **Medusa backend:** deployt bij push naar de backend repo op Render

### Monitoring
- Vercel dashboard → deploy status + runtime logs
- Render dashboard → backend logs
- Mollie dashboard → betaalstatussen
- Zoho CRM → leads en deals

### Back-ups
- **Database:** Neon heeft automatische back-ups (7 dagen retention op free tier)
- **Code:** GitHub repository
- **Media:** opgeslagen in repository (public/ folder)

---

## 15. Browser ondersteuning

- Chrome, Firefox, Safari, Edge — laatste 2 versies
- Mobiel: iOS Safari, Chrome Android
- Responsive design (mobile / tablet / desktop)

---

## 16. Performance

- **Static generation** voor alle contentpagina's (snel, goedkoop)
- **ISR (Incremental Static Regeneration)** voor webshop (5 min revalidatie)
- **Dynamic rendering** alleen voor betaalbevestiging en API routes
- **Google Fonts** met `display=optional` (geen layout shifts)
- **Next/Image** voor automatische beeldoptimalisatie

---

## 17. Contactpersonen

| Rol | Naam | Contact |
|---|---|---|
| Developer | Rivaldo | RoseVibez Studio |
| Klant | Jamal Badho | jamal@alterion.nl |
| Email/domein beheer | Broer van Rivaldo | via Rivaldo |

---

**Versie:** 1.0 — Oplevering 2026-04-21
**Laatste deploy vóór oplevering:** zie Vercel dashboard voor actuele commit
