#!/bin/bash

sleep 15
service nginx restart
uwsgi --emperor /etc/uwsgi/vassals --master --daemonize /var/log/uwsgi.log

