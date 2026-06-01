"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Acasă" },
  { href: "/pages/about", label: "Despre Noi" },
  { href: "/pages/announcements", label: "Anunțuri" },
  { href: "/pages/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 font-nunito ${
        isScrolled ? "bg-white shadow-sm" : "bg-parchment-50 border-b border-parchment-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-playfair text-lg font-bold text-forest-900 leading-tight">
            <span className="text-forest-700">ȘG</span> Moieciu de Jos
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5 text-sm font-semibold">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3.5 py-2 rounded-lg transition-colors duration-200 ${
                isActive(href)
                  ? "text-forest-700 bg-forest-50"
                  : "text-[#4a4540] hover:text-forest-700 hover:bg-parchment-100"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/intranet/login"
            className="ml-3 bg-forest-700 hover:bg-forest-900 text-white px-5 py-2 rounded-lg transition-colors duration-200 font-semibold"
          >
            Platformă
          </Link>
        </div>

        <button
          onClick={() => setIsOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg text-[#4a4540] hover:bg-parchment-100 transition-colors"
          aria-label={isOpen ? "Închide meniu" : "Deschide meniu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 space-y-1 border-t border-parchment-200 pt-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive(href)
                  ? "text-forest-700 bg-forest-50"
                  : "text-[#4a4540] hover:text-forest-700 hover:bg-parchment-100"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/intranet/login"
            className="block bg-forest-700 hover:bg-forest-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-center transition-colors mt-2"
          >
            Platformă
          </Link>
        </div>
      </div>
    </nav>
  );
}
