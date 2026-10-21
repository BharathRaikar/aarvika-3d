import { INSTAGRAM_DM_LINK } from '../config';

// Client-side only: drives the #ig-modal dialog rendered by
// InstagramModal.astro (included once in Layout.astro).
const AUTO_OPEN_SECONDS = 2;

let timer: ReturnType<typeof setInterval> | undefined;
let wired = false;

function stopCountdown() {
  clearInterval(timer);
  timer = undefined;
}

export function openInstagramHandoff(message: string, copied: boolean): void {
  const dialog = document.getElementById('ig-modal') as HTMLDialogElement | null;
  if (!dialog) {
    window.open(INSTAGRAM_DM_LINK, '_blank', 'noopener,noreferrer');
    return;
  }
  const status = document.getElementById('ig-modal-status')!;
  const preview = document.getElementById('ig-modal-preview')!;
  const countdown = document.getElementById('ig-modal-countdown')!;
  const openLink = document.getElementById('ig-modal-open')!;

  if (!wired) {
    wired = true;
    dialog.querySelector('[data-ig-close]')?.addEventListener('click', () => dialog.close());
    // Clicking the backdrop (the dialog element itself, outside the panel) closes it.
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', stopCountdown);
    openLink.addEventListener('click', () => {
      stopCountdown();
      countdown.textContent = 'Instagram opened in a new tab';
    });
  }

  preview.textContent = message;
  stopCountdown();

  if (copied) {
    status.textContent = '✓ Order message copied to clipboard';
    let remaining = AUTO_OPEN_SECONDS;
    countdown.textContent = `Opening Instagram in ${remaining}s...`;
    timer = setInterval(() => {
      remaining -= 1;
      if (remaining > 0) {
        countdown.textContent = `Opening Instagram in ${remaining}s...`;
        return;
      }
      stopCountdown();
      // Delayed opens are often blocked (no user gesture any more), so fall
      // back to asking for a tap on the button.
      // (No 'noopener' feature here: it makes window.open always return null,
      // which would hide whether the popup was blocked. Cut the opener instead.)
      const win = window.open(INSTAGRAM_DM_LINK, '_blank');
      if (win) win.opener = null;
      countdown.textContent = win
        ? 'Instagram opened in a new tab'
        : 'Tap the button below to open Instagram';
    }, 1000);
  } else {
    // Clipboard denied: don't auto-open, the buyer needs to copy by hand first.
    status.textContent = 'Copy the message below first';
    countdown.textContent = 'Press and hold the message to copy it, then open Instagram';
  }

  if (!dialog.open) dialog.showModal();
}
