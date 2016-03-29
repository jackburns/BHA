#!bin/bash

cd /data/www/BHA/js
npm install
karma start
gulp webpack

service nginx restart
