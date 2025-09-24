import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, MessageCircle } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { toast } from '@/hooks/use-toast';

interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  bookId: number;
  bookTitle: string;
  averageRating?: number;
  totalReviews?: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  bookId,
  bookTitle,
  averageRating = 4.9,
  totalReviews = 24
}) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userId: 1,
      userName: 'John Doe',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam viverra nunc sed facilisis. Integer tristique nullam morbi mauris ante.',
      date: '25 August 2025, 15:36'
    },
    {
      id: 2,
      userId: 2,
      userName: 'Jane Smith',
      userAvatar: '/api/placeholder/40/40',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam viverra nunc sed facilisis. Integer tristique nullam morbi mauris ante.',
      date: '25 August 2025, 15:36'
    },
    {
      id: 3,
      userId: 3,
      userName: 'Mike Johnson',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam viverra nunc sed facilisis. Integer tristique nullam morbi mauris ante.',
      date: '25 August 2025, 15:36'
    },
    {
      id: 4,
      userId: 4,
      userName: 'Sarah Wilson',
      userAvatar: '/api/placeholder/40/40',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam viverra nunc sed facilisis. Integer tristique nullam morbi mauris ante.',
      date: '25 August 2025, 15:36'
    },
    {
      id: 5,
      userId: 5,
      userName: 'David Brown',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam viverra nunc sed facilisis. Integer tristique nullam morbi mauris ante.',
      date: '25 August 2025, 15:36'
    },
    {
      id: 6,
      userId: 6,
      userName: 'Emily Davis',
      userAvatar: '/api/placeholder/40/40',
      rating: 4,
      comment: 'Lorem ipsum dolor sit amet consectetur. Pulvinar porttitor aliquam viverra nunc sed facililis. Integer tristique nullam morbi mauris ante.',
      date: '25 August 2025, 15:36'
    }
  ]);
  
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(6);

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive && onStarClick ? () => onStarClick(i + 1) : undefined}
      />
    ));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please login to submit a review.',
        variant: 'destructive',
      });
      return;
    }

    if (!newReview.trim() || newRating === 0) {
      toast({
        title: 'Incomplete Review',
        description: 'Please provide both a rating and a review comment.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const review: Review = {
        id: reviews.length + 1,
        userId: user?.id || 0,
        userName: user?.name || 'Anonymous',
        userAvatar: user?.avatar || '/api/placeholder/40/40',
        rating: newRating,
        comment: newReview,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) + ', ' + new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setReviews(prev => [review, ...prev]);
      setNewReview('');
      setNewRating(0);

      toast({
        title: 'Review Submitted',
        description: 'Thank you for your review!',
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 6);
  };

  return (
    <div className="space-y-6">
      {/* Review Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Review</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(Math.floor(averageRating))}
          </div>
          <span className="font-semibold">{averageRating}</span>
          <span className="text-muted-foreground">({totalReviews} Ulasan)</span>
        </div>
      </div>

      {/* Add Review Form */}
      {isAuthenticated && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <div className="flex items-center space-x-1">
                  {renderStars(newRating, true, setNewRating)}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                  rows={4}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.userAvatar} alt={review.userName} />
                    <AvatarFallback>
                      {review.userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {visibleReviews < reviews.length && (
          <div className="text-center">
            <Button variant="outline" onClick={loadMoreReviews}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};