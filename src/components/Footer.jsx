import { Link } from 'react-router-dom'
export default function Footer(){
  return (
    <footer style={{background:'#0A0A0A', color:'#E8E2D8'}}>
      <div style={{padding:'64px 3.5% 32px', display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr', gap:'40px'}}>
        <div>
          <div style={{fontFamily:'Fraunces', fontSize:'36px', fontWeight:100}}>STRIDE<em style={{color:'#C19A6B', fontStyle:'normal'}}>.</em></div>
          <div style={{marginTop:'12px', fontSize:'12px', lineHeight:1.7, opacity:.6, maxWidth:'320px'}}>Less but better made. No logos, just materials. Designed in Lahore, worn everywhere.</div>
          <div style={{marginTop:'20px', display:'flex', gap:'10px'}}>
            <Link to="/admin" style={{height:'36px', padding:'0 14px', borderRadius:'999px', border:'1px solid rgba(255,255,255,.15)', display:'grid', placeItems:'center', fontSize:'10px', textDecoration:'none', color:'inherit'}}>ADMIN →</Link>
            <Link to="/admin/orders" style={{height:'36px', padding:'0 14px', borderRadius:'999px', border:'1px solid rgba(255,255,255,.15)', display:'grid', placeItems:'center', fontSize:'10px', textDecoration:'none', color:'inherit'}}>ORDERS</Link>
          </div>
        </div>
        <div>
          <div style={{fontSize:'11px', letterSpacing:'.16em', fontWeight:600, marginBottom:'16px', opacity:.8}}>SHOP</div>
          <div style={{display:'flex', flexDirection:'column', gap:'10px', fontSize:'13px', opacity:.6}}>
            <Link to="/shop" style={{color:'inherit', textDecoration:'none'}}>All — 50 Styles</Link>
            <Link to="/shop" style={{color:'inherit', textDecoration:'none'}}>Sneaker</Link>
            <Link to="/shop" style={{color:'inherit', textDecoration:'none'}}>Boot</Link>
            <Link to="/shop" style={{color:'inherit', textDecoration:'none'}}>Chunky</Link>
          </div>
        </div>
        <div>
          <div style={{fontSize:'11px', letterSpacing:'.16em', fontWeight:600, marginBottom:'16px', opacity:.8}}>COMPANY</div>
          <div style={{display:'flex', flexDirection:'column', gap:'10px', fontSize:'13px', opacity:.6}}>
            <button onClick={()=> document.getElementById('philosophy')?.scrollIntoView({behavior:'smooth'})} style={{background:'none', border:'none', color:'inherit', textAlign:'left', cursor:'pointer', font:'inherit'}}>Journal</button>
            <Link to="/cart" style={{color:'inherit', textDecoration:'none'}}>Bag & Checkout</Link>
          </div>
        </div>
        <div>
          <div style={{fontSize:'11px', letterSpacing:'.16em', fontWeight:600, marginBottom:'16px', opacity:.8}}>INFO</div>
          <div style={{fontSize:'12px', opacity:.6, lineHeight:1.7}}>Lahore / Worldwide<br/>Free shipping $150+<br/>30-day returns<br/>COD Available</div>
        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(255,255,255,.08)', padding:'18px 3.5%', display:'flex', justifyContent:'space-between', fontSize:'10px', opacity:.4}}>
        <span>© 2026 STRIDE 01 — DESIGNED IN LAHORE</span>
        <span>50 STYLES — ADMIN READY</span>
      </div>
    </footer>
  )
}
