"use client"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"

const companyHistory = [
  {
    title: "Our Humble Beginnings",
    description:
      "TravelEase was founded in 2005 by a group of passionate travelers who saw the need for a more personalized and efficient travel planning service. Starting as a small office in downtown, we began by offering custom itineraries for adventurous souls.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        2005: TravelEase Founded
      </div>
    ),
  },
  {
    title: "Expanding Our Horizons",
    description:
      "By 2010, we had grown significantly, opening offices in major cities across the country. We introduced our innovative online booking system, making it easier than ever for clients to plan and book their dream vacations.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--indigo-500))] flex items-center justify-center text-white">
        2010: Nationwide Expansion
      </div>
    ),
  },
  {
    title: "Embracing Technology",
    description:
      "In 2015, we launched our mobile app, bringing the power of TravelEase to our clients' fingertips. This move solidified our position as a tech-forward travel agency, blending traditional service with cutting-edge technology.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        2015: Mobile App Launch
      </div>
    ),
  },
  {
    title: "Global Recognition",
    description:
      "By 2020, TravelEase had become a globally recognized brand in the travel industry. We received numerous awards for our customer service and innovative approach to travel planning. Our commitment to sustainable and responsible tourism practices also gained international acclaim.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        2020: International Awards
      </div>
    ),
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-center">About TravelEase</h1>
      <p className="text-lg sm:text-xl mb-8 sm:mb-12 text-center max-w-4xl mx-auto">
        At TravelEase, we're passionate about making your travel dreams a reality. Our journey began with a simple idea:
        to create unforgettable experiences for every traveler. Today, we're proud to be your trusted partner in
        exploring the world.
      </p>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Our History</h2>
      <div className="max-w-6xl mx-auto">
        <StickyScroll content={companyHistory} />
      </div>
      <div className="mt-8 sm:mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Our Mission</h2>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center">
          To inspire and empower travelers by providing exceptional service, innovative solutions, and unforgettable
          experiences that broaden horizons and create lasting memories.
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Customer-Centric Approach</h3>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Innovation in Travel Technology</h3>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Sustainability and Responsible Tourism</h3>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Cultural Respect and Understanding</h3>
          </div>
          <div className="text-center p-4 border rounded-lg sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-2">Continuous Improvement and Learning</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

