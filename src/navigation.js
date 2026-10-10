import { collections, getCollectionProducts, products } from './data.js';

const menuContent = {
  'whats-new': [
    ['Blessing Of The Month', 'blessing-of-the-month', ['abundance']],
    ['Europe Collection Season - 3', 'europe-collection-season-3', ['europe']],
    ['Ancestry Manifestation Sheet - October', 'ancestry-manifestation-sheet-october', ['ancestry']],
    ['New Lightcoded Mixels @1919', 'new-lightcoded-mixels-1919', ['mixel']],
    ['MVK Verified', 'mvk-verified-edit', ['verified']],
    ['New Arrivals', 'new-arrivals', ['new']]
  ],
  'aumatrix-2': [
    ['High Vibrational Mixels', 'high-vibrational-mixels', ['mixel']],
    ['Numerology Mixels', 'numerology-mixels', ['high vibrational']],
    ['Cards Of Fate', 'cards-of-fate', ['cards of fate']],
    ['Pure Silver Coin', 'pure-silver-coin', ['silver']],
    ['Ritual Bowls', 'ritual-bowls', ['bowl']],
    ['Aumatrix Collection', 'aumatrix-collection', []]
  ],
  'divine-diwali': [
    ['Season 4 Collection', 'season-4-collection', ['diwali']],
    ['Diyas & Ritual Lights', 'diyas-ritual-lights', ['diya']],
    ['Ritual Bowls', 'ritual-bowls', ['bowl']],
    ['Abundance & Prosperity', 'abundance-prosperity', ['abundance']],
    ['Manifestation Sheets', 'manifestation-sheets', ['sheet']],
    ['Cards Of Fate', 'cards-of-fate', ['cards of fate']]
  ],
  'europe-season-3': [
    ['Europe Season 3 Edit', 'europe-season-3-edit', ['europe']],
    ['European Crystals', 'european-crystals', ['europe', 'crystal']],
    ['European Bracelets', 'european-bracelets', ['europe', 'bracelet']],
    ['Lightcoded Mixels', 'lightcoded-mixels', ['mixel']],
    ['Collector Stones', 'collector-stones', ['collector']],
    ['Seasonal Arrivals', 'seasonal-arrivals', ['europe']]
  ],
  'mvk-verified': [
    ['Verified Crystals', 'verified-crystals', ['verified', 'crystal']],
    ['Verified Bracelets', 'verified-bracelets', ['verified', 'bracelet']],
    ['Verified Ritual Tools', 'verified-ritual-tools', ['verified']],
    ['Master Vani’s Edit', 'master-vanis-edit', ['verified']],
    ['Verified New Arrivals', 'verified-new-arrivals', ['verified']]
  ],
  rare: [
    ['Rare Bracelets', 'rare-bracelets', ['rare', 'bracelet']],
    ['Rare Crystals', 'rare-crystals', ['rare', 'crystal']]
  ],
  bracelets: [
    ['Pure', 'pure', ['bracelet']],
    ['Rare Bracelets', 'rare-bracelets', ['rare', 'bracelet']],
    ['Magic Mixels', 'magic-mixels', ['mixel']],
    ['Numerology Mixels', 'numerology-mixels', ['high vibrational']],
    ['Zodiac Mixels', 'zodiac-mixels', ['mixel']]
  ],
  crystals: [
    ['Idols', 'idols', ['ganesha']],
    ['Tumbles', 'tumbles', ['tumble']],
    ['Towers', 'towers', ['point']],
    ['Free Forms', 'free-forms', ['crystal']],
    ['Clusters', 'clusters', ['cluster']],
    ['Geodes', 'geodes', ['geode']],
    ['Trees', 'trees', ['tree']],
    ['Spheres', 'spheres', ['sphere']],
    ['Hearts', 'hearts', ['heart']],
    ['Angels', 'angels', ['angel']],
    ['Pocket Stones', 'pocket-stones', ['tumble']],
    ['Pendants', 'pendants', ['pendant']]
  ],
  aromatherapy: [
    ['Elixir', 'elixir', ['elixir']],
    ['Fragrance', 'fragrance', ['fragrance']],
    ['Salts', 'salts', ['salt']],
    ['Body Oils', 'body-oils', ['oil']],
    ['Spell Oils', 'spell-oils', ['spell oil']],
    ['Sage', 'sage', ['sage']]
  ],
  'e-studio': [
    ['Wallpapers', 'wallpapers', ['wallpaper']],
    ['Manifestation Sheets', 'manifestation-sheets', ['sheet']],
    ['Wallet Foldables', 'wallet-foldables', ['cheque']],
    ['Know Your Gemstone', 'know-your-gemstone', ['crystal']]
  ],
  'ancient-tools': [
    ['Cheques', 'cheques', ['cheque']],
    ['Wawoki', 'wawoki', []],
    ['Evernroom™ Journals', 'evernroom-journals', ['journal']],
    ['Evernroom™ Pendants', 'evernroom-pendants', ['pendant']],
    ['Angel Number Pendants', 'angel-number-pendants', ['pendant']],
    ['Evernroom™ Stickers', 'evernroom-stickers', ['sticker']],
    ['Manifestation & Prayer Cards', 'manifestation-prayer-cards', ['cards']]
  ]
};

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const navigationMenus = collections.map((collection) => ({
  ...collection,
  items: (menuContent[collection.slug] || []).map(([title, slug, searchTerms]) => ({
    title,
    slug: slug || slugify(title),
    searchTerms
  }))
}));

export const getNavigationSubcollection = (parentSlug, childSlug) =>
  navigationMenus.find((menu) => menu.slug === parentSlug)?.items.find((item) => item.slug === childSlug);

export const getSubcollectionProducts = (parentSlug, childSlug) => {
  const subcollection = getNavigationSubcollection(parentSlug, childSlug);
  if (!subcollection) return [];

  const searchTerms = subcollection.searchTerms || [];
  if (!searchTerms.length) return getCollectionProducts(parentSlug);

  const matches = products.filter((product) => {
    const searchable = [
      product.name, product.collection, product.productType, product.crystalType,
      product.material, product.intention
    ].join(' ').toLowerCase();
    return searchTerms.every((term) => searchable.includes(term.toLowerCase()));
  });

  return matches.length ? matches : getCollectionProducts(parentSlug);
};
