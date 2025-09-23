import { Book } from '@/api/books';

// Dummy book data to match the images shown in the Figma designs
export const dummyBooks: Book[] = [
  {
    id: 1,
    title: "21 RASA BAKSO BOWO",
    author: "Tuhu",
    category: "Fiction",
    stock: 5,
    rating: 4.9,
    reviews_count: 127,
    cover_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "A delightful culinary adventure story about a young chef's journey through Indonesian street food culture.",
    published_year: 2023,
    pages: 280,
    language: "Indonesian",
    isbn: "978-602-123-456-7",
    publisher: "Gramedia Pustaka",
  },
  {
    id: 2,
    title: "LISA KLEYPAS",
    author: "Lisa Kleypas",
    category: "Romance",
    stock: 3,
    rating: 4.9,
    reviews_count: 89,
    cover_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    description: "Irresistible romance novel by bestselling author Lisa Kleypas featuring passionate love and Victorian elegance.",
    published_year: 2022,
    pages: 352,
    language: "English",
    isbn: "978-0-380-76341-2",
    publisher: "Avon Books",
  },
  {
    id: 3,
    title: "OLIVER TWIST",
    author: "Charles Dickens",
    category: "Fiction",
    stock: 8,
    rating: 4.9,
    reviews_count: 234,
    cover_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    description: "Classic tale of an orphan boy in Victorian London, exploring themes of poverty, crime, and redemption.",
    published_year: 1838,
    pages: 408,
    language: "English",
    isbn: "978-0-14-143974-1",
    publisher: "Penguin Classics",
  },
  {
    id: 4,
    title: "JACK LONDON WHITE FANG",
    author: "Jack London",
    category: "Adventure",
    stock: 6,
    rating: 4.9,
    reviews_count: 156,
    cover_url: "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=300&h=400&fit=crop",
    description: "The story of a wild wolfdog's journey to domestication in the harsh Yukon Territory during the Gold Rush.",
    published_year: 1906,
    pages: 298,
    language: "English",
    isbn: "978-0-486-26968-1",
    publisher: "Dover Publications",
  },
  {
    id: 5,
    title: "THE SCARRED WOMAN",
    author: "Jussi Adler-Olsen",
    category: "Mystery",
    stock: 4,
    rating: 4.9,
    reviews_count: 92,
    cover_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    description: "A gripping Nordic noir thriller from the Department Q series featuring Detective Carl Mørck.",
    published_year: 2018,
    pages: 544,
    language: "English",
    isbn: "978-1-101-97341-8",
    publisher: "Dutton",
  },
  {
    id: 6,
    title: "KAPAN PINDAH RUMAH",
    author: "Author name",
    category: "Self-Improvement",
    stock: 7,
    rating: 4.9,
    reviews_count: 73,
    cover_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=400&fit=crop",
    description: "A comprehensive guide to making life-changing decisions about moving homes and starting fresh.",
    published_year: 2023,
    pages: 224,
    language: "Indonesian",
    isbn: "978-979-123-456-8",
    publisher: "Mizan Pustaka",
  },
  {
    id: 7,
    title: "YETI MENERIK YANG ABADI",
    author: "Author name",
    category: "Adventure",
    stock: 5,
    rating: 4.9,
    reviews_count: 68,
    cover_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
    description: "An adventure story about the eternal mysteries of the Yeti in the Himalayan mountains.",
    published_year: 2022,
    pages: 312,
    language: "Indonesian",
    isbn: "978-602-234-567-9",
    publisher: "Bentang Pustaka",
  },
  {
    id: 8,
    title: "RUMAH YANG MENELAN PENGHUNIYA",
    author: "Kenken Layla",
    category: "Horror",
    stock: 2,
    rating: 4.9,
    reviews_count: 45,
    cover_url: "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=300&h=400&fit=crop",
    description: "A spine-chilling horror story about a house with dark secrets that consumes its inhabitants.",
    published_year: 2023,
    pages: 288,
    language: "Indonesian",
    isbn: "978-602-345-678-0",
    publisher: "GPU",
  },
  {
    id: 9,
    title: "THE OTHER HALF OF ME",
    author: "Elsa Puspita",
    category: "Romance",
    stock: 6,
    rating: 4.9,
    reviews_count: 112,
    cover_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    description: "A heartwarming story about finding your other half and the journey of self-discovery.",
    published_year: 2022,
    pages: 268,
    language: "English",
    isbn: "978-1-234-56789-0",
    publisher: "HarperCollins",
  },
  {
    id: 10,
    title: "ATOMIC HABITS",
    author: "James Clear",
    category: "Self-Improvement",
    stock: 12,
    rating: 4.9,
    reviews_count: 445,
    cover_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones - Transform your life with tiny changes.",
    published_year: 2018,
    pages: 320,
    language: "English",
    isbn: "978-0-735-21129-2",
    publisher: "Avery",
  },
];

// Popular authors data
export const popularAuthors = [
  {
    id: 1,
    name: "Author name",
    avatar: "/api/placeholder/64/64?text=A1",
    booksCount: 5,
  },
  {
    id: 2,
    name: "Author name",
    avatar: "/api/placeholder/64/64?text=A2",
    booksCount: 5,
  },
  {
    id: 3,
    name: "Author name",
    avatar: "/api/placeholder/64/64?text=A3",
    booksCount: 5,
  },
  {
    id: 4,
    name: "Author name",
    avatar: "/api/placeholder/64/64?text=A4",
    booksCount: 5,
  },
];

// Get featured/recommended books (first 10)
export const getFeaturedBooks = () => dummyBooks.slice(0, 10);

// Generate additional dummy books
const generateDummyBook = (id: number): Book => {
  const titles = [
    "The Mystery of Time", "Digital Dreams", "Ocean's Secret", "Mountain Tales", 
    "City Lights", "Forest Whispers", "Desert Storm", "River Journey",
    "Sky Adventures", "Underground Stories", "Cosmic Voyage", "Earth Chronicles",
    "Fire and Ice", "Wind Dancer", "Stone Guardian", "Metal Hearts",
    "Crystal Vision", "Shadow Realm", "Light Bearer", "Dark Waters",
    "Golden Path", "Silver Moon", "Bronze Age", "Iron Will",
    "Copper Dreams", "Steel Heart", "Diamond Mind", "Ruby Eyes"
  ];
  
  const authors = [
    "Alex Johnson", "Sarah Williams", "Michael Brown", "Emma Davis",
    "John Smith", "Lisa Anderson", "David Wilson", "Maria Garcia",
    "James Miller", "Jennifer Taylor", "Robert Jones", "Patricia Moore",
    "Christopher Lee", "Linda White", "Matthew Hall", "Barbara Allen"
  ];
  
  const categories = ["Fiction", "Romance", "Mystery", "Adventure", "Horror", "Self-Improvement", "Science"];
  
  const coverUrls = [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=300&h=400&fit=crop"
  ];

  return {
    id,
    title: titles[id % titles.length],
    author: authors[id % authors.length],
    category: categories[id % categories.length],
    stock: Math.floor(Math.random() * 10) + 1,
    rating: 4.0 + Math.random(),
    reviews_count: Math.floor(Math.random() * 200) + 10,
    cover_url: coverUrls[id % coverUrls.length],
    description: `An engaging ${categories[id % categories.length].toLowerCase()} story that will captivate readers from beginning to end.`,
    published_year: 2015 + Math.floor(Math.random() * 9),
    pages: 200 + Math.floor(Math.random() * 300),
    language: "English",
    isbn: `978-${Math.floor(Math.random() * 9)}-${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 99999)}-${Math.floor(Math.random() * 9)}`,
    publisher: "Random House"
  };
};

// Get books with pagination support
export const getBooks = (page: number = 1, limit: number = 10) => {
  const allBooks = [...dummyBooks];
  
  // Generate additional books if we need more
  const totalNeeded = page * limit;
  while (allBooks.length < totalNeeded) {
    allBooks.push(generateDummyBook(allBooks.length + 1));
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    books: allBooks.slice(startIndex, endIndex),
    hasMore: true, // Always has more for unlimited loading
    total: allBooks.length
  };
};

// Get popular books (random selection)
export const getPopularBooks = (limit: number = 5) => {
  return dummyBooks
    .sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0))
    .slice(0, limit);
};