import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, BookOpen } from 'lucide-react';
import { Book } from '@/api/books';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart } from '@/features/cart/cartSlice';
import { toast } from '@/hooks/use-toast';

interface BookCardProps {
  book: Book;
  className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, className = '' }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { books: cartBooks } = useAppSelector(state => state.cart);

  const isInCart = cartBooks.some(cartBook => cartBook.id === book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    <Link to={`/books/${book.id}`} className={`block group ${className}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-card hover:scale-[1.02] h-full">
        <CardContent className="p-0">
          {/* Book Cover */}
          <div className="aspect-[3/4] bg-gradient-hero-light relative overflow-hidden">
            {book.cover_url ? (
              <img
                src={book.cover_url}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-hero-light flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary/40" />
              </div>
            )}
            
            {/* Stock Badge */}
            {book.stock <= 5 && book.stock > 0 && (
              <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                Only {book.stock} left
              </Badge>
            )}
            
            {book.stock === 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
                Out of Stock
              </Badge>
            )}

            {/* Add to Cart Button - Visible on Hover */}
            {isAuthenticated && book.stock > 0 && (
              <Button
                size="sm"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                {isInCart ? 'In Cart' : 'Add'}
              </Button>
            )}
          </div>

          {/* Book Info */}
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
              {book.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-1">
              {book.author}
            </p>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{book.rating.toFixed(1)}</span>
                </div>
                {book.reviews_count && (
                  <span className="text-xs text-muted-foreground">
                    ({book.reviews_count})
                  </span>
                )}
              </div>
            )}

            {/* Category */}
            {book.category && (
              <Badge variant="outline" className="text-xs w-fit">
                {book.category}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};