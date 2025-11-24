// script.js — handles nav active state and video modal open/close

document.addEventListener('DOMContentLoaded', function () {
  // NAV: Detect current page using meta[name="page-name"] or URL and set .active
  const navButtons = document.querySelectorAll('.nav-btn');
  const pageMeta = document.querySelector('meta[name="page-name"]');
  const currentPage = pageMeta ? pageMeta.getAttribute('content') : (location.pathname.split('/').pop().split('.')[0] || 'home');

  navButtons.forEach(btn => {
    const target = btn.dataset.target;
    if (target === currentPage || (target === 'home' && currentPage === '')) {
      btn.classList.add('active');
    }
    // clicking a nav button will navigate via its href; still apply active style instantly for UX
    btn.addEventListener('click', () => {
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // VIDEO MODAL
  const playBtn = document.getElementById('playBtn');
  const modal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const introVideo = document.getElementById('introVideo');

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    // Do not autoplay; user will upload video and can control playback
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    try {
      introVideo.pause();
      introVideo.currentTime = 0;
    } catch (e) {}
  }

  playBtn && playBtn.addEventListener('click', openModal);
  modalClose && modalClose.addEventListener('click', closeModal);
  modalBackdrop && modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  
});
