import { useMemo, useState } from 'react';
import {
  ArrowRight, BriefcaseBusiness, Coins, GraduationCap, Heart, HeartHandshake,
  Moon, Plane, ShieldCheck, Sun
} from 'lucide-react';
import { products } from './data.js';

const journalPosts = [
  {
    slug: 'aumatrix-origin-grid',
    category: 'Aumatrix',
    title: 'Aumatrix 2.0: The Return of the Origin Grid',
    image: '/images/studio/divine-diwali-stilllife.jpg',
    excerpt: 'A closer look at the geometry, symbols and stories behind the Aumatrix collection.'
  },
  {
    slug: 'green-aventurine-bracelet',
    category: 'About crystals',
    title: 'Green Aventurine Bracelet Benefits: Meaning and Uses',
    image: '/images/studio/nephrite-bracelet.jpg',
    excerpt: 'Explore the colour, character and care of green aventurine in an everyday bracelet.'
  },
  {
    slug: 'hidden-power-of-crystals',
    category: 'About crystals',
    title: 'The Hidden Power of Crystals: How They Can Change Your Life',
    image: '/images/studio/studio-altar.jpg',
    excerpt: 'A grounded introduction to choosing, caring for and setting intentions with crystals.'
  },
  {
    slug: 'origin-of-ancestry-day',
    category: 'Ancestry',
    title: 'The Origin of Ancestry Day',
    image: '/images/studio/sanctuary-landscape.jpg',
    excerpt: 'A reflective studio journal on family stories, remembrance and meaningful rituals.'
  },
  {
    slug: 'ancient-tools-for-modern-rituals',
    category: 'Ancient tools',
    title: 'Ancient Tools for Everyday Rituals',
    image: '/images/studio/circle-healing.jpg',
    excerpt: 'Simple ways to bring thoughtfully chosen ritual objects into the rhythm of a day.'
  },
  {
    slug: 'pendants-with-purpose',
    category: 'Pendant',
    title: 'Choosing a Pendant That Feels Like Yours',
    image: '/images/studio/silver-coin.jpg',
    excerpt: 'A short guide to materials, wear and choosing a piece that carries personal meaning.'
  }
];

const journalCategories = ['All', 'About crystals', 'Ancestry', 'Ancient tools', 'Aumatrix', 'Pendant'];

const gemstoneGroups = [
  {
    title: 'Precious gemstones',
    stones: [
      ['Emerald', '#14a56b'], ['Ruby', '#dc234e'], ['Yellow Sapphire', '#f2bb26'],
      ['Orange Sapphire', '#ec7624'], ['Blue Sapphire', '#3979cf'], ['Pearl', '#e8dfcb'],
      ['Green Garnet', '#38945c'], ['Red Garnet', '#9b2340']
    ]
  },
  {
    title: 'Semi-precious gemstones',
    stones: [
      ['Amazonite', '#48c4bd'], ['Amethyst', '#9260df'], ['Ametrine', '#a66ddb'],
      ['Aquamarine', '#75cbe0'], ['Black Tourmaline', '#343b38'], ['Citrine', '#e5ad39'],
      ['Green Aventurine', '#58a56d'], ['Lapis Lazuli', '#3e65a8'],
      ['Rose Quartz', '#d998a8'], ['Turquoise', '#36aaa3']
    ]
  }
];

const intentionShortcuts = [
  ['Wealth', 'wealth', Coins], ['Health', 'health', HeartHandshake], ['Career', 'career', BriefcaseBusiness],
  ['Love', 'love', Heart], ['Education', 'education', GraduationCap],
  ['Stress & anxiety', 'stress-anxiety', Moon], ['Protection', 'protection', ShieldCheck],
  ['Divine connection', 'divine-connection', Sun], ['Settle abroad', 'settle-abroad', Plane]
];

function SectionTitle({ eyebrow, title, href, linkLabel = 'View all' }) {
  return <div className="reference-section-title">
    <div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2></div>
    {href && <a href={href}>{linkLabel} <ArrowRight size={14} /></a>}
  </div>;
}

export function StoreHome({ productSection }) {
  const bestsellers = ['diwali-sheet', 'nine-day-bath-ritual', 'saturday-home-ritual', 'obsidian-shani-yantra'];
  const arrivals = ['sacred-geometry-toran', 'october-mercury-sheet', 'october-new-moon-sheet', 'october-full-moon-sheet'];
  const mixels = ['property-mixel', 'luxury-blockage-mixel', 'breakthrough-mixel', 'pisces-zodiac-mixel'];
  const testimonials = [
    ['“Master told me to keep Pyrite on my work desk. Within 11 days, I received a long-stalled payment.”', 'Raghav T.', 'Hyderabad, India'],
    ['“I never understood crystals until I found a piece that felt personal to me. It became a reminder to pause and return to my intention.”', 'Aranya R.', 'Delhi, India'],
    ['“I booked a reading and she suggested a Tanzanite bracelet. It didn’t sleep the first night—it was that powerful.”', 'Lucas M.', 'Lisbon, Portugal']
  ];

  return <main className="store-home">
    <section className="home-intention">
      <SectionTitle title="Explore with intention" />
      <nav className="home-intention-grid" aria-label="Shop by intention">
        {intentionShortcuts.map(([title, slug, Icon]) => <a href={`/pages/explore-with-intention?intention=${slug}`} key={slug}>
          <Icon size={27} strokeWidth={1.15} aria-hidden="true" /><span>{title}</span>
        </a>)}
      </nav>
    </section>
    {productSection('Bestsellers', bestsellers, '/collections/divine-diwali')}
    {productSection('New arrivals', arrivals, '/collections/whats-new')}

    <section className="rare-energy-banner">
      <img src="/images/studio/nephrite-bracelet.jpg" alt="Gemstone bracelet arranged on a warm neutral surface" />
      <div><span>RARE ENERGIES</span><h2>Pieces you won’t find everywhere.</h2><a href="/collections/rare">Discover rare pieces <ArrowRight size={15} /></a></div>
    </section>

    <section className="lightcoding-story">
      <div><span>MAKING SPIRITUALITY SIMPLE</span><h2>LIGHTCODING</h2></div>
      <p>Lightcoding is a language of energy, symbols and frequencies. Explore thoughtfully selected crystals and objects as personal reminders of the intentions you choose to carry.</p>
      <a href="/pages/studio">Lightcoding vs energising <ArrowRight size={15} /></a>
    </section>

    {productSection('Magic mixels', mixels, '/collections/bracelets/magic-mixels')}

    <section className="featured-bracelet">
      <a className="featured-bracelet-image" href="/products/stone-of-hope">
        <img src="/images/studio/nephrite-bracelet.jpg" alt="Stone of Hope gemstone bracelet" />
      </a>
      <div><span>BLESSING OF THE MONTH</span><h2>Stone of Hope<br />Variscite Bracelet</h2><p>A hand-selected gemstone bracelet and a quiet reminder of hope, renewal and a fresh perspective.</p><strong>Rs. 2,626</strong><a className="button button-dark" href="/products/stone-of-hope">Shop now <ArrowRight size={15} /></a></div>
    </section>

    <div className="studio-marquee" aria-label="Lightcoded crystals sold, India's most trusted crystal store">
      <span>5 MILLION+ LIGHTCODED CRYSTALS SOLD · INDIA’S MOST TRUSTED CRYSTAL STORE ·</span>
      <span aria-hidden="true">5 MILLION+ LIGHTCODED CRYSTALS SOLD · INDIA’S MOST TRUSTED CRYSTAL STORE ·</span>
    </div>

    <section className="home-gemstones">
      <SectionTitle eyebrow="A guide to the stones" title="Know your gemstone" href="/pages/gemstones" />
      <div className="home-gemstone-links">
        {gemstoneGroups[0].stones.slice(0, 4).map(([name, color]) => <a href="/pages/gemstones" key={name}><span className="gemstone-orb" style={{ '--gem': color }} /><span>{name}</span></a>)}
      </div>
      <a className="text-link" href="/pages/gemstones">Explore gemstones <ArrowRight size={14} /></a>
    </section>

    <section className="meet-master-feature">
      <img src="/images/future-founder-portrait.webp" alt="A woman in a softly lit, botanical reading space" />
      <div><span>OPEN TO SEE YOUR FUTURE</span><h2>MEET YOUR GUIDE</h2><p>A welcoming studio for thoughtful reflection, learning and meaningful rituals.</p><a href="/pages/studio">Discover the studio <ArrowRight size={15} /></a></div>
      <aside><span>YOUR FIRST STEP TO HEALING YOURSELF IS BY COMING TO A READING</span><a href="/pages/studio">Book a reading <ArrowRight size={14} /></a></aside>
    </section>

    <section className="soulstars-section">
      <div><span>TESTIMONIALS</span><h2>VOICE<br />OF THE<br />SOULSTARS</h2></div>
      <div className="testimonial-track">{testimonials.map(([quote, name, place]) => <article key={name}><p>{quote}</p><strong>{name}</strong><span>{place}</span></article>)}</div>
    </section>

    <section className="journal-preview">
      <SectionTitle eyebrow="From the studio" title="The Journal" href="/blogs" linkLabel="View all stories" />
      <div className="journal-preview-grid">{journalPosts.slice(0, 4).map((post) => <a className="journal-preview-card" href={`/blogs/${post.slug}`} key={post.slug}>
        <img src={post.image} alt="" /><span>{post.title}</span>
      </a>)}</div>
    </section>

    <section className="social-preview">
      <div><span>OPEN TO SEE YOUR FUTURE</span><h2>STUDIO MOMENTS</h2></div>
      <div className="social-photo-grid">
        {[...journalPosts.slice(0, 4)].map((post) => <a href={`/blogs/${post.slug}`} key={post.slug} aria-label={`Read ${post.title}`}><img src={post.image} alt="" /></a>)}
      </div>
    </section>

    <nav className="home-more-links" aria-label="Explore the studio">
      <a href="/pages/explore-with-intention">Explore with intention</a>
      <a href="/pages/gemstones">Studio gems</a>
      <a href="/blogs">Blogs</a>
      <a href="/pages/studio">Meet the master</a>
      <a href="/collections/e-studio">E-Studio</a>
    </nav>
  </main>;
}

export function JournalPage({ pathname }) {
  const [category, setCategory] = useState('All');
  const articleSlug = pathname.startsWith('/blogs/') ? pathname.split('/')[2] : '';
  const article = journalPosts.find((post) => post.slug === articleSlug);
  const visiblePosts = useMemo(() => category === 'All'
    ? journalPosts
    : journalPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase()), [category]);

  if (article) return <main className="journal-article-page">
    <a className="text-link" href="/blogs">← All blogs</a>
    <span className="eyebrow">{article.category}</span>
    <h1>{article.title}</h1>
    <img src={article.image} alt="" />
    <p className="journal-article-lede">{article.excerpt}</p>
    <p>At Open to See Your Future, each object begins with curiosity: how a material feels, where it comes from, and what meaning someone chooses to give it. A stone can be a beautiful piece of nature and a personal reminder to pause, reflect and return to an intention.</p>
    <p>Choose pieces with care, learn about their materials, and follow the care guidance that suits them. Rituals are personal practices, not promises of a particular result.</p>
    <a className="button button-dark" href="/collections/crystals">Explore crystals <ArrowRight size={15} /></a>
  </main>;

  return <main className="journal-page">
    <div className="journal-heading"><span>OPEN TO SEE YOUR FUTURE · JOURNAL</span><h1>Stories from the studio</h1><p>Stories, guides and notes to explore at your own pace.</p></div>
    <nav className="journal-categories" aria-label="Filter blog posts">
      {journalCategories.map((item) => <button type="button" className={category === item ? 'active' : ''} aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}
    </nav>
    <div className="journal-featured">
      {visiblePosts[0] && <a href={`/blogs/${visiblePosts[0].slug}`} className="journal-feature-image"><img src={visiblePosts[0].image} alt="" /><span>FEATURED STORY</span></a>}
      <div className="journal-feature-copy"><span>{visiblePosts[0]?.category || 'Studio journal'}</span><h2>{visiblePosts[0]?.title || 'Stories from the studio'}</h2><p>{visiblePosts[0]?.excerpt || 'Explore thoughtful notes from the studio.'}</p><a href={visiblePosts[0] ? `/blogs/${visiblePosts[0].slug}` : '/blogs'}>Read more <ArrowRight size={14} /></a></div>
    </div>
    <section className="journal-grid" aria-label="Blog articles">
      {visiblePosts.slice(1).map((post) => <a className="journal-card" href={`/blogs/${post.slug}`} key={post.slug}>
        <img src={post.image} alt="" /><span>{post.category}</span><h2>{post.title}</h2><p>{post.excerpt}</p><span className="journal-read-more">Read more <ArrowRight size={13} /></span>
      </a>)}
      {!visiblePosts.length && <p>No stories in this category yet.</p>}
    </section>
  </main>;
}

function GemstoneOrb({ name, color }) {
  return <span className="gemstone-art" role="img" aria-label={`${name} gemstone`} style={{ '--gem': color }}>
    <span /><span /><span /><span /><span />
  </span>;
}

export function GemstonesPage() {
  return <main className="gemstone-page">
    <header className="gemstone-heading"><span className="eyebrow">A considered guide</span><h1>Know your gemstone</h1><p>Discover precious and semi-precious stones, and explore the natural colours and character that make every gem distinct.</p></header>
    {gemstoneGroups.map((group) => <section className="gemstone-group" key={group.title}>
      <h2>{group.title}</h2>
      <div className="gemstone-grid">{group.stones.map(([name, color]) => <a className="gemstone-card" href="/collections/crystals" key={name}>
        <div><GemstoneOrb name={name} color={color} /></div><span>{name}</span>
      </a>)}</div>
    </section>)}
    <section className="gemstone-note"><span>FROM THE STUDIO</span><h2>Know what’s yours.</h2><p>Explore crystals and gemstone pieces chosen for their natural beauty, considered materials and place in a personal practice.</p><a className="button button-dark" href="/collections/crystals">Shop crystals <ArrowRight size={14} /></a></section>
  </main>;
}

export function StudioPage() {
  return <main className="studio-page">
    <section className="studio-hero">
      <img src="/images/future-founder-portrait.webp" alt="A woman in a softly lit, botanical reading space" />
      <div><span>OPEN TO SEE YOUR FUTURE</span><h1>Meet your guide</h1><p>A thoughtful space for reflection, learning and a more personal approach to spirituality.</p></div>
      <aside><span>Your first step to healing yourself is by coming to a reading.</span><a href="#studio-reading">Book a reading <ArrowRight size={14} /></a></aside>
    </section>
    <section className="studio-story">
      <span className="eyebrow">A note from the studio</span><h2>Intention, material and meaning.</h2>
      <p>Open to See Your Future brings together crystals, meaningful objects and learning experiences. Each piece is selected as a considered companion for a personal practice—made to invite reflection, not promise an outcome.</p>
      <a className="button button-dark" href="/pages/3-sacred-rites-of-a-shaman">Explore the masterclass <ArrowRight size={14} /></a>
    </section>
    <section className="studio-lightcoding"><div><span>MAKING SPIRITUALITY SIMPLE</span><h2>LIGHTCODING</h2></div><p>Lightcoding is the language of symbols and frequencies. In personal practices, objects may serve as reminders of the intentions someone chooses to carry.</p><a href="/pages/gemstones">Know your gemstone <ArrowRight size={14} /></a></section>
    <section className="studio-reading" id="studio-reading"><span className="eyebrow">Private readings</span><h2>A conversation with intention.</h2><p>Explore available studio learning and reading pathways. Booking and fulfilment need to be confirmed with the studio before launch.</p><a className="button button-dark" href="/pages/3-sacred-rites-of-a-shaman">Explore studio experiences <ArrowRight size={14} /></a></section>
  </main>;
}

