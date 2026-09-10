const menu=document.querySelector('.menu');
const nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const yearButton=document.querySelector('.year-button');
const yearList=document.querySelector('.year-list');
yearButton.addEventListener('click',()=>{const open=yearButton.getAttribute('aria-expanded')==='true';yearButton.setAttribute('aria-expanded',String(!open));yearList.classList.toggle('open',!open)});

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.origin-copy, .origin-photo, .year-title, .story-heading > div, .wide-photo, .story-grid article, .final-story, .more-stories, .partners > .eyebrow, .partners > h2, .partners-intro, .partner-grid > div, .contact > div, footer nav, footer > span');
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


// Animate the complete brand lockup once, without separating symbol and lettering.
const footerBrand = document.querySelector('.footer-brand');
if (footerBrand && 'IntersectionObserver' in window) {
  const logoObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    if (!motionPreference.matches) footerBrand.classList.add('logo-arriving');
    logoObserver.disconnect();
  }, { threshold: 0.35 });
  logoObserver.observe(footerBrand);
}


// Decode all layers before starting a synchronized cycle; pause offscreen.
const chessScene = document.querySelector('.hero-scene');
const sceneToggle = document.querySelector('.scene-toggle');
if (chessScene) {
  let sceneVisible = false;
  let manuallyPaused = false;
  let layersReady = false;
  const syncScene = () => {
    if (!layersReady) return;
    chessScene.classList.add('scene-ready');
    chessScene.classList.toggle('scene-playing', !motionPreference.matches);
    chessScene.classList.toggle('scene-paused', manuallyPaused || !sceneVisible || document.hidden);
    if (sceneToggle) {
      sceneToggle.hidden = motionPreference.matches;
      sceneToggle.setAttribute('aria-pressed', String(manuallyPaused));
      sceneToggle.textContent = manuallyPaused ? 'Продовжити анімацію' : 'Пауза анімації';
    }
  };
  sceneToggle?.addEventListener('click', () => { manuallyPaused = !manuallyPaused; syncScene(); });
  motionPreference.addEventListener('change', syncScene);
  document.addEventListener('visibilitychange', syncScene);
  const layerUrls = ['assets/animation/hand-grip-pixel.png', 'assets/animation/hand-release-pixel.png', 'assets/animation/pawn.png', 'assets/animation/queen.png'];
  Promise.all(layerUrls.map(src => {
    const img = new Image(); img.src = src; return img.decode();
  })).then(() => {
    layersReady = true;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        sceneVisible = entries.some(entry => entry.isIntersecting);
        syncScene();
      }, { threshold: 0 });
      observer.observe(chessScene);
    } else { sceneVisible = true; syncScene(); }
  }).catch(() => { /* Retain the approved static illustration if a layer fails. */ });
}
