import * as $ from 'jquery';
import 'popper.js/dist/popper';
import 'bootstrap/dist/js/bootstrap';

import AnySliderNav from '../src/asn';

$(document).ready(() => {
    $('.slick-slider').slick({
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    $('.bootstrap-carousel').carousel({
        interval: 2000
    });

    AnySliderNav.init();
});