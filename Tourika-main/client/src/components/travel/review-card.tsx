import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Review } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card className="bg-card rounded-xl shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={review.userAvatar} 
            alt={review.userName}
            className="w-12 h-12 object-cover rounded-full"
            data-testid={`img-reviewer-${review.id}`}
          />
          <div>
            <h4 className="font-semibold text-foreground" data-testid={`text-reviewer-name-${review.id}`}>
              {review.userName}
            </h4>
            <div className="flex items-center space-x-1" data-testid={`rating-${review.id}`}>
              <div className="flex space-x-1">
                {renderStars(review.rating)}
              </div>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mb-4" data-testid={`text-review-content-${review.id}`}>
          {review.content}
        </p>
        <div className="text-sm text-muted-foreground" data-testid={`text-review-details-${review.id}`}>
          {review.destination} • {review.tripDate}
        </div>
      </CardContent>
    </Card>
  );
}
