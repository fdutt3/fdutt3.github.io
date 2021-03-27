

(function () {

    //++++++++++++++++++++++CLASS DECLARE++++++++++++++++++++++++++//


    // CLASS TO ENSURE PAGE IS AUTO FILLED WITH CONTENT FROM FOLDER NAME
    class PortfolioPageCreater {

        constructor() {
            this.projname = null
            this.projcategory = null


        }


        // MAKE IMAGES FROM A FOLDER : CAN BE DELETED
        get_images() {
            return
            var len = 25;//How long you want to wait.
            var pics = [];
            for (var i = 1; i < len; i++) {
                let a = new Image();
                a.onload = function () {
                    pics.push(this);
                }
                try {

                    a.src = '/assets/img/projects/pluripotency/' + i + '.jpg';
                } catch (e) {
                    return
                    console.log(' errored to find imgs ', i, e)
                }

            }

        }

        //GETS THE PROJNAME FROM THE CURRENT WINDOW URL
        get_projname() {
            let loc = window.location.href
            let locarr = loc.split('/')
            let projnamehtml = locarr[locarr.length - 1]
            let projname = projnamehtml.split('.')[0]
            // projname = projname.split('_')[0]
            this.projname = projname
            console.log(' projname in proj page ', projname, loc, projname)
        }

        // CREATES THE NAVBAR 
        create_navbar() {
            let scroll_text = '' // Scroll down
            let nav_str = `
                <nav class="navbar navbar-light bg-light" id= "navbar-full" >
                <div class="container">
                    <div class="header_navbar"><a class="navbar-brand" href="./../index.html#work">
                            <h1>CADDISFL<span style="color:#900C3F;">AI</span> </h1>
                        </a>
                    </div>
                    <div class="buttons_portfolio">

                        <div style="display: flex; align-items: center; font-size: 0.5em;"> ${scroll_text} </div>

                        <a class="d-flex align-items-center justify-content-center icons_a_portfolio play_btn" 
                        href=""
                            data-gallery="imgGallery" title="Reset image playback">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16">
                                <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg>
                        </a>
                        
                        
                        <a class="portfolio-lightbox  d-flex align-items-center justify-content-center icons_a_portfolio fullscreen_btn" 
                        href="./../assets/img/projects/${this.projname}/1.jpg"
                            data-gallery="imgGallery" title="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                            </svg>
                        </a>

                        <a class="d-flex align-items-center justify-content-center icons_a_portfolio goback_btn"
                            id="liveToast" href="#" title="Go to home page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                            </svg>
                        </a>

                    </div>

                </div>
            </nav>
            `

            let selector = document.getElementsByClassName('navbar_div')[0]
            selector.innerHTML = nav_str

            //INTERACTIONS
            selector = document.getElementsByClassName('fullscreen_btn')
            selector[0].addEventListener('click', function (event) {
                console.log(' fullscreen button clicked ')
                // If the clicked element doesn't have the right selector, bail
                if (!event.target.matches('.click-me')) return;

                // Don't follow the link
                event.preventDefault();

                // Log the clicked element in the console
                console.log(event.target);
            }, false);

            selector = document.getElementsByClassName('goback_btn')
            selector[0].addEventListener('click', (event) => {
                console.log(' go back button clicked new ', this, event)
                // window.history.pushState({"html":'index.html',"pageTitle":'pageTitle'},"", './../index.html#work');
                window.localStorage.lastpage = this.projcategory
                window.location = './../index.html#work';

                // If the clicked element doesn't have the right selector, bail
                if (!event.target.matches('.click-me')) return;

                // Don't follow the link
                event.preventDefault();

            }, false);


            selector = document.getElementsByClassName('play_btn')
            selector[0].addEventListener('click', function (event) {
                console.log(' play button clicked ')
                swiper.autoplay.start()
            }, false);


            console.log(' NAV BAR ADDED SUCCESFULLY ')
        }

        add_images(data) {

            this.create_navbar()

            let swiper_scroller = `<div class="swiper-pagination" style = "margin : 5px;"></div>`
            let img_str = `
            <div class="portfolio-details-slider swiper-container">
            <div class="swiper-wrapper align-items-center">
            `

            var pictureIndex = data['proj_num_images'];
            var proj_category = data['proj_category_class']
            for (let i = 1; i <= pictureIndex; i++) {
                if (proj_category == 'collaborated' && i > 5) break
                img_str += `
                    <div class="swiper-slide">
                        <a class="portfolio-lightbox d-flex align-items-center justify-content-center icons_a_portfolio" href="./../assets/img/projects/${this.projname}/${i}.jpg"
                            data-gallery="imgGallery" title="" data-zoomable="true" data-draggable="true">
                            <img class="img_moving_portfolio"
                                src="./../assets/img/projects/${this.projname}/${i}.jpg" alt=""
                                data-gallery="imgGallery">
                        </a>
                    </div>
                    `

                // img_str += `
                // <div class="swiper-slide">
                //         <img class="img_moving_portfolio"
                //             src="./../assets/img/projects/${this.projname}/${i}.jpg" alt=""
                //             >
                // </div>
                // `
            }
            // img_str += swiper_scroller
            img_str += `</div> ${swiper_scroller} </div> `
            let selector = document.getElementsByClassName('image_content')[0]
            selector.innerHTML = img_str



            this.inititial_lightbox()
        }


        add_video(data) {

            let vid_url = data['proj_video_url']
            if (vid_url == '') return
            let wid = '100%', ht = 520;

            // https://youtu.be/9IIMTURKXKg
            let vid_code = vid_url.split('/')
            vid_code = vid_code[vid_code.length - 1]
            let vid_str = `<div>
            <iframe width="${wid}" height="${ht}" src="https://www.youtube.com/embed/${vid_code}" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>`

            let selector = document.getElementsByClassName('video_content')[0]
            selector.innerHTML = vid_str
        }

        add_images_slower() {
            let img_str = `
            <div class="portfolio-details-slider swiper-container">
            <div class="swiper-pagination"></div>
                            <div class="swiper-wrapper align-items-center">
            `

            var pictureIndex = 1;
            var image_url = undefined;
            var timer = setInterval(next, 0);

            var tester = new Image();
            tester.onload = imageFound;
            tester.onerror = imageNotFound;
            let self = this

            var next = () => {
                image_url = `./../assets/img/projects/${self.projname}/` + pictureIndex + '.jpg';
                tryLoadImage(image_url);
            }

            var timer = setInterval(next, 0);
            function tryLoadImage(url) {
                tester.src = url;
            }

            function imageFound() {
                pictureIndex += 1;
            }
            function imageNotFound() {
                // perform some function to stop calling next()
                clearInterval(timer);
                console.log('img load error ', tester, pictureIndex)

                for (let i = 1; i < pictureIndex; i++) {
                    img_str += `
                <div class="swiper-slide">
                    <a class="portfolio-lightbox d-flex align-items-center justify-content-center icons_a_portfolio" href="./../assets/img/projects/${self.projname}/${i}.jpg"
                        data-gallery="imgGallery" title="App 1" data-zoomable="true"
                        data-draggable="true">
                        <img class="img-fluid img_moving_portfolio"
                            src="./../assets/img/projects/${self.projname}/${i}.jpg" alt=""
                            data-gallery="imgGallery">
                    </a>
                </div>
                `
                }
                img_str += `</div> </div> `
                let selector = document.getElementsByClassName('image_content')[0]
                selector.innerHTML = img_str

                self.create_navbar()


                self.inititial_lightbox()
            }
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
                spaceBetween: 1000,
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

        style_portfolio_container(thresh = 1000) {
            let wid = document.documentElement.clientWidth
            let classname = 'portfolio_container'
            console.log(' from portfolio resizing ', wid)
            let obj = document.getElementsByClassName(classname)[0]
            if (wid > thresh) {
                obj.style.display = 'flex'
                obj.style.flexDirection = 'column'
                obj.style.alignItems = 'center'
            } else {
                obj.style.display = ''
                obj.style.flexDirection = ''
                obj.style.alignItems = ''
            }
        }


        //CHECKS WINDOW RESIZE
        resize_event() {
            window.onresize = (e) => {
                this.style_portfolio_container(1000)
            };
        }


        // CREATES THE PROJPAGE CONTENT
        create_imagetext_content(filter_data) {
            this.resize_event()
            console.log(' filter data gotten ', filter_data)

            let highlighted_text = ''
            if (filter_data['proj_subtitle'] != '') {
                highlighted_text = `
                    <span class="fw-lighter highlighted_text">
                    <mark class = 'highlight_marked'>
                        [ ${filter_data['proj_subtitle']} ]
                    </mark>
                </span>`
            }

            let list_items = `<li><strong>Category</strong>: Digital Fabrication Canopy Vaccum Foaming </li>
            <li><strong>Client</strong>: Graduate work at Upenn (Ferda's Design Studio)</li>
            <li><strong>Status</strong>: Prototyping, Fabrication</li>
            <li><strong>Year</strong>: 2010</li>`

            list_items = ''
            list_items += `
            <div class="heading_portfolio">
                <div class="row">
                    <div class="col-md">
                        <h2>${filter_data['proj_title']} </h2>
                    </div>
                    <div class="col-md highlighted_text_div">
                        ${highlighted_text}
                    </div>
                </div>
            </div>`

            let bullets = filter_data['proj_bullets'].split('==')

            for (let i = 0; i < bullets.length; i += 2) {
                list_items += `<li><strong>${bullets[i]}</strong>: ${bullets[i + 1]}</li>`
            }

            let wid = document.documentElement.clientWidth
            let col_wid = 24
            let classname = 'portfolio_container'
            // if (wid < 1000) classname = ''

            // classname = ''
            let fluidity = '-fluid'


            let header_text = ''
            let page_str = `
            <div class="container${fluidity}">

            <div class="row gy-4 justify-content-center">
                <div class="col-lg-${col_wid} ${classname}">
                    ${header_text}

                    
                        <div class="col-lg-10 image_content"></div>

                        <div class="col-lg-10 video_content"></div>
                    

                    <div class="col-lg-10">
                        <div class="portfolio-info">
                            <ul>
                                ${list_items}
                            </ul>
                            <div class="portfolio-description">
                                <p>
                                    ${filter_data['proj_descr']}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        `

            page_str += `
        <div class="container-fluid thumbs_suggestions">          

        </div>
        `

            let selector = document.getElementsByClassName('portfolio_section_page')[0]
            selector.innerHTML = page_str


            this.style_portfolio_container(1000)
            console.log(' PROJ PAGE CONTENT ADDED SUCCESFULLY ')
        } // end of create image text

        // CREATES THE NAVBAR 
        create_thumbnails(data) {

            console.log('thums in portfolio ', data, this)

            let thumbnails_str = ''
            let header_text = `<div class = "suggestion_header">
                                    <strong> RECOMMENDED WORKS </strong>
                                </div>`

            let num_other_works = 0
            let added_proj_dict = {}
            data.map((d, i) => {

                if (d['proj_category_class'] != this.projcategory) {

                    let newdata = data.filter((k) => {
                        return k['proj_category_class'] != d['proj_category_class']
                    })
                    num_other_works += 1
                    let index = parseInt(newdata.length * Math.random())
                    d = data[index]
                }

                if (d['proj_category_class'] != this.projcategory && num_other_works > 2) return

                let folder = d['proj_folder']
                let title = d['proj_folder']
                let subtext = d['proj_text_thumb']
                let category = d['proj_category_class']
                let cat_featured = d['proj_featured']
                let recog_title = d['proj_subtitle']
                let proj_show = d['proj_show']

                if (added_proj_dict[title]) return
                if (title == this.projname) return
                if(proj_show == 'no') return
                added_proj_dict[title] = true

                let star_proj = ''
                if (d['proj_subtitle'] != '') star_proj = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
          <path d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
          <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
        </svg>`
                let img_str = `<img src="./../assets/img/projects/${folder}/b_1.jpg" class="img-fluid img_thumbs" alt="" data-gallery="portfolioGallery">`
                // img_str = ''
                thumbnails_str += `
                  <div class="col-lg-4 col-md-6 portfolio-item filter-${category} filter-${cat_featured} portfolio_container_self" id = "portfolio_container_self" >
                  <a href="./../projects/${folder}.html" data-gallery="portfolioGallery"
                          title="Zoom thumbnail" class="portfolio-lightbox" title="${title}">
                          ${star_proj}
                  <div class="portfolio-wrap">
  
                          ${img_str}
                          <div class="portfolio-info">
                          <h5>${title}</h5>
                          <p>${subtext}</p>    
                        <p>${recog_title}</p>                 

                          </div>        
                     
                  </div>
                  </a>
                  </div>
                  `
            })

            let thumb_str = `
                 ${header_text}
              <div class="container" data-aos="fade-up" style = "font-size: 0.8em;">           
               <div class="row portfolio-container main_thumbnail_container" data-aos="fade-up" data-aos-delay="200">  
                  ${thumbnails_str}
                </div>
            </div>
              `


            let selector = document.getElementsByClassName('thumbs_suggestions')[0]
            selector.innerHTML = thumb_str

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




        add_libraries() {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/4.7.4/d3.min.js";
            document.body.append(s);
        }

        add_lightbox_again() {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = "./../assets/vendor/glightbox/js/glightbox.min.js";
            document.body.append(s);

            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = "./../assets/vendor/swiper/swiper-bundle.min.js";
            document.body.append(s);
        }

        add_vendor_jslib() {
            var js_str = `
            <script src="./../assets/vendor/aos/aos.js"></script>
            <script src="./../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="./../assets/vendor/glightbox/js/glightbox.min.js"></script>
            <script src="./../assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
            <script src="./../assets/vendor/php-email-form/validate.js"></script>
            <script src="./../assets/vendor/purecounter/purecounter.js"></script>
            <script src="./../assets/vendor/swiper/swiper-bundle.min.js"></script>
            <script src="./../assets/vendor/typed.js/typed.min.js"></script>
            <script src="./../assets/vendor/waypoints/noframework.waypoints.js"></script>
            <script src="./../assets/js/main.js"></script>
            `

            let selector = document.getElementsByClassName('portfolio_section_page')[0]
            selector.innerHTML = js_str

            console.log(' VENDOR JS CONTENT ADDED SUCCESFULLY ')
        }
    }

    //END OF CLASS


    //++++++++++++++++++++++CALL METHODS++++++++++++++++++++++++++//

    console.log = function(){}

    pc = new PortfolioPageCreater()

    pc.add_libraries()

    d3.csv('./../assets/img/projects_directory.csv', function (error, data) {


        if (error) console.log('error is ', error)
        pc.get_projname()

        document.title = `CADDISFLAI: ${pc.projname} --- `

        let filter_data = data.filter((d) => {
            return d['proj_folder'] == pc.projname
        })
        console.log(' CSV DATA LOADED ', data, filter_data, pc.projname)

        pc.projcategory = filter_data[0]['proj_category_class']

        // pc.create_navbar()

        pc.create_imagetext_content(filter_data[0]);
        pc.get_images()
        // pc.add_images_slower();
        pc.add_images(filter_data[0]);
        pc.add_video(filter_data[0])
        pc.inititial_lightbox()


        // recommended works
        pc.create_thumbnails(data)




    })


}())