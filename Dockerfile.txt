FROM node
WORKDIR .
copy package*.json .
RUN pm install
COPY ..
CMD node server.js