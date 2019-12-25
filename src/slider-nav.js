import { SliderAdapter } from './slider-adapter';
import createControls from './controls/control-factory';

/**
 * @class Represents a slider navigation element
 *
 * This class does the following:
 *
 * - Binds itself to the element (to be) used as a nav for the slider
 * - Requests for a new (or existing) slider adapter based on the specified selector and library
 * - Add controls (of the specified config) to its element
 * - Make the adapter and each control observe each other for changes: SliderAdapter <-> SliderControl
 * - Notify controls of the initial adapter state (since controls belong to the nav, they are observers of it by default)
 *
 * @constructor
 * @param {HTMLElement} $element the element used as a nav
 * @param {NavConfig} navConfig
 *
 */
export class SliderNav {
    constructor ($element, navConfig) {
        this.navConfig = navConfig;
        this.$element = $element;
        this.sliderAdapter = SliderAdapter.getOrCreate(navConfig);
        this.addControls();
    }

    addControls() {
        this.controls = [].concat(createControls(this.navConfig.type, this.sliderAdapter.sliderConfig));
        this.controls.forEach(control => {
            control.addObserver(this.sliderAdapter);
            this.sliderAdapter.addObserver(control);
            this.$element.appendChild(control.$element);
        });

        this.initControls();
    }

    initControls() {
        this.controls.forEach(control => control.update(this.sliderAdapter));
    }
}
