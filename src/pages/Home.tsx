
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Users, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedLogo from "@/components/common/AnimatedLogo";

const Home = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = statsRef.current?.querySelectorAll(".stat-card");
    cards?.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 200}ms`;
      observer.observe(card);
    });

    return () => {
      cards?.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(var(--clr-surface-a0))] to-[hsl(var(--clr-surface-a20))] py-20 px-4 text-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ea384c" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <AnimatedLogo />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--clr-primary-a30))] to-[hsl(var(--clr-primary-a50))] bg-clip-text text-transparent">
            Give Blood, Save Lives
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of heroes making a difference. Your donation can save up to 3 lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donation-centers">
              <Button 
                size="lg" 
                className="bg-[hsl(var(--clr-primary-a30))] hover:bg-[hsl(var(--clr-primary-a50))] text-white px-8 py-3 text-lg button-glow"
              >
                Start Donating
              </Button>
            </Link>
            <Link to="/blood-visualizer">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-[hsl(var(--clr-primary-a30))] text-[hsl(var(--clr-primary-a30))] hover:bg-[hsl(var(--clr-primary-a10))] px-8 py-3 text-lg"
              >
                Learn Compatibility
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div ref={statsRef} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="stat-card bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover">
            <CardContent className="p-6 text-center">
              <Droplet className="h-12 w-12 text-[hsl(var(--clr-primary-a30))] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[hsl(var(--clr-light-a0))] mb-2">1,234,567</h3>
              <p className="text-gray-300">Total Donations Made</p>
            </CardContent>
          </Card>

          <Card className="stat-card bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-[hsl(var(--clr-primary-a30))] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[hsl(var(--clr-light-a0))] mb-2">87,450</h3>
              <p className="text-gray-300">Active Donors</p>
            </CardContent>
          </Card>

          <Card className="stat-card bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-[hsl(var(--clr-primary-a30))] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[hsl(var(--clr-light-a0))] mb-2">320+</h3>
              <p className="text-gray-300">Donation Centers</p>
            </CardContent>
          </Card>

          <Card className="stat-card bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 text-[hsl(var(--clr-primary-a30))] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[hsl(var(--clr-light-a0))] mb-2">2M+</h3>
              <p className="text-gray-300">Lives Saved</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[hsl(var(--clr-surface-a20))] py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--clr-primary-a30))] mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Every donation counts. Find your nearest donation center and start your journey as a life-saver today.
          </p>
          <Link to="/why-donate">
            <Button 
              size="lg" 
              className="bg-[hsl(var(--clr-primary-a30))] hover:bg-[hsl(var(--clr-primary-a50))] text-white px-8 py-3 text-lg button-glow"
            >
              Learn Why Donate
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
