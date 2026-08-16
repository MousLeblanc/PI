FROM node:20-bookworm-slim AS build
WORKDIR /app

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --include=dev

COPY . .
RUN npx prisma generate && npm run build && test -f dist/src/main.js

FROM node:20-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev && npx prisma generate

COPY --from=build /app/dist ./dist

EXPOSE 8080
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]
