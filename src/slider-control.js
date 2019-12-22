export class SliderControl {
    constructor ($element, index) {
        this.$element = $element;
        this._index = index;
        this.observers = [];

        this.$element.addEventListener('click', () => {
            this.observers.forEach(observer => observer.updateSlider(this));
        });
    }

    set index(index) {
        this._index = index
    }

    get index() {
        return this._index;
    }

    get element() {
        return this.$element
    }

    update(slider) {
        slider.currentSlide == this._index ? this.activate() : this.deactivate();
    }

    addObserver(observer) {
        this.observers.push(observer);
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

    static create(index) {
        let element = document.createElement('div');
        element.classList.add('sn-dot');
        return new SliderControl(element, index);
    }
}