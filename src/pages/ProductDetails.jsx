
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { productsData } from '../data/products.js'

export default function ProductDetails({onAdd}){
  const {id}=useParams()
  const nav=useNavigate()
  const product=useMemo(()=>productsData.find(p=>p.id===id),[id])
  const [size,setSize]=useState(null)
  const [qty,setQty]=useState(1)

  if(!product) return <main style={{padding:'80px 4%'}}><h1>Product not found</h1><Link to="/shop">Back to shop</Link></main>

  const related=productsData.filter(p=>p.id!==product.id).slice(0,3)

  return (
    <main style={{background:'#F8F5F0'}}>
      <div style={{padding:'20px 4%', fontSize:'10px', letterSpacing:'.12em', display:'flex', gap:'8px'}}><Link to="/">HOME</Link><span>/</span><Link to="/shop">SHOP</Link><span>/</span><span>{product.name}</span></div>
      <section style={{display:'grid', gridTemplateColumns:'1.1fr .9fr', gap:'0', minHeight:'80vh'}}>
        <div style={{background:'#EDE8DF'}}><img src={product.image} alt={product.name} style={{width:'100%', height:'100%', objectFit:'cover'}} /></div>
        <div style={{padding:'48px 6%'}}>
          <div style={{fontSize:'10px', letterSpacing:'.14em', opacity:.5}}>{product.category} — {product.material}</div>
          <h1 style={{fontFamily:'Fraunces', fontSize:'clamp(36px,4.5vw,56px)', lineHeight:'.9', marginTop:'16px'}}>{product.name}</h1>
          <div style={{marginTop:'16px', display:'flex', alignItems:'center', gap:'16px'}}><span style={{fontSize:'24px'}}>${product.price}</span><span style={{fontSize:'10px', letterSpacing:'.12em', border:'1px solid #E8E2D8', padding:'6px 10px'}}>IN STOCK</span></div>
          <p style={{marginTop:'24px', lineHeight:'1.7', opacity:.7, maxWidth:'44ch'}}>{product.longDesc}</p>

          <div style={{marginTop:'32px'}}>
            <div style={{fontSize:'10px', letterSpacing:'.12em', marginBottom:'12px'}}>SELECT SIZE (EU):</div>
            <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
              {product.sizes.map(s=> <button key={s} onClick={()=>setSize(s)} style={{width:'56px', height:'48px', border: size===s?'2px solid #111':'1px solid #E8E2D8', background: size===s?'#111':'#fff', color: size===s?'#fff':'#111', cursor:'pointer'}}>{s}</button>)}
            </div>
            {!size && <div style={{marginTop:'10px', fontSize:'11px', color:'#A36A3C'}}>Please select a size</div>}
          </div>

          <div style={{marginTop:'24px', display:'flex', alignItems:'center', gap:'16px'}}>
            <div style={{fontSize:'10px', letterSpacing:'.12em'}}>QTY:</div>
            <div style={{display:'flex', border:'1px solid #E8E2D8', background:'#fff'}}>
              <button onClick={()=> setQty(q=>Math.max(1,q-1))} style={{width:'48px', height:'48px', border:'none', background:'transparent', cursor:'pointer'}}>−</button>
              <span style={{width:'40px', display:'grid', placeItems:'center'}}>{qty}</span>
              <button onClick={()=> setQty(q=>q+1)} style={{width:'48px', height:'48px', border:'none', background:'transparent', cursor:'pointer'}}>+</button>
            </div>
          </div>

          <button disabled={!size} onClick={()=> onAdd({...product, selectedSize:size, qty})} style={{marginTop:'28px', width:'100%', padding:'18px', background: size?'#111':'#CCC', color:'#fff', border:'none', fontSize:'11px', letterSpacing:'.14em', cursor: size?'pointer':'not-allowed'}}>
            {size ? `ADD ${qty} TO BAG — SIZE ${size} — $${(product.price*qty).toFixed(0)} ↗` : 'SELECT SIZE TO ADD'}
          </button>

          <div style={{marginTop:'28px', paddingTop:'24px', borderTop:'1px solid #E8E2D8', fontSize:'11px', lineHeight:'2', opacity:.6}}>
            <div><strong>MATERIAL:</strong> {product.material}</div>
            <div><strong>ORIGIN:</strong> Designed in Lahore — Concept</div>
            <div><strong>SHIPPING:</strong> Free over $150 — 30-day returns</div>
          </div>
        </div>
      </section>

      <section style={{padding:'64px 4%'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'24px'}}><h2 style={{fontFamily:'Fraunces', fontSize:'28px'}}>You may also like</h2><Link to="/shop" style={{fontSize:'11px', letterSpacing:'.12em', borderBottom:'1px solid #111'}}>VIEW ALL →</Link></div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'#E8E2D8'}}>
          {related.map(p=> (
            <div key={p.id} style={{background:'#fff', padding:'0', cursor:'pointer'}} onClick={()=> nav(`/product/${p.id}`)}>
              <img src={p.image} alt={p.name} style={{width:'100%', height:'280px', objectFit:'cover'}} />
              <div style={{padding:'16px', display:'flex', justifyContent:'space-between'}}><span style={{fontFamily:'Fraunces'}}>{p.name}</span><span>${p.price}</span></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
