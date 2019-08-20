FROM node:12-alpine as builder
WORKDIR /tmp/studio
COPY . /tmp/studio
RUN yarn && yarn build

FROM abiosoft/caddy:1.0.3-no-stats
WORKDIR /etc
COPY --from=builder /tmp/studio/build /etc/www/studio
COPY Caddyfile /etc/Caddyfile