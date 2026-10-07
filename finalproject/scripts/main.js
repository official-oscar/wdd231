const menu=document.getElementById('menu');
const nav=document.getElementById('navigation');
if(menu){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.classList.toggle('open');});}
const list=JSON.parse(localStorage.getItem('naijaWatchlist'))||[];
const countEl=document.getElementById('count');
if(countEl&&list.length) countEl.textContent=`(${list.length})`;