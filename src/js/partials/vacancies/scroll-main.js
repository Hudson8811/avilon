window.addEventListener('load', () => {
  const html = document.documentElement;
  
  const vacanciesList = document.querySelector('.vacancies__list');

  const createVacancyPreviewTemplate = ({title, text, date}) => {
    return `<li class="vacancies__item vacancy-preview">
      <div class="vacancy-preview__title">${title}</div>
      <div class="vacancy-preview__text">${text}</div>
      <time class="vacancy-preview__date" datetime="2021-11-18">${date}</time>
      <div class="vacancy-preview__action"> 
        <button class="vacancy-preview__more" type="button" data-vacancy-name="${title}">Подробнее</button>
      </div>
      <span class="vacancy-preview__icon"> 
          <svg  width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg"><path d="M.293 9.293a1 1 0 1 0 1.414 1.414L.293 9.293ZM11 1a1 1 0 0 0-1-1H1a1 1 0 1 0 0 2h8v8a1 1 0 1 0 2 0V1Zm-9.293 9.707 9-9L9.293.293l-9 9 1.414 1.414Z"/></svg>
      </span>
    </li>`;
  };

  const createVacanciesMenuItemTemplate = ({name, id, items}, isCurrent) => {
    return `<li class="vacancies__menu-item${isCurrent ? ' vacancies__menu-item--current' : ''}">
      <a href="#" data-target="${id}">${name} (${items.length})</a>
    </li>`
  }
  
  const createOptionAsideSelectTemplate = ({name, id, items}) => {
    return `<option value="${id}">${name} (${items.length})</option>`
  }

  const createElement = (template) => {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;

    return newElement.firstChild;
  };

  ////////////// Aside
  const scrollAsideBtnUp = document.querySelector('.vacancies__aside-scroll-btn--up');
  const scrollAsideBtnDown = document.querySelector('.vacancies__aside-scroll-btn--down');

  const vacanciesAsideSimplebarElement = document.querySelector('.__js_vacancies-aside-simplebar');
  
  const vacanciesMenu = document.querySelector('.vacancies__menu');
  let vacanciesAsideSimplebar = null;//new SimpleBar(vacanciesAsideSimplebarElement);

  let asideScrollElement = null;//vacanciesAsideSimplebar.getScrollElement();
  let asideScrolledElement = null;//asideScrollElement.firstElementChild;

  let asideScrollElementHeight = null;//asideScrollElement.offsetHeight;// изменится при ресайзе
  let asideScrolledElementHeight = null;//asideScrolledElement.offsetHeight;// изменится при ресайзе
  let asideScrollSize = null;

  let asideEndPointScroll = null;//Math.floor(asideScrolledElementHeight) - asideScrollElementHeight;

  const checkAsideScrollNeed = () => {
    if (asideScrollElement.scrollTop >= asideEndPointScroll) {
      scrollAsideBtnDown.classList.add('scroll-btn--inactive');
      vacanciesAsideSimplebarElement.classList.add('is-scroll-end');
    } else {
      scrollAsideBtnDown.classList.remove('scroll-btn--inactive');
      vacanciesAsideSimplebarElement.classList.remove('is-scroll-end');
    }

    if (asideScrollElement.scrollTop === 0) {
      scrollAsideBtnUp.classList.add('scroll-btn--inactive');
      vacanciesAsideSimplebarElement.classList.add('is-scroll-start');
    } else {
      scrollAsideBtnUp.classList.remove('scroll-btn--inactive');vacanciesAsideSimplebarElement.classList.remove('is-scroll-start');
    }

    if (asideEndPointScroll < 0) {
      scrollAsideBtnUp.classList.add('scroll-btn--inactive');
      scrollAsideBtnDown.classList.add('scroll-btn--inactive');
      vacanciesAsideSimplebarElement.classList.remove('is-scroll-start');vacanciesAsideSimplebarElement.classList.remove('is-scroll-end');
    }
  }

  const scrollAside = (direction = 1) => {
    asideScrollElement.scrollBy({
      top: asideScrollSize * direction,
      left: 0,
      behavior: 'smooth'
    });
  };



  //////////// Main

  const scrollMainBtnUp = document.querySelector('.vacancies__main-scroll-btn--up');
  const scrollMainBtnDown = document.querySelector('.vacancies__main-scroll-btn--down');

  const vacanciesMainSimplebarElement = document.querySelector('.__js_vacancies-main-simplebar');
  //const vacancyPreviewItems = vacanciesList.children;
  const vacanciesMain = document.querySelector('.vacancies__main');
  const asideVacanciesCategoriesSelect = document.querySelector('.__js_choice');

  let vacanciesMainSimplebar = null;
  let scrollElement = null;
  let scrolledElement = null;

  /*const destroySimplebar = (wrapperElement, innerElement) => {
    wrapperElement.removeAttribute('data-simplebar');
    wrapperElement.innerHTML = '';
    wrapperElement.appendChild(innerElement);
  };*/

  const scrollMain = (direction = 1) => {
    scrollElement.scrollBy({
      top: (scrollElement.offsetHeight + lineGap) * direction,
      left: 0,
      behavior: 'smooth'
    });
  };

  
  let vacancyPreviewRect, scrolledElementRect, vacanciesListHeight, lineHeight, 
  vacancyPreviewItemsInLineCount, lineCount, lineGap, scrollSize, endPointScroll = null;

  const refreshVars = () => {
     /*
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
    */
      
    asideScrollElementHeight = asideScrollElement.offsetHeight;// изменится при ресайзе
    asideScrolledElementHeight = asideScrolledElement.offsetHeight;// изменится при ресайзе
    asideScrollSize = 100;;//Math.floor(asideScrolledElementHeight / menuItems.length);//заменить линну масива
    
    asideEndPointScroll = Math.floor(asideScrolledElementHeight) - Math.floor(asideScrollElementHeight);

    endPointScroll = Math.floor(scrolledElement.offsetHeight) - Math.floor(scrollElement.offsetHeight);
    lineGap = vacanciesList.firstElementChild ? vacanciesList.firstElementChild.offsetHeight : 0;
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

  

  let loadedData = null;

  fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
      loadedData = data;

      loadedData.forEach((item, index) => {
        asideVacanciesCategoriesSelect.appendChild( createElement(createOptionAsideSelectTemplate(item)) );
        vacanciesMenu.appendChild( createElement(createVacanciesMenuItemTemplate(item, index === 0)) );
      });

      loadedData[0].items.forEach(item => {
        vacanciesList.appendChild( createElement(createVacancyPreviewTemplate(item)) );
      });
    })
    .then(() => {
      const choices = new Choices(asideVacanciesCategoriesSelect);
      console.clear()
      //console.log(vacanciesMainSimplebarElement)

      if (html.clientWidth >= 1080) {
        vacanciesMainSimplebar = new SimpleBar(vacanciesMainSimplebarElement);

        scrollElement = vacanciesMainSimplebar.getScrollElement();
        scrolledElement = scrollElement.firstElementChild;

        vacanciesAsideSimplebar = new SimpleBar(vacanciesAsideSimplebarElement);

        asideScrollElement = vacanciesAsideSimplebar.getScrollElement();
        asideScrolledElement = asideScrollElement.firstElementChild;
      }

      /*window.addEventListener('resize', () => {
        if (html.clientWidth < 1080 && vacanciesMainSimplebar) {
          destroySimplebar(vacanciesMainSimplebarElement, vacanciesList);
          vacanciesMainSimplebar = null;
            
          scrollElement = null;
          scrolledElement = null;

        } else if (html.clientWidth >= 1080 && !vacanciesMainSimplebar) {
          vacanciesMainSimplebar = new SimpleBar(document.querySelector('.__js_vacancies-main-simplebar'));
          console.log(vacanciesMainSimplebar)

          scrollElement = vacanciesMainSimplebar.getScrollElement();
          scrolledElement = scrollElement.firstElementChild;
        }
      });*/
    })
    .then(() => {
      refreshVars();
      checkMainScrollNeed();
      checkAsideScrollNeed();
    });

    
  vacanciesMenu.onclick = (e) => {
    const target = e.target.closest('.vacancies__menu-item:not(.vacancies__menu-item--current)');

    if (target) {
      e.preventDefault();
      const vacancyDetail = document.querySelector('.vacancy-detail');

      if (vacancyDetail && vacancyDetail.classList.contains('opened')) {
        vacancyDetail.classList.remove('opened');
      }

      document.querySelector('.vacancies__menu-item--current').classList.remove('vacancies__menu-item--current');
      target.classList.add('vacancies__menu-item--current');

      const categoryId = target.firstElementChild.dataset.target;
      

      const categoryVacancies = loadedData.find(item => item.id == categoryId).items;
      vacanciesList.innerHTML = '';
      categoryVacancies.forEach(item => {
        vacanciesList.appendChild( createElement(createVacancyPreviewTemplate(item)) );
      });
      
      refreshVars();
      checkMainScrollNeed();
    }
  }



  //////////////////////

  scrollAsideBtnUp.onclick = () => {
    scrollAside(-1);
  };

  scrollAsideBtnDown.onclick = () => {
    scrollAside(1);
  };

  scrollMainBtnUp.onclick = () => {
    scrollMain(-1);
  };

  scrollMainBtnDown.onclick = () => {
    scrollMain(1);
  };

  vacanciesMainSimplebar.getScrollElement().addEventListener('scroll', checkMainScrollNeed);
  vacanciesAsideSimplebar.getScrollElement().addEventListener('scroll', checkAsideScrollNeed);

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


});