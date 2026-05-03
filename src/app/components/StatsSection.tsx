'use client'

import { useState, useEffect, useRef } from 'react'
import { Users, GraduationCap, School } from 'lucide-react'

const stats = [
  { 
    label: 'Elevi', 
    value: 500,
    icon: Users,
    description: 'elevi înscriși'
  },
  { 
    label: 'Profesori', 
    value: 20,
    icon: GraduationCap,
    description: 'cadre didactice'
  },
  { 
    label: 'Clase', 
    value: 10,
    icon: School,
    description: 'săli de clasă'
  },
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
      { threshold: 0.1 }
    )

    if (el) {
      observer.observe(el)
    }

    return () => {
      if (el) {
        observer.unobserve(el)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="section bg-gray-100" id="stats">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Școala Noastră în Cifre</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-item ${isVisible ? 'animate-on-scroll' : ''}`}
              style={{ animationDelay: `${index * 400}ms` }}
            >
              <stat.icon className="stat-icon" />
              <AnimatedCounter value={stat.value} duration={4000} isVisible={isVisible} />
              <div className="stat-label">{stat.label}</div>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedCounter({ value, duration, isVisible }: { value: number; duration: number; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [value, duration, isVisible])

  return <div className="stat-value">{count}</div>
}

