/*
	Salient by TEMPLATE STOCK
	templatestock.co @templatestock
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

var $ = jQuery.noConflict();

$(document).ready(function($) {
    "use strict";

    /* global google: false */

    /* ==============================================
        Full height home-section
    =============================================== */

	var windowHeight = $(window).height(),
		topSection = $('#hero-section');
	topSection.css('height', windowHeight);

	$(window).resize(function(){
		var windowHeight = $(window).height();
		topSection.css('height', windowHeight);
	});

    /* ==============================================
        Collapse menu on click
    =============================================== */

        $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
            if($(window).width() < 768 )
                $('.navbar-collapse').collapse('hide');
        });

    /* ==============================================
        Scrollspy
    =============================================== */

        $('body').scrollspy({
           target: '#navigation-nav',
           offset: 140      //px/
        });

    /* ==============================================
        Parallax
    =============================================== */

    $.stellar({
        responsive: true,
        horizontalScrolling: false,
        verticalOffset: 0
    });

    /* ==============================================
        Hero slider
    =============================================== */

    $('.caption-slides').bxSlider({
      pager: false,
      mode: 'fade',
      adaptiveHeight: true,
      controls: false,
      auto: true
    });

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
                  scrollTop: target.offset().top -66
            }, 1000);
            return false;
          }
        }
    });

    /* ==============================================
     Bootstrap Tooltip
    =============================================== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* ==============================================
        Counter increment
    =============================================== */

    function countUp() {
        var dataperc;
        $('.statistic-percent').each(function(){
            dataperc = $(this).attr('data-perc'),
            $(this).find('.percentfactor').delay(6000).countTo({
                from: 0,                 // number to begin counting
                to: dataperc,
                speed: 1000,             // ms
                refreshInterval: 10,
            });
        });
    }

    $('.statistic-percent').waypoint(function() {
        countUp();
    },
    {
        offset: '95%',
        triggerOnce: true
    });

    /* ==============================================
        Skills bar
    =============================================== */

        $('.progress-bar').each(function(i) {
            $(this).appear(function() {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({'width' : percent + '%'});
            });
        });

    /* ==============================================
    Placeholder
    =============================================== */

    $('input, textarea').placeholder();

    /* ==============================================
        Animated content
    =============================================== */

    $('.animated').appear(function(){
        var el = $(this);
        var anim = el.data('animation');
        var animDelay = el.data('delay');
        if (animDelay) {

            setTimeout(function(){
                el.addClass( anim + " in" );
                el.removeClass('out');
            }, animDelay);

        }

        else {
            el.addClass( anim + " in" );
            el.removeClass('out');
        }
    },{accY: -150});


    /* ==============================================
        MailChip
    =============================================== */

    $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        url: "http://clas-design.us10.list-manage.com/subscribe/post?u=5ca5eb87ff7cef4f18d05e127&amp;id=9c23c46672" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
    });

    function mailchimpCallback(resp) {
         if (resp.result === 'success') {
            $('.subscription-success').html('<span class="icon-happy"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);

        } else if(resp.result === 'error') {
            $('.subscription-error').html('<span class="icon-sad"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-success').fadeOut(500);
        }
    }


    /* ==============================================
    Contact Form
    =============================================== */

    $('#contactform').submit(function(){

        var action = $(this).attr('action');

        $("#alert").slideUp(750,function() {
            $('#alert').hide();

        $('#submit')
            .after('<img src="../images/ajax-loader.GIF" class="contactloader" />')
            .attr('disabled','disabled');

        $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        },
            function(data){
                document.getElementById('alert').innerHTML = data;
                $('#alert').slideDown('slow');
                $('#contactform img.contactloader').fadeOut('slow',function(){$(this).remove();});
                $('#submit').removeAttr('disabled');
                if(data.match('success') !== null) {
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');
                }
            }
        );

        });

        return false;

    });

    // Countdown
    // To change date, simply edit: var endDate = "June 26, 2015 20:39:00";
    $(function() {
      var endDate = "June 26, 2016 20:39:00";
      $('.soon-countdown .row').countdown({
        date: endDate,
        render: function(data) {
          $(this.el).html('<div><div><span>' + (parseInt(this.leadingZeros(data.years, 2)*365) + parseInt(this.leadingZeros(data.days, 2))) + '</span><span>days</span></div><div><span>' + this.leadingZeros(data.hours, 2) + '</span><span>hours</span></div></div><div class="lj-countdown-ms"><div><span>' + this.leadingZeros(data.min, 2) + '</span><span>minutes</span></div><div><span>' + this.leadingZeros(data.sec, 2) + '</span><span>seconds</span></div></div>');
        }
      });
    });


    /* ==============================================
    Fade In .back-to-top
    =============================================== */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        }, 750);
        return false;
    });

    /* ==============================================
        Google Map
    =============================================== */

        var mapLocation = new google.maps.LatLng(34.031428,-118.2071542,17);
        var $mapis = $('#map');
        if ($mapis.length > 0) {
            var map;
            map = new GMaps({
                streetViewControl : true,
                overviewMapControl: true,
                mapTypeControl: true,
                zoomControl : true,
                panControl : true,
                scrollwheel: false,
                center: mapLocation,
                el: '#map',
                zoom: 16,
                styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
            });
            var image = new google.maps.MarkerImage('../images/map-icon.png');
            map.addMarker({
                position: mapLocation,
                icon: image,
                title: 'Visia',
                infoWindow: {
                    content: '<p><strong>Visia</strong><br/>121 Somewhere Ave, Suite 123<br/>P: (123) 456-7890<br/>Australia</p>'
                }
            });
        }

    /* ==============================================
     BX-Project Slider
    =============================================== */

        $(".project-slider").bxSlider({
            pager: false,
            controls: true,
            auto: true,        // Boolean:  (true/false)
            speed: 500,        // Animation speed.
            pause: 5000,      // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            useCSS: false     // Boolean:  (true/false)
        });

    /* ==============================================
     BX-Project Slider
    =============================================== */

        $(".blog-slider").bxSlider({
            pager: false,
            controls: true,
            auto: true,        // Boolean:  (true/false)
            speed: 500,        // Animation speed.
            pause: 5000,      // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            useCSS: false     // Boolean:  (true/false)
        });

    /* ==============================================
     BX-Slider Tweet&Process
    =============================================== */


        $('.tweet-slider').bxSlider({
          adaptiveHeight: true,
          controls: false,
          auto: true
        });

    /* ==============================================
        BxSlider Testimonial
    =============================================== */

    $(".testimonials-slider").bxSlider({
        nextSelector: ".tc-arrows .tc-arrow-right",
        prevSelector: ".tc-arrows .tc-arrow-left",
        nextText: "<i class='fa fa-angle-right'></i>",
        prevText: "<i class='fa fa-angle-left'></i>",
        pager: false,
        auto: true,          // Boolean:  (true/false)
        pause: 5000,         // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
        mode: 'vertical',    // Choose fade, slide
        useCSS: false        // Boolean:  (true/false)
    });

   /* ==============================================
       Video Gallery
    =============================================== */
// Check if on mobile device

$(document).ready(function () {
    $(".video-gallery").magnificPopup({
      delegate: "a",
      type: "iframe",
      gallery: {
        enabled: true
      },
      callbacks: {
        open: function () {
          // Disable scrolling on the body when the popup is open
          $("body").addClass("mfp-open");
        },
        close: function () {
          // Re-enable scrolling on the body when the popup is closed
          $("body").removeClass("mfp-open");
        }
      }
    });
  });

  $(".video-gallery a").on("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
  });

  var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}





    /* ==============================================
        OWL Carousel
    =============================================== */

        $(".owl-carousel").owlCarousel({

            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 4,
            itemsDesktop : [1199,3], //number of items displayed on resolution less then 1199px
            itemsDesktopSmall : [979,3] //number of items displayed on resolution less then 979px

        });

    /* ==============================================
        Responsive video
    =============================================== */

        $(".project-video, .video-creative, .video-post").fitVids();


    /* ==============================================
        MagnificPopup - lightbox effect
    =============================================== */

        // Example with multiple objects
        $('.zoom').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        $('.video-pop-up').magnificPopup({
            type: 'iframe',
        });

    /* ==============================================
        OWL Carousel (initialize screenshot carousel)
    =============================================== */

    $(".screenshots-carousel").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds

        items : 5,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]

    });

});

$(window).load(function(){
    "use strict";

    /* ==============================================
    Isotope
    =============================================== */

        // FIlter
        if( $("#filter").length>0 ) {
            var container = $('#filter');
            container.isotope({
                itemSelector: '.gallery-item',
                transitionDuration: '0.8s'
            });
            $(".filter").click(function(){
                $(".filter.active").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                container.isotope({
                    filter: selector
                });
                return false;
            });

            $(window).resize(function(){
                setTimeout(function(){
                    container.isotope();
                },1000);
            }).trigger('resize');
        }


            if ( $('#type-masory').length ) {

            var $container = $('#type-masory');

            $container.imagesLoaded( function(){
              $container.fadeIn(1000).isotope({
                itemSelector : '.masonry-item'
              });
            });
        }

    /* ==============================================
    Preloader
    =============================================== */

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");

});