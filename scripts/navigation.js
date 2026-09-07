const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('navigation');

hamburger.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamburger.classList.toggle('open');
});