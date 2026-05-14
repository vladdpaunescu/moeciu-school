'use client'

import Link from 'next/link'
import { Facebook, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = [
  { href: '/pages/about', label: 'Despre Noi' },
  { href: '/pages/announcements', label: 'Anunțuri' },
  { href: '/pages/contact', label: 'Contact' },
  { href: '/intranet/login', label: 'Platformă Intranet' },
]

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white font-nunito">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <p className="font-playfair text-2xl font-bold text-white mb-1">
              Școala Gimnazială
            </p>
            <p className="font-playfair text-xl text-forest-300 mb-5">
              Moieciu de Jos
            </p>
            <div className="space-y-2.5 text-sm text-forest-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                <span>+40 268 236 899</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                <span>office@scoalamoeciudejos.ro</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                <span>Strada Principală 514, Moieciu de Jos, 507135, Brașov</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-5">
              Informații Utile
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-forest-300 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-forest-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest-500">
          <p>© {new Date().getFullYear()} Școala Gimnazială Moieciu de Jos. Toate drepturile rezervate.</p>
          <a
            href="https://www.facebook.com/people/%C8%98coala-Gimnazial%C4%83-Moieciu-de-Jos/100054628082330/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  )
}
