window.addEventListener('load', () => {
  const vacanciesMain = document.querySelector('.vacancies__main');
  const vacancyDetail = document.querySelector('.vacancy-detail');

  if (vacanciesMain && vacancyDetail) {
    vacanciesMain.onclick = (e) => {
      const vacancyPreviewMore = e.target.closest('.vacancy-preview__more');
      console.log(vacancyPreviewMore)

      if (vacancyPreviewMore) {
        vacancyDetail.classList.add('opened');

        vacancyDetail.onclick = (e) => {
          e.stopPropagation();

          const closeBtn = e.target.closest('.vacancy-detail__close');

          if (closeBtn) {
            closeVacancyDetail();
          }
        }
      }

    }

    function closeVacancyDetail() {
      vacancyDetail.onclick = null;
      vacancyDetail.classList.remove('opened');
    }
  }
});