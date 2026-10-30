
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function Shop({ products = [], onAddToBag }){
  const [sp, setSp] = useSearchParams()
  const category = sp.get('category') || 'ALL'
  const page = parseInt(sp.get('page') || '1', 10)

  const filtered = useMemo(()=> category==='ALL' ? products : products.filter(p=>p.category===category), [products, category])
  const perPage = 50
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page-1)*perPage, page*perPage)

  const setCat = (c)=> setSp({category:c, page:'1'})
  const setPage = (p)=> setSp({category, page:String(p)})

  return (
    <main className="ah-shop">
      <div className="ah-shop-head">
        <h1 style={{fontFamily:'Bodoni Moda', fontSize:42}}>Shop — {filtered.length} products</h1>
        <div className="ah-filters">
          {['ALL','CLEANSE','TREAT','HYDRATE','PROTECT','RENEW'].map(c=>(
            <button key={c} className={category===c?'active':''} onClick={()=>setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="ah-pagination"><span>Page {page} of {totalPages} — 50 per page</span>
          {Array.from({length:totalPages},(_,i)=><button key={i} className={page===i+1?'active':''} onClick={()=>setPage(i+1)}>{i+1}</button>)}
        </div>
      </div>
      <div className="ah-products-grid">{paginated.map(p=><ProductCard key={p.id} product={p} onAddToBag={onAddToBag} />)}</div>
      <div className="ah-pagination bottom" style={{marginTop:48}}>
        {Array.from({length:totalPages},(_,i)=><button key={i} className={page===i+1?'active':''} onClick={()=>setPage(i+1)}>Page {i+1}</button>)}
      </div>
    </main>
  )
}
