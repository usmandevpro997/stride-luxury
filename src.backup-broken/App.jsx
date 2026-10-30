
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { productsData } from './data/products'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import './App.css'
import './index.css'

export default function App(){
  const [cart,setCart]=useState([])
  const [notice,setNotice]=useState('')
  const addToCart=(product)=>{
    setCart(curr=>{
      const f=curr.find(p=>p.id===product.id)
      if(f) return curr.map(p=>p.id===product.id?{...p,quantity:p.quantity+1}:p)
      return [...curr,{...product,quantity:1}]
    })
    setNotice(`${product.name} added to bag`)
    setTimeout(()=>setNotice(''),2800)
  }
  const cartCount=cart.reduce((s,p)=>s+p.quantity,0)
  return (
    <BrowserRouter>
      <div className="aurel-app">
        <Navbar cartCount={cartCount} />
        {notice && <div className="aurel-toast">{notice}</div>}
        <Routes>
          <Route path="/" element={<Home products={productsData} onAddToBag={addToCart} />} />
          <Route path="/shop" element={<Shop products={productsData} onAddToBag={addToCart} />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
