$(function() {
    var $window = $(window);
    /*Portfolio*/

    //Sizing
    $('.portfolio li').each(function() {
        var $obj = $(this);
        $(this).prepend('<div class="image"></div>');
        var $portBG = $(this).data('image');
        $(this).children('.image').css( {
            backgroundImage: 'url('+$portBG+')',
        });

        var $width = $obj.width();

        if ($obj.hasClass('tall')) {
            $obj.height($width*2 + 'px');
        } else if ($obj.hasClass('long')) {
            $obj.height($width/2 + 'px');
        } else {
            $obj.height($width + 'px');
        };

        $window.resize(function() {
            var width = $obj.width();
            if ($obj.hasClass('tall')) {
                $obj.height($width*2 + 'px');
            } else if ($obj.hasClass('long')) {
                $obj.height($width/2 + 'px');
            } else {
                $obj.height($width + 'px');
            };
        })
    });

    //Modal popup
    var $box = $('.portfolio-wrap');
    var $content = $('.portfolio-content');

    $('.portfolio li a').click(function(e) {
        e.preventDefault();

        //Color scheme
        if ($(this).parent('li').hasClass('color1')) {
            $content.addClass('color1')
        } else {
            $content.addClass('color2')
        };

        //Content
        var $link = $(this).attr('href');
        var $img = $(this).parent('li').data('image');

        $content.find('.img-box').html('<img class="porfolio-image" src="'+ $img +'" alt="">');
        $content.find('.name').load($link+' #name');
        $content.find('.content').load($link+' #content', function() {
            $content.find('.preloader-wrap').fadeOut(700, 'easeInOutCubic')
        });

        //Appearance
        $('.main-menu').addClass('hidden');

        $('.portfolio-bg').fadeIn(500, 'easeInOutCubic');
        $box.css('display', 'block');
        setTimeout(function () {  
            $box.addClass('visible');  
        }, 20);
    });

    $content.find('.close').click(function() {
        $('.main-menu').removeClass('hidden');
        $('.portfolio-bg').fadeOut(500, 'easeInOutCubic');
        $box.removeClass('visible').one('transitionend', function() {  
            $(this).css('display', 'none');

            $content.removeClass('color1', 'color2');
            $content.find('.preloader-wrap').show();
        });
    });

    /*Scrollbars*/

    $(".portfolio-wrap").niceScroll({
        cursorborder: '0',
        scrollspeed: 100,
        mousescrollstep: 30,
        autohidemode: true,
        cursorcolor: '#000',
        cursorborderradius: '5px',
        cursoropacitymax: '0.5',
        cursorwidth: '2px',
    });

    /*Our team carousel*/

    $('.our-team').owlCarousel({
        margin: 40,
        loop: false,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayHoverPause: true,
        navRewind: false,
        themeClass: ' ',
        navText: ['<i class="fa fa-angle-double-left "></i>', '<i class="fa fa-angle-double-right"></i>'],
        responsive: {
            1: {
                items: 1,
                slideBy:1,
                smartSpeed: 500,
            },
            480: {
                items: 2,
                slideBy: 2,
            },
            993: {
                items: 3,
                slideBy: 3
            }
        }
    });

    /*Qoute slider*/

    $('.quote-slider').owlCarousel({
        items: 1,
        slideBy: 1,
        margin: 0,
        loop: false,
        nav: true,
        dots: false,
        autoplay: false,
        navRewind: false,
        smartSpeed: 500,
        themeClass: ' ',
        navText: ['<i class="fa fa-angle-left "></i>', '<i class="fa fa-angle-right"></i>'],
    });

    /*Partners-logos slider*/

    $('.logo-slider').owlCarousel({
        slideBy: 1,
        margin: 80,
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        themeClass: ' ',
        responsive: {
            1: {
                items: 1
            },
            400: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    /*Parallax*/

    $('.parallax').each(function() {
        var $bg$obj = $(this);
        var parallaxFunc = function(){
            if ($window.width() >= 768) {
                var offset = $bg$obj.offset().top;
                var scrollTop = $window.scrollTop();
                var yPos = -(offset - scrollTop)/2;
                var coords = 'center '+ yPos + 'px';
                $bg$obj.css( { backgroundPosition: coords });
            } else {
                $bg$obj.css( {
                    backgroundPosition: 'center',
                });
            }
        };
        parallaxFunc(); 
        $window.scroll(function (){
            parallaxFunc();
        });
    });

    /*Service list hover effect*/

    var serviceList = $('.service-list li');
    serviceList.hover(function() {
        serviceList.css('opacity', 0.3);
        $(this).css('opacity', 1)
    }, function() {
        serviceList.css('opacity', 1)
    });

    /*Navigation*/

    //menu
    var mainMenu = $('.main-menu');
    var menuHeight = mainMenu.outerHeight();
    $window.scroll(function() {
        if ($window.width() >= 768) {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > $window.height()) {
                mainMenu.addClass('fixed');
                $('main').css('padding-top', menuHeight + 'px')
            } else {
                mainMenu.removeClass('fixed')
                $('main').css('padding-top', 0)
            }
        } else {
            $('main').css('padding-top', 0);
        }
    });

    //Smooth scroll to anchor
    $('.menu').onePageNav({
        scrollSpeed: 1500,
        easing: 'easeInOutCubic'
    });

    $('.logo').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutCubic');
    })

    $('.page-header .arrow').click(function() {
        $('html, body').stop().animate( {
            scrollTop: $window.height()
        }, 1000, 'easeInOutCubic');
    });

    /*Graph*/
    var $graphBox = $('.graph-box');
    var $filled = $graphBox.find('.filled');
    $filled.css('left', '-100%')
        .each(function() {
            var $obj = $(this);
            var $offset = $obj.offset().top
            $window.on('scroll', function() {
                if ($(this).scrollTop() + 0.95 * $(this).height() > $offset) {
                    $obj.css('left', 0)
                }
            });
        });
});