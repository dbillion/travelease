"use client";

import React, { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface HeroTextAnimationProps {
  text: string;
  className?: string;
}

export const HeroTextAnimation: React.FC<HeroTextAnimationProps> = ({ 
  text, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Split text into words and then into characters
    const words = text.split(' ');
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      words.forEach((word, wordIndex) => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'inline-block overflow-hidden mr-2';
        
        word.split('').forEach((char, charIndex) => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'inline-block';
          charSpan.style.transform = 'translateY(100px)';
          wordDiv.appendChild(charSpan);
        });
        
        containerRef.current!.appendChild(wordDiv);
      });

      // Animate characters
      const chars = containerRef.current.querySelectorAll('span');
      
      gsap.to(chars, {
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: {
          amount: 1.2,
          from: "start"
        }
      });
    }
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap ${className}`}
      style={{ lineHeight: '1.1' }}
    />
  );
};