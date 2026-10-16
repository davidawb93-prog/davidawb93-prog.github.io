document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
    link.closest('details')?.removeAttribute('open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.mobile-menu[open]').forEach((menu) => {
    menu.removeAttribute('open');
    menu.querySelector('summary').focus();
  });
});

// Keep the reader in the equivalent section when switching language.
document.querySelectorAll('.language-switch a').forEach((link) => {
  link.addEventListener('click', () => {
    const hash = window.location.hash;
    if (hash === '#content' || hash === '#innhold') {
      link.hash = link.lang === 'nb' ? '#innhold' : '#content';
    } else if (hash) {
      link.hash = hash;
    }
  });
});

document.querySelectorAll('.lite-youtube').forEach((player) => {
  const button = player.querySelector('.video-poster');
  if (!button) return;

  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${player.dataset.videoId}?autoplay=1&rel=0`;
    iframe.title = player.dataset.videoTitle || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    iframe.focus();
  }, { once: true });
});
