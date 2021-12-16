window.addEventListener('load', () => {
  const html = document.documentElement;
  
  const vacanciesList = document.querySelector('.vacancies__list');



  ////////////// Aside
  const scrollAsideBtnUp = document.querySelector('.vacancies__aside-scroll-btn--up');
  const scrollAsideBtnDown = document.querySelector('.vacancies__aside-scroll-btn--down');

  const vacanciesAsideSimplebarElement = document.querySelector('.__js_vacancies-aside-simplebar');
  
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
  const vacancyDetailMain = document.querySelector('.__js_vacancy-detail-mainsimplebar');
  const vacancyDetailBtn = document.querySelector('.vacancy-detail__btn');

  new SimpleBar(vacancyDetailMain);

  let vacanciesMainSimplebar = null;
  let scrollElement = null;
  let scrolledElement = null;


  const scrollMain = (direction = 1) => {
    scrollElement.scrollBy({
      top: (scrollElement.offsetHeight + lineGap) * direction,
      left: 0,
      behavior: 'smooth'
    });
  };

  
  let lineGap, endPointScroll = null;

  const refreshVars = () => {
    console.log(asideScrollElement)
    asideScrollElementHeight = asideScrollElement ? asideScrollElement.offsetHeight : 0;// изменится при ресайзе
    asideScrolledElementHeight = asideScrolledElement ? asideScrolledElement.offsetHeight : 0;// изменится при ресайзе
    asideScrollSize = 100;;//Math.floor(asideScrolledElementHeight / menuItems.length);//заменить линну масива

    asideEndPointScroll = Math.floor(asideScrolledElementHeight) - Math.floor(asideScrollElementHeight);

    endPointScroll = scrolledElement && scrollElement ? Math.floor(scrolledElement.offsetHeight) - Math.floor(scrollElement.offsetHeight) : 0;
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

  // Показ модального окна с формой отклика на вакансию
  const showModalWithResposeForm = function(evt) {
    evt.preventDefault();
    Fancybox.show([{ src: "#responseVacancy", type: "inline", closeButton: false, autoFocus: false, trapFocus: false}]);

    const closeBtn = document.querySelector('.response-vacancy__close');
    closeBtn.blur();

    closeBtn.onclick = () => {
      Fancybox.close();
    }
  };
  
  vacancyDetailBtn.onclick = showModalWithResposeForm;

  let isInitSimplebars = false;

  const initSimplebars = () => {
    vacanciesMainSimplebar = new SimpleBar(vacanciesMainSimplebarElement);

    scrollElement = vacanciesMainSimplebar.getScrollElement();
    scrolledElement = scrollElement.firstElementChild;

    vacanciesAsideSimplebar = new SimpleBar(vacanciesAsideSimplebarElement);

    asideScrollElement = vacanciesAsideSimplebar.getScrollElement();
    asideScrolledElement = asideScrollElement.firstElementChild;

    vacanciesMainSimplebar.getScrollElement().onscroll = checkMainScrollNeed;
    vacanciesAsideSimplebar.getScrollElement().onscroll = checkAsideScrollNeed;

    isInitSimplebars = true;
  };

  if (html.clientWidth >= 1080) {
    initSimplebars();
    refreshVars();
    checkMainScrollNeed();
    checkAsideScrollNeed();
  }

  window.addEventListener('resize', () => {

    if (html.clientWidth >= 1080 && !isInitSimplebars) {
      initSimplebars();
    }

    if (html.clientWidth >= 1080 && isInitSimplebars) {
      refreshVars();
      checkMainScrollNeed();
      checkAsideScrollNeed();
    }
  });


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


    var choices = new Choices('.__js_choice');

    var ajaxAllow = true;
    $(document).on('click touch','.vacancies__menu-item a', function (){
        event.preventDefault();
        if (ajaxAllow){
            ajaxAllow = false;
            let parent = $(this).parent();
            parent.addClass('vacancies__menu-item--current').siblings().removeClass('vacancies__menu-item--current');
            $('.vacancy-detail').removeClass('opened');
            let cat = parseInt($(this).data('catid'));
            getVacancies(cat);
        }
    });

    $(document).on('change','.js-select-vacancy',function (){
        if (ajaxAllow){
            ajaxAllow = false;
            $('.vacancy-detail').removeClass('opened');
            let cat = parseInt($(this).val());
            getVacancies(cat);
        }
    });

    function getVacancies(cat){
        $.ajax({
            url : '/Avilon/get_cat.php',
            data :  {cat : cat},
            type : 'POST',
            beforeSend : function ( xhr ) {
                $('.vacancies__list').fadeOut(100);
            },
            success : function( data ){
                $('.vacancies__list').html(data).hide().fadeIn(300);
                setTimeout(function (){
                    ajaxAllow = true;
                    refreshVars();
                    checkMainScrollNeed();
                    checkAsideScrollNeed();
                    AOS.refresh();
                },300);
            },
            error : function (){
                ajaxAllow = true;
            }
        });
    }

    $(document).on('click touch','.vacancy-preview__more', function (){
        event.preventDefault();
        if (ajaxAllow){
            ajaxAllow = false;
            let id = $(this).data('id');
            getVacancy(id);
        }
    });

    $(document).on('click touch','.vacancy-detail__close', function (){
        event.preventDefault();
        $('.vacancy-detail').removeClass('opened');
    });

    $(document).on('click touch','.js-response', function (){
        event.preventDefault();
        //showResposeModal();
    });

    function getVacancy(id){
        $.ajax({
            url : '/Avilon/get_cat.php',
            data :  {id : id},
            type : 'POST',
            dataType : 'json',
            beforeSend : function ( xhr ) {},
            success : function( data ){
                $('.vacancy-detail__title').text(data.name);
                $('.vacancy-detail__price b').html(data.price);
                $('.vacancy-detail__city').text(data.city);
                $('.vacancy-detail__location').text(data.location);
                $('.vacancy-detail__responsibilities').html(data.responsibilities);
                $('.vacancy-detail__requirements').html(data.requirements);
                $('.vacancy-detail__conditions').html(data.conditions);
                $('.response-vacancy [name="id"]').val(id);
                $('.response-vacancy__vacancy-name').text(data.name);
                $('.vacancy-detail').addClass('opened');
                setTimeout(function (){
                    ajaxAllow = true;
                },300);
            },
            error : function (){
                ajaxAllow = true;
            }
        });
    }

    function showResposeModal(){
        $('.response-vacancy').show();
    }
    function hideResposeModal(){
        //$('.response-vacancy').hide();
        Fancybox.close();
    }

    $(document).on('submit', '.response-form',function (){
        event.preventDefault();
        if (ajaxAllow) {
            ajaxAllow = false;
            let form = $(this);
            $.ajax({
                url : '/Avilon/add_response.php',
                data :  new FormData(this),
                type : 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                //dataType: 'json',
                beforeSend : function ( xhr ) {
                    form.find('.cform__send .button-with-arrow__text').text('Отправка...');
                },
                success : function( data ){
                    alert('Заявка отправлена');
                    hideResposeModal();
                    form.trigger("reset");
                    form.find('.cform__send .button-with-arrow__text').text('Отправить заявку');
                    ajaxAllow = true;
                },
                error : function (data){
                    alert('Ошибка отправки');
                    ajaxAllow = true;
                }
            });
        }
    });

});