import {CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: "ap-south-1_Q38upWDVF",
    ClientId: "2gpj9q4tv5anvqq8sic3uoi22h"
}

export default new CognitoUserPool(poolData);