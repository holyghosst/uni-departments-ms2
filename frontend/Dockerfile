FROM node:24-slim AS build

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]