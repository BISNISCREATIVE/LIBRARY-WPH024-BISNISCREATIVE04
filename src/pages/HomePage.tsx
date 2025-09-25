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

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [popularBooks, setPopularBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [featured, popular] = await Promise.all([
          booksAPI.getFeaturedBooks(5),
          booksAPI.getPopularBooks(10)
        ]);
        setFeaturedBooks(featured);
        setPopularBooks(popular);
      } catch (error) {
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

          {/* Load More Button */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate('/books')}
              className="px-8"
            >
              Load More
            </Button>
          </div>
        </section>

        {/* Popular Books Section */}
        <section className="px-4 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Books</h2>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg aspect-[3/4] mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-1"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {popularBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};