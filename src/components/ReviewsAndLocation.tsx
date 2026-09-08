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
  Car,
  Compass
} from 'lucide-react';
import { DEALERSHIP_INFO, REVIEWS_DATA } from '../data/dealership';
import { DealershipSettings, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';

interface ReviewsAndLocationProps {
  dealershipSettings?: DealershipSettings;
  onContactSubmit?: (lead: { name: string; email: string; phone: string; subject: string; message: string }) => void;
  language?: Language;
}

export const ReviewsAndLocation: React.FC<ReviewsAndLocationProps> = ({
  dealershipSettings,
  onContactSubmit,
  language = 'nl',
}) => {
  const t = TRANSLATIONS[language]?.reviews || TRANSLATIONS.nl.reviews;
  const [contactSent, setContactSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Informatie over wagen',
    message: ''
  });

  const phone = dealershipSettings?.phone || DEALERSHIP_INFO.contact.phone;
  const phoneRaw = dealershipSettings?.phoneRaw || DEALERSHIP_INFO.contact.phoneRaw;
  const whatsapp = dealershipSettings?.whatsapp || DEALERSHIP_INFO.contact.whatsapp;
  const email = dealershipSettings?.email || DEALERSHIP_INFO.contact.email;
  const street = dealershipSettings?.address || dealershipSettings?.street || DEALERSHIP_INFO.address.street;
  const city = dealershipSettings?.city || DEALERSHIP_INFO.address.city;
  const googleMapsUrl = dealershipSettings?.googleMapsUrl || DEALERSHIP_INFO.address.googleMapsUrl;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onContactSubmit) {
      onContactSubmit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
    }
    setContactSent(true);
  };

  return (
    <div id="contact-container" className="bg-white border-t border-zinc-200/80">
      {/* 1. Customer Testimonials & Google Rating - Bento Section */}
      <section className="py-10 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B00] text-white text-[11px] font-black uppercase tracking-widest mb-2.5 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
              {t.contactSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#F8F9FA] px-4 py-2.5 rounded-2xl border border-zinc-200 shadow-xs self-start md:self-auto">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-black text-[#1A1A1A]">4.9 / 5.0</span>
            <span className="text-[11px] text-gray-500 font-medium">{t.score}</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#F8F9FA] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-zinc-200 shadow-xs hover:border-[#FF6B00] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-white border border-zinc-200 px-2 py-0.5 rounded-full">
                    {rev.source}
                  </span>
                </div>

                {rev.carPurchased && (
                  <div className="text-[11px] font-bold text-[#FF6B00] mb-2 line-clamp-1 uppercase tracking-wider">
                    Gekocht: {rev.carPurchased}
                  </div>
                )}

                <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-4 font-medium">
                  "{rev.content}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200/70 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1A1A1A]">{rev.author}</div>
                  <div className="text-[10px] text-gray-400 font-medium">{rev.date}</div>
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

      {/* 2. Showroom & Location: Map side-by-side with complete details (NO EMPTY SPACE ON PC) */}
      <section id="contact" className="py-10 sm:py-16 bg-[#F8F9FA] border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Section Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1A1A] text-white text-[11px] font-black uppercase tracking-widest mb-2 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Showroom & Burelen</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
              Bezoek Onze Showroom te Antwerpen
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
              Centraal gelegen aan de Sint-Bernardsesteenweg in Hoboken (Antwerpen), direct bereikbaar via de A12, E19 en de Antwerpse Ring (R1).
            </p>
          </div>

          {/* Interactive Map & Direct Details Side-by-Side Grid (fills all space on desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left side (7 cols): Prominent Interactive Google Maps */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-3 sm:p-4 border border-zinc-200 shadow-sm flex flex-col justify-between min-h-[360px] sm:min-h-[460px]">
              <div className="w-full h-full min-h-[300px] sm:min-h-[380px] rounded-2xl overflow-hidden relative border border-zinc-200">
                <iframe
                  title="Auto Sale Antwerpen Kaart"
                  src="https://maps.google.com/maps?q=Sint-Bernardsesteenweg+733,+2660+Antwerpen&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              {/* Bottom Quick Bar below the map */}
              <div className="pt-3 px-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <Compass className="w-4 h-4 text-[#FF6B00]" />
                  <span>GPS Coördinaten: 51.1824° N, 4.3732° E</span>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#FF6B00] hover:underline"
                >
                  <span>Grotere kaart bekijken</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right side (5 cols): Opening Hours, Full Address, Route & Facilities */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              
              {/* Address & Fast Navigation Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#1A1A1A] font-['Outfit',sans-serif]">
                      {DEALERSHIP_INFO.name} NV
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium leading-relaxed">
                      {street} <br />
                      2660 {city}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#FF6B00] text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-2xl transition-all shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{t.directions}</span>
                  </a>

                  <a
                    href={`tel:${phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 bg-[#F8F9FA] border border-zinc-200 hover:border-zinc-400 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-2xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{phone}</span>
                  </a>
                </div>
              </div>

              {/* Opening Hours Table */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm">
                <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FF6B00]" />
                    <span>{t.openingHoursTitle}</span>
                  </span>
                </h3>

                <div className="divide-y divide-zinc-100 text-xs">
                  <div className="py-2 flex justify-between items-center">
                    <span className="font-semibold text-gray-600">{t.monThu}</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="font-semibold text-gray-600">{t.friday}</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="font-semibold text-gray-600">{t.saturday}</span>
                  </div>
                  <div className="py-2 flex justify-between items-center">
                    <span className="font-semibold text-gray-600">{t.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Accessibility & Parking Info Card */}
              <div className="p-4 sm:p-5 rounded-3xl bg-[#141416] text-white border border-zinc-800 shadow-sm text-xs space-y-2">
                <div className="font-bold text-[11px] uppercase tracking-wider text-[#FF6B00] flex items-center gap-2">
                  <Car className="w-3.5 h-3.5" />
                  <span>{DEALERSHIP_INFO.name} Antwerpen</span>
                </div>
                <div className="text-gray-300 text-[11px] leading-relaxed">
                  {street}, 2660 {city}
                </div>
              </div>

            </div>
          </div>

          {/* 3. Direct Contact Form (Bento Layout, seamlessly connected to Dashboard Leads) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-sm mt-8">
            <div className="max-w-2xl mb-6">
              <h3 className="text-xl sm:text-3xl font-black text-[#1A1A1A] font-['Outfit',sans-serif] tracking-tight">
                {t.contactTitle}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                {t.contactSubtitle}
              </p>
            </div>

            {!contactSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      {t.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.name}
                      className="w-full bg-[#F8F9FA] border border-zinc-200 rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+32 4XX XX XX XX"
                      className="w-full bg-[#F8F9FA] border border-zinc-200 rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="info@..."
                      className="w-full bg-[#F8F9FA] border border-zinc-200 rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      {t.subject}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t.subject}
                      className="w-full bg-[#F8F9FA] border border-zinc-200 rounded-2xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    {t.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="..."
                    className="w-full bg-[#F8F9FA] border border-zinc-200 rounded-2xl p-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t.contactSubtitle}</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hallo%20Auto%20Sale%2C%20ik%20heb%20een%20vraag.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs tracking-wider py-3.5 px-5 rounded-2xl transition-all shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">{t.whatsappDirect}</span>
                      <span className="sm:hidden">WhatsApp</span>
                    </a>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold uppercase text-xs tracking-wider py-3.5 px-7 rounded-2xl shadow-md transition-all cursor-pointer flex-1 sm:flex-initial"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.sendMessage}</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black font-['Outfit',sans-serif] text-[#1A1A1A]">
                  {t.messageSent}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto font-medium">
                  {formData.name} - {formData.phone}
                </p>
                <button
                  onClick={() => setContactSent(false)}
                  className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-[#FF6B00] hover:underline cursor-pointer"
                >
                  {t.sendMessage}
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};
