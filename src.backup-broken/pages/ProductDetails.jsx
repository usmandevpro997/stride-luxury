import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './ProductDetails.css'

export default function ProductDetails({ products = [], onAddToBag }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  const product = useMemo(() => products.find(p => p.id === id), [products, id])

  const related = useMemo(() => {
    if (!product) return []
    const sameCat = products.filter(p => p.category === product.category && p.id !== product.id)
    const pool = sameCat.length >= 4 ? sameCat : [...sameCat, ...products.filter(p => p.id !== product.id && p.category !== product.category)]
    return pool.slice(0, 4)
  }, [products, product])

  const inc = () => setQty(q => q + 1)
  const dec = () => setQty(q => Math.max(1, q - 1))

  const handleAdd = () => {
    if (!product) return
    onAddToBag(product, qty)
  }

  if (!product) {
    return (
      <main className="aurel-pdp aurel-pdp--notfound">
        <div className="aurel-pdp-notfound-inner">
          <span className="aurel-eyebrow">AUREL — PRODUCT NOT FOUND</span>
          <h1>We couldn't find<br/><em>that ritual.</em></h1>
          <p>The product ID <code>{id}</code> does not exist.</p>
          <div className="aurel-pdp-actions">
            <Link to="/shop" className="aurel-btn-primary">BACK TO SHOP ↗</Link>
            <button type="button" className="aurel-btn-ghost" onClick={() => navigate('/')}>GO HOME</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="aurel-pdp">
      <div className="aurel-pdp-breadcrumb">
        <Link to="/">HOME</Link><span>/</span><Link to="/shop">SHOP</Link><span>/</span><span>{product.category}</span><span>/</span><span className="is-current">{product.name}</span>
      </div>
      <section className="aurel-pdp-main">
        <div className="aurel-pdp-media">
          <div className={`aurel-pdp-img tone-${product.tone || 'sand'}`}>
            <img src={product.image} alt={product.name} />
            <span className="aurel-pdp-cat">{product.category}</span>
          </div>
        </div>
        <div className="aurel-pdp-info">
          <span className="aurel-eyebrow">AUREL — {product.category}</span>
          <h1>{product.name}<span>.</span></h1>
          <div className="aurel-pdp-price-row">
            <span className="aurel-pdp-price">${product.price}</span>
            <span className="aurel-pdp-stock">IN STOCK — DEMO ONLY</span>
          </div>
          <p className="aurel-pdp-desc">{product.description}</p>
          <div className="aurel-pdp-long">
            <p>{product.longDescription}</p>
          </div>
          <div className="aurel-pdp-qty-row">
            <span className="aurel-shop-label">QUANTITY:</span>
            <div className="aurel-qty">
              <button type="button" onClick={dec}>−</button>
              <span>{qty}</span>
              <button type="button" onClick={inc}>+</button>
            </div>
          </div>
          <button type="button" className="aurel-pdp-add" onClick={handleAdd}>
            ADD {qty} TO BAG — ${(product.price * qty).toFixed(0)} ↗
          </button>
        </div>
      </section>
      <section className="aurel-pdp-related">
        <div className="aurel-section-head">
          <div>
            <span className="aurel-eyebrow">YOU MAY ALSO LIKE — {product.category}</span>
            <h2>Related rituals<span>.</span></h2>
          </div>
          <Link to="/shop" className="aurel-text-link">View full collection →</Link>
        </div>
        <div className="aurel-related-grid">
          {related.map(p => (
            <article key={p.id} className="aurel-related-card" onClick={() => navigate(`/product/${p.id}`)}>
              <div className={`aurel-related-media tone-${p.tone || 'sand'}`}>
                <img src={p.image} alt={p.name} loading="lazy" />
                <span>{p.category}</span>
              </div>
              <div className="aurel-related-info">
                <h3>{p.name}</h3>
                <span>${p.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}