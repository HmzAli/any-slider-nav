import * as $ from 'jquery';
import AnySliderNav from './asn';

/**
 * 1. The main module should be instantiated ONCE only
 * 2. The number of controls created by the SliderNav should be based on slider's config, not just the total number of slides
 *    For slick adapter, use this formula: Math.ceil(slideCount / slidesToShow)
 * 3. Adapter's logic needs refactoring
 */

$(document).ready(() => {
    $('.slick-slider-1').slick({
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    });

    $('.slick-slider-2').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
    });

    AnySliderNav.init();
    AnySliderNav.init();
});