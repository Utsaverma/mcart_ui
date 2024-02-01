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

    stage('CloudFrontDeploy') {
      steps {
        script {
            bat 'npm run client-s3-deploy'
        //   withAWS(region: AWS_DEFAULT_REGION, credentials: AWS_MCART) {
        //         awsS3Sync(from: 'build/', to: 's3://mcart-ui-deploy')
        //     }
        }
      }
    }

    stage('CloudFrontInvalidation') {
      steps {
        script {
          bat 'npm run client-cloudfront-invalidation'
        }
      }
    }

  }
}
