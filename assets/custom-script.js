const menuBtn = document.querySelector('.menu-item--nav');
const navPanel = document.querySelector('.nav-wrapper');
const navCloseBtn = document.querySelector('.nav-close-btn');

menuBtn.addEventListener('click', function() {
  navPanel.classList.add('active');
});

navCloseBtn.addEventListener('click', function() {
  navPanel.classList.remove('active');
});
