// // src/components/CartIcon.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import "./CartIcon.css";

// export default function CartIcon() {
//   const { count } = useCart();

//   return (
//     <Link to="/cart" className="cart-icon">
//       <span className="cart-symbol">🛒</span>
//       {count > 0 && <span className="cart-badge">{count}</span>}
//     </Link>
//   );
// }


// src/components/CartIcon.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import "./CartIcon.css";

export default function CartIcon({ product }) {
  const { count, addToCart } = useCart();

  return (
    <div
      className="cart-icon"
      onClick={() => {
        if (product) addToCart(product);
      }}
    >
      <span className="cart-symbol">🛒</span>
      {count > 0 && <span className="cart-badge">{count}</span>}
    </div>
  );
}
