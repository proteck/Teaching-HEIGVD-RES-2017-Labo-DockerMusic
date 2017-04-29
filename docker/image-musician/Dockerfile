FROM node:latest

MAINTAINER Maxime Guillod <maxime.guillod@heig-vd.ch>

#
# When we build the image, we copy the executable jar in the image file system.
#
COPY src /opt/app/

WORKDIR /opt/app/

RUN npm install uuid

ENTRYPOINT ["node", "/opt/app/musician.js"]
