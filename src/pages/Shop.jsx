
import { useState, useMemo } from 'react'
import { productsData } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'

const categories = ['ALL','SNEAKER','HIGH-TOP','CHUNKY','BOOT','KNIT','CANVAS','RUNNING','FORMAL','SLIP-ON','TRAIL','BUNDLE']

export default function Shop({onAdd}){
  const [cat,setCat]=useState('ALL')
  const [sort,setSort]=useState('featured')
  const filtered = useMemo(()=>{
    let list = cat==='ALL' ? productsData : productsData.filter(p=>p.category===cat)
    if(sort==='price-low') list=[...list].sort((a,b)=>a.price-b.price)
    if(sort==='price-high') list=[...list].sort((a,b)=>b.price-a.price)
    return list
  },[cat,sort])

  return (
    <main>
      <section style={{padding:'64px 4% 40px', display:'grid', gridTemplateColumns:'1.2fr .8fr', gap:'40px', borderBottom:'1px solid #E8E2D8'}}>
        <div><div style={{fontSize:'10px', letterSpacing:'.14em', opacity:.5}}>STRIDE — SHOP</div><h1 style={{fontFamily:'Fraunces', fontSize:'clamp(42px,6vw,72px)', lineHeight:'.9', marginTop:'16px'}}>One<br/>silhouette.<br/><i style={{color:'#A36A3C', fontWeight:'400'}}>Twelve</i><br/>materials.</h1></div>
        <div><p style={{marginTop:'40px', maxWidth:'380px', lineHeight:'1.7', opacity:.7}}>Each material tells a different story — suede for winter, linen for humid Lahore, knit for breathability. Same last, different ritual.</p></div>
      </section>

      <div className="stride-filters">
        <div className="filter-group">{categories.map(c=> <button key={c} className={`filter-btn ${cat===c?'active':''}`} onClick={()=>setCat(c)}>{c}</button>)}</div>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="filter-btn" style={{minWidth:'160px'}}>
          <option value="featured">FEATURED</option>
          <option value="price-low">PRICE: LOW TO HIGH</option>
          <option value="price-high">PRICE: HIGH TO LOW</option>
        </select>
      </div>

      <section className="stride-grid">
        {filtered.map(p=> <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
      </section>
    </main>
  )
}
