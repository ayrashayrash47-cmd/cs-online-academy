# CS Online Academy

Marketing landing page + enrollment flow + admin dashboard for CS Online
Academy, the digital tutoring arm of CS School System. Built with Next.js
(App Router), Tailwind CSS, and Prisma + SQLite.

Bilingual (English / Urdu with RTL), mobile-first, dark grey / orange / gold
brand palette.

## Requirements

- Node.js 20+
- npm

## Running locally

```bash
npm install
cp .env.example .env   # then edit .env, see below
npx prisma migrate deploy   # creates dev.db and applies the schema
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page,
and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin
dashboard (login with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env`).

## Where to edit things

Everything content- and pricing-related is centralized so you shouldn't need
to touch component code for routine changes:

| What you want to change | File |
|---|---|
| Site name, tagline, subjects list, pricing (Rs. amounts), payment details, upload limits | [`src/config/site.ts`](src/config/site.ts) |
| English copy (headlines, FAQ, testimonials, etc.) | [`src/i18n/en.ts`](src/i18n/en.ts) |
| Urdu copy | [`src/i18n/ur.ts`](src/i18n/ur.ts) |
| Colors (dark grey / orange / gold palette) | CSS variables at the top of [`src/app/globals.css`](src/app/globals.css) |
| Placeholder images | drop real photos into [`public/images/`](public/images) and reference them from components |

The two files (`site.ts` for one language, `en.ts`/`ur.ts` for the other)
must stay in sync — e.g. if you add a subject or pricing tier in
`site.ts`, add its label in both `en.ts` and `ur.ts`.

### Adding your real EasyPaisa / bank details

EasyPaisa is already filled in. Bank transfer is a placeholder — open
`src/config/site.ts` and fill in:

```ts
bank: {
  bankName: "[BANK_NAME]",
  accountNumber: "[BANK_ACCOUNT_NUMBER]",
  iban: "[IBAN]",
},
```

### Changing the admin password

Edit `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your `.env` file, then restart
the server. This is a single hardcoded admin account stored in an
environment variable — **fine for a v1 single-owner site, but upgrade to a
real auth provider (e.g. NextAuth with hashed passwords) before this handles
meaningful volumes of real payment data.** Also rotate `SESSION_SECRET`
(used to sign the admin session cookie) — generate a new one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## How enrollment + payment verification works

This is a "pay externally, then submit proof" flow — there is **no live
payment gateway integration**. A student:

1. Picks a plan on the pricing section.
2. Pays via EasyPaisa (or bank transfer) using the account details shown
   on the page.
3. Fills out the enrollment form and uploads a screenshot of the payment.
4. Their submission is saved with status `pending` and the screenshot is
   stored in `public/uploads/` (local disk — fine for v1; swap for
   Cloudinary or similar if you outgrow shared hosting storage).

You then review submissions in `/admin`, and mark each one **Verified** or
**Rejected**. The dashboard shows totals, pending/verified counts, and
estimated monthly revenue (verified students × their plan price), and lets
you search/filter and export everything to CSV.

## Database

SQLite via Prisma, stored at `dev.db` in the project root (path controlled
by `DATABASE_URL` in `.env`). To inspect or edit data directly:

```bash
npx prisma studio
```

If you change `prisma/schema.prisma`, create a migration with:

```bash
npx prisma migrate dev --name <description>
```

To move to PostgreSQL later (e.g. when growing beyond shared hosting),
change the `datasource` provider in `prisma/schema.prisma`, update
`DATABASE_URL`, and swap the driver adapter in `src/lib/db.ts`
(currently `@prisma/adapter-better-sqlite3`) for the Postgres adapter.

## Deployment

This app needs a Node.js server (it uses API routes, file uploads, and a
SQLite file on disk) — it is **not** a static export. It runs well on
Railway, Render, or any host that runs `npm run build && npm start`
persistently. For shared hosting without persistent disk or a Node runtime,
you'll need to swap file storage for Cloudinary/S3 and the database for a
hosted Postgres/MySQL instance first.

```bash
npm run build
npm start
```

Remember to set the same environment variables (`DATABASE_URL`,
`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`) on your host, and to
run `npx prisma migrate deploy` against the production database before
first boot.
