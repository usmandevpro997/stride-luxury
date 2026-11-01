
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productsData } from '../data/products.js'

export default function Home({ products = [] }){
  // Use prop if available, else fallback to imported data
  const allProducts = products.length > 0 ? products : productsData
  const heroShoes = allProducts.slice(0,5)
  const [current, setCurrent] = useState(0)
  
  useEffect(()=>{
    if(heroShoes.length===0) return
    const id = setInterval(()=> setCurrent(c=> (c+1)%heroShoes.length), 3000)
    return ()=> clearInterval(id)
  },[heroShoes.length])

  const shoe = heroShoes[current] || allProducts[0]

  if(!shoe){
    return <div style={{padding:'60px', textAlign:'center'}}>Loading STRIDE... {allProducts.length} products</div>
  }

  return (
    <div style={{background:'#FAF8F5', minHeight:'100vh'}}>
      <style>{`
        .hero-wrap{display:grid; grid-template-columns:1.1fr .9fr; min-height:calc(100vh - 114px); align-items:center; padding:0 3.5%; gap:24px; background:#FAF8F5}
        .hero-copy h1{font-family:Fraunces, serif; font-size:clamp(36px,6vw,84px); font-weight:100; line-height:.9; letter-spacing:-.04em; margin:0}
        .hero-copy h1 em{font-style:italic; color:#B08D57}
        .hero-lead{margin-top:18px; max-width:420px; font-size:14px; line-height:1.6; opacity:.7}
        .hero-actions{margin-top:28px; display:flex; gap:12px; flex-wrap:wrap}
        .hero-visual{position:relative; background:#fff; border-radius:24px; border:1px solid rgba(0,0,0,.06); padding:18px; box-shadow:0 24px 64px rgba(0,0,0,.06); display:grid; place-items:center; aspect-ratio:1/1; max-height:560px; overflow:hidden}
        .hero-visual img{width:100%; height:100%; object-fit:contain; background:#F5F1E9; border-radius:16px; padding:12px; display:block}
        .hero-dots{display:flex; gap:8px; margin-top:18px; align-items:center}
        .hero-dot{width:32px; height:3px; border-radius:999px; background:rgba(0,0,0,.12); border:none; cursor:pointer; transition:.3s}
        .hero-dot.active{background:#0A0A0A; width:48px}
        @media(max-width:900px){
          .hero-wrap{grid-template-columns:1fr; min-height:auto; padding:24px 4% 16px; gap:16px}
          .hero-visual{aspect-ratio:1.2/1; max-height:380px; padding:12px; border-radius:16px}
          .hero-visual img{padding:8px; border-radius:12px}
          .hero-copy h1{font-size:clamp(32px,9vw,48px)}
          .hero-lead{font-size:13px; margin-top:12px}
          .hero-actions{margin-top:16px}
          .hero-dots{margin-top:12px}
        }
      `}</style>

      <section className="hero-wrap">
        <div className="hero-copy">
          <div style={{fontSize:'11px', letterSpacing:'.18em', opacity:.5, marginBottom:'14px'}}>STRIDE 01 — EST. 2026 — LAHORE / WORLDWIDE</div>
          <h1>Less but<br/>better<br/><em>made.</em></h1>
          <p className="hero-lead">Built on travertine, not trends. 50 styles, no logos — considered footwear for everyday ritual.</p>
          <div className="hero-actions">
            <Link to="/shop" style={{textDecoration:'none', padding:'14px 22px', fontSize:'11px', display:'inline-flex', alignItems:'center', gap:'6px', background:'#0A0A0A', color:'#fff', borderRadius:'999px'}}>SHOP COLLECTION ↗</Link>
            <Link to="/shop" style={{textDecoration:'none', padding:'14px 18px', fontSize:'11px', borderRadius:'999px', border:'1px solid rgba(0,0,0,.1)', color:'#0A0A0A'}}>OUR PHILOSOPHY</Link>
          </div>
          <div className="hero-dots">
            {heroShoes.map((_,i)=> <button key={i} onClick={()=> setCurrent(i)} className={`hero-dot ${i===current?'active':''}`} aria-label={`Go to ${i+1}`} />)}
            <span style={{marginLeft:'12px', fontSize:'11px', opacity:.5}}>0{current+1} / 0{heroShoes.length}</span>
          </div>
        </div>

        <div className="hero-visual">
          <img src={shoe.image} alt={shoe.name} loading="eager" />
          <div style={{position:'absolute', bottom:'18px', right:'18px', background:'#0A0A0A', color:'#fff', borderRadius:'999px', padding:'8px 14px', fontSize:'11px', display:'flex', alignItems:'center', gap:'8px'}}>
            {shoe.name} — ${shoe.price} <Link to={`/product/${shoe.id}`} style={{color:'#fff', textDecoration:'none'}}>VIEW →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
