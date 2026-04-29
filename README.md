# Texas Forever Charters

Premium boat charter website for Lake Travis, Austin TX. Built with Next.js 14, TypeScript, Tailwind CSS, Prisma, NextAuth v5, and Stripe.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Playfair Display + DM Sans fonts)
- **Database:** PostgreSQL via Prisma v7
- **Auth:** NextAuth v5 (Email/Password + Google OAuth)
- **Payments:** Stripe (50% deposit at booking)
- **Email:** Nodemailer (SMTP)

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/texas-forever-charters.git
cd texas-forever-charters
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values (see comments in `.env.example` for each service).

### 3. Set up the database

**Option A — Supabase (recommended for Vercel)**
1. Go to [supabase.com](https://supabase.com) and create a free project
2. Go to **Settings → Database → Connection string**
3. Copy the **Transaction pooler** URI (port 6543) → `DATABASE_URL`
4. Copy the **Session pooler** or direct URI (port 5432) → `DIRECT_URL`

**Option B — Local PostgreSQL**
```bash
createdb texas_forever_charters
# Set DATABASE_URL=postgresql://localhost:5432/texas_forever_charters
```

### 4. Run Prisma migrations and seed

```bash
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
```

### 5. Generate NextAuth secret

```bash
npx auth secret
```

Copy the output to `AUTH_SECRET` in `.env`.

### 6. Set up Google OAuth (optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → APIs & Services → Credentials → Create OAuth Client ID
3. Application type: **Web application**
4. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google`
5. Copy Client ID and Secret to `.env`

### 7. Set up Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy test publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy test secret key → `STRIPE_SECRET_KEY`
4. For webhooks (local), in a separate terminal:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
5. Copy the webhook signing secret → `STRIPE_WEBHOOK_SECRET`

### 8. Set up Email (Gmail)

1. Enable 2FA on the Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a password for "Mail"
4. Set `SMTP_USER=tx4evercharters@gmail.com` and `SMTP_PASS=<app-password>`

### 9. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel + Supabase

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/texas-forever-charters.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables (copy from `.env.example`)
   - Set `NEXTAUTH_URL` to your production URL (e.g. `https://texasforevercharters.com`)
   - Update Google OAuth redirect URI to include your production domain
4. Click **Deploy**

### 3. Set up Prisma for Supabase on Vercel

Add this to your `prisma/schema.prisma` datasource when using Supabase:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")      // Transaction pooler (port 6543)
  directUrl = env("DIRECT_URL")        // Direct connection (port 5432)
}
```

Then in Vercel environment variables, set both `DATABASE_URL` and `DIRECT_URL`.

### 4. Set up Stripe webhook for production

```bash
stripe webhooks create \
  --url https://yourdomain.com/api/stripe/webhook \
  --events payment_intent.succeeded
```

Copy the new `STRIPE_WEBHOOK_SECRET` to Vercel environment variables and redeploy.

---

## Project Structure

```
texas-forever-charters/
├── app/
│   ├── (auth)/login/          # Login page
│   ├── (auth)/register/       # Register page
│   ├── api/
│   │   ├── auth/              # NextAuth handlers + register
│   │   ├── bookings/          # Bookings API
│   │   ├── contact/           # Contact form API
│   │   └── stripe/            # Payment intent + webhook
│   ├── booking/               # Booking page (3-step form)
│   ├── contact/               # Contact page
│   ├── dashboard/             # User dashboard
│   └── page.tsx               # Homepage
├── components/
│   ├── booking/               # Booking form with Stripe Elements
│   ├── contact/               # Contact form
│   ├── dashboard/             # Dashboard UI
│   ├── layout/                # Navbar + Footer
│   ├── providers/             # Session provider
│   └── sections/              # Homepage sections (Hero, Packages, etc.)
├── lib/
│   ├── auth.ts                # NextAuth v5 config
│   ├── db.ts                  # Prisma singleton
│   ├── email.ts               # Nodemailer helpers
│   ├── stripe.ts              # Stripe client
│   └── utils.ts               # cn(), formatCurrency(), formatDate()
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # 4 sample charter packages
└── public/
    └── images/
        ├── boats/             # Add boat photos here
        ├── gallery/           # Add gallery photos here
        └── crew/              # Add crew photos here
```

---

## Referral & Points System

- Every user gets a unique referral code on registration
- When someone signs up using your code, you earn **10 points**
- **200 points** = 50% discount on your next charter
- Discount is applied automatically at checkout (opt-in)
- Points are deducted after the discount is used

---

## Adding Photos

Drop photos into `public/images/boats/`, `public/images/gallery/`, or `public/images/crew/`.

Update the `imageUrl` field in `prisma/seed.ts` to reference them (e.g. `/images/boats/my-boat.jpg`), then re-run the seed.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npx prisma studio` | Open Prisma DB browser |
| `npx prisma migrate dev` | Create + apply a migration |
| `npx ts-node prisma/seed.ts` | Seed charter packages |
| `stripe listen --forward-to localhost:3000/api/stripe/webhook` | Forward Stripe webhooks locally |
