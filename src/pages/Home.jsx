import { useState, useEffect } from 'react'
import { productsData, getAllProducts } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import { Link } from 'react-router-dom'

export default function Home({onAdd}){
  const [allProducts,setAllProducts]=useState(productsData.slice(0,6))
  const [current,setCurrent]=useState(0)
  const [heroProducts,setHeroProducts]=useState([])

  useEffect(()=>{ 
    const all=getAllProducts()
    setAllProducts(all.slice(0,6))
    const unique = [...all].slice(0,12).filter((v,i,a)=> a.findIndex(t=> t.image===v.image)===i).slice(0,5)
    setHeroProducts(unique)
  },[])

  useEffect(()=>{
    const id=setInterval(()=> setCurrent(c=> (c+1)% (heroProducts.length||1)), 3000)
    return ()=> clearInterval(id)
  },[heroProducts.length])

  const scrollToPhil=()=> document.getElementById('philosophy')?.scrollIntoView({behavior:'smooth'})

  return (
    <div style={{background:'#FAF8F5'}}>
      <div style={{maxWidth:'1360px', margin:'0 auto', padding:'36px 3.5% 24px', display:'grid', gridTemplateColumns:'440px 1fr', gap:'32px', alignItems:'center', minHeight:'82vh'}}>
        <div>
          <div style={{fontSize:'10px', letterSpacing:'.22em', opacity:.5, marginBottom:'20px', fontWeight:600}}>STRIDE 01 — EST. 2026 — LAHORE / WORLDWIDE</div>
          <h1 style={{fontFamily:'Fraunces', fontSize:'clamp(52px,6.2vw,78px)', lineHeight:.88, fontWeight:100, letterSpacing:'-.05em'}}>
            Less but<br/>better<br/><span style={{fontStyle:'italic', color:'#C19A6B', fontWeight:300}}>made.</span>
          </h1>
          <p style={{marginTop:'18px', maxWidth:'360px', fontSize:'13.5px', lineHeight:1.75, opacity:.62}}>
            One silhouette. Twelve materials. No logos. Considered footwear built on travertine, not trends.
          </p>
          <div style={{marginTop:'28px', display:'flex', gap:'10px'}}>
            <Link to="/shop" className="btn-primary" style={{padding:'16px 24px', textDecoration:'none', fontSize:'11px', display:'inline-grid', placeItems:'center'}}>SHOP COLLECTION ↗</Link>
            <button onClick={scrollToPhil} className="btn-ghost" style={{padding:'16px 22px', borderRadius:'999px', fontSize:'11px', border:'1px solid rgba(0,0,0,.12)', background:'#fff', cursor:'pointer'}}>OUR PHILOSOPHY</button>
          </div>
          <div style={{marginTop:'28px', display:'flex', gap:'8px', alignItems:'center'}}>
            {heroProducts.map((_,i)=>(
              <button key={i} onClick={()=> setCurrent(i)} style={{width: current===i? '28px':'8px', height:'8px', borderRadius:'999px', border:'none', background: current===i? '#0A0A0A':'rgba(0,0,0,.15)', cursor:'pointer', transition:'.3s'}} />
            ))}
            <span style={{marginLeft:'12px', fontSize:'10px', opacity:.4}}>{String(current+1).padStart(2,'0')} / {String(heroProducts.length).padStart(2,'0')}</span>
          </div>
        </div>
        <div style={{position:'relative', background:'#F0EBE1', borderRadius:'22px', padding:'18px', display:'grid', placeItems:'center', minHeight:'560px'}}>
          <div style={{width:'100%', maxWidth:'620px', aspectRatio:'1.15/1', background:'#fff', borderRadius:'18px', padding:'16px', boxShadow:'0 20px 60px rgba(0,0,0,.08)', position:'relative', overflow:'hidden'}}>
            {heroProducts.map((p,idx)=>(
              <div key={p.id} style={{position:'absolute', inset:'16px', opacity: idx===current?1:0, transform: `scale(${idx===current?1:.96})`, transition:'all .6s cubic-bezier(.16,1,.3,1)', pointerEvents: idx===current?'auto':'none'}}>
                <img src={p.image} alt={p.name} style={{width:'100%', height:'100%', objectFit:'contain', background:'#FAF8F5', borderRadius:'12px'}} />
                <div style={{position:'absolute', bottom:'12px', left:'12px', right:'12px', display:'flex', justifyContent:'space-between'}}>
                  <div style={{background:'rgba(255,255,255,.92)', backdropFilter:'blur(10px)', padding:'8px 12px', borderRadius:'999px', fontSize:'10px', fontWeight:600}}>{p.name} — ${p.price}</div>
                  <Link to={`/product/${p.id}`} style={{background:'#0A0A0A', color:'#fff', padding:'8px 14px', borderRadius:'999px', fontSize:'10px', textDecoration:'none'}}>VIEW →</Link>
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=> setCurrent(c=> (c-1+heroProducts.length)%heroProducts.length)} style={{position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', width:'44px', height:'44px', borderRadius:'999px', border:'1px solid rgba(0,0,0,.1)', background:'rgba(255,255,255,.9)', cursor:'pointer'}}>‹</button>
          <button onClick={()=> setCurrent(c=> (c+1)%heroProducts.length)} style={{position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', width:'44px', height:'44px', borderRadius:'999px', border:'1px solid rgba(0,0,0,.1)', background:'rgba(255,255,255,.9)', cursor:'pointer'}}>›</button>
        </div>
      </div>
      <div id="philosophy" style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'rgba(0,0,0,.06)', borderTop:'1px solid rgba(0,0,0,.06)', borderBottom:'1px solid rgba(0,0,0,.06)'}}>
        {[{t:'Materials first',d:'Suede, leather, knit, canvas.'},{t:'One silhouette',d:'Twelve variations on one shape.'},{t:'Built on travertine',d:'Sole inspired by Lahore stone.'}].map((x,i)=>(
          <div key={i} style={{background:'#fff', padding:'26px 24px'}}><div style={{fontFamily:'Fraunces', fontSize:'18px'}}>{x.t}</div><div style={{fontSize:'12px', opacity:.5, marginTop:'6px'}}>{x.d}</div></div>
        ))}
      </div>
      <div className="stride-filters" style={{position:'relative', top:0}}>
        <div style={{fontSize:'11px', letterSpacing:'.16em', fontWeight:600}}>FEATURED — {allProducts.length} STYLES — NO REPEAT</div>
        <Link to="/shop" style={{fontSize:'11px', textDecoration:'underline'}}>VIEW ALL 50+ →</Link>
      </div>
      <div className="stride-grid">
        {allProducts.map(p=> <ProductCard key={p.id} product={p} onAdd={onAdd} />)}
      </div>
    </div>
  )
}
