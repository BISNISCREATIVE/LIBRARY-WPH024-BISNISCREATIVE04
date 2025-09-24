import React, { useState, useEffect } from 'react';
import { BookCard } from '@/components/BookCard';
import { getBooks } from '@/data/dummyBooks';
import type { Book } from '@/api/books';

interface RelatedBooksProps {
  currentBookId: number;
  category: string;
  author: string;
}

export const RelatedBooks: React.FC<RelatedBooksProps> = ({
  currentBookId,
  category,
  author
}) => {
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedBooks = async () => {
      setIsLoading(true);
      try {
        const { books: allBooks } = getBooks(1, 50);
        
        // Filter books by same category or author, excluding current book
        const related = allBooks
          .filter(book => 
            book.id !== currentBookId && 
            (book.category === category || book.author === author)
          )
          .slice(0, 5); // Limit to 5 books

        setRelatedBooks(related);
      } catch (error) {
        console.error('Error fetching related books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedBooks();
  }, [currentBookId, category, author]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Related Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-lg h-48 mb-3"></div>
              <div className="bg-muted rounded h-4 mb-2"></div>
              <div className="bg-muted rounded h-3 w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedBooks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Related Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {relatedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};