#!/bin/bash

sudo service nginx restart
sudo uwsgi --emperor /etc/uwsgi/vassals --master --daemonize /var/log/uwsgi.log

