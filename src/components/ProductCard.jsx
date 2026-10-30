
export default function ProductCard({product, onAdd}){
  const [size,setSize]=useState(product.sizes?.[0]||40)
  return (
    <div className="stride-card">
      <div className="stride-card-img" style={{background:'#F5F1E9', padding:'18px', display:'grid', placeItems:'center'}}>
        <img src={product.image} alt={product.name} style={{width:'100%', height:'100%', objectFit:'contain', objectPosition:'center', background:'#F5F1E9'}} />
        <span className="stride-badge">{product.category}</span>
      </div>
      <div className="stride-card-body">
        <div className="stride-card-head">
          <div className="stride-name">{product.name}</div>
          <div className="stride-price">${product.price}</div>
        </div>
        <div className="stride-desc">{product.desc} — {product.material}</div>
        <div className="stride-sizes">
          {product.sizes?.map(s=>(
            <button key={s} onClick={()=> setSize(s)} className={`size-pill ${size===s?'active':''}`} style={size===s?{background:'#0A0A0A', color:'#fff', borderColor:'#0A0A0A'}:{}}>{s}</button>
          ))}
        </div>
        <button className="stride-add" onClick={()=> onAdd({...product, selectedSize:size, qty:1})}>ADD TO BAG — ${product.price} ↗</button>
      </div>
    </div>
  )
}

import { useState } from 'react'
