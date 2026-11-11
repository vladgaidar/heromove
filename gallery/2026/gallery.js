const grid=document.querySelector('#photos'), viewer=document.querySelector('dialog');
let current=0;
function select(index){
  current=(index+albumPhotos.length)%albumPhotos.length;
  const photo=albumPhotos[current];
  const download=document.querySelector('#download-photo');
  download.href=photo.src; download.download=photo.src.split('/').pop();
  full.src=photo.src;full.alt=photo.alt||('Фото з турніру '+(current+1));
  count.textContent=(current+1)+' / '+albumPhotos.length;
}
const full=document.querySelector('#full'),count=document.querySelector('#count');
albumPhotos.forEach((photo,i)=>{
 const btn=document.createElement('button'),img=document.createElement('img');
 img.width=photo.width;img.height=photo.height;img.src=photo.thumb||photo.src;img.alt=photo.alt||('Фото з турніру '+(i+1));img.loading='lazy';
 btn.append(img);grid.append(btn);btn.onclick=()=>{select(i);viewer.showModal()};
});
document.querySelector('#notice').hidden=albumPhotos.length>0;
document.querySelector('#close').onclick=()=>viewer.close();
document.querySelector('#prev').onclick=()=>select(current-1);
document.querySelector('#next').onclick=()=>select(current+1);
viewer.onkeydown=e=>{if(e.key==='ArrowLeft')select(current-1);if(e.key==='ArrowRight')select(current+1)};
const expand=document.querySelector('#expand');
function expanded(on){
  viewer.classList.toggle('expanded',on);
  expand.setAttribute('aria-pressed',String(on));
  expand.textContent=on?'Згорнути':'На весь екран';
}
expand.onclick=async()=>{
  const on=!viewer.classList.contains('expanded');
  expanded(on);
  try {
    if(on && document.fullscreenEnabled) await document.documentElement.requestFullscreen();
    else if(!on && document.fullscreenElement) await document.exitFullscreen();
  } catch { /* Keep the viewport-filling layout when browser fullscreen is unavailable. */ }
};
document.addEventListener('fullscreenchange',()=>expanded(Boolean(document.fullscreenElement)));
viewer.addEventListener('close',()=>{expanded(false);if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});});
const save=document.querySelector('#download-photo');
save.onclick=async event=>{
  if(location.protocol==='file:') return; // Local preview uses the native download link.
  event.preventDefault();
  const url=save.href, filename=save.download;
  try {
    const response=await fetch(url);
    if(!response.ok)throw Error();
    const blobUrl=URL.createObjectURL(await response.blob());
    const link=document.createElement('a');link.href=blobUrl;link.download=filename;
    document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(blobUrl),60000);
  } catch {count.textContent='Не вдалося завантажити фото. Спробуйте ще раз.';}
};

// The original ZIP is uploaded to the web host separately from Git.
const originals=document.querySelector('#originals');
if(location.protocol==='file:') originals.hidden=false;
else fetch(originals.href,{method:'HEAD'}).then(response=>{
  if(response.ok && !response.headers.get('content-type')?.includes('text/html')) originals.hidden=false;
}).catch(()=>{});
