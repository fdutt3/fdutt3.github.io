

(function () {

  //++++++++++++++++++++++CLASS DECLARE++++++++++++++++++++++++++//


  // CLASS TO ENSURE PAGE IS AUTO FILLED WITH CONTENT FROM FOLDER NAME
  class MainPortfolioThumbnails {

    constructor() {

    }

    //CHECKS WINDOW RESIZE
    resize_event() {
      window.onresize = (e) => {
        console.log(' resizing ', e)

      };

      // document.body.addEventListener("resize" , (e) => {

      // })
    }

    /*
    shuffles a given array
    */
    shuffle_arr(unshuffled) {
      let shuffled = unshuffled
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)

      return shuffled
    }

    //CHANGES BACKGROUND OF HERO SECTION
    change_background_url() {
      let counter = 0
      let name_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      let shuf_arr = this.shuffle_arr(name_arr)
      let interval = setInterval(function () {
        let wid = document.documentElement.clientWidth
        let directory = 'hero-images-big'

        if (wid < 400) {
          // for mob images
          directory = 'hero-images-mob'
        }
        document.querySelector('#hero').style.background = `url(./assets/img/${directory}/${shuf_arr[counter]}.jpg) no-repeat center center fixed`
        counter += 1
        if (counter > 9) counter = 0
      }, 4000)
    }


    // CREATES THE NAVBAR 
    create_thumbnails(data) {

      let thumbnails_str = ''
      let categories = []
      data.map((d) => {
        let folder = d['proj_folder']
        let title = d['proj_folder']
        let subtext = d['proj_text_thumb']
        let category = d['proj_category_class']
        let recog_title = d['proj_subtitle']
        let cat_featured = d['proj_featured']
        if (categories.indexOf(category) == -1) categories.push(category)

        let star_proj = ''
        if (d['proj_subtitle'] != '') star_proj = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
        <path d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
        <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
      </svg>`
        let img_str = `<img src="assets/img/projects/${folder}/b_1.jpg" class="img-fluid img_thumbs" alt="" data-gallery="portfolioGallery">`
        // img_str = ''
        thumbnails_str += `
                <div class="col-lg-4 col-md-6 portfolio-item filter-${category} filter-${cat_featured} portfolio_container_self" id = "portfolio_container_self" >
                <a href="./projects/${folder}.html" data-gallery="portfolioGallery"
                        title="Zoom thumbnail" class="portfolio-lightbox" title="${title}">
                        ${star_proj}
                <div class="portfolio-wrap">

                        ${img_str}
                        <div class="portfolio-info">
                        <h4>${title}</h4>
                        <p>${subtext}</p>                 
                        <p>${recog_title}</p>                 
                        </div>        
                   
                </div>
                </a>
                </div>
                `


      })

      // categories.push('featured')

      let category_list = `<li data-filter="*" class="filter">All</li>`
      // category_list += `<li data-filter=".filter-featured" class="filter-active li-featured">Featured</li>`

      categories.map((c) => {
        category_list += `<li data-filter=".filter-${c}" class="li-${c}">${c}</li>`
      })

      // category_list += `<li data-filter=".filter-app">App</li>`



      let thumb_str = `
            <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2>Work</h2>
              <p></p>
            </div>
    
            <div class="row">
              <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
                <ul id="portfolio-flters">
                  ${category_list}
                </ul>
              </div>
            </div>
    
            <div class="row portfolio-container main_thumbnail_container" data-aos="fade-up" data-aos-delay="200">  
                ${thumbnails_str}
              </div>
            </div>
          </div>
            `


      let selector = document.getElementsByClassName('main_portfolio_section')[0]
      selector.innerHTML = thumb_str

      console.log(' THUMBAS ADDED SUCCESFULLY ')

      // setTimeout(() => {

      // }, 20);
      let WINDOWS_ONLOAD = false
      setTimeout(() => {
        if (WINDOWS_ONLOAD == false) {
          this.initiate_filter_listener()
          var someLink = document.querySelector('.li-featured');
          someLink.click();
          console.log(' set time out set out ')
        }
      }, 2000);

      selector = document.querySelector('.work-anchor')
      selector.addEventListener('click', (event) => {
        //...
        console.log(' clicked work ')
        this.initiate_filter_listener();
        let cat_class = window.localStorage.lastpage
        if (cat_class == 'undefined') cat_class = 'featured'
        let selector = `.li-${cat_class}`
        var someLink = document.querySelector(selector);
        someLink.click();
      })


      window.addEventListener('load', () => {
        console.log(' WINDOW LOADED GO ....')
        this.initiate_filter_listener();
        let cat_class = window.localStorage.lastpage //window.categoryclicked
        if (cat_class == 'undefined') cat_class = 'featured'
        let selector = `.li-${cat_class}`
        var someLink = document.querySelector(selector);
        someLink.click();
        WINDOWS_ONLOAD = true;
      })

      // this.initiate_filter_listener();

    } // create thumbnail ends


    initiate_filter_listener() {


      /**
       * Easy selector helper function
       */
      const select = (el, all = false) => {
        el = el.trim()
        if (all) {
          return [...document.querySelectorAll(el)]
        } else {
          return document.querySelector(el)
        }
      }

      /**
     * Easy event listener function
     */
      const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
          if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
          } else {
            selectEl.addEventListener(type, listener)
          }
        }
      }


      /**
     * Porfolio isotope and filter
     */
      // window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function (e) {

          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          let data_filtername = this.getAttribute('data-filter')
          let arr_splitted = data_filtername.split('-')
          window.localStorage.lastpage = arr_splitted[arr_splitted.length - 1]

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function () {
            AOS.refresh()
          });
        }, true);
      }

      // });
    }

    inititial_lightbox() {

      // for swiper 
      // https://swiperjs.com/swiper-api#initialize-swiper
      /**
          * Initiate portfolio lightbox 
          */
      const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
      });

      /**
       * Initiate portfolio details lightbox 
       */
      const portfolioDetailsLightbox = GLightbox({
        selector: '.portfolio-details-lightbox',
        width: '90%',
        height: '90vh'
      });

      /**
       * Portfolio details slider
       */
      const swiper = new Swiper('.portfolio-details-slider', {
        speed: 400,
        spaceBetween: 10,
        slidesPerView: 1,
        edgeSwipeDetection: true,
        effect: 'coverflow', //'slide' | 'fade' | 'cube' | 'coverflow' | 'flip'
        loop: true,
        followFinger: true,
        parallax: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: true
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar', //'bullets' | 'fraction' | 'progressbar' | 'custom' //
          clickable: true,
          // progressbarFillClass: 'swiper-pagination-fill-object'
        }
      });

      swiper.on('click', function (e) {
        console.log('slide changed ', e);
        // e.activeIndex += 1
        // e.autoplay.paused = true;
        // e.autoplay.running = false;
        e.autoplay.stop()
      });

      let elem = document.getElementsByClassName('swiper-pagination-progressbar-fill')[0]
      elem.setAttribute('id', 'progress-bar-fill-id')
      window.swiper = swiper
    }


    add_libraries() {
      return new Promise((resolve, reject) => {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/4.7.4/d3.min.js";
        document.body.append(s);
        setTimeout(() => {
          resolve('done');
        }, 100);
      })
    }

  }

  //END OF CLASS

  class AwardsContent {
    constructor() {

    }

    make_header(data) {

      console.log(' data is in make header ', data)

      let filter_data = data.filter((d) => { return d['proj_awards_title'] != "" })
      let row_str = ''

      filter_data.map((d) => {
        row_str += `
          <div class="row object_awards-row">
            <div class="">
              <img src="assets/img/projects/${d['proj_folder']}/1.jpg" class="img-awards" alt="">
            </div>
            <div class="awards_cell">
              <div class=""> <br>
                <div class="">
                    <div> ${d['proj_awards_title']} for ${d['proj_title']}</div>
                  </div>
                </div>
              </div>
            </div>
            `
      })

      // for (let i=0;i< 10; i++){
      //    row_str += `
      //   <div class="row object_awards-row" style = "display: flex; justify-content: center; border-bottom: 1px dashed lightgray;">
      //     <div class="col-lg-1 img-profile-div">
      //       <img src="assets/img/BW_def_2WY.jpg" class="img-fluid img-profile" alt="">
      //     </div>
      //     <div class="awards_row" style = "
      //               width: auto;
      //               display: flex;
      //               justify-content: center;
      //               align-items: center;
      //             ">

      //       <div class="row">
      //         <div class="col-lg-12">
      //             <div> Georgia Institute of Technology, University of Pennsylvania, USA</div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //     `
      // }

      let head_str = `
            <div class="container-fluid" data-aos="fade-up">
              <div class="section-title">
                <h2>Awards/News</h2>
              </div>


              <div class="col object_awards_container">
                ${row_str}
              </div>

              </div>
            </div>
            `

      let selector = document.getElementsByClassName('awards')[0]
      selector.innerHTML = head_str
    }


  }


  //++++++++++++++++++++++CALL METHODS++++++++++++++++++++++++++//

  console.log = function(){}

  mp = new MainPortfolioThumbnails()
  mp.resize_event()
  mp.change_background_url()

  d3.csv('./../assets/img/projects_directory.csv', function (error, data) {
    if (window.localStorage.updatedonce == 'undefined') {
      window.localStorage.lastpage = 'featured'
      window.localStorage.updatedonce = true;
    }
    if (error) console.log('error is ', error)
    console.log(' within thumbnails ', data)


    data = data.filter((d) => {
      if (d['proj_show'] == 'no') return false;
      else return true
    })
    mp.create_thumbnails(data)

    aw = new AwardsContent();
    aw.make_header(data)
  })



  // mp.add_libraries().then((e) => {
  //     d3.csv('./../assets/img/projects_directory.csv', function (error, data) {
  //         if (error) console.log('error is ', error)
  //         console.log(' within thumbnails ', data)
  //         mp.create_thumbnails(data)
  //     })
  // }).catch((e) => {
  //     console.log(' errored in d3 ', e)
  // })




}())