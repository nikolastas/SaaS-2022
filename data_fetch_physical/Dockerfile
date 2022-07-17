# change to your version
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production (change it later ???)

# Bundle app source
COPY . .

#private port expose
EXPOSE 8080

CMD [ "node", "index.js" ]

# valto ston idio fakelo me ta packages
# me terminal sto fakelo:
# docker build . -t <your username>/<onoma-app>
# docker build . -t <nikos>/input_physical_flows
# tsekare an uparxei me:
# docker images
# gia na treksei to docker
# docker run -p <public port>:<private port> -d <your username>/<onoma-app>
# thetoume analogws to public port

# 
# docker tag <username>/<onoma-app> eu.gcr.io/core-parsec-356516/<onoma-app>:<version>

# gcloud auth login

# gcloud auth activate-service-account keen-ascent-356215@appspot.gserviceaccount.com --key-file=<file from google cloud >
# file from https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys
# go to google container registry
# deploy app to google with no autherizing.

# .json file 1,2 ,3 belongs to keys you must create your own !
# 1-> zaras
# 2-> alexandris
# 3-> giannis

# EXAMPLE FOR DUMMIES :)
# 1. docker build . -t nikos/fetch_ff
# 2.(skip if dont want to test it) docker run -p 8080:6660 -d nikos/fetch_ff
# 2.5.(skip if done once) gcloud authenticate and get the json key form google console
# 3. (skip if done once) gcloud auth activate-service-account --key-file=1.json
# 4. docker tag nikos/fetch_ff eu.gcr.io/core-parsec-356516/fetch_ff:v0
# 5. docker push eu.gcr.io/core-parsec-356516/fetch_ff:v0
# 6. delete all docker images from pc 
# 7. delete all container from pc
# 8. deploy to gcloud with env variables and always running