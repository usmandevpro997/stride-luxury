
export default function CartDrawer({open, onClose, cart, onRemove, onUpdateQty}){
  const total = cart.reduce((s,i)=> s + i.price*i.qty,0)
  return (
    <div className={`cart-drawer ${open?'open':''}`}>
      <div className="cart-backdrop" onClick={onClose}></div>
      <div className="cart-panel">
        <div className="cart-head">
          <span style={{fontFamily:'Fraunces', fontSize:'20px'}}>Bag — {cart.reduce((s,i)=>s+i.qty,0)} items</span>
          <button onClick={onClose} style={{width:'40px', height:'40px', borderRadius:'999px', border:'1px solid rgba(0,0,0,.1)', background:'#fff', cursor:'pointer'}}>✕</button>
        </div>
        <div className="cart-body">
          {cart.length===0 ? (
            <div style={{padding:'80px 0', textAlign:'center', opacity:.5}}><div style={{fontFamily:'Fraunces', fontSize:'28px'}}>Your bag is empty</div><p style={{marginTop:'12px', fontSize:'13px'}}>Add some considered footwear.</p></div>
          ) : cart.map(item=>(
            <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <div style={{display:'flex', justifyContent:'space-between'}}><strong style={{fontFamily:'Fraunces', fontSize:'16px'}}>{item.name}</strong><button onClick={()=> onRemove(`${item.id}-${item.selectedSize||'no-size'}`)} style={{background:'none', border:'none', fontSize:'11px', textDecoration:'underline', cursor:'pointer'}}>Remove</button></div>
                <div style={{fontSize:'11px', opacity:.6, marginTop:'4px'}}>Size {item.selectedSize||'—'} — {item.material}</div>
                <div style={{marginTop:'12px', display:'flex', alignItems:'center', gap:'12px'}}>
                  <div style={{display:'flex', border:'1px solid rgba(0,0,0,.1)', borderRadius:'999px', overflow:'hidden'}}>
                    <button onClick={()=> onUpdateQty(`${item.id}-${item.selectedSize||'no-size'}`, Math.max(1,item.qty-1))} style={{width:'36px', height:'32px', border:'none', background:'#fff', cursor:'pointer'}}>−</button>
                    <span style={{width:'32px', display:'grid', placeItems:'center', fontSize:'12px'}}>{item.qty}</span>
                    <button onClick={()=> onUpdateQty(`${item.id}-${item.selectedSize||'no-size'}`, item.qty+1)} style={{width:'36px', height:'32px', border:'none', background:'#fff', cursor:'pointer'}}>+</button>
                  </div>
                  <span style={{fontWeight:'600'}}>${(item.price*item.qty).toFixed(0)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length>0 && (
          <div style={{padding:'24px', borderTop:'1px solid rgba(0,0,0,.06)', background:'#fff'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'16px'}}><span style={{opacity:.6, fontSize:'12px'}}>SUBTOTAL</span><span style={{fontWeight:'700', fontSize:'18px'}}>${total.toFixed(0)}</span></div>
            <a href="/cart" className="btn-primary" style={{width:'100%', display:'grid', placeItems:'center', textDecoration:'none'}}>VIEW BAG & CHECKOUT — ${total.toFixed(0)} ↗</a>
            <div style={{marginTop:'12px', fontSize:'10px', opacity:.5, textAlign:'center', letterSpacing:'.12em'}}>FREE SHIPPING OVER $150 — 30 DAY RETURNS</div>
          </div>
        )}
      </div>
    </div>
  )
}
