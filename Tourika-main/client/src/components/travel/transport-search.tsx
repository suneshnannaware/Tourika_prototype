import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Plane, Train, Bus, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { TransportOption } from "@shared/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const transportSearchSchema = z.object({
  from: z.string().min(1, "Departure city is required"),
  to: z.string().min(1, "Destination city is required"),
  departureDate: z.string().min(1, "Departure date is required"),
  passengers: z.string().min(1, "Number of passengers is required"),
});

type TransportSearchForm = z.infer<typeof transportSearchSchema>;

interface TransportSearchProps {
  type: "flight" | "train" | "bus";
  options?: TransportOption[];
}

export default function TransportSearch({ type, options = [] }: TransportSearchProps) {
  const [searchResults, setSearchResults] = useState<TransportOption[]>(options);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const form = useForm<TransportSearchForm>({
    resolver: zodResolver(transportSearchSchema),
    defaultValues: {
      from: "",
      to: "",
      departureDate: "",
      passengers: "1",
    },
  });

  const getTransportIcon = (transportType: string) => {
    switch (transportType) {
      case "flight":
        return <Plane className="w-5 h-5" />;
      case "train":
        return <Train className="w-5 h-5" />;
      case "bus":
        return <Bus className="w-5 h-5" />;
      default:
        return <Plane className="w-5 h-5" />;
    }
  };

  const getTransportTypeLabel = (transportType: string) => {
    return transportType.charAt(0).toUpperCase() + transportType.slice(1) + "s";
  };

  const onSubmit = async (data: TransportSearchForm) => {
    setIsSearching(true);
    try {
      // Mock search functionality - in a real app this would call the API
      const filteredResults = options.filter(option => 
        option.type === type &&
        (option.from.toLowerCase().includes(data.from.toLowerCase()) || data.from === "") &&
        (option.to.toLowerCase().includes(data.to.toLowerCase()) || data.to === "")
      );
      
      setSearchResults(filteredResults);
      
      if (filteredResults.length === 0) {
        toast({
          title: "No Results Found",
          description: `No ${type}s found for your search criteria. Try different cities or dates.`,
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${filteredResults.length} ${type} option${filteredResults.length !== 1 ? 's' : ''} for your trip.`,
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search for transport options. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleBooking = (option: TransportOption) => {
    toast({
      title: "Booking Initiated",
      description: `Redirecting to book ${option.provider} ${option.type} from ${option.from} to ${option.to}.`,
    });
    // In a real app, this would redirect to a booking flow
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <Card className="bg-card border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" data-testid={`text-${type}-search-title`}>
            {getTransportIcon(type)}
            <span>Search {getTransportTypeLabel(type)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Departure city" 
                          {...field}
                          data-testid={`input-${type}-from`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Destination city" 
                          {...field}
                          data-testid={`input-${type}-to`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="departureDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departure</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field}
                          data-testid={`input-${type}-departure`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passengers</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid={`select-${type}-passengers`}>
                            <SelectValue placeholder="Passengers" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Passenger</SelectItem>
                          <SelectItem value="2">2 Passengers</SelectItem>
                          <SelectItem value="3">3 Passengers</SelectItem>
                          <SelectItem value="4+">4+ Passengers</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                disabled={isSearching}
                data-testid={`button-search-${type}`}
              >
                {isSearching ? `Searching ${getTransportTypeLabel(type)}...` : `Search ${getTransportTypeLabel(type)}`}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground" data-testid={`text-${type}-results-title`}>
            Available {getTransportTypeLabel(type)}
          </h3>
          
          <div className="space-y-4">
            {searchResults.map((option) => (
              <Card key={option.id} className="bg-card border border-border shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {option.imageUrl && (
                        <img 
                          src={option.imageUrl} 
                          alt={`${option.provider} ${option.type}`}
                          className="w-16 h-12 object-cover rounded-lg"
                          data-testid={`img-transport-${option.id}`}
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-foreground flex items-center space-x-2" data-testid={`text-transport-route-${option.id}`}>
                          <span>{option.from} → {option.to}</span>
                        </h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground flex items-center" data-testid={`text-transport-duration-${option.id}`}>
                            <Clock className="w-4 h-4 mr-1" />
                            {option.duration}
                          </span>
                          <span className="text-sm text-muted-foreground" data-testid={`text-transport-provider-${option.id}`}>
                            {option.provider}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary" data-testid={`text-transport-price-${option.id}`}>
                        ${option.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {type === "flight" ? "round trip" : "one way"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" data-testid={`badge-transport-type-${option.id}`}>
                        {getTransportIcon(option.type)}
                        <span className="ml-1">{option.type}</span>
                      </Badge>
                      {type === "flight" && (
                        <Badge variant="secondary" data-testid={`badge-flight-class-${option.id}`}>
                          Economy
                        </Badge>
                      )}
                    </div>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      onClick={() => handleBooking(option)}
                      data-testid={`button-book-transport-${option.id}`}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Popular Routes Section */}
      {searchResults.length === 0 && !isSearching && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground" data-testid={`text-popular-${type}-title`}>
            Popular {getTransportTypeLabel(type)} Routes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {options.slice(0, 4).map((option) => (
              <Card key={option.id} className="bg-card border border-border shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {option.imageUrl && (
                        <img 
                          src={option.imageUrl} 
                          alt={`${option.provider} ${option.type}`}
                          className="w-12 h-10 object-cover rounded-lg"
                          data-testid={`img-popular-transport-${option.id}`}
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-foreground" data-testid={`text-popular-route-${option.id}`}>
                          {option.from} → {option.to}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center" data-testid={`text-popular-duration-${option.id}`}>
                          <Clock className="w-4 h-4 mr-1" />
                          {option.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary" data-testid={`text-popular-price-${option.id}`}>
                        ${option.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {type === "flight" ? "round trip" : "one way"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground" data-testid={`text-popular-provider-${option.id}`}>
                      {option.provider}
                    </span>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      onClick={() => handleBooking(option)}
                      data-testid={`button-book-popular-${option.id}`}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {searchResults.length === 0 && isSearching && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              {getTransportIcon(type)}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-searching-${type}`}>
              Searching for {getTransportTypeLabel(type)}
            </h3>
            <p className="text-muted-foreground" data-testid={`text-searching-description-${type}`}>
              Please wait while we find the best options for your journey...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
