const menu=document.querySelector('.menu');
const nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const yearButton=document.querySelector('.year-button');
const yearList=document.querySelector('.year-list');
yearButton.addEventListener('click',()=>{const open=yearButton.getAttribute('aria-expanded')==='true';yearButton.setAttribute('aria-expanded',String(!open));yearList.classList.toggle('open',!open)});

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.origin-copy, .origin-photo, .year-title, .story-heading > div, .wide-photo, .story-grid article, .final-story, .more-stories, .partners > .eyebrow, .partners > h2, .partners-intro, .partner-grid > div, .contact > div');
let revealObserver;
function configureMotion() {
  revealObserver?.disconnect();
  revealTargets.forEach(element => element.classList.remove('reveal-pending'));
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
  revealTargets.forEach(element => {
    element.classList.add('reveal-item');
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('reveal-pending');
    revealObserver.observe(element);
  });
}
configureMotion();
motionPreference.addEventListener('change', configureMotion);
function closeNavigation() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  yearList.classList.remove('open');
  yearButton.setAttribute('aria-expanded', 'false');
}
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const focusTarget = yearList.classList.contains('open') ? yearButton : nav.classList.contains('open') ? menu : null;
  closeNavigation();
  focusTarget?.focus();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.topbar')) closeNavigation();
});

// Center the introduction in the clear area above the chess pieces.
const hero = document.querySelector('.hero-static');
const heroCopy = hero.querySelector('.hero-inner');
function positionHeroCopy() {
  heroCopy.querySelector('h1').style.removeProperty('font-size');
  hero.style.removeProperty('min-height');
  if (window.innerWidth <= 900) return;
  const art = hero.querySelector('.hero-static-art');
  // Preserve heading size; add room above the bottom-aligned chessboard.
  const sourceBottom = (941 - 610) / 941;
  const copyHeight = heroCopy.offsetHeight;
  const requiredHeight = Math.ceil(Math.max(
    copyHeight + 60 + (941 - 610) * art.clientWidth / 1672,
    (copyHeight + 60) / (1 - sourceBottom)
  ));
  hero.style.minHeight = requiredHeight + 'px';
  const scale = Math.max(art.clientWidth / 1672, art.clientHeight / 941);
  const knightTop = hero.clientHeight - (941 - 610) * scale;
  hero.style.setProperty('--hero-copy-top', Math.max(24, knightTop - copyHeight - 57) + 'px');
}

window.addEventListener('resize', positionHeroCopy);
document.fonts.ready.then(positionHeroCopy);

const storyDialog = document.querySelector('#story-dialog');
const storyForm = document.querySelector('#story-form');
const storyFormStatus = document.querySelector('#form-status');
const storyFormButton = document.querySelector('#open-story-form');
storyFormButton.addEventListener('click', () => storyDialog.showModal());
storyDialog.querySelector('.dialog-close').addEventListener('click', () => storyDialog.close());
storyDialog.addEventListener('click', event => {
  if (event.target !== storyDialog) return;
  const rect = storyDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) storyDialog.close();
});
storyDialog.addEventListener('close', () => storyFormButton.focus());
// Organizer-provided Formspree endpoint.
const storyFormEndpoint = 'https://formspree.io/f/mnppaolk';
storyForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!storyForm.reportValidity()) return;
  if (!storyFormEndpoint) {
    storyFormStatus.textContent = 'Надсилання форми ще не підключено. Зв’яжіться з нами за номером +380 99 967 88 31 або в Instagram @khid.geroya.';
    return;
  }
  const button = storyForm.querySelector('[type="submit"]');
  button.disabled = true;
  storyFormStatus.textContent = 'Надсилаємо…';
  try {
    const response = await fetch(storyFormEndpoint, { method: 'POST', body: new FormData(storyForm), headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Submission failed');
    storyFormStatus.textContent = 'Дякуємо. Вашу історію надіслано.';
    storyForm.reset();
  } catch {
    storyFormStatus.textContent = 'Не вдалося надіслати історію. Спробуйте ще раз або зв’яжіться з нами телефоном. Ваш текст залишився у формі.';
  } finally {
    button.disabled = false;
  }
});



const crewGallery = document.querySelector('.crew-gallery');
const crewCards = [...crewGallery.querySelectorAll('.crew-card')];
const crewPagination = document.createElement('div');
crewPagination.className = 'crew-pagination';
crewPagination.setAttribute('aria-label', 'Вибір портрета');
let crewIndex = 2;
const crewDots = crewCards.map((card, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'crew-dot';
  dot.setAttribute('aria-label', card.getAttribute('aria-label'));
  dot.addEventListener('click', () => showCrew(index));
  card.addEventListener('click', () => showCrew(index));
  crewPagination.append(dot);
  return dot;
});
crewGallery.after(crewPagination);
function showCrew(index) {
  crewIndex = (index + crewCards.length) % crewCards.length;
  crewCards.forEach((card, i) => {
    const slot = (i - crewIndex + 2 + crewCards.length) % crewCards.length;
    card.style.setProperty('--slot', slot);
    card.classList.toggle('is-active', i === crewIndex);
    card.setAttribute('aria-pressed', String(i === crewIndex));
    crewDots[i].setAttribute('aria-current', String(i === crewIndex));
  });
}
document.querySelector('.crew-prev').addEventListener('click', () => showCrew(crewIndex - 1));
document.querySelector('.crew-next').addEventListener('click', () => showCrew(crewIndex + 1));
crewGallery.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  showCrew(crewIndex + (event.key === 'ArrowRight' ? 1 : -1));
});
let crewTouchX = null;
crewGallery.addEventListener('touchstart', event => { crewTouchX = event.touches[0].clientX; }, { passive: true });
crewGallery.addEventListener('touchend', event => {
  if (crewTouchX === null) return;
  const delta = event.changedTouches[0].clientX - crewTouchX;
  if (Math.abs(delta) > 35) showCrew(crewIndex + (delta < 0 ? 1 : -1));
  crewTouchX = null;
}, { passive: true });
showCrew(crewIndex);
