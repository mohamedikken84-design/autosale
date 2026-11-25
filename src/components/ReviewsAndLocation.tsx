import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  MessageCircle,
  Send,
  CheckCircle2,
  Navigation,
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
    message: '',
  });

  const phone = dealershipSettings?.phone || DEALERSHIP_INFO.contact.phone;
  const phoneRaw = dealershipSettings?.phoneRaw || DEALERSHIP_INFO.contact.phoneRaw;
  const whatsapp = dealershipSettings?.whatsapp || DEALERSHIP_INFO.contact.whatsapp;
  const street = dealershipSettings?.address || dealershipSettings?.street || DEALERSHIP_INFO.address.street;
  const zipCode = dealershipSettings?.zipCode || DEALERSHIP_INFO.address.postalCode;
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
    <div id="contact-container" className="bg-zinc-50 border-t border-zinc-200">
      {/* 1. Customer Reviews */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00] mb-1">
              {t.badge}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
              {t.title}
            </h2>
          </div>

          <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-xl border border-zinc-200 self-start md:self-auto">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-zinc-950 tabular-nums">4.9 / 5</span>
            <span className="text-xs text-zinc-500">· {t.score}</span>
          </div>
        </div>

        {/* Mobile horizontal swipe carousel / Desktop 4-col grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="min-w-[82vw] sm:min-w-0 snap-start bg-white rounded-2xl p-5 border border-zinc-200 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-zinc-400">{rev.source}</span>
                </div>

                {rev.carPurchased && (
                  <div className="text-xs font-semibold text-[#FF6B00] line-clamp-1">
                    {rev.carPurchased}
                  </div>
                )}

                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-4">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-zinc-950">{rev.author}</div>
                  <div className="text-[11px] text-zinc-400">{rev.date}</div>
                </div>
                {rev.verified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Showroom Location & Contact Form */}
      <section id="contact" className="py-10 sm:py-16 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00] mb-1">
              Showroom Antwerpen
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-['Outfit',sans-serif] tracking-tight">
              {t.contactTitle}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">{t.contactSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Map */}
            <div className="lg:col-span-7 bg-zinc-50 rounded-2xl p-3 border border-zinc-200 flex flex-col justify-between min-h-[280px] sm:min-h-[340px]">
              <div className="w-full flex-1 min-h-[230px] sm:min-h-[280px] rounded-xl overflow-hidden relative border border-zinc-200">
                <iframe
                  title="Auto Sale Antwerpen Kaart"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${street}, ${zipCode} ${city}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 absolute inset-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="pt-3 px-1 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600">
                <span>{street}, {zipCode} {city}</span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#FF6B00] hover:underline whitespace-nowrap"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Address & Opening Hours */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-zinc-950 font-['Outfit',sans-serif]">
                      {dealershipSettings?.name || DEALERSHIP_INFO.name} NV
                    </h3>
                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      {street}<br />
                      {zipCode} {city}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-[#FF6B00] text-white text-xs font-bold py-3 px-4 rounded-xl transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{t.directions}</span>
                  </a>

                  <a
                    href={`tel:${phoneRaw}`}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-950 text-xs font-bold py-3 px-4 rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>{phone}</span>
                  </a>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex-1">
                <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-700 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF6B00]" />
                  <span>{t.openingHoursTitle}</span>
                </h3>

                <div className="divide-y divide-zinc-200 text-xs text-zinc-700">
                  <div className="py-2.5">{t.monThu}</div>
                  <div className="py-2.5">{t.friday}</div>
                  <div className="py-2.5">{t.saturday}</div>
                  <div className="py-2.5 text-zinc-500">{t.sunday}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Contact Form */}
          <div className="bg-zinc-50 rounded-2xl p-5 sm:p-8 border border-zinc-200">
            {!contactSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {t.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.name}
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+32 4XX XX XX XX"
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="naam@email.be"
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      {t.subject}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t.subject}
                      className="w-full min-h-[44px] bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    {t.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.message}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-3.5 text-base sm:text-sm focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-end gap-2.5 sm:gap-3 pt-1">
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=Hallo%20Auto%20Sale%2C%20ik%20heb%20een%20vraag.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-5 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.whatsappDirect}</span>
                  </a>

                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.sendMessage}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-bold font-['Outfit',sans-serif] text-zinc-950">
                  {t.messageSent}
                </h4>
                <button
                  type="button"
                  onClick={() => setContactSent(false)}
                  className="text-xs font-bold text-[#FF6B00] hover:underline cursor-pointer"
                >
                  Nieuw bericht sturen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
