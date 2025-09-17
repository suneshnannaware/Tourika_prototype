import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  preferences: jsonb("preferences"),
});

export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  country: text("country").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating").notNull(),
  currency: text("currency").default("USD"),
});

export const travelPlans = pgTable("travel_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  destination: text("destination").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  budget: integer("budget").notNull(),
  travelStyle: text("travel_style").notNull(),
  interests: text("interests").array().notNull(),
  itinerary: jsonb("itinerary").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hotels = pgTable("hotels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  pricePerNight: integer("price_per_night").notNull(),
  rating: integer("rating").notNull(),
  amenities: text("amenities").array().notNull(),
});

export const transportOptions = pgTable("transport_options", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // flight, train, bus
  from: text("from").notNull(),
  to: text("to").notNull(),
  price: integer("price").notNull(),
  duration: text("duration").notNull(),
  provider: text("provider").notNull(),
  imageUrl: text("image_url"),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  userName: text("user_name").notNull(),
  userAvatar: text("user_avatar").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  destination: text("destination").notNull(),
  tripDate: text("trip_date").notNull(),
  verified: boolean("verified").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  preferences: true,
});

export const insertTravelPlanSchema = createInsertSchema(travelPlans).omit({
  id: true,
  createdAt: true,
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
});

export const insertTransportOptionSchema = createInsertSchema(transportOptions).omit({
  id: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type TravelPlan = typeof travelPlans.$inferSelect;
export type InsertTravelPlan = z.infer<typeof insertTravelPlanSchema>;
export type Hotel = typeof hotels.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type TransportOption = typeof transportOptions.$inferSelect;
export type InsertTransportOption = z.infer<typeof insertTransportOptionSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
