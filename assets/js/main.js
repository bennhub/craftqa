
var $ = jQuery.noConflict();

$(document).ready(function($) {
    "use strict";

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

    if ($('.caption-slides').length) {
        $('.caption-slides').bxSlider({
            pager: false,
            mode: 'fade',
            adaptiveHeight: true,
            controls: false,
            auto: true,
            pause: 8000
        });
    }

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
        Skills bar
    =============================================== */

        $('.progress-bar').each(function(i) {
            $(this).appear(function() {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({'width' : percent + '%'});
            });
        });

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

});

$(window).load(function(){
    "use strict";

    /* ==============================================
    Preloader
    =============================================== */

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");

});

