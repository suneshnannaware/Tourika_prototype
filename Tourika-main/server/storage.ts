import { 
  type User, 
  type InsertUser,
  type Destination,
  type InsertDestination,
  type TravelPlan,
  type InsertTravelPlan,
  type Hotel,
  type InsertHotel,
  type TransportOption,
  type InsertTransportOption,
  type Review,
  type InsertReview
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Destination operations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Travel plan operations
  getTravelPlans(userId?: string): Promise<TravelPlan[]>;
  getTravelPlan(id: string): Promise<TravelPlan | undefined>;
  createTravelPlan(plan: InsertTravelPlan): Promise<TravelPlan>;

  // Hotel operations
  getHotels(location?: string): Promise<Hotel[]>;
  getHotel(id: string): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;

  // Transport operations
  getTransportOptions(from?: string, to?: string): Promise<TransportOption[]>;
  getTransportOption(id: string): Promise<TransportOption | undefined>;
  createTransportOption(transport: InsertTransportOption): Promise<TransportOption>;

  // Review operations
  getReviews(destination?: string): Promise<Review[]>;
  getReview(id: string): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private destinations: Map<string, Destination>;
  private travelPlans: Map<string, TravelPlan>;
  private hotels: Map<string, Hotel>;
  private transportOptions: Map<string, TransportOption>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.travelPlans = new Map();
    this.hotels = new Map();
    this.transportOptions = new Map();
    this.reviews = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed destinations
    const sampleDestinations: Destination[] = [
      {
        id: "dest-1",
        name: "Tokyo, Japan",
        country: "Japan",
        description: "Cultural heritage meets modern innovation",
        imageUrl: "https://images.unsplash.com/photo-1492571350019-22de08371fd3",
        price: 1200,
        rating: 48,
        currency: "USD"
      },
      {
        id: "dest-2",
        name: "Santorini, Greece",
        country: "Greece", 
        description: "Stunning sunsets and pristine beaches",
        imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
        price: 800,
        rating: 49,
        currency: "USD"
      },
      {
        id: "dest-3",
        name: "Machu Picchu, Peru",
        country: "Peru",
        description: "Ancient wonder and breathtaking views",
        imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
        price: 600,
        rating: 47,
        currency: "USD"
      },
      {
        id: "dest-4",
        name: "Reykjavik, Iceland",
        country: "Iceland",
        description: "Northern lights and natural wonders",
        imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
        price: 900,
        rating: 46,
        currency: "USD"
      }
    ];

    sampleDestinations.forEach(dest => this.destinations.set(dest.id, dest));

    // Seed hotels
    const sampleHotels: Hotel[] = [
      {
        id: "hotel-1",
        name: "Hotel Granvia Tokyo",
        location: "Tokyo, Japan",
        description: "Modern luxury hotel with city views",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        pricePerNight: 180,
        rating: 45,
        amenities: ["WiFi", "Gym", "Restaurant", "Spa"]
      },
      {
        id: "hotel-2", 
        name: "Park Hyatt Tokyo",
        location: "Tokyo, Japan",
        description: "Ultra-luxury hotel with panoramic views",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
        pricePerNight: 420,
        rating: 48,
        amenities: ["WiFi", "Gym", "Restaurant", "Spa", "Pool", "Concierge"]
      }
    ];

    sampleHotels.forEach(hotel => this.hotels.set(hotel.id, hotel));

    // Seed transport options
    const sampleTransport: TransportOption[] = [
      {
        id: "trans-1",
        type: "flight",
        from: "New York",
        to: "Tokyo",
        price: 850,
        duration: "14h 25m",
        provider: "American Airlines",
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
      },
      {
        id: "trans-2",
        type: "train",
        from: "Paris",
        to: "London", 
        price: 120,
        duration: "2h 15m",
        provider: "Eurostar",
        imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
      }
    ];

    sampleTransport.forEach(transport => this.transportOptions.set(transport.id, transport));

    // Seed reviews
    const sampleReviews: Review[] = [
      {
        id: "review-1",
        userId: "user-1",
        userName: "Sarah Johnson",
        userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b372",
        rating: 5,
        content: "Tourika's AI completely transformed my trip to Italy. The personalized recommendations were spot-on, and I discovered hidden gems I never would have found otherwise.",
        destination: "Italy",
        tripDate: "March 2024",
        verified: true
      },
      {
        id: "review-2",
        userId: "user-2", 
        userName: "Michael Chen",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        rating: 4,
        content: "Perfect for business travelers. The AI understood my tight schedule and created an efficient itinerary that maximized my limited free time in Singapore.",
        destination: "Singapore",
        tripDate: "February 2024",
        verified: true
      },
      {
        id: "review-3",
        userId: "user-3",
        userName: "Emma Rodriguez", 
        userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        rating: 5,
        content: "As a student on a budget, Tourika helped me plan an incredible backpacking trip through Southeast Asia. The budget tracking feature was invaluable!",
        destination: "Thailand & Vietnam",
        tripDate: "January 2024",
        verified: true
      }
    ];

    sampleReviews.forEach(review => this.reviews.set(review.id, review));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, preferences: insertUser.preferences || null };
    this.users.set(id, user);
    return user;
  }

  // Destination operations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = randomUUID();
    const destination: Destination = { ...insertDestination, id, currency: insertDestination.currency || "USD" };
    this.destinations.set(id, destination);
    return destination;
  }

  // Travel plan operations
  async getTravelPlans(userId?: string): Promise<TravelPlan[]> {
    const plans = Array.from(this.travelPlans.values());
    return userId ? plans.filter(plan => plan.userId === userId) : plans;
  }

  async getTravelPlan(id: string): Promise<TravelPlan | undefined> {
    return this.travelPlans.get(id);
  }

  async createTravelPlan(insertPlan: InsertTravelPlan): Promise<TravelPlan> {
    const id = randomUUID();
    const plan: TravelPlan = { 
      ...insertPlan, 
      id,
      userId: insertPlan.userId || null,
      createdAt: new Date()
    };
    this.travelPlans.set(id, plan);
    return plan;
  }

  // Hotel operations
  async getHotels(location?: string): Promise<Hotel[]> {
    const hotels = Array.from(this.hotels.values());
    return location ? hotels.filter(hotel => hotel.location.toLowerCase().includes(location.toLowerCase())) : hotels;
  }

  async getHotel(id: string): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const id = randomUUID();
    const hotel: Hotel = { ...insertHotel, id };
    this.hotels.set(id, hotel);
    return hotel;
  }

  // Transport operations
  async getTransportOptions(from?: string, to?: string): Promise<TransportOption[]> {
    let options = Array.from(this.transportOptions.values());
    if (from) {
      options = options.filter(option => option.from.toLowerCase().includes(from.toLowerCase()));
    }
    if (to) {
      options = options.filter(option => option.to.toLowerCase().includes(to.toLowerCase()));
    }
    return options;
  }

  async getTransportOption(id: string): Promise<TransportOption | undefined> {
    return this.transportOptions.get(id);
  }

  async createTransportOption(insertTransport: InsertTransportOption): Promise<TransportOption> {
    const id = randomUUID();
    const transport: TransportOption = { ...insertTransport, id, imageUrl: insertTransport.imageUrl || null };
    this.transportOptions.set(id, transport);
    return transport;
  }

  // Review operations
  async getReviews(destination?: string): Promise<Review[]> {
    const reviews = Array.from(this.reviews.values());
    return destination ? reviews.filter(review => review.destination.toLowerCase().includes(destination.toLowerCase())) : reviews;
  }

  async getReview(id: string): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { ...insertReview, id, userId: insertReview.userId || null, verified: insertReview.verified !== undefined ? insertReview.verified : true };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
