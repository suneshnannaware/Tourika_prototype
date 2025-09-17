import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plane, Train, Bus, Bed, Calendar, Users } from "lucide-react";
import TransportSearch from "../components/travel/transport-search";
import type { TransportOption, Hotel } from "@shared/schema";

export default function Bookings() {
  const [activeTab, setActiveTab] = useState("flights");
  
  const { data: transportOptions } = useQuery<TransportOption[]>({
    queryKey: ["/api/transport"],
  });

  const { data: hotels } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels"],
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-bookings-title">
            Book Your Journey
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-bookings-subtitle">
            Find the best flights, trains, buses, and hotels for your trip
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="flights" className="flex items-center space-x-2" data-testid="tab-flights">
              <Plane className="w-4 h-4" />
              <span className="hidden sm:inline">Flights</span>
            </TabsTrigger>
            <TabsTrigger value="trains" className="flex items-center space-x-2" data-testid="tab-trains">
              <Train className="w-4 h-4" />
              <span className="hidden sm:inline">Trains</span>
            </TabsTrigger>
            <TabsTrigger value="buses" className="flex items-center space-x-2" data-testid="tab-buses">
              <Bus className="w-4 h-4" />
              <span className="hidden sm:inline">Buses</span>
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center space-x-2" data-testid="tab-hotels">
              <Bed className="w-4 h-4" />
              <span className="hidden sm:inline">Hotels</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flights">
            <TransportSearch type="flight" options={transportOptions?.filter(opt => opt.type === "flight")} />
          </TabsContent>

          <TabsContent value="trains">
            <TransportSearch type="train" options={transportOptions?.filter(opt => opt.type === "train")} />
          </TabsContent>

          <TabsContent value="buses">
            <TransportSearch type="bus" options={transportOptions?.filter(opt => opt.type === "bus")} />
          </TabsContent>

          <TabsContent value="hotels">
            <div className="space-y-8">
              <Card className="bg-card border border-border shadow-lg">
                <CardHeader>
                  <CardTitle data-testid="text-hotel-search-title">Find Hotels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
                      <Input placeholder="City or hotel name" data-testid="input-hotel-location" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Check-in</label>
                      <Input type="date" data-testid="input-checkin-date" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Check-out</label>
                      <Input type="date" data-testid="input-checkout-date" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Guests</label>
                      <Select>
                        <SelectTrigger data-testid="select-hotel-guests">
                          <SelectValue placeholder="Guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4+">4+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-search-hotels">
                    Search Hotels
                  </Button>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels?.map((hotel) => (
                  <Card key={hotel.id} className="bg-card border border-border shadow-lg">
                    <div className="relative">
                      <img 
                        src={hotel.imageUrl} 
                        alt={hotel.name}
                        className="w-full h-48 object-cover rounded-t-xl"
                        data-testid={`img-hotel-${hotel.id}`}
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground" data-testid={`badge-hotel-rating-${hotel.id}`}>
                        ⭐ {(hotel.rating / 10).toFixed(1)}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-hotel-name-${hotel.id}`}>
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-hotel-location-${hotel.id}`}>
                        {hotel.location}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4" data-testid={`text-hotel-description-${hotel.id}`}>
                        {hotel.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs" data-testid={`badge-amenity-${hotel.id}-${amenity.toLowerCase()}`}>
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary" data-testid={`text-hotel-price-${hotel.id}`}>
                            ${hotel.pricePerNight}
                          </span>
                          <span className="text-sm text-muted-foreground">/night</span>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid={`button-book-hotel-${hotel.id}`}>
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
