'''
packages to test for:
    sendmail
    nginx
    openssh
    cloud-init
    rpcbind
    messagebus
'''

def test_sendmail_is_installed(Package):
    sendmail = Package("sendmail")
    assert sendmail.is_installed
    
def test_nginx_is_installed(Package): 
    nginx = Package("nginx")
    assert nginx.is_installed
    
def test_nginx_running_and_enabled(Service):
    nginx = Service("nginx") 
    assert nginx.is_running

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