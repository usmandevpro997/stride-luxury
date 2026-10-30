
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollTo = (id) => (e) => {
    if (loc.pathname !== '/') { window.location.href = `/#${id}`; return }
    e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <div className="aurel-announcement"><span>A MORE CONSIDERED ROUTINE</span><span>✳</span><span>COMPLIMENTARY SHIPPING OVER $75</span></div>
      <header className={`aurel-navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <Link to="/" className="aurel-wordmark">AUREL<span>.</span></Link>
        <nav className="aurel-navlinks">
          <Link to="/shop">SHOP</Link>
          <a href="#ingredients" onClick={scrollTo('ingredients')}>INGREDIENTS</a>
          <a href="#testimonials" onClick={scrollTo('testimonials')}>JOURNAL</a>
          <a href="#footer" onClick={scrollTo('footer')}>CONTACT</a>
        </nav>
        <button className="aurel-bag">BAG ({cartCount}) ↗</button>
      </header>
    </>
  )
}
