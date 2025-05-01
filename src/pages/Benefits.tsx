
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface Benefit {
  icon: string;
  title: string;
  description: string;
  detailedInfo: string;
  category: 'health' | 'social' | 'perks' | 'eligibility';
}

const Benefits = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in");
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const benefits = benefitsRef.current?.querySelectorAll(".benefit-card");
    benefits?.forEach((benefit) => {
      observer.observe(benefit);
    });

    return () => {
      benefits?.forEach((benefit) => {
        observer.unobserve(benefit);
      });
    };
  }, []);

  const benefits: Benefit[] = [
    {
      icon: "❤️",
      title: "Improved Heart Health",
      description: "Regular donations reduce the risk of heart disease by removing excess iron and lowering blood viscosity.",
      detailedInfo: "Medical studies have shown that blood donors have a 88% lower risk of heart attacks and a 33% lower risk of severe cardiovascular events.",
      category: "health"
    },
    {
      icon: "🩺",
      title: "Free Health Screening",
      description: "Each donation includes a mini physical exam and tests for various diseases.",
      detailedInfo: "Before each donation, your temperature, blood pressure, pulse, and hemoglobin levels are checked. Your blood is also tested for HIV, hepatitis B and C, syphilis, and other diseases.",
      category: "health"
    },
    {
      icon: "⚖️",
      title: "Calorie Burning",
      description: "One donation can burn up to 650 calories as your body works to replace the blood.",
      detailedInfo: "The process of donating blood burns calories as your body needs to replenish the components in your blood. This can help with maintaining a healthy weight when combined with proper diet and exercise.",
      category: "health"
    },
    {
      icon: "👥",
      title: "Save Multiple Lives",
      description: "A single blood donation can save up to three lives when separated into components.",
      detailedInfo: "Modern processing techniques allow your blood to be separated into red blood cells, plasma, and platelets, which can be used to help different patients with specific needs.",
      category: "social"
    },
    {
      icon: "🌍",
      title: "Community Impact",
      description: "Blood donors contribute to the health and wellbeing of their entire community.",
      detailedInfo: "Local hospitals rely on volunteer donors to meet the constant need for blood products. Your donation directly impacts patients in your community who need surgeries, cancer treatments, or emergency care.",
      category: "social"
    },
    {
      icon: "🎁",
      title: "Gift Cards & Vouchers",
      description: "Many centers offer gift cards, vouchers, or other incentives to thank donors.",
      detailedInfo: "Depending on your blood center, you might receive gift cards to local restaurants, movie tickets, or online shopping vouchers as a token of appreciation for your donation.",
      category: "perks"
    },
    {
      icon: "👕",
      title: "Free T-Shirts",
      description: "Most donation centers give away themed t-shirts to donors.",
      detailedInfo: "Blood centers often provide unique, limited-edition t-shirts that change seasonally or for special blood drive events. These have become collectible items for regular donors.",
      category: "perks"
    },
    {
      icon: "📆",
      title: "Donation Frequency",
      description: "Whole blood can be donated every 56 days (about 8 weeks).",
      detailedInfo: "The waiting period between donations allows your body to replenish red blood cells. Platelets can be donated more frequently—every 7 days up to 24 times per year—while plasma can be donated every 28 days.",
      category: "eligibility"
    },
    {
      icon: "📏",
      title: "Basic Requirements",
      description: "Most donors need to be at least 16-17 years old, weigh at least 110 pounds, and be in good health.",
      detailedInfo: "Age requirements vary by state and donation center. Additional eligibility criteria may include travel history, medications, recent surgeries, and certain health conditions that might temporarily or permanently defer you from donating.",
      category: "eligibility"
    },
  ];

  const categorizedBenefits = {
    health: benefits.filter(b => b.category === 'health'),
    social: benefits.filter(b => b.category === 'social'),
    perks: benefits.filter(b => b.category === 'perks'),
    eligibility: benefits.filter(b => b.category === 'eligibility')
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[hsl(var(--clr-primary-a30))] mb-4">
          Benefits of Donating Blood
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Donating blood not only helps others but also provides numerous benefits for you as a donor.
        </p>
      </div>

      <div ref={benefitsRef} className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[hsl(var(--clr-primary-a30))]">
            💪 Health Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categorizedBenefits.health.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[hsl(var(--clr-primary-a30))]">
            👥 Social Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categorizedBenefits.social.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[hsl(var(--clr-primary-a30))]">
            🎁 Perks & Rewards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categorizedBenefits.perks.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[hsl(var(--clr-primary-a30))]">
            📆 Eligibility & Frequency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categorizedBenefits.eligibility.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </section>
      </div>

      <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md mt-4 card-hover">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-[hsl(var(--clr-primary-a30))]">
            Did you know?
          </h2>
          <p className="text-gray-300">
            Every two seconds, someone in the United States needs blood, and more than 41,000 blood donations are needed every day.
            Despite this constant need, only about 3% of age-eligible people donate blood yearly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const BenefitCard = ({ benefit, index }: { benefit: Benefit, index: number }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card className="benefit-card opacity-0 bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md card-hover cursor-pointer">
          <CardContent className="p-6">
            <div className="text-3xl mb-3">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--clr-primary-a30))]">
              {benefit.title}
            </h3>
            <p className="text-gray-300">{benefit.description}</p>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="bg-[hsl(var(--clr-surface-a0))] border border-[hsl(var(--clr-primary-a10))] text-[hsl(var(--clr-light-a0))]">
        <div className="text-sm">
          <div className="font-semibold mb-2">{benefit.title}</div>
          <p>{benefit.detailedInfo}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Benefits;
