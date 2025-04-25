FROM canardconfit/puppeteer-docker:latest
USER root
WORKDIR /home/pptruser/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main"]
