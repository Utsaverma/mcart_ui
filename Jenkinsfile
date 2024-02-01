pipeline {
  agent any

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

    // stage('CloudFronDeploy') {
    //   steps {
    //     script {
    //       withAWS(region: AWS_DEFAULT_REGION, credentials: AWS_MCART) {
    //             awsS3Sync(from: 'build/', to: 's3://mcart-ui-deploy')
    //         }
    //     }
    //   }
    // }

    // stage('CloudFront Invalidation') {
    //   steps {
    //     script {
    //       sh 'aws cloudfront create-invalidation --distribution-id E3PUAOKDY25P8H --paths "/*"'
    //     }
    //   }
    // }
  }
}
