const dateField = document.querySelector('.__js_date-field input')

if (dateField) {
  const setHandler = () => {
    const next = document.querySelector('.datepicker__next');const prev = document.querySelector('.datepicker__prev');

    next.onclick = (e) => e.preventDefault();
    prev.onclick = (e) => e.preventDefault();
  }

  const datepicker = new Datepicker(dateField, {
    onRender: () => {
      setHandler();
    },
    onChange: function() {
    }
  });

}