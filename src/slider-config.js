/**
 * Represents a slider configuration
 */
export default class SliderConfig {
    constructor(totalSlides, slidesToShow, slidesToScroll) {
        this.totalSlides = totalSlides;
        this.slidesToShow = slidesToShow;
        this.slidesToScroll = slidesToScroll;
    }
}