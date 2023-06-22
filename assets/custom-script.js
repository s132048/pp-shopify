const menuBtn = document.querySelector('.menu-item--nav');
const navPanel = document.querySelector('.nav-wrapper');
const navCloseBtn = document.querySelector('.nav-close-btn');
const SearchCloseBtn = document.querySelector('.search-modal__close-button');
const SearchPanel = document.querySelector('.pp .search-modal');


menuBtn.addEventListener('click', function() {
  navPanel.classList.add('active');
});

navCloseBtn.addEventListener('click', function() {
  navPanel.classList.remove('active');
});

SearchCloseBtn.addEventListener('click', function() {
  SearchPanel.style.width = '100%';
  SearchPanel.style.height = '100%';
});