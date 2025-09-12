"use client"

import { useEffect } from "react"

// Enhanced print function with better styling options
export const enhancedPrint = (options?: {
  title?: string
  hideElements?: string[]
  customStyles?: string
}) => {
  const { title, hideElements = [], customStyles = "" } = options || {}

  // Create a new window for printing
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    alert("Pop-up blocked! Please allow pop-ups for this site to enable printing.")
    return
  }

  // Get the current page content
  const originalContent = document.body.innerHTML
  const printContent = document.querySelector("main")?.innerHTML || originalContent

  // Create enhanced print styles
  const printStyles = `
    <style>
      /* Reset and base styles */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #000 !important;
        background: white !important;
        font-size: 14px;
      }

      /* Hide elements that shouldn't be printed */
      .print\\:hidden,
      button:not(.print\\:block),
      nav,
      .navigation,
      .sidebar,
      .footer,
      [data-print="hide"],
      ${hideElements.map(selector => selector).join(', ')} {
        display: none !important;
      }

      /* Print-specific styles */
      .print\\:block {
        display: block !important;
      }

      .print\\:inline {
        display: inline !important;
      }

      /* Layout adjustments */
      .container {
        max-width: 100% !important;
        margin: 0 !important;
        padding: 20px !important;
      }

      /* Typography */
      h1, h2, h3, h4, h5, h6 {
        color: #000 !important;
        margin-bottom: 10px;
        page-break-after: avoid;
      }

      h1 { font-size: 24px; font-weight: bold; }
      h2 { font-size: 20px; font-weight: bold; }
      h3 { font-size: 18px; font-weight: 600; }
      h4 { font-size: 16px; font-weight: 600; }

      p {
        margin-bottom: 8px;
        orphans: 3;
        widows: 3;
      }

      /* Cards and containers */
      .card, [data-card], .bg-white {
        border: 1px solid #e5e7eb !important;
        border-radius: 8px !important;
        padding: 16px !important;
        margin-bottom: 16px !important;
        background: white !important;
        box-shadow: none !important;
        page-break-inside: avoid;
      }

      /* Remove shadows and effects */
      * {
        box-shadow: none !important;
        text-shadow: none !important;
      }

      /* Preserve colors for important elements */
      .text-primary,
      .text-blue-600,
      .text-green-600,
      .text-purple-600,
      .text-red-600 {
        color: #1f2937 !important;
        font-weight: 600;
      }

      /* Tables */
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      th, td {
        border: 1px solid #d1d5db;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f9fafb !important;
        font-weight: 600;
      }

      /* Lists */
      ul, ol {
        margin-left: 20px;
        margin-bottom: 16px;
      }

      li {
        margin-bottom: 4px;
      }

      /* Icons - replace with text or hide */
      svg {
        display: none !important;
      }

      /* Buttons that should appear in print */
      .print-button {
        background: white !important;
        border: 1px solid #d1d5db !important;
        padding: 4px 8px !important;
        font-size: 12px !important;
        color: #000 !important;
      }

      /* Page breaks */
      .page-break {
        page-break-before: always;
      }

      .page-break-after {
        page-break-after: always;
      }

      .no-page-break {
        page-break-inside: avoid;
      }

      /* Header for print */
      .print-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #000;
      }

      /* Footer for print */
      .print-footer {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #ccc;
        text-align: center;
        font-size: 12px;
        color: #666;
      }

      /* Custom styles */
      ${customStyles}

      /* Page setup */
      @page {
        margin: 0.5in;
        size: A4;
      }

      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .force-color {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    </style>
  `

  // Write content to print window
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title || document.title}</title>
      ${printStyles}
    </head>
    <body>
      ${title ? `<div class="print-header"><h1>${title}</h1></div>` : ""}
      <div class="print-content">
        ${printContent}
      </div>
      <div class="print-footer">
        Printed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      </div>
    </body>
    </html>
  `)

  printWindow.document.close()

  // Wait for content to load, then print
  setTimeout(() => {
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }, 250)
}

// Print hook for components
export const usePrint = () => {
  useEffect(() => {
    // Add print styles to the main document
    const printStyleSheet = document.createElement("style")
    printStyleSheet.textContent = `
      @media print {
        /* Hide navigation and other UI elements */
        nav, .navigation, .navbar, .header-actions, .sidebar {
          display: none !important;
        }

        /* Show only print content */
        .print\\:hidden {
          display: none !important;
        }

        .print\\:block {
          display: block !important;
        }

        /* Ensure colors are preserved */
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Remove shadows and optimize for print */
        * {
          box-shadow: none !important;
          text-shadow: none !important;
        }

        /* Page setup */
        @page {
          margin: 0.5in;
          size: A4;
        }
      }
    `
    document.head.appendChild(printStyleSheet)

    return () => {
      document.head.removeChild(printStyleSheet)
    }
  }, [])

  return {
    print: enhancedPrint,
    simplePrint: () => window.print()
  }
}

// Print button component
interface PrintButtonProps {
  title?: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  hideElements?: string[]
  customStyles?: string
  children?: React.ReactNode
}

export const PrintButton: React.FC<PrintButtonProps> = ({
  title,
  className = "",
  variant = "outline",
  size = "md",
  hideElements,
  customStyles,
  children
}) => {
  const handlePrint = () => {
    enhancedPrint({
      title,
      hideElements,
      customStyles
    })
  }

  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background print:hidden"
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 py-2 px-4",
    lg: "h-11 px-8"
  }

  return (
    <button
      onClick={handlePrint}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      {children || "Print"}
    </button>
  )
}
