window.addEventListener('load', () => {
  const scrollMainBtnUp = document.querySelector('.vacancies__main-scroll-btn--up');
  const scrollMainBtnDown = document.querySelector('.vacancies__main-scroll-btn--down');
  const vacanciesMainSimplebarElement = document.querySelector('.__js_vacancies-main-simplebar');
  const vacanciesList = document.querySelector('.vacancies__list');
  const vacancyPreviewItems = vacanciesList.children;//document.querySelectorAll('.vacancy-preview');
  const vacanciesMenu = document.querySelector('.vacancies__menu');
  const vacanciesMain = document.querySelector('.vacancies__main');

  const vacanciesMainSimplebar = new SimpleBar(vacanciesMainSimplebarElement);

  const scrollElement = vacanciesMainSimplebar.getScrollElement();
  const scrolledElement = scrollElement.firstElementChild;

  let vacancyPreviewRect, scrolledElementRect, vacanciesListHeight, lineHeight, 
  vacancyPreviewItemsInLineCount, lineCount, lineGap, scrollSize, endPointScroll = null;

  let lineMarginTop = null;

    // Фильтрация при загрузке страницы
  const targetCategory = document.querySelector('.vacancies__menu-item--current').firstElementChild.dataset.target;
  vacancyPreviewItems.forEach(it => {
    it.style.display = it.dataset.category === targetCategory ? 'block' : 'none';
  });
  let visibleVacancyPreviewItems = null;

  const isNoEmpty = Array.from(vacancyPreviewItems).some(it => it.style.display === 'block');

//////////////////////

  /*let vacancyPreviewRect = vacancyPreviewItems[0].getBoundingClientRect();
  let scrolledElementRect = scrolledElement.getBoundingClientRect();
  let vacanciesListHeight = vacanciesList.getBoundingClientRect().height;

  let lineHeight = vacancyPreviewRect.height;
  let vacancyPreviewItemsInLineCount = Math.floor(scrolledElementRect.width / vacancyPreviewRect.width);
  let lineCount = Math.ceil(vacancyPreviewItems.length / vacancyPreviewItemsInLineCount)
  let lineGap = (vacanciesListHeight - (lineCount * Math.floor(vacancyPreviewRect.height))) / lineCount;

  let scrollSize = lineHeight + lineGap;
  let endPointScroll = Math.floor(scrolledElementRect.height) - scrollElement.offsetHeight;*/

  const refreshVars = () => {
    visibleVacancyPreviewItems = Array.from(vacancyPreviewItems).filter(it => it.style.display === 'block');

    if (visibleVacancyPreviewItems.length) {
      vacancyPreviewRect = visibleVacancyPreviewItems[0].getBoundingClientRect();
      scrolledElementRect = scrolledElement.getBoundingClientRect();
      vacanciesListHeight = vacanciesList.getBoundingClientRect().height;

      lineHeight = vacancyPreviewRect.height;
      vacancyPreviewItemsInLineCount = Math.floor(scrolledElementRect.width / vacancyPreviewRect.width);

      lineCount = Math.ceil(visibleVacancyPreviewItems.length / vacancyPreviewItemsInLineCount);
      lineGap = (vacanciesListHeight - (lineCount * Math.floor(vacancyPreviewRect.height))) / lineCount;
      //console.log('refresh lineHeight and lineGap: ' + lineHeight + ' ' + lineGap);
      scrollSize = lineHeight + lineGap;
      endPointScroll = Math.floor(scrolledElementRect.height) - scrollElement.offsetHeight;
    } 
  };

  const checkMainScrollNeed = () => {
    if (scrollElement.scrollTop >= endPointScroll) {
      
      scrollMainBtnDown.classList.add('scroll-btn--inactive');
    } else {
      scrollMainBtnDown.classList.remove('scroll-btn--inactive');
    }

    if (scrollElement.scrollTop === 0) {
      scrollMainBtnUp.classList.add('scroll-btn--inactive');
    } else {
      scrollMainBtnUp.classList.remove('scroll-btn--inactive');
    }
    
    if (endPointScroll <= 0) {
      scrollMainBtnUp.classList.add('scroll-btn--inactive');
      scrollMainBtnDown.classList.add('scroll-btn--inactive');
    }
    //console.log(scrollElement.offsetHeight, scrolledElement.offsetHeight)
  };

  const scrollMain = (direction = 1) => {
    const currentScroll = scrollElement.scrollTop;
    const remnant = currentScroll % scrollSize;

    const scrollValue = remnant === 0 ? scrollSize : (direction === 1 ? scrollSize - remnant : remnant);

    scrollElement.scrollBy({
      top: scrollValue * direction,
      left: 0,
      behavior: 'smooth'
    });

    //console.log('click scrollSize: ' + scrollSize);
  };

  if (isNoEmpty) {
    refreshVars();
    checkMainScrollNeed();
  }

  scrollMainBtnUp.onclick = () => {
    scrollMain(-1);
  };

  scrollMainBtnDown.onclick = () => {
    scrollMain(1);
  };

  vacanciesMainSimplebar.getScrollElement().addEventListener('scroll', () => {
    checkMainScrollNeed();
  });

  //////////// Фильтрация
  /*const filterVacancies = (target) => {
    vacanciesMain.classList.add('animate');
    vacanciesMain.classList.add('hidden');

    vacanciesMain.ontransitionend = () => {
      vacanciesMain.ontransitionend = null;
      vacanciesMain.classList.remove('animate');

      vacancyPreviewItems.forEach(it => {
        it.style.display = it.dataset.category === target ? 'block' : 'none';
      });
      
      scrollElement.scrollTop = 0;

      vacanciesMain.classList.add('animate');
      vacanciesMain.classList.remove('hidden');
        
      vacanciesMain.ontransitionend = () => {
        vacanciesMain.ontransitionend = null;
        vacanciesMain.classList.remove('animate');
        refreshVars();
        checkMainScrollNeed();
      };
    }
  };*/

  /*vacanciesMenu.onclick = (e) => {
    const target = e.target.closest('.vacancies__menu-item:not(.vacancies__menu-item--current)');

    if (target) {
      e.preventDefault();
      const vacancyDetail = document.querySelector('.vacancy-detail');

      if (vacancyDetail && vacancyDetail.classList.contains('opened')) {
        vacancyDetail.classList.remove('opened');
      }

      document.querySelector('.vacancies__menu-item--current').classList.remove('vacancies__menu-item--current');
      target.classList.add('vacancies__menu-item--current');
      filterVacancies(target.firstElementChild.dataset.target);
    }
  }*/

});