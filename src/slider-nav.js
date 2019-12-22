import { SliderAdapter } from "./slider-adapter";
import { SliderControl } from "./slider-control";

/**
 * Slider controls observe slider navs, and slider navs observe sliders (or the wrappers for the actual slides)
 */

export class SliderNav {
    constructor ($element, selector, library) {
        if (!$element) {
            throw new Error(`Unable to instantiate SliderNav. Nav element not found.`);
        }

        this.library = library;
        this.$element = $element;
        this.sliderAdapter = SliderAdapter.getOrCreate(selector, this.library);
        this.sliderAdapter.addObserver(this);
        this.createControls();
    }

    createControls() {
        this.controls = [];

        for (let i = 0; i < this.sliderAdapter.totalSlides; i++) {
            let control = SliderControl.create(i);
            control.addObserver(this.sliderAdapter);
            this.controls.push(control);
            this.$element.appendChild(control.$element);
        }

        this.update(this.sliderAdapter);
    }

    /**
     * Notify controls of slider updates
     */
    update(sliderAdapter) {
        this.sliderAdapter = sliderAdapter;
        this.controls.forEach(control => control.update(sliderAdapter));
    }
}