
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Phone, Calendar } from "lucide-react";

const DonationCenters = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const centers = [
    {
      id: 1,
      name: "City Blood Center",
      address: "123 Main St, Downtown",
      phone: "(555) 123-4567",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
      nextEvent: "Blood Drive - Dec 15, 2024"
    },
    {
      id: 2,
      name: "Community Health Center",
      address: "456 Oak Ave, Midtown",
      phone: "(555) 987-6543",
      hours: "Tue-Thu: 10AM-7PM, Sat: 8AM-3PM",
      nextEvent: "Mobile Unit - Dec 18, 2024"
    },
    {
      id: 3,
      name: "Regional Medical Center",
      address: "789 Pine Rd, West Side",
      phone: "(555) 456-7890",
      hours: "Mon-Wed: 7AM-5PM, Fri: 9AM-4PM",
      nextEvent: "Holiday Drive - Dec 20, 2024"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Holiday Blood Drive",
      location: "Community Center",
      date: "December 15, 2024",
      time: "9:00 AM - 4:00 PM",
      organizer: "Red Cross"
    },
    {
      id: 2,
      title: "Corporate Donation Day",
      location: "Tech Plaza Building",
      date: "December 18, 2024",
      time: "11:00 AM - 6:00 PM",
      organizer: "Local Businesses"
    },
    {
      id: 3,
      title: "University Blood Drive",
      location: "Student Union",
      date: "December 22, 2024",
      time: "10:00 AM - 5:00 PM",
      organizer: "Student Health Services"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[hsl(var(--clr-primary-a30))] mb-4">
          Donation Centers
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Find blood donation centers near you and discover upcoming donation events in your community.
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search by location or zip code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] text-[hsl(var(--clr-light-a0))]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation Centers */}
        <div>
          <h2 className="text-2xl font-bold text-[hsl(var(--clr-primary-a30))] mb-6">
            Nearby Centers
          </h2>
          
          <div className="space-y-4">
            {centers.map((center) => (
              <Card key={center.id} className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] card-hover">
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--clr-light-a0))]">{center.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-[hsl(var(--clr-primary-a30))]" />
                    <span>{center.address}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                    <span>{center.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                    <span>{center.hours}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                    <span>{center.nextEvent}</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-[hsl(var(--clr-primary-a30))] hover:bg-[hsl(var(--clr-primary-a50))] text-white"
                  >
                    Schedule Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-2xl font-bold text-[hsl(var(--clr-primary-a30))] mb-6">
            Upcoming Events
          </h2>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] card-hover">
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--clr-light-a0))]">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-4 w-4 mr-2 text-[hsl(var(--clr-primary-a30))]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Organized by: {event.organizer}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-[hsl(var(--clr-primary-a30))] text-[hsl(var(--clr-primary-a30))] hover:bg-[hsl(var(--clr-primary-a10))]"
                  >
                    Register for Event
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-12">
        <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))]">
          <CardHeader>
            <CardTitle className="text-[hsl(var(--clr-primary-a30))]">Interactive Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-[hsl(var(--clr-surface-a0))] rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p>Interactive map of donation centers will be displayed here</p>
                <p className="text-sm">Integration with mapping service required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonationCenters;
