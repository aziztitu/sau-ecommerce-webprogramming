DEPLOY_PATH="/home/bitnami/apps/azee/sau/classes/webProgramming/groceryStore"

lightsailDeployerPrivateKey=deployer/id_rsa

tar cvf dist.tar.gz dist

scp -i $lightsailDeployerPrivateKey dist.tar.gz deployer@sau.grocery.aziztitu.com:$DEPLOY_PATH
ssh -i $lightsailDeployerPrivateKey deployer@sau.grocery.aziztitu.com << EOT
cd $DEPLOY_PATH
rm -rf dist/
tar xvf dist.tar.gz
rm dist.tar.gz
exit
EOT

rm dist.tar.gz