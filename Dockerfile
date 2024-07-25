FROM node:alpine3.19

# installing python since some of the npm packages need python
RUN apk update && apk add python3 

# changing the USER from root to node
USER node

# creating code directory
RUN mkdir -p /home/node/weatherSystem

# setting the newly created directory as work directory
WORKDIR /home/node/weatherSystem

# copying all files
COPY --chown=node:node . ./

# running npm ci which will perform a clean install all the packages
RUN npm ci

# copying rest of the project files to the work dir
COPY --chown=node:node sensor.js config.js ./

#starting the sensor script
CMD ["node","sensor.js"]
