import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Search, Users, BookOpen, Calendar } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { Navbar } from '@/components/Navbar';
import { usersAPI, User } from '@/api/users';
import { loansAPI, Loan } from '@/api/loans';
import { booksAPI, Book } from '@/api/books';
import { toast } from '@/hooks/use-toast';

// Dummy data that matches the Figma designs
const dummyUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 2, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 3, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 4, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 5, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 6, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 7, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 8, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 9, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
  { id: 10, name: 'John Doe', email: 'johndoe@email.com', role: 'USER', created_at: '28 Aug 2025, 14:00', updated_at: '28 Aug 2025, 14:00' },
];

const dummyLoans: Loan[] = [
  {
    id: 1,
    book_id: 1,
    user_id: 1,
    borrow_date: '29 Aug 2025',
    due_date: '31 August 2025',
    status: 'BORROWED',
    book: {
      id: 1,
      title: 'Book Name',
      author: 'Author name',
      cover_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop'
    }
  },
  {
    id: 2,
    book_id: 2,
    user_id: 2,
    borrow_date: '29 Aug 2025',
    due_date: '31 August 2025',
    status: 'BORROWED',
    book: {
      id: 2,
      title: 'Book Name',
      author: 'Author name',
      cover_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop'
    }
  },
  {
    id: 3,
    book_id: 3,
    user_id: 3,
    borrow_date: '29 Aug 2025',
    due_date: '31 August 2025',
    status: 'BORROWED',
    book: {
      id: 3,
      title: 'Book Name',
      author: 'Author name',
      cover_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop'
    }
  }
];

export const UsersManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [loans, setLoans] = useState<Loan[]>(dummyLoans);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Try to fetch from API, fallback to dummy data
      try {
        const [usersData, loansData, booksData] = await Promise.all([
          usersAPI.getUsers(),
          loansAPI.getAllLoans(),
          booksAPI.getBooks()
        ]);
        
        setUsers(usersData);
        setLoans(loansData);
        setBooks(booksData.books);
      } catch (apiError) {
        console.log('API not available, using dummy data');
        // Keep dummy data as fallback
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalUsers: users.filter(u => u.role === 'USER').length,
    totalBorrowed: loans.filter(l => l.status === 'BORROWED').length,
    totalBooks: books.length
  };

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="borrowed">Borrowed List</TabsTrigger>
              <TabsTrigger value="users">User</TabsTrigger>
              <TabsTrigger value="books">Book List</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="mt-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">User</h1>
                
                {/* Search */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search user"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Nomor Handphone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Created at</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user, index) => (
                            <TableRow key={user.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>081234567890</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.created_at}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-muted-foreground">
                      Showing 1 to 10 of 60 entries
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Previous</Button>
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <span className="text-muted-foreground">...</span>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {filteredUsers.map((user, index) => (
                    <Card key={user.id}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">No</span>
                          <span>{index + 1}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Name</span>
                          <span>{user.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Email</span>
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Nomor Handphone</span>
                          <span>081234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Created at</span>
                          <span className="text-sm">{user.created_at}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Mobile Pagination */}
                  <div className="flex items-center justify-between mt-6">
                    <Button variant="outline" size="sm">Previous</Button>
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <span className="text-muted-foreground text-sm">...</span>
                    </div>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Borrowed List Tab */}
            <TabsContent value="borrowed" className="mt-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Borrowed List</h1>
                
                {/* Search */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search"
                    className="pl-10"
                  />
                </div>

                {/* Filter Tabs */}
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="returned">Returned</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Status Headers */}
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>Status <span className="text-green-600">Active</span></span>
                  <span>Due Date <span className="text-red-500">31 August 2025</span></span>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block space-y-4">
                  {loans.map((loan) => (
                    <Card key={loan.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img 
                            src={loan.book?.cover_url} 
                            alt={loan.book?.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Category</p>
                                <h3 className="font-semibold">{loan.book?.title}</h3>
                                <p className="text-sm text-muted-foreground">{loan.book?.author}</p>
                                <p className="text-sm">{loan.borrow_date} · Duration 3 Days</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm">borrower's name</p>
                                <p className="font-medium">John Doe</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                  {loans.map((loan) => (
                    <Card key={loan.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center text-sm font-medium mb-4">
                          <span>Status <span className="text-green-600">Active</span></span>
                          <span>Due Date <span className="text-red-500">31 August 2025</span></span>
                        </div>
                        <div className="flex space-x-3">
                          <img 
                            src={loan.book?.cover_url} 
                            alt={loan.book?.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm text-muted-foreground">Category</p>
                            <h3 className="font-semibold">{loan.book?.title}</h3>
                            <p className="text-sm text-muted-foreground">{loan.book?.author}</p>
                            <p className="text-sm">{loan.borrow_date} · Duration 3 Days</p>
                            <div className="pt-2">
                              <p className="text-sm">borrower's name</p>
                              <p className="font-medium">John Doe</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Books Tab */}
            <TabsContent value="books" className="mt-8">
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Book List Management</h3>
                <p className="text-muted-foreground">Book management functionality coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
