# This stage installs our modules
FROM mhart/alpine-node:10
WORKDIR /app
# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk add --no-cache --virtual .build-deps alpine-sdk python