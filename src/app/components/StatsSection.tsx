'use client'

import { useState, useEffect, useRef } from 'react'
import { Users, GraduationCap, School } from 'lucide-react'

const stats = [
  { label: 'Elevi înscriși', value: 500, suffix: '+', icon: Users },
  { label: 'Cadre didactice', value: 20, suffix: '+', icon: GraduationCap },
  { label: 'Săli de clasă', value: 10, suffix: '', icon: School },
]

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-forest-700" id="stats">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-forest-500">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center text-center py-6 sm:py-0 gap-3">
              <stat.icon className="w-7 h-7 text-forest-300" />
              <div className="font-playfair text-6xl font-bold text-white leading-none">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                  isVisible={isVisible}
                />
              </div>
              <p className="text-forest-300 text-sm font-medium tracking-wide uppercase font-nunito">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedCounter({
  value,
  suffix,
  duration,
  isVisible,
}: {
  value: number
  suffix: string
  duration: number
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  }, [value, duration, isVisible])

  return <span>{count}{suffix}</span>
}
