FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# RUN npm cache clean --force

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# !!!!! السطر الجديد والمهم !!!!!
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

ENV DOCKER_ENV=true

CMD ["npm", "start"]
