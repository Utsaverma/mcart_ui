import { useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { AuthData } from "../App";

const GUEST_USER = {
    "userId": "default",
    "email": "guest@mcart.com",
    "name": "Guest User",
    "isAuthenticated": false
   }

const LoginHandler = () => {

    const {updateUser} = AuthData();

    useEffect(() => {
        fetchCurrUserAttributes();
    }, []);

    const fetchCurrUserAttributes = async () => {
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

    return (
        <div className="LoginHandler-page minHeight">
            user signed in successfully
        </div>
    )
}

export default LoginHandler;