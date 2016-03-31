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

echo -e "\n--- Setting up virtualenv ---\n"
pip3 install virtualenv virtualenvwrapper

export WORKON_HOME=/home/vagrant/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3

echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3" >> /home/vagrant/.bashrc
echo "source /usr/local/bin/virtualenvwrapper.sh" >> /home/vagrant/.bashrc

source /usr/local/bin/virtualenvwrapper.sh

echo -e "\n--- Installing Python Packages ---\n"
cd /data/www/BHA
mkvirtualenv -p /usr/bin/python3 bha
workon bha
echo -e "\n--- Working on virtualenv " $VIRTUAL_ENV
pip3 install -r 'requirements.txt'

python manage.py makemigrations
python manage.py migrate
deactivate

sudo service nginx restart
sudo uwsgi --emperor /etc/uwsgi/vassals --master --daemonize /var/log/uwsgi.log
