import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, Users, Clock, CreditCard, Phone } from "lucide-react";
import DestinationCard from "@/components/travel/destination-card";
import ReviewCard from "../components/travel/review-card";
import AiChat from "../components/travel/ai-chat";
import type { Destination, Review } from "@shared/schema";

export default function Home() {
  const { data: destinations, isLoading: destinationsLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
                Your AI Travel <span className="text-secondary">Companion</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-white/90" data-testid="text-hero-subtitle">
                Personalized travel plans powered by AI. Get instant recommendations based on your budget, interests, and real-time data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/plan-trip">
                  <Button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors" data-testid="button-plan-trip">
                    Plan My Trip
                  </Button>
                </Link>
                <Button variant="outline" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-colors" data-testid="button-watch-demo">
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <AiChat />
          </div>
        </div>
      </section>

      {/* Quick Planning Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-planning-title">Start Planning Your Journey</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-planning-subtitle">Tell us your preferences and let AI create the perfect itinerary</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Destination</label>
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-destination"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Travel Dates</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-travel-dates"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Budget Range</label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" data-testid="select-budget">
                  <option value="">Select budget</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-3000">$1,000 - $3,000</option>
                  <option value="3000-5000">$3,000 - $5,000</option>
                  <option value="5000+">$5,000+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Travel Style</label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" data-testid="select-travel-style">
                  <option value="">Select style</option>
                  <option value="adventure">Adventure</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="cultural">Cultural</option>
                  <option value="business">Business</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Interests</label>
                <div className="flex flex-wrap gap-3">
                  {["Food & Dining", "Museums", "Nightlife", "Nature", "Photography", "Shopping"].map((interest) => (
                    <Badge 
                      key={interest}
                      variant="secondary" 
                      className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      data-testid={`badge-interest-${interest.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Link href="/plan-trip">
                  <Button className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors" data-testid="button-generate-plan">
                    Generate AI Travel Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-destinations-title">Popular Destinations</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-destinations-subtitle">Discover amazing places around the world</p>
          </div>
          
          {destinationsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden shadow-lg animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations?.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI Generated Itinerary Sample */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-itinerary-title">AI-Generated Travel Plans</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-itinerary-subtitle">See how Tourika creates personalized itineraries just for you</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="bg-card border border-border rounded-2xl shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground" data-testid="text-sample-plan-title">7-Day Tokyo Adventure</h3>
                    <p className="text-muted-foreground" data-testid="text-sample-plan-subtitle">Generated for Alex, Budget: $3,000</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      day: 1,
                      title: "Arrival & Shibuya",
                      description: "Land at Narita, check into hotel, explore Shibuya Crossing, visit Meiji Shrine",
                      category: "Cultural",
                      cost: 120
                    },
                    {
                      day: 2,
                      title: "Traditional Tokyo",
                      description: "Senso-ji Temple, Asakusa district, traditional lunch, Tokyo Skytree",
                      category: "Traditional",
                      cost: 95
                    },
                    {
                      day: 3,
                      title: "Modern Tokyo",
                      description: "Harajuku fashion district, Omotesando shopping, Robot Restaurant show",
                      category: "Entertainment",
                      cost: 180
                    }
                  ].map((day) => (
                    <div key={day.day} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary" data-testid={`text-day-${day.day}`}>{day.day}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground" data-testid={`text-day-title-${day.day}`}>Day {day.day}: {day.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1" data-testid={`text-day-description-${day.day}`}>{day.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" data-testid={`badge-category-${day.day}`}>{day.category}</Badge>
                          <span className="text-xs text-muted-foreground" data-testid={`text-cost-${day.day}`}>${day.cost} estimated</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Budget Used</p>
                      <p className="text-2xl font-bold text-primary" data-testid="text-budget-used">$2,850 / $3,000</p>
                    </div>
                    <Button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors" data-testid="button-view-full-itinerary">
                      View Full Itinerary
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="bg-card border border-border rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4" data-testid="text-insights-title">Real-time Insights</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-foreground" data-testid="text-weather-insight">Weather: Sunny, 22°C - Perfect for outdoor activities</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-foreground" data-testid="text-crowd-insight">Crowd Level: Medium - Book popular spots in advance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-foreground" data-testid="text-currency-insight">Currency: 1 USD = 149 JPY (Updated today)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4" data-testid="text-hotels-title">Recommended Hotels</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
                        alt="Modern hotel room with city view" 
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-foreground" data-testid="text-hotel-1-name">Hotel Granvia Tokyo</h5>
                        <p className="text-sm text-muted-foreground" data-testid="text-hotel-1-details">$180/night • ⭐ 4.5</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <img 
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
                        alt="Hotel lobby with modern Japanese design" 
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-foreground" data-testid="text-hotel-2-name">Park Hyatt Tokyo</h5>
                        <p className="text-sm text-muted-foreground" data-testid="text-hotel-2-details">$420/night • ⭐ 4.8</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-border rounded-xl shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4" data-testid="text-transport-title">Transportation Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80" 
                          alt="Japanese bullet train" 
                          className="w-10 h-8 object-cover rounded"
                        />
                        <span className="text-sm font-medium text-foreground" data-testid="text-jr-pass">7-Day JR Pass</span>
                      </div>
                      <span className="text-sm font-semibold text-primary" data-testid="text-jr-pass-price">$280</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=80" 
                          alt="Airport shuttle bus" 
                          className="w-10 h-8 object-cover rounded"
                        />
                        <span className="text-sm font-medium text-foreground" data-testid="text-airport-transfer">Airport Transfer</span>
                      </div>
                      <span className="text-sm font-semibold text-primary" data-testid="text-airport-transfer-price">$45</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews and Ratings */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-reviews-title">What Travelers Say</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-reviews-subtitle">Real reviews from real adventures</p>
          </div>
          
          {reviewsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl p-6 shadow-lg animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews?.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-features-title">Why Choose Tourika?</h2>
            <p className="text-lg text-muted-foreground" data-testid="text-features-subtitle">Advanced AI technology meets exceptional travel experiences</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "AI-Powered Planning",
                description: "Our advanced AI analyzes millions of data points to create personalized itineraries that match your exact preferences and budget."
              },
              {
                icon: Users,
                title: "Real-time Updates",
                description: "Get live updates on weather, crowd levels, and local events to optimize your travel experience in real-time."
              },
              {
                icon: CreditCard,
                title: "Smart Budget Management",
                description: "Track expenses automatically and get intelligent suggestions to optimize your spending while maximizing experiences."
              },
              {
                icon: Clock,
                title: "Integrated Booking",
                description: "Book flights, hotels, activities, and transportation all in one place with the best prices guaranteed."
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description: "Get help anytime, anywhere with our AI-powered support and human experts available around the clock."
              },
              {
                icon: Users,
                title: "Community Insights",
                description: "Access reviews and recommendations from a community of verified travelers who share your interests."
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-card rounded-xl shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4" data-testid={`text-feature-title-${index}`}>{feature.title}</h3>
                  <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
