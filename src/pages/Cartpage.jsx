import React from 'react';
import { useCart } from '../context/CartContext';
import "./CartPage.css";
export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart, total } = useCart();

  if (!cart.length) return <div className="cart-empty">Your cart is empty</div>;

  return (
    <div className="cart-page">
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="ci-info">
              <h4>{item.title}</h4>
              <p>₹{item.price.toFixed(2)}</p>
              <div className="qty">
                <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <aside className="summary">
        <h3>Total: ₹{total.toFixed(2)}</h3>
        <button onClick={() => alert('Checkout demo')}>Checkout</button>
        <button onClick={clearCart}>Clear cart</button>
      </aside>
    </div>
  );
}
