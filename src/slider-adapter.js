/**
 *
 * Adapters representing a slider
 */
export default class SliderAdapter {
    constructor ($slider, currentSlide, sliderConfig) {
        this.$slider = $slider;
        this.currentSlide = currentSlide;
        this.sliderConfig = sliderConfig;
        this.observers = [];
    }

    /**
     *
     * @param {object} observer an object implementing Observer interface
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
}