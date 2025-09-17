import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTravelPlanSchema, insertReviewSchema } from "@shared/schema";
import { generateTravelPlan, getChatResponse } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Destinations
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  // Travel Plans
  app.post("/api/travel-plans", async (req, res) => {
    try {
      const validatedData = insertTravelPlanSchema.parse(req.body);
      
      // Generate AI itinerary
      const aiItinerary = await generateTravelPlan({
        destination: validatedData.destination,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        budget: validatedData.budget,
        travelStyle: validatedData.travelStyle,
        interests: validatedData.interests,
      });

      const travelPlan = await storage.createTravelPlan({
        ...validatedData,
        itinerary: aiItinerary,
      });

      res.json(travelPlan);
    } catch (error) {
      console.error("Travel plan creation error:", error);
      res.status(500).json({ message: "Failed to create travel plan" });
    }
  });

  app.get("/api/travel-plans", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const plans = await storage.getTravelPlans(userId);
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch travel plans" });
    }
  });

  app.get("/api/travel-plans/:id", async (req, res) => {
    try {
      const plan = await storage.getTravelPlan(req.params.id);
      if (!plan) {
        return res.status(404).json({ message: "Travel plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch travel plan" });
    }
  });

  // Hotels
  app.get("/api/hotels", async (req, res) => {
    try {
      const location = req.query.location as string;
      const hotels = await storage.getHotels(location);
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  // Transport Options
  app.get("/api/transport", async (req, res) => {
    try {
      const from = req.query.from as string;
      const to = req.query.to as string;
      const options = await storage.getTransportOptions(from, to);
      res.json(options);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transport options" });
    }
  });

  // Reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const destination = req.query.destination as string;
      const reviews = await storage.getReviews(destination);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // AI Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      const response = await getChatResponse(message, context);
      res.json({ response });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ message: "Failed to get chat response" });
    }
  });

  // Weather and insights (mock endpoints)
  app.get("/api/insights/:destination", async (req, res) => {
    try {
      const destination = req.params.destination;
      
      // Mock real-time insights
      const insights = {
        weather: {
          condition: "Sunny",
          temperature: "22°C",
          description: "Perfect for outdoor activities"
        },
        crowdLevel: {
          level: "Medium",
          description: "Book popular spots in advance"
        },
        currency: {
          rate: "1 USD = 149 JPY",
          lastUpdated: "Updated today"
        }
      };

      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
