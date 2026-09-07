const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('navigation');

hamburger.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamburger.textContent = navigation.classList.contains('open') ? 'X' : '☰';
});