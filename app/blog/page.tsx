"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Night Life in Tokyo",
    excerpt: "Discover the vibrant and electrifying nightlife of Tokyo, from neon-lit streets to hidden izakayas.",
    author: "Jane Doe",
    authorImage: "/placeholder.svg?height=40&width=40",
    category: "Destinations",
    image: "https://picsum.photos/seed/tokyo/800/400",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Exploring New York City's Skyline",
    excerpt: "A journey through the iconic skyscrapers of the Big Apple and the stories behind them.",
    author: "John Smith",
    authorImage: "/placeholder.svg?height=40&width=40",
    category: "Urban Adventures",
    image: "https://picsum.photos/seed/newyork/800/400",
    date: "2023-06-02",
  },
  {
    id: 3,
    title: "Chasing the Northern Lights in Iceland",
    excerpt: "Experience the magic of Aurora Borealis in the Land of Fire and Ice, a once-in-a-lifetime adventure.",
    author: "Alice Johnson",
    authorImage: "/placeholder.svg?height=40&width=40",
    category: "Nature Wonders",
    image: "https://picsum.photos/seed/iceland/800/400",
    date: "2023-06-20",
  },
  {
    id: 4,
    title: "A Culinary Journey Through Italy",
    excerpt: "Savor the flavors of Italy, from authentic pasta in Rome to gelato in Florence.",
    author: "Marco Rossi",
    authorImage: "/placeholder.svg?height=40&width=40",
    category: "Food & Culture",
    image: "https://picsum.photos/seed/italy/800/400",
    date: "2023-07-05",
  },
  {
    id: 5,
    title: "Sustainable Travel: Eco-Lodges in Costa Rica",
    excerpt: "Discover how eco-lodges in Costa Rica are leading the way in sustainable tourism.",
    author: "Emily Green",
    authorImage: "/placeholder.svg?height=40&width=40",
    category: "Eco Travel",
    image: "https://picsum.photos/seed/costarica/800/400",
    date: "2023-07-18",
  },
  {
    id: 6,
    title: "The Hidden Gems of Southeast Asia",
    excerpt: "Uncover lesser-known destinations in Southeast Asia that offer unique experiences off the beaten path.",
    author: "Alex Wong",
    authorImage: "/placeholder.svg?height=40&width=40",
    category: "Off the Beaten Path",
    image: "https://picsum.photos/seed/southeast/800/400",
    date: "2023-08-01",
  },
]

const categories = [
  "All",
  "Destinations",
  "Urban Adventures",
  "Nature Wonders",
  "Food & Culture",
  "Eco Travel",
  "Off the Beaten Path",
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(
    (post) =>
      (activeCategory === "All" || post.category === activeCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Travel Blog</h1>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Featured Destinations</h2>
        <ThreeDPhotoCarousel />
      </div>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>

      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="flex flex-wrap justify-center">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
              className="px-4 py-2 m-1"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full">
            <CardHeader className="p-0">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <CardTitle className="mb-2">
                <Link href={`/blog/${post.id}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-6 bg-muted/50">
              <div className="flex items-center space-x-2">
                <Image
                  src={post.authorImage || "/placeholder.svg"}
                  alt={post.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-sm text-muted-foreground">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="outline">Load More Posts</Button>
      </div>
    </div>
  )
}

