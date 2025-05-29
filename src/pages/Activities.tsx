
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

const Activities = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

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

    const items = galleryRef.current?.querySelectorAll(".activity-item");
    items?.forEach((item, index) => {
      (item as HTMLElement).style.animationDelay = `${index * 150}ms`;
      observer.observe(item);
    });

    return () => {
      items?.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  const activities = [
    {
      id: 1,
      title: "Annual Blood Drive Marathon",
      description: "Our biggest event of the year brought together over 500 donors in a single weekend.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      date: "November 15-17, 2024",
      location: "Central Park Community Center",
      participants: 523
    },
    {
      id: 2,
      title: "Corporate Partnership Drive",
      description: "Local businesses joined forces to create the largest workplace donation event in our history.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
      date: "October 28, 2024",
      location: "Business District",
      participants: 287
    },
    {
      id: 3,
      title: "University Campus Drive",
      description: "Students and faculty came together to support the community through blood donation.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      date: "October 12, 2024",
      location: "State University",
      participants: 194
    },
    {
      id: 4,
      title: "Emergency Response Drive",
      description: "Community rallied to support local hospitals during critical blood shortage.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      date: "September 22, 2024",
      location: "Multiple Locations",
      participants: 445
    },
    {
      id: 5,
      title: "Back to School Health Fair",
      description: "Combining health education with blood donation to kick off the academic year.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
      date: "August 30, 2024",
      location: "High School Complex",
      participants: 156
    },
    {
      id: 6,
      title: "Summer Community Festival",
      description: "Blood donation booth at the annual summer festival drew hundreds of new donors.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
      date: "July 4, 2024",
      location: "Town Square",
      participants: 312
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[hsl(var(--clr-primary-a30))] mb-4">
          Community Activities
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Discover our recent blood donation events and see how our community comes together 
          to save lives. Join us at our next event!
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] text-center">
          <CardContent className="p-6">
            <h3 className="text-3xl font-bold text-[hsl(var(--clr-primary-a30))] mb-2">24</h3>
            <p className="text-gray-300">Events This Year</p>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] text-center">
          <CardContent className="p-6">
            <h3 className="text-3xl font-bold text-[hsl(var(--clr-primary-a30))] mb-2">3,247</h3>
            <p className="text-gray-300">Total Participants</p>
          </CardContent>
        </Card>
        <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] text-center">
          <CardContent className="p-6">
            <h3 className="text-3xl font-bold text-[hsl(var(--clr-primary-a30))] mb-2">8,741</h3>
            <p className="text-gray-300">Lives Potentially Saved</p>
          </CardContent>
        </Card>
      </div>

      {/* Activities Gallery */}
      <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card 
            key={activity.id} 
            className="activity-item bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--clr-surface-a0))] to-transparent opacity-60"></div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-[hsl(var(--clr-light-a0))] text-lg">
                {activity.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-gray-300 text-sm">{activity.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                  {activity.date}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <MapPin className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                  {activity.location}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Users className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                  {activity.participants} participants
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-[hsl(var(--clr-surface-a20))] to-[hsl(var(--clr-surface-a0))] border-[hsl(var(--clr-primary-a10))]">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-[hsl(var(--clr-primary-a30))] mb-4">
              Want to Join Our Next Event?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Stay updated with our latest activities and be the first to know about upcoming 
              blood drives in your area. Together, we can make a difference!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[hsl(var(--clr-primary-a30))] hover:bg-[hsl(var(--clr-primary-a50))] text-white px-6 py-3 rounded-md transition-all duration-300 button-glow">
                Subscribe to Updates
              </button>
              <button className="border border-[hsl(var(--clr-primary-a30))] text-[hsl(var(--clr-primary-a30))] hover:bg-[hsl(var(--clr-primary-a10))] px-6 py-3 rounded-md transition-all duration-300">
                View Calendar
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Activities;
