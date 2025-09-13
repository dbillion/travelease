"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface AnimatedHeroTextProps {
  text: string
  className?: string
}

export default function AnimatedHeroText({ text, className = "" }: AnimatedHeroTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const words = text.split(' ')
    const container = containerRef.current

    // Clear container and create word elements
    container.innerHTML = ''
    
    words.forEach((word, wordIndex) => {
      const wordDiv = document.createElement('div')
      wordDiv.style.overflow = 'hidden'
      wordDiv.style.display = 'inline-block'
      wordDiv.style.marginRight = '0.25em'
      if (wordIndex === words.length - 1) {
        wordDiv.style.marginRight = '0'
      }

      const chars = word.split('')
      chars.forEach((char) => {
        const charSpan = document.createElement('span')
        charSpan.textContent = char
        charSpan.style.display = 'inline-block'
        charSpan.style.transform = 'translateY(100%)'
        wordDiv.appendChild(charSpan)
      })

      container.appendChild(wordDiv)
    })

    // Animate characters
    const allChars = container.querySelectorAll('span')
    
    gsap.fromTo(allChars, 
      {
        y: '100%'
      },
      {
        y: '0%',
        duration: 0.8,
        stagger: 0.03,
        ease: "power2.out",
        delay: 0.5
      }
    )

  }, [text])

  return (
    <div 
      ref={containerRef}
      className={className}
    />
  )
}
