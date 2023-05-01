FROM --platform=$BUILDPLATFORM docker.tangerie.xyz/webraylib:latest as build-cpp

WORKDIR /app

COPY . .

RUN ./scripts/generate.sh
RUN ./scripts/build-release.sh

FROM --platform=$BUILDPLATFORM node:18.3.0 as build-web

WORKDIR /app

COPY ./web/package.json ./

RUN npm i 

COPY ./web ./

COPY --from=build-cpp /app/web/res /app/res

RUN npm run build

FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-web /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
