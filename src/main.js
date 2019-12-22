import * as $ from 'jquery';
import 'slick-carousel';

import { SliderNav } from './slider-nav';

$(document).ready(() => {
    $('.slider').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
    });

    let nav1 = document.querySelectorAll('[data-sn-slider]')[0];
    let nav2 = document.querySelectorAll('[data-sn-slider]')[1];

    new SliderNav(nav1, '.slick-slider-1', 'slick');
    new SliderNav(nav2, '.slick-slider-2', 'slick');
});


// document.querySelectorAll('[data-sn-slider]');
