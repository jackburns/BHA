#!bin/bash

cd /data/www/BHA/js
npm install
gulp webpack

echo -e "\n--- Installing Python Packages ---\n"

cd /data/www/BHA
sudo pip3 install -r 'requirements.txt'

python3 manage.py makemigrations
python3 manage.py migrate
sudo uwsgi --emperor /etc/uwsgi/vassals --master --daemonize /var/log/uwsgi.log
sudo service nginx restart
