const BASE = 'https://fakestoreapi.com';

export async function getProducts() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// export async function getProductById(id) {
//   const res = await fetch(`${BASE}/products/${id}`);
//   if (!res.ok) throw new Error('Failed to fetch product');
//   return res.json();
// }

export async function getCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
// src/api/Api.js
export async function getProductById(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
}
