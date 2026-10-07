const gallery=document.getElementById('watchlistGallery');
const emptyMsg=document.getElementById('emptyMsg');
function load(){
  const list=JSON.parse(localStorage.getItem('naijaWatchlist'))||[];
  if(!list.length){emptyMsg.textContent='Your watchlist is empty. Go discover some hits!';gallery.innerHTML='';return;}
  emptyMsg.textContent='';gallery.innerHTML='';
  list.forEach(item=>{
    gallery.innerHTML+=`<div class="card"><img src="${item.artworkUrl100}" alt="${item.trackName}" width="100" height="100" loading="lazy"><h3>${item.trackName}</h3><p>${item.artistName}</p><button class="removeBtn cta" data-id="${item.trackId}">Remove</button></div>`;
  });
  document.querySelectorAll('.removeBtn').forEach(b=>b.addEventListener('click',()=>{let l=JSON.parse(localStorage.getItem('naijaWatchlist'))||[];l=l.filter(i=>i.trackId!=b.dataset.id);localStorage.setItem('naijaWatchlist',JSON.stringify(l));load();}));
}
document.getElementById('clearBtn').addEventListener('click',()=>{localStorage.removeItem('naijaWatchlist');load();});
const menu=document.getElementById('menu');const nav=document.getElementById('navigation');
if(menu){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.classList.toggle('open');});}
load();