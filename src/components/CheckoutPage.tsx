import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { clearCart } from '@/features/cart/cartSlice';
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, MapPin, Phone, User } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { books } = useAppSelector(state => state.cart);
  
  const [formData, setFormData] = useState({
    borrowDate: '',
    returnDate: '',
    address: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call for borrowing books
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch(clearCart());
      toast({
        title: "Success!",
        description: "Books borrowed successfully",
      });
      navigate('/success');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process borrowing",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (books.length === 0) {
    navigate('/');
    return null;
  }

  const totalBooks = books.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your book borrowing</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Borrowing Form */}
          <Card>
            <CardHeader>
              <CardTitle>Borrowing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Borrow Date
                  </label>
                  <Input
                    type="date"
                    value={formData.borrowDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, borrowDate: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Return Date
                  </label>
                  <Input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, returnDate: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm Borrowing'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {books.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.cover_url || '/placeholder.svg'}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.author}</p>
                      <p className="text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Books:</span>
                    <span className="font-bold">{totalBooks}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};