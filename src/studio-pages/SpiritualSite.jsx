import { useEffect, useState } from 'react';
import './spiritual-site.css';

const A = '/attached_assets/generated_images/';

const destinations = [
  { label: 'Home', href: '/', links: [['About Evernroom', '/pages/evernroom'], ['Private Readings', '/pages/private-readings']] },
  { label: 'About Evernroom', href: '/pages/evernroom', links: [['E-Studio learning', '/collections/e-studio'], ['Vani Kabir Studio stories', '/pages/library/category/vani-kabir-studio']] },
  { label: 'Private Readings', href: '/pages/private-readings', links: [['Contact the studio', '/pages/contact'], ['A reading is a conversation', '/pages/library/a-reading-is-a-conversation']] },
  { label: 'Soulpath Reset', href: '/pages/soulpath-reset', links: [['Long reads', '/pages/library/category/long-reads'], ['Contact the studio', '/pages/contact']] },
  { label: 'Masterclass', href: '/masterclass', links: [['Explore E-Studio', '/collections/e-studio'], ['About Evernroom', '/pages/evernroom']] },
  { label: 'Celebrity', href: '/pages/celebrity', links: [['Studio stories', '/pages/library/category/vani-kabir-studio'], ['Visit the library', '/pages/library']] },
  { label: 'Library', href: '/pages/library', links: [['Case studies', '/pages/library/category/case-studies'], ['Long reads', '/pages/library/category/long-reads'], ['Vani Kabir Studio', '/pages/library/category/vani-kabir-studio']] }
];

const articles = [
  {
    slug: 'a-reading-is-a-conversation',
    category: 'Case studies',
    title: 'A reading is a conversation, not a verdict',
    deck: 'What a thoughtful one-to-one session can make room for: better questions, a little perspective, and the freedom to choose your next step.',
    excerpt: 'A clear-eyed look at how a reading is held, what to bring, and what it can—and cannot—offer.',
    image: 'studio-altar.jpg',
    alt: 'An oil lamp and simple ritual objects in a quiet sunlit studio',
    sections: [
      ['Begin with the question beneath the question', 'People often arrive with a practical question: a decision, a relationship, a season of uncertainty. A reading begins by making space for the context around it. The aim is not to hand someone a fixed answer. It is to listen carefully, reflect what is present, and find a more considered way to meet the moment.'],
      ['Leave room for your own judgement', 'A useful conversation should help you hear yourself more clearly. You remain the expert on your lived experience, your boundaries and your choices. Any insight offered in a session is an invitation to reflect—not an instruction to follow.'],
      ['Take one small thing with you', 'After a session, it can help to write down the question you asked, what surprised you, and one grounded action you want to consider. A small, self-chosen step is often more useful than trying to change everything at once.']
    ]
  },
  {
    slug: 'ritual-without-the-rules',
    category: 'Long reads',
    title: 'Ritual without the rules',
    deck: 'A personal practice does not need elaborate tools or perfect conditions. It needs attention, a little time, and permission to be yours.',
    excerpt: 'Build a simple ritual around ordinary moments, without treating a routine as a test you can fail.',
    image: 'sanctuary-landscape.jpg',
    alt: 'A tranquil illustrated landscape with mountains, water and a quiet temple',
    sections: [
      ['Start with a threshold', 'Choose a moment that already exists: the first cup of tea, the end of a workday, or the few minutes before sleep. A ritual becomes easier to return to when it is attached to a rhythm you already have.'],
      ['Make the gesture small', 'Open a window, place a hand over your heart, or write one honest sentence in a notebook. Repetition can make a gesture meaningful, but the gesture does not need to be grand to matter.'],
      ['Let it change with you', 'A practice should support your life rather than narrow it. If a ritual stops feeling useful, you can adapt it, pause it, or leave it behind. There is no score to keep and no single correct way to pay attention.']
    ]
  },
  {
    slug: 'inside-the-evernroom',
    category: 'Vani Kabir Studio',
    title: 'Inside the Evernroom: a space for returning to yourself',
    deck: 'The thinking behind an intimate learning space where ancient ideas meet the questions of everyday life.',
    excerpt: 'Meet the values that shape the studio: curiosity, care, grounded language and room for individual meaning.',
    image: 'studio-altar.jpg',
    alt: 'A calm studio altar with a small flame and carefully placed objects',
    sections: [
      ['A room, and a way of meeting', 'Evernroom is imagined as a place to pause and pay attention. Its spirit is less about collecting answers and more about learning how to sit with a question, notice what matters, and make space for meaningful conversation.'],
      ['Tradition approached with care', 'Spiritual traditions hold histories and living communities. The studio aims to approach learning with respect, to name what is personal interpretation, and to avoid presenting a single practice as universal.'],
      ['Everyday life stays in the room', 'Reflection is most useful when it can travel back into ordinary life. Learning here is grounded in practical choices, gentle curiosity and the understanding that each person has their own pace.']
    ]
  },
  {
    slug: 'choosing-a-crystal-with-intention',
    category: 'Long reads',
    title: 'Choosing a crystal with intention',
    deck: 'A grounded way to choose a stone: begin with what draws your attention, learn about the material, then decide what meaning you want to give it.',
    excerpt: 'A practical guide to curiosity, care and symbolism when choosing a crystal for your own practice.',
    image: 'divine-diwali-stilllife.jpg',
    alt: 'Warmly lit still-life objects arranged for a reflective ritual',
    sections: [
      ['Notice before you name', 'Colour, shape, texture and weight can all draw the eye. Give yourself a moment to notice what you like before reaching for a promised meaning. That preference is a valid starting point.'],
      ['Learn the material story', 'Ask what a stone is, where it comes from when that information is available, and how to care for it. Responsible sourcing and honest descriptions matter more than a dramatic claim.'],
      ['Choose a personal reminder', 'You might use a stone as a tactile reminder to pause, breathe or return to an intention you have chosen. The meaning belongs to your own practice; a crystal is not a substitute for professional medical, financial or mental-health advice.']
    ]
  },
  {
    slug: 'the-language-of-symbols',
    category: 'Case studies',
    title: 'The language of symbols in a personal practice',
    deck: 'How a symbol can become a prompt for reflection without being treated as a prediction or a promise.',
    excerpt: 'Consider symbols as a language for reflection: personal, contextual and open to more than one reading.',
    image: 'sacred-rites-poster.jpg',
    alt: 'A considered masterclass poster featuring Master Vani Kabir',
    sections: [
      ['Meaning depends on context', 'A symbol may carry cultural histories, shared associations and deeply personal memories. A careful reading makes room for those layers rather than reducing a symbol to one universal definition.'],
      ['Ask what it brings forward', 'Instead of asking a symbol to decide for you, try asking what it helps you notice. Does it bring a concern into focus? Does it remind you of a value or a conversation you have been avoiding?'],
      ['Keep interpretation open', 'Symbols can be useful prompts, but they are not proof of what will happen. Hold an interpretation lightly and let evidence, trusted advice and your own judgement inform important decisions.']
    ]
  },
  {
    slug: 'a-studio-note-on-listening',
    category: 'Vani Kabir Studio',
    title: 'A studio note on listening well',
    deck: 'Before advice, a useful conversation makes space for careful listening and clear boundaries.',
    excerpt: 'A short note on the studio’s approach to conversation, consent and personal agency.',
    image: 'sanctuary-landscape.jpg',
    alt: 'A serene illustrated sanctuary landscape in soft natural colours',
    sections: [
      ['Listen for what is actually being asked', 'Good listening starts with curiosity. It means slowing down enough to understand the question, its context and the kind of support a person is seeking.'],
      ['Make limits visible', 'No reading can guarantee an outcome or replace professional care. Naming those limits is part of treating a person and their decisions with respect.'],
      ['Offer a conversation, not control', 'The studio’s intention is to create room for reflection. What someone does with that reflection remains theirs to decide.']
    ]
  }
];

const categoryDefinitions = [
  { slug: 'case-studies', title: 'Case studies', intro: 'Thoughtful examples of how reflection, symbolic language and meaningful questions can be approached in everyday life.', filter: 'Case studies' },
  { slug: 'long-reads', title: 'Long reads', intro: 'Patient explorations of ritual, symbolism and spiritual learning, written to leave room for your own point of view.', filter: 'Long reads' },
  { slug: 'vani-kabir-studio', title: 'Vani Kabir Studio', intro: 'Notes from the studio: its values, learning spaces and the care behind a more personal approach to spirituality.', filter: 'Vani Kabir Studio' }
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export function SpiritualSiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (!mobileOpen && !openMenu) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, openMenu]);

  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  return <div className="vk-spiritual vk-spiritual-header">
    <div className="vk-announcement">A thoughtful space for reflection, learning and ritual</div>
    <header className="vk-header-main">
      <div className="vk-header-note">Making spirituality simple</div>
      <a className="vk-brand" href="/" aria-label="Vani Kabir Studio home">
        <span className="vk-brand-monogram" aria-hidden="true">VK</span>
        <span className="vk-brand-name">Vani Kabir Studio</span>
        <span className="vk-brand-caption">Evernroom · A space to return</span>
      </a>
      <div className="vk-header-actions">
        <button className="vk-menu-button" type="button" aria-expanded={mobileOpen} aria-controls="vk-mobile-menu" onClick={() => { setMobileOpen((value) => !value); setOpenMenu(null); }}>
          <span className="vk-menu-icon" aria-hidden="true"><i /><i /></span>
          <span>{mobileOpen ? 'Close' : 'Explore'}</span>
        </button>
      </div>
    </header>
    <nav className="vk-desktop-nav" aria-label="Studio destinations" onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(':hover')) setOpenMenu(null);
    }}>
      {destinations.map((item, index) => <div className="vk-nav-item" key={item.label} onMouseEnter={() => setOpenMenu(index)} onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) setOpenMenu(null);
      }}>
        <a className="vk-nav-trigger" href={item.href} aria-haspopup="true" aria-expanded={openMenu === index} aria-controls={`vk-destination-${index}`} onFocus={() => setOpenMenu(index)}>{item.label}</a>
        {openMenu === index && <div className="vk-dropdown" id={`vk-destination-${index}`}>
          <span>Explore {item.label}</span>
          {item.links.map(([label, href]) => <a href={href} key={href} onClick={closeAll}>{label}<Arrow /></a>)}
        </div>}
      </div>)}
    </nav>
    {mobileOpen && <nav className="vk-mobile-nav" id="vk-mobile-menu" aria-label="Mobile studio destinations">
      {destinations.map((item, index) => <div className="vk-mobile-group" key={item.label}>
        <div className="vk-mobile-row">
          <a className="vk-mobile-link" href={item.href} onClick={closeAll}>{item.label}</a>
          <button className="vk-mobile-expand" type="button" aria-label={`${openMenu === index ? 'Hide' : 'Show'} ${item.label} links`} aria-expanded={openMenu === index} aria-controls={`vk-mobile-sub-${index}`} onClick={() => setOpenMenu((current) => current === index ? null : index)}>
            <span aria-hidden="true">{openMenu === index ? '−' : '+'}</span>
          </button>
        </div>
        {openMenu === index && <div className="vk-mobile-submenu" id={`vk-mobile-sub-${index}`}>
          {item.links.map(([label, href]) => <a href={href} key={href} onClick={closeAll}>{label}</a>)}
        </div>}
      </div>)}
    </nav>}
  </div>;
}

function SectionHeading({ eyebrow, title, description, href, linkLabel = 'Explore the library', dark = false }) {
  return <div className="vk-section-heading">
    <div>
      {eyebrow && <span className="vk-eyebrow">{eyebrow}</span>}
      <h2 className="vk-serif">{title}</h2>
    </div>
    {description && <p>{description}</p>}
    {href && <a className={`vk-text-link ${dark ? 'vk-light-link' : ''}`} href={href}>{linkLabel}<Arrow /></a>}
  </div>;
}

const toolCards = [
  ['01', 'A small pause', 'An invitation to put down the noise and notice what is asking for your attention.', '/pages/soulpath-reset'],
  ['02', 'The reading room', 'A personal conversation to help you explore a question with care and perspective.', '/pages/private-readings'],
  ['03', 'Ritual, made personal', 'A practice can begin with an ordinary moment and become meaningful through attention.', '/pages/evernroom'],
  ['04', 'Learn at your pace', 'Explore spiritual ideas with clear language, curiosity and room to reflect.', '/collections/e-studio'],
  ['05', 'A thoughtful object', 'Explore the existing studio collections as personal reminders, chosen with intention.', '/collections/crystals']
];

const testimonials = [
  ['“A good question leaves room for your own answer.”', 'Studio principle'],
  ['“Reflection can be a beginning, not a verdict.”', 'Studio principle'],
  ['“Stay curious. Keep your own judgement close.”', 'Studio principle'],
  ['“A meaningful practice should make room for real life.”', 'Studio principle']
];

export function SpiritualHomePage({ productSection }) {
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  const duplicatedTools = [...toolCards, ...toolCards];
  const previewArticles = [articles[0], articles[1], articles[2]];
  return <main className="vk-spiritual vk-home">
    <section className="vk-home-hero">
      <div className="vk-home-hero-copy">
        <span className="vk-eyebrow">Vani Kabir Studio · Evernroom</span>
        <h1 className="vk-serif">A little space<br />to hear your <em>own wisdom.</em></h1>
        <p>Personal readings, spiritual learning and stories from the studio—held with care, curiosity and room for your own meaning.</p>
        <a className="vk-button" href="/pages/evernroom">Explore the studio <Arrow /></a>
      </div>
      <div className="vk-hero-visual">
        <img src={`${A}studio-altar.jpg`} alt="A quiet studio altar with candlelight, a crystal and prayer beads" />
        <span className="vk-hero-caption">A moment of stillness, in the studio</span>
      </div>
      <div className="vk-hero-seal" aria-hidden="true"><span>VK</span><span>A space to return</span></div>
    </section>

    <section className="vk-home-intro">
      <div>
        <span className="vk-eyebrow">Come as you are</span>
        <h2 className="vk-serif">Spirituality can feel <em>human.</em></h2>
      </div>
      <div className="vk-home-intro-copy">
        <p>We believe reflection should meet you where you are. Not with a set of rules, but with attentive conversation, thoughtful learning and practices that make sense in the life you already live.</p>
        <p>Explore at your own pace. Take what is useful. Keep your own judgement close.</p>
        <a className="vk-text-link" href="/pages/private-readings">Meet the reading experience <Arrow /></a>
      </div>
    </section>

    <section className="vk-experience-band">
      <SectionHeading eyebrow="Ways to begin" title="Choose the door that feels right." description="A one-to-one conversation, a learning space or a moment to reset. Each offers a different way into reflection." dark />
      <div className="vk-experience-grid">
        <a className="vk-experience-card" href="/pages/private-readings">
          <img src={`${A}studio-altar.jpg`} alt="" />
          <div><small>One-to-one · Personal reflection</small><h3>A reading, held with care.</h3><p>Bring a question, a transition or simply the wish to pause and look again.</p><span className="vk-card-link">Explore private readings <Arrow /></span></div>
        </a>
        <a className="vk-experience-card" href="/pages/evernroom">
          <img src={`${A}sacred-rites-poster.jpg`} alt="" />
          <div><small>Evernroom · Spiritual learning</small><h3>Learn with an open mind.</h3><p>Explore ideas, tools and practices in a space built for questions.</p><span className="vk-card-link">Enter Evernroom <Arrow /></span></div>
        </a>
        <a className="vk-experience-card" href="/pages/soulpath-reset">
          <img src={`${A}sanctuary-landscape.jpg`} alt="" />
          <div><small>A gentle pause · Self-guided</small><h3>Make room for a reset.</h3><p>A grounded moment to notice what you need and choose a next step.</p><span className="vk-card-link">Explore Soulpath Reset <Arrow /></span></div>
        </a>
      </div>
    </section>

    <section className="vk-tools-section" aria-label="Continuous rail of studio experiences">
      <SectionHeading eyebrow="A little more to explore" title="Tools for thoughtful moments." description="Browse the studio’s learning experiences and existing collections." />
      <div className="vk-rail-wrap">
        <div className="vk-rail">
          {duplicatedTools.map(([mark, title, description, href], index) => <article className="vk-tool-card" key={`${title}-${index}`}>
            <div className="vk-tool-mark" aria-hidden="true">{mark}</div><small>Studio path</small><h3>{title}</h3><p>{description}</p><a href={href}>Discover more <Arrow /></a>
          </article>)}
        </div>
      </div>
    </section>
    {productSection?.('Sacred Energy Tools', ['diya-infinite', 'bowl-negativity', 'bowl-gold', 'circle-healing'], '/collections/ancient-tools')}

    <section className="vk-studio-story">
      <div className="vk-story-image"><img src={`${A}sanctuary-landscape.jpg`} alt="A richly illustrated sanctuary landscape with mountains, water and a temple" /></div>
      <div className="vk-story-copy">
        <span className="vk-eyebrow">The story behind the space</span>
        <h2 className="vk-serif">Welcome to <em>Evernroom.</em></h2>
        <p>A name for the place we return to when we make room to listen. Evernroom brings together spiritual learning and everyday questions in a setting that values curiosity over certainty.</p>
        <p>Founded by Master Vani Kabir, the studio is an invitation to explore—with care for the traditions we learn from, and respect for the choices each person makes.</p>
        <a className="vk-text-link" href="/pages/evernroom">Discover Evernroom <Arrow /></a>
        <div className="vk-story-note">“A space to reflect, not a script to follow.”</div>
      </div>
    </section>

    <section className="vk-pathways">
      <SectionHeading eyebrow="Find your next step" title="Follow a thread of curiosity." description="You do not need to know exactly what you are looking for. Begin with a question that feels close to you." />
      <div className="vk-pathways-grid">
        <article className="vk-pathway"><span>01 / FOR A PERSONAL QUESTION</span><h3>Private readings</h3><p>A considered one-to-one session with room for listening, perspective and your own decision-making.</p><a href="/pages/private-readings">Explore readings <Arrow /></a></article>
        <article className="vk-pathway"><span>02 / FOR A LEARNING MOMENT</span><h3>Classes at Evernroom</h3><p>Explore spiritual ideas and practices through thoughtful learning and open questions.</p><a href="/collections/e-studio">Browse learning <Arrow /></a></article>
        <article className="vk-pathway"><span>03 / FOR A QUIETER MOMENT</span><h3>Soulpath Reset</h3><p>A gentle, self-guided pause to notice what matters and choose a manageable next step.</p><a href="/pages/soulpath-reset">Take a pause <Arrow /></a></article>
      </div>
    </section>

    <section className="vk-quote-band" aria-label="Reflections shared by studio visitors">
      <SectionHeading eyebrow="What guides the work" title="A few thoughts we return to." description="These studio principles guide thoughtful spiritual conversation. They are not client testimonials or promises of an outcome." dark />
      <div className="vk-testimonial-viewport">
        <div className="vk-testimonial-track">
          {duplicatedTestimonials.map(([quote, name], index) => <article className="vk-testimonial" key={`${name}-${index}`}>
            <blockquote>{quote}</blockquote><footer>Vani Kabir Studio · {name}</footer>
          </article>)}
        </div>
      </div>
      <p className="vk-testimonial-disclaimer">Studio principles are shared in place of unverified customer testimonials.</p>
    </section>

    <section className="vk-library-preview">
      <SectionHeading eyebrow="From the library" title="Notes for the in-between." description="Stories and practical thoughts to read slowly, carry with you, or leave for another day." href="/pages/library" />
      <div className="vk-library-grid">
        {previewArticles.map((article) => <article className="vk-library-card" key={article.slug}>
          <a href={`/pages/library/${article.slug}`}><img src={`${A}${article.image}`} alt={article.alt} /></a>
          <span>{article.category}</span><h3>{article.title}</h3><p>{article.excerpt}</p>
          <a href={`/pages/library/${article.slug}`}>Read more <Arrow /></a>
        </article>)}
      </div>
      <div className="vk-library-footer"><a className="vk-button" href="/pages/library">Visit the library <Arrow /></a></div>
    </section>
  </main>;
}

function PageHero({ eyebrow, title, description, image, alt, action, actionHref, imageClass = '' }) {
  return <section className="vk-page-hero">
    <div className="vk-page-hero-copy">
      <span className="vk-eyebrow">{eyebrow}</span>
      <h1 className="vk-serif">{title}</h1>
      <p>{description}</p>
      {action && <a className="vk-button" href={actionHref}>{action}<Arrow /></a>}
    </div>
    <div className={`vk-page-hero-media ${imageClass}`}><img src={`${A}${image}`} alt={alt} /></div>
  </section>;
}

function NumberedSection({ eyebrow, title, description, entries, tone = '' }) {
  return <section className={`vk-content-section ${tone}`}>
    <div className="vk-content-title"><span className="vk-eyebrow">{eyebrow}</span><h2 className="vk-serif">{title}</h2><p>{description}</p></div>
    <div className="vk-numbered-grid">{entries.map(([heading, copy], index) => <article className="vk-numbered-card" key={heading}>
      <span>0{index + 1}</span><h3>{heading}</h3><p>{copy}</p>
    </article>)}</div>
  </section>;
}

function CtaPanel({ eyebrow, title, text, href, label }) {
  return <section className="vk-cta-panel"><span className="vk-eyebrow">{eyebrow}</span><h2 className="vk-serif">{title}</h2><p>{text}</p><a className="vk-button vk-button-light" href={href}>{label}<Arrow /></a></section>;
}

export function EvernroomPage() {
  return <main className="vk-spiritual vk-spiritual-page vk-evernroom">
    <PageHero eyebrow="Vani Kabir Studio · A space to learn" title={<>Welcome to<br /><em>Evernroom.</em></>} description="A thoughtful learning space for spiritual ideas, living traditions and the questions we carry into everyday life." image="sacred-rites-poster.jpg" alt="Master Vani Kabir featured in the Three Sacred Rites masterclass poster" action="Explore learning experiences" actionHref="/collections/e-studio" />
    <section className="vk-page-intro"><span className="vk-eyebrow">A room for questions</span><h2 className="vk-serif">Learning can be both grounded and full of wonder.</h2><p>Evernroom is an invitation to explore practices and perspectives with curiosity. We value clear language, respectful context and the freedom to decide what belongs in your own life.</p></section>
    <NumberedSection eyebrow="The Evernroom approach" title="Come curious. Leave room for yourself." description="Spiritual learning is most meaningful when it offers insight without asking you to hand over your judgement." entries={[
      ['Learn in context', 'Explore ideas with care for their histories and the people who have carried them forward.'],
      ['Ask honest questions', 'No question is too practical or too personal to begin a thoughtful conversation.'],
      ['Keep what is useful', 'Take time to reflect and choose what, if anything, you would like to bring into your own practice.']
    ]} tone="vk-content-sage" />
    <section className="vk-split-section">
      <img src={`${A}studio-altar.jpg`} alt="A sunlit ritual space with an oil lamp and a few thoughtfully placed objects" />
      <div><span className="vk-eyebrow">Learning at your pace</span><h2 className="vk-serif">A practice is not a performance.</h2><p>Some learning begins in a class. Some starts with a page, a conversation or a few quiet minutes at home. Evernroom is designed to make spiritual exploration feel approachable without flattening its depth.</p><p>Explore available sessions and classes in the studio’s existing E-Studio collection.</p><a className="vk-text-link" href="/collections/e-studio">Browse E-Studio <Arrow /></a></div>
    </section>
    <CtaPanel eyebrow="Your next thoughtful hour" title="Bring your curiosity into the room." text="Explore the studio’s current learning experiences and find a place to begin." href="/collections/e-studio" label="See learning experiences" />
  </main>;
}

export function PrivateReadingsPage() {
  return <main className="vk-spiritual vk-spiritual-page vk-private-readings">
    <PageHero eyebrow="A one-to-one conversation" title={<>Make space<br />for a <em>clearer question.</em></>} description="Private readings with Master Vani Kabir offer a dedicated moment for reflection, careful listening and a fresh perspective on what is on your mind." image="studio-altar.jpg" alt="A quiet altar prepared in soft daylight for a reflective conversation" action="Ask about a reading" actionHref="/pages/contact" />
    <section className="vk-page-intro"><span className="vk-eyebrow">Personal reflection</span><h2 className="vk-serif">A reading is a conversation—not a verdict.</h2><p>You do not need to arrive with the perfect words. Bring a question, a feeling, or a situation you would like to look at more closely. The conversation is a space for perspective; your choices remain your own.</p></section>
    <NumberedSection eyebrow="What to expect" title="A considered hour, with room to breathe." description="The shape of each reading follows the person and the question. These principles guide the experience." entries={[
      ['Begin with listening', 'We start with what brought you here and what kind of reflection would feel useful.'],
      ['Explore with care', 'A session may use spiritual perspectives and symbolic language as prompts for reflection, not as fixed predictions.'],
      ['Close with your next thought', 'Take away the notes, questions or possibilities that feel meaningful. There is no pressure to act on an interpretation.']
    ]} />
    <section className="vk-content-section vk-content-sage">
      <div className="vk-content-title"><span className="vk-eyebrow">A note on care</span><h2 className="vk-serif">Your agency comes first.</h2><p>Readings are for personal and spiritual reflection. They do not diagnose, treat or replace advice from qualified health, legal or financial professionals. No outcome can be guaranteed.</p></div>
    </section>
    <CtaPanel eyebrow="Start with a question" title="Tell us what you would like to explore." text="Contact the studio to ask about availability, format and what to expect before booking." href="/pages/contact" label="Contact the studio" />
  </main>;
}

export function SoulpathResetPage() {
  const [step, setStep] = useState(0);
  const prompts = [
    ['Arrive', 'Let your shoulders soften. Notice the place where you are, the light around you and the support beneath your feet. There is nothing to solve in this moment.'],
    ['Notice', 'What has been taking up the most space in your thoughts? Name it gently, without trying to make it smaller or make it go away.'],
    ['Choose', 'What is one small, kind next step you can choose for yourself? It may be rest, a conversation, a practical task or simply more time.']
  ];
  return <main className="vk-spiritual vk-spiritual-page vk-soulpath-reset">
    <PageHero eyebrow="A self-guided pause" title={<>Return to the<br /><em>next right moment.</em></>} description="Soulpath Reset is a gentle check-in to help you pause, notice what is present and choose one manageable step—without needing to have everything figured out." image="sanctuary-landscape.jpg" alt="A peaceful illustrated landscape with distant mountains, water and sanctuary architecture" action="Begin a short reset" actionHref="#reset-practice" />
    <section className="vk-page-intro"><span className="vk-eyebrow">About seven unhurried minutes</span><h2 className="vk-serif">A small pause can be enough for now.</h2><p>This is a simple reflective practice, not a promise to fix a difficult day. Move at your own pace. Skip any prompt that does not feel right and return to your surroundings whenever you need.</p></section>
    <section className="vk-content-section vk-content-sage" id="reset-practice">
      <div className="vk-content-title"><span className="vk-eyebrow">Your reset</span><h2 className="vk-serif">One breath at a time.</h2><p>Move through the three prompts, or use the buttons to stay with the one you need.</p></div>
      <div className="vk-reset-card">
        <span className="vk-eyebrow">Step 0{step + 1} / 03</span>
        <h3 className="vk-serif">{prompts[step][0]}</h3>
        <p>{prompts[step][1]}</p>
        <div className="vk-reset-controls">
          <button type="button" className="vk-button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Previous</button>
          {step < prompts.length - 1
            ? <button type="button" className="vk-button" onClick={() => setStep((current) => Math.min(prompts.length - 1, current + 1))}>Continue <Arrow /></button>
            : <button type="button" className="vk-button" onClick={() => setStep(0)}>Begin again <Arrow /></button>}
        </div>
      </div>
    </section>
    <section className="vk-split-section">
      <div><span className="vk-eyebrow">Gentle by design</span><h2 className="vk-serif">There is no way to do this wrong.</h2><p>If closing your eyes is uncomfortable, keep them open. If sitting still does not work for you, move a little. This practice can be adapted to suit your comfort and accessibility needs.</p><p>For urgent distress or ongoing concerns, reach out to a trusted person or a qualified professional.</p></div>
      <img src={`${A}studio-altar.jpg`} alt="Warm late-afternoon light falling across a simple altar" />
    </section>
    <CtaPanel eyebrow="Keep exploring" title="Reflection can take many forms." text="Find a learning experience or a personal conversation that meets you where you are." href="/pages/evernroom" label="Explore Evernroom" />
  </main>;
}

export function CelebrityPage() {
  return <main className="vk-spiritual vk-spiritual-page vk-celebrity">
    <PageHero eyebrow="Public conversations · Thoughtful context" title={<>A life in public.<br /><em>A person beyond it.</em></>} description="A respectful look at how spirituality and public life meet—without turning private lives into proof, spectacle or endorsement." image="divine-diwali-campaign.jpg" alt="A festive studio campaign image with warm traditional colour and soft light" />
    <section className="vk-page-intro"><span className="vk-eyebrow">Stories with boundaries</span><h2 className="vk-serif">Curiosity deserves context.</h2><p>Public figures are often surrounded by speculation about their personal beliefs and private choices. The studio approaches these conversations with care: no invented associations, no implied endorsements and no claims about anyone’s private practice.</p></section>
    <NumberedSection eyebrow="A considered point of view" title="What we can talk about responsibly." description="Spiritual ideas can be discussed without making assumptions about the people who encounter them." entries={[
      ['The ideas themselves', 'Explore ritual, symbolism and reflective practice on their own terms.'],
      ['Public statements, accurately', 'When a public figure has spoken openly, quote and contextualise their words rather than guessing at their beliefs.'],
      ['Private lives stay private', 'A person’s presence in an image, campaign or public event is not evidence of endorsement or a spiritual relationship.']
    ]} tone="vk-content-sage" />
    <section className="vk-split-section">
      <img src={`${A}sanctuary-landscape.jpg`} alt="A quiet sanctuary landscape in a soft illustrated style" />
      <div><span className="vk-eyebrow">A studio commitment</span><h2 className="vk-serif">No story is worth losing a person’s dignity.</h2><p>Our studio stories focus on learning, practice and perspective. We do not publish personal details or use someone’s image to suggest a relationship, result or recommendation they have not explicitly shared.</p><a className="vk-text-link" href="/pages/library/category/vani-kabir-studio">Read studio notes <Arrow /></a></div>
    </section>
    <CtaPanel eyebrow="Explore the work" title="Meet the ideas, not the rumours." text="Read considered studio writing on spiritual learning, ritual and personal reflection." href="/pages/library" label="Visit the library" />
  </main>;
}

function ArticleCard({ article }) {
  return <article className="vk-article-card">
    <a href={`/pages/library/${article.slug}`}><img src={`${A}${article.image}`} alt={article.alt} /></a>
    <span className="vk-eyebrow">{article.category}</span>
    <h2>{article.title}</h2>
    <p>{article.excerpt}</p>
    <a href={`/pages/library/${article.slug}`}>Read more <Arrow /></a>
  </article>;
}

function LibraryCategoryNav({ current }) {
  return <nav className="vk-category-links" aria-label="Library categories">
    <a href="/pages/library" aria-current={current === 'all' ? 'page' : undefined}>All stories</a>
    {categoryDefinitions.map((category) => <a href={`/pages/library/category/${category.slug}`} key={category.slug} aria-current={current === category.slug ? 'page' : undefined}>{category.title}</a>)}
  </nav>;
}

export function LibraryPage() {
  return <main className="vk-spiritual vk-spiritual-page vk-library">
    <header className="vk-library-head"><span className="vk-eyebrow">The Evernroom journal</span><h1 className="vk-serif">The Library</h1><p>Thoughtful reading for spiritual curiosity: practical notes, longer reflections and stories from the studio.</p></header>
    <LibraryCategoryNav current="all" />
    <section className="vk-article-grid" aria-label="All library stories">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</section>
    <CtaPanel eyebrow="A question of your own?" title="Sometimes the next page is a conversation." text="If a studio story has brought something into focus, explore a private reading or send us a note." href="/pages/contact" label="Get in touch" />
  </main>;
}

function resolveSlug(props) {
  if (props.slug || props.category) return props.slug || props.category;
  const path = props.pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
  return path.split('/').filter(Boolean).pop() || '';
}

export function LibraryDetailPage(props = {}) {
  const slug = resolveSlug(props);
  const article = articles.find((item) => item.slug === slug) || articles[0];
  return <main className="vk-spiritual vk-spiritual-page vk-library-detail">
    <article className="vk-article-detail">
      <a className="vk-back-link" href="/pages/library">← Back to the library</a>
      <span className="vk-eyebrow">{article.category} · Evernroom journal</span>
      <h1 className="vk-serif">{article.title}</h1>
      <p className="vk-article-deck">{article.deck}</p>
      <img src={`${A}${article.image}`} alt={article.alt} />
      <div className="vk-article-body">
        {article.sections.map(([heading, copy], index) => <section key={heading}>
          <h2>{heading}</h2><p>{copy}</p>
          {index === 0 && <p className="vk-note">Let an idea be a place to begin—not a rule about what must happen next.</p>}
        </section>)}
        <p>Take what is useful, leave what is not, and make space for your own experience to matter.</p>
        <a className="vk-text-link" href="/pages/library">Explore more stories <Arrow /></a>
      </div>
    </article>
    <CtaPanel eyebrow="Continue the exploration" title="There is more to discover." text="Browse the library by theme or find out about learning at Evernroom." href="/pages/library" label="Return to the library" />
  </main>;
}

export function LibraryCategoryPage(props = {}) {
  const slug = resolveSlug(props);
  const category = categoryDefinitions.find((item) => item.slug === slug) || categoryDefinitions.find((item) => item.slug === props.category) || categoryDefinitions[0];
  const matchingArticles = articles.filter((article) => article.category === category.filter);
  return <main className="vk-spiritual vk-spiritual-page vk-library-category">
    <header className="vk-library-head"><span className="vk-eyebrow">The Evernroom journal · Category</span><h1 className="vk-serif">{category.title}</h1><p>{category.intro}</p></header>
    <LibraryCategoryNav current={category.slug} />
    <section className="vk-article-grid" aria-label={`${category.title} stories`}>{matchingArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}</section>
    <CtaPanel eyebrow="More from the journal" title="Follow another thread." text="The library brings together practical notes, long reads and studio stories." href="/pages/library" label="See all stories" />
  </main>;
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return <main className="vk-spiritual vk-spiritual-page vk-contact">
    <section className="vk-contact-layout">
      <div>
        <span className="vk-eyebrow">A note to the studio</span>
        <h1 className="vk-serif">Let’s begin with a conversation.</h1>
        <p>Questions about a reading, an Evernroom experience or the studio? Send a note and tell us what you would like to know.</p>
        <div className="vk-contact-details"><span className="vk-eyebrow">Email the studio</span><br /><a href="mailto:hello@vanikabir.com">hello@vanikabir.com</a><p>For existing orders or collection questions, please use the relevant contact details in your order confirmation.</p></div>
      </div>
      <div>
        {submitted ? <div className="vk-form-success" role="status">Thank you for taking the time to write. This preview does not transmit or store messages; please email hello@vanikabir.com to send your enquiry directly.</div> : <form className="vk-contact-form" onSubmit={submit}>
          <label>Your name<input name="name" type="text" autoComplete="name" required /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          <label>What would you like to ask about?
            <select name="topic" defaultValue="Private readings">
              <option>Private readings</option><option>Evernroom learning</option><option>Soulpath Reset</option><option>Something else</option>
            </select>
          </label>
          <label>Your note<textarea name="message" required /></label>
          <button className="vk-button" type="submit">Prepare my enquiry <Arrow /></button>
          <p>This form is a local preview and does not send or store your message. For a direct enquiry, email the studio.</p>
        </form>}
      </div>
    </section>
    <CtaPanel eyebrow="Take your time" title="Not sure where to start?" text="Explore the library or learn more about what happens in a private reading." href="/pages/library" label="Read the library" />
  </main>;
}
