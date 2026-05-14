const testimonials = [
  {
    text: "Această școală m-a ajutat să cresc atât pe plan personal cât și profesional.",
    author: "Maria, Elevă",
  },
  {
    text: "În fiecare zi învăț ceva nou și provocator, iar profesorii sunt minunați!",
    author: "Alex, Elev",
  },
  {
    text: "Atmosfera școlii este foarte primitoare și educația de calitate mă ajută să mă dezvolt continuu.",
    author: "Ioana, Elevă",
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
          Ce spun elevii noștri?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ text, author }, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 p-6 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-gray-600 italic leading-relaxed mb-4">
                &bdquo;{text}&rdquo;
              </p>
              <p className="text-blue-600 font-semibold text-sm">— {author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
