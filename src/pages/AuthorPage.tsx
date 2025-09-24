import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { ArrowLeft, BookOpen, Star } from 'lucide-react';
import { getBooks } from '@/data/dummyBooks';

export const AuthorPage: React.FC = () => {
  const navigate = useNavigate();
  const { authorName } = useParams<{ authorName: string }>();
  
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const decodedAuthorName = authorName ? decodeURIComponent(authorName) : '';

  useEffect(() => {
    const fetchAuthorBooks = async () => {
      setIsLoading(true);
      try {
        const { books: allBooks } = getBooks(1, 100);
        const authorBooks = allBooks.filter(book => 
          book.author.toLowerCase() === decodedAuthorName.toLowerCase()
        );
        setBooks(authorBooks);
      } catch (error) {
        console.error('Error fetching author books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (decodedAuthorName) {
      fetchAuthorBooks();
    }
  }, [decodedAuthorName]);

  const authorStats = {
    totalBooks: books.length,
    avgRating: books.length > 0 
      ? (books.reduce((sum, book) => sum + (book.rating || 0), 0) / books.length).toFixed(1)
      : '0.0',
    totalReviews: books.reduce((sum, book) => sum + (book.reviews_count || 0), 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Author Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage 
                src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face`} 
                alt={decodedAuthorName} 
              />
              <AvatarFallback className="text-2xl">
                {decodedAuthorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{decodedAuthorName}</h1>
              <p className="text-muted-foreground mb-4">
                Author and writer specializing in various genres including fiction, non-fiction, and educational content.
              </p>
              
              {/* Author Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-semibold">{authorStats.totalBooks}</span> Books
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">
                    <span className="font-semibold">{authorStats.avgRating}</span> Average Rating
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">
                    <span className="font-semibold">{authorStats.totalReviews}</span> Total Reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
        </div>

        {/* Books Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Books by {decodedAuthorName}</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-64 mb-3"></div>
                  <div className="bg-muted rounded h-4 mb-2"></div>
                  <div className="bg-muted rounded h-3 w-3/4"></div>
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No books found for this author.</p>
              <Button onClick={() => navigate('/books')}>
                Browse All Books
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>

        {/* Similar Authors */}
        {books.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Authors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {['James Clear', 'Ryan Holiday', 'Cal Newport'].map((author) => (
                <div 
                  key={author}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/author/${encodeURIComponent(author)}`)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage 
                        src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`} 
                        alt={author} 
                      />
                      <AvatarFallback>
                        {author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{author}</h3>
                      <p className="text-sm text-muted-foreground">Author</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};