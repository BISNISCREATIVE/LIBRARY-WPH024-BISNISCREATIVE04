import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { BookCard } from '@/components/BookCard';
import { Footer } from '@/components/Footer';
import { getFeaturedBooks, popularAuthors } from '@/data/dummyBooks';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredBooks = getFeaturedBooks();

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

        {/* Popular Authors Section */}
        <section className="px-4 mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Authors</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularAuthors.map((author) => (
              <div 
                key={author.id}
                className="flex items-center space-x-3 p-4 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                onClick={() => navigate(`/authors/${author.id}`)}
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{author.name}</p>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {author.booksCount} books
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};