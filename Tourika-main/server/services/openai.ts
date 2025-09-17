import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "your-openai-key"
});

export interface TravelPlanRequest {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelStyle: string;
  interests: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  estimatedCost: number;
  category: string;
}

export interface GeneratedItinerary {
  days: ItineraryDay[];
  totalEstimatedCost: number;
  budgetUsed: number;
  recommendations: {
    weather: string;
    crowdLevel: string;
    bestTimeToVisit: string;
    currency: string;
  };
}

export async function generateTravelPlan(request: TravelPlanRequest): Promise<GeneratedItinerary> {
  try {
    const prompt = `Generate a detailed travel itinerary for the following request:
    
Destination: ${request.destination}
Travel Dates: ${request.startDate} to ${request.endDate}
Budget: $${request.budget}
Travel Style: ${request.travelStyle}
Interests: ${request.interests.join(", ")}

Please create a day-by-day itinerary that includes:
- Daily activities and attractions
- Estimated costs for each day
- Categories for each activity (Cultural, Adventure, Food, etc.)
- Weather and crowd level insights
- Currency information
- Best time to visit recommendations

Format the response as JSON with this structure:
{
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "description": "Brief description of the day",
      "activities": ["Activity 1", "Activity 2"],
      "estimatedCost": 120,
      "category": "Cultural"
    }
  ],
  "totalEstimatedCost": 2850,
  "budgetUsed": 95,
  "recommendations": {
    "weather": "Weather description",
    "crowdLevel": "Crowd level info",
    "bestTimeToVisit": "Best time info",
    "currency": "Currency info"
  }
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner with deep knowledge of destinations worldwide. Create detailed, personalized travel itineraries that maximize value within the given budget. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as GeneratedItinerary;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate travel plan. Please try again.");
  }
}

export async function getChatResponse(message: string, context?: any): Promise<string> {
  try {
    const prompt = `You are Tourika, a friendly AI travel assistant. Help users with travel planning questions.
    
User message: ${message}
${context ? `Context: ${JSON.stringify(context)}` : ""}

Provide a helpful, concise response about travel planning, destinations, or booking assistance.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system", 
          content: "You are Tourika, a helpful AI travel assistant. Be friendly, informative, and concise in your responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
    });

    return response.choices[0].message.content || "I'm here to help with your travel planning!";
  } catch (error) {
    console.error("OpenAI Chat API error:", error);
    return "I'm having trouble responding right now. Please try again in a moment.";
  }
}
