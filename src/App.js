import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import { fetchUserAttributes, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkout } from './Checkout/Checkout';
import { Payment } from './Payment/Payment';
import ProductList from './ProductList/ProductList';
import Categories from './Categories/Categories';
import Orders from './Orders/Orders';

const GUEST_USER = {
  "userId": "default",
  "email": "guest@mcart.com",
  "name": "Guest User"
 }


Amplify.configure(awsExports);

const App = () => {

  const dispatch = useDispatch();

  const [currUser, setCurrUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

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
          "name": idToken.payload['name']
        }
        dispatch(userUpdate(currUser));
        setCurrUser(currUser);
        setIsAuthenticated(true);
      }
      else{
        setIsAuthenticated(false);
        dispatch(userUpdate(GUEST_USER));
        setCurrUser(GUEST_USER);
      }
    } 
    catch (err) {
      console.log(err);
      setIsAuthenticated(false);
    }
  }

  return (
    <Authenticator socialProviders={['google']} initialState='signIn' 
    components={{
      SignUp: {
        FormFields() {
          return (
            <>
              <Authenticator.SignUp.FormFields />
              <div><label>Name</label></div>
              <input
                type="text"
                name="name"
                placeholder="Please enter your name"
              />
            </>
          );
        },
      },
    }}
    services={{
      async validateCustomSignUp(formData) {
        if (!formData.name) {
          return {
            name: 'Name is required',
          };
        }
      },
    }}
    >
      {
        ({ signOut, _}) => (
          <Router>
          <div className="App">
             <Header signOut={signOut} user={currUser}/>
            {/* <Header signOut={()=>{}} user={currUser}/> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:value/:key" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/paymentPage" element={<Payment/>} />
              <Route path="/orderConfirm" element={<OrderConfirmation />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/category" element={<Categories />} />
              <Route path="/comingSoon" element={<ComingSoon />} />
              <Route path="*" element={<Navigate to="/comingSoon" />} />
            </Routes>
            <Footer />
          </div>
        </Router>
        )
      }  
    </Authenticator>
  );
}

export default App;
