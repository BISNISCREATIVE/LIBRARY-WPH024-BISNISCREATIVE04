import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state
  const { bookTitle, dueDate } = location.state || {};
  
  const handleViewBorrowedList = () => {
    navigate('/profile', { state: { activeTab: 'borrowed' } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Borrowing Successful!</h1>
            <div className="space-y-2">
              {bookTitle && (
                <p className="text-muted-foreground">
                  Your book <span className="font-semibold text-foreground">"{bookTitle}"</span> has been successfully borrowed.
                </p>
              )}
              {dueDate ? (
                <p className="text-muted-foreground">
                  Please return it by <span className="text-red-600 font-semibold">{dueDate}</span>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Please return it by <span className="text-red-600 font-semibold">31 August 2025</span>
                </p>
              )}
            </div>
          </div>
          
          {/* Action Button */}
          <Button onClick={handleViewBorrowedList} className="w-full">
            See Borrowed List
          </Button>
        </div>
      </main>
    </div>
  );
};