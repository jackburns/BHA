#!bin/bash

cd /data/www/BHA/js
npm install
gulp webpack

# installing python and django
echo -e "\n--- Setting up uWSGI ---\n"

apt-get install -y python3-pip
pip3 install uwsgi
mkdir -p /etc/uwsgi/vassals/
ln -s /data/www/BHA/config/django.ini /etc/uwsgi/vassals/django.ini

echo -e "\n--- Installing Python Packages ---\n"

cd /data/www/BHA
pip3 install -r 'requirements.txt'

python manage.py makemigrations
python manage.py migrate

sudo service nginx restart
sudo uwsgi --emperor /etc/uwsgi/vassals --master --daemonize /var/log/uwsgi.log
