import * as $ from 'jquery';
import 'slick-carousel';

import { SliderNav } from './slider-nav';

$(document).ready(() => {
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    });

    let nav1 = document.querySelectorAll('[data-sn-slider]')[0];
    let nav2 = document.querySelectorAll('[data-sn-slider]')[1];

    new SliderNav(nav1, '.slider', 'slick');
    new SliderNav(nav2, '.slider', 'slick');
});


// document.querySelectorAll('[data-sn-slider]');