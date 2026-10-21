// Client-side only: a single floating toast, reused across calls. Created on
// first use so pages that never trigger it carry no extra markup.
let toastEl: HTMLDivElement | null = null;
let hideTimer: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string, duration = 3500): void {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    toastEl.className =
      'pointer-events-none fixed inset-x-4 bottom-6 z-50 mx-auto w-fit max-w-md rounded-2xl border border-line-2 bg-ink-3/95 px-5 py-3 text-center text-sm text-bone shadow-2xl shadow-black/50 backdrop-blur transition-all duration-300 translate-y-4 opacity-0';
    document.body.appendChild(toastEl);
  }

  toastEl.textContent = message;
  // Force a reflow so re-showing an already-visible toast still animates in.
  void toastEl.offsetWidth;
  toastEl.classList.remove('translate-y-4', 'opacity-0');

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    toastEl?.classList.add('translate-y-4', 'opacity-0');
  }, duration);
}

export const IG_COPIED_TOAST = '✓ Message copied to clipboard! Paste it into the chat that just opened.';
