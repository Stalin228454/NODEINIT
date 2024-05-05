FROM node:alpine

WORKDIR /app

COPY . .

CMD ["node", "newPars.js"]