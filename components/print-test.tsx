import React from "react"
import { PrintButton } from "./print-utils"

// Test component to verify print functionality
export const PrintTest = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Print Test Page</h1>
      
      <div className="print:hidden">
        <p>This text should NOT appear in print</p>
        <PrintButton 
          title="Test Print"
          variant="outline"
          hideElements={[".no-print"]}
          customStyles={`
            .test-content {
              color: #059669 !important;
              font-weight: bold;
            }
          `}
        >
          Test Print Function
        </PrintButton>
      </div>
      
      <div className="test-content">
        <h2>This should appear in print with green color</h2>
        <p>Sample content for testing print functionality</p>
        
        <div className="grid grid-cols-2 gap-4 print:grid-cols-1">
          <div className="border p-4">
            <h3>Column 1</h3>
            <p>Content in first column</p>
          </div>
          <div className="border p-4">
            <h3>Column 2</h3>
            <p>Content in second column</p>
          </div>
        </div>
      </div>
      
      <div className="no-print">
        <p>This should be hidden due to hideElements setting</p>
      </div>
    </div>
  )
}
