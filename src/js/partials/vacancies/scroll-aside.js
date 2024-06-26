window.addEventListener('load', () => {
  const scrollAsideBtnUp = document.querySelector('.vacancies__aside-scroll-btn--up');
  const scrollAsideBtnDown = document.querySelector('.vacancies__aside-scroll-btn--down');

  const vacanciesAsideSimplebarElement = document.querySelector('.__js_vacancies-aside-simplebar');
  const vacanciesAsideSimplebar = new SimpleBar(vacanciesAsideSimplebarElement);

  const asideScrollElement = vacanciesAsideSimplebar.getScrollElement();
  const asideScrolledElement = asideScrollElement.firstElementChild;

  const asideScrollElementHeight = asideScrollElement.offsetHeight;
  const asideScrolledElementHeight = asideScrolledElement.offsetHeight;

  const asideScrollSize = Math.floor(asideScrolledElementHeight / menuItems.length);//заменить линну масива

  let asideEndPointScroll = Math.floor(asideScrolledElementHeight) - asideScrollElementHeight;

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
  }

  checkAsideScrollNeed();

  scrollAsideBtnUp.onclick = () => {
    scrollAside(-1);
  };

  scrollAsideBtnDown.onclick = () => {
    scrollAside(1);
  };

  vacanciesAsideSimplebar.getScrollElement().addEventListener('scroll', checkAsideScrollNeed);

  
});