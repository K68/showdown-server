# This stage installs our modules
FROM dick68/alpine-node-sdk:10
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --prod \
    && apk del .build-deps


# Then we copy over the modules from above onto a `slim` image
FROM mhart/alpine-node:slim-10

# If possible, run your container using `docker run --init`
# Otherwise, you can use `tini`:
# RUN apk add --no-cache tini
# ENTRYPOINT ["/sbin/tini", "--"]

ENV rds_port 6379
ENV rds_host 127.0.0.1
ENV sp_key ALL
WORKDIR /app
COPY --from=0 /app .
COPY . .
EXPOSE 3068
# CMD ["node", "index.js"]
CMD ["sh", "-c", "node index.js ${rds_port} ${rds_host} ${sp_key}"]
