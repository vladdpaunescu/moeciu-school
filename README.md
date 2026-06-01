# Școala Gimnazială Moieciu de Jos

Official website for **Școala Gimnazială Moieciu de Jos**, a Romanian elementary school in Brașov County. The site is in Romanian and serves students, parents, and staff.

## Tech Stack

- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS** + global CSS custom properties
- **Supabase** — backend database and auth
- **Framer Motion** — page transitions and animations
- **React Leaflet** — interactive map on the contact page

## Getting Started

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # ESLint
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Homepage |
| `/pages/about` | About the school |
| `/pages/announcements` | News, posts & events calendar |
| `/pages/contact` | Contact form + map |
| `/intranet` | Staff/student intranet platform |
| `/intranet/login` | Intranet login |
| `/intranet/admin` | Admin dashboard |
| `/intranet/teacher` | Teacher portal |
| `/intranet/student` | Student portal |

## Database (Supabase)

| Table | Columns |
| --- | --- |
| `Post` | `id`, `title`, `date`, `content`, `image_url` |
| `Events` | `id`, `date`, `name` |
| `Contacts` | `name`, `email`, `message` |

## Project Structure

```text
src/
  app/
    page.tsx              # Homepage
    layout.tsx
    globals.css           # Global styles + CSS custom properties
    components/           # Shared components (Navbar, PageTransition, PhotoGallery, etc.)
    pages/                # Public-facing pages (about, announcements, contact)
    intranet/             # Intranet platform (login, admin, teacher, student)
lib/
  supabaseClient.ts       # Lazy proxy Supabase client
public/                   # Static assets and gallery photos
```
