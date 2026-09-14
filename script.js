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
