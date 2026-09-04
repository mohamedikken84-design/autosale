import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  Globe, 
  Quote,
  Clock,
  Sparkles,
  CarFront,
  ArrowRight
} from 'lucide-react';
import { DEALERSHIP_INFO } from '../data/dealership';

interface AboutSectionProps {
  onExploreStock: () => void;
  onOpenValuation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreStock,
  onOpenValuation
}) => {
  return (
    <div id="about-container">
      {/* 1. Traxio Kwaliteitsgarantie Highlight Banner - Bento Box */}
      <section id="garantie" className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-zinc-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Traxio Label & Car-Pass</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black font-['Outfit',sans-serif] tracking-tight">
                  Zorgeloos Rijden met Maximale Zekerheid
                </h3>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Als erkend lid van de Belgische automobielfederatie <strong className="text-white font-bold">Traxio</strong> hanteren wij de strengste kwaliteitsnormen. Elk voertuig ondergaat een diepgaande inspectie op 113 controlepunten en wordt afgeleverd met een officiële Car-Pass kilometergarantie en blanco keuring voor verkoop.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <span>12 tot 24 Maanden Garantie</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <span>100% Car-Pass Kilometergarantie</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <span>Blanco Keuring & Aanvraag Plaat</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <span>Europese Pechhulp Beschikbaar</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-black/40 rounded-3xl border border-zinc-800 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center font-black text-2xl shadow-lg">
                  TRAXIO
                </div>
                <div className="text-xl font-black font-['Outfit',sans-serif] text-white">
                  Kwaliteitsgarantie
                </div>
                <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                  Aangesloten bij de federatie van de autosector. Uw waarborg voor eerlijke voorwaarden, transparante contracten en deskundig advies.
                </p>
                <div className="text-[11px] font-bold text-gray-500 pt-1 uppercase tracking-wider">
                  KBO Lidnr: {DEALERSHIP_INFO.vatNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Auto Sale History & Philosophy */}
      <section id="over-ons" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Images & Heritage Badge (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl border border-gray-200 relative">
                <img
                  src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80"
                  alt="Auto Sale Showroom Antwerpen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest">
                    Sint-Bernardsesteenweg 733-735
                  </div>
                  <div className="text-lg font-black font-['Outfit',sans-serif]">
                    Showroom & Burelen te Antwerpen
                  </div>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#FF6B00] text-white p-5 rounded-3xl shadow-xl flex items-center gap-3">
                <div className="text-4xl font-black font-['Outfit',sans-serif]">
                  25+
                </div>
                <div className="text-xs font-black leading-tight uppercase tracking-wider">
                  Jaren Passie <br />Voor Auto's
                </div>
              </div>
            </div>

            {/* Right: Story & Michel Primack Quote (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F8F8] border border-gray-200 text-[#1A1A1A] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Over Auto Sale NV</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tighter leading-tight">
                Vaste Waarde in de Antwerpse Autosector Sinds 1999
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Opgericht in 1999 aan de Sint-Bernardsesteenweg in Hoboken (Antwerpen), is Auto Sale NV uitgegroeid tot één van de meest gereputeerde onafhankelijke dealers van jonge, exclusieve tweedehandswagens in Vlaanderen en ver daarbuiten.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed">
                Onze filosofie is gebouwd op drie onwrikbare pijlers: <strong className="text-[#1A1A1A] font-bold">Uitmuntende staat, Extreme selectiviteit en Scherpe prijzen</strong>. Wij selecteren uitsluitend voertuigen die voldoen aan de hoogste eisen van veeleisende bestuurders en bedrijven.
              </p>

              {/* Founder quote box - Clean Bento Card (no side tabs) */}
              <div className="p-6 rounded-3xl bg-[#F8F8F8] border border-gray-200">
                <div className="flex gap-4 items-start">
                  <Quote className="w-8 h-8 text-[#FF6B00] shrink-0 opacity-80" />
                  <div>
                    <blockquote className="italic text-[#1A1A1A] text-sm font-semibold leading-relaxed">
                      "Auto Sale laat je niet alleen met een geweldige auto rijden, maar ook met een grote glimlach. Dat is al 25 jaar onze persoonlijke belofte aan elke klant die bij ons binnenstapt."
                    </blockquote>
                    <div className="mt-3 text-xs font-bold text-[#1A1A1A]">
                      Michel Primack <span className="text-gray-500 font-normal">— Zaakvoerder Auto Sale NV</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services grid - Bento cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {DEALERSHIP_INFO.guarantees.map((g, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-gray-200 bg-[#F8F8F8]">
                    <h4 className="font-bold text-xs text-[#1A1A1A] uppercase tracking-wider mb-1">
                      {g.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                      {g.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
