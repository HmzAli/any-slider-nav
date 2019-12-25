import * as $ from 'jquery';
import 'slick-carousel';
import { SliderManager } from './helpers';

/**
 * Represents slider configurations
 */
class SliderConfig {
    constructor(totalSlides, slidesToShow, slidesToScroll) {
        this.totalSlides = totalSlides;
        this.slidesToShow = slidesToShow;
        this.slidesToScroll = slidesToScroll;
    }
}

/**
 * NOTE: slider object should be a singleton so that multiple navs can subscribe to it
 */
export class SliderAdapter {
    constructor ($slider, currentSlide, sliderConfig) {
        this.$slider = $slider;
        this.currentSlide = currentSlide;
        this.sliderConfig = sliderConfig;
        this.observers = [];
    }

    /**
     *
     * @param {object} observer an object subscribed to any event
     */
    addObserver(observer) {
        this.observers.push(observer);
    }

    /**
     *
     * @param {number} currentSlide
     *
     * Notify all observers of the current slider state
     */
    update(currentSlide) {
        this.currentSlide = currentSlide;
        this.observers.forEach(observer => observer.update(this));
    }

    /**
     *
     * Calls the slider API to update its state based on the params
     */
    updateSlider(nextSlide) {
        this.$slider.slick('slickGoTo', nextSlide);
    }

    /**
     *
     * Creates an adapter that implements SliderAdapter interface
     *
     * @param {NavConfig}
     */
    static getOrCreate(navConfig) {
        const selector = navConfig.sliderSelector;
        const library = navConfig.library;
        let existingAdapter = sliderManager.getAdapter(selector, library);
        if (!!existingAdapter) {
            return existingAdapter;
        }

        if (library == 'slick') {
            let $slick = $(selector);
            let slickObject = $slick.slick('getSlick');
            let sliderConfig = new SliderConfig(
                slickObject.slideCount,
                slickObject.options.slidesToShow,
                slickObject.options.slidesToScroll
            );

            let sliderAdapter = new SliderAdapter(
                $slick,
                slickObject.currentSlide,
                sliderConfig
            );

            $slick.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
                sliderAdapter.update(nextSlide);
            });

            sliderManager.add(selector, library, sliderAdapter);
            return sliderAdapter;
        }

        throw new Error(`Library ${library} not supported`);
    }
}

let sliderManager = new SliderManager(); // TODO: This doesn't belong here