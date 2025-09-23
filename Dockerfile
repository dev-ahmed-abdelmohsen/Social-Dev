FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# عرّف البورت الذي يعمل عليه التطبيق
EXPOSE 3000

# تعيين متغير البيئة للإشارة إلى أننا نعمل في بيئة Docker
ENV DOCKER_ENV=true

# الأمر الذي سيتم تشغيله لبدء السيرفر
CMD ["npm", "start"]
