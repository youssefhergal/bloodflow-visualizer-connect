
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Clock, MapPin } from "lucide-react";

const WhyDonate = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

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

    const cards = cardsRef.current?.querySelectorAll(".info-card");
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
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[hsl(var(--clr-primary-a30))] mb-4">
          Why Donate Blood?
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Blood donation is one of the most valuable gifts you can give. Learn about the impact, 
          requirements, and process of becoming a blood donor.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="info-card bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(var(--clr-primary-a30))]">
              <Heart className="mr-3 h-6 w-6" />
              Why You Should Donate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <ul className="space-y-3">
              <li>• One donation can save up to 3 lives</li>
              <li>• Every 2 seconds, someone needs blood</li>
              <li>• Only 3% of eligible people donate annually</li>
              <li>• Blood cannot be manufactured - it can only come from donors</li>
              <li>• Donated blood has a shelf life of only 42 days</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="info-card bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(var(--clr-primary-a30))]">
              <Users className="mr-3 h-6 w-6" />
              Who Can Donate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <ul className="space-y-3">
              <li>• Age: 17-65 years old (varies by location)</li>
              <li>• Weight: At least 110 pounds (50 kg)</li>
              <li>• Good general health</li>
              <li>• No recent illness or infection</li>
              <li>• Meet iron level requirements</li>
              <li>• Not pregnant or recently pregnant</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="info-card bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(var(--clr-primary-a30))]">
              <Clock className="mr-3 h-6 w-6" />
              When and How Often
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <ul className="space-y-3">
              <li>• Whole blood: Every 56 days (8 weeks)</li>
              <li>• Platelets: Every 7 days, up to 24 times/year</li>
              <li>• Plasma: Every 28 days, up to 13 times/year</li>
              <li>• Donation process takes about 1 hour</li>
              <li>• Actual blood collection: 8-10 minutes</li>
              <li>• Best times: Morning or early afternoon</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="info-card bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] opacity-0 card-hover">
          <CardHeader>
            <CardTitle className="flex items-center text-[hsl(var(--clr-primary-a30))]">
              <MapPin className="mr-3 h-6 w-6" />
              Where It Goes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <ul className="space-y-3">
              <li>• Emergency surgery and trauma care (25%)</li>
              <li>• Cancer treatment (20%)</li>
              <li>• Heart surgery (15%)</li>
              <li>• Organ transplants (10%)</li>
              <li>• Treatment of blood disorders (10%)</li>
              <li>• Other medical procedures (20%)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-[hsl(var(--clr-surface-a20))] to-[hsl(var(--clr-surface-a0))] border-[hsl(var(--clr-primary-a10))]">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-[hsl(var(--clr-primary-a30))] mb-4">
              The Donation Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[hsl(var(--clr-primary-a30))] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  1
                </div>
                <h3 className="font-semibold text-[hsl(var(--clr-light-a0))]">Registration</h3>
                <p className="text-sm text-gray-300 mt-1">Sign in and complete health questionnaire</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[hsl(var(--clr-primary-a30))] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  2
                </div>
                <h3 className="font-semibold text-[hsl(var(--clr-light-a0))]">Mini-Physical</h3>
                <p className="text-sm text-gray-300 mt-1">Temperature, blood pressure, and iron check</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[hsl(var(--clr-primary-a30))] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  3
                </div>
                <h3 className="font-semibold text-[hsl(var(--clr-light-a0))]">Donation</h3>
                <p className="text-sm text-gray-300 mt-1">Comfortable chair, about 8-10 minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[hsl(var(--clr-primary-a30))] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                  4
                </div>
                <h3 className="font-semibold text-[hsl(var(--clr-light-a0))]">Refreshments</h3>
                <p className="text-sm text-gray-300 mt-1">Relax and enjoy snacks and drinks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhyDonate;
