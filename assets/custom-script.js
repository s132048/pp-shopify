const menuBtn = document.querySelector('.menu-item--nav');
const navPanel = document.querySelector('.nav-wrapper');
const navCloseBtn = document.querySelector('.nav-close-btn');
const searchCloseBtn = document.querySelector('.search-modal__close-button');
const searchPanel = document.querySelector('.pp .search-modal');


menuBtn.addEventListener('click', function () {
    navPanel.classList.add('active');
});

navCloseBtn.addEventListener('click', function () {
    navPanel.classList.remove('active');
});

searchCloseBtn.addEventListener('click', function () {
    searchPanel.style.width = '100%';
    searchPanel.style.height = '100%';
});

$('.size-title').on('click', function () {
    $(this).toggleClass('on');
    $('.size-table').slideToggle(250);
});

// $('.search__input').on('keyup', function () {
//     let thisVal = $(this).val();
//     if (thisVal != '') {
//         $('#view-all-btn').show();
//
//         const chk = setTimeout(function () {
//             if ($('.snize-results-html').hasClass('snize-hidden')) {
//                 $('#view-all-btn').hide();
//             }
//         }, 500);
//     }else{
//       $('#view-all-btn').hide();
//     }
// });
//
// $('#view-all-btn').on('click', function (){
//     let keyword = $('.search__input').val();
//
//     console.log(keyword);
// });