import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';
import { booksAPI } from '@/api/books'; // Correct import added here

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAdded?: () => void;
}

interface BookFormData {
  title: string;
  author: string;
  category: string;
  pages: string;
  description: string;
  cover_url: string;
}

const categories = [
  'Fiction',
  'Non-Fiction',
  'Self-Improvement',
  'Finance',
  'Science',
  'Education',
  'Business & Economics',
  'Romance',
  'Thriller',
  'Mystery',
  'Fantasy',
  'Horror'
];

export const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onBookAdded }) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    category: '',
    pages: '',
    description: '',
    cover_url: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof BookFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.pages.trim()) newErrors.pages = 'Number of pages is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    // Validasi file gambar
    if (!coverFile) newErrors.cover = 'Cover image is required';
    else if (!['image/png', 'image/jpeg'].includes(coverFile.type)) newErrors.cover = 'Only PNG or JPG allowed';
    else if (coverFile.size > 5 * 1024 * 1024) newErrors.cover = 'Max file size is 5MB';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, cover: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Add missing 'stock' property as required by the API
      const book = await booksAPI.createBook({
        title: formData.title,
        author: formData.author,
        category: formData.category,
        pages: Number(formData.pages),
        description: formData.description,
        stock: 1, // Default stock value, adjust as needed
        coverFile: coverFile!,
      });

      toast({
        title: 'Success',
        description: 'Book added successfully!',
      });

      // Reset form
      setFormData({
        title: '',
        author: '',
        category: '',
        pages: '',
        description: '',
        cover_url: '',
      });
      setCoverFile(null);
      setCoverPreview(null);

      onBookAdded?.();
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add book. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        title: '',
        author: '',
        category: '',
        pages: '',
        description: '',
        cover_url: ''
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl rounded-xl px-2 md:px-8 py-6 md:py-8">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <div>
              <DialogTitle className="text-2xl md:text-3xl font-bold mb-2">Add Book</DialogTitle>
              <DialogDescription className="text-muted-foreground text-base md:text-lg mb-4">
                Add a new book to the library collection
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-semibold">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter book title"
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author" className="font-semibold">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Enter author name"
                className={errors.author ? 'border-destructive' : ''}
              />
              {errors.author && (
                <p className="text-sm text-destructive">{errors.author}</p>
              )}
            </div>
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="font-semibold">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>
            {/* Number of Pages */}
            <div className="space-y-2">
              <Label htmlFor="pages" className="font-semibold">Number of Pages</Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => handleInputChange('pages', e.target.value)}
                placeholder="320"
                className={errors.pages ? 'border-destructive' : ''}
              />
              {errors.pages && (
                <p className="text-sm text-destructive">{errors.pages}</p>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-semibold">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter book description"
              rows={4}
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
          {/* Cover Image */}
          <div className="space-y-2">
            <Label className="font-semibold">Cover Image</Label>
            <div className={`border-2 border-dashed rounded-lg p-6 md:p-8 text-center ${errors.cover ? 'border-destructive' : 'border-muted-foreground'}`}>
              {coverPreview ? (
                <img src={coverPreview} alt="Preview" className="mx-auto mb-4 w-32 h-40 object-cover rounded-lg border shadow" />
              ) : (
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleCoverChange}
                className="hidden"
                id="cover-upload"
              />
              <label htmlFor="cover-upload">
                <Button variant="link" className="p-0 h-auto text-primary cursor-pointer font-semibold">
                  Click to upload
                </Button>
              </label>
              <span> or drag and drop</span>
              <p className="text-xs text-muted-foreground">PNG or JPG (max. 5mb)</p>
              {errors.cover && <p className="text-sm text-destructive mt-2">{errors.cover}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? 'Adding Book...' : 'Save'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};