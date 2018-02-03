#!/bin/bash

# remove all exited or created docker containers
CONTAINERS=$(docker ps -a -f status=exited -f status=created -q)

if [ "$CONTAINERS" != "" ]; then
  docker rm $(docker ps -a -f status=exited -f status=created -q)
fi

# remove all exited or created docker images
IMAGES=$(docker images -f dangling=true -q)

if [ "$IMAGES" != "" ]; then
  docker rmi $(docker images -f dangling=true -q)
fi

# run mongo
MONGODB=$(docker-compose ps -q mongo)

if [ "$MONGODB" == "" ]; then
  #if [ "$c" == "production" ]; then
  #  echo "mongo container does not exist"
  #  echo "mongo container is starting..."
  #  docker-compose -f docker-compose.pro.yml up -d mongo
  #else
  docker-compose -f docker-compose.yml up -d mongo
  #fi
else
    docker-compose start mongo
fi

echo "source updating..."
git pull

echo "node_modules installing..."
npm install

echo "webpack bundling..."
npm run build -- --release

# PM2 remove old app
echo "PM2 stop old app"
pm2 stop teachingaidsman

echo "PM2 remove old app"
pm2 delete teachingaidsman

echo "deploy app..."
pm2 start apps.json
