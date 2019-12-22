import * as $ from 'jquery';
import 'slick-carousel';

/**
 * NOTE: slider object should be a singleton so that multiple navs can subscribe to it
 */

export class SliderAdapter {
    constructor ($slider, currentSlide, totalSlides) {
        this.$slider = $slider;
        this._currentSlide = currentSlide;
        this._totalSlides = totalSlides;
        this.observers = [];
    }

    set currentSlide(slide) {
        this._currentSlide = slide;
    }

    set totalSlides(total) {
        this._totalSlides = total;
    }

    get currentSlide() {
        return this._currentSlide;
    }

    get totalSlides() {
        return this._totalSlides;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        // removing the observer here, TODO: look into creating observer interface
    }

    update(currentSlide, totalSlides) {
        this._currentSlide = currentSlide;
        this._totalSlides = totalSlides;

        this.observers.forEach(observer => observer.update(this));
    }

    /**
     *
     * This method calls the slick slider API to update its state based on this slider
     */
    updateSlider(activeControl) {
        this.$slider.slick('slickGoTo', activeControl.index);
    }

    static create(selector, library) {
        if (library == 'slick') {
            let $slick = $(selector);
            let slickObject = $slick.slick('getSlick');
            let sliderAdapter = new SliderAdapter($slick, slickObject.currentSlide, slickObject.slideCount);

            $slick.on('afterChange', (event, slick) => {
                sliderAdapter.update(slick.currentSlide, slick.slideCount);
            });
            return sliderAdapter;
        }

        throw new Error(`Library ${library} not supported`);
    }
}