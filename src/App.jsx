
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Cart from './pages/Cart.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import Admin from './pages/Admin.jsx'
import AdminOrders from './pages/AdminOrders.jsx'

export default function App(){
  const [cart,setCart]=useState(()=>{
    try{ const s = localStorage.getItem('stride_cart'); return s? JSON.parse(s):[] }catch{return []}
  })
  const [drawerOpen,setDrawerOpen]=useState(false)
  const [lastOrder,setLastOrder]=useState(null)

  useEffect(()=>{ localStorage.setItem('stride_cart', JSON.stringify(cart)) },[cart])

  const addToBag=(product)=>{
    setCart(prev=>{
      const key = `${product.id}-${product.selectedSize||'no-size'}`
      const found = prev.find(p=> `${p.id}-${p.selectedSize||'no-size'}`===key)
      if(found) return prev.map(p=> `${p.id}-${p.selectedSize||'no-size'}`===key ? {...p, qty: p.qty + (product.qty||1)} : p)
      return [...prev, {...product, qty: product.qty||1}]
    })
    setDrawerOpen(true)
  }
  const removeFromBag=(key)=> setCart(prev=> prev.filter(p=> `${p.id}-${p.selectedSize||'no-size'}`!==key))
  const updateQty=(key, qty)=> {
    if(qty<=0) return removeFromBag(key)
    setCart(prev=> prev.map(p=> `${p.id}-${p.selectedSize||'no-size'}`===key ? {...p, qty} : p))
  }
  const clearCart=()=> setCart([])
  const cartCount=cart.reduce((s,i)=>s+i.qty,0)

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} onCartOpen={()=> setDrawerOpen(true)} />
      <CartDrawer open={drawerOpen} onClose={()=> setDrawerOpen(false)} cart={cart} onRemove={removeFromBag} onUpdateQty={updateQty} />
      <Routes>
        <Route path="/" element={<Home onAdd={addToBag} />} />
        <Route path="/shop" element={<Shop onAdd={addToBag} />} />
        <Route path="/product/:id" element={<ProductDetails onAdd={addToBag} />} />
        <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromBag} onUpdateQty={updateQty} onClear={clearCart} setLastOrder={setLastOrder} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/order-success" element={<OrderSuccess order={lastOrder} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
