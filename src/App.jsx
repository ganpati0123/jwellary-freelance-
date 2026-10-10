import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUp, Camera, ChevronDown, ChevronRight, Eye, Globe2, Heart, House, Menu,
  RotateCcw, Search, ShoppingBag, SlidersHorizontal, Sparkles, UserRound, X,
  Play
} from 'lucide-react';
import {
  getSession, hasSupabaseConfig, onAuthStateChange, signIn, signOut, signUp, startCheckout
} from './lib/supabase.js';
import { collections, getCollection, getCollectionProducts, products } from './data.js';
import { getNavigationSubcollection, getSubcollectionProducts, navigationMenus } from './navigation.js';

const navCollections = collections;
const quizQuestions = [
  { title: 'What energy do you need the most today?', options: ['Peace & emotional balance', 'Confidence & motivation', 'Luck, money & opportunities'] },
  { title: 'Which colour are you most drawn to right now?', options: ['Green / Teal', 'Red / Orange / Gold', 'White / Blue / Purple'] },
  { title: 'If today could give you one gift, what would you choose?', options: ['Clarity for decisions', 'Strength to take action', 'Abundance & prosperity'] },
  { title: 'What feels most important for you right now?', options: ['Healing & emotional support', 'Growth in career or business', 'Spiritual protection & intuition'] },
  { title: 'What kind of energy do you want to attract today?', options: ['Love, harmony & relationships', 'Success, wealth & recognition', 'Protection & spiritual alignment'] }
];
const quizOutcomes = {
  A: { tags: ['Calm', 'Healing', 'Heart'], title: 'Your energy today is calling for calm, healing & harmony', description: 'Your answers invite you to slow down and make room for softness. These companions are chosen to support a gentler return to yourself.', items: ['crystal-rose', 'rose-om', 'crystal-quartz', 'spirit-deck'] },
  B: { tags: ['Confidence', 'Growth', 'Opportunity'], title: 'Your energy today is calling for confidence & growth', description: 'There is momentum in your answers. We gathered pieces for clear intention, brave movement and the opportunities you are ready to meet.', items: ['wealth-elixir', 'wealth-mixel', 'money-oil', 'money-cheque'] },
  C: { tags: ['Wealth', 'Spiritual', 'Intuition'], title: 'Your energy today is calling for wealth, spiritual alignment & intuition', description: 'Your answers carry a beautiful mix of energies, so we selected crystals from the strongest pools that align with you today.', items: ['wealth-elixir', 'wealth-mixel', 'money-oil', 'money-cheque'] }
};
const filterOptions = {
  Color: ['Amber', 'Black', 'Blue', 'Green', 'Ivory', 'Jade green', 'Rose', 'Gold', 'Violet'],
  'Crystals Type': ['Natural', 'Lightcoded', 'Mixed gemstones'],
  Material: ['Brass', 'Gemstones', 'Natural crystal', 'Silver', 'Terracotta'],
  'Product Type': ['Bracelet', 'Crystal point', 'Ritual object', 'Oracle cards', 'Digital practice'],
  Crystal: ['Ametrine', 'Aventurine', 'Clear quartz', 'Citrine', 'Jade', 'Lapis lazuli', 'Rose quartz', 'Pyrite'],
  Intention: ['Abundance', 'Clarity', 'Healing', 'Intuition', 'Love', 'Protection', 'Prosperity']
};
const currencyData = {
  INR: { sign: 'Rs.', multiplier: 1 },
  USD: { sign: '$', multiplier: 0.012 },
  EUR: { sign: '€', multiplier: 0.011 }
};
const collectionAliases = {
  'aumatrix-2-0': 'aumatrix-2',
  'aumatrix-2.0': 'aumatrix-2',
  'divine-diwali-season-4': 'divine-diwali',
  'divini-diwali-season-4': 'divine-diwali',
  'start-here': 'whats-new',
  'mvk-picks': 'mvk-verified',
  'pure-bracelet-2026': 'bracelets',
  'magic-mixels-2026': 'bracelets',
  'gemstones-2026': 'crystals',
  'e-studio-2026': 'e-studio',
  'new-arrivals': 'whats-new'
};

function Brand({ large = false }) {
  return <a className={`brand ${large ? 'brand-large' : ''}`} href="/" aria-label="Vani Kabir Studio home">
    <svg className="brand-mark" viewBox="0 0 48 54" fill="none" aria-hidden="true">
      <path d="M9 6c4 3 8 3 15 0v42c-7-3-11-3-15 0M39 6c-4 3-8 3-15 0v42c7-3 11-3 15 0M8 13c4 4 8 4 16 1M40 13c-4 4-8 4-16 1M8 41c4-4 8-4 16-1M40 41c-4-4-8-4-16-1" stroke="currentColor" strokeWidth="1.45" />
      <path d="M17 5c0 9-4 12-4 22s4 13 4 22m14-44c0 9 4 12 4 22s-4 13-4 22M23 6v42M5 27h38M11 21l8 6-8 6m26-12-8 6 8 6" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="24" cy="27" r="3.4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
    <span className="brand-name">Vani Kabir Studio</span>
    <span className="brand-caption">Making spirituality simple</span>
  </a>;
}

function Header({ routeSlug, cartCount, wishlistCount, onAction }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const headerRef = useRef(null);
  const active = navCollections.find((item) => item.slug === routeSlug)?.slug;

  useEffect(() => {
    if (!openMenu && !mobileOpen) return undefined;
    const dismiss = (event) => {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
      if (event.type === 'pointerdown' && !headerRef.current?.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', dismiss);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', dismiss);
    };
  }, [openMenu, mobileOpen]);

  const toggleMenu = (slug) => setOpenMenu((current) => current === slug ? null : slug);
  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return <>
    <div className="announcement">Domestic shipping in 3–5 business days · A little more care in every parcel</div>
    <header className="site-header" ref={headerRef}>
      <div className="header-main">
        <button className="header-action mobile-nav-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls="mobile-collections-menu" onClick={() => { setMobileOpen(!mobileOpen); setOpenMenu(null); }}>
          {mobileOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
        <button className="header-action" aria-label="Search" onClick={() => onAction('search')}><Search size={19} strokeWidth={1.5} /></button>
        <Brand />
        <div className="header-tools">
          <button className="header-action" aria-label="Account information" onClick={() => onAction('account')}><UserRound size={18} strokeWidth={1.5} /></button>
          <button className="header-action" aria-label={`Wishlist, ${wishlistCount} saved`} onClick={() => onAction('wishlist')}><Heart size={19} strokeWidth={1.5} /><span className="tool-count">{wishlistCount || ''}</span></button>
          <button className="header-action" aria-label={`Shopping bag, ${cartCount} items`} onClick={() => onAction('cart')}><ShoppingBag size={18} strokeWidth={1.5} /><span className="tool-count">{cartCount || ''}</span></button>
        </div>
      </div>
      <nav className="desktop-nav" aria-label="Collections" onMouseLeave={() => setOpenMenu(null)}>
        {navigationMenus.map((item) => <div className={`desktop-nav-item ${active === item.slug ? 'active' : ''} ${openMenu === item.slug ? 'open' : ''}`} key={item.slug} onMouseEnter={() => setOpenMenu(item.slug)} onMouseMove={() => setOpenMenu(item.slug)} onPointerEnter={() => setOpenMenu(item.slug)} onPointerDown={() => setOpenMenu(item.slug)}>
          <button type="button" className="desktop-nav-trigger" aria-expanded={openMenu === item.slug} aria-controls={`mega-menu-${item.slug}`} onFocus={() => setOpenMenu(item.slug)} onClick={() => toggleMenu(item.slug)}>
            <span className="nav-star" aria-hidden="true">✦</span>
            <span>{item.title.replace(' - Season 4', '')}</span>
            <ChevronDown className="nav-chevron" size={11} aria-hidden="true" />
          </button>
          {openMenu === item.slug && <div className="mega-menu" id={`mega-menu-${item.slug}`} onMouseEnter={() => setOpenMenu(item.slug)}>
            <div className="mega-menu-heading">
              <div>
                <span className="mega-menu-kicker">Explore the studio</span>
                <h2>{item.title.replace(' - Season 4', '')}</h2>
              </div>
              <a className="mega-menu-all" href={`/collections/${item.slug}`} onClick={closeMenus}>View all <ArrowRight size={14} /></a>
            </div>
            <div className={`mega-menu-links ${item.items.length > 8 ? 'many-links' : ''}`}>
              {item.items.map((child) => <a key={child.slug} href={`/collections/${item.slug}/${child.slug}`} onClick={closeMenus}>
                <span>{child.title}</span><ChevronRight size={13} aria-hidden="true" />
              </a>)}
            </div>
          </div>}
        </div>)}
      </nav>
      {mobileOpen && <nav className="mobile-menu" id="mobile-collections-menu" aria-label="Mobile collections">
        {navigationMenus.map((item) => <div className="mobile-nav-group" key={item.slug}>
          <button type="button" className={`mobile-nav-trigger ${openMenu === item.slug ? 'open' : ''}`} aria-expanded={openMenu === item.slug} aria-controls={`mobile-submenu-${item.slug}`} onClick={() => toggleMenu(item.slug)}>
            <span>{item.title.replace(' - Season 4', '')}</span><ChevronDown size={14} aria-hidden="true" />
          </button>
          {openMenu === item.slug && <div className="mobile-submenu" id={`mobile-submenu-${item.slug}`}>
            <a className="mobile-view-all" href={`/collections/${item.slug}`} onClick={closeMenus}>View all {item.title.replace(' - Season 4', '')}</a>
            {item.items.map((child) => <a key={child.slug} href={`/collections/${item.slug}/${child.slug}`} onClick={closeMenus}>{child.title}</a>)}
          </div>}
        </div>)}
        <a href="/pages/daily-crystal-quiz" onClick={closeMenus}>Daily crystal quiz</a>
        <a href="/pages/3-sacred-rites-of-a-shaman" onClick={closeMenus}>3 sacred rites masterclass</a>
        <a href="/links" onClick={closeMenus}>Explore all links</a>
      </nav>}
    </header>
  </>;
}

function ProductArtwork({ product, small = false }) {
  const stone = ({
    'Jade green': '#526c56', Green: '#3f795f', 'Green & gold': '#467158', 'Sea green': '#729880',
    Rose: '#cc9b9a', 'Violet & gold': '#84758f', Violet: '#74648a', Blue: '#526a98',
    Turquoise: '#3c9f9e', Amber: '#a56a36', 'Golden yellow': '#c9953a', Gold: '#b18a4b',
    Black: '#323633', 'Smoky brown': '#746255', Cream: '#c4bca8', Ivory: '#ddd7c7', Terracotta: '#b86c45'
  })[product.color] || '#87917d';
  const shape = product.image === 'bracelet' ? 'art-bracelet'
    : product.image === 'crystal' ? 'art-crystal'
      : product.image === 'bowl' ? 'art-bowl'
        : product.image === 'diya' ? 'art-diya'
          : product.image === 'oil' ? 'art-oil'
            : product.image === 'paper' ? 'art-paper'
              : product.image === 'card' ? 'art-card'
                : product.image === 'figure' ? 'art-figure'
                  : 'art-stone';
  return <div className={`product-visual ${product.asset ? 'has-photo' : ''} ${small ? 'small-art' : ''}`} role="img" aria-label={`${product.name}, ${product.productType}`}>
    {product.asset
      ? <img className="product-photo" src={product.asset} alt="" />
      : <>
        <div className="art-surface" />
        <div className="art-halo" />
        <div className={`art-object ${shape}`} style={{ '--stone': stone }} />
      </>}
    {!small && <span className="product-badge">Exclusive</span>}
  </div>;
}

function ProductCard({ product, currency, onFavorite, favorite, onQuickView, onAdd }) {
  return <article className="product-card">
    <div className="product-visual-wrap">
      <div onClick={() => onQuickView(product)} role="button" tabIndex={0} aria-label={`Quick view ${product.name}`} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onQuickView(product); } }}>
        <ProductArtwork product={product} />
      </div>
      <div className="product-actions">
        <button className={favorite ? 'is-favorite' : ''} aria-label={favorite ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => onFavorite(product.id)}><Heart size={15} fill={favorite ? 'currentColor' : 'none'} strokeWidth={1.5} /></button>
        <button aria-label={`Quick view ${product.name}`} onClick={() => onQuickView(product)}><Eye size={15} strokeWidth={1.5} /></button>
      </div>
    </div>
    <div className="product-info">
      <div className="product-meta-line"><span>{product.productType || 'Studio piece'}</span><span>Hand-finished</span></div>
      <h3><a className="product-name-link" href={`/products/${product.id}`}>{product.name}</a></h3>
      <p className="product-intention">For {product.intention?.toLowerCase() || 'your ritual'}</p>
      <div className="product-bottom">
        <p className="product-price">{formatPrice(product.price, currency)}</p>
        <button className="add-small" onClick={() => onAdd(product)}>Add to bag <ArrowRight size={13} /></button>
      </div>
    </div>
  </article>;
}

function formatPrice(price, currency) {
  const { sign, multiplier } = currencyData[currency] || currencyData.INR;
  const value = Math.round(price * multiplier);
  return `${sign}${currency === 'INR' ? value.toLocaleString('en-IN') : value.toLocaleString('en-US')}`;
}

function Modal({ children, onClose, className = '', labelId }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    const focusable = () => dialogRef.current?.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])');
    const items = focusable();
    (items?.[0] || dialogRef.current)?.focus?.();
    const key = (event) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key !== 'Tab') return;
      const currentItems = focusable();
      if (!currentItems?.length) { event.preventDefault(); dialogRef.current?.focus(); return; }
      const first = currentItems[0];
      const last = currentItems[currentItems.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', key);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={dialogRef} className={`modal ${className}`} role="dialog" aria-modal="true" aria-labelledby={labelId} tabIndex={-1}>{children}</div>
  </div>;
}

function ProductModal({ product, currency, onClose, onAdd }) {
  if (!product) return null;
  return <Modal onClose={onClose} className="quick-view-modal">
    <button className="modal-close" aria-label="Close quick view" onClick={onClose}><X size={17} /></button>
    <div className="quick-view">
      <ProductArtwork product={product} />
      <div className="quick-copy">
        <span className="eyebrow">{product.collection.replaceAll('-', ' ')}</span>
        <h2>{product.name}</h2>
        <p>{formatPrice(product.price, currency)}</p>
        <p className="quick-description">A thoughtful companion for {product.intention.toLowerCase()}. Made with {product.material.toLowerCase()} and chosen for its own natural character. Every piece arrives with space for your own practice.</p>
        <div className="product-spec-grid"><div><span>Stone</span><strong>{product.crystalType || 'Natural stone'}</strong></div><div><span>Material</span><strong>{product.material}</strong></div><div><span>Intention</span><strong>{product.intention}</strong></div><div><span>Edition</span><strong>Small batch</strong></div></div>
        <div className="quick-perks"><span>Complimentary shipping</span><span>Gift-ready packaging</span></div>
        <button className="button button-dark quick-add" onClick={() => { onAdd(product); onClose(); }}>Add to bag <ArrowRight size={15} /></button>
        <p className="demo-note" style={{ marginTop: 17 }}>Demo storefront — this action adds the item to your local sample bag. No payment is taken.</p>
      </div>
    </div>
  </Modal>;
}

function ProductPage({ product, currency, onAdd, onQuickView }) {
  if (!product) return null;
  return <main className="product-detail-page">
    <div className="product-detail-breadcrumb"><a href="/">Home</a><span>/</span><span>{product.collection.replaceAll('-', ' ')}</span><span>/</span><strong>{product.name}</strong></div>
    <div className="product-detail-layout">
      <section className="product-detail-gallery"><ProductArtwork product={product} /><div className="gallery-caption"><span>01 / 01</span><span>Studio still life · Small batch</span></div></section>
      <section className="product-detail-copy"><span className="eyebrow">{product.productType || 'Studio piece'} · Vani Kabir Studio</span><h1>{product.name}</h1><div className="detail-price-row"><strong>{formatPrice(product.price, currency)}</strong><span>Complimentary shipping</span></div><p className="detail-intro">A considered piece for {product.intention.toLowerCase()}, made with {product.material.toLowerCase()} and chosen for its quiet, natural character.</p><div className="detail-divider" /><div className="detail-facts"><div><span>Stone</span><strong>{product.crystalType || 'Natural stone'}</strong></div><div><span>Intention</span><strong>{product.intention}</strong></div><div><span>Material</span><strong>{product.material}</strong></div><div><span>Edition</span><strong>Small batch</strong></div></div><button className="button button-dark detail-add" onClick={() => onAdd(product)}>Add to bag <ArrowRight size={15} /></button><button className="detail-secondary" onClick={() => onQuickView(product)}>View care & details <span>↓</span></button><div className="detail-accordions"><details open><summary>About this piece <span>+</span></summary><p>Every piece is selected for its own texture, tone and presence. Natural variation is part of what makes yours singular.</p></details><details><summary>Shipping & gifting <span>+</span></summary><p>Carefully packed, gift-ready and dispatched with complimentary shipping.</p></details></div></section>
    </div>
  </main>;
}

function FilterDrawer({ close, filters, setFilters, onApply, sort, setSort, inStockOnly, setInStockOnly }) {
  const [openGroup, setOpenGroup] = useState('Price');
  const [minPrice, setMinPrice] = useState(filters.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || '');
  const toggleFilter = (group, item) => {
    setFilters((old) => {
      const current = old[group] || [];
      return { ...old, [group]: current.includes(item) ? current.filter((value) => value !== item) : [...current, item] };
    });
  };
  const reset = () => { setFilters({}); setInStockOnly(false); setMinPrice(''); setMaxPrice(''); };
  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <aside className="drawer" role="dialog" aria-modal="true" aria-label="Collection filters">
      <div className="drawer-head"><h2>Filters</h2><button className="icon-button" aria-label="Close filters" onClick={close}><X size={19} /></button></div>
      <div className="drawer-content">
        <label className="eyebrow" htmlFor="drawer-sort">Sort by</label>
        <select id="drawer-sort" className="filter-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Alphabetically</option>
        </select>
        <div className="filter-group">
          <button onClick={() => setInStockOnly(!inStockOnly)}>In stock only <span>{inStockOnly ? '●' : '○'}</span></button>
        </div>
        {['Price', ...Object.keys(filterOptions)].map((group) => <section className="filter-group" key={group}>
          <button aria-expanded={openGroup === group} onClick={() => setOpenGroup(openGroup === group ? '' : group)}>{group}<ChevronDown size={14} /></button>
          {openGroup === group && (group === 'Price'
            ? <div className="filter-options">
              <input aria-label="Minimum price" className="filter-sort" type="number" min="0" placeholder="From ₹" value={minPrice} onChange={(event) => { setMinPrice(event.target.value); setFilters((old) => ({ ...old, minPrice: event.target.value })); }} />
              <input aria-label="Maximum price" className="filter-sort" type="number" min="0" placeholder="To ₹" value={maxPrice} onChange={(event) => { setMaxPrice(event.target.value); setFilters((old) => ({ ...old, maxPrice: event.target.value })); }} />
            </div>
            : <div className="filter-options">{filterOptions[group].map((item) => <button key={item} className={`filter-chip ${(filters[group] || []).includes(item) ? 'selected' : ''}`} onClick={() => toggleFilter(group, item)}>{item}</button>)}</div>)}
        </section>)}
      </div>
      <div className="drawer-foot"><button className="button button-light" onClick={reset}>Reset</button><button className="button button-dark" onClick={() => { onApply(); close(); }}>Apply filters</button></div>
    </aside>
  </div>;
}

function CartDrawer({ close, items, currency, onQuantity, onQuickView, session, showToast }) {
  const entries = Object.entries(items).filter(([, quantity]) => quantity > 0).map(([id, quantity]) => ({ product: products.find((product) => product.id === id), quantity })).filter((entry) => entry.product);
  const subtotal = entries.reduce((total, entry) => total + entry.product.price * entry.quantity, 0);
  const checkout = async () => {
    if (!session) { showToast('Please sign in before checkout.'); return; }
    try {
      await startCheckout({ amountInr: subtotal, user: session.user, onSuccess: () => { showToast('Payment received. Thank you for your order.'); close(); }, onFailure: () => showToast('Payment could not be completed. Please try again.') });
    } catch (error) {
      showToast(error?.message?.includes('RAZORPAY') ? 'Payment setup is not configured yet.' : 'Checkout is unavailable right now.');
    }
  };
  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <aside className="drawer drawer-right" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="drawer-head"><h2>Your bag <span style={{ font: '12px var(--sans)' }}>({entries.reduce((sum, entry) => sum + entry.quantity, 0)})</span></h2><button className="icon-button" aria-label="Close bag" onClick={close}><X size={19} /></button></div>
      <div className="drawer-content">
        {entries.length ? entries.map(({ product, quantity }) => <div className="cart-line" key={product.id}>
          <div className="cart-thumb" role="button" tabIndex={0} aria-label={`Quick view ${product.name}`} onClick={() => onQuickView(product)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onQuickView(product); } }}><ProductArtwork product={product} small /></div>
          <div><h3>{product.name}</h3><p>{formatPrice(product.price, currency)}</p><div className="quantity-control">
            <button aria-label={`Reduce quantity of ${product.name}`} onClick={() => onQuantity(product.id, -1)}>−</button>
            <span>{quantity}</span>
            <button aria-label={`Increase quantity of ${product.name}`} onClick={() => onQuantity(product.id, 1)}>+</button>
          </div></div>
          <button className="icon-button" aria-label={`Remove ${product.name}`} onClick={() => onQuantity(product.id, -quantity)}><X size={14} /></button>
        </div>) : <div className="empty-state"><Sparkles size={25} strokeWidth={1.3} /><h2>A little space for something lovely.</h2><p>Your bag is waiting for a meaningful find.</p><button className="button button-dark" onClick={close}>Keep exploring</button></div>}
      </div>
      {entries.length > 0 && <div className="drawer-foot" style={{ display: 'block' }}>
        <div className="cart-total"><span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span></div>
        <p className="demo-note">Secure checkout powered by Razorpay. Sign in is required to place an order.</p>
        <a className="button button-dark checkout-button" href="/checkout" onClick={(event) => { if (!entries.length) event.preventDefault(); }}>Proceed to checkout <ArrowRight size={15} /></a>
      </div>}
    </aside>
  </div>;
}

function WishlistDrawer({ close, favorites, currency, onFavorite, onQuickView, onAdd }) {
  const liked = products.filter((product) => favorites.includes(product.id));
  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <aside className="drawer drawer-right" role="dialog" aria-modal="true" aria-label="Wishlist">
      <div className="drawer-head"><h2>Your saved pieces</h2><button className="icon-button" aria-label="Close wishlist" onClick={close}><X size={19} /></button></div>
      <div className="drawer-content">
        {!liked.length && <div className="empty-state"><Heart size={24} strokeWidth={1.3} /><h2>Keep the ones that call to you.</h2><p>Tap a heart on any piece to save it here.</p></div>}
        {liked.map((product) => <div className="cart-line" key={product.id}>
          <div className="cart-thumb" role="button" tabIndex={0} aria-label={`Quick view ${product.name}`} onClick={() => onQuickView(product)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onQuickView(product); } }}><ProductArtwork product={product} small /></div>
          <div><h3>{product.name}</h3><p>{formatPrice(product.price, currency)}</p><button className="add-small" style={{ opacity: 1 }} onClick={() => onAdd(product)}>Add to bag</button></div>
          <button className="icon-button" aria-label={`Remove ${product.name} from wishlist`} onClick={() => onFavorite(product.id)}><Heart size={15} fill="currentColor" /></button>
        </div>)}
      </div>
    </aside>
  </div>;
}

function SearchModal({ query, setQuery, close, onQuickView }) {
  const results = query.trim() ? products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : [];
  return <Modal onClose={close} className="search-modal">
    <button className="modal-close" aria-label="Close search" onClick={close}><X size={17} /></button>
    <span className="eyebrow">Find your next companion</span>
    <h2>Search the studio</h2>
    <label className="header-search"><Search size={18} /><input autoFocus value={query} placeholder="Try citrine, bracelet, intention…" onChange={(event) => setQuery(event.target.value)} aria-label="Search all products" /></label>
    <div className="search-results">
      {query.trim() && results.length === 0 && <p className="demo-note">No pieces found for “{query}”. Try a broader word such as crystal or bracelet.</p>}
      {results.map((product) => <div className="search-row" key={product.id}><button onClick={() => onQuickView(product)}>{product.name}</button><span>{formatPrice(product.price, 'INR')}</span></div>)}
      {!query.trim() && <p className="demo-note">Begin with a product name, crystal or intention.</p>}
    </div>
  </Modal>;
}

function AuthModal({ close, session, onSession, showToast }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      const result = mode === 'signin' ? await signIn(email, password) : await signUp(email, password, displayName);
      if (result.error) throw result.error;
      if (mode === 'signup' && !result.data?.session) showToast('Check your email to confirm your account.');
      else { onSession(result.data?.session || null); close(); showToast('Welcome back to the studio.'); }
    } catch (error) {
      showToast(error.message?.toLowerCase().includes('invalid') ? 'Invalid email or password.' : 'We could not complete that request. Please try again.');
    } finally { setBusy(false); }
  };
  return <Modal onClose={close} className="search-modal auth-modal">
    <button className="modal-close" aria-label="Close account" onClick={close}><X size={17} /></button>
    <span className="eyebrow">Your studio account</span>
    <h2>{session ? 'Welcome back' : mode === 'signin' ? 'Sign in' : 'Create your account'}</h2>
    {session ? <div className="auth-account"><p>{session.user.email}</p><button className="button button-dark" onClick={async () => { await signOut(); onSession(null); close(); showToast('You have been signed out.'); }}>Sign out</button></div> : <form className="auth-form" onSubmit={submit}>
      {mode === 'signup' && <input required value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Your name" aria-label="Your name" />}
      <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" aria-label="Email address" />
      <input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" aria-label="Password" />
      <button className="button button-dark" disabled={busy || !hasSupabaseConfig()}>{busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'} <ArrowRight size={15} /></button>
      {!hasSupabaseConfig() && <p className="demo-note">Account access is not configured in this preview.</p>}
      <button type="button" className="button button-text" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>{mode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in'}</button>
    </form>}
  </Modal>;
}

function CheckoutPage({ items, currency, session, onQuantity, showToast }) {
  const entries = Object.entries(items).filter(([, quantity]) => quantity > 0).map(([id, quantity]) => ({ product: products.find((product) => product.id === id), quantity })).filter((entry) => entry.product);
  const subtotal = entries.reduce((total, entry) => total + entry.product.price * entry.quantity, 0);
  const formatted = (value) => `${currencyData[currency].sign} ${(value * currencyData[currency].multiplier).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  const pay = async () => {
    if (!session) { showToast('Please sign in before checkout.'); return; }
    try { await startCheckout({ amountInr: subtotal, user: session.user, onSuccess: () => showToast('Payment received. Thank you for your order.'), onFailure: () => showToast('Payment could not be completed. Please try again.') }); }
    catch (error) { showToast(error?.message?.includes('RAZORPAY') ? 'Payment setup is not configured yet.' : 'Checkout is unavailable right now.'); }
  };
  return <main className="checkout-page">
    <div className="checkout-topline"><a href="/" className="checkout-back">← Continue shopping</a><span>Secure checkout · Vani Kabir Studio</span></div>
    <div className="checkout-layout">
      <section className="checkout-form-panel">
        <span className="eyebrow">A considered final step</span><h1>Complete your order.</h1><p className="checkout-lede">Your pieces are held with care. Add your details below and continue to a secure payment experience.</p>
        <div className="checkout-form-grid"><label>First name<input placeholder="Your first name" /></label><label>Last name<input placeholder="Your last name" /></label><label className="full">Email address<input type="email" value={session?.user?.email || ''} placeholder="you@example.com" readOnly={!!session?.user?.email} /></label><label className="full">Delivery address<input placeholder="House number, street and area" /></label><label>City<input placeholder="City" /></label><label>Postal code<input placeholder="Postal code" /></label></div>
        <div className="checkout-assurance"><span>✦</span><div><strong>Made for a meaningful moment</strong><p>Each order is packed intentionally and dispatched with care.</p></div></div>
      </section>
      <aside className="checkout-summary"><div className="summary-heading"><span>Your order</span><span>{entries.reduce((sum, entry) => sum + entry.quantity, 0)} items</span></div>{entries.length ? entries.map(({ product, quantity }) => <div className="summary-line" key={product.id}><ProductArtwork product={product} small /><div><strong>{product.name}</strong><span>Qty {quantity}</span><button onClick={() => onQuantity(product.id, -1)}>Remove</button></div><b>{formatted(product.price * quantity)}</b></div>) : <div className="empty-checkout"><p>Your bag is waiting.</p><a href="/collections/whats-new">Explore the collection</a></div>}<div className="summary-total"><span>Subtotal</span><b>{formatted(subtotal)}</b></div><div className="summary-total muted"><span>Shipping</span><span>Complimentary</span></div><button className="button button-dark checkout-pay" onClick={pay} disabled={!entries.length}>Continue to secure payment <ArrowRight size={15} /></button><p className="payment-note">Payments are securely processed by Razorpay. Your card details never touch our studio.</p></aside>
    </div>
  </main>;
}

function Footer({ showToast }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    if (!email.includes('@')) { showToast('Please enter a valid email address.'); return; }
    setSubmitted(true);
    setEmail('');
  };
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand-block">
        <Brand large />
        <h2>Be a Soulstar! Join The Tribe.</h2>
        <form className="newsletter-form" onSubmit={submit}>
          <input aria-label="Your email address" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />
          <button type="submit" aria-label="Join the newsletter"><ArrowRight size={18} strokeWidth={1.3} /></button>
        </form>
        {submitted && <div className="form-feedback" role="status">You’re on the list. Look out for a note from the studio.</div>}
      </div>
      <div className="footer-about">
        <p>Vani Kabir Studio is a modern house for sacred and ancient tools offering Evernoon Lightcoded™ crystals and gemstones. These high-vibrational companions can help you clear your energy field and return to a path of abundance and possibility.</p>
        <div className="footer-links">
          <div><h3>Orders & Returns</h3><a href="#disclaimer">Shipping Policy</a><a href="#disclaimer">Exchange & Refund Policy</a><a href="#disclaimer">Cancellation Policy</a></div>
          <div><h3>Privacy</h3><a href="#disclaimer">Privacy Policy</a><a href="#disclaimer">Mobile App Privacy Policy</a><a href="#disclaimer">GDPR Policy</a><a href="#disclaimer">Do Not Sell My Personal Info</a></div>
          <div><h3>Legal & Information</h3><a href="#disclaimer">Terms & Conditions</a><a href="#disclaimer">Fair Pricing Philosophy</a><a href="#disclaimer">Disclaimer</a></div>
        </div>
      </div>
    </div>
    <div className="disclaimer" id="disclaimer">
      <h3>*Intellectual Property Disclaimer</h3>
      <p>All trademarks, product names, concepts, formulations, designs and associated creative elements featured on this website are the intellectual property of Vani Kabir Multiverse and/or are protected under applicable intellectual property laws. They have been independently created and developed by us. Any unauthorized use, imitation, reproduction, adaptation, or sale, in whole or in part, by any individual, company, or entity is strictly prohibited and may constitute a violation of our intellectual property rights.</p>
    </div>
    <div className="landscape-footer" role="img" aria-label="Illustrated mountain sanctuary with waterfalls, temples and a lake" />
    <img className="footer-trust-strip" src="/attached_assets/generated_images/trust-strip.jpg" alt="Authenticity and quality assurance marks" />
    <div className="footer-bottom"><span>© 2026 Vani Kabir Studio. Making spirituality simple.</span><div className="socials"><a aria-label="Instagram" href="https://instagram.com"><Camera size={13} /></a><a aria-label="Studio website" href="/links"><Globe2 size={13} /></a><a aria-label="YouTube" href="https://youtube.com"><Play size={13} /></a></div></div>
  </footer>;
}

const directoryLinks = [
  ['Blessing Of The Month', 'https://www.vanikabirstudio.com/products/varicite-stone-of-hope?_pos=1&_psq=stone+of&_psid=24fa415d7&_ss=e'],
  ['Europe Collection Season - 3', 'https://www.vanikabirstudio.com/pages/with-love-from-europe-season-3'],
  ['Ancestry Manifestation Sheet - October', 'https://www.vanikabirstudio.com/collections/whats-new/products/october-ancestry-manifestation-sheet'],
  ['New Lightcoded Mixels @1919', 'https://www.vanikabirstudio.com/collections/start-here'],
  ['MVK Verified', 'https://www.vanikabirstudio.com/collections/mvk-picks'],
  ['New Arrivals', 'https://www.vanikabirstudio.com/collections/whats-new'],
  ['Pure Bracelets', 'https://www.vanikabirstudio.com/collections/pure-bracelet-2026'],
  ['Magic Mixel Bracelets', 'https://www.vanikabirstudio.com/collections/magic-mixels-2026'],
  ['Know Your Gemstone Form', 'https://pages.razorpay.com/know-your-gemstone'],
  ['Gemstones', 'https://www.vanikabirstudio.com/collections/gemstones-2026'],
  ['E-Studio', 'https://www.vanikabirstudio.com/collections/e-studio-2026'],
  ['Learn About Crystals', 'https://www.vanikabirstudio.com/blogs/news']
];

function DirectoryLinks() {
  return <>
    <div className="directory-list">{directoryLinks.map(([label, href]) => <a key={label} className="directory-link" href={href}>{label}</a>)}</div>
    <p className="directory-policy">
      <a href="https://www.vanikabirstudio.com/pages/terms-conditions" target="_blank" rel="noreferrer">Terms of Use</a>
      <span>·</span>
      <a href="https://www.vanikabirstudio.com/pages/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>
    </p>
  </>;
}

function Home({ onOpenQuiz }) {
  return <main className="link-home-page">
    <div className="link-home">
      <header className="link-home-intro">
        <Brand large />
        <p>Vani Kabir Studio is a modern house for sacred and ancient tools offering Evernoon Lightcoded™ crystals and gemstones. Trusted in 104 countries since 2021.</p>
        <div className="home-socials" aria-label="Studio social links">
          <a href="https://www.instagram.com/vanikabirstudio/" aria-label="Instagram" target="_blank" rel="noreferrer"><Camera size={19} strokeWidth={1.7} /></a>
          <a href="https://www.vanikabirstudio.com/" aria-label="Studio website" target="_blank" rel="noreferrer"><Globe2 size={19} strokeWidth={1.7} /></a>
          <a href="https://www.youtube.com/@mastervanikabir" aria-label="YouTube" target="_blank" rel="noreferrer"><Play size={18} fill="currentColor" strokeWidth={1.5} /></a>
        </div>
        <button className="home-quiz-trigger" onClick={onOpenQuiz} type="button">
          <Sparkles size={15} aria-hidden="true" /> Take the 5-question crystal quiz
        </button>
      </header>
      <div className="home-campaign-promos">
        <a className="home-campaign" href="https://www.vanikabirstudio.com/collections/divini-diwali-season-4" aria-label="Explore the Aumatrix 2.0 Divine Diwali collection">
          <img src="/attached_assets/generated_images/divine-diwali-campaign.jpg" alt="Aumatrix 2.0 collection: Divine Diwali" />
        </a>
        <a className="home-rite-card" href="https://vanikabir.com/masterclass/" aria-label="Explore the 3 Sacred Rites of a Shaman masterclass">
          <img src="/attached_assets/generated_images/sacred-rites-poster.jpg" alt="3 Sacred Rites of a Shaman masterclass with Master Vani Kabir, 16 October 2026" />
        </a>
      </div>
      <DirectoryLinks />
    </div>
  </main>;
}

function CollectionPage({ collection, subcollection, currency, favorites, onFavorite, onQuickView, onAdd }) {
  const [filters, setFilters] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [applied, setApplied] = useState(false);
  const sourceItems = useMemo(() => subcollection
    ? getSubcollectionProducts(collection.slug, subcollection.slug)
    : getCollectionProducts(collection.slug), [collection.slug, subcollection?.slug]);
  const pageTitle = subcollection?.title || collection.title;
  const pageDescription = subcollection
    ? `Explore ${subcollection.title} in the ${collection.title} edit. Browse related pieces from the studio, then refine by color, crystal, material and intention.`
    : collection.description;
  const visible = useMemo(() => {
    let list = [...sourceItems];
    if (inStockOnly) list = list.filter((item) => item.inStock);
    const hasValues = (group, actual) => !(filters[group]?.length) || filters[group].some((value) => actual.toLowerCase().includes(value.toLowerCase()) || value.toLowerCase().includes(actual.toLowerCase()));
    list = list.filter((item) => {
      if (!hasValues('Color', item.color)) return false;
      if (!hasValues('Material', item.material)) return false;
      if (filters['Crystals Type']?.length && !filters['Crystals Type'].some((value) => {
        if (value === 'Natural') return /natural/i.test(item.material);
        if (value === 'Lightcoded') return /lightcoded/i.test(item.name);
        return /mixed/i.test(item.material);
      })) return false;
      if (!hasValues('Crystal', item.crystalType)) return false;
      if (!hasValues('Intention', item.intention)) return false;
      if (!hasValues('Product Type', item.productType)) return false;
      const min = Number(filters.minPrice || 0);
      const max = Number(filters.maxPrice || 0);
      return item.price >= min && (!max || item.price <= max);
    });
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [sourceItems, filters, inStockOnly, sort]);
  const clearFilters = () => { setFilters({}); setInStockOnly(false); setApplied(false); };
  return <main>
    <section className="collection-heading">
      <div className="crumbs"><a href="/" aria-label="Home"><House size={14} strokeWidth={1.5} /></a><span>/</span><a href={`/collections/${collection.slug}`}>Collections</a><span>/</span><a href={`/collections/${collection.slug}`}>{collection.title}</a>{subcollection && <><span>/</span><span>{subcollection.title}</span></>}</div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
    </section>
    <section className="collection-toolbar" aria-label="Collection tools">
      <div className="toolbar-start"><button className="toolbar-button" onClick={() => setFilterOpen(true)}><SlidersHorizontal size={14} /> Show filters</button><span className="result-count">{visible.length} pieces</span></div>
      <div className="toolbar-end"><span className="sort-label">Sort by:</span><select aria-label="Sort products" className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Alphabetically</option></select></div>
    </section>
    {applied && (Object.keys(filters).length > 0 || inStockOnly) && <div style={{ padding: '9px 3.2%', fontSize: 10, color: 'var(--ink-soft)' }}>Filters applied · <button className="button-text" onClick={clearFilters}>Clear all</button></div>}
    <section className="product-grid" aria-label={`${pageTitle} products`}>
      {visible.length ? visible.map((product) => <ProductCard key={product.id} product={product} currency={currency} favorite={favorites.includes(product.id)} onFavorite={onFavorite} onQuickView={onQuickView} onAdd={onAdd} />) :
        <div className="empty-state"><Sparkles size={23} strokeWidth={1.3} /><h2>Nothing in this particular light.</h2><p>Try widening your filters to see more of the collection.</p><button className="button button-light" onClick={clearFilters}>Reset filters</button></div>}
    </section>
    {filterOpen && <FilterDrawer close={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} onApply={() => setApplied(true)} sort={sort} setSort={setSort} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} />}
  </main>;
}

function DirectoryPage() {
  return <main className="directory-page">
    <Brand large />
    <h1 className="directory-title">A place for every path.</h1>
    <p className="directory-intro">Explore our collections, learning spaces and everyday rituals. Follow what feels right for you.</p>
    <DirectoryLinks />
  </main>;
}

function MasterclassPage() {
  return <main>
    <section className="rite-hero">
      <div className="rite-copy">
        <span className="eyebrow">Masterclass with Master Vani Kabir</span>
        <h1><em>3 Sacred Rites</em><br />of a Shaman</h1>
        <p>You don’t have to be a Shaman to learn them.</p>
        <p>Discover ancient shamanic ways of working with simple elements of the Earth: a stone, a plant and a thread. Through Body Stone, Plant Dita and Thread Work, learn to release, reconnect and consciously work with intentions, bonds and everyday life.</p>
        <p className="small-label">Friday, 16 October 2026 · 7 pm to 9 pm IST</p>
        <p className="rite-price">Energy exchange · ₹5,555</p>
        <a className="button button-dark" href="https://vanikabir.com/masterclass/" target="_blank" rel="noreferrer">Book on the official site <ArrowRight size={15} /></a>
      </div>
      <div className="rite-image" role="img" aria-label="Master Vani Kabir in a light editorial portrait from the shaman rites masterclass" />
    </section>
    <section className="rite-details">
      <article className="rite-step"><span>01</span><h2>DISPEL</h2><p>Fears and energies you no longer wish to carry.</p></article>
      <article className="rite-step"><span>02</span><h2>REWIRE</h2><p>Patterns, blocks and intentions with the living Earth.</p></article>
      <article className="rite-step"><span>03</span><h2>RECONNECT</h2><p>With the Great Mother, your inner wisdom and sacred everyday life.</p></article>
    </section>
    <section className="rite-signup">
      <span className="eyebrow">3 Sacred Rites of a Shaman</span>
      <h2>Come closer to the living Earth.</h2>
      <p>Friday, 16 October 2026 · 7 pm to 9 pm IST · Energy exchange ₹5,555</p>
      <a className="button button-dark" href="https://vanikabir.com/masterclass/" target="_blank" rel="noreferrer">Book on the official site <ArrowRight size={15} /></a>
    </section>
  </main>;
}

function QuizPage({ currency, favorites, onFavorite, onQuickView, onAdd, modal = false }) {
  const Page = modal ? 'div' : 'main';
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const resultKey = useMemo(() => {
    const counts = { A: 0, B: 0, C: 0 };
    answers.forEach((answer) => { if (answer) counts[answer] += 1; });
    return counts.C >= counts.B && counts.C >= counts.A ? 'C' : counts.B > counts.A ? 'B' : 'A';
  }, [answers]);
  const result = quizOutcomes[resultKey];
  const choose = (index) => {
    const letter = ['A', 'B', 'C'][index];
    setAnswers((old) => { const next = [...old]; next[step] = letter; return next; });
  };
  const restart = () => { setStep(0); setAnswers([]); };
  const recommended = result.items.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  return <Page className="quiz-page">
    <div className="quiz-top"><span className="eyebrow">Daily crystal quiz</span><h1 className="quiz-title" id={modal ? 'quiz-modal-title' : undefined}>Find your crystal of the day</h1><p>Choose the option that feels most aligned with you today and discover the crystal energy calling you right now.</p></div>
    <div className="quiz-progress"><span>{step < quizQuestions.length ? `Question ${step + 1} / ${quizQuestions.length}` : `${quizQuestions.length} questions complete`}</span><button onClick={restart}>Restart quiz</button></div>
    <div className="progress-track"><div className="progress-fill" style={{ transform: `scaleX(${Math.min(step, quizQuestions.length) / quizQuestions.length})` }} /></div>
    {step < quizQuestions.length ? <>
      <h2 className="quiz-question">{quizQuestions[step].title}</h2>
      <div className="answer-list">{quizQuestions[step].options.map((option, index) => {
        const letter = ['A', 'B', 'C'][index];
        return <button key={option} className={`answer-option ${answers[step] === letter ? 'chosen' : ''}`} aria-pressed={answers[step] === letter} onClick={() => choose(index)}><span className="answer-letter">{letter}</span>{option}</button>;
      })}</div>
      <div className="quiz-nav">{step > 0 && <button className="button button-text" onClick={() => setStep(step - 1)}>Back</button>}<button className="button button-dark" disabled={!answers[step]} onClick={() => setStep(step + 1)}>{step === quizQuestions.length - 1 ? 'See my crystals' : 'Next'} <ArrowRight size={15} /></button></div>
    </> : <section className="quiz-result">
      <span className="eyebrow">Crystal of the day</span><h2 className="quiz-result-title">{result.title}</h2><p>{result.description}</p>
      <div className="result-tags">{result.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="recommend-grid">{recommended.map((product) => <ProductCard key={product.id} product={product} currency={currency} favorite={favorites.includes(product.id)} onFavorite={onFavorite} onQuickView={onQuickView} onAdd={onAdd} />)}</div>
      <div className="quiz-result-actions"><button className="button button-text" onClick={restart}><RotateCcw size={14} /> Retake quiz</button><a className="button button-dark" href="/collections/crystals">Shop all crystals <ArrowRight size={15} /></a></div>
    </section>}
  </Page>;
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const pathSegments = path.split('/').filter(Boolean);
  const incomingCollectionSlug = pathSegments[0] === 'collections' ? pathSegments[1] : null;
  const incomingSubcollectionSlug = pathSegments[0] === 'collections' ? pathSegments[2] : null;
  const collectionSlug = incomingCollectionSlug ? collectionAliases[incomingCollectionSlug] || incomingCollectionSlug : null;
  const collection = collectionSlug ? getCollection(collectionSlug) : null;
  const subcollection = collectionSlug && incomingSubcollectionSlug
    ? getNavigationSubcollection(collectionSlug, incomingSubcollectionSlug)
    : null;
  const home = path === '/';
  const directory = ['/links', '/pages/links', '/pages/link-in-bio'].includes(path);
  const checkout = path === '/checkout';
  const productRoute = pathSegments[0] === 'products'
    || (pathSegments[0] === 'collections' && pathSegments[2] === 'products');
  const productSlug = productRoute ? pathSegments[pathSegments.length - 1] : null;
  const product = productSlug ? products.find((item) => item.id === productSlug
    || item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') === productSlug) : null;
  const productDetail = productRoute && !!product;
  const showStoreChrome = !home && !directory && !checkout;
  const [currency, setCurrency] = useState('INR');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('vani-studio-cart') || '{}'); }
    catch { return {}; }
  });
  const [favorites, setFavorites] = useState([]);
  const [drawer, setDrawer] = useState('');
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quickProduct, setQuickProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState('');
  const [session, setSession] = useState(null);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__vaniToast);
    window.__vaniToast = window.setTimeout(() => setToast(''), 2800);
  };
  const actions = (action, value) => {
    if (action === 'search') setDrawer('search');
    if (action === 'search-query') setSearchQuery(value);
    if (action === 'cart') setDrawer('cart');
    if (action === 'wishlist') setDrawer('wishlist');
    if (action === 'account') setDrawer('account');
  };
  const addToCart = (product) => {
    setCart((old) => ({ ...old, [product.id]: (old[product.id] || 0) + 1 }));
    showToast(`${product.name} added to your demo bag.`);
  };
  const quantityChange = (id, delta) => setCart((old) => {
    const next = Math.max(0, (old[id] || 0) + delta);
    const updated = { ...old, [id]: next };
    if (!next) delete updated[id];
    return updated;
  });
  const toggleFavorite = (id) => setFavorites((old) => old.includes(id) ? old.filter((item) => item !== id) : [...old, id]);

  useEffect(() => { window.scrollTo(0, 0); }, [path]);
  useEffect(() => {
    try { window.localStorage.setItem('vani-studio-cart', JSON.stringify(cart)); }
    catch { /* Keep shopping functional for this visit if storage is disabled. */ }
  }, [cart]);
  useEffect(() => {
    let alive = true;
    getSession().then(({ data }) => { if (alive) setSession(data?.session || null); }).catch(() => {});
    const listener = onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => {
      alive = false;
      listener?.data?.subscription?.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (!home) return undefined;
    try {
      if (window.sessionStorage.getItem('vani-crystal-quiz-skipped') === 'true') return undefined;
    } catch { /* Continue without persistence if browser storage is disabled. */ }
    const timer = window.setTimeout(() => setQuizModalOpen(true), 250);
    return () => window.clearTimeout(timer);
  }, [home]);
  const closeQuizModal = () => {
    setQuizModalOpen(false);
    try { window.sessionStorage.setItem('vani-crystal-quiz-skipped', 'true'); } catch { /* Keep close usable when storage is blocked. */ }
  };
  const collectionValid = !!collection && (!incomingSubcollectionSlug || !!subcollection);
  const content = home ? <Home onOpenQuiz={() => setQuizModalOpen(true)} />
    : productDetail ? <ProductPage product={product} currency={currency} onAdd={addToCart} onQuickView={setQuickProduct} />
      : checkout ? <CheckoutPage items={cart} currency={currency} session={session} onQuantity={quantityChange} showToast={showToast} />
        : collectionValid ? <CollectionPage collection={collection} subcollection={subcollection} currency={currency} favorites={favorites} onFavorite={toggleFavorite} onQuickView={setQuickProduct} onAdd={addToCart} />
      : ['/pages/daily-crystal-quiz', '/pages/crystal-quiz'].includes(path) ? <QuizPage currency={currency} favorites={favorites} onFavorite={toggleFavorite} onQuickView={setQuickProduct} onAdd={addToCart} />
      : ['/masterclass', '/pages/3-sacred-rites-of-a-shaman', '/pages/shaman-masterclass', '/pages/3-sacred-rites'].includes(path) ? <MasterclassPage />
          : ['/links', '/pages/links', '/pages/link-in-bio'].includes(path) ? <DirectoryPage />
            : <main className="directory-page"><span className="eyebrow">The studio</span><h1 className="directory-title">This path is still unfolding.</h1><p className="directory-intro">The page you’re looking for hasn’t been gathered here yet.</p><a className="button button-dark" href="/">Return to the beginning</a></main>;
  return <div className="app-shell">
    {showStoreChrome && <Header routeSlug={collectionSlug} cartCount={cartCount} wishlistCount={favorites.length} onAction={actions} />}
    {content}
    {!home && <Footer showToast={showToast} />}
    {showStoreChrome && <div className="fixed-currency"><label className="sr-only" htmlFor="currency">Currency</label><select id="currency" className="currency-select" value={currency} onChange={(event) => setCurrency(event.target.value)}><option value="INR">INR⌄</option><option value="USD">USD⌄</option><option value="EUR">EUR⌄</option></select></div>}
    {drawer === 'cart' && <CartDrawer close={() => setDrawer('')} items={cart} currency={currency} session={session} showToast={showToast} onQuantity={quantityChange} onQuickView={(product) => { setDrawer(''); setQuickProduct(product); }} />}
    {drawer === 'wishlist' && <WishlistDrawer close={() => setDrawer('')} favorites={favorites} currency={currency} onFavorite={toggleFavorite} onQuickView={(product) => { setDrawer(''); setQuickProduct(product); }} onAdd={addToCart} />}
    {drawer === 'search' && <SearchModal query={searchQuery} setQuery={setSearchQuery} close={() => setDrawer('')} onQuickView={(product) => { setDrawer(''); setQuickProduct(product); }} />}
    {drawer === 'account' && <AuthModal session={session} onSession={setSession} close={() => setDrawer('')} showToast={showToast} />}
    {quickProduct && <ProductModal product={quickProduct} currency={currency} onClose={() => setQuickProduct(null)} onAdd={addToCart} />}
    {home && quizModalOpen && <Modal onClose={closeQuizModal} className="quiz-modal" labelId="quiz-modal-title">
      <div className="quiz-modal-toolbar">
        <span className="eyebrow">A moment for you</span>
        <button type="button" className="quiz-modal-skip" onClick={closeQuizModal}>Skip for now <X size={15} /></button>
      </div>
      <QuizPage modal currency={currency} favorites={favorites} onFavorite={toggleFavorite} onQuickView={(item) => { closeQuizModal(); setQuickProduct(item); }} onAdd={addToCart} />
    </Modal>}
    {toast && <div className="toast" role="status">{toast}</div>}
    {showStoreChrome && <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} strokeWidth={1.5} /></button>}
  </div>;
}

export default App;
