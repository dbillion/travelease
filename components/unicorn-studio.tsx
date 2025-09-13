"use client"

import { useEffect, useRef } from "react"

interface UnicornStudioProps {
  projectId: string
  className?: string
}

export default function UnicornStudio({ projectId, className = "" }: UnicornStudioProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing content
    containerRef.current.innerHTML = ''

    // Create the Unicorn Studio div
    const unicornDiv = document.createElement('div')
    unicornDiv.setAttribute('data-us-project', projectId)
    unicornDiv.style.width = '100%'
    unicornDiv.style.height = '100%'
    
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
      className={className}
    />
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean
      init?: () => void
    }
  }
}