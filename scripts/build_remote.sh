#!bin/bash

cd /data/www/BHA/js
sudo npm install
gulp webpack

service nginx restart