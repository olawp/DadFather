FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
RUN bun build src/index.ts src/deploy-commands.ts --outdir dist --target bun

FROM oven/bun:1-alpine

WORKDIR /app
ENV NODE_ENV=production

LABEL org.opencontainers.image.source="https://github.com/olawp/DadFather"

COPY --from=build /app/dist ./dist

CMD ["sh", "-c", "bun dist/deploy-commands.js && exec bun dist/index.js"]
