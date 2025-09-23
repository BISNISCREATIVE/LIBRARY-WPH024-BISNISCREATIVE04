import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getBooks } from '../api/dummyData'; // Pastikan path ini benar
import { Book } from '../api/books'; // Import tipe data Book
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const BookListPage = () => {
    // Menggunakan useQuery dari TanStack Query untuk fetching data
    const { data, isLoading, isError } = useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
    });

    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = data?.books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (isLoading) {
        return <div className="text-center py-10">Loading books...</div>;
    }

    if (isError) {
        return <div className="text-center py-10 text-red-500">Error loading books.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Daftar Buku</h1>
            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Cari buku..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book: Book) => (
                        <Link to={`/books/${book.id}`} key={book.id}>
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader className="p-0">
                                    <img 
                                        src={book.cover_url || "https://via.placeholder.com/300x400"} 
                                        alt={book.title} 
                                        className="w-full h-auto object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg truncate">{book.title}</CardTitle>
                                    <p className="text-sm text-gray-500 mt-1">{book.author}</p>
                                    <div className="flex items-center text-sm text-yellow-500 mt-2">
                                        <span>★ {book.rating.toFixed(1)}</span>
                                        <span className="ml-2 text-gray-400">({book.reviews_count} reviews)</span>
                                    </div>
                                    <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${book.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">Tidak ada buku yang ditemukan.</p>
                )}
            </div>
        </div>
    );
};

export default BookListPage;
