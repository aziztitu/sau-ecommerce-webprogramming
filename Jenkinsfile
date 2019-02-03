pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
      DEPLOY_PATH = "/home/bitnami/apps/azee/sau/classes/webProgramming/groceryStore"
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh """
                npm install
                npm run build
                """
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh """
                set +x
                tar cvf dist.tar.gz dist
                scp -i $lightsailDeployerPrivateKey -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null dist.tar.gz deployer@sau.grocery.aziztitu.com:$DEPLOY_PATH<<EOT
                $lightsailDeployerPrivateKeyPassword
                ssh -i $lightsailDeployerPrivateKey -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null deployer@sau.grocery.aziztitu.com<<EOT
                $lightsailDeployerPrivateKeyPassword
                cd $DEPLOY_PATH
                rm -rf dist/
                tar xvf dist.tar.gz
                rm dist.tar.gz
                exit
                EOT
                """
            }
        }
    }
}

