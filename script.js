const menu=document.querySelector('.menu');
const nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const yearButton=document.querySelector('.year-button');
const yearList=document.querySelector('.year-list');
yearButton.addEventListener('click',()=>{const open=yearButton.getAttribute('aria-expanded')==='true';yearButton.setAttribute('aria-expanded',String(!open));yearList.classList.toggle('open',!open)});
