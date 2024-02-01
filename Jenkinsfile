pipeline {
    agent any
    tools {
        nodejs "node"
        }

  environment {
        CI = false
        NODE_VERSION = '14.17.5'
        AWS_DEFAULT_REGION = 'ap-south-1'
        DISTRIBUTION_ID = 'E3PUAOKDY25P8H'
        // AWS_ACCESS_KEY_ID     = credentials('MCART_CREDS').AWS_ACCESS_KEY_ID
        // AWS_SECRET_ACCESS_KEY = credentials('MCART_CREDS').AWS_SECRET_ACCESS_KEY
    }

  stages {
    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('NPM Install') {
        steps {
            bat 'npm install'
        }
    }

    stage('Build') {
      steps {
        script {
          bat 'npm run build'
        }
      }
    }

    stage('CloudFront Deploy') {
      steps {
        script {
          withAWS(region: AWS_DEFAULT_REGION, credentials: 'MCART_CREDS') {
                awsS3Sync(from: 'build/', to: 's3://mcart-ui-deploy')
            }
        }
      }
    }

    stage('CloudFront Invalidation') {
      steps {
        script {
          bat 'npm run client-cloudfront-invalidation'
        }
      }
    }

  }
}
