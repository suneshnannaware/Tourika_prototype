import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">Tourika</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/destinations" 
            className={`text-foreground hover:text-primary transition-colors ${location === '/destinations' ? 'text-primary font-medium' : ''}`}
            data-testid="link-destinations"
          >
            Destinations
          </Link>
          <Link 
            href="/bookings" 
            className={`text-foreground hover:text-primary transition-colors ${location === '/bookings' ? 'text-primary font-medium' : ''}`}
            data-testid="link-bookings"
          >
            Bookings
          </Link>
          <Link 
            href="/plan-trip" 
            className={`text-foreground hover:text-primary transition-colors ${location === '/plan-trip' ? 'text-primary font-medium' : ''}`}
            data-testid="link-plan-trip"
          >
            Plan Trip
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:block" data-testid="button-signin">
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-get-started">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  );
}
