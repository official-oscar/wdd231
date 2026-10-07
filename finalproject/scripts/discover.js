const gallery=document.getElementById('gallery');
const modal=document.getElementById('detailModal');
const modalContent=document.getElementById('modalContent');
const search=document.getElementById('search');
let results=[];

async function fetchITunes(term){
  try{
    const res=await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=20&entity=song`);
    if(!res.ok) throw new Error('API failed');
    const data=await res.json();
    results=data.results;
    if(!results.length) throw new Error('No results');
    display(results);
  }catch(error){
    console.error('Fetch error:',error);
    gallery.innerHTML=`<p class="card">⚠️ Failed to load: ${error.message}. Try another artist.</p>`;
  }
}
function display(list){
  gallery.innerHTML='';
  list.forEach(item=>{
    gallery.innerHTML+=`<div class="card"><img src="${item.artworkUrl100.replace('100x100','300x300')}" alt="${item.trackName} by ${item.artistName}" width="300" height="300" loading="lazy"><h3>${item.trackName}</h3><p>${item.artistName}</p><p><small>${item.primaryGenreName} | ${new Date(item.releaseDate).getFullYear()}</small></p><button class="cta viewBtn" data-id="${item.trackId}">View</button><button class="saveBtn" data-id="${item.trackId}">❤️ Save</button></div>`;
  });
  document.querySelectorAll('.viewBtn').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.id)));
  document.querySelectorAll('.saveBtn').forEach(b=>b.addEventListener('click',()=>saveItem(b.dataset.id)));
}
function openModal(id){
  const item=results.find(r=>r.trackId==id);
  modalContent.innerHTML=`<img src="${item.artworkUrl100.replace('100x100','400x400')}" alt="${item.trackName}" width="400" height="400" style="width:100%;border-radius:8px"><h2>${item.trackName}</h2><p><strong>Artist:</strong> ${item.artistName}</p><p><strong>Album:</strong> ${item.collectionName}</p><p><strong>Genre:</strong> ${item.primaryGenreName}</p><p><strong>Release:</strong> ${new Date(item.releaseDate).toDateString()}</p><audio controls src="${item.previewUrl}" style="width:100%;margin-top:1rem"></audio><a href="${item.trackViewUrl}" target="_blank" class="cta" style="display:block;text-align:center;margin-top:1rem">View on iTunes</a>`;
  modal.showModal();
}
function saveItem(id){
  const item=results.find(r=>r.trackId==id);
  let list=JSON.parse(localStorage.getItem('naijaWatchlist'))||[];
  if(!list.find(i=>i.trackId==id)){list.push(item);localStorage.setItem('naijaWatchlist',JSON.stringify(list));alert(`${item.trackName} saved!`);updateCount();}
  else alert('Already in watchlist');
}
function updateCount(){const list=JSON.parse(localStorage.getItem('naijaWatchlist'))||[];const c=document.getElementById('count');if(c)c.textContent=list.length?`(${list.length})`:'';}
document.querySelectorAll('.filters button').forEach(btn=>{btn.addEventListener('click',e=>{document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');fetchITunes(e.target.dataset.term);});});
search.addEventListener('input',e=>{const f=results.filter(r=>r.trackName.toLowerCase().includes(e.target.value.toLowerCase())||r.artistName.toLowerCase().includes(e.target.value.toLowerCase()));display(f);});
document.getElementById('closeModal').addEventListener('click',()=>modal.close());
const menuBtn=document.getElementById('menu');const navEl=document.getElementById('navigation');
if(menuBtn){menuBtn.addEventListener('click',()=>{navEl.classList.toggle('open');menuBtn.classList.toggle('open');});}
fetchITunes('Burna Boy');updateCount();