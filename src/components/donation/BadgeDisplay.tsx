
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeDisplayProps {
  donationCount: number;
}

interface DonationBadge {
  name: string;
  description: string;
  threshold: number;
  color: string;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ donationCount }) => {
  const badges: DonationBadge[] = [
    {
      name: "First Time Donor",
      description: "Completed your first donation",
      threshold: 1,
      color: "bg-blue-600",
    },
    {
      name: "Bronze Donor",
      description: "Completed 5 donations",
      threshold: 5,
      color: "bg-amber-700",
    },
    {
      name: "Silver Donor",
      description: "Completed 15 donations",
      threshold: 15,
      color: "bg-gray-500",
    },
    {
      name: "Gold Donor",
      description: "Completed 25 donations",
      threshold: 25,
      color: "bg-yellow-600",
    },
    {
      name: "Platinum Donor",
      description: "Completed 50 donations",
      threshold: 50,
      color: "bg-purple-700",
    },
    {
      name: "Lifesaver",
      description: "Completed 100 donations",
      threshold: 100,
      color: "bg-red-600",
    },
  ];
  
  return (
    <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--clr-primary-a30))]">
          Your Donation Badges
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => {
            const isEarned = donationCount >= badge.threshold;
            
            return (
              <div 
                key={badge.name}
                className={cn(
                  "flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300",
                  isEarned ? "card-hover" : "opacity-40"
                )}
              >
                <div className={cn(
                  "h-16 w-16 rounded-full flex items-center justify-center mb-3",
                  isEarned ? badge.color : "bg-gray-700"
                )}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={cn(
                      "h-8 w-8 transition-transform duration-300",
                      isEarned ? "text-white" : "text-gray-400"
                    )} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                    />
                  </svg>
                </div>
                <h4 className={cn(
                  "text-sm font-medium",
                  isEarned ? "text-white" : "text-gray-400"
                )}>
                  {badge.name}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {badge.description}
                </p>
                {isEarned && (
                  <Badge 
                    variant="outline" 
                    className="mt-2 border-[hsl(var(--clr-primary-a10))] text-[hsl(var(--clr-primary-a30))]"
                  >
                    Earned
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeDisplay;
