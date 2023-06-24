const menuBtn = document.querySelector('.menu-item--nav');
const navPanel = document.querySelector('.nav-wrapper');
const navCloseBtn = document.querySelector('.nav-close-btn');
const searchCloseBtn = document.querySelector('.search-modal__close-button');
const searchPanel = document.querySelector('.pp .search-modal');


menuBtn.addEventListener('click', function() {
  navPanel.classList.add('active');
});

navCloseBtn.addEventListener('click', function() {
  navPanel.classList.remove('active');
});

searchCloseBtn.addEventListener('click', function() {
  searchPanel.style.width = '100%';
  searchPanel.style.height = '100%';
});

$('.size-title').on('click', function (){
  $(this).toggleClass('on');
  $('.size-table').slideToggle(250);
});