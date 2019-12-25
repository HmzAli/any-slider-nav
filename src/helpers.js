class Slider {
    constructor(selector, library, adapter) {
        this.selector = selector;
        this.library = library;
        this.adapter = adapter;
    }
}

export class SliderManager {
    constructor () {
        this.sliders = [];
    }

    add(selector, library, adapter) {
        this.sliders.push(new Slider(selector, library, adapter))
    }

    getAdapter(selector, library) {
        let slider = this.sliders.find(slider => slider.selector == selector && slider.library == library);

        if (!!slider) {
            return slider.adapter;
        }
        return null;
    }
}