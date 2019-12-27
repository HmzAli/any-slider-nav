import SlickAdapter from './adapters/slick';
import BootstrapAdapter from './adapters/bootstrap';

const ADAPTERS = {
    'slick': SlickAdapter,
    'bootstrap': BootstrapAdapter
};

class Slider {
    constructor(selector, library, adapter) {
        this.selector = selector;
        this.library = library;
        this.adapter = adapter;
    }
}

/**
 * Responsible for creating, fetching and managing adapter instances for sliders
 */
class AdapterManager {
    constructor () {
        this.sliders = [];
    }

    getAdapter(selector, library) {
        let slider = this.sliders.find(slider => slider.selector == selector && slider.library == library);

        if (!!slider) {
            return slider.adapter;
        }
        return null;
    }

    /**
     *
     * Fetches or creates a concrete adapter that extends SliderAdapter interface
     *
     * @param {NavConfig}
     */
    getOrCreate(navConfig) {
        const selector = navConfig.sliderSelector;
        const library = navConfig.library || navConfig.library.toLowerCase();

        let existingAdapter = this.getAdapter(selector, library);
        if (!!existingAdapter) {
            return existingAdapter;
        }

        if (!library) {
            throw new Error('${library} is not a valid library');
        }
        if (!ADAPTERS.hasOwnProperty(library)) {
            throw new Error(`Library ${library} not supported`);
        }
        let newAdapter = ADAPTERS[library].create(selector);

        this.sliders.push(new Slider(selector, library, newAdapter));

        return newAdapter;
    }
}

export default new AdapterManager();
