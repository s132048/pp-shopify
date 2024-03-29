class PredictiveSearch extends HTMLElement {
    
  constructor() {
    super();
    this.cachedResults = {};
    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector('[data-predictive-search]');
    this.isOpen = false;

    this.setupEventListeners();
    this.addBodyClassOnInputChange();
  }

  setupEventListeners() {
    const form = this.querySelector('form.search');
    form.addEventListener('submit', this.onFormSubmit.bind(this));

    this.input.addEventListener('input', debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
    this.input.addEventListener('focus', this.onFocus.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.addEventListener('keyup', this.onKeyup.bind(this));
    this.addEventListener('keydown', this.onKeydown.bind(this));
  }

  getQuery() {
    return this.input.value.trim();
  }

  onChange() {
    const searchTerm = this.getQuery();

    if (!searchTerm.length) {
      this.close(true);
      return;
    }

    this.getSearchResults(searchTerm);
  }

  onFormSubmit(event) {
    if (!this.getQuery().length || this.querySelector('[aria-selected="true"] a')) event.preventDefault();
  }

  onFocus() {
    const searchTerm = this.getQuery();

    if (!searchTerm.length) return;

    if (this.getAttribute('results') === 'true') {
      this.open();
    } else {
      this.getSearchResults(searchTerm);
    }
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  onKeyup(event) {
    if (!this.getQuery().length) this.close(true);
    event.preventDefault();

    switch (event.code) {
      case 'ArrowUp':
        this.switchOption('up')
        break;
      case 'ArrowDown':
        this.switchOption('down');
        break;
      case 'Enter':
        this.selectOption();
        break;
    }
  }

  onKeydown(event) {
    // Prevent the cursor from moving in the input when using the up and down arrow keys
    if (
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  }

  switchOption(direction) {
    if (!this.getAttribute('open')) return;

    const moveUp = direction === 'up';
    const selectedElement = this.querySelector('[aria-selected="true"]');
    const allElements = this.querySelectorAll('li');
    let activeElement = this.querySelector('li');

    if (moveUp && !selectedElement) return;

    this.statusElement.textContent = '';

    if (!moveUp && selectedElement) {
      activeElement = selectedElement.nextElementSibling || allElements[0];
    } else if (moveUp) {
      activeElement = selectedElement.previousElementSibling || allElements[allElements.length - 1];
    }

    if (activeElement === selectedElement) return;

    activeElement.setAttribute('aria-selected', true);
    if (selectedElement) selectedElement.setAttribute('aria-selected', false);

    this.setLiveRegionText(activeElement.textContent);
    this.input.setAttribute('aria-activedescendant', activeElement.id);
  }

  selectOption() {
    const selectedProduct = this.querySelector('[aria-selected="true"] a, [aria-selected="true"] button');

    if (selectedProduct) selectedProduct.click();
  }

  getSearchResults(searchTerm) {
    const queryKey = searchTerm.replace(" ", "-").toLowerCase();
    this.setLiveRegionLoadingState();

    if (this.cachedResults[queryKey]) {
      this.renderSearchResults(this.cachedResults[queryKey]);
      return;
    }

    fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&${encodeURIComponent('resources[type]')}=product&${encodeURIComponent('resources[limit]')}=4&section_id=predictive-search`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
        this.cachedResults[queryKey] = resultsMarkup;
        this.renderSearchResults(resultsMarkup);
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  setLiveRegionLoadingState() {
    // this.statusElement = this.statusElement || this.querySelector('.predictive-search-status');
    // this.loadingText = this.loadingText || this.getAttribute('data-loading-text');

    // this.setLiveRegionText(this.loadingText);
    // this.setAttribute('loading', true);
  }

  setLiveRegionText(statusText) {
    this.statusElement.setAttribute('aria-hidden', 'false');
    this.statusElement.textContent = statusText;

    setTimeout(() => {
      this.statusElement.setAttribute('aria-hidden', 'true');
    }, 1000);
  }

  renderSearchResults(resultsMarkup) {
    this.predictiveSearchResults.innerHTML = resultsMarkup;
    this.setAttribute('results', true);

    this.setLiveRegionResults();
    this.open();
  }

  setLiveRegionResults() {
    this.removeAttribute('loading');
    this.setLiveRegionText(this.querySelector('[data-predictive-search-live-region-count-value]').textContent);
  }

  getResultsMaxHeight() {
    this.resultsMaxHeight = window.innerHeight - document.getElementById('shopify-section-header').getBoundingClientRect().bottom;
    return this.resultsMaxHeight;
  }

  open() {
    this.predictiveSearchResults.style.maxHeight = this.resultsMaxHeight || `${this.getResultsMaxHeight()}px`;
    this.setAttribute('open', true);
    this.input.setAttribute('aria-expanded', true);
    this.isOpen = true;
  }

  close(clearSearchTerm = false) {
    if (clearSearchTerm) {
      this.input.value = '';
      this.removeAttribute('results');
    }

    const selected = this.querySelector('[aria-selected="true"]');

    if (selected) selected.setAttribute('aria-selected', false);

    this.input.setAttribute('aria-activedescendant', '');
    this.removeAttribute('open');
    this.input.setAttribute('aria-expanded', false);
    this.resultsMaxHeight = false
    this.predictiveSearchResults.removeAttribute('style');

    this.isOpen = false;
  }

  addBodyClassOnInputChange() {
    var inputElement = this.input;
    

    inputElement.addEventListener('input', function() {
      var bodyElement = document.body;
      // if (window.innerWidth <= 768 && !bodyElement.classList.contains('snize-instant-widget-is-open')) {
      //   bodyElement.classList.add('snize-instant-widget-is-open');
      // }
    });
  }
}

customElements.define('predictive-search', PredictiveSearch);

// let mobileSearchMenuTitles = document.querySelectorAll('.mobile-search-menu-title');
// let searchMenuItems = document.querySelectorAll('.search-menu-item-list');
//
// mobileSearchMenuTitles.forEach((title) => {
//   title.addEventListener('click', () => {
//     let dataIndex = title.getAttribute('data-title-index');
//     let searchMenuList = document.querySelector(`[data-list-index="${dataIndex}"]`);
//     let isOpen = searchMenuList.getAttribute('data-status') === 'open';
//
//     searchMenuItems.forEach((menuItem) => {
//       if (menuItem !== searchMenuList) {
//         menuItem.setAttribute('data-status', 'close');
//       }
//     });
//
//     if (isOpen) {
//       searchMenuList.setAttribute('data-status', 'close');
//     } else {
//       searchMenuList.setAttribute('data-status', 'open');
//     }
//
//     let openButton = title.querySelector('.open-list');
//     let closeButton = title.querySelector('.close-list');
//
//     if (isOpen) {
//       openButton.classList.remove('hide');
//       closeButton.classList.add('hide');
//     } else {
//       openButton.classList.add('hide');
//       closeButton.classList.remove('hide');
//     }
//
//     // Remove 'hide' class from other title buttons
//     mobileSearchMenuTitles.forEach((otherTitle) => {
//       if (otherTitle !== title) {
//         let otherOpenButton = otherTitle.querySelector('.open-list');
//         let otherCloseButton = otherTitle.querySelector('.close-list');
//         otherOpenButton.classList.remove('hide');
//         otherCloseButton.classList.add('hide');
//       }
//     });
//   });
// });

$(document).ready(function() {
  checkWindowSize();

  $(window).resize(function() {
    checkWindowSize();
  });
});

function checkWindowSize() {
  if ($(window).width() <= 1024) {
    $('.mobile-search-menu-title').off('click').on('click', function(){
      $(this).toggleClass('chk');
      if($(this).hasClass('chk')){
        $('.mobile-search-menu-title').not(this).find('.open-list').removeClass('hide');
        $('.mobile-search-menu-title').not(this).find('.close-list').addClass('hide');
        $(this).find('.open-list').addClass('hide');
        $(this).find('.close-list').removeClass('hide');
        $('.mobile-search-menu-title').not(this).siblings('.search-menu-item-list').slideUp(300);
        $(this).siblings('.search-menu-item-list').slideDown(300);
      }else{
        $('.mobile-search-menu-title').removeClass('chk');
        $('.mobile-search-menu-title').find('.open-list').removeClass('hide');
        $('.mobile-search-menu-title').find('.close-list').addClass('hide');
        $('.mobile-search-menu-title').siblings('.search-menu-item-list').slideUp(300);
      }
    });
  }
}