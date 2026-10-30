
export default function ProductCard({ product, onAddToBag }) {
  const onErr = (e) => { e.target.src = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80' }
  return (
    <article className="ah-product">
      <div className={`ah-product-media tone-${product.tone}`}>
        <img src={product.image} alt={product.name} loading="lazy" onError={onErr} />
        <span className="ah-product-cat">{product.category}</span>
        <button className="ah-quick-add" onClick={() => onAddToBag(product)}>ADD TO BAG — ${product.price}</button>
      </div>
      <div className="ah-product-meta">
        <div><h3>{product.name}</h3><p>{product.description}</p></div>
        <span className="ah-price">${product.price}</span>
      </div>
    </article>
  )
}
