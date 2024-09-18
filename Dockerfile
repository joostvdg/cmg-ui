###################################################
### DEPENDENCY CACHE IMAGE - start
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
#RUN npm i next
#RUN yarn install
RUN npm install

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./ 
# RUN npm ci
### DEPENDENCY CACHE IMAGE - end
###################################################

###################################################
### BUILD IMAGE - start
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_CLASSIC_API_URL NEXT_PUBLIC_CLASSIC_API_URL_PLACEHOLDER
ENV NEXT_PUBLIC_SEAFARERS_API_URL NEXT_PUBLIC_SEAFARERS_API_URL_PLACEHOLDER
ENV NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL_PLACEHOLDER
RUN yarn build
### BUILD IMAGE - end
###################################################

###################################################
### RUNTIME IMAGE - start
FROM node:16-alpine AS runner
WORKDIR /app
EXPOSE 3000

ENV NODE_ENV production
ENV NEXT_PUBLIC_CLASSIC_API_URL NEXT_PUBLIC_CLASSIC_API_URL_PLACEHOLDER
ENV NEXT_PUBLIC_SEAFARERS_API_URL NEXT_PUBLIC_SEAFARERS_API_URL_PLACEHOLDER
ENV NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL NEXT_PUBLIC_CLASSIC_API_INTERNAL_URL_PLACEHOLDER
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

USER nextjs
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["node", "server.js"]
### RUNTIME IMAGE - end
###################################################