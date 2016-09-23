# Boston Housing Authority CS4500 project
This repository is managed by students from Northeastern University's CS4500 class. It was developed over a semester and created for the Boston Housing Authority to manage their translation volunteers.


Hello there, this is a WIP guide for all the things you need to know about to work successfully (and hopefully easily) on this project. I'll try and keep it updated as changes/improvements are made and add more details over time.
Some external resources:

git cheat sheet: http://zeroturnaround.com/rebellabs/git-commands-and-best-practices-cheat-sheet/

angularJS starter guide: https://codingislove.com/angularjs-for-complete-beginners/
 

# Getting started:

1. Clone repo to your local machine (protip: `git clone https://github.com/raptiq/BHA.git`)
2. Download/install vagrant
3. mod your host file with the following two lines: (on OSX or Linux run `sudo nano /etc/hosts`)
192.168.33.10 api.local.bha.com
4. cd into BHA directory
5. Run `vagrant up`
6. Wait awhile (if this is the first time you've run vagrant up it has to update a TON of stuff including the OS and install all the new stuff and then wire it all together)
7. Go to api.local.bha.com to confirm you can see stuff

Thats it! The repository folder is cloned onto the vagrant VM so you can edit the files locally and they're automatically synced on the VM

### To do things in your vm:
1. Run `vagrant ssh` if you want to ssh into the vm directly (shouldn't be much need for this)
2. Run `workon bha` to enter our virtualenv

### If you're a frontend dev there's some additional setup:

1. Download/Install Node.js/NPM https://nodejs.org/en/
2. `cd BHA/js`
3. `npm install`
4. `npm install -g gulp webpack karma karma-cli`
5. `sudo gulp`
6. mod your host file with the following two lines: (on OSX or Linux run `sudo nano /etc/hosts`)
127.0.0.1 local.bha.com
7. Navigate to local.bha.com and have at it

 
### To resolve Bad Gateway errors after major backend updates:

run the following inside of vagrant
`/vagrant/scripts/refresh_app.sh`

### If you are having problems with the api (e.g. api.local.bha.com/admin says "Internal Service Error"):
run `vagrant halt && vagrant up`

`ssh vagrant`

`cd /vagrant`

`workon bha`

`pip3 install -r "requirements.txt"`

`python manage.py installtasks`

`python manage.py migrate`

`/vagrant/scripts/refresh_app.sh`

If none of that works, ¯\_(ツ)_/¯
