import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { awsExports } from './auth/aws-export';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { update as userUpdate } from './reducers/userSlice';
import { useDispatch } from 'react-redux';
import { RenderRoutes } from './helper/RenderNavigations';
import { GUEST_USER, fetchCurrUserAttributes } from './helper/utility';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


Amplify.configure(awsExports);
const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

const App = () => {

  const dispatch = useDispatch();

  const [currUser, setCurrUser] = useState(GUEST_USER);

  const updateUser = (user) => {
    setCurrUser(user);
    dispatch(userUpdate(user));
  }

  useEffect(() => {
    fetchCurrUserAttributes(updateUser);
  }, []);

  async function handleSignOut() {
    try {
      await signOut();
      updateUser(GUEST_USER);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <AuthContext.Provider value={{ currUser, updateUser, handleSignOut }}>
      <Router>
        <div className="App">
          <Header />
          <RenderRoutes />
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
