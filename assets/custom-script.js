const menuBtn = document.querySelector('.menu-item--nav');
const navPanel = document.querySelector('.nav-wrapper');
const navCloseBtn = document.querySelector('.nav-close-btn');
const filterBtn = document.querySelector('.filter-btn');
const filter = document.querySelector('.facets-wrap');

menuBtn.addEventListener('click', function() {
  navPanel.classList.add('active');
});

navCloseBtn.addEventListener('click', function() {
  navPanel.classList.remove('active');
});

filterBtn.addEventListener('click', function() {
  filter.classList.toggle('on');
});
