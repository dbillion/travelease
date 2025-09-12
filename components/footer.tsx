import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
            <p className="text-sm">Subscribe for the latest updates on travel and services.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-primary-foreground text-primary" />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/travel-tips" className="hover:underline">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link href="/visa-services" className="hover:underline">
                  Visa Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:underline">
                  Booking Info
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:underline">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="hover:underline">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:underline">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Stay Connected</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-accent">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} TravelEase. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
            <button className="hover:underline">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

