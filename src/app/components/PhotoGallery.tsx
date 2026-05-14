'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const photos = [
  { src: '/300063406_596371548860443_7495238156915760607_n.png', caption: 'Clădirea școlii' },
  { src: '/elevi-moeciu-comemorare-eroi.png', caption: 'Comemorare eroi' },
  { src: '/Voluntari-7.jpg', caption: 'Activitate de voluntariat' },
  { src: '/Voluntari-10.jpg', caption: 'Voluntariat în comunitate' },
]

export default function PhotoGallery() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1)
    setCurrent(next)
  }

  const prev = () => go((current - 1 + photos.length) % photos.length)
  const next = () => go((current + 1) % photos.length)

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % photos.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="py-20 bg-parchment-100">
      <div className="container mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-500 mb-3 font-nunito">
            Momente din școală
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-900">
            Galerie Foto
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative h-80 md:h-[26rem] rounded-2xl overflow-hidden shadow-xl bg-parchment-200">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={photos[current].src}
                  alt={photos[current].caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-5 text-white text-sm font-semibold font-nunito drop-shadow">
                  {photos[current].caption}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              aria-label="Fotografie anterioară"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-forest-700" />
            </button>
            <button
              onClick={next}
              aria-label="Fotografie următoare"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-forest-700" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Fotografie ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-2.5 bg-forest-700'
                    : 'w-2.5 h-2.5 bg-parchment-200 hover:bg-forest-300'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
