import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar({cartCount, onCartOpen}){
  const [mobileOpen,setMobileOpen]=useState(false)
  const navigate = useNavigate()
  const goShop = (filter) => {
    setMobileOpen(false)
    navigate(filter ? `/shop?filter=${filter}` : '/shop')
  }
  return (
    <>
      <div className="stride-announce"><span>STRIDE 01 — NEW DROP • FREE SHIPPING $150+ — LAHORE / WORLDWIDE • 30-DAY RETURNS</span></div>
      <header className="stride-navbar">
        <Link to="/" className="stride-logo" onClick={()=> setMobileOpen(false)}>STRIDE<em>.</em></Link>
        <nav className={`stride-nav ${mobileOpen?'mobile-open':''}`}>
          <Link to="/shop" onClick={()=> setMobileOpen(false)}>SHOP</Link>
          <button onClick={()=> goShop('SNEAKER')} style={{background:'none',border:'none',font:'inherit',cursor:'pointer'}}>COLLECTION</button>
          <button onClick={()=> { setMobileOpen(false); document.getElementById('philosophy')?.scrollIntoView({behavior:'smooth'}) }} style={{background:'none',border:'none',font:'inherit',cursor:'pointer'}}>JOURNAL</button>
          <Link to="/admin" onClick={()=> setMobileOpen(false)} style={{opacity:.5}}>ADMIN</Link>
        </nav>
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <div className="stride-bag" onClick={onCartOpen}>BAG ({cartCount}) ↗</div>
          <button className="mobile-toggle" onClick={()=> setMobileOpen(!mobileOpen)} style={{width:'44px',height:'44px',borderRadius:'999px',border:'1px solid rgba(0,0,0,.1)',background:'#fff',display:'none',cursor:'pointer'}}>☰</button>
        </div>
      </header>
      {mobileOpen && (
        <div style={{position:'fixed',inset:'114px 0 0 0',background:'#FAF8F5',zIndex:95,padding:'24px 5%',display:'flex',flexDirection:'column',gap:'24px'}}>
          <Link to="/shop" onClick={()=> setMobileOpen(false)} style={{fontFamily:'Fraunces',fontSize:'28px'}}>Shop — 50 Styles</Link>
          <Link to="/cart" onClick={()=> setMobileOpen(false)} style={{fontFamily:'Fraunces',fontSize:'28px'}}>Bag ({cartCount})</Link>
          <Link to="/admin" onClick={()=> setMobileOpen(false)} style={{fontFamily:'Fraunces',fontSize:'20px',opacity:.5}}>Admin →</Link>
        </div>
      )}
    </>
  )
}
