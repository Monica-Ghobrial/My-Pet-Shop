# FROM node:latest
# # /RUN apk add --no-cache nodejs npm
# WORKDIR /usr/src/app

# # COPY package*.json ./
# # RUN npm install

# # COPY . .


# EXPOSE 5000
# # EXPOSE 3000

# # ENTRYPOINT ["node"]
#  CMD ["npm","start"]

FROM node:latest

WORKDIR /usr/app

COPY . package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
