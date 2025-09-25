import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { removeFromCart, updateQuantity, toggleCart, setCartOpen } from '@/features/cart/cartSlice';
import { ShoppingCart, Minus, Plus, Trash2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CartSheet: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { books: cartBooks, isOpen } = useAppSelector(state => state.cart);
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { toast } = useToast();

  const handleRemoveFromCart = (bookId: number) => {
    dispatch(removeFromCart(bookId));
    toast({
      title: 'Book Removed',
      description: 'Book has been removed from your cart.',
    });
  };

  const handleUpdateQuantity = (bookId: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(bookId);
      return;
    }
    dispatch(updateQuantity({ id: bookId, quantity }));
  };

  const handleCheckout = () => {
    dispatch(setCartOpen(false));
    navigate('/checkout');
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
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(book.id, book.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{book.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(book.id, book.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
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

              {/* Cart Summary */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Books:</span>
                  <Badge variant="outline">
                    {cartBooks.reduce((sum, book) => sum + book.quantity, 0)}
                  </Badge>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  disabled={cartBooks.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};