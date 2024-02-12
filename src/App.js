import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, signOut } from 'aws-amplify/auth';
import { awsExports } from './auth/aws-export'; 
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { update as userUpdate } from './reducers/userSlice';
import { useDispatch } from 'react-redux';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RenderRoutes } from './helper/RenderNavigations';

const GUEST_USER = {
  "userId": "default",
  "email": "guest@mcart.com",
  "name": "Guest User",
  "isAuthenticated": false
 }


Amplify.configure(awsExports);
const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

const App = () => {

  const dispatch = useDispatch();

  const [currUser, setCurrUser] = useState(GUEST_USER);  

  useEffect(() => {
      fetchCurrUserAttributes();
  }, []);

  const fetchCurrUserAttributes = async () => {
    try {
      const { _, idToken } = (await fetchAuthSession()).tokens ?? {};
      if(idToken && idToken.payload){
        const currUser = {
          "userId": idToken.payload['identities'][0]['userId'],
          "email": idToken.payload['email'],
          "name": idToken.payload['name'],
          "isAuthenticated": true,
        }
        dispatch(userUpdate(currUser));
        setCurrUser(currUser);
      }
      else{
        dispatch(userUpdate(GUEST_USER));
        setCurrUser(GUEST_USER);
      }
    } 
    catch (err) {
      console.log(err);
      setCurrUser(GUEST_USER);
      dispatch(userUpdate(GUEST_USER));
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setCurrUser(GUEST_USER);
      dispatch(userUpdate(GUEST_USER));
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }


  return (
    <AuthContext.Provider value={{currUser, handleSignOut}}>
      <Router>
        <div className="App">
          <Header/>
          <RenderRoutes/>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
