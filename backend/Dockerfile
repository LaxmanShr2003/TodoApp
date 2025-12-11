FROM node:22-alpine

#inside container where making app folder
WORKDIR /app   

#copying all the dependencies file
COPY package.json ./   

RUN npm install

#copying everything to app folder
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]