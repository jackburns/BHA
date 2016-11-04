'''
Performing Infrastructure Tests with Testinfra framework

packages to test for:
	avahi-daemon
	network-manager
	virtualbox
	python2.7
	sendmail
	nginx
'''

def test_avahidaemon_is_installed(Package):
	avahi = Package("avahi-daemon")
	assert avahi.is_installed

def test_avahidaemon_running_and_enabled(Service):
	avahi = Service("avahi-daemon")
	assert avahi.is_running
	assert avahi.is_enabled

def test_networkManager_is_installed(Package):
	networkManager = Package("network-manager")
	assert networkManager.is_installed

def test_networkManager_is_running_and_enabled(Service):
	networkManager = Service("network-manager")
	assert networkManager.is_running
	assert networkManager.is_enabled

def test_virtualbox_is_installed(Package):
	virtualbox = Package("virtualbox")
	assert virtualbox.is_installed

def test_virtualbox_is_running_and_enabled(Service):
	virtualbox = Service("virtualbox")
	assert virtualbox.is_running
	assert virtualbox.is_enabled

def test_python27_is_installed(Package):
	python27 = Package("python")
	assert python27.is_installed
	assert python27.version.startswith("2.7")

def test_sendmail_is_installed(Package):
	sendmail = Package("sendmail")
	assert sendmail.is_installed

def test_sendmail_is_running_and_enabled(Service):
	sendmail = Service("sendmail")
	assert sendmail.is_running
	assert sendmail.is_enabled

def test_nginx_is_installed(Package):
    nginx = Package("nginx")
    assert nginx.is_installed

def test_nginx_running_and_enabled(Service):
    nginx = Service("nginx")
    assert nginx.is_running
    assert nginx.is_enabled

