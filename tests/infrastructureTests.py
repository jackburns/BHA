'''
packages to test for:
	sendmail
	nginx
	openssh
	cloud-init
	rpcbind
	messagebus
'''
# Networking #

## Sendmail ##
def test_sendmail_is_installed(Package):
	sendmail = Package("sendmail")
	assert sendmail.is_installed

def test_sendmail_is_running_and_enabled(Service):
	sendmail = Service("sendmail")
	assert sendmail.is_running
	assert sendmail.is_enabled

## UWSGI ##
def test_uwsgi_installed(Command):
	cmd = Command("uwsgi --version")
	assert cmd.rc == 0

def test_uwsgi_sock_listening(Socket):
	uwsgi = Socket("unix:///tmp/uwsgi.sock")
	assert uwsgi.is_listening

## NGINX ##
def test_nginx_is_installed(Package):
	nginx = Package("nginx")
	assert nginx.is_installed

def test_nginx_running_and_enabled(Service):
	nginx = Service("nginx")
	assert nginx.is_running
	assert nginx.is_enabled

def test_nginx_conf_points_to_sock(File):
	nginx_config = File("/etc/nginx/conf.d/django.conf")
	assert nginx_config.exists
	assert nginx_config.contains("server unix:///tmp/uwsgi.sock")
	assert nginx_config.contains("root /opt/python/current/app/js/dist")
	assert nginx_config.contains("location /")
	assert nginx_config.contains("location /static")
	assert nginx_config.contains("location /api")
	assert nginx_config.contains("location /admin")

## HTTP server listening? ##
def test_http80_listening(Socket):
	http = Socket("tcp://80")
	assert http.is_listening

def test_opensshdaemon_is_installed(Package):
	opensshdaemon = Package("openssh-server")
	assert opensshdaemon.is_installed

def test_cloudinit_running_and_enabled(Service):
	cloudinit = Service("crond")
	assert cloudinit.is_running

def test_rpcbind_is_installed(Package):
	rpcbind = Package("rpcbind")
	assert rpcbind.is_installed

def test_rpcbind_running(Service):
	rpcbind = Service("rpcbind")
	assert rpcbind.is_running

def test_messagebus_running(Service):
	messagebus = Service("messagebus")
	assert messagebus.is_running
