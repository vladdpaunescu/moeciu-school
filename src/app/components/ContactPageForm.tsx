'use client'

import dynamic from "next/dynamic"
import { Mail, MapPin, Phone } from "lucide-react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import BackToTop from "@/app/components/BackToTop"
import LocationSection from "@/app/components/LocationSection"
import ContactFormWrapper from "@/app/components/ContactFormWrapper"

const PageTransition = dynamic(() => import("@/app/components/PageTransition"), {
  ssr: false,
})

export default function ContactPageClient() {
  return (
    <PageTransition variant="fade">
      <div className="flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-5">
          <section id="contact-section" className="w-full max-w-7xl">
            <div className="bg-[#f5f5f5] py-10 px-5 text-center shadow-[0_10px_20px_rgba(0,0,0,0.1)] mt-5 rounded-lg grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-16 mb-8 divide-black divide-dashed">
              <div>
                <div className="contact-header">
                  <h1 className="text-3xl sm:text-4xl font-bold text-[#333]">Unde ne poți găsi?</h1>
                </div>
                <div className="ml-0 md:ml-10 mt-10 md:mt-20">
                  <div className="flex items-center gap-2 mt-4 mb-4">
                    <Phone className="w-5 h-5" />
                    <span>+40 268 236 899</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 mb-4">
                    <Mail className="w-5 h-5" />
                    <span>office@scoalamoeciudejos.ro</span>
                  </div>
                  <div className="flex items-center gap-2 mt-4 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span>Strada Principală 514, Moieciu de Jos, 507135, Brașov</span>
                  </div>
                </div>
                <div className="footer-map mt-8">
                  <LocationSection />
                </div>
              </div>

              <div className="max-w-2xl md:max-w-none">
                <h1 className="text-[2rem] md:text-[2.5rem] text-[#333] mb-10">Contactați-ne</h1>
                <ContactFormWrapper />
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  )
}
