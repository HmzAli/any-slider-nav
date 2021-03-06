import { error } from './utils';

import { SliderNav } from './slider-nav';

class NavConfig {
    constructor($nav) {
        this.slider = ''; // Required
        this.type = 'dots';
        this.library = '';  // Required
        this.class = '';
        this.$slider = '';
        this.sliderSelector = '';

        NavConfig.attributeNames.forEach(attribute => {
            let key = attribute.split('-').pop();
            let value = $nav.getAttribute(attribute) || '';
            this[key] = value;
        });

        if (!this.slider) {
            error(`'slider' attribute is required to identify the slider`);
        }

        if (!this.library) {
            error(`'library' attribute is is required to identify the library used for the slider`);
        }

        this.$slider = document.querySelector(this.slider);
        if (!this.$slider) {
            throw new Error(`No element exists with the selector ${sliderSelector}`);
        }
        this.sliderSelector = this.slider;
    }

    static get initAttribute() {
        return 'data-asn-slider';
    }

    static get attributeNames() {
        return [
            'data-asn-slider',
            'data-asn-type',
            'data-asn-library',
            'data-asn-class',
        ];
    }
}

export default class AnySliderNav {
    constructor() {
        document.querySelectorAll(`[${NavConfig.initAttribute}]`)
            .forEach($nav => {
                new SliderNav($nav, new NavConfig($nav));
            });
    }

    static init() {
        if (window.anySliderNav) {
            return window.anySliderNav;
        }
        window.anySliderNav = new AnySliderNav();
    }
}
