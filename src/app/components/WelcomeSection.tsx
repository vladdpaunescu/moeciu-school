import Image from 'next/image'
import Link from 'next/link'

export default function WelcomeSection() {
  return (
    <section className="welcome-section bg-parchment-50">
      <div className="container">
        <div className="welcome-content">

          <div className="welcome-text">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-forest-500 mb-5">
              Moieciu de Jos &middot; Județul Brașov
            </p>

            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-forest-900 leading-[1.05] mb-6">
              Școala<br />
              <span className="text-forest-700">Gimnazială</span><br />
              <span className="relative inline-block">
                Moieciu de Jos
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
              </span>
            </h1>

            <p className="text-base text-[#6b6254] italic leading-relaxed mt-8 mb-10 max-w-sm font-nunito">
              &bdquo;Educația este cheia cu ajutorul căreia putem deschide orice ușă!&rdquo;
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/intranet/login"
                className="inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-900 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200 font-nunito"
              >
                Accesează Platforma
              </Link>
              <Link
                href="/pages/about"
                className="inline-flex items-center gap-2 border-2 border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-colors duration-200 font-nunito"
              >
                Despre Noi
              </Link>
            </div>
          </div>

          <div className="welcome-image-container rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/300063406_596371548860443_7495238156915760607_n.png"
              alt="Școala Gimnazială Moieciu de Jos"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}
