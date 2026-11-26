import { Car } from '../types';
import { DEALERSHIP_INFO } from '../data/dealership';

export function cleanWhatsAppNumber(whatsapp?: string): string {
  const raw = whatsapp || DEALERSHIP_INFO.contact.whatsapp || '+3236473339';
  const digits = raw.replace(/[^0-9]/g, '');
  return digits || '3236473339';
}

export function getTestDriveWhatsAppUrl(whatsapp?: string, car?: Car | null): string {
  const number = cleanWhatsAppNumber(whatsapp);
  const message = car
    ? `Hallo Auto Sale, ik wil graag een vrijblijvende proefrit aanvragen voor de ${car.brand} ${car.model} (${car.year}${car.carPassId ? ` - Ref: ${car.carPassId}` : ''}). Wanneer past het?`
    : 'Hallo Auto Sale, ik wil graag een vrijblijvende proefrit aanvragen in jullie showroom. Wanneer kan ik langskomen?';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getTradeInWhatsAppUrl(whatsapp?: string, car?: Car | null): string {
  const number = cleanWhatsAppNumber(whatsapp);
  const message = car
    ? `Hallo Auto Sale, ik heb interesse in de ${car.brand} ${car.model} (${car.year}) en wil graag mijn huidige wagen inruilen. Wat hebben jullie nodig voor een overnameprijs?`
    : 'Hallo Auto Sale, ik wil graag mijn auto verkopen of inruilen. Kunnen wij via WhatsApp een overnamevoorstel bespreken?';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppUrl(whatsapp?: string): string {
  const number = cleanWhatsAppNumber(whatsapp);
  return `https://wa.me/${number}?text=${encodeURIComponent('Hallo Auto Sale, ik heb een vraag.')}`;
}
