import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertTravelPlanSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ItineraryDisplay from "../components/travel/itinerary-display";
import type { TravelPlan } from "@shared/schema";
import { z } from "zod";

const planTripSchema = insertTravelPlanSchema.extend({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  budget: z.number().min(100, "Budget must be at least $100"),
});

type PlanTripForm = z.infer<typeof planTripSchema>;

const interestOptions = [
  "Food & Dining", "Museums", "Nightlife", "Nature", 
  "Photography", "Shopping", "Adventure", "Culture", 
  "History", "Art", "Music", "Sports"
];

export default function PlanTrip() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [generatedPlan, setGeneratedPlan] = useState<TravelPlan | null>(null);
  const { toast } = useToast();

  const form = useForm<PlanTripForm>({
    resolver: zodResolver(planTripSchema),
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      budget: 1000,
      travelStyle: "",
      interests: [],
      userId: undefined,
    },
  });

  const createPlanMutation = useMutation({
    mutationFn: async (data: PlanTripForm) => {
      const response = await apiRequest("POST", "/api/travel-plans", {
        ...data,
        interests: selectedInterests,
      });
      return response.json();
    },
    onSuccess: (data: TravelPlan) => {
      setGeneratedPlan(data);
      toast({
        title: "Travel Plan Generated!",
        description: "Your personalized itinerary is ready.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/travel-plans"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const onSubmit = (data: PlanTripForm) => {
    if (selectedInterests.length === 0) {
      toast({
        title: "Select Interests", 
        description: "Please select at least one interest to continue.",
        variant: "destructive",
      });
      return;
    }
    createPlanMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-plan-trip-title">
            Plan Your Perfect Trip
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-plan-trip-subtitle">
            Let our AI create a personalized travel experience just for you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="bg-card border border-border shadow-lg">
            <CardHeader>
              <CardTitle data-testid="text-trip-details-title">Trip Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Where do you want to go?" 
                            {...field}
                            data-testid="input-trip-destination"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field}
                              data-testid="input-start-date"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field}
                              data-testid="input-end-date"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget (USD)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter your budget"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            data-testid="input-budget"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="travelStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Travel Style</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-travel-style">
                              <SelectValue placeholder="Select your travel style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="adventure">Adventure</SelectItem>
                            <SelectItem value="relaxation">Relaxation</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="romantic">Romantic</SelectItem>
                            <SelectItem value="family">Family</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label className="text-sm font-semibold text-foreground mb-3 block">Interests</Label>
                    <div className="flex flex-wrap gap-3">
                      {interestOptions.map((interest) => (
                        <Badge
                          key={interest}
                          variant={selectedInterests.includes(interest) ? "default" : "secondary"}
                          className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
                          onClick={() => toggleInterest(interest)}
                          data-testid={`badge-interest-${interest.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    {selectedInterests.length === 0 && (
                      <p className="text-sm text-muted-foreground mt-2">Select at least one interest</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    disabled={createPlanMutation.isPending}
                    data-testid="button-generate-ai-plan"
                  >
                    {createPlanMutation.isPending ? "Generating Plan..." : "Generate AI Travel Plan"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div>
            {generatedPlan ? (
              <ItineraryDisplay travelPlan={generatedPlan} />
            ) : (
              <Card className="bg-card border border-border shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4" data-testid="text-waiting-title">
                    Ready to Generate Your Plan
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-waiting-description">
                    Fill out the form on the left and our AI will create a personalized travel itinerary just for you.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
