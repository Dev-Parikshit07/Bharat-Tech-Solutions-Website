# Bharat Tech Solutions

A responsive refurbished-laptop storefront and laptop-repair website with a private owner dashboard. Built with Next.js 14 App Router, React 18, plain JavaScript/CSS, PostgreSQL on Supabase, server-side Storage REST uploads, and JWT sessions.

## Features

- Public homepage, laptop catalogue/details, repair and contact pages
- Search and case-insensitive brand filtering
- WhatsApp product enquiries; sold-out products cannot be ordered
- Owner-only admin dashboard for products, stock, featured status and shop settings
- Server-side authorization on every admin API route
- Rate-limited login, HttpOnly JWT cookie, Origin/Host checks
- Supabase Storage upload validation (JPEG/PNG/WEBP signatures, 4 MB)
- Responsive layouts, accessible forms, SEO metadata and lightweight 3D hero with CSS fallback

## Architecture

- `app/`: App Router pages and API routes
- `components/`: reusable UI, product form, gallery and 3D hero
- `lib/`: database, sessions, auth, settings, product and storage helpers
- `schema.sql`: repeatable database schema and initial settings
- `scripts/`: owner setup and sample seed scripts

## Requirements

Node.js 20 LTS recommended, npm, a Supabase project, and a Vercel account for deployment.

## Supabase setup

1. Create a new project at https://supabase.com/.
2. In Project Settings → Database, copy the PostgreSQL **Transaction Pooler** connection string. Replace its password placeholder. Use the pooler host/port Supabase provides for your region.
3. In Storage, create a bucket named `laptop-photos`. Set it to **Public** so product images can be displayed. Keep the service-role key private; uploads are performed only by the server.
4. Copy the project URL and service-role key from Project Settings → API.
5. Keep the service-role key out of browser code and never prefix it with `NEXT_PUBLIC_`.

## Local installation

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with `DATABASE_URL`, `SESSION_SECRET` (at least 32 characters), `OWNER_EMAIL`, `OWNER_PASSWORD` (at least 10 characters), `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, and `SUPABASE_BUCKET`.

Then run:

```bash
npm run setup
npm run seed
npm run dev
```

Open http://localhost:3000. Admin login is at `/admin/login`, using the owner email/password configured when `npm run setup` was run.

`npm run setup` executes `schema.sql` and upserts the single owner row. `npm run seed` inserts three sample laptops only if a matching brand/name pair does not already exist.

## Production build

```bash
npm run build
npm start
```

Run the build with the same Node.js major version intended for deployment.

## Vercel deployment

1. Push this folder to a private or public GitHub repository.
2. Import the repository into Vercel.
3. Add these production environment variables: `DATABASE_URL`, `DATABASE_SSL`, `SESSION_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SUPABASE_BUCKET`, and `SITE_URL`.
4. Do **not** add `OWNER_EMAIL` or `OWNER_PASSWORD` to Vercel. They are only used by the one-time local setup script.
5. Ensure the Supabase bucket exists and is public for image reads.
6. Deploy, then test `/`, `/laptops`, `/admin/login`, owner login, image upload, and settings updates.

Vercel has an ephemeral filesystem. Local upload fallback is disabled on Vercel; configure Supabase Storage for production.

## Security notes

- Never commit `.env.local` or credentials.
- `SESSION_SECRET` must be a long random secret.
- Every protected API handler checks the signed owner session itself; middleware is an additional gate, not the sole authorization layer.
- SQL values are parameterized.
- Uploads are checked by file signature and size. Only server code receives the service-role key.
- The app sets baseline security headers and validates request Origin against Host for state-changing admin APIs.
- Admin actions are authenticated, but this starter does not claim independent third-party penetration testing. Review CSP and deployment headers against your final domain before launch.

## Backups and recovery

Use Supabase's database backups or scheduled `pg_dump` exports. Keep product image backups separately from database backups. Test restoring both into a staging project before relying on a backup.

## Notes

- Testimonials are explicitly labelled sample feedback and must be replaced with verified customer reviews before publication.
- Replace the placeholder shop address and verify contact details before launch.
- The included 3D hero uses procedural geometry and has a non-WebGL fallback.
