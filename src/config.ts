// Single source of truth for the Instagram ordering channel. Instagram has no
// equivalent of WhatsApp's wa.me?text= deep link — it will not accept a
// pre-filled message via URL. The workaround used across this site: copy the
// composed message to the clipboard, then open the DM thread, so the buyer
// just has to paste it.
export const INSTAGRAM_HANDLE = 'aarvika3d';
export const INSTAGRAM_DM_LINK = `https://ig.me/m/${INSTAGRAM_HANDLE}`;
export const INSTAGRAM_PROFILE_LINK = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export function productMessage(name: string, price: number): string {
  return `Hi Aarvika 3D — I'd like the ${name}, ₹${price.toLocaleString('en-IN')}. Could you confirm colour options?`;
}

export function customMessage(name: string, description: string, phone?: string): string {
  const nameLine = name ? `Name: ${name}. ` : '';
  const phoneLine = phone ? `Phone: ${phone}. ` : '';
  return `Hi Aarvika 3D — custom enquiry. ${nameLine}${phoneLine}${description}`;
}

// Client-side only: copies text to the clipboard, silently no-opping if the
// browser denies it (still lets the DM link open either way).
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Prefixes an internal path with the configured base (see astro.config.mjs).
// Needed because GitHub Pages serves this as a project site under /aarvika-3d/
// rather than at the domain root the real Cloudflare Pages deploy will use.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
