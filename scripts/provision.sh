#!/bin/bash

# installing some easy stuff
echo -e "\n--- Updating all the things ---\n"
sudo apt-get -y update > /dev/null
sudo apt-get -y upgrade > /dev/null

echo -e "\n--- Install git nginx nodejs npm ---\n"
sudo apt-get -y install git nginx nodejs npm
echo -e "\n--- Install global npm packages"
cd /vagrant/js
sudo npm install -g gulp
sudo npm install karma
sudo npm install karma-cli
sudo npm install webpack
sudo npm install
gulp webpack
cd ..

echo "Configuring Nginx"
    cp /vagrant/config/nginx_local_config /etc/nginx/sites-available/nginx_local_config > /dev/null
    
    ln -s /etc/nginx/sites-available/nginx_local_config /etc/nginx/sites-enabled/
    
    rm -rf /etc/nginx/sites-available/default
    
# symlink nodejs to node to avoid conflicts
sudo ln -s /usr/bin/nodejs /usr/bin/node

# installing python and django
echo -e "\n--- Installing python and django ---\n"
sudo apt-get -y install python3-pip
sudo pip3 install django

# setup mysql install
echo -e "\n--- Setup and install MYSQL ---\n"
sudo apt-get -y install debconf-utils

debconf-set-selections <<< "mysql-server mysql-server/root_password password password"
    
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password password"

apt-get install mysql-server -y

sudo service nginx restart
