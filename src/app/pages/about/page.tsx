'use client'

import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import BackToTop from '@/app/components/BackToTop'
import ValuesSection from '@/app/components/ValuesSection'
import Testimonials from '@/app/components/Testimonials'
import Image from 'next/image'
import PageTransition from '@/app/components/PageTransition'

export default function Despre() {
  return (
    <PageTransition variant="fade">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <div className="about-container">
            <section
              className="hero-section relative bg-center bg-cover"
              style={{ backgroundImage: "url('/schoolAboutPage.png')" }}
            >
              <div className="absolute inset-0 bg-black/55" />
              <div className="relative z-10 flex flex-col items-center">
                <h1 className="hero-title">Despre Noi</h1>
                <p className="hero-subtitle">&bdquo;Educa&#x21b;ia este cheia succesului!&rdquo;</p>
              </div>
            </section>

            <section className="content-section">
              <div className="text-content">
                <h2 className="section-title">Cine Suntem?</h2>
                <p className="section-text">
                  &Scedil;coala Gimnazial&#x103; Moieciu de Jos este o institu&#x21b;ie educa&#x21b;ional&#x103;
                  important&#x103; din comuna Moieciu, jude&#x21b;ul Bra&#x219;ov, care se remarc&#x103; prin
                  performan&#x21b;ele elevilor s&#x103;i &#x219;i implicarea activ&#x103; a cadrelor didactice.
                  Situat&#x103; &#xEE;n inima satului Moieciu de Jos, &#x219;coala ofer&#x103; educa&#x21b;ie de
                  calitate pentru ciclul gimnazial &#x219;i se afl&#x103; &#xEE;ntr-o zon&#x103; pitoreasc&#x103;,
                  cunoscut&#x103; pentru peisajele sale montane.
                  <br /><br />
                  &#xCE;n 2023, &Scedil;coala Gimnazial&#x103; Moieciu de Jos a ob&#x21b;inut rezultate deosebite
                  la Evaluarea Na&#x21b;ional&#x103;, patru elevi reu&#x219;ind s&#x103; ob&#x21b;in&#x103; nota
                  maxim&#x103; de 10. Aceste performan&#x21b;e au fost realizate la diferite discipline, trei
                  dintre elevi av&#xE2;nd nota 10 la matematic&#x103; &#x219;i unul la limba &#x219;i literatura
                  rom&#xE2;n&#x103;.
                  <br /><br />
                  Pe l&#xE2;ng&#x103; performan&#x21b;ele &#x219;colare, &#x219;coala se bucur&#x103; &#x219;i de
                  un director activ &#xEE;n via&#x21b;a comunit&#x103;&#x21b;ii. Marius Olteanu, directorul
                  &#x219;colii, &#xEE;n 2023, al&#x103;turi de echipa Rom&#xE2;niei, a c&#xE2;&#x219;tigat medalia
                  de bronz la Campionatele Europene de Atletism Masters din Pescara, Italia.
                </p>
              </div>
              <div className="image-container">
                <Image
                  src="/300063406_596371548860443_7495238156915760607_n.png"
                  alt="Scoala Gimnaziala Moieciu de Jos"
                  width={800}
                  height={60}
                  className="image"
                />
              </div>
            </section>

            <ValuesSection />
            <Testimonials />
          </div>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  )
}
