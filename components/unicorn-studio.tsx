"use client"

import { useEffect, useRef } from "react"

interface UnicornStudioProps {
  projectId: string
  className?: string
  height?: string
  hideLabels?: boolean
}

export default function UnicornStudio({ projectId, className = "", height = "100%", hideLabels = true }: UnicornStudioProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content
    containerRef.current.innerHTML = ''

    // Create the Unicorn Studio div
    const unicornDiv = document.createElement('div')
    unicornDiv.setAttribute('data-us-project', projectId)
    unicornDiv.style.width = '100%'
    unicornDiv.style.height = height
    unicornDiv.style.overflow = 'hidden'
    unicornDiv.style.position = 'relative'
    
    // Add additional styles to crop bottom area where labels might appear
    if (hideLabels) {
      unicornDiv.style.clipPath = 'inset(0 0 60px 0)' // Crop bottom 60px where labels usually appear
      unicornDiv.style.marginBottom = '-60px' // Compensate for the cropped area
    }
    
    containerRef.current.appendChild(unicornDiv)

    // Check if Unicorn Studio is already loaded
    if (window.UnicornStudio && window.UnicornStudio.isInitialized) {
      // Re-initialize if already loaded
      try {
        window.UnicornStudio.init()
      } catch (error) {
        console.warn('Unicorn Studio re-initialization failed:', error)
      }
      return
    }

    // Load Unicorn Studio script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.30/dist/unicornStudio.umd.js'
    script.async = true
    script.onload = function() {
      try {
        if (!window.UnicornStudio) {
          console.warn('Unicorn Studio not found after script load')
          return
        }
        
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init()
          window.UnicornStudio.isInitialized = true
        }
      } catch (error) {
        console.warn('Unicorn Studio initialization failed:', error)
      }
    }
    script.onerror = function() {
      console.warn('Failed to load Unicorn Studio script')
    }
    
    document.head.appendChild(script)

    return () => {
      // Cleanup
      document.head.removeChild(script)
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [projectId])

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ overflow: 'hidden' }}
    >
      {hideLabels && (
        <div 
          className="absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
          style={{ backdropFilter: 'blur(10px)' }}
        />
      )}
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean
      init: () => void
    }
  }
}