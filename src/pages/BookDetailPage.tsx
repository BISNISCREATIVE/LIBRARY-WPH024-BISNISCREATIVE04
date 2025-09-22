import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Star, ArrowLeft, BookOpen, Calendar, User, Globe, Hash } from 'lucide-react';
import { dummyBooks } from '@/data/dummyBooks';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { addToCart } from '@/features/cart/cartSlice';
import { toast } from '@/hooks/use-toast';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { books: cartBooks } = useAppSelector(state => state.cart);
  
  const book = dummyBooks.find(b => b.id === parseInt(id || '0'));
  
  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
            <p className="text-muted-foreground mb-4">The book you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/books')}>
              Browse Books
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isInCart = cartBooks.some(cartBook => cartBook.id === book.id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please login to add books to your cart.',
        variant: 'destructive',
      });
      return;
    }

    if (book.stock <= 0) {
      toast({
        title: 'Out of Stock',
        description: 'This book is currently unavailable.',
        variant: 'destructive',
      });
      return;
    }

    if (isInCart) {
      toast({
        title: 'Already in Cart',
        description: 'This book is already in your cart.',
      });
      return;
    }

    dispatch(addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      cover_url: book.cover_url,
      isbn: book.isbn,
    }));

    toast({
      title: 'Added to Cart',
      description: `"${book.title}" has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-6">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gradient-hero-light relative overflow-hidden rounded-lg">
                    {book.cover_url ? (
                      <img
                        src={book.cover_url}
                        alt={`${book.title} cover`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-20 h-20 text-primary/40" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full" 
                  onClick={handleAddToCart}
                  disabled={!isAuthenticated || book.stock <= 0 || isInCart}
                >
                  {!isAuthenticated ? 'Login to Borrow' : 
                   book.stock <= 0 ? 'Out of Stock' :
                   isInCart ? 'In Cart' : 'Add to Cart'}
                </Button>
                
                {isAuthenticated && (
                  <Button variant="outline" className="w-full">
                    Borrow Now
                  </Button>
                )}
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Author */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
                
                {/* Rating */}
                {book.rating && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${
                            i < Math.floor(book.rating!) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium">{book.rating.toFixed(1)}</span>
                    {book.reviews_count && (
                      <span className="text-muted-foreground">
                        ({book.reviews_count} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* Category and Stock */}
                <div className="flex items-center space-x-3 mb-6">
                  <Badge variant="outline">{book.category}</Badge>
                  <Badge variant={book.stock > 5 ? "secondary" : book.stock > 0 ? "default" : "destructive"}>
                    {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              {book.description && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Book Information */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Book Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {book.published_year && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Published:</span>
                        <span>{book.published_year}</span>
                      </div>
                    )}
                    
                    {book.pages && (
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Pages:</span>
                        <span>{book.pages}</span>
                      </div>
                    )}
                    
                    {book.language && (
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Language:</span>
                        <span>{book.language}</span>
                      </div>
                    )}
                    
                    {book.isbn && (
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">ISBN:</span>
                        <span className="font-mono text-xs">{book.isbn}</span>
                      </div>
                    )}
                    
                    {book.publisher && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Publisher:</span>
                        <span>{book.publisher}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No reviews yet. Be the first to review this book!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};