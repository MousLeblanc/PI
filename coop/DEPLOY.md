# Déploiement Pi COOP — Phase 1

Stack retenue : **Vercel** (Next.js) + **Railway** ou **Fly.io** (NestJS) + **Neon** (PostgreSQL).

## 0. Avant tout

- [ ] Compte GitHub + repo privé ou public
- [ ] Compte [Neon](https://neon.tech) (région Europe)
- [ ] Compte [Railway](https://railway.app) ou [Fly.io](https://fly.io)
- [ ] Compte [Vercel](https://vercel.com)
- [ ] Compte [Resend](https://resend.com) + domaine vérifié (ou `onboarding@resend.dev` pour tests)
- [ ] Widget [Cloudflare Turnstile](https://dash.cloudflare.com/) (site key + secret)

Ne jamais committer `.env` / `.env.local`.

## 1. Base Neon

1. Créer un projet Postgres (région EU).
2. Copier la connection string (`sslmode=require`).
3. Depuis `coop/api` :

```bash
export DATABASE_URL="postgresql://...@...neon.tech/neondb?sslmode=require"
npx prisma migrate deploy
npx prisma generate
```

Ne pas exécuter `seed-demo-neighbors` en production.

## 2. API Nest (Railway recommandé)

1. Nouveau service depuis le repo, root directory : `coop/api`.
2. Build : `npm install && npx prisma generate && npm run build`
3. Start : `npx prisma migrate deploy && npm run start:prod`
4. Variables :

| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | URL Neon |
| `JWT_SECRET` | secret long aléatoire |
| `PORT` | fourni par la plateforme ou `3001` |
| `CORS_ORIGIN` | `https://ton-domaine.vercel.app` (ou domaine custom) |
| `TURNSTILE_SECRET_KEY` | secret Turnstile |
| `TURNSTILE_SKIP` | `false` |
| `TURNSTILE_HOSTNAMES` | `picoop.be,www.picoop.be,pi-mocha-delta.vercel.app` |
| `RESEND_API_KEY` | clé Resend |
| `EMAIL_FROM` | `Pi COOP <noreply@ton-domaine.be>` |
| `APP_PUBLIC_URL` | URL publique du front |
| `RATE_LIMIT_REGISTER_MAX` | `5` |
| `RATE_LIMIT_REGISTER_WINDOW_MS` | `600000` |
| `NODE_ENV` | `production` |

Noter l’URL publique de l’API (ex. `https://pi-coop-api.up.railway.app`).

## 3. Front Next (Vercel)

1. Import GitHub, root : `coop/web`.
2. Variables :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | `https://…/api` (URL Railway + `/api`) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | site key Turnstile |
| `NEXT_PUBLIC_TURNSTILE_SKIP` | `false` |

3. Déployer. Ajouter le domaine custom (`.be`) ensuite.

## 4. Checklist go-live

- [ ] Inscription E2E → ligne en base Neon
- [ ] Email Resend reçu
- [ ] Turnstile bloqué sans token
- [ ] Rate-limit après 5 essais
- [ ] Pages `/mentions-legales` et `/confidentialite` accessibles
- [ ] Compteur π + jauge + voisins OK
- [ ] Mentions d’éditeur mises à jour (n° entreprise dès constitution)

## 5. Ordre des coûts (quasi gratuit)

1. Neon free + Vercel free + Railway trial/hobby
2. Domaine `.be` (~10–15 €/an)
3. Resend free tier suffisant au début
