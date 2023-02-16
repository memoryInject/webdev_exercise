FROM node:alpine
RUN apk add --no-cache bash
WORKDIR /app
COPY ./backend/package.json ./

RUN npm i -g ts-node typescript
RUN npm install

COPY ./compose/test/backend/entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//g' /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./compose/test/backend/start.sh /start.sh
RUN sed -i 's/\r$//g' /start.sh
RUN chmod +x /start.sh

ENTRYPOINT ["/entrypoint.sh"]
