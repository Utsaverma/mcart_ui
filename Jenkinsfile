pipeline {
    agent any
    tools {
        nodejs "node"
        }

  environment {
        NODE_VERSION = '14.17.5'
        AWS_DEFAULT_REGION = 'ap-south-1'
        DISTRIBUTION_ID = 'E3PUAOKDY25P8H'
    }

  stages {
    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Build') {
      steps {
        script {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }
  }
}
