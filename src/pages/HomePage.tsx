import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { BookCard } from '@/components/BookCard';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { booksAPI, Book } from '@/api/books';
import { useToast } from '@/hooks/use-toast';

interface Author {
  id: number;
  name: string;
  books_count: number;
  avatar?: string;
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleAuthorsCount, setVisibleAuthorsCount] = useState(4); // Tambahkan state untuk jumlah penulis yang terlihat

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);

        // Featured Books based on the images provided
        const mockFeaturedBooks: Book[] = [
          { id: 1, title: '21 Rasa Bakso Pak Bowo', author: 'TuHu', category: 'Fiction', stock: 5, rating: 4.9, cover_url: '/images/covers/bakso.png' },
          { id: 2, title: 'Lisa Kleypas Irresistible', author: 'Lisa Kleypas', category: 'Romance', stock: 3, rating: 4.9, cover_url: '/images/covers/Lisa Kleypas Irresistible.jpg' },
          { id: 3, title: 'Oliver Twist', author: 'Charles Dickens', category: 'Classic', stock: 4, rating: 4.9, cover_url: '/images/covers/olivertwist.png' },
          { id: 4, title: 'Jack London White Fang', author: 'Jack London', category: 'Adventure', stock: 6, rating: 4.9, cover_url: '/images/covers/Jack London White Fang.png' },
          { id: 5, title: 'The Scarred Woman', author: 'Jussi Adler-Olsen', category: 'Thriller', stock: 2, rating: 4.9, cover_url: '/images/covers/The Scarred Woman.jpg' }
        ];

        // Popular Books (second row)
        const mockPopularBooks: Book[] = [
          { id: 6, title: 'The Psychology of Money', author: 'Morgan Housel', category: 'Business & Economics', stock: 3, rating: 4.9, cover_url: '/images/covers/psychology-of-money.jpg' },
          { id: 7, title: 'Kapan Pindah Rumah', author: 'Various', category: 'Self-Help', stock: 5, rating: 4.9, cover_url: '/images/covers/kapanpindahrumah.png' },
          { id: 8, title: 'Yeti dan Terik yang Abadi', author: 'Lokal Author', category: 'Fantasy', stock: 4, rating: 4.9, cover_url: '/images/covers/yetiterikabadi.png' },
          { id: 9, title: 'Rumah Yang Menelan Penghuninya', author: 'Kenken Layla', category: 'Horror', stock: 2, rating: 4.9, cover_url: '/images/covers/rumahyangmenelan.png' },
          { id: 10, title: 'Other Half of Me', author: 'Elsa Puspita', category: 'Romance', stock: 6, rating: 4.9, cover_url: '/images/covers/otherhalfofme.png' }
        ];

        // Popular Authors based on the images (extend for 'Load More')
        const mockAuthors: Author[] = [
          { id: 1, name: 'John Doe', books_count: 5, avatar: '/images/avatars/avatar1.png' },
          { id: 2, name: 'Jane Smith', books_count: 3, avatar: '/images/avatars/avatar2.png' },
          { id: 3, name: 'Robert Johnson', books_count: 7, avatar: '/images/avatars/avatar3.png' },
          { id: 4, name: 'Emily White', books_count: 2, avatar: '/images/avatars/avatar4.png' },
          { id: 5, name: 'David Wilson', books_count: 9, avatar: '/images/avatars/avatar5.png' },
          { id: 6, name: 'Olivia Davis', books_count: 4, avatar: '/images/avatars/avatar6.png' },
          { id: 7, name: 'Michael Brown', books_count: 6, avatar: '/images/avatars/avatar7.png' },
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setFeaturedBooks(mockFeaturedBooks);
        setPopularBooks(mockPopularBooks);
        setAuthors(mockAuthors);
      } catch (error) {
        console.error('Error loading home data:', error);
        toast({
          title: "Error",
          description: "Failed to load books",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, [toast]);
  
  const handleLoadMoreAuthors = () => {
    setVisibleAuthorsCount(prevCount => prevCount + 4);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Category Section */}
        <CategorySection />

        {/* Recommendations Section */}
        <section className="px-4 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recommendation</h2>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        {/* Second Row of Books */}
        <section className="px-4 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg aspect-[3/4] mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-1"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              ))
            ) : (
              popularBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            )}
          </div>

          {/* Load More Button for Books */}
          <div className="text-center mb-12">
            <Button
              variant="outline"
              onClick={() => navigate('/books')}
              className="px-8"
            >
              Load More
            </Button>
          </div>
        </section>

        {/* Popular Authors Section */}
        <section className="px-4 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Authors</h2>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 bg-muted-foreground rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted-foreground rounded mb-2"></div>
                      <div className="h-3 bg-muted-foreground rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {authors.slice(0, visibleAuthorsCount).map((author) => (
                <div key={author.id} className="flex items-center space-x-3 p-4 bg-card rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/author/${encodeURIComponent(author.name)}`)}>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{author.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{author.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {author.books_count} books
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Load More Button for Authors */}
          {visibleAuthorsCount < authors.length && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={handleLoadMoreAuthors}
                className="px-8"
              >
                Load More
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};