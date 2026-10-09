import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const assets = {
  linkHub: '/images/image.png',
  collectionReference: '/images/image copy.png',
  masterclassReference: '/images/image copy 2.png',
  masterclassHero: 'https://images.pexels.com/photos/5427039/pexels-photo-5427039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  collectionHero: 'https://images.pexels.com/photos/2099265/pexels-photo-2099265.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  portrait: 'https://images.pexels.com/photos/9430457/pexels-photo-9430457.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
};

const navItems = ['WHAT’S NEW', 'AUMATRIX 2.0', 'DIVINE DIWALI', 'EUROPE SEASON 3', 'MVK VERIFIED', 'RARE', 'BRACELETS', 'CRYSTALS', 'AROMATHERAPY', 'E-STUDIO', 'ANCIENT TOOLS'];
const linkItems = ['Blessing Of The Month', 'Europe Collection Season - 3', 'Ancestry Manifestation Sheet - October', 'New Lightcoded Noobs (9191)', 'MVK Verified', 'New Arrivals', 'Pure Bracelets', 'Magic Ritual Bracelets', 'Know Your Gemstone Form', 'Gemstones', 'E - Studio', 'Learn About Crystals'];

function Logo({ dark = false }) {
  return <div className={`logo ${dark ? 'logo-dark' : ''}`}><div className="logo-mark">VK</div><div className="logo-name">VANI KABIR</div><div className="logo-tag">MAKING SPIRITUALITY SIMPLE</div></div>;
}

function IconButton({ type, onClick }) {
  return <button className="icon-button" aria-label={type} onClick={onClick}><span className={`icon icon-${type}`} /></button>;
}

function StoreHeader({ active = '' , onNavigate }) {
  return <>
    <div className="delivery-bar"><span className="paper-plane">⌁</span> International Delivery - Minimum Order Value - INR 10,000/-</div>
    <header className="store-header">
      <div className="header-top">
        <IconButton type="search" />
        <button className="header-logo-button" onClick={() => onNavigate('collection')}><Logo /></button>
        <div className="header-actions"><IconButton type="account" /><IconButton type="heart" /><IconButton type="bag" /><small>1</small></div>
      </div>
      <nav className="shop-nav">{navItems.map((item) => <button className={active === item ? 'active' : ''} key={item} onClick={() => onNavigate(item === 'DIVINE DIWALI' ? 'collection' : item === 'E-STUDIO' ? 'masterclass' : 'collection')}><b>✦</b>{item}</button>)}</nav>
    </header>
  </>;
}

function Landing({ onNavigate }) {
  return <main className="landing-page">
    <section className="link-hub">
      <Logo />
      <p className="hub-intro">Vani Kabir Studio is a modern home for timeless wisdom, conscious jewellery<br />and experiences that make spirituality simple.</p>
      <div className="socials"><span>◎</span><span>◉</span><span>◍</span></div>
      <button className="feature-card divine-card" onClick={() => onNavigate('collection')}><img src={assets.collectionHero} alt="Divine Diwali collection" /><div><small>AUMATRIX 2.0 COLLECTION</small><strong>DIVINE<br />DIWALI</strong></div></button>
      <button className="feature-card rite-card" onClick={() => onNavigate('masterclass')}><img src={assets.portrait} alt="Masterclass with Vani Kabir" /><div><small>3 SACRED RITES</small><strong>OF A SHAMAN</strong><em>YOU DON'T HAVE TO BE A SHAMAN<br />TO LEARN THEM.</em><span>MASTERCLASS<br /><small>WITH MASTER VANI KABIR</small></span></div></button>
      <div className="link-list">{linkItems.map((item, index) => <button key={item} onClick={() => onNavigate(index === 0 ? 'masterclass' : 'collection')}><span className="tiny-orb">{index % 3 === 0 ? '◌' : '◒'}</span>{item}<span>↗</span></button>)}</div>
    </section>
  </main>;
}

function Collection({ onNavigate }) {
  const products = [
    ['Divine Diwali Bracelet', '₹ 3,500', 'amber'], ['Lakshmi Light Talisman', '₹ 5,200', 'cream'], ['Aumatrix 2.0 Pendant', '₹ 7,800', 'sand'], ['The Diwali Edit', '₹ 4,400', 'warm']
  ];
  return <div className="site-page"><StoreHeader active="DIVINE DIWALI" onNavigate={onNavigate} /><section className="collection-heading"><div className="breadcrumbs"><span>⌂</span><i>/</i><span>Collections</span><i>/</i><b>Divine Diwali - Season 4</b></div><h1>DIVINE DIWALI - SEASON 4</h1></section><section className="shop-controls"><button>INR <span>⌄</span></button><button>Show filters <span>⌄</span></button><label>Sort by: <button>Featured <span>•</span></button></label></section><section className="products"><div className="collection-banner"><img src={assets.collectionHero} alt="Crystals and an open book" /><div><span>THE FESTIVAL OF LIGHT</span><h2>Jewellery that<br />remembers you.</h2><button>Explore collection <span>↗</span></button></div></div>{products.map(([name, price, tone]) => <article className="product-card" key={name}><div className={`product-art ${tone}`}><div className="orb-art">✦</div><button>♡</button></div><div className="product-info"><h3>{name}</h3><p>{price}</p></div></article>)}</section><Footer onNavigate={onNavigate} /></div>;
}

function Masterclass({ onNavigate }) {
  return <div className="master-page"><header className="master-header"><button onClick={() => onNavigate('collection')}><Logo /></button><nav>{['Home', 'About', 'Evenreoom ™', 'Private Readings', 'Soulpath Reset ™', 'Masterclass', 'Library⌄'].map(item => <button className={item === 'Masterclass' ? 'selected' : ''} key={item} onClick={() => item === 'Home' ? onNavigate('collection') : item === 'Masterclass' ? onNavigate('masterclass') : undefined}>{item}</button>)}</nav><button className="menu-button" aria-label="Open menu">☰</button></header><section className="master-hero"><img src={assets.masterclassHero} alt="Hands holding a book" /><div className="hero-shade" /><h1>MASTERCLASS</h1></section><section className="master-intro"><p>THE WISDOM OF THE ANCIENTS, MADE SIMPLE</p><h2>3 SACRED RITES<br /><em>OF A SHAMAN</em></h2><div className="intro-grid"><img src={assets.portrait} alt="Vani Kabir" /><div><p>There are practices that are older than language. Quiet rituals that bring us back to ourselves.</p><p>Join Master Vani Kabir for an intimate journey into the sacred rites of a shaman — designed for the modern seeker.</p><button>Reserve your place <span>↗</span></button></div></div></section><Footer onNavigate={onNavigate} /></div>;
}

function Footer({ onNavigate }) { return <footer><Logo /><div><button onClick={() => onNavigate('collection')}>Shop</button><button onClick={() => onNavigate('masterclass')}>Masterclass</button><button>Contact</button></div><span>© 2026 Vani Kabir Studio</span></footer>; }

function App() {
  const [page, setPage] = useState(() => window.location.hash.replace('#', '') || 'landing');
  const navigate = (next) => { setPage(next); window.location.hash = next; window.scrollTo({ top: 0, behavior: 'smooth' }); };
  useEffect(() => { const onHash = () => setPage(window.location.hash.replace('#', '') || 'landing'); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash); }, []);
  if (page === 'collection') return <Collection onNavigate={navigate} />;
  if (page === 'masterclass') return <Masterclass onNavigate={navigate} />;
  return <Landing onNavigate={navigate} />;
}

createRoot(document.getElementById('root')).render(<App />);
