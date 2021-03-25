FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i ts-node
RUN npm install
EXPOSE $API_PORT
CMD ["npm", "start"]