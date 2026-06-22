# Școala Gimnazială Moieciu de Jos — Website și Platformă Intranet

## Prezentare generală

Aceasta este aplicația web oficială a **Școlii Gimnaziale Moieciu de Jos**, o școală din județul Brașov. Aplicația combină un site public cu o platformă intranet privată pentru administratori, profesori și elevi. Site-ul public prezintă identitatea școlii, știrile și informațiile de contact. Intranetul oferă gestionarea datelor academice pe bază de roluri — note, absențe, repartizări pe clase și altele.

---

## Stiva tehnologică

| Strat | Tehnologie | Versiune |
|---|---|---|
| Framework | Next.js (App Router) | ^16.2.6 |
| Bibliotecă UI | React | ^19.0.0 |
| Limbaj | TypeScript | ^5.7.2 |
| Stilizare | Tailwind CSS | ^3.4.17 |
| Stilizare dinamică | styled-components | ^6.1.13 |
| Animații | Framer Motion | ^11.15.0 |
| Iconițe | lucide-react | ^0.468.0 |
| Hărți | React Leaflet + Leaflet | ^5.0.0 / ^1.9.4 |
| Bază de date | Supabase (PostgreSQL) | — |
| Client BD (server) | @supabase/ssr | ^0.10.3 |
| Client BD (browser) | @supabase/supabase-js | ^2.105.4 |
| Notificări | react-hot-toast | ^2.5.1 |

### Runtime și build

- **Runtime**: Node.js
- **Unealtă de build**: Next.js CLI (`next build`)
- **Server de dezvoltare**: `next dev`
- **Țintă de deployment**: Vercel (sau orice gazdă compatibilă Node.js)

---

## Structura proiectului

```
moeciu-school/
├── lib/
│   ├── supabaseServer.ts     # Client Supabase pentru server (gestionează cookie-uri)
│   └── supabaseClient.ts     # Client Supabase pentru browser (singleton)
├── src/
│   ├── proxy.ts              # Middleware Next.js — protecție rute și rutare pe roluri
│   └── app/
│       ├── layout.tsx        # Layout rădăcină
│       ├── page.tsx          # Pagina principală
│       ├── components/       # Componente UI pentru site-ul public
│       │   ├── Navbar.tsx
│       │   ├── Footer.tsx
│       │   ├── MainPage.tsx
│       │   ├── NewsSection.tsx
│       │   ├── PhotoGallery.tsx
│       │   ├── Testimonials.tsx
│       │   ├── StatsSection.tsx
│       │   ├── LocationSection.tsx
│       │   ├── ContactPageForm.tsx
│       │   └── actions/
│       │       └── submit-contact-form.tsx   # Server Action formular contact
│       ├── pages/
│       │   ├── about/page.tsx
│       │   ├── announcements/page.tsx
│       │   └── contact/page.tsx
│       └── intranet/
│           ├── layout.tsx                    # Layout comun intranet
│           ├── page.tsx                      # Punct de intrare cu redirect
│           ├── login/page.tsx                # Pagina de autentificare
│           ├── actions/
│           │   ├── auth.ts                   # Server Actions: login / logout
│           │   ├── admin.ts                  # Server Actions: CRUD admin
│           │   ├── grades.ts                 # Server Actions: CRUD note
│           │   └── attendances.ts            # Server Actions: CRUD absențe
│           ├── components/
│           │   ├── IntranetNavbar.tsx
│           │   └── DataTable.tsx
│           ├── admin/
│           │   ├── page.tsx                  # Panou de control admin
│           │   ├── subjects/page.tsx
│           │   ├── classes/page.tsx
│           │   ├── students/page.tsx
│           │   ├── teachers/page.tsx
│           │   ├── assignments/page.tsx
│           │   ├── grades/page.tsx
│           │   ├── attendances/page.tsx
│           │   └── components/
│           │       ├── AdminCrudForm.tsx
│           │       └── AdminRow.tsx
│           ├── teacher/
│           │   ├── page.tsx                  # Panou profesor (lista clase)
│           │   └── [tscId]/
│           │       ├── page.tsx              # Detaliu clasă (note + absențe)
│           │       ├── GradeFormSection.tsx
│           │       └── AttendanceFormSection.tsx
│           └── student/
│               ├── page.tsx                  # Panou elev
│               └── [tscId]/page.tsx          # Detaliu materie
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Dezvoltare

```bash
# Instalare dependențe
npm install

# Pornire server de dezvoltare
npm run dev

# Build pentru producție
npm run build

# Pornire server de producție
npm start

# Rulare linter
npm run lint
```

---
