// Mock data for perfumes - this would typically come from a database
export interface Perfume {
  id: string;
  name: string;
  brand: string;
  category: 'women' | 'men' | 'unisex' | 'exclusive';
  price: number;
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  image: string;
  inStock: boolean;
  featured?: boolean;
}

export const perfumes: Perfume[] = [
  {
    id: '1',
    name: 'Velvet Rose',
    brand: 'Perfume Fort',
    category: 'women',
    price: 12999,
    description: 'An enchanting floral fragrance that captures the essence of blooming roses at dawn. Sophisticated and timeless.',
    notes: {
      top: ['Bulgarian Rose', 'Pink Pepper', 'Bergamot'],
      heart: ['Turkish Rose', 'Jasmine', 'Violet'],
      base: ['Patchouli', 'White Musk', 'Amber']
    },
    image: 'perfume-women-1',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Black Oud',
    brand: 'Perfume Fort',
    category: 'men',
    price: 15999,
    description: 'A powerful and sophisticated fragrance with rich oud notes. Perfect for the modern gentleman.',
    notes: {
      top: ['Saffron', 'Cardamom', 'Black Pepper'],
      heart: ['Oud Wood', 'Leather', 'Cedar'],
      base: ['Vetiver', 'Amber', 'Musk']
    },
    image: 'perfume-men-1',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Citrus Breeze',
    brand: 'Perfume Fort',
    category: 'unisex',
    price: 10999,
    description: 'A refreshing and invigorating scent that combines citrus notes with subtle woody undertones.',
    notes: {
      top: ['Lemon', 'Grapefruit', 'Mandarin'],
      heart: ['Neroli', 'Green Tea', 'Jasmine'],
      base: ['Cedarwood', 'Vetiver', 'White Musk']
    },
    image: 'perfume-unisex-1',
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: 'Royal Essence',
    brand: 'Perfume Fort Exclusive',
    category: 'exclusive',
    price: 24999,
    description: 'A limited edition masterpiece crafted with the rarest ingredients. Pure luxury in a bottle.',
    notes: {
      top: ['Rare Iris', 'Pink Pepper', 'Bergamot'],
      heart: ['Damask Rose', 'Tuberose', 'Ylang-Ylang'],
      base: ['Agarwood', 'Sandalwood', 'Tonka Bean']
    },
    image: 'perfume-exclusive-1',
    inStock: true,
    featured: true
  }
];

export const categories = [
  {
    id: 'women',
    name: "Women's Perfumes",
    description: 'Elegant and sophisticated fragrances for women',
    slug: 'women'
  },
  {
    id: 'men',
    name: "Men's Perfumes",
    description: 'Bold and refined scents for men',
    slug: 'men'
  },
  {
    id: 'unisex',
    name: 'Unisex Scents',
    description: 'Contemporary fragrances for everyone',
    slug: 'unisex'
  },
  {
    id: 'exclusive',
    name: 'Exclusive Collections',
    description: 'Limited edition luxury perfumes',
    slug: 'exclusive'
  }
];
