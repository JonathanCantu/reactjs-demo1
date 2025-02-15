#!/bin/bash

# Build and run script for ReactJS Periodic Table of the Elements

node ./src/server.js &
npm install --legacy-peer-deps
npm install --save-dev web-vitals --legacy-peer-deps

npm start
