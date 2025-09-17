import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Clock } from "lucide-react";
import type { TravelPlan } from "@shared/schema";

interface ItineraryDisplayProps {
  travelPlan: TravelPlan;
}

export default function ItineraryDisplay({ travelPlan }: ItineraryDisplayProps) {
  const itinerary = travelPlan.itinerary as any;

  return (
    <div className="space-y-6">
      <Card className="bg-card border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" data-testid="text-itinerary-title">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Your Travel Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm" data-testid="text-travel-dates">
                {travelPlan.startDate} to {travelPlan.endDate}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm" data-testid="text-travel-budget">
                Budget: ${travelPlan.budget}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" data-testid="badge-travel-style">{travelPlan.travelStyle}</Badge>
            {travelPlan.interests.map((interest) => (
              <Badge key={interest} variant="secondary" data-testid={`badge-selected-interest-${interest.toLowerCase().replace(/\s+/g, '-')}`}>
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Overview */}
      {itinerary?.totalEstimatedCost && (
        <Card className="bg-card border border-border shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget Used</p>
                <p className="text-2xl font-bold text-primary" data-testid="text-budget-overview">
                  ${itinerary.totalEstimatedCost} / ${travelPlan.budget}
                </p>
                <p className="text-sm text-muted-foreground" data-testid="text-budget-percentage">
                  {Math.round((itinerary.totalEstimatedCost / travelPlan.budget) * 100)}% of budget used
                </p>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Itinerary */}
      {itinerary?.days && (
        <Card className="bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle data-testid="text-daily-itinerary-title">Daily Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {itinerary.days.map((day: any) => (
                <div key={day.day} className="flex space-x-4 p-4 bg-muted rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white" data-testid={`text-day-number-${day.day}`}>
                      {day.day}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2" data-testid={`text-day-title-${day.day}`}>
                      Day {day.day}: {day.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3" data-testid={`text-day-description-${day.day}`}>
                      {day.description}
                    </p>
                    {day.activities && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-foreground mb-2">Activities:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {day.activities.map((activity: string, index: number) => (
                            <li key={index} data-testid={`text-activity-${day.day}-${index}`}>
                              • {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" data-testid={`badge-day-category-${day.day}`}>
                        {day.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center" data-testid={`text-day-cost-${day.day}`}>
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${day.estimatedCost} estimated
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Real-time Insights */}
      {itinerary?.recommendations && (
        <Card className="bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle data-testid="text-insights-title">Travel Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-foreground" data-testid="text-weather-recommendation">
                  Weather: {itinerary.recommendations.weather}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-foreground" data-testid="text-crowd-recommendation">
                  Crowd Level: {itinerary.recommendations.crowdLevel}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-foreground" data-testid="text-currency-recommendation">
                  Currency: {itinerary.recommendations.currency}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-foreground" data-testid="text-best-time-recommendation">
                  Best Time: {itinerary.recommendations.bestTimeToVisit}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button className="px-8 py-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors" data-testid="button-book-trip">
          Book This Trip
        </Button>
      </div>
    </div>
  );
}
