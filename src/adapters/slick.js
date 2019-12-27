import * as $ from 'jquery';
import 'slick-carousel';

import SliderAdapter from '../slider-adapter';
import SliderConfig from '../slider-config';

export default class SlickAdapter extends SliderAdapter {
    constructor($slick, slickObject, sliderConfig) {
        super($slick, slickObject, sliderConfig);
    }

    /**
     *
     * Calls the slider API to update its state based on the params
     */
    updateSlider(nextSlide) {
        this.$slider.slick('slickGoTo', nextSlide);
    }

    static getResponsiveSettings({ breakpointSettings, slideCount, options }) {
        /* Default settings */
        let responsiveSettings = {
            slideCount: slideCount,
            slidesToShow: options.slidesToShow,
            slidesToScroll: options.slidesToScroll
        };

        if (breakpointSettings.length) {
            let screenWidth = window.innerWidth;

            /* Reverse keys to start from the largest breakpoint */
            Object.keys(breakpointSettings).reverse().forEach(breakpoint => {
                if (screenWidth <= Number(breakpoint)) {
                    responsiveSettings.slidesToShow = breakpointSettings[breakpoint].slidesToShow;
                    responsiveSettings.slidesToScroll = breakpointSettings[breakpoint].slidesToScroll;
                }
            });
        }
        return responsiveSettings;
    }

    static create(selector) {
        let $slick = $(selector);
        let slickObject = $slick.slick('getSlick');
        let settings = SlickAdapter.getResponsiveSettings(slickObject);
        let sliderConfig = new SliderConfig(
            settings.slideCount,
            settings.slidesToShow,
            settings.slidesToScroll
        );

        let slickAdapter = new SlickAdapter(
            $slick,
            slickObject.currentSlide,
            sliderConfig
        );

        $slick.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            slickAdapter.update(nextSlide);
        });
        return slickAdapter;
    }
}