const dateFields = document.querySelectorAll('.__js_date-field input')

if (dateFields.length) {
  const setHandler = () => {
    const next = document.querySelector('.datepicker__next');const prev = document.querySelector('.datepicker__prev');

    next.onclick = (e) => e.preventDefault();
    prev.onclick = (e) => e.preventDefault();
  }

  dateFields.forEach(it => {
    const datepicker = new Datepicker(it, {
      onRender: () => {
        setHandler();
      },
      onChange: function() {
      },
      i18n: {
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      }
    });
  })



}