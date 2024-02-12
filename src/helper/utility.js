import { fetchAuthSession } from "aws-amplify/auth";

export const GUEST_USER = {
    "userId": "default",
    "email": "guest@mcart.com",
    "name": "Guest User",
    "isAuthenticated": false
   }

export const fetchCurrUserAttributes = async (updateUser) => {
    try {
      const { _, idToken } = (await fetchAuthSession()).tokens ?? {};
      if(idToken && idToken.payload){
        const currUser = {
          "userId": idToken.payload['sub'] ? idToken.payload['sub'] : idToken.payload['identities'][0]['userId'],
          "email": idToken.payload['email'],
          "name": idToken.payload['name'],
          "isAuthenticated": true,
        }
        updateUser(currUser);
      }
      else{
        updateUser(GUEST_USER);
      }
    } 
    catch (err) {
      console.log(err);
      updateUser(GUEST_USER);
    }
  }