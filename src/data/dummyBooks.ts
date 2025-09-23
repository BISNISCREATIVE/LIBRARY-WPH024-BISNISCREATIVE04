import { Book } from './books';

// Existing dummy book data
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

// Generate 200 dummy books
const generateDummyBooks = (count: number): Book[] => {
    const books: Book[] = [];
    const titles = [
        "The Midnight Library", "Where the Crawdads Sing", "Project Hail Mary",
        "The Alchemist", "Dune", "Circe", "The Silent Patient", "Normal People",
        "The Seven Husbands of Evelyn Hugo", "Pachinko", "Educated",
        "A Gentleman in Moscow", "The Song of Achilles", "Sapiens",
        "The Vanishing Half", "The Dutch House", "Becoming", "Think, Fast and Slow"
    ];
    const authors = [
        "Matt Haig", "Delia Owens", "Andy Weir", "Paulo Coelho",
        "Frank Herbert", "Madeline Miller", "Alex Michaelides",
        "Sally Rooney", "Taylor Jenkins Reid", "Min Jin Lee",
        "Tara Westover", "Amor Towles", "Madeline Miller",
        "Yuval Noah Harari", "Brit Bennett", "Ann Patchett",
        "Michelle Obama", "Daniel Kahneman"
    ];
    const categories = [
        "Fiction", "Mystery", "Sci-Fi", "Fantasy", "Historical Fiction",
        "Romance", "Thriller", "Non-Fiction", "Biography", "Self-Help"
    ];

    const generateRandomBook = (id: number): Book => {
        const randomIndex = (array: string[]) => Math.floor(Math.random() * array.length);
        const randomTitle = titles[randomIndex(titles)];
        const randomAuthor = authors[randomIndex(authors)];
        const randomCategory = categories[randomIndex(categories)];
        const cover_url = `https://picsum.photos/300/400?random=${id}`;

        return {
            id,
            title: randomTitle + " #" + id,
            author: randomAuthor,
            category: randomCategory,
            stock: Math.floor(Math.random() * 20) + 1,
            rating: parseFloat((Math.random() * 0.9 + 4.1).toFixed(1)),
            reviews_count: Math.floor(Math.random() * 500) + 50,
            cover_url: cover_url,
            description: `A gripping ${randomCategory.toLowerCase()} story.`,
            published_year: Math.floor(Math.random() * 20) + 2000,
            pages: Math.floor(Math.random() * 300) + 200,
            language: "English",
            isbn: `978-${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 9999)}-${Math.floor(Math.random() * 9)}`,
            publisher: "Publisher" + randomIndex(authors),
        };
    };

    for (let i = 11; i <= count; i++) {
        books.push(generateRandomBook(i));
    }

    return books;
};

// Gabungkan data yang sudah ada dengan 200 data baru
export const allDummyBooks: Book[] = [...dummyBooks, ...generateDummyBooks(200)];

// Fungsi untuk mendapatkan semua buku (untuk digunakan di BookListPage)
export const getBooks = () => {
    return {
        books: allDummyBooks,
        hasMore: false,
        total: allDummyBooks.length,
    };
};
