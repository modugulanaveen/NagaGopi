import React, { useEffect, useMemo, useState } from 'react';
// import { getProducts, getCategories } from '../api';

import ProductCard from './productCard';
import Filters from './Filters';
import Pagination from './pagination';
import useDebounce from '../hooks/useDebounce';
import { getCategories, getProducts } from '../api/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    sort: '',
    search: ''
  });

  const [page, setPage] = useState(1);
  const perPage = 8;
  const debouncedSearch = useDebounce(filters.search, 400);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([getProducts(), getCategories()])
      .then(([prods, cats]) => {
        if (!mounted) return;
        setProducts(prods);
        setCategories(cats);
        const prices = prods.map(p => p.price);
        setFilters(f => ({ ...f, minPrice: Math.floor(Math.min(...prices)), maxPrice: Math.ceil(Math.max(...prices)) }));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
    return () => mounted = false;
  }, []);

  const filtered = useMemo(() => {
    let res = products;
    if (filters.category) res = res.filter(p => p.category === filters.category);
    res = res.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (filters.rating) res = res.filter(p => (p.rating?.rate ?? 0) >= filters.rating);
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      res = res.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filters.sort === 'asc') res = res.slice().sort((a, b) => a.price - b.price);
    if (filters.sort === 'desc') res = res.slice().sort((a, b) => b.price - a.price);
    return res;
  }, [products, filters, debouncedSearch]);

  useEffect(() => { setPage(1); }, [filters.category, filters.minPrice, filters.maxPrice, debouncedSearch, filters.sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * perPage, current * perPage);

  if (loading) return <div className="loading">Loading products...</div>;

  const minMaxPrice = { min: Math.min(...products.map(p => p.price)), max: Math.max(...products.map(p => p.price)) };

  return (
    <div className="layout">
      <Filters categories={categories} filters={filters} setFilters={setFilters} minMaxPrice={minMaxPrice} />
      <main className="main">
        <div className="controls">
             <input
            className="search-bar"
            placeholder="Search products..."
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}/>       
        </div>

        <div className="product-grid">
          {pageItems.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <Pagination current={current} totalPages={totalPages} onChange={setPage} />
      </main>
    </div>
  );
}
