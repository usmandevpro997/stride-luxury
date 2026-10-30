
import { useState } from 'react'
import ProductCard from '../components/ProductCard'

function scrollToId(id){ return (e)=>{ e.preventDefault(); document.getElementById(id)?.scrollIntoView({behavior:'smooth'}) } }

export default function Home({ products = [], onAddToBag }){
  const featured = products.slice(0,20)
  return (
    <main className="ah-home">
      <section className="ah-hero" id="home">
        <div className="ah-hero-copy">
          <span className="ah-eyebrow">AUREL — EST. 2026 — LAHORE / WORLDWIDE</span>
          <h1>Less, but<br/><span className="ah-serif-italic">so much</span><br/>better.</h1>
          <p className="ah-hero-lead">Three essentials. No filler. Thoughtful formulas rooted in botanical science — made to respect your barrier, not overwhelm it.</p>
          <div className="ah-hero-actions">
            <a href="#featured" className="ah-btn-primary" onClick={scrollToId('featured')}>SHOP THE COLLECTION ↗</a>
            <a href="#philosophy" className="ah-btn-ghost" onClick={scrollToId('philosophy')}>DISCOVER OUR PHILOSOPHY</a>
          </div>
          <div style={{marginTop:32, fontSize:10, letterSpacing:'0.2em', color:'#7A756F'}}>DERMATOLOGIST REVIEWED — FRAGRANCE FREE — CONCEPT FORMULAS FOR PORTFOLIO</div>
        </div>
        <div className="ah-hero-visual">
          <div className="ah-hero-image">
            <img src={products[0]?.image} alt="AUREL hero" />
            <div className="ah-hero-caption"><span>01 / THE ESSENTIALS</span><span>Three steps. Infinite calm.</span></div>
          </div>
        </div>
      </section>

      <div className="ah-strip"><span>THOUGHTFUL FORMULAS</span><p>Good skincare should feel simple, intentional, and entirely yours.</p><span>LESS NOISE. MORE CARE.</span></div>

      <section className="ah-featured" id="featured">
        <div className="ah-section-head"><div><span className="ah-eyebrow">TRUSTED BY DAILY RITUALS — 20 FEATURED</span><h2>The essentials.</h2></div><p>20 best sellers for trust. Full collection in Shop — 100 products, paginated 50-50.</p></div>
        <div className="ah-products-grid">{featured.map(p=><ProductCard key={p.id} product={p} onAddToBag={onAddToBag} />)}</div>
      </section>

      <section className="ah-featured" id="philosophy" style={{background:'#FFFEFB', borderTop:'1px solid var(--line)'}}>
        <span className="ah-eyebrow">OUR PHILOSOPHY</span>
        <h2 style={{fontFamily:'Bodoni Moda', fontSize:48, marginBottom:24}}>Skincare as<br/><em style={{color:'var(--clay)'}}>daily ritual,</em><br/>not performance.</h2>
        <p style={{maxWidth:560, lineHeight:1.7, color:'#5A5650'}}>AUREL was built on a simple belief: your skin doesn’t need more. It needs better. Oat lipid, chamomile, niacinamide, ceramide NP and squalane — no fragrance, no essential oils.</p>
      </section>
    </main>
  )
}
