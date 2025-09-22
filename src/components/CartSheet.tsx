import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, BookOpen, Plus, Minus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { removeFromCart, clearCart, setCartOpen } from '@/features/cart/cartSlice';
import { toast } from '@/hooks/use-toast';

export const CartSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { books: cartBooks, isOpen } = useAppSelector(state => state.cart);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const handleRemoveFromCart = (bookId: number) => {
    dispatch(removeFromCart(bookId));
    toast({
      title: 'Book Removed',
      description: 'Book has been removed from your cart.',
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast({
      title: 'Cart Cleared',
      description: 'All books have been removed from your cart.',
    });
  };

  const handleBorrowAll = () => {
    // TODO: Implement actual borrowing logic
    toast({
      title: 'Borrow Request Sent',
      description: `Request to borrow ${cartBooks.length} book(s) has been sent.`,
    });
    dispatch(clearCart());
    dispatch(setCartOpen(false));
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>My Cart</span>
            {cartBooks.length > 0 && (
              <Badge variant="secondary">{cartBooks.length}</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Books you want to borrow
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartBooks.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add some books to get started
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartBooks.map((book) => (
                  <div key={book.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <div className="w-12 h-16 bg-gradient-hero-light rounded flex-shrink-0 flex items-center justify-center">
                      {book.cover_url ? (
                        <img
                          src={book.cover_url}
                          alt={`${book.title} cover`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <BookOpen className="w-6 h-6 text-primary/40" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 leading-tight">
                        {book.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {book.author}
                      </p>
                      {book.isbn && (
                        <p className="text-xs text-muted-foreground">
                          ISBN: {book.isbn}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromCart(book.id)}
                      className="w-8 h-8 p-0 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Books:</span>
                  <Badge variant="outline">{cartBooks.length}</Badge>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCart}
                    className="flex-1"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    onClick={handleBorrowAll}
                    className="flex-1"
                    disabled={cartBooks.length === 0}
                  >
                    Borrow All
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};