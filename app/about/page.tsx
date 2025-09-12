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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About TravelEase</h1>
      <p className="text-xl mb-12">
        At TravelEase, we're passionate about making your travel dreams a reality. Our journey began with a simple idea:
        to create unforgettable experiences for every traveler. Today, we're proud to be your trusted partner in
        exploring the world.
      </p>
      <h2 className="text-3xl font-semibold mb-6">Our History</h2>
      <StickyScroll content={companyHistory} />
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-lg mb-4">
          To inspire and empower travelers by providing exceptional service, innovative solutions, and unforgettable
          experiences that broaden horizons and create lasting memories.
        </p>
        <h2 className="text-3xl font-semibold mb-6 mt-8">Our Values</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Customer-Centric Approach</li>
          <li>Innovation in Travel Technology</li>
          <li>Sustainability and Responsible Tourism</li>
          <li>Cultural Respect and Understanding</li>
          <li>Continuous Improvement and Learning</li>
        </ul>
      </div>
    </div>
  )
}

