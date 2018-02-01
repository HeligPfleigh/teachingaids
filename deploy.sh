#!/bin/bash

dockerDeploy() {
  mode=$1
  shift;

  if [ "$mode" == "prod" ]
    then
      echo "Build Production Mode"
      docker-compose -f docker-compose.yml stop app
      docker-compose -f docker-compose.yml up -d --force-recreate --build app
  else
    echo "RUN Development Mode"
    npm start "$@"
  fi
}

deploy() {
  mode=$1
  shift;

  echo "git pull"
  echo "source updating..."
  git pull

  echo "node_modules installing..."
  npm install

  if [ "$mode" == "prod" ]; then
    echo "webpack bundling..."
    npm run build "$@"
  fi

  echo "deploy app..."
  dockerDeploy "$mode" "$@"
}

c=$1
shift;

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

case "$c" in
    development)
      deploy dev
    ;;

    staging)
      deploy dev -- --release
    ;;

    production)
      deploy prod -- --release
    ;;

    *)
    echo $"Usage: $0 {development | staging | production }"
    exit 1

esac
