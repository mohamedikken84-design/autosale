import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Navigation,
  Sparkles
} from 'lucide-react';
import { DEALERSHIP_INFO, REVIEWS_DATA } from '../data/dealership';

export const ReviewsAndLocation: React.FC = () => {
  const [contactSent, setContactSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Algemene vraag',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div id="contact-container" className="bg-white border-t border-gray-200">
      {/* 1. Customer Testimonials & Google Rating - Bento Section */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span>Klantervaringen & Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tighter">
              Wat Onze Klanten Vertellen
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-[#F8F8F8] px-5 py-3 rounded-2xl border border-gray-200 shadow-xs self-start md:self-auto">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-black text-[#1A1A1A]">4.7 / 5.0</span>
            <span className="text-xs text-gray-500 font-semibold">op Google Maps</span>
          </div>
        </div>

        {/* Reviews Cards Grid - Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#F8F8F8] rounded-3xl p-6 border border-gray-200 shadow-xs hover:border-[#FF6B00] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-white border border-gray-200 px-2.5 py-0.5 rounded-full">
                    {rev.source}
                  </span>
                </div>

                {rev.carPurchased && (
                  <div className="text-xs font-bold text-[#FF6B00] mb-2 line-clamp-1 uppercase tracking-wider">
                    Gekocht: {rev.carPurchased}
                  </div>
                )}

                <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-5 font-medium">
                  "{rev.content}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1A1A1A]">{rev.author}</div>
                  <div className="text-[10px] text-gray-400 font-semibold">{rev.date}</div>
                </div>
                {rev.verified && (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Geverifieerd
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Location, Hours & Direct Contact Form */}
      <section id="contact" className="py-16 lg:py-24 bg-[#F8F8F8] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Left Column: Address, Opening Hours, Map link (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Showroom & Burelen</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
                  Bezoek Onze Showroom te Antwerpen
                </h2>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Centraal gelegen aan de Sint-Bernardsesteenweg in Hoboken (Antwerpen), vlot bereikbaar via de A12, E19 en de Antwerpse Ring (R1).
                </p>
              </div>

              {/* Address card with direct Google Maps link - Bento Box */}
              <div className="p-6 rounded-3xl bg-white border border-gray-200 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1A1A1A] font-['Outfit',sans-serif]">{DEALERSHIP_INFO.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium leading-relaxed">
                      {DEALERSHIP_INFO.address.street} <br />
                      {DEALERSHIP_INFO.address.postalCode} {DEALERSHIP_INFO.address.city}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={DEALERSHIP_INFO.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-2xl transition-all shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>

                  <a
                    href={`tel:${DEALERSHIP_INFO.contact.phoneRaw}`}
                    className="inline-flex items-center gap-2 bg-[#F8F8F8] border border-gray-200 hover:border-gray-400 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-2xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{DEALERSHIP_INFO.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* Opening Hours Table - Bento Box */}
              <div className="p-6 rounded-3xl bg-white border border-gray-200">
                <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF6B00]" />
                  <span>Openingsuren Showroom</span>
                </h3>
                <div className="divide-y divide-gray-100 text-xs">
                  {DEALERSHIP_INFO.hours.map((h, i) => (
                    <div key={i} className="py-2.5 flex justify-between items-center">
                      <span className="font-semibold text-gray-600">{h.days}</span>
                      <span className={`font-bold ${h.open ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
                        {h.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
                  Tip: Buiten de openingsuren of in het weekend ontvangen wij u graag op afspraak!
                </div>
              </div>

              {/* Interactive map iframe preview */}
              <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-gray-200 bg-gray-100 relative shadow-sm">
                <iframe
                  title="Auto Sale Antwerpen Kaart"
                  src="https://maps.google.com/maps?q=Sint-Bernardsesteenweg+733,+2660+Antwerpen&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column: Contact & Appointment Form (7 cols) - Bento Box */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
                <h3 className="text-3xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] mb-2 tracking-tight">
                  Stuur Ons een Bericht
                </h3>
                <p className="text-xs text-gray-500 mb-8 font-medium">
                  Heeft u een vraag over een specifieke wagen in onze stock, financiering of wilt u langskomen? Wij antwoorden spoedig.
                </p>

                {!contactSent ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Uw Naam *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Voornaam en achternaam"
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Telefoonnummer *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+32 4XX XX XX XX"
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          E-mailadres *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="naam@voorbeeld.be"
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Onderwerp
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                        >
                          <option value="Informatie over wagen">Informatie over wagen</option>
                          <option value="Proefrit aanvragen">Proefrit aanvragen</option>
                          <option value="Overname / Verkoop">Overname / Verkoop</option>
                          <option value="Financiering / Leasing">Financiering / Leasing</option>
                          <option value="Export formaliteiten">Export formaliteiten</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Uw Bericht *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Beschrijf uw vraag of geef aan welke dag u graag zou langskomen..."
                        className="w-full bg-[#F8F8F8] border border-gray-200 rounded-2xl p-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
                      <div className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Snelle reactie binnen 2 uur tijdens kantooruren</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-4 px-8 rounded-2xl shadow-md transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Verstuur Bericht</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-black font-['Outfit',sans-serif] text-[#1A1A1A]">
                      Bericht Succesvol Verzonden!
                    </h4>
                    <p className="text-xs text-gray-600 max-w-sm mx-auto font-medium">
                      Bedankt <strong>{formData.name}</strong>. Ons verkoopteam neemt spoedig contact met u op via {formData.phone} of {formData.email}.
                    </p>
                    <button
                      onClick={() => setContactSent(false)}
                      className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[#FF6B00] hover:underline cursor-pointer"
                    >
                      Nog een bericht versturen
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
