'use client'

import { FileText, Book, Calendar, ArrowDownToLine } from 'lucide-react'

const resources = [
  {
    title: 'Orar Școlar',
    icon: Calendar,
    description: 'Orarul actualizat al claselor pentru semestrul curent',
    url: '/ORAR_SEM_1_IESC_rev_16.pdf',
    download: true,
    target: '_self',
  },
  {
    title: 'Manuale Digitale',
    icon: Book,
    description: 'Acces la biblioteca de manuale digitale online',
    url: 'https://www.unitbv.ro/biblioteca/264-resurse-electronice/1359-carti-online.html',
    download: false,
    target: '_blank',
  },
  {
    title: 'Regulament Intern',
    icon: FileText,
    description: 'Regulamentul de activitate profesională și școlară',
    url: '/Regulament_activitate_profesionala_studenti_2024-2025_30.09.2024.pdf',
    download: true,
    target: '_self',
  },
]

export default function ResourcesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-500 mb-3 font-nunito">
            La dispoziția ta
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest-900">
            Resurse Educaționale
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target={resource.target}
              rel={resource.target === '_blank' ? 'noopener noreferrer' : undefined}
              {...(resource.download ? { download: true } : {})}
              className="group flex flex-col items-center text-center bg-parchment-50 hover:bg-forest-700 border border-parchment-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-forest-700 group-hover:bg-white rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                <resource.icon className="w-7 h-7 text-white group-hover:text-forest-700 transition-colors duration-300" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-forest-900 group-hover:text-white mb-2 transition-colors duration-300">
                {resource.title}
              </h3>
              <p className="text-sm text-[#6b6254] group-hover:text-forest-100 leading-relaxed mb-5 font-nunito transition-colors duration-300">
                {resource.description}
              </p>
              <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-amber-500 group-hover:text-amber-400 font-nunito transition-colors duration-300">
                <ArrowDownToLine className="w-3.5 h-3.5" />
                {resource.download ? 'Descarcă' : 'Deschide'}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
