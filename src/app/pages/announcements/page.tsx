'use client'

import { useState, useEffect } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { supabase } from "../../../../lib/supabaseClient"
import PageTransition from "../../components/PageTransition"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Event = {
  id: number
  date: Date
  name: string
}

const MONTHS = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
]

const WEEKDAYS = ["L", "Ma", "Mi", "J", "V", "S", "D"]

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase.from("Events").select("*")
      if (error) {
        console.error("Eroare la preluarea evenimentelor:", error)
      } else {
        setEvents((data ?? []).map((event) => ({ ...event, date: new Date(event.date) })))
      }
      setLoading(false)
    }
    fetchEvents()
  }, [])

  const getFilteredEvents = () => {
    return events.filter((event) => {
      const eventMonth = event.date.getMonth()
      const eventYear = event.date.getFullYear()
      return eventMonth === selectedMonth && eventYear === selectedYear
    })
  }

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
  const firstDayOfMonth = (new Date(selectedYear, selectedMonth, 1).getDay() + 6) % 7

  const eventDays = getFilteredEvents()
    .filter((event) => event.date instanceof Date && !isNaN(event.date.getTime()))
    .map((event) => event.date.getDate())

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(selectedMonth + 1)
    }
  }

  const renderLoadingSpinner = () => (
    <div className="flex justify-center items-center h-48">
      <div className="loader"></div> {/* Poți folosi o componentă spinner sau CSS simplu */}
    </div>
  )

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center p-6">
          <h1 className="text-3xl font-bold mt-9 mb-9 text-center">Calendar Evenimente</h1>
          <p className="w-[100%] md:w-[800px] mb-9 text-center mx-auto">
            Această pagină îți permite să vizualizezi evenimentele programate într-un calendar interactiv. Poți selecta
            orice lună și an pentru a vedea evenimentele care au loc în acea perioadă. Fiecare zi în calendar va fi
            marcată dacă există evenimente planificate, iar la selectarea unei zile, vei putea vizualiza o listă
            detaliată cu toate evenimentele care au loc în acea zi.
          </p>

          <div className="w-full max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePreviousMonth} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold">
                {MONTHS[selectedMonth]} {selectedYear}
              </h2>
              <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 sm:grid-cols-5 md:grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => (
                  <div key={day} className="p-4 text-center bg-blue-500 text-white font-medium text-xs sm:text-sm md:text-base">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 sm:grid-cols-5 md:grid-cols-7 gap-2">
                {[...Array(firstDayOfMonth)].map((_, i) => (
                  <div key={`empty-${i}`} className="p-4 border-t border-r border-gray-200" />
                ))}
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1
                  const isEventDay = eventDays.includes(day)
                  const isSelected = selectedDate === day

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`p-4 border-t border-r border-gray-200 text-center hover:bg-gray-50
                        ${isEventDay ? "font-bold text-blue-600" : ""} ${isSelected ? "bg-blue-50" : ""}`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {loading ? renderLoadingSpinner() : selectedDate && (
              <div className="mt-6 p-4 border rounded-lg bg-white shadow-lg">
                <h2 className="text-xl font-bold">
                  Evenimente pe {selectedDate}/{selectedMonth + 1}/{selectedYear}
                </h2>
                <ul className="mt-2">
                  {getFilteredEvents().filter((event) => event.date.getDate() === selectedDate).length === 0 ? (
                    <li className="text-gray-500">Nu există evenimente în această zi.</li>
                  ) : (
                    getFilteredEvents()
                      .filter((event) => event.date.getDate() === selectedDate)
                      .map((event) => (
                        <li key={event.id} className="mt-1 text-gray-700">
                          🗓️ <strong>{event.name}</strong>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  )
}
