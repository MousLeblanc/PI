# Pi COOP

Application de gestion de la coopérative citoyenne (pré-inscription, puis magasin / quotas / bénévolat).

## Phase 1 (MVP)

Landing + pré-inscription gamifiée (Belgique).

## Structure

- `web/` — Next.js (frontend)
- `api/` — NestJS + Prisma (backend)
- `docker-compose.yml` — PostgreSQL local (quand Docker est disponible)

## Base de données

PostgreSQL via Prisma.

1. **Dev immédiat** : une base Prisma Postgres peut être créée avec `npx create-db` (voir `.env` / claim URL).
2. **Local recommandé** : `docker compose up -d` puis  
   `DATABASE_URL=postgresql://picoop:picoop@localhost:5432/picoop?schema=public`

```bash
cd api
npx prisma migrate dev
npm run start:dev
```

## Mise en ligne

Voir [`DEPLOY.md`](DEPLOY.md) — Neon + Railway/Fly + Vercel + Resend + Turnstile.

```bash
# terminal 1 — API
cd coop/api
npm install
npx prisma migrate dev
npm run start:dev

# terminal 2 — Web
cd coop/web
npm install
npm run dev
```

- Web : http://localhost:3000  
- API : http://localhost:3001/api/health  
