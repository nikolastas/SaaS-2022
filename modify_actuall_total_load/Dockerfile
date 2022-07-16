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

CMD [ "node", "server.js" ]

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
# docker tag <username>/<onoma-app> eu.gcr.io/solid-coral-355916/<onoma-app>:<version>

# gcloud auth login

# gcloud auth activate-service-account solid-coral-355916@appspot.gserviceaccount.com --key-file=<file from google cloud >
# file from https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys
# go to google container registry
# deploy app to google with no autherizing.



# EXAMPLE FOR DUMMIES :)
# 1. docker build . -t nikos/modify_atl
# 2.(skip if dont want to test it) docker run -p 8080:6660 -d nikos/modify_atl
# 2.5.(skip if done once) gcloud authenticate and get the json key form google console
# 3. (skip if done once) gcloud auth activate-service-account --key-file=1.json
# 4. docker tag nikos/modify_atl eu.gcr.io/solid-coral-355916/modify_atl:v0
# 5. docker push eu.gcr.io/solid-coral-355916/modify_atl:v0
# 6. delete all docker images from pc 
# 7. delete all container from pc
# 8. deploy to gcloud with env variables and always running