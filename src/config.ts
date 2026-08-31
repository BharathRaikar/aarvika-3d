// Single source of truth for the WhatsApp number. PLACEHOLDER — not real, gets
// replaced before launch. Never hardcode the number anywhere else.
export const WHATSAPP = '918050XXXXXX';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

export function productMessage(name: string, price: number): string {
  return `Hi Aarvika 3D — I'd like the ${name}, ₹${price.toLocaleString('en-IN')}. Could you confirm colour options?`;
}

export function customMessage(name: string, description: string): string {
  return `Hi Aarvika 3D — custom enquiry. ${name ? `Name: ${name}. ` : ''}${description}`;
}

// Prefixes an internal path with the configured base (see astro.config.mjs).
// Needed because GitHub Pages serves this as a project site under /aarvika-3d/
// rather than at the domain root the real Cloudflare Pages deploy will use.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
