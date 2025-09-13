"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlowCard } from '@/components/ui/glow-card';
import { cn } from '@/lib/utils';
import { Plane, FileText, Headphones, Shield, CreditCard, MapPin } from 'lucide-react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  className?: string;
  style?: React.CSSProperties;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  glowColor = 'blue',
  className,
  style
}) => {
  return (
    <div style={style}>
      <GlowCard 
        glowColor={glowColor}
        className={cn(
          "w-full max-w-sm h-64 group hover:-translate-y-2 transition-all duration-300",
          className
        )}
      >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </GlowCard>
    </div>
  );
};

interface TravelFeaturesProps {
  className?: string;
}

export const TravelFeatures: React.FC<TravelFeaturesProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Visa Assistance",
      description: "Complete visa processing support with document verification and application tracking for hassle-free travel.",
      glowColor: 'blue' as const
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Flight Booking",
      description: "Best deals on flights worldwide with flexible booking options and instant confirmation.",
      glowColor: 'green' as const
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you before, during, and after your journey.",
      glowColor: 'purple' as const
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Travel Insurance",
      description: "Comprehensive travel insurance coverage for medical emergencies, trip cancellations, and more.",
      glowColor: 'red' as const
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing with multiple payment options and fraud protection.",
      glowColor: 'orange' as const
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Guides",
      description: "Expert local guides and curated experiences to make your trip memorable and authentic.",
      glowColor: 'blue' as const
    }
  ];

  useGSAP(() => {
    const featureCards = containerRef.current?.querySelectorAll('.feature-card');
    const titleElement = titleRef.current;
    
    if (featureCards && titleElement) {
      // Set initial states
      gsap.set(titleElement, { y: 50, opacity: 0 });
      gsap.set(featureCards, { y: 100, opacity: 0, scale: 0.8 });
      
      // Create scroll trigger for the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          // Animate title first
          gsap.to(titleElement, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          });
          
          // Then animate feature cards
          gsap.to(featureCards, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.15,
            delay: 0.3,
            ease: "back.out(1.2)"
          });
        },
        onLeave: () => {
          gsap.to([titleElement, ...featureCards], {
            y: -50,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          // Animate title when scrolling back up
          gsap.to(titleElement, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          });
          
          // Animate feature cards when scrolling back up
          gsap.to(featureCards, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.2,
            ease: "back.out(1.2)"
          });
        },
        onLeaveBack: () => {
          gsap.to([titleElement, ...featureCards], {
            y: 100,
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.05,
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
    <section className={cn("w-full py-16 px-4", className)} ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16" ref={titleRef}>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Travel Made Simple
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover our comprehensive travel services designed to make your journey seamless and unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              glowColor={feature.glowColor}
              className="feature-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
