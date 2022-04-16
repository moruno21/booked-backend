FROM node:12.19.0-alpine3.9 as development

WORKDIR /usr/src/app

COPY package*.json ./

#rimraf is an alternative to the Linux command rm -rf. Deep recursive deletion of files and folders.
RUN npm install glob rimraf

#only install development dependencies
RUN npm install --only= development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]