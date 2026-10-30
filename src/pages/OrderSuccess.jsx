
import { Link } from 'react-router-dom'
export default function OrderSuccess({order}){
  if(!order){
    return <div style={{minHeight:'60vh', display:'grid', placeItems:'center'}}><div>Order not found — <Link to="/shop">Go to shop</Link></div></div>
  }
  return (
    <div style={{minHeight:'80vh', display:'grid', placeItems:'center', background:'#FAF8F5', padding:'5%'}}>
      <div style={{maxWidth:'560px', width:'100%', background:'#fff', border:'1px solid rgba(0,0,0,.06)', borderRadius:'24px', padding:'48px', textAlign:'center'}}>
        <div style={{width:'64px', height:'64px', borderRadius:'999px', background:'#0A0A0A', color:'#fff', display:'grid', placeItems:'center', margin:'0 auto', fontSize:'28px'}}>✓</div>
        <div style={{fontFamily:'Fraunces', fontSize:'42px', fontWeight:100, marginTop:'24px', letterSpacing:'-.03em'}}>Order placed.</div>
        <div style={{marginTop:'12px', fontSize:'13px', opacity:.6}}>Order ID <strong style={{letterSpacing:'.08em'}}>{order.id}</strong> — Cash on Delivery</div>
        <div style={{marginTop:'24px', textAlign:'left', background:'#FAF8F5', borderRadius:'16px', padding:'20px', fontSize:'13px'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><span style={{opacity:.6}}>Customer</span><span style={{fontWeight:600}}>{order.customer.name} — {order.customer.city}</span></div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><span style={{opacity:.6}}>Phone</span><span>{order.customer.phone}</span></div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}><span style={{opacity:.6}}>Items</span><span>{order.items.reduce((s,i)=>s+i.qty,0)} items</span></div>
          <div style={{height:'1px', background:'rgba(0,0,0,.08)', margin:'12px 0'}}></div>
          <div style={{display:'flex', justifyContent:'space-between', fontWeight:700, fontSize:'18px'}}><span>Total</span><span>${order.total.toFixed(0)}</span></div>
        </div>
        <div style={{display:'flex', gap:'12px', marginTop:'24px', justifyContent:'center'}}>
          <Link to="/shop" className="btn-primary" style={{padding:'16px 28px'}}>CONTINUE SHOPPING</Link>
          <Link to="/" className="btn-ghost" style={{padding:'16px 28px', borderRadius:'999px', textDecoration:'none', display:'inline-grid', placeItems:'center'}}>HOME</Link>
        </div>
        <div style={{marginTop:'20px', fontSize:'10px', opacity:.4, letterSpacing:'.12em'}}>STRIDE 01 — NO LOGO, JUST MATERIALS — Orders saved in localStorage (backend ready)</div>
      </div>
    </div>
  )
}
