import SliderControl from './slider-control';

/**
 * Represent a dot slider control of type SliderControl
 *
 * @constructor
 * @param {number} index determines the dot's position in the parent element
 * @param {number} indexsToSkip the number of indexes to skip before assigning the index to the dot
 */
export class DotSliderControl extends SliderControl {
    constructor(index, indexStep) {
        super();
        this.$element.classList.add('sn-dot');
        this.setIndex(index, indexStep);

        this.$element.addEventListener('click', () => {
            this.observers.forEach(observer => observer.updateSlider(this.index));
        });
    }

    /**
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