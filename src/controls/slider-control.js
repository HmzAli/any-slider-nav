/**
 * Represents a slider control
 */
export default class SliderControl {
    constructor (navConfig) {
        this.$element = document.createElement('div');

        if (navConfig.class) {
            this.$element.classList.add(navConfig.class);
        }

        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeAllObservers() {
        this.observers = [];
    }
}


/**
 * Represent a dot slider control of type SliderControl
 *
 * @constructor
 * @param {number} index determines the dot's position in the parent element
 * @param {number} indexsToSkip the number of indexes to skip before assigning the index to the dot
 */
export class DotSliderControl extends SliderControl {
    constructor(navConfig, index, indexStep) {
        super(navConfig);
        this.$element.classList.add('sn-dot');
        this.setIndex(index, indexStep);

        this.$element.addEventListener('click', () => {
            this.observers.forEach(observer => observer.updateSlider(this.index));
        });
    }

    /**
     * @param {NavConfig} navConfig
     * @param {number} index the index identifying the dot's position in the control
     * @param {number} indexsToSkip
     */
    setIndex(index, indexsToSkip) {
        this.index = index == 0 ? 0 : index + indexsToSkip;
    }

    update(sliderAdapter) {
        sliderAdapter.currentSlide == this.index ? this.activate() : this.deactivate();
    }

    activate() {
        if (!this.$element.classList.contains('active')) {
            this.$element.classList.add('active');
        }
    }

    deactivate() {
        if (this.$element.classList.contains('active')) {
            this.$element.classList.remove('active');
        }
    }
}


export class ArrowSliderControl {

}