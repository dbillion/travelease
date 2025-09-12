import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold">Subscribe to Our Newsletter</h3>
            <p className="text-xs sm:text-sm opacity-90">Subscribe for the latest updates on travel and services.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-primary-foreground text-primary flex-1" 
              />
              <Button variant="secondary" className="w-full sm:w-auto whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/travel-tips" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link href="/visa-services" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Visa Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Booking Info
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Connect With Us</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/blog" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Stay Connected</h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors" aria-label="YouTube">
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link href="#" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 border-t border-primary-foreground/20 pt-6 sm:pt-8">
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-2">
            <p className="text-xs sm:text-sm opacity-90">
              © {new Date().getFullYear()} TravelEase. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <Link href="/privacy-policy" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <span className="opacity-50">•</span>
              <Link href="/terms-of-service" className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
              <span className="opacity-50">•</span>
              <button className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

