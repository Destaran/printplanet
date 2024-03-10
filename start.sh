#!/bin/bash

yarn install
yarn install --cwd ./backend
yarn install --cwd ./site

docker-compose up --build

