/**
 * Represents a slider control
 */
export default class SliderControl {
    constructor () {
        this.$element = document.createElement('div');
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeAllObservers() {
        this.observers = [];
    }
}