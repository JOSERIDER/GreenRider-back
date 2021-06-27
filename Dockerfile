FROM node:15-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./src ./src
COPY tsconfig*.json ./
RUN npm install
COPY . .
EXPOSE 8888
CMD npm run dev