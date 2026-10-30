
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function AdminOrders(){
  const [orders,setOrders]=useState([])
  useEffect(()=>{ try{ setOrders(JSON.parse(localStorage.getItem('stride_orders')||'[]')) }catch{ setOrders([]) } },[])
  return(
    <div style={{minHeight:'80vh',background:'#FAF8F5',padding:'40px 3.5%'}}>
      <h1 style={{fontFamily:'Fraunces',fontSize:'36px',fontWeight:100}}>Orders — {orders.length}</h1>
      <Link to="/admin" style={{display:'inline-block',marginTop:'12px',fontSize:'12px',textDecoration:'underline'}}>Back to Admin</Link>
      <div style={{marginTop:'24px',display:'flex',flexDirection:'column',gap:'12px'}}>
        {orders.length===0 ? <div>No orders yet</div> : orders.map(o=> (
          <div key={o.id} style={{background:'#fff',border:'1px solid #eee',borderRadius:'12px',padding:'16px'}}>
            <div style={{fontWeight:700}}>{o.id} — {new Date(o.date).toLocaleString()} — ${o.total}</div>
            <div style={{fontSize:'13px',marginTop:'6px'}}>{o.customer.name} — {o.customer.phone} — {o.customer.address}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
