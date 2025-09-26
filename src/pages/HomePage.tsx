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

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        
        // Mock featured books
        const mockFeaturedBooks: Book[] = [
          { id: 1, title: '21 Raga Bakso Pak Bowo', author: 'TuHu', category: 'Fiction', stock: 5, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Bakso+Book' },
          { id: 2, title: 'Lisa Kleypas Irresistible', author: 'Lisa Kleypas', category: 'Romance', stock: 3, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Lisa+Book' },
          { id: 3, title: 'Oliver Twist', author: 'Charles Dickens', category: 'Classic', stock: 4, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Oliver+Book' },
          { id: 4, title: 'Jack London White Fang', author: 'Jack London', category: 'Adventure', stock: 6, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=White+Fang' },
          { id: 5, title: 'The Scarred Woman', author: 'Jussi Adler-Olsen', category: 'Thriller', stock: 2, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Scarred+Book' }
        ];

        // Mock popular books (second row)
        const mockPopularBooks: Book[] = [
          { id: 6, title: 'Silent Snow', author: 'Robert Grosso', category: 'Drama', stock: 3, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Silent+Snow' },
          { id: 7, title: 'Kapan Pindah Rumah', author: 'Various', category: 'Self-Help', stock: 5, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Pindah+Rumah' },
          { id: 8, title: 'Yeti Terbersik Yang Abadi', author: 'Local Author', category: 'Fantasy', stock: 4, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Yeti+Book' },
          { id: 9, title: 'Rumah Yang Menelan Penghuninya', author: 'Kenken Layla', category: 'Horror', stock: 2, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Rumah+Horror' },
          { id: 10, title: 'Other Half of Me', author: 'Elsa Puspita', category: 'Romance', stock: 6, rating: 4.9, cover_url: 'https://via.placeholder.com/200x300?text=Other+Half' }
        ];

        // Mock authors
        const mockAuthors: Author[] = [
          { id: 1, name: 'Author name', books_count: 5, avatar: 'https://via.placeholder.com/64x64?text=A1' },
          { id: 2, name: 'Author name', books_count: 5, avatar: 'https://via.placeholder.com/64x64?text=A2' },
          { id: 3, name: 'Author name', books_count: 5, avatar: 'https://via.placeholder.com/64x64?text=A3' },
          { id: 4, name: 'Author name', books_count: 5, avatar: 'https://via.placeholder.com/64x64?text=A4' }
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

          {/* Load More Button */}
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
              {authors.map((author) => (
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
        </section>
      </main>

      <Footer />
    </div>
  );
};