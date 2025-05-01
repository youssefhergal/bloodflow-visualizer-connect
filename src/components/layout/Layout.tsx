
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import AnimatedLogo from "@/components/common/AnimatedLogo";
import { Home, Info, Calendar, Award } from "lucide-react";

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
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <AnimatedLogo />
          </div>
          <nav className="flex flex-wrap justify-center gap-2">
            <Link 
              to="/" 
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${isActive('/')}`}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${isActive('/about')}`}
            >
              <Info className="mr-2 h-4 w-4" />
              About
            </Link>
            <Link 
              to="/donation-tracker" 
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${isActive('/donation-tracker')}`}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Donation Log
            </Link>
            <Link 
              to="/benefits" 
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${isActive('/benefits')}`}
            >
              <Award className="mr-2 h-4 w-4" />
              Benefits
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
            © {new Date().getFullYear()} BloodLink - Visualize blood type compatibility and track donations
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
