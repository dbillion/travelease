"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How long does the visa application process take?",
    answer: "The visa processing time varies by country and visa type. Student visas typically take 2-4 weeks, while business visas can take 1-3 weeks. We provide estimated timelines for each specific visa type and keep you updated throughout the process."
  },
  {
    question: "What documents do I need for visa application?",
    answer: "Required documents vary by destination and visa type. Generally, you'll need a valid passport, completed application form, photographs, financial statements, and supporting documents specific to your travel purpose. We provide a comprehensive checklist tailored to your needs."
  },
  {
    question: "Can I modify or cancel my flight booking?",
    answer: "Yes, most bookings can be modified or cancelled according to the airline's terms and conditions. We offer flexible booking options and will help you understand the change/cancellation policies before you book. Additional fees may apply depending on the fare type."
  },
  {
    question: "Do you provide travel insurance?",
    answer: "Yes, we offer comprehensive travel insurance coverage including medical emergencies, trip cancellations, lost luggage, and more. Our insurance partners provide 24/7 support worldwide to ensure you're protected during your travels."
  },
  {
    question: "Is your customer support available 24/7?",
    answer: "Yes, our customer support team is available 24/7 to assist you with any urgent travel-related issues. For non-urgent matters, you can also use our online chat, email support, or schedule a callback at your convenience."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and bank transfers. All transactions are processed through secure, encrypted payment gateways to ensure your financial information is protected."
  }
];

interface FAQSectionProps {
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ className }) => {
  return (
    <section className={cn("py-16 bg-background", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our travel services, visa assistance, and booking process.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
