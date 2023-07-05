const menuBtn = document.querySelector('.menu-item--nav');
const navPanel = document.querySelector('.nav-wrapper');
const navCloseBtn = document.querySelector('.nav-close-btn');
const searchCloseBtn = document.querySelector('.search-modal__close-button');
const searchPanel = document.querySelector('.pp .search-modal');

function setSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('load', () => {
    setSize();
});

window.addEventListener('resize', () => {
    setSize();
});

menuBtn.addEventListener('click', function () {
    navPanel.classList.add('active');
    document.querySelector('body').classList.add('ps');
});

navCloseBtn.addEventListener('click', function () {
    navPanel.classList.add('off');
    const chk = setTimeout(function () {
        navPanel.classList.remove('active');
        navPanel.classList.remove('off');
    }, 500);

    document.querySelector('body').classList.remove('ps');
});

searchCloseBtn.addEventListener('click', function () {
    searchPanel.style.width = '100%';
    searchPanel.style.height = '100%';
    $('.search__input').val('');
});

$('.size-title').on('click', function () {
    $(this).toggleClass('on');
    $('.size-table').slideToggle(250);
});

$('.search__input').on('keyup', function () {
    let thisVal = $(this).val();
    if (thisVal != '') {
        $('#view-all-btn').show();

        const chk = setTimeout(function () {
            if ($('.snize-results-html').hasClass('snize-hidden')) {
                $('#view-all-btn').hide();
            }
        }, 500);
    }else{
      $('#view-all-btn').hide();
    }
});

// $('.snize-input-style').on('keyup', function () {
//     let thisVal = $(this).val();
//     // if (thisVal != '') {
//     //     $('#view-all-btn').show();
//     //
//     //     const chk = setTimeout(function () {
//     //         if ($('.snize-results-html').hasClass('snize-hidden')) {
//     //             $('#view-all-btn').hide();
//     //         }
//     //     }, 500);
//     // }else{
//     //     $('#view-all-btn').hide();
//     // }
//
//     console.log('a');
// });

$('#view-all-btn').on('click', function (){
    let keyword = $('.search__input').val();
    window.location.href = `/pages/search-results-page?q=${keyword}`;
});

$('.modal__toggle').on('click', function () {
    $('.search__input').val('');
    $('#view-all-btn').hide();
});