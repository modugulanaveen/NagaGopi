import React from 'react';

export default function Pagination({ current, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination">
      <button disabled={current === 1} onClick={() => onChange(current - 1)}>Prev</button>
      {pages.map(p => (
        <button key={p} className={p === current ? 'active' : ''} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button disabled={current === totalPages} onClick={() => onChange(current + 1)}>Next</button>
    </div>
  );
}
