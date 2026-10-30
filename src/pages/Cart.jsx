
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Cart({cart, onRemove, onUpdateQty, onClear, setLastOrder}){
  const navigate = useNavigate()
  const [form,setForm]=useState({name:'',phone:'',address:'',city:'Lahore'})
  const subtotal = cart.reduce((s,i)=> s + i.price*i.qty,0)
  const shipping = subtotal>0 ? (subtotal>=150?0:15) : 0
  const total = subtotal + shipping
  const count = cart.reduce((s,i)=>s+i.qty,0)

  const placeOrder = (e)=>{
    e.preventDefault()
    const orderId = 'STRIDE-'+Math.random().toString(36).slice(2,8).toUpperCase()
    const order = {id: orderId, items: cart, subtotal, shipping, total, customer: form, date: new Date().toISOString()}
    setLastOrder(order)
    const history = JSON.parse(localStorage.getItem('stride_orders')||'[]')
    history.unshift(order)
    localStorage.setItem('stride_orders', JSON.stringify(history))
    onClear()
    navigate('/order-success')
  }

  if(cart.length===0){
    return (
      <div style={{minHeight:'70vh', display:'grid', placeItems:'center', padding:'5%', background:'#FAF8F5'}}>
        <div style={{textAlign:'center', background:'#fff', padding:'48px', borderRadius:'24px', border:'1px solid rgba(0,0,0,.06)', boxShadow:'0 24px 64px rgba(0,0,0,.06)'}}>
          <div style={{fontFamily:'Fraunces', fontSize:'clamp(32px,6vw,56px)', fontWeight:100}}>Your bag is empty</div>
          <p style={{marginTop:'12px', opacity:.6, fontSize:'13px'}}>Add some considered footwear.</p>
          <Link to="/shop" className="btn-primary" style={{display:'inline-block', marginTop:'24px', textDecoration:'none'}}>GO TO SHOP ↗</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:'1.2fr .8fr', minHeight:'80vh', background:'#FAF8F5'}}>
      <div style={{padding:'40px 3.5%'}}>
        <h1 style={{fontFamily:'Fraunces', fontSize:'48px', fontWeight:100, letterSpacing:'-.04em'}}>Bag — {count} {count===1?'item':'items'}</h1>
        <div style={{marginTop:'24px', display:'flex', flexDirection:'column', gap:'1px', background:'rgba(0,0,0,.06)', borderRadius:'16px', overflow:'hidden', border:'1px solid rgba(0,0,0,.06)'}}>
          {cart.map(item=>{
            const key = `${item.id}-${item.selectedSize||'no-size'}`
            return (
              <div key={key} style={{display:'grid', gridTemplateColumns:'120px 1fr auto', gap:'20px', background:'#fff', padding:'20px', transition:'.3s'}} className="cart-row">
                <img src={item.image} alt={item.name} style={{width:'120px', height:'148px', objectFit:'cover', borderRadius:'12px', background:'#F5F1E9'}} />
                <div>
                  <div style={{fontFamily:'Fraunces', fontSize:'18px'}}>{item.name}</div>
                  <div style={{fontSize:'11px', opacity:.5, marginTop:'6px', letterSpacing:'.1em'}}>{item.material} — Size {item.selectedSize||'—'}</div>
                  <div style={{marginTop:'14px', display:'flex', alignItems:'center', gap:'12px'}}>
                    <div style={{display:'flex', border:'1px solid rgba(0,0,0,.1)', borderRadius:'999px', overflow:'hidden', background:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,.04)'}}>
                      <button onClick={()=> onUpdateQty(key, item.qty-1)} style={{width:'40px', height:'36px', border:'none', background:'#fff', cursor:'pointer'}}>−</button>
                      <span style={{width:'36px', display:'grid', placeItems:'center', fontSize:'13px', fontWeight:600}}>{item.qty}</span>
                      <button onClick={()=> onUpdateQty(key, item.qty+1)} style={{width:'40px', height:'36px', border:'none', background:'#fff', cursor:'pointer'}}>+</button>
                    </div>
                    <button onClick={()=> onRemove(key)} style={{fontSize:'11px', background:'none', border:'none', textDecoration:'underline', cursor:'pointer', opacity:.5}}>Remove</button>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontWeight:700, fontSize:'16px'}}>${(item.price*item.qty).toFixed(0)}</div>
                  <div style={{fontSize:'11px', opacity:.5, marginTop:'4px'}}>${item.price} × {item.qty}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{padding:'32px 3%', background:'#fff', borderLeft:'1px solid rgba(0,0,0,.06)', position:'sticky', top:'114px', alignSelf:'start', borderRadius:'0 0 0 24px', boxShadow:'-8px 0 32px rgba(0,0,0,.04)'}}>
        <div style={{fontFamily:'Fraunces', fontSize:'22px', marginBottom:'20px'}}>Checkout</div>
        <div style={{display:'flex', flexDirection:'column', gap:'10px', fontSize:'13px', background:'#FAF8F5', padding:'16px', borderRadius:'14px', border:'1px solid rgba(0,0,0,.04)'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}><span style={{opacity:.6}}>Subtotal</span><span>${subtotal.toFixed(0)}</span></div>
          <div style={{display:'flex', justifyContent:'space-between'}}><span style={{opacity:.6}}>Shipping {subtotal>=150?'— FREE':''}</span><span>{shipping===0?'FREE':'$'+shipping}</span></div>
          <div style={{height:'1px', background:'rgba(0,0,0,.08)', margin:'8px 0'}}></div>
          <div style={{display:'flex', justifyContent:'space-between', fontWeight:700, fontSize:'18px'}}><span>Total</span><span>${total.toFixed(0)}</span></div>
        </div>
        <form onSubmit={placeOrder} style={{marginTop:'24px', display:'flex', flexDirection:'column', gap:'16px'}}>
          <div className="modern-input-group">
            <input required placeholder=" " value={form.name} onChange={e=> setForm({...form,name:e.target.value})} className="modern-input" />
            <label className="modern-label">FULL NAME *</label>
          </div>
          <div className="modern-input-group">
            <input required placeholder=" " value={form.phone} onChange={e=> setForm({...form,phone:e.target.value})} className="modern-input" />
            <label className="modern-label">PHONE — 03XX... *</label>
          </div>
          <div className="modern-input-group">
            <input required placeholder=" " value={form.address} onChange={e=> setForm({...form,address:e.target.value})} className="modern-input" />
            <label className="modern-label">ADDRESS *</label>
          </div>
          <div className="modern-input-group">
            <select value={form.city} onChange={e=> setForm({...form,city:e.target.value})} className="modern-select">
              <option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Other</option>
            </select>
            <label className="modern-label" style={{opacity:1}}>CITY</label>
          </div>
          <button type="submit" className="btn-primary" style={{height:'54px', marginTop:'8px', width:'100%'}}>PLACE ORDER — ${total.toFixed(0)} ↗</button>
          <div style={{fontSize:'10px', opacity:.4, textAlign:'center', letterSpacing:'.1em'}}>CASH ON DELIVERY — 30 DAY RETURNS — NO LOGO</div>
        </form>
      </div>
      <style>{`@media(max-width:900px){div[style*="gridTemplateColumns:1.2fr"]{grid-template-columns:1fr !important}}`}</style>
    </div>
  )
}
