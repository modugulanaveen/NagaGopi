import React from 'react';
import "./Filters.css";

export default function Filters({ categories, filters, setFilters, minMaxPrice }) {
  const { category, minPrice, maxPrice, rating, sort } = filters;
  return (
    <aside className="filters">
      <div>
        <label>Category</label>
        <select value={category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
          <option value="">All</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label>Price</label>
        <div className="price-range">
          <input type="number" value={minPrice} min={Math.floor(minMaxPrice.min)} max={Math.ceil(minMaxPrice.max)}
                 onChange={e => setFilters(f => ({ ...f, minPrice: Number(e.target.value) }))} />
          <span> - </span>
          <input type="number" value={maxPrice} min={Math.floor(minMaxPrice.min)} max={Math.ceil(minMaxPrice.max)}
                 onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))} />
        </div>
      </div>

      <div>
        <label>Rating</label>
        <select value={rating} onChange={e => setFilters(f => ({ ...f, rating: Number(e.target.value) }))}>
          <option value={0}>All</option>
          <option value={4}>4 & up</option>
          <option value={3}>3 & up</option>
          <option value={2}>2 & up</option>
        </select>
      </div>

      <div>
        <label>Sort</label>
        <select value={sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}>
          <option value="">Default</option>
          <option value="asc">Price: low → high</option>
          <option value="desc">Price: high → low</option>
        </select>
      </div>
    </aside>
  );
}
