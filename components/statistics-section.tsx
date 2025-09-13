"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Users, MapPin, Award, Clock } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Statistic {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

const statistics: Statistic[] = [
  {
    icon: <Users className="w-8 h-8" />,
    value: "50,000+",
    label: "Happy Travelers",
    description: "Customers who trusted us with their journey"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    value: "150+",
    label: "Countries Covered",
    description: "Visa assistance and travel services worldwide"
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: "98%",
    label: "Success Rate",
    description: "Successful visa applications and bookings"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    value: "24/7",
    label: "Customer Support",
    description: "Round-the-clock assistance for your peace of mind"
  }
];

interface StatisticCardProps {
  statistic: Statistic;
  index: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ statistic, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={cardRef}
      className="text-center p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 statistic-card"
    >
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-primary/10 text-primary">
          {statistic.icon}
        </div>
      </div>
      <div className="statistic-value text-4xl md:text-5xl font-bold text-primary mb-2">
        {statistic.value}
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {statistic.label}
      </h3>
      <p className="text-muted-foreground text-sm">
        {statistic.description}
      </p>
    </div>
  );
};

interface StatisticsSectionProps {
  className?: string;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = containerRef.current?.querySelectorAll('.statistic-card');
    const values = containerRef.current?.querySelectorAll('.statistic-value');
    
    if (cards && values) {
      // Initial state for cards
      gsap.set(cards, { y: 50, opacity: 0 });
      
      // Create scroll trigger for the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => {
          // Animate cards in
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
          });
          
          // Animate numbers counting up
          values.forEach((value, index) => {
            const finalText = statistics[index].value;
            const isNumber = finalText.match(/\d+/);
            
            if (isNumber) {
              const numberValue = parseInt(finalText.replace(/[^\d]/g, ''));
              const suffix = finalText.replace(/[\d,]/g, '');
              
              gsap.fromTo(value, 
                { textContent: "0" + suffix },
                {
                  textContent: finalText,
                  duration: 2,
                  delay: index * 0.2,
                  ease: "power2.out",
                  snap: { textContent: 1 },
                  stagger: 0.1,
                  onUpdate: function() {
                    const current = Math.floor(this.targets()[0].textContent.replace(/[^\d]/g, ''));
                    if (current < numberValue) {
                      this.targets()[0].textContent = current.toLocaleString() + suffix;
                    }
                  }
                }
              );
            }
          });
        },
        onLeave: () => {
          gsap.to(cards, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
          });
        },
        onEnterBack: () => {
          // Animate cards in when scrolling back up
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
          });
          
          // Re-animate numbers when entering back
          values.forEach((value, index) => {
            const finalText = statistics[index].value;
            const isNumber = finalText.match(/\d+/);
            
            if (isNumber) {
              const numberValue = parseInt(finalText.replace(/[^\d]/g, ''));
              const suffix = finalText.replace(/[\d,]/g, '');
              
              gsap.fromTo(value, 
                { textContent: "0" + suffix },
                {
                  textContent: finalText,
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: "power2.out",
                  snap: { textContent: 1 },
                  onUpdate: function() {
                    const current = Math.floor(this.targets()[0].textContent.replace(/[^\d]/g, ''));
                    if (current < numberValue) {
                      this.targets()[0].textContent = current.toLocaleString() + suffix;
                    }
                  }
                }
              );
            }
          });
        },
        onLeaveBack: () => {
          // Animate cards out when scrolling back up past the trigger
          gsap.to(cards, {
            y: -50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.in"
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <section 
      className={cn("py-16 bg-gradient-to-br from-primary/5 to-secondary/5", className)}
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our numbers speak for themselves. Join thousands of satisfied travelers who have chosen us for their journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((statistic, index) => (
            <StatisticCard 
              key={index} 
              statistic={statistic} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
