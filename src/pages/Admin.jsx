
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const CATS=['SNEAKER','HIGH-TOP','CHUNKY','BOOT','KNIT','CANVAS','RUNNING','FORMAL','SLIP-ON','TRAIL','BUNDLE']
export default function Admin(){
  const [products,setProducts]=useState(()=>{ try{return JSON.parse(localStorage.getItem('stride_custom_products')||'[]')}catch{return[]}})
  const [form,setForm]=useState({name:'',price:'',category:'SNEAKER',material:'Suede / Rubber',desc:'',sizes:'40,41,42,43,44',image:''})
  const [preview,setPreview]=useState('')
  useEffect(()=>{localStorage.setItem('stride_custom_products',JSON.stringify(products))},[products])
  const handleImage=(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=(ev)=>{setForm({...form,image:ev.target.result});setPreview(ev.target.result)};r.readAsDataURL(f)}
  const addProduct=(e)=>{e.preventDefault();const id='custom-'+Math.random().toString(36).slice(2,6);const np={id,name:form.name,category:form.category,price:parseInt(form.price),image:form.image||'https://via.placeholder.com/800',desc:form.desc,longDesc:form.desc,sizes:form.sizes.split(',').map(s=>parseInt(s.trim())).filter(Boolean),material:form.material,custom:true};setProducts([np,...products]);setForm({name:'',price:'',category:'SNEAKER',material:'Suede / Rubber',desc:'',sizes:'40,41,42,43,44',image:''});setPreview('');alert('Added! Check /shop')}
  return(
    <div style={{minHeight:'80vh',background:'#FAF8F5',padding:'32px 3.5%'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
        <h1 style={{fontFamily:'Fraunces',fontSize:'42px',fontWeight:100,letterSpacing:'-.02em'}}>Admin — STRIDE 01</h1>
        <div style={{display:'flex',gap:'10px'}}><Link to="/admin/orders" className="btn-primary" style={{padding:'12px 18px',textDecoration:'none',fontSize:'11px'}}>ORDERS — VIEW ↗</Link><Link to="/shop" className="btn-ghost" style={{padding:'12px 18px',borderRadius:'999px',textDecoration:'none',fontSize:'11px',border:'1px solid rgba(0,0,0,.1)'}}>SHOP — 50 STYLES</Link></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'440px 1fr',gap:'28px',marginTop:'28px'}}>
        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,.06)',borderRadius:'20px',padding:'24px',boxShadow:'0 16px 48px rgba(0,0,0,.06)',alignSelf:'start',position:'sticky',top:'100px'}}>
          <div style={{fontFamily:'Fraunces',fontSize:'22px',marginBottom:'20px'}}>Add New Shoe</div>
          
          <div style={{display:'flex',flexDirection:'column',gap:'18px'}}>
            <div>
              <label style={{fontSize:'10px',letterSpacing:'.14em',fontWeight:700,opacity:.6,display:'block',marginBottom:'8px'}}>SHOE NAME *</label>
              <input required placeholder="e.g. STRIDE 51 — Dune Suede" value={form.name} onChange={e=> setForm({...form,name:e.target.value})} style={{width:'100%',height:'48px',padding:'0 16px',border:'1.5px solid rgba(0,0,0,.08)',borderRadius:'12px',fontSize:'13px',background:'#FAF8F5',outline:'none',transition:'.2s'}} onFocus={e=> e.target.style.borderColor='#0A0A0A'} onBlur={e=> e.target.style.borderColor='rgba(0,0,0,.08)'} />
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              <div>
                <label style={{fontSize:'10px',letterSpacing:'.14em',fontWeight:700,opacity:.6,display:'block',marginBottom:'8px'}}>PRICE $ *</label>
                <input required type="number" placeholder="175" value={form.price} onChange={e=> setForm({...form,price:e.target.value})} style={{width:'100%',height:'48px',padding:'0 16px',border:'1.5px solid rgba(0,0,0,.08)',borderRadius:'12px',fontSize:'13px',background:'#FAF8F5'}} />
              </div>
              <div>
                <label style={{fontSize:'10px',letterSpacing:'.14em',fontWeight:700,opacity:.6,display:'block',marginBottom:'8px'}}>CATEGORY</label>
                <select value={form.category} onChange={e=> setForm({...form,category:e.target.value})} style={{width:'100%',height:'48px',padding:'0 12px',border:'1.5px solid rgba(0,0,0,.08)',borderRadius:'12px',fontSize:'13px',background:'#FAF8F5'}}>{CATS.map(c=> <option key={c}>{c}</option>)}</select>
              </div>
            </div>

            <div>
              <label style={{fontSize:'10px',letterSpacing:'.14em',fontWeight:700,opacity:.6,display:'block',marginBottom:'8px'}}>SIZES — e.g. 40,41,42,43</label>
              <input placeholder="40,41,42,43,44" value={form.sizes} onChange={e=> setForm({...form,sizes:e.target.value})} style={{width:'100%',height:'48px',padding:'0 16px',border:'1.5px solid rgba(0,0,0,.08)',borderRadius:'12px',fontSize:'13px',background:'#FAF8F5'}} />
            </div>

            <div>
              <label style={{fontSize:'10px',letterSpacing:'.14em',fontWeight:700,opacity:.6,display:'block',marginBottom:'8px'}}>DESCRIPTION</label>
              <textarea placeholder="Beige suede, travertine sole, minimal stitching..." value={form.desc} onChange={e=> setForm({...form,desc:e.target.value})} style={{width:'100%',minHeight:'84px',padding:'12px 16px',border:'1.5px solid rgba(0,0,0,.08)',borderRadius:'12px',fontSize:'13px',background:'#FAF8F5',resize:'vertical'}} />
            </div>

            <div>
              <label style={{fontSize:'10px',letterSpacing:'.14em',fontWeight:700,opacity:.6,display:'block',marginBottom:'8px'}}>IMAGE UPLOAD — MODERN</label>
              <div style={{border:'1.5px dashed rgba(0,0,0,.12)',borderRadius:'14px',padding:'16px',background:'#FAF8F5',textAlign:'center'}}>
                <input type="file" accept="image/*" onChange={handleImage} style={{fontSize:'12px'}} />
                <div style={{fontSize:'10px',opacity:.4,marginTop:'8px'}}>PNG, JPG, WEBP — Max 5MB — Full shoe visible, no cut</div>
                {preview && <img src={preview} alt="preview" style={{marginTop:'14px',width:'100%',height:'220px',objectFit:'contain',borderRadius:'12px',background:'#fff',padding:'8px',border:'1px solid rgba(0,0,0,.06)'}} />}
              </div>
            </div>

            <button type="submit" onClick={addProduct} className="btn-primary" style={{height:'52px',width:'100%',marginTop:'4px'}}>ADD SHOE TO SHOP ↗</button>
            <div style={{fontSize:'10px',opacity:.4,textAlign:'center',letterSpacing:'.08em'}}>Saved in localStorage — Firebase ready — No backend needed</div>
          </div>
        </div>

        <div>
          <div style={{fontFamily:'Fraunces',fontSize:'22px',marginBottom:'16px'}}>Custom Shoes — {products.length} — Modern Cards</div>
          {products.length===0 ? (
            <div style={{background:'#fff',border:'1px dashed rgba(0,0,0,.15)',borderRadius:'16px',padding:'48px',textAlign:'center'}}>
              <div style={{fontFamily:'Fraunces',fontSize:'20px',opacity:.6}}>No custom shoes yet</div>
              <div style={{fontSize:'12px',opacity:.4,marginTop:'8px'}}>Add from left — image will show full shoe, no cut</div>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'16px'}}>
              {products.map(p=> (
                <div key={p.id} style={{background:'#fff',padding:'16px',borderRadius:'16px',border:'1px solid rgba(0,0,0,.06)',display:'flex',gap:'14px',boxShadow:'0 8px 24px rgba(0,0,0,.04)'}}>
                  <img src={p.image} alt={p.name} style={{width:'80px',height:'96px',objectFit:'contain',borderRadius:'10px',background:'#F5F1E9',padding:'6px'}} />
                  <div><div style={{fontFamily:'Fraunces',fontSize:'15px'}}>{p.name}</div><div style={{fontSize:'11px',opacity:.5,marginTop:'4px'}}>${p.price} — {p.category}</div><button onClick={()=> setProducts(products.filter(x=> x.id!==p.id))} style={{marginTop:'10px',fontSize:'10px',background:'#0A0A0A',color:'#fff',border:'none',borderRadius:'999px',padding:'6px 12px',cursor:'pointer'}}>DELETE</button></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
