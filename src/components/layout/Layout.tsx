
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AnimatedLogo from "@/components/common/AnimatedLogo";
import { Home, Heart, Calendar, Award, MapPin, Activity, Droplet } from "lucide-react";

const Layout: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 
      "bg-[hsl(var(--clr-primary-a10))] text-[hsl(var(--clr-light-a0))]" : 
      "hover:bg-[hsl(var(--clr-surface-a20))] text-gray-300";
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--clr-surface-a10))] text-[hsl(var(--clr-light-a0))]">
      <header className="p-4 bg-[hsl(var(--clr-surface-a0))] shadow-md">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center mb-4 lg:mb-0">
            <AnimatedLogo />
          </div>
          <nav className="flex flex-wrap justify-center gap-2">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 text-sm ${isActive('/')}`}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/why-donate" 
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 text-sm ${isActive('/why-donate')}`}
            >
              <Heart className="mr-2 h-4 w-4" />
              Why Donate?
            </Link>
            <Link 
              to="/donation-tracker" 
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 text-sm ${isActive('/donation-tracker')}`}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Tracker
            </Link>
            <Link 
              to="/benefits" 
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 text-sm ${isActive('/benefits')}`}
            >
              <Award className="mr-2 h-4 w-4" />
              Benefits
            </Link>
            <Link 
              to="/donation-centers" 
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 text-sm ${isActive('/donation-centers')}`}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Centers
            </Link>
            <Link 
              to="/activities" 
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 text-sm ${isActive('/activities')}`}
            >
              <Activity className="mr-2 h-4 w-4" />
              Activities
            </Link>
            <Link 
              to="/blood-visualizer" 
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 text-sm ${isActive('/blood-visualizer')}`}
            >
              <Droplet className="mr-2 h-4 w-4" />
              Visualizer
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="p-4 bg-[hsl(var(--clr-surface-a0))] text-center text-gray-400 mt-auto">
        <div className="container mx-auto">
          <p className="text-sm">
            © {new Date().getFullYear()} BloodLink - The Complete Blood Donation Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
