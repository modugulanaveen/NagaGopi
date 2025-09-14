import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <article className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <h4 className="truncate">{product.title}</h4>
      <p className="price">₹{product.price.toFixed(2)}</p>
      <p className="rating">⭐ {product.rating?.rate ?? '—'} ({product.rating?.count ?? 0})</p>
      <button className="btn" onClick={() => addToCart(product)}>Add to cart</button>
    </article>
  );
}
