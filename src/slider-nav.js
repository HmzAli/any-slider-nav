import { Slider } from "./slider";
import { SliderControl } from "./slider-control";

/**
 * Slider controls observe slider navs, and slider navs observe sliders (or the wrappers for the actual slides)
 */

export class SliderNav {
    constructor (selector, sliderSelector) {
        if (!!this.getElement(selector)) {
            throw new Error(`Unable to instantiate SliderNav. ${selector} is not found.`);
        }
        this.createControls();
        this.createSlider(sliderSelector);
    }

    getElement(selector) {
        this._$element = document.querySelector(selector);
        return !!this._$element;
    }

    createSlider(selector) {
        /**
         * Creates an object that represents the target slider, then observe it for any updates
         */
        this.slider = Slider.create(this, selector, 'slick');
        this.slider.addObserver(this);
    }

    createControls() {
        for (let i = 0; i <= this.slider.totalSlides; i++) {
            let control = SliderControl.create(i);
            this.controls.push(control);
            this._$element.appendChild(control._$element);
        }
    }

    update(slider) {
        /**
         * Notify controls of slider updates
         */
        this.slider = slider;

        this.controls.forEach(control => control.update(slider));
    }
}