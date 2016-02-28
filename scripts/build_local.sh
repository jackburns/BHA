#!/bin/bash

# installing some easy stuff
echo -e "\n--- Updating all the things ---\n"
sudo apt-get -y update > /dev/null
sudo apt-get -y upgrade > /dev/null

echo -e "\n--- Update  npm packages ---\n"
cd /vagrant/js
sudo npm install
gulp webpack
cd ..

sudo service nginx restart