FROM node:14.15.4

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]