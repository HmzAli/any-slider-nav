import { error } from '../utils';

import { DotSliderControl } from './dot-slider-control';

/**
 * Creates one to many slider controls based on type and slider config
 *
 * @param {string} type The control type e.g. arrow, dots, etc
 * @param {SliderConfig} sliderConfig object representing the slider's current configurations
 * @return {Array} A list of controllers of type
 */
export default (type, sliderConfig) => {
    let controls = [];

    if (!type) {
        error(`${type} is not a valid control type`);
    }

    if (!sliderConfig) {
        error(`No slider config given. A config is required to properly create controls`);
    }

    if (type == 'dots') {
        const totalSlides = sliderConfig.totalSlides;

        /* Typically, the number of slides to scroll shouldn't be larger than the total slide count */
        const slidesToScroll = sliderConfig.slidesToScroll <= sliderConfig.totalSlides ? sliderConfig.slidesToScroll : sliderConfig.totalSlides;

        const slidesToSkip = slidesToScroll > 1 ? slidesToScroll - 1 : 0;

        const totalDots = Math.ceil(totalSlides / slidesToScroll);
        for (let i = 0; i < totalDots; i++) {
            controls.push(new DotSliderControl(i, slidesToSkip));
        }
    }

    return controls;
}