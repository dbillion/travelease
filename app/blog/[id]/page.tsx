import { notFound } from "next/navigation"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "Night Life in Tokyo",
    content:
      "Tokyo comes alive at night with its dazzling neon lights and bustling streets. From the iconic Shibuya Crossing to the narrow alleys of Golden Gai, the city offers a unique nocturnal experience. Explore the vibrant nightlife, from karaoke bars to izakayas, and immerse yourself in the energy of this sleepless metropolis.",
    author: "Jane Doe",
    authorImage: "/placeholder.svg",
    category: "Destinations",
    image: "https://picsum.photos/800/400?night",
  },
  {
    id: 2,
    title: "Exploring New York City's Skyline",
    content:
      "New York City's iconic skyline is a testament to human ambition and architectural marvel. From the Empire State Building to One World Trade Center, each skyscraper tells a story of the city's evolution. Take a stroll through Central Park, visit the observation decks, and witness the breathtaking views that define the Big Apple.",
    author: "John Smith",
    authorImage: "/placeholder.svg",
    category: "Urban Adventures",
    image: "https://picsum.photos/800/400?city",
  },
  {
    id: 3,
    title: "Chasing the Northern Lights in Iceland",
    content:
      "Iceland's night sky comes alive with the mesmerizing dance of the Aurora Borealis. This natural light show, caused by solar particles colliding with the Earth's atmosphere, paints the sky in vibrant greens, pinks, and purples. Learn the best times and locations to witness this spectacular phenomenon and capture unforgettable memories.",
    author: "Alice Johnson",
    authorImage: "/placeholder.svg",
    category: "Nature Wonders",
    image: "https://picsum.photos/800/400?sky",
  },
  {
    id: 4,
    title: "Sunset Safari in the Serengeti",
    content:
      "Experience the magic of an African sunset while on a safari in the Serengeti. As the sun dips below the horizon, witness the golden light illuminate the vast savannah and its diverse wildlife. From majestic lions to graceful giraffes, the Serengeti offers an unforgettable adventure in the heart of nature.",
    author: "David Brown",
    authorImage: "/placeholder.svg",
    category: "Wildlife",
    image: "https://picsum.photos/800/400?sunset",
  },
  {
    id: 5,
    title: "Sunrise at Angkor Wat",
    content:
      "Watch the sun rise over the ancient temples of Angkor Wat in Cambodia. As the first light of day touches the iconic spires, the entire complex is bathed in a warm, golden glow. Explore the intricate carvings and towering structures that have stood for centuries, and immerse yourself in the rich history of the Khmer Empire.",
    author: "Emily Chen",
    authorImage: "/placeholder.svg",
    category: "Cultural Heritage",
    image: "https://picsum.photos/800/400?sunrise",
  },
  {
    id: 6,
    title: "Winter Wonderland in the Swiss Alps",
    content:
      "Discover the enchanting beauty of the Swiss Alps in winter. From snow-capped peaks to charming alpine villages, the region transforms into a magical wonderland. Hit the slopes for world-class skiing, enjoy a cozy fondue in a mountain chalet, and take in the breathtaking panoramas of the snow-covered landscape.",
    author: "Hans Mueller",
    authorImage: "/placeholder.svg",
    category: "Winter Sports",
    image: "https://picsum.photos/800/400?winter",
  },
  {
    id: 7,
    title: "Skyscrapers of Shanghai",
    content:
      "Marvel at the futuristic skyline of Shanghai, where traditional Chinese architecture meets cutting-edge design. Explore the iconic Oriental Pearl Tower, the twisting Shanghai Tower, and the sleek World Financial Center. Experience the city's blend of old and new as you wander through historic neighborhoods and modern business districts.",
    author: "Li Wei",
    authorImage: "/placeholder.svg",
    category: "Urban Exploration",
    image: "https://picsum.photos/800/400?skyscraper",
  },
  {
    id: 8,
    title: "Ancient Architecture of Rome",
    content:
      "Step back in time as you explore the ancient wonders of Rome. From the mighty Colosseum to the well-preserved Pantheon, the city is a living museum of architectural marvels. Walk in the footsteps of emperors and gladiators, and discover the enduring legacy of the Roman Empire in every corner of the Eternal City.",
    author: "Giulia Rossi",
    authorImage: "/placeholder.svg",
    category: "Historical Sites",
    image: "https://picsum.photos/800/400?architecture",
  },
  {
    id: 9,
    title: "Street Food Tour in Bangkok",
    content:
      "Embark on a culinary adventure through the vibrant streets of Bangkok. From sizzling satay skewers to fragrant pad thai, the city's street food scene is a feast for the senses. Navigate bustling night markets, sample exotic fruits, and discover the bold flavors that make Thai cuisine world-renowned.",
    author: "Supaporn Chai",
    authorImage: "/placeholder.svg",
    category: "Food and Culture",
    image: "https://picsum.photos/800/400?street",
  },
  {
    id: 10,
    title: "Northern Lights in Tromsø",
    content:
      "Witness the ethereal beauty of the Aurora Borealis in Tromsø, Norway. Located in the heart of the aurora zone, this Arctic city offers some of the best opportunities to see the northern lights dance across the sky. Learn about the science behind this natural phenomenon and capture stunning photographs of the colorful display.",
    author: "Erik Larsson",
    authorImage: "/placeholder.svg",
    category: "Natural Wonders",
    image: "https://picsum.photos/800/400?lights",
  },
  {
    id: 11,
    title: "Downtown Dubai and the Burj Khalifa",
    content:
      "Experience the glitz and glamour of downtown Dubai, home to the world's tallest building, the Burj Khalifa. Ascend to the observation deck for panoramic views of the city and desert beyond. Explore the Dubai Mall, watch the mesmerizing Dubai Fountain show, and indulge in luxury shopping and dining in this modern oasis.",
    author: "Fatima Al-Sayed",
    authorImage: "/placeholder.svg",
    category: "Urban Marvels",
    image: "https://picsum.photos/800/400?downtown",
  },
  {
    id: 12,
    title: "Crossing the Golden Gate Bridge",
    content:
      "Take an iconic journey across the Golden Gate Bridge in San Francisco. This engineering marvel spans the Golden Gate strait, offering stunning views of the bay and the city skyline. Whether you walk, bike, or drive, crossing this famous bridge is a quintessential San Francisco experience that shouldn't be missed.",
    author: "Michael Thompson",
    authorImage: "/placeholder.svg",
    category: "Landmarks",
    image: "https://picsum.photos/800/400?bridge",
  },
]

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find((post) => post.id === Number.parseInt(params.id))

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">{post.title}</h1>
        <div className="flex items-center mb-4 sm:mb-6">
          <Image
            src={post.authorImage || "/placeholder.svg"}
            alt={post.author}
            width={40}
            height={40}
            className="rounded-full mr-3 sm:mr-4 w-8 h-8 sm:w-10 sm:h-10"
          />
          <span className="text-sm sm:text-base text-muted-foreground">{post.author}</span>
        </div>
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          width={800}
          height={400}
          className="w-full rounded-lg mb-4 sm:mb-6 h-48 sm:h-64 lg:h-96 object-cover"
        />
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed">{post.content}</p>
        </div>
      </article>
    </div>
  )
}

