import React from 'react';
import { Navbar } from '@/components/Navbar';
import { BookCard } from '@/components/BookCard';
import { CategorySection } from '@/components/CategorySection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { getFeaturedBooks } from '@/data/dummyBooks';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { setSearchQuery, setSortBy, setSortOrder } from '@/features/ui/uiSlice';

export const BooksPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, sortBy, sortOrder } = useAppSelector(state => state.ui);
  const books = getFeaturedBooks();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-6">
        {/* Search and Filters */}
        <div className="px-4 mb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search books, authors, categories..."
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
              </form>

              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(value: any) => dispatch(setSortBy(value))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="date">Date Added</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortOrder} onValueChange={(value: any) => dispatch(setSortOrder(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <CategorySection />

        {/* Results */}
        <div className="px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">All Books</h1>
              <p className="text-muted-foreground">
                {books.length} books found
              </p>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <Button variant="outline">
                Load More Books
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};