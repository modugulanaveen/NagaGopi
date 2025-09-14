import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/productList.jsx';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage.jsx';
import { useCart } from './context/CartContext';
import "./App.css";

function Header() {
  const { count } = useCart();
  return (
    <header className="site-header">
      <Link to="/" className="brand">
       <button className="store-btn">My Store</button>
      </Link> 
      <nav>
        <Link to="/cart">
        <button className="cart-icon" backgroundcolor="red">
        🛒 Cart ({count})</button>
        </Link>

      </nav>
    </header>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}



