FROM node:latest
# RUN mkdir -p/usr/src/client
WORKDIR /usr/src/client

# COPY . package*.json ./
COPY ./package*.json ./

RUN npm install
COPY . .
RUN npm build
EXPOSE 3000

CMD ["npm", "start"]