export class SliderControl {
    constructor ($element, index) {
        this._$element = $element;
        this._index = index;
    }

    set index(index) {
        this._index = index
    }

    get element() {
        return this._$element
    }

    update(slider) {
        slider.currentSlide == index ? this.activate() : this.deactivate();
    }

    activate() {
        if (!this._$element.classList.contains('active')) {
            this._$element.classList.add('active');
        }
    }

    deactivate() {
        if (this._$element.classList.contains('active')) {
            this._$element.classList.remove('active');
        }
    }

    static create(index) {
        let element = document.createElement('div');
        element.classList.add('sn-dot');
        return new SliderControl(element, index);
    }
}