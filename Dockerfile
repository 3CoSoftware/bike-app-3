FROM node:14
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "start"]
