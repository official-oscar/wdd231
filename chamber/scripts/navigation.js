const menuBtn = document.getElementById('menu-button') || document.getElementById('menu');
const nav = document.getElementById('navigation') || document.querySelector('.navigation');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    nav.classList.toggle('open');
  });
}