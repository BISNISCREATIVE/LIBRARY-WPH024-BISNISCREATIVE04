import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Plus, Edit, Trash2, MoreHorizontal, Eye, BookOpen } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { Navbar } from '@/components/Navbar';
import { AddBookModal } from '@/components/admin/AddBookModal';
import { EditBookModal } from '@/components/admin/EditBookModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { booksAPI, Book } from '@/api/books';
import { dummyBooks } from '@/data/dummyBooks';
import { toast } from '@/hooks/use-toast';

export const BookManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>(dummyBooks);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setIsLoading(true);
    try {
      // Try to fetch from API, fallback to dummy data
      try {
        const data = await booksAPI.getBooks();
        setBooks(data.books);
      } catch (apiError) {
        console.log('API not available, using dummy data');
        // Keep dummy data as fallback
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load books',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsEditBookOpen(true);
  };

  const handleDeleteBook = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedBook) {
      setBooks(prev => prev.filter(book => book.id !== selectedBook.id));
      toast({
        title: 'Success',
        description: 'Book deleted successfully',
      });
    }
    setSelectedBook(null);
  };

  const handleBookAdded = () => {
    loadBooks();
    toast({
      title: 'Success',
      description: 'Book added successfully',
    });
  };

  const handleBookUpdated = () => {
    loadBooks();
    toast({
      title: 'Success', 
      description: 'Book updated successfully',
    });
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <Tabs defaultValue="books" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="borrowed">Borrowed List</TabsTrigger>
              <TabsTrigger value="users">User</TabsTrigger>
              <TabsTrigger value="books">Book List</TabsTrigger>
            </TabsList>

            {/* Books Tab */}
            <TabsContent value="books" className="mt-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold">Book List</h1>
                  <Button onClick={() => setIsAddBookOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Book
                  </Button>
                </div>
                
                {/* Search */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search books..."
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
                            <TableHead>Cover</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBooks.map((book) => (
                            <TableRow key={book.id}>
                              <TableCell>
                                <img 
                                  src={book.cover_url} 
                                  alt={book.title}
                                  className="w-12 h-16 object-cover rounded"
                                />
                              </TableCell>
                              <TableCell className="font-medium">{book.title}</TableCell>
                              <TableCell>{book.author}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">{book.category}</Badge>
                              </TableCell>
                              <TableCell>{book.stock}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  ⭐ {book.rating?.toFixed(1) || 'N/A'}
                                </div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => navigate(`/books/${book.id}`)}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEditBook(book)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleDeleteBook(book)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {filteredBooks.map((book) => (
                    <Card key={book.id}>
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <img 
                            src={book.cover_url} 
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 space-y-2">
                            <h3 className="font-semibold text-lg">{book.title}</h3>
                            <p className="text-muted-foreground">{book.author}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{book.category}</Badge>
                              <span className="text-sm">Stock: {book.stock}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                ⭐ <span className="ml-1">{book.rating?.toFixed(1) || 'N/A'}</span>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => navigate(`/books/${book.id}`)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEditBook(book)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteBook(book)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredBooks.length} of {books.length} books
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
            </TabsContent>

            {/* Other tabs placeholder */}
            <TabsContent value="borrowed" className="mt-8">
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Borrowed List Management</h3>
                <p className="text-muted-foreground">Navigate to borrowed list functionality...</p>
                <Button className="mt-4" onClick={() => navigate('/admin/users')}>
                  Go to Borrowed List
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-8">
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">User Management</h3>
                <p className="text-muted-foreground">Navigate to user management functionality...</p>
                <Button className="mt-4" onClick={() => navigate('/admin/users')}>
                  Go to User Management
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Modals */}
        <AddBookModal 
          isOpen={isAddBookOpen}
          onClose={() => setIsAddBookOpen(false)}
          onBookAdded={handleBookAdded}
        />
        
        {selectedBook && (
          <EditBookModal
            isOpen={isEditBookOpen}
            onClose={() => {
              setIsEditBookOpen(false);
              setSelectedBook(null);
            }}
            book={selectedBook}
            onBookUpdated={handleBookUpdated}
          />
        )}

        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedBook(null);
          }}
          onConfirm={handleDeleteConfirm}
          title="Delete Book"
          description="Are you sure you want to delete this book? This action cannot be undone."
          itemName={selectedBook?.title || ''}
        />
      </main>
    </div>
  );
};
