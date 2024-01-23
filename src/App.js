import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { awsExports } from './auth/aws-export'; 
import { Authenticator } from '@aws-amplify/ui-react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomePage from './HomePage/HomePage';
import ProductPage from './ProductPage/ProductPage';
import OrderConfirmation from './OrderConfirmation/OrderConfirmation';
import ComingSoon from './ComingSoon/ComingSoon';
import Cart from './Cart/Cart';
import { update as userUpdate } from './reducers/userSlice';
import { useDispatch } from 'react-redux';
import './App.css';
import '@aws-amplify/ui-react/styles.css';


Amplify.configure(awsExports)

const App = () => {

  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    fetchCurrUserAttributes();
  }, []);

  const fetchCurrUserAttributes = async () => {
    try {
      const {sub: userId, _, name, email} = await fetchUserAttributes();
      setCurrUser({ userId, email, name});
    } 
    catch (err) {
      setCurrUser({})
    }
  }

  return (
    // <Authenticator initialState='signIn'
    // components={{
    //   SignUp: {
    //     FormFields() {
    //       return (
    //         <>
    //           <Authenticator.SignUp.FormFields />
    //           {/* Custom fields for name */}
    //           <div><label>Name</label></div>
    //           <input
    //             type="text"
    //             name="name"
    //             placeholder="Please enter your name"
    //           />
    //         </>
    //       );
    //     },
    //   },
    // }}
    // services={{
    //   async validateCustomSignUp(formData) {
    //     if (!formData.name) {
    //       return {
    //         name: 'Name is required',
    //       };
    //     }
    //   },
    // }}
    // >
    //   {
    //     ({ signOut, _}) => (
          <Router>
          <div className="App">
            {/* <Header signOut={signOut} user={currUser}/> */}
            <Header signOut={()=>{}} user={currUser}/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orderConfirm" element={<OrderConfirmation />} />
              <Route path="/comingSoon" element={<ComingSoon />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {/* <Footer /> */}
          </div>
        </Router>
    //     )
    //   }  
    // </Authenticator>
  );
}

export default App;
