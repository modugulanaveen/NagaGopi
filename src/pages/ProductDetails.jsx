import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../api/api';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;

    getProductById(id)
      .then((p) => {
        if (mounted) setProduct(p);
      })
      .catch(console.error);

    return () => {
      mounted = false;
    };
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} loading="lazy" />
      <div className="details">
        <h2>{product.title}</h2>
        <p className="price">₹{product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <p>Category: {product.category}</p>
        <button onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
}
