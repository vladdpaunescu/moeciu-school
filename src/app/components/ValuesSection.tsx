'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const values = [
  {
    title: "Abordare personalizată",
    description: "Fiecare elev are o poveste. Ne raportăm la toți copiii la fel, indiferent de mediul din care provin.",
    icon: "/iconite_1_abordare-personalizata.png",
  },
  {
    title: "Gândire laterală",
    description: "Ajutăm elevii să treacă de limitele gândirii clasice, încurajându-i să fie creativi și curioși.",
    icon: "/iconite_2_gandire-laterala.png",
  },
  {
    title: "Suport",
    description: "Ajutăm fiecare elev să își atingă potențialul maxim. Avem răbdare și înțelegem că lucrurile frumoase au nevoie de timp.",
    icon: "/iconite_3_suport.png",
  },
  {
    title: "Înțelegere",
    description: "Suntem prezenți în fiecare etapă a dezvoltării elevilor și clădim împreună cu ei un viitor echilibrat.",
    icon: "/iconite_4_intelegere.png",
  },
]

export default function ValuesSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cardRefs.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-500 mb-3 font-nunito">
            Ce ne definește
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-900">
            Valorile Noastre
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <div
              key={value.title}
              ref={(el) => { cardRefs.current[i] = el }}
              className="values-card bg-parchment-50 rounded-xl p-7 border-l-4 border-forest-700 shadow-sm opacity-0 translate-y-5 transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-lg bg-forest-50">
                <Image src={value.icon} alt={value.title} width={36} height={36} />
              </div>
              <h3 className="font-playfair text-lg font-bold text-forest-800 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-[#6b6254] leading-relaxed font-nunito">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
