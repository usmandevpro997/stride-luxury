import ProductCard from '../components/ProductCard'

export default function ProductGrid({ products = [], onAddToBag }) {
  return (
    <div className="aurel-product-grid">
      {products.map((product, i) => (
        <div key={product.id} style={{ '--delay': `${i * 80}ms` }}>
          <ProductCard product={product} onAdd={onAddToBag} />
        </div>
      ))}
    </div>
  )
}
