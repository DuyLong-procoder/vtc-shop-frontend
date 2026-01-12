// components/shared/rating-stars.tsx

import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number; // 0-5
  reviews?: number;
}

export default function RatingStars({ rating, reviews }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      
     
      {reviews && (
        <span className="text-sm text-gray-500">({reviews})</span>
      )}
    </div>
  );
}