import * as $ from 'jquery';
/**
 * NOTE: slider object should be a singleton so that multiple navs can subscribe to it
 */

export class Slider {
    constructor (currentSlide, totalSlides) {
        this._currentSlide = currentSlide;
        this._totalSlides = totalSlides;
        this.observers = [];
    }

    set currentslide(slide) {
        this._currentSlide = slide;
    }

    set totalSlides(total) {
        this._totalSlides = total;
    }

    get currentslide() {
        return this._currentSlide;
    }

    get totalSlides() {
        return this._totalSlides;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        // removing the observer here
    }

    update(currentSlide, totalSlides) {
        this.currentSlide = currentSlide;
        this.totalSlides = totalSlides;

        this.observers.forEach(observer => observer.update(this));
    }

    static create(selector, type) {
        if (type == 'slick') {
            let slider = $(selector).slick('getSlick');
            return new Slider(slider.currentSlide, slider.slideCount);
        }
    }
}