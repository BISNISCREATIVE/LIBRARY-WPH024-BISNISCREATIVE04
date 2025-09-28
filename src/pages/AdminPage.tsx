import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  BookOpen, 
  Calendar,
  Search,
  Filter,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppSelector } from '@/app/hooks';
import { Navbar } from '@/components/Navbar';
import { AddBookModal } from '@/components/admin/AddBookModal';
import { EditBookModal } from '@/components/admin/EditBookModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { toast } from '@/hooks/use-toast';

interface AdminBook {
  id: number;
  title: string;
  author: string;
  category: string;
  stock: number;
  status: string;
  pages?: number;
  description?: string;
  cover_url?: string;
  rating?: number;
}

interface BorrowedBook {
  id: number;
  bookTitle: string;
  userName: string;
  userEmail: string;
  borrowDate: string;
  dueDate: string;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  joinedDate: string;
  booksCount: number;
  avatar?: string;
}

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [bookFilter, setBookFilter] = useState('All');
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<AdminBook | null>(null);
  const [deleteItem, setDeleteItem] = useState<{ type: 'book' | 'user', id: number, name: string } | null>(null);

  // Mock data
  const [books, setBooks] = useState<AdminBook[]>([
    {
      id: 1,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      category: 'Business & Economics',
      stock: 5,
      status: 'Available'
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Self-Help',
      stock: 3,
      status: 'Available'
    },
    {
      id: 3,
      title: 'Deep Work',
      author: 'Cal Newport',
      category: 'Productivity',
      stock: 0,
      status: 'Out of Stock'
    }
  ]);

  const [borrowedBooks] = useState<BorrowedBook[]>([
    {
      id: 1,
      bookTitle: 'The Psychology of Money',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      borrowDate: '2024-08-15',
      dueDate: '2024-08-31',
      status: 'BORROWED'
    },
    {
      id: 2,
      bookTitle: 'Atomic Habits',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      borrowDate: '2024-08-10',
      dueDate: '2024-08-25',
      status: 'OVERDUE'
    }
  ]);

  const [users] = useState<AdminUser[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      joinedDate: '2024-01-15',
      booksCount: 2
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'USER',
      joinedDate: '2024-02-20',
      booksCount: 1
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN',
      joinedDate: '2023-12-01',
      booksCount: 0
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleEditBook = (book: AdminBook) => {
    setSelectedBook(book);
    setIsEditBookOpen(true);
  };

  const handleDeleteBook = (book: AdminBook) => {
    setDeleteItem({ type: 'book', id: book.id, name: book.title });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = (user: AdminUser) => {
    setDeleteItem({ type: 'user', id: user.id, name: user.name });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteItem?.type === 'book') {
      setBooks(prev => prev.filter(book => book.id !== deleteItem.id));
    }
    // Handle user deletion if needed
    setDeleteItem(null);
  };

  const handleBookAdded = () => {
    // Refresh books list
    toast({
      title: 'Success',
      description: 'Book list has been updated.',
    });
  };

  const handleBookUpdated = () => {
    // Refresh books list
    toast({
      title: 'Success', 
      description: 'Book information has been updated.',
    });
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = bookFilter === 'All' || 
                         (bookFilter === 'Available' && book.status === 'Available') ||
                         (bookFilter === 'Borrowed' && book.status === 'Borrowed') ||
                         (bookFilter === 'Returned' && book.status === 'Returned') ||
                         (bookFilter === 'Damaged' && book.status === 'Damaged');
    return matchesSearch && matchesFilter;
  });

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  const stats = {
    totalBooks: books.length,
    totalUsers: users.filter(u => u.role === 'USER').length,
    totalBorrowed: borrowedBooks.filter(b => b.status === 'BORROWED').length,
    overdue: borrowedBooks.filter(b => b.status === 'OVERDUE').length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage books, users, and borrowing activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBooks}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Currently Borrowed</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBorrowed}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <Calendar className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.overdue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="books">Book List</TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed List</TabsTrigger>
            <TabsTrigger value="users">User List</TabsTrigger>
            <TabsTrigger value="add">Add Book</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/books')}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Book Management</span>
                  </CardTitle>
                  <CardDescription>Manage library books, add new titles, edit details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalBooks}</div>
                  <p className="text-muted-foreground">Total Books</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/users')}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>User Management</span>
                  </CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
                  <p className="text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/users')}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Borrowed List</span>
                  </CardTitle>
                  <CardDescription>Monitor borrowed books and due dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalBorrowed}</div>
                  <p className="text-muted-foreground">Currently Borrowed</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Books Tab */}
          <TabsContent value="books">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Book Management</CardTitle>
                    <CardDescription>Manage your library's book collection</CardDescription>
                  </div>
                  <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Book
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Book</DialogTitle>
                        <DialogDescription>
                          Add a new book to the library collection
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Book Title" />
                        <Input placeholder="Author" />
                        <Input placeholder="Category" />
                        <Input placeholder="Stock Quantity" type="number" />
                        <Button className="w-full">Add Book</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search books..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.stock}</TableCell>
                        <TableCell>
                          <Badge variant={book.status === 'Available' ? 'default' : 'destructive'}>
                            {book.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Borrowed List Tab */}
          <TabsContent value="borrowed">
            <Card>
              <CardHeader>
                <CardTitle>Borrowed Books</CardTitle>
                <CardDescription>Monitor all borrowed books and their due dates</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Title</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Borrow Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowedBooks.map((borrow) => (
                      <TableRow key={borrow.id}>
                        <TableCell className="font-medium">{borrow.bookTitle}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{borrow.userName}</div>
                            <div className="text-sm text-muted-foreground">{borrow.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{borrow.borrowDate}</TableCell>
                        <TableCell>{borrow.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant={borrow.status === 'BORROWED' ? 'default' : 'destructive'}>
                            {borrow.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Mark Returned
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage library users and their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Books Borrowed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>
                                {user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell>{user.booksCount}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Book Tab */}
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Book</CardTitle>
                <CardDescription>Add a new book to the library collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Book Title</label>
                    <Input placeholder="Enter book title" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Author</label>
                    <Input placeholder="Enter author name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Input placeholder="Enter category" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">ISBN</label>
                    <Input placeholder="Enter ISBN" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Stock Quantity</label>
                    <Input type="number" placeholder="Enter stock quantity" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Published Year</label>
                    <Input type="number" placeholder="Enter published year" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full p-3 border rounded-md"
                    rows={4}
                    placeholder="Enter book description"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cover URL</label>
                  <Input placeholder="Enter cover image URL" />
                </div>
                <Button className="w-full">Add Book to Library</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
