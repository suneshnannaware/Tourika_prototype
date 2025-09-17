# Travel Planning Application

## Overview

This is a modern travel planning web application built with React, TypeScript, and Express.js. The application provides an AI-powered platform for users to plan personalized trips, explore destinations, book travel accommodations, and manage their travel itineraries. The system leverages OpenAI's API for intelligent travel recommendations and planning assistance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The client-side is built using React with TypeScript in a single-page application (SPA) pattern:

- **Framework**: React with Vite as the build tool and development server
- **Routing**: Wouter library for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **Form Handling**: React Hook Form with Zod schema validation

The application follows a modular component structure with separate directories for UI components, travel-specific components, and page components. The architecture emphasizes reusability and maintainability through a well-defined component hierarchy.

### Backend Architecture

The server-side follows a RESTful API design pattern:

- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints for destinations, travel plans, hotels, transport options, and reviews
- **Data Layer**: In-memory storage with interface-based abstraction for easy database migration
- **AI Integration**: OpenAI API integration for generating personalized travel itineraries and chat responses
- **Middleware**: Request logging, JSON parsing, and error handling middleware

The backend uses a service-oriented architecture with separate modules for different concerns (storage, AI services, routing).

### Database Schema

The application uses Drizzle ORM with PostgreSQL schema definitions for:

- **Users**: Authentication and user preferences
- **Destinations**: Travel destinations with pricing and ratings
- **Travel Plans**: User-generated travel itineraries with AI-enhanced content
- **Hotels**: Accommodation options with amenities and pricing
- **Transport Options**: Flight, train, and bus booking options
- **Reviews**: User reviews and ratings for destinations

The schema is designed for scalability with proper indexing and relationships between entities.

### Authentication and Session Management

The application is prepared for session-based authentication using:
- connect-pg-simple for PostgreSQL session storage
- Express sessions with secure configuration
- User management with password hashing and secure storage

### Development and Build Configuration

- **Development**: Vite dev server with hot module replacement
- **Production**: Express serves static files with Vite-built assets
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Database Migrations**: Drizzle Kit for schema management and migrations

## External Dependencies

### AI Services
- **OpenAI API**: Powers the core AI functionality for travel planning and chat assistance
- Uses GPT-5 model for generating personalized travel itineraries
- Provides intelligent recommendations based on user preferences, budget, and interests

### Database
- **Neon Database**: Serverless PostgreSQL database solution
- **Drizzle ORM**: Type-safe database operations and schema management
- Connection pooling through @neondatabase/serverless package

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Typography with Inter font family

### Development Tools
- **Vite**: Fast build tool with development server
- **Replit Integration**: Development environment integration with runtime error handling
- **ESBuild**: Fast JavaScript bundler for production builds

### Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### State Management
- **TanStack React Query**: Server state management with caching, background updates, and optimistic updates
- Provides data fetching, caching, and synchronization capabilities

The architecture is designed for scalability and maintainability, with clear separation of concerns and modern development practices throughout the stack.