import React from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import HomePage from './HomePage/HomePage';
import ProductsPage from './ProductPage/ProductPage';
import OrderConfirmation from './OrderConfirmation/OrderConfirmation';
import ComingSoon from './ComingSoon/ComingSoon';
import Cart from './Cart/Cart';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderConfirm" element={<OrderConfirmation />} />
          <Route path="/comingSoon" element={<ComingSoon />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
