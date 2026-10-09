export const collections = [
  { title: "What's New", slug: 'whats-new', description: 'Freshly arrived tools, crystals and objects for the season you are stepping into.' },
  { title: 'Aumatrix 2.0', slug: 'aumatrix-2', description: 'Lightcoded forms and elemental tools from the Aumatrix 2.0 collection.' },
  { title: 'Divine Diwali - Season 4', slug: 'divine-diwali', description: 'A considered collection of ritual pieces for light, intention and abundance.' },
  { title: 'Europe Season 3', slug: 'europe-season-3', description: 'Rare finds and lightcoded companions gathered for Europe, season three.' },
  { title: 'MVK Verified', slug: 'mvk-verified', description: 'A hand-selected edit of crystals and tools personally verified by Master Vani Kabir.' },
  { title: 'Rare', slug: 'rare', description: 'Uncommon natural formations and one-of-a-kind companions, chosen for their presence.' },
  { title: 'Bracelets', slug: 'bracelets', description: 'Gemstone bracelets and wearable reminders to return to your intention.' },
  { title: 'Crystals', slug: 'crystals', description: 'Natural crystals and gemstones for a personal practice, chosen with care.' },
  { title: 'Aromatherapy', slug: 'aromatherapy', description: 'A grounding edit of oils, mists and aromatic ritual objects.' },
  { title: 'E-Studio', slug: 'e-studio', description: 'Learn at your own pace with thoughtful practices and digital experiences.' },
  { title: 'Ancient Tools', slug: 'ancient-tools', description: 'Ritual objects that bring the wisdom of old traditions into everyday life.' }
];

const all = collections.map((entry) => entry.slug);
const referencePhotos = {
  'diya-infinite': 'diya-infinite.jpg',
  'bowl-negativity': 'bowl-negativity.jpg',
  'bowl-gold': 'bowl-gold.jpg',
  'circle-healing': 'circle-healing.jpg',
  'cards-fate': 'cards-fate.jpg',
  'silver-coin': 'silver-coin.jpg',
  'nephrite-bracelet': 'nephrite-bracelet.jpg',
  'spirit-deck': 'spirit-deck.jpg'
};
const p = (id, name, price, collection, image, color, material, crystalType, productType, intention, inStock = true) => ({
  id, name, price, collection, image, color, material, crystalType, productType, intention, inStock,
  asset: referencePhotos[id] ? `/attached_assets/generated_images/${referencePhotos[id]}` : null
});

export const products = [
  p('diya-infinite', 'First Diya Of Infinite Abundance', 1919, 'divine-diwali', 'diya', 'Terracotta', 'Terracotta & brass', 'Citrine', 'Ritual object', 'Abundance'),
  p('bowl-negativity', 'Bowl Over Negativity 2.0™', 2929, 'divine-diwali', 'bowl', 'Gold', 'Brass & crystals', 'Clear quartz', 'Ritual bowl', 'Cleansing'),
  p('bowl-gold', 'The Bowl Of Gold™', 2222, 'divine-diwali', 'bowl', 'Gold', 'Brass', 'Citrine', 'Ritual bowl', 'Abundance'),
  p('circle-healing', 'The Circle Of Healing Light', 1919, 'divine-diwali', 'diya', 'Terracotta', 'Terracotta', 'Clear quartz', 'Ritual object', 'Healing'),
  p('cards-fate', '44 Aumatrix™ Cards Of Fate', 2424, 'divine-diwali', 'paper', 'Ivory', 'Paper & gold foil', 'Clear quartz', 'Oracle cards', 'Intuition'),
  p('silver-coin', 'The Power Of Aumatrix™ Diwali Pure Silver Coin', 15555, 'divine-diwali', 'card', 'Green', 'Pure silver', 'Silver', 'Energised coin', 'Prosperity'),
  p('nephrite-bracelet', 'Ancient Nephrite Jade Bracelet - 9k Gold Charm', 44444, 'divine-diwali', 'bracelet', 'Jade green', 'Nephrite jade & 9k gold', 'Nephrite jade', 'Bracelet', 'Protection'),
  p('spirit-deck', 'Message From The Spirit Deck Of Cards™', 2929, 'divine-diwali', 'paper', 'Ivory', 'Paper', 'Clear quartz', 'Oracle cards', 'Intuition'),
  p('dhanteras-sheet', 'Dhanteras Digital Sheet', 888, 'divine-diwali', 'paper', 'Ivory', 'Digital download', 'Citrine', 'Digital practice', 'Abundance'),
  p('diwali-sheet', 'Diwali Digital Sheet', 888, 'divine-diwali', 'paper', 'Ivory', 'Digital download', 'Citrine', 'Digital practice', 'Prosperity'),
  p('ancestry-sheet', 'October Ancestry Manifestation Sheet', 888, 'divine-diwali', 'paper', 'Ivory', 'Digital download', 'Pyrite', 'Digital practice', 'Ancestry'),
  p('pyrite-tumble', 'Ambas Pyrite Matrix Tumble', 1111, 'divine-diwali', 'stone', 'Gold', 'Natural pyrite', 'Pyrite', 'Tumbled crystal', 'Prosperity'),
  p('mabon-pot', 'Mabon Simmer Pot Mix', 1717, 'divine-diwali', 'paper', 'Autumn', 'Dried botanicals', 'Citrine', 'Aromatic ritual', 'Grounding'),
  p('spirit-dragon', 'Meet Your Spirit Dragon', 1515, 'divine-diwali', 'figure', 'Rose', 'Hand-finished wax', 'Rose quartz', 'Ritual candle', 'Love'),
  p('wealth-portal', 'Open Wealth Portal Mixel', 6666, 'divine-diwali', 'bracelet', 'Gold', 'Gemstones & gold', 'Citrine', 'Bracelet', 'Wealth'),
  p('gratitude-water', 'Ganesha Blessed Gratitude Water', 1616, 'divine-diwali', 'oil', 'Clear', 'Blessed water', 'Amazonite', 'Ritual water', 'Gratitude'),
  p('obstacle-dori', 'Obstacle Removal Dori - Set Of 2', 777, 'divine-diwali', 'bracelet', 'Blue', 'Cotton thread & gemstones', 'Lapis lazuli', 'Ritual thread', 'Protection'),
  p('amazonite-ganesha', 'Amazonite Ganesha', 2340, 'divine-diwali', 'figure', 'Sea green', 'Natural amazonite', 'Amazonite', 'Carved crystal', 'New beginnings'),
  p('citrine-points', 'Abundance Citrine Premium Points', 5555, 'whats-new', 'crystal', 'Golden yellow', 'Natural citrine', 'Citrine', 'Crystal point', 'Abundance'),
  p('ametrine', 'Sri Lankan Ametrine', 21021, 'whats-new', 'crystal', 'Violet & gold', 'Natural ametrine', 'Ametrine', 'Natural crystal', 'Clarity'),
  p('mixel-9', 'High Vibrational No. 9 Mixel – For Those Born On (9, 18, 27)', 6666, 'whats-new', 'bracelet', 'Violet', 'Gemstones & gold', 'Amethyst', 'Bracelet', 'Intuition'),
  p('mixel-8', 'High Vibrational No. 8 Mixel – For Those Born On (8, 17, 26)', 6666, 'whats-new', 'bracelet', 'Brown', 'Gemstones & gold', 'Tiger’s eye', 'Bracelet', 'Strength'),
  p('mixel-7', 'High Vibrational No. 7 Mixel – For Those Born On (7, 16, 25)', 6666, 'whats-new', 'bracelet', 'Blue', 'Gemstones & gold', 'Sodalite', 'Bracelet', 'Clarity'),
  p('mixel-6', 'High Vibrational No. 6 Mixel – For Those Born On (6, 15, 24)', 6666, 'whats-new', 'bracelet', 'Cream', 'Gemstones & gold', 'Moonstone', 'Bracelet', 'Harmony'),
  p('mixel-5', 'High Vibrational No. 5 Mixel – For Those Born On (5, 14, 23)', 6666, 'whats-new', 'bracelet', 'Green', 'Gemstones & gold', 'Aventurine', 'Bracelet', 'Growth'),
  p('mixel-4', 'High Vibrational No. 4 Mixel – For Those Born On (4, 13, 22, 31)', 6666, 'whats-new', 'bracelet', 'Burgundy', 'Gemstones & gold', 'Garnet', 'Bracelet', 'Grounding'),
  p('mixel-3', 'High Vibrational No. 3 Mixel – For Those Born On (3, 12, 21, 30)', 6666, 'whats-new', 'bracelet', 'Turquoise', 'Gemstones & gold', 'Turquoise', 'Bracelet', 'Expression'),
  p('mixel-2', 'High Vibrational No. 2 Mixel – For Those Born On (2, 11, 20, 29)', 6666, 'whats-new', 'bracelet', 'Peach', 'Gemstones & gold', 'Sunstone', 'Bracelet', 'Confidence'),
  p('mixel-1', 'High Vibrational No. 1 Mixel – For Those Born On (1, 10, 19, 28)', 6666, 'whats-new', 'bracelet', 'Burgundy', 'Gemstones & gold', 'Garnet', 'Bracelet', 'Leadership'),
  p('lapis-om', 'Lapis Lazuli Om Bracelet', 3333, 'whats-new', 'bracelet', 'Blue', 'Lapis lazuli', 'Lapis lazuli', 'Bracelet', 'Communication'),
  p('tiger-om', "Tiger's Eye Om Bracelet", 3333, 'bracelets', 'bracelet', 'Amber', 'Tiger’s eye', 'Tiger’s eye', 'Bracelet', 'Confidence'),
  p('aventurine-om', 'Green Aventurine Om Bracelet', 3333, 'bracelets', 'bracelet', 'Green', 'Green aventurine', 'Aventurine', 'Bracelet', 'Growth'),
  p('rose-om', 'Rose Quartz Om Bracelet', 3333, 'bracelets', 'bracelet', 'Rose', 'Rose quartz', 'Rose quartz', 'Bracelet', 'Love'),
  p('yellow-om', 'Yellow Aventurine Om Bracelet', 3333, 'bracelets', 'bracelet', 'Amber', 'Yellow aventurine', 'Aventurine', 'Bracelet', 'Optimism'),
  p('evil-eye', 'EVIL EYE BLOCKER SULEMANI BRACELET', 2666, 'bracelets', 'bracelet', 'Black', 'Sulemani agate', 'Agate', 'Bracelet', 'Protection'),
  p('wealth-mixel', 'Wealth And Abundance Mixel', 3838, 'aumatrix-2', 'bracelet', 'Green & gold', 'Mixed gemstones', 'Citrine', 'Bracelet', 'Wealth'),
  p('money-oil', 'Money Spell Oil', 2525, 'aromatherapy', 'oil', 'Amber', 'Botanical oil', 'Citrine', 'Ritual oil', 'Prosperity'),
  p('wealth-elixir', 'Elixir - Wealth & Opportunity', 1616, 'aromatherapy', 'oil', 'Black', 'Botanical blend', 'Citrine', 'Aromatic elixir', 'Opportunity'),
  p('money-cheque', 'Money Manifestation Cheque', 1555, 'e-studio', 'paper', 'Ivory', 'Digital practice', 'Pyrite', 'Digital practice', 'Abundance'),
  p('ancestry-october', 'October Ancestry Manifestation Sheet', 888, 'e-studio', 'paper', 'Ivory', 'Digital practice', 'Clear quartz', 'Digital sheet', 'Ancestry'),
  p('spirit-cards', '44 Aumatrix™ Cards Of Fate', 2424, 'aumatrix-2', 'paper', 'Ivory', 'Printed cards', 'Clear quartz', 'Oracle cards', 'Intuition'),
  p('pure-coin', 'The Power Of Aumatrix™ Diwali Pure Silver Coin', 15555, 'aumatrix-2', 'card', 'Green', 'Pure silver', 'Silver', 'Energised coin', 'Protection'),
  p('amethyst-rare', 'Sri Lankan Ametrine — Collector Stone', 21021, 'rare', 'crystal', 'Violet & gold', 'Natural ametrine', 'Ametrine', 'Collector crystal', 'Clarity', false),
  p('rare-nephrite', 'Ancient Nephrite Jade Bracelet - 9k Gold Charm', 44444, 'rare', 'bracelet', 'Jade green', 'Nephrite jade & 9k gold', 'Nephrite jade', 'Bracelet', 'Protection', false),
  p('europe-crystal', 'Smoky Quartz Temple Point', 7777, 'europe-season-3', 'crystal', 'Smoky brown', 'Natural smoky quartz', 'Smoky quartz', 'Crystal point', 'Grounding'),
  p('europe-bracelet', 'Lapis Lazuli Om Bracelet', 3333, 'europe-season-3', 'bracelet', 'Blue', 'Lapis lazuli', 'Lapis lazuli', 'Bracelet', 'Communication'),
  p('verified-citrine', 'Citrine Sunburst Point — MVK Verified', 5555, 'mvk-verified', 'crystal', 'Golden yellow', 'Natural citrine', 'Citrine', 'Verified crystal', 'Abundance'),
  p('verified-jade', 'Nephrite Jade Guardian Bracelet', 44444, 'mvk-verified', 'bracelet', 'Jade green', 'Nephrite jade', 'Nephrite jade', 'Bracelet', 'Protection'),
  p('ancient-bowl', 'Bowl Over Negativity 2.0™', 2929, 'ancient-tools', 'bowl', 'Gold', 'Brass & crystals', 'Clear quartz', 'Ritual bowl', 'Cleansing'),
  p('ancient-ritual', 'First Diya Of Infinite Abundance', 1919, 'ancient-tools', 'diya', 'Terracotta', 'Terracotta & brass', 'Citrine', 'Ritual object', 'Abundance'),
  p('crystal-quartz', 'Clear Quartz Lightcoded Point', 1888, 'crystals', 'crystal', 'Clear', 'Natural clear quartz', 'Clear quartz', 'Crystal point', 'Clarity'),
  p('crystal-rose', 'Rose Quartz Heart Stone', 2222, 'crystals', 'stone', 'Rose', 'Natural rose quartz', 'Rose quartz', 'Tumbled crystal', 'Love'),
  p('crystal-pyrite', 'Ambas Pyrite Matrix Tumble', 1111, 'crystals', 'stone', 'Gold', 'Natural pyrite', 'Pyrite', 'Tumbled crystal', 'Prosperity')
];

export const getCollection = (slug) => collections.find((collection) => collection.slug === slug);
export const getCollectionProducts = (slug) => {
  const explicit = products.filter((product) => product.collection === slug);
  const related = {
    'aumatrix-2': ['diya-infinite', 'bowl-negativity', 'bowl-gold', 'cards-fate', 'nephrite-bracelet'],
    'europe-season-3': ['mixel-9', 'mixel-7', 'mixel-5', 'lapis-om', 'citrine-points'],
    'mvk-verified': ['citrine-points', 'ametrine', 'nephrite-bracelet', 'verified-citrine', 'verified-jade'],
    rare: ['citrine-points', 'ametrine', 'nephrite-bracelet', 'rare-nephrite'],
    aromatherapy: ['wealth-elixir', 'money-oil', 'gratitude-water', 'mabon-pot'],
    'e-studio': ['money-cheque', 'ancestry-october', 'dhanteras-sheet', 'diwali-sheet', 'cards-fate'],
    'ancient-tools': ['bowl-negativity', 'diya-infinite', 'spirit-deck', 'obstacle-dori', 'amazonite-ganesha'],
    crystals: ['citrine-points', 'ametrine', 'pyrite-tumble', 'crystal-quartz', 'crystal-rose', 'crystal-pyrite'],
    bracelets: ['mixel-9', 'mixel-8', 'mixel-7', 'mixel-6', 'mixel-5', 'mixel-4', 'mixel-3', 'mixel-2', 'mixel-1', 'lapis-om']
  }[slug] || [];
  const byId = new Map([...explicit, ...related.map((id) => products.find((product) => product.id === id)).filter(Boolean)].map((product) => [product.id, product]));
  if (byId.size) return [...byId.values()];
  return products.filter((product) => all.includes(product.collection)).slice(0, 12);
};
