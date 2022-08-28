#!/bin/bash -ex
# download nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# source nvm
. /.nvm/nvm.sh
#export NVM dir
export NVM_DIR="/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
# install node
nvm install 16
#upgrade yum
sudo yum upgrade -y
#install git
sudo yum install git -y
cd /home/ec2-user
# get source code from githubt
git clone https://github.com/max-zhaoyi/MSCA
#get in project dir
cd MSCA
#give permission
sudo chmod -R 777 .
#install node module
npm install
# start the app
npm start > app.out.log 2> app.err.log < /dev/null &