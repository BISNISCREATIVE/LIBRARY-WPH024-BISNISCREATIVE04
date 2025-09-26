import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';

interface LoanedBook {
  id: number;
  bookId: number;
  title: string;
  author: string;
  cover_url?: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
}

export const MyLoansPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const [loans, setLoans] = useState<LoanedBook[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock loan data
  const mockLoans: LoanedBook[] = [
    {
      id: 1,
      bookId: 1,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover_url: 'https://via.placeholder.com/200x300?text=Book+Cover',
      borrowDate: '2024-09-15',
      dueDate: '2024-10-15',
      status: 'BORROWED'
    },
    {
      id: 2,
      bookId: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover_url: 'https://via.placeholder.com/200x300?text=Book+Cover',
      borrowDate: '2024-09-10',
      dueDate: '2024-09-25',
      status: 'OVERDUE'
    },
    {
      id: 3,
      bookId: 3,
      title: 'Deep Work',
      author: 'Cal Newport',
      cover_url: 'https://via.placeholder.com/200x300?text=Book+Cover',
      borrowDate: '2024-08-20',
      dueDate: '2024-09-20',
      returnDate: '2024-09-18',
      status: 'RETURNED'
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Simulate API call
    const loadLoans = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoans(mockLoans);
      } catch (error) {
        console.error('Failed to load loans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLoans();
  }, [isAuthenticated, navigate]);

  const currentLoans = loans.filter(loan => loan.status === 'BORROWED' || loan.status === 'OVERDUE');
  const loanHistory = loans.filter(loan => loan.status === 'RETURNED');
  const overdueLoans = loans.filter(loan => loan.status === 'OVERDUE');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BORROWED':
        return 'default';
      case 'OVERDUE':
        return 'destructive';
      case 'RETURNED':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Loans</h1>
          <p className="text-muted-foreground">Manage your borrowed books and loan history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Loans</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentLoans.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{overdueLoans.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loans.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList>
            <TabsTrigger value="current">Current Loans ({currentLoans.length})</TabsTrigger>
            <TabsTrigger value="history">Loan History ({loanHistory.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="w-16 h-20 bg-muted rounded"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                          <div className="h-3 bg-muted rounded w-1/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : currentLoans.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Current Loans</h3>
                  <p className="text-muted-foreground mb-4">You don't have any books currently borrowed.</p>
                  <Button onClick={() => navigate('/books')}>Browse Books</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentLoans.map((loan) => (
                  <Card key={loan.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex space-x-4 mb-4">
                        <img
                          src={loan.cover_url || 'https://via.placeholder.com/64x80?text=Book'}
                          alt={loan.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2">{loan.title}</h3>
                          <p className="text-muted-foreground text-xs mb-2">{loan.author}</p>
                          <Badge variant={getStatusColor(loan.status)} className="text-xs">
                            {loan.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Borrowed: {new Date(loan.borrowDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Due: {new Date(loan.dueDate).toLocaleDateString()}</span>
                        </div>
                        {loan.status === 'BORROWED' && (
                          <div className="text-xs">
                            {getDaysRemaining(loan.dueDate) > 0 ? (
                              <span className="text-green-600">
                                {getDaysRemaining(loan.dueDate)} days remaining
                              </span>
                            ) : (
                              <span className="text-destructive">
                                {Math.abs(getDaysRemaining(loan.dueDate))} days overdue
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => navigate(`/books/${loan.bookId}`)}
                        >
                          View Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {loanHistory.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Loan History</h3>
                  <p className="text-muted-foreground">You haven't returned any books yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loanHistory.map((loan) => (
                  <Card key={loan.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex space-x-4 mb-4">
                        <img
                          src={loan.cover_url || 'https://via.placeholder.com/64x80?text=Book'}
                          alt={loan.title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2">{loan.title}</h3>
                          <p className="text-muted-foreground text-xs mb-2">{loan.author}</p>
                          <Badge variant={getStatusColor(loan.status)} className="text-xs">
                            {loan.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Borrowed: {new Date(loan.borrowDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>Returned: {loan.returnDate && new Date(loan.returnDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate(`/books/${loan.bookId}`)}
                        >
                          View Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};