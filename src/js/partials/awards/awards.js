window.addEventListener('load', () => {
    const yearsCarouselEl = document.querySelector('.__js_years-carousel');
    const carouselElelements = document.querySelectorAll('.__js_awards-carousel');
    //str.padStart(2, '0')

    if (yearsCarouselEl && carouselElelements.length) {
      /*const ModifierClass = {
        FILTER_ITEM: 'filters__item--active',
        SLIDE: 'catalog__item--hide',
        OPACITY: 'opacity-0'
      };*/

      const awardsWrapper = document.querySelector('.awards__wrapper');

      const yearsCarousel = new Swiper(yearsCarouselEl, {
        slidesPerView: 3,
        speed: 300,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,

        navigation: {
          nextEl: yearsCarouselEl.parentElement.querySelector('.arrow-btn--next'),
          prevEl: yearsCarouselEl.parentElement.querySelector('.arrow-btn--prev')
        },

        breakpoints: {
          // when window width is >= 320px
          768: {
            slidesPerView: 4
          },
          // when window width is >= 480px
          1200: {
            slidesPerView: 7
          },
          // when window width is >= 640px
          1800: {
            slidesPerView: 7
          
          }
        },

        on: {
          afterInit: function(swiper) {
            const targetSelector = Array.from(swiper.slides).find(it => it.classList.contains('swiper-slide-active')).dataset.target;
            showCarousel(targetSelector);

            awardsWrapper.classList.remove('inactive');
          },
          slideChangeTransitionStart: function(swiper) {
            const isInactive = awardsWrapper.classList.contains('inactive');

            if (!isInactive) {
              const targetSelector = Array.from(swiper.slides).find(it => it.classList.contains('swiper-slide-active')).dataset.target;
              changeProject(targetSelector);
            }

          },
          /*click: function(swiper, event) {
            const targetSlide = event.target.closest('.swiper-slide');

            if (targetSlide && !targetSlide.classList.contains('swiper-slide-active')) {
              const targetSlideIndex = parseInt(targetSlide.dataset.swiperSlideIndex, 10);
              swiper.slideTo(targetSlideIndex);
            }

          }*/
        }
      });


      carouselElelements.forEach(carouselEl => {
        const carousel = new Swiper(carouselEl, {
          slidesPerView: 1,
          speed: 300,
          spaceBetween: 42,

          //loop: true,
          navigation: {
            nextEl: '.arrow-btn--next',
            prevEl: '.arrow-btn--prev',
          },
          pagination: {
            el: carouselEl.parentElement.querySelector('.awards__carousel-progress'),//'.awards__carousel-progress',
            type: 'progressbar',
          },
          breakpoints: {
            // when window width is >= 320px
            768: {
              slidesPerView: 1,
              spaceBetween: 42
            },
            // when window width is >= 480px
            1200: {
              slidesPerView: 2,
              spaceBetween: 42
            },
            // when window width is >= 640px
            1800: {
              slidesPerView: 2,
              spaceBetween: 42
            }
          },
          on: {
            init: function (swiper) {
              //addPadStart(swiper.pagination.el.children[0]);
              //addPadStart(swiper.pagination.el.children[1]);
            },
            slideChange: function (swiper) {
              //addPadStart(swiper.pagination.el.children[0]);
              //addPadStart(swiper.pagination.el.children[1]);
            },
            resize: function (swiper) {
  
              //changeVisibilityPagination(swiper.pagination.el.parentElement, //swiper.params.slidesPerView >= swiper.slides.length)
              //addPadStart(swiper.pagination.el.children[0]);
              //addPadStart(swiper.pagination.el.children[1]);
            },
          }
        });
        //console.log(carousel)
      });

      function changeProject(targetSelector) {
        yearsCarouselEl.classList.add('inactive');

        const currentProject = document.querySelector('.awards__carousel.active');

        
        const targetProject = document.querySelector(targetSelector).parentElement;

        currentProject.classList.add('animate');
        currentProject.classList.remove('no-opacity');

        currentProject.ontransitionend = () => {
          currentProject.ontransitionend = null;
          currentProject.classList.remove('active');
          currentProject.classList.remove('animate');

          showCarousel(targetProject);

        }
      

        currentProject.ontransitionend = () => {
          currentProject.ontransitionend = null;
          currentProject.classList.remove('active');
          currentProject.classList.remove('animate');

          targetProject.classList.add('animate');
          targetProject.classList.add('active');
          targetProject.classList.add('no-opacity');

          targetProject.ontransitionend = () => {
            targetProject.ontransitionend = null;
            targetProject.classList.remove('animate');

            yearsCarouselEl.classList.remove('inactive');
          }

        }

      }

      function showCarousel(target) {
        const targetProject = (typeof target === 'string') ? document.querySelector(target).parentElement : target;

        targetProject.classList.add('animate');
        targetProject.classList.add('active');
        targetProject.classList.add('no-opacity');

        targetProject.ontransitionend = () => {
          targetProject.ontransitionend = null;
          targetProject.classList.remove('animate');

          yearsCarouselEl.classList.remove('inactive');
        }
      }

      function addPadStart(el) {
        el.textContent = el.textContent.padStart(2, '0');
      }

      function changeVisibilityPagination(el, isAllЫlidesVisible) {
        el.style.cssText = isAllЫlidesVisible ? 'visibility: hidden; pointer-events: none' : '';
      }




      

      
    }

  });