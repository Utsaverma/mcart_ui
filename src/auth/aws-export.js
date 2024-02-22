export const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: 'ap-south-1_Q38upWDVF',
      userPoolClientId: '2gpj9q4tv5anvqq8sic3uoi22h',
      signUpVerificationMethod: 'code',
      loginWith: {
        oauth: {
          domain: 'mcart-auth.auth.ap-south-1.amazoncognito.com',
          scopes: [
            'phone',
            'email',
            'openid',
            'profile'
          ],
          redirectSignIn: ['https://d1az88rylhhzb4.cloudfront.net/', 'http://localhost:3000/'],
          redirectSignOut: ['https://d1az88rylhhzb4.cloudfront.net/', 'http://localhost:3000/'],
          responseType: 'code'
        }
      }
    }
  }
}
