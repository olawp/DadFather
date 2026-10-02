FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
RUN bun run build

FROM oven/bun:1-alpine

WORKDIR /app
ENV NODE_ENV=production

LABEL org.opencontainers.image.source="https://github.com/olawp/DadFather"

COPY --from=build /app/dist ./dist

CMD ["bun", "run", "dist/index.js"]
