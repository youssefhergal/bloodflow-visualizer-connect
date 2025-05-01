
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Html5, Javascript } from "lucide-react";
import TechIcon from "@/components/common/TechIcon";

const About = () => {
  const iconsRef = useRef<HTMLDivElement>(null);

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

    const icons = iconsRef.current?.querySelectorAll(".tech-icon");
    icons?.forEach((icon) => {
      observer.observe(icon);
    });

    return () => {
      icons?.forEach((icon) => {
        observer.unobserve(icon);
      });
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      <div className="text-center max-w-2xl">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl font-bold typing-animation inline-block">
            BloodLink
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Visualize blood type compatibility and track your donation journey
          </p>
        </div>

        <Card className="mb-8 bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-lg card-hover">
          <CardContent className="p-6">
            <p className="text-lg text-[hsl(var(--clr-light-a0))]">
              BloodLink helps you understand blood type compatibility with interactive visualizations. 
              You can see which blood types can donate to or receive from each other, and track your 
              own donation history to make a real difference in saving lives.
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4 text-[hsl(var(--clr-primary-a30))]">
          Built with modern technologies
        </h2>

        <div ref={iconsRef} className="flex flex-wrap justify-center gap-6 mb-8">
          <TechIcon 
            name="React" 
            icon="react" 
            className="text-blue-400 tech-icon opacity-0"
            delay={0}
          />
          <TechIcon 
            name="Tailwind CSS" 
            icon="tailwind-css" 
            className="text-sky-400 tech-icon opacity-0"
            delay={200}
          />
          <TechIcon 
            name="JavaScript" 
            icon="javascript" 
            className="text-yellow-400 tech-icon opacity-0"
            delay={400}
          />
          <TechIcon 
            name="HTML5" 
            icon="html5" 
            className="text-orange-500 tech-icon opacity-0"
            delay={600}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--clr-primary-a30))]">
                Blood Compatibility
              </h3>
              <p className="text-gray-300">
                Learn which blood types are compatible with each other through our 
                interactive visual tool, making it easy to understand donation compatibility.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[hsl(var(--clr-surface-a20))] border-[hsl(var(--clr-primary-a10))] shadow-md card-hover">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--clr-primary-a30))]">
                Donation Tracking
              </h3>
              <p className="text-gray-300">
                Keep a record of your blood donations, track your progress, and earn 
                recognition badges for your life-saving contributions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
