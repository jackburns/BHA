#!bin/bash

cd /data/www/BHA/js
npm install
gulp webpack

service nginx restart
