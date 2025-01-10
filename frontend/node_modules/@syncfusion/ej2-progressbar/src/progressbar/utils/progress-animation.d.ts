import { ProgressBar } from '../progressbar';
/**
 * Animation for progress bar
 */
export declare class ProgressAnimation {
    /**
     * Performs linear animation on the specified element.
     *
     * @param {Element} element - The HTML element to animate.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} delay - The delay before starting the animation, in milliseconds.
     * @param {number} previousWidth - The previous width of the progress.
     * @param {Element} active - The active element to control the animation.
     * @returns {void}
     */
    doLinearAnimation(element: Element, progress: ProgressBar, delay: number, previousWidth?: number, active?: Element): void;
    /**
     * Initiates linear animation for an indeterminate progress bar.
     *
     * @param {Element} element - The HTML element representing the progress bar.
     * @param {number} progressWidth - The width of the progress bar.
     * @param {number} thickness - The thickness of the progress bar.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {Element} clipPath - The SVG clip path element to control the animation.
     * @returns {void}
     */
    doLinearIndeterminate(element: Element, progressWidth: number, thickness: number, progress: ProgressBar, clipPath: Element): void;
    /**
     * Performs striped animation on the specified element.
     *
     * @param {Element} element - The HTML element to animate.
     * @param {ProgressBar} progress - The progress bar object.
     * @param {number} value - The value indicating the progress of the animation.
     * @returns {void}
     */
    doStripedAnimation(element: Element, progress: ProgressBar, value: number): void;
    /**
     * Initiates circular animation on the specified element.
     *
     * @param {number} x - The x-coordinate of the center of the circle.
     * @param {number} y - The y-coordinate of the center of the circle.
     * @param {number} radius - The radius of the circle.
     * @param {number} progressEnd - The end value of the progress.
     * @param {number} totalEnd - The total end value of the progress.
     * @param {Element} element - The HTML element representing the circular progress.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} thickness - The thickness of the circular progress.
     * @param {number} delay - The delay before starting the animation, in milliseconds.
     * @param {number} startValue - The starting value of the progress.
     * @param {number} previousTotal - The previous total value of the progress.
     * @param {Element} active - The active element to control the animation.
     * @returns {void}
     */
    doCircularAnimation(x: number, y: number, radius: number, progressEnd: number, totalEnd: number, element: Element, progress: ProgressBar, thickness: number, delay: number, startValue?: number, previousTotal?: number, active?: Element): void;
    /**
     * Initiates circular animation for an indeterminate progress bar.
     *
     * @param {Element} circularProgress - The HTML element representing the circular progress bar.
     * @param {ProgressBar} progress - The progress bar object.
     * @param {number} start - The starting value of the progress.
     * @param {number} end - The ending value of the progress.
     * @param {number} x - The x-coordinate of the center of the circle.
     * @param {number} y - The y-coordinate of the center of the circle.
     * @param {number} radius - The radius of the circle.
     * @param {number} thickness - The thickness of the circular progress bar.
     * @param {Element} clipPath - The SVG clip path element to control the animation.
     * @returns {void}
     */
    doCircularIndeterminate(circularProgress: Element, progress: ProgressBar, start: number, end: number, x: number, y: number, radius: number, thickness: number, clipPath: Element): void;
    /**
     * Initiates label animation for a progress bar.
     *
     * @param {Element} labelPath - The SVG path element representing the label.
     * @param {number} start - The starting value of the progress.
     * @param {number} end - The ending value of the progress.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} delay - The delay before starting the animation, in milliseconds.
     * @param {number} textSize - The size of the text.
     * @returns {void}
     */
    doLabelAnimation(labelPath: Element, start: number, end: number, progress: ProgressBar, delay: number, textSize?: number): void;
    /**
     * Initiates annotation animation for a circular progress bar.
     *
     * @param {Element} circularPath - The SVG path element representing the circular progress bar.
     * @param {ProgressBar} progress - The progress bar object.
     * @param {number} previousEnd - The previous end value of the progress.
     * @param {number} previousTotal - The previous total value of the progress.
     * @returns {void}
     */
    doAnnotationAnimation(circularPath: Element, progress: ProgressBar, previousEnd?: number, previousTotal?: number): void;
    private activeAnimate;
}
