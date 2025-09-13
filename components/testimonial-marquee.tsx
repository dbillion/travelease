"use client";

import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechCorp",
    quote: "The visa assistance was exceptional. They handled everything professionally and made the process stress-free.",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Global Ventures",
    quote: "Outstanding service! The team went above and beyond to ensure our business trip was perfectly planned.",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "StartupXYZ",
    quote: "I couldn't have asked for better support. The booking process was seamless and efficient.",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 4,
    name: "David Wilson",
    company: "Enterprise Solutions",
    quote: "Fantastic experience! They saved us so much time and hassle with their expert guidance.",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    company: "Innovation Labs",
    quote: "Professional, reliable, and incredibly helpful. Highly recommend their services!",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 6,
    name: "James Parker",
    company: "Future Systems",
    quote: "The attention to detail and customer service exceeded all our expectations.",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 7,
    name: "Anna Martinez",
    company: "Creative Agency",
    quote: "They made our international expansion so much easier. Truly exceptional service!",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 8,
    name: "Robert Taylor",
    company: "Tech Innovations",
    quote: "Smooth, professional, and efficient. Everything we needed for our business travel.",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 9,
    name: "Jennifer Lee",
    company: "Digital Solutions",
    quote: "Outstanding support from start to finish. They handled every detail perfectly.",
    avatar: "/placeholder-user.jpg"
  },
  {
    id: 10,
    name: "Chris Anderson",
    company: "Global Tech",
    quote: "Incredible service quality. They turned a complex process into something simple.",
    avatar: "/placeholder-user.jpg"
  }
];

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  return (
    <Card className={cn("flex-shrink-0 w-80 mx-4 h-auto", className)}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="mb-3">
              <h4 className="font-semibold text-sm">{testimonial.name}</h4>
              <p className="text-xs text-muted-foreground">{testimonial.company}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "{testimonial.quote}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TestimonialMarqueeProps {
  className?: string;
}

export const TestimonialMarquee: React.FC<TestimonialMarqueeProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials for seamless loop
  const topRowTestimonials = [...testimonials, ...testimonials];
  const bottomRowTestimonials = [...testimonials.slice(5), ...testimonials.slice(0, 5), ...testimonials.slice(5), ...testimonials.slice(0, 5)];

  useGSAP(() => {
    // Set up marquee animations
    if (topRowRef.current && bottomRowRef.current) {
      // Top row - moving left
      gsap.set(topRowRef.current, { x: 0 });
      gsap.to(topRowRef.current, {
        x: "-50%",
        duration: 30,
        ease: "none",
        repeat: -1
      });

      // Bottom row - moving right
      gsap.set(bottomRowRef.current, { x: "-50%" });
      gsap.to(bottomRowRef.current, {
        x: "0%",
        duration: 30,
        ease: "none",
        repeat: -1
      });

      // Scroll-triggered animation for cards
      const cards = containerRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.set(cards, { y: 100, opacity: 0 });
        
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)"
            });
          },
          onLeave: () => {
            gsap.to(cards, {
              y: 100,
              opacity: 0,
              duration: 0.6,
              stagger: 0.05
            });
          },
          onEnterBack: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)"
            });
          }
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: containerRef });

  return (
    <section className={cn("py-16 overflow-hidden bg-muted/30", className)} ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why thousands of travelers trust us with their journey planning and visa assistance.
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Top Row - Moving Left */}
          <div className="relative">
            <div 
              ref={topRowRef}
              className="flex will-change-transform"
            >
              {topRowTestimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={`top-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  className="testimonial-card"
                />
              ))}
            </div>
          </div>

          {/* Bottom Row - Moving Right */}
          <div className="relative">
            <div 
              ref={bottomRowRef}
              className="flex will-change-transform"
            >
              {bottomRowTestimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={`bottom-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  className="testimonial-card"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;