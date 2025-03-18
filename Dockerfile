# Base stage for dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Remove any existing .env files to prevent them from being built into the app
RUN rm -rf .env* || true
# Set environment variables for build time (only NEXT_PUBLIC_ vars)
ARG NEXT_PUBLIC_SECRET
ENV NEXT_PUBLIC_SECRET=$NEXT_PUBLIC_SECRET
RUN npm run build

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Make sure to declare the environment variable here
ENV SECRET_KEY=""

CMD ["node", "server.js"] 