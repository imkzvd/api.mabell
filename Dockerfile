FROM node:22-alpine AS build-stage
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:admin

FROM node:22-alpine
WORKDIR /api.mabell
COPY --from=build-stage /build/package*.json ./
COPY --from=build-stage /build/dist/apps/admin/apps/admin ./apps/admin
COPY --from=build-stage /build/dist/apps/admin/libs ./libs
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "apps/admin/src/main"]