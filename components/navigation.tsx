"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Plane, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="font-bold text-lg sm:text-xl">TravelEase</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === "/services/ticket-booking" && "bg-accent text-accent-foreground",
                          )}
                          href="/services/ticket-booking"
                        >
                          <div className="text-sm font-medium leading-none">Ticket Booking</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Book your flights easily with competitive prices
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === "/services/student-visa" && "bg-accent text-accent-foreground",
                          )}
                          href="/services/student-visa"
                        >
                          <div className="text-sm font-medium leading-none">Student Visa</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get assistance with your student visa application
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            pathname === "/services/business-visa" && "bg-accent text-accent-foreground",
                          )}
                          href="/services/business-visa"
                        >
                          <div className="text-sm font-medium leading-none">Business Visa</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Business visa solutions tailored for you
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {isLoggedIn && (
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              pathname === "/services/ai-planner" && "bg-accent text-accent-foreground",
                            )}
                            href="/services/ai-planner"
                          >
                            <div className="text-sm font-medium leading-none">AI Travel Planner</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get personalized travel itineraries with AI
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/blog" && "bg-accent text-accent-foreground",
                    )}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/about" && "bg-accent text-accent-foreground",
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/contact" && "bg-accent text-accent-foreground",
                    )}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
          {isLoggedIn ? (
            <Button variant="ghost" onClick={handleLogout} size="sm">
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center space-x-2 lg:hidden">
          {isLoggedIn && (
            <Button variant="ghost" onClick={handleLogout} size="sm" className="hidden sm:block">
              Logout
            </Button>
          )}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Services</h3>
                  <div className="ml-4 space-y-2">
                    <Link
                      href="/services/ticket-booking"
                      onClick={closeMobileMenu}
                      className={cn(
                        "block py-2 text-sm hover:text-primary",
                        pathname === "/services/ticket-booking" && "text-primary font-medium"
                      )}
                    >
                      Ticket Booking
                    </Link>
                    <Link
                      href="/services/student-visa"
                      onClick={closeMobileMenu}
                      className={cn(
                        "block py-2 text-sm hover:text-primary",
                        pathname === "/services/student-visa" && "text-primary font-medium"
                      )}
                    >
                      Student Visa
                    </Link>
                    <Link
                      href="/services/business-visa"
                      onClick={closeMobileMenu}
                      className={cn(
                        "block py-2 text-sm hover:text-primary",
                        pathname === "/services/business-visa" && "text-primary font-medium"
                      )}
                    >
                      Business Visa
                    </Link>
                    {isLoggedIn && (
                      <Link
                        href="/services/ai-planner"
                        onClick={closeMobileMenu}
                        className={cn(
                          "block py-2 text-sm hover:text-primary",
                          pathname === "/services/ai-planner" && "text-primary font-medium"
                        )}
                      >
                        AI Travel Planner
                      </Link>
                    )}
                  </div>
                </div>

                <Link
                  href="/blog"
                  onClick={closeMobileMenu}
                  className={cn(
                    "block py-2 text-sm hover:text-primary",
                    pathname === "/blog" && "text-primary font-medium"
                  )}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className={cn(
                    "block py-2 text-sm hover:text-primary",
                    pathname === "/about" && "text-primary font-medium"
                  )}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className={cn(
                    "block py-2 text-sm hover:text-primary",
                    pathname === "/contact" && "text-primary font-medium"
                  )}
                >
                  Contact
                </Link>

                <div className="pt-4 border-t space-y-2">
                  {isLoggedIn ? (
                    <Button variant="ghost" onClick={handleLogout} className="w-full justify-start">
                      Logout
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="ghost" asChild className="w-full justify-start">
                        <Link href="/login" onClick={closeMobileMenu}>Login</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/signup" onClick={closeMobileMenu}>Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

