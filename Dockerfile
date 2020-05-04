# Use the official Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:10-alpine as base

# Create and change to the app directory.
WORKDIR /usr/src/app
# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package.json package*.json ./
# Copy local code to the container image.
COPY . .


FROM node:10-alpine as build
WORKDIR /usr/src/app
COPY --from=base /usr/src/app /usr/src/app
RUN npm install 

FROM node:10-alpine AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app

# Run the web service on container startup.
CMD [ "npm", "start" ]

