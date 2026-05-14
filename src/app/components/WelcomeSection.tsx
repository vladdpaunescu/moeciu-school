import Image from 'next/image'
import Link from 'next/link'

export default function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="container">
        <div className="welcome-content">
          <div className="welcome-text animate-on-scroll">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {"Școala Gimnazială"}<br />
              <span className="text-primary-color">Moieciu de Jos</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              &bdquo;{"Educația este cheia cu ajutorul căreia putem deschide orice ușă!"}&rdquo;
            </p>
            <Link
              href="/intranet/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md"
            >
              {"Accesează Platforma"}
            </Link>
          </div>
          <div className="welcome-image-container animate-on-scroll delay-200">
            <Image
              src="/300063406_596371548860443_7495238156915760607_n.png"
              alt="Școala Gimnazială Moieciu de Jos"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              priority
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
