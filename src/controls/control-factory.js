import { error } from '../utils';

import { DotSliderControl } from './slider-control';

/**
 * Creates one to many slider controls based on type and slider config
 *
 * @param {string} type The control type e.g. arrow, dots, etc
 * @param {SliderConfig} sliderConfig object representing the slider's current configurations
 * @return {Array} A list of controllers of type
 */
export default (navConfig, sliderConfig) => {
    const types = ['arrow', 'dots'];
    let type = navConfig.type;
    if (!types.find(t => t == type)) {
        error(`${type} is not a valid control type`);
    }

    if (!sliderConfig) {
        error(`No slider config given. A config is required to create controls`);
    }

    let controls = [];

    if (type == 'dots') {
        const totalSlides = sliderConfig.totalSlides;

        /* Typically, the number of slides to scroll shouldn't be larger than the total slide count */
        const slidesToScroll = sliderConfig.slidesToScroll <= sliderConfig.totalSlides ? sliderConfig.slidesToScroll : sliderConfig.totalSlides;

        const slidesToSkip = slidesToScroll > 1 ? slidesToScroll - 1 : 0;

        const totalDots = Math.ceil(totalSlides / slidesToScroll);
        for (let i = 0; i < totalDots; i++) {
            controls.push(new DotSliderControl(navConfig, i, slidesToSkip));
        }
    }

    return controls;
}