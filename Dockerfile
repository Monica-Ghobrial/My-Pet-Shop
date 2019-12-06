# FROM node:latest
# # /RUN apk add --no-cache nodejs npm
# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

# COPY . .


# EXPOSE 5000

# # ENTRYPOINT ["node"]
#  CMD ["npm","start"]


# FROM mhart/alpine-node:11 AS builder
# WORKDIR /usr/src/client
# COPY . .
# RUN yarn run build
# FROM mhart/alpine-node

# RUN yarn global add serve

# WORKDIR /usr/src/client

# COPY --from=builder /app/bu .

# CMD ["serve", "-p", "80", "-s", "."]

# =========================================

FROM node:latest
# RUN mkdir -p/usr/src/client
WORKDIR /usr/src/client

COPY . package*.json ./

RUN npm install
COPY . .
RUN npm build
EXPOSE 3000

CMD ["npm", "start"]