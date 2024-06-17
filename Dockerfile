FROM node:alpine
WORKDIR /apps/fuelfinance
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]