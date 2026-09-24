// Timestamp
document.getElementById('timestamp').value = new Date().toLocaleString();

// Modal handling
const modals = {
  'btn-np': 'modal-np',
  'btn-bronze': 'modal-bronze',
  'btn-silver': 'modal-silver',
  'btn-gold': 'modal-gold'
};

Object.keys(modals).forEach(btnId => {
  document.getElementById(btnId).addEventListener('click', () => {
    document.getElementById(modals[btnId]).showModal();
  });
});

document.querySelectorAll('dialog .close').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('dialog').close());
});

const menuBtn = document.getElementById('menu');
const nav = document.querySelector('.navigation');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  nav.classList.toggle('open');
});