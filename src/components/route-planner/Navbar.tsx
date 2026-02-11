import { Compass } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <Compass className={`w-6 h-6 transition-colors text-[#F59B0A]`} />
          <span className={`font-bold text-xl transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
            Camping Route
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "Erfahrungen", href: "#testimonials" },
            { label: "Beispielroute", href: "#example-route" },
            { label: "Planer", href: "#main-content" },
            { label: "FAQ", href: "#faq" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-medium text-sm transition-colors ${
                scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#main-content"
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#F59B0A] to-[#E67E22] text-white font-semibold text-sm shadow-soft hover:scale-105 transition-transform"
        >
          Jetzt planen
        </a>
      </div>
    </nav>
  );
}
