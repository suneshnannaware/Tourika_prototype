import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Destination } from "@shared/schema";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="travel-card bg-card rounded-xl overflow-hidden shadow-lg">
      <img 
        src={destination.imageUrl} 
        alt={destination.name}
        className="w-full h-48 object-cover"
        data-testid={`img-destination-${destination.id}`}
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-destination-name-${destination.id}`}>
          {destination.name}
        </h3>
        <p className="text-muted-foreground mb-4" data-testid={`text-destination-description-${destination.id}`}>
          {destination.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary" data-testid={`text-destination-price-${destination.id}`}>
            From ${destination.price}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-sm text-muted-foreground" data-testid={`text-destination-rating-${destination.id}`}>
              {(destination.rating / 10).toFixed(1)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
