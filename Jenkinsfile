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
                s3Upload(file: 'build/', bucket:'mcart-ui-deploy', path:'')
            }
        }
      }
    }

    stage('CloudFront Invalidation') {
      steps {
        script {
            withAWS(region: AWS_DEFAULT_REGION, credentials: 'MCART_CREDS') {
                cfInvalidate(distribution: DISTRIBUTION_ID, paths:['/*'], waitForCompletion: true)
            }
        }
      }
    }

  }
}
