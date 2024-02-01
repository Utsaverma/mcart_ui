pipeline {
    agent {
        docker {
            image 'node:20.11.0-alpine3.19' 
            args '-p 3000:3000' 
        }
    }

  environment {
        // CI = 'true'
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
