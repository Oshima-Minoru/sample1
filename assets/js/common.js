!(function($) {
  "use strict";

  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;
  console.log(window.innerWidth);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);


  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('#header').addClass('header_scrolled');
    } else {
      $('#header').removeClass('header_scrolled');
    }
  });

  if ($(window).scrollTop() > 150) {
    $('#header').addClass('header_scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $('.back_to_top').fadeIn('slow');
    } else {
      $('.back_to_top').fadeOut('slow');
    }
  });
  $('.back_to_top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });


  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = 106;
  if (window.matchMedia("(max-width: 991px)").matches) {
    scrolltoOffset = 60;
  }

  $(document).on('click', 'a.link_btn, a.scroll_btn, #mobile_nav a, .scrollto, .scroll_down, a.btn, a.c_business_item', function(e) {

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1000);

        if ($(this).parents('.nav_menu, .mobile_nav_menu').length) {
          $('.nav_menu .active, .mobile_nav_menu .active').removeClass('active');
          $(this).addClass('active');
        }

        return false;
      }
    }
  });

  // Mobile Navigation
  $('body').prepend('<button type="button" id="mobile_nav_toggle" class="drawer_toggle"><span class="drawer_icon"><span></span><span></span><span></span></span></button>');
  $('body').append('<div id="mobile_body_overly"></div>');

  $(document).on('click', '.drawer_toggle', function(e) {
    $('body').toggleClass('mobile_nav_active');
    $('.drawer_toggle').toggleClass('drawer_open');
    $('#mobile_body_overly').toggle();
  });

  $(document).click(function(e) {
    var container = $("#mobile_nav, .drawer_toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile_nav_active')) {
        $('body').removeClass('mobile_nav_active');
        $('.drawer_toggle').removeClass('drawer_open');
        $('#mobile_body_overly').fadeOut();
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000);
      }
    }
  });

  if ($('.c_product_slider').length > 0) {
    $('.c_product_slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: 'ease-in-out',
      responsive: [{
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: "unslick"
        }
      ]
    });
  }

  // modal

  var custom_modal = $(".custom_modal");

  var modal_close_span = $(".close")[0];

  $('.modal_link').on("click", function(e) {
    e.preventDefault();
    $('body').toggleClass('modal_active');
    return false;
  });

  $('.modal_close').on("click", function(e) {
    e.preventDefault();
    $('body').removeClass('modal_active');
  });

  $(window).on('click', function(event) {
    if (event.target.classList.contains('custom_modal')) {
      $('body').removeClass('modal_active');
    }
  });

  // accordion jquery
  $('.accordion_answer:first').show();
  $('.accordion_question:first').addClass('expanded');

  $('.accordion_question').on('click', function() {
    var answer = $(this).next();

    $('.accordion_answer').not(answer).slideUp(400);
    $('.accordion_question').not(this).removeClass('expanded');
    $(this).toggleClass('expanded');
    answer.slideToggle(400);
  });

  // tab
  $(document).ready(function() {

    $(".tabs .tabs_list li a").click(function(e) {
      e.preventDefault();
    });

    $(".tabs .tabs_list li a").click(function() {
      var tabid = $(this).attr("href");
      console.log(tabid);
      $(this).parent('li').parent('.tabs_list').parent('.tabs').find('.tab').removeClass("active");
      $(this).parent('li').parent('.tabs_list').find('a').removeClass("active");
      $(this).parent('li').parent('.tabs_list').parent('.tabs').find('.tab').fadeOut();
      $(tabid).fadeIn();
      $(tabid).addClass('active');
      $(this).addClass("active");
    });

  });

  function aos_init() {
    AOS.init();
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);