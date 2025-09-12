"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const blogPosts = [
  {
    id: 1,
    title: "Night Life in Tokyo",
    keyword: "night",
  },
  {
    id: 2,
    title: "Exploring New York City's Skyline",
    keyword: "city",
  },
  {
    id: 3,
    title: "Chasing the Northern Lights in Iceland",
    keyword: "sky",
  },
  {
    id: 4,
    title: "Sunset Safari in the Serengeti",
    keyword: "sunset",
  },
  {
    id: 5,
    title: "Sunrise at Angkor Wat",
    keyword: "sunrise",
  },
  {
    id: 6,
    title: "Winter Wonderland in the Swiss Alps",
    keyword: "winter",
  },
  {
    id: 7,
    title: "Skyscrapers of Shanghai",
    keyword: "skyscraper",
  },
  {
    id: 8,
    title: "Ancient Architecture of Rome",
    keyword: "architecture",
  },
  {
    id: 9,
    title: "Street Food Tour in Bangkok",
    keyword: "street",
  },
  {
    id: 10,
    title: "Northern Lights in Tromsø",
    keyword: "lights",
  },
  {
    id: 11,
    title: "Downtown Dubai and the Burj Khalifa",
    keyword: "downtown",
  },
  {
    id: 12,
    title: "Crossing the Golden Gate Bridge",
    keyword: "bridge",
  },
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }

const Carousel = memo(
  ({
    cards,
  }: {
    cards: { imgUrl: string; id: number }[]
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`)

    useEffect(() => {
      const rotateCarousel = () => {
        rotation.set(rotation.get() + 0.5)
        requestAnimationFrame(rotateCarousel)
      }
      const animationId = requestAnimationFrame(rotateCarousel)
      return () => cancelAnimationFrame(animationId)
    }, [rotation])

    return (
      <div
        className="flex h-full items-center justify-center bg-background"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          className="relative flex h-full origin-center justify-center"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`key-${card.imgUrl}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-background p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
            >
              <Link href={`/blog/${card.id}`} passHref>
                <motion.img
                  src={card.imgUrl}
                  alt={`Featured destination ${i + 1}`}
                  layoutId={`img-${card.imgUrl}`}
                  className="w-full rounded-xl object-cover aspect-square cursor-pointer"
                  initial={{ filter: "blur(4px)" }}
                  animate={{ filter: "blur(0px)" }}
                  whileHover={{ scale: 1.05 }}
                  transition={transition}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  },
)

function ThreeDPhotoCarousel() {
  const cards = useMemo(
    () =>
      blogPosts.map((post) => ({
        imgUrl: `https://picsum.photos/200/300?${post.keyword}`,
        id: post.id,
      })),
    [],
  )

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <Carousel cards={cards} />
    </div>
  )
}

export { ThreeDPhotoCarousel }

