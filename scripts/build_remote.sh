#!bin/bash

cd /data/www/BHA/js
npm install
gulp webpack

sudo ln -s /data/www/BHA/bha/config/django.ini /etc/uwsgi/vassals/django.ini
cd /data/www/BHA
sudo pip3 install -r 'requirements.txt'

python3 manage.py makemigrations
python3 manage.py migrate
sudo uwsgi --emperor /etc/uwsgi/vassals --master --daemonize /var/log/uwsgi.log
sudo service nginx restart
