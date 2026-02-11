import { MapPin, Compass } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20" id="home">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/campingroute.webp"
          alt="Wohnmobil auf malerischer Bergstraße bei Sonnenuntergang"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-0.5 mb-6">
          <img src="/favicon-original-final.svg" alt="KI-Routenplaner Logo" className="w-12 h-12" style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(600%) hue-rotate(5deg) brightness(100%) contrast(120%)' }} />
          <span className="text-[#F59B0A] font-medium tracking-wide uppercase">
            KI-Routenplaner
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Camping Route
        </h1>

        <p className="text-xl md:text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
          Plane deine perfekte Wohnmobil-Reise mit KI-gestützter Routenplanung
          und intelligenten Empfehlungen.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#main-content"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#F59B0A] to-[#E67E22] text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <MapPin className="w-5 h-5" />
            Route jetzt planen
          </a>
          <a
            href="#example-route"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-medium text-lg hover:bg-white/10 transition-colors duration-200"
          >
            Beispielroute ansehen
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex items-center justify-center gap-6 text-white/60 text-sm">
          <span>★★★★★ 4.7/5 Bewertung</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>1.000+ geplante Routen</span>
          <span className="w-1 h-1 rounded-full bg-white/40 hidden sm:block" />
          <span className="hidden sm:inline">100% kostenlos</span>
        </div>
      </div>
    </section>
  );
}
