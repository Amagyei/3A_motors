import { ProgressBar } from '../../progressbar';
import { ProgressLocation } from '../utils/helper';
/**
 * Progressbar of type circular
 */
export declare class Circular {
    private progress;
    delay: number;
    private segment;
    private animation;
    private isRange;
    private centerX;
    private centerY;
    private maxThickness;
    private availableSize;
    private trackEndAngle;
    endPosition: ProgressLocation;
    bufferEndPosition: ProgressLocation;
    constructor(progress: ProgressBar);
    /**
     * To render the circular track.
     *
     * @returns {void}
     */
    renderCircularTrack(): void;
    /**
     * Renders circular progress to update previous progress.
     *
     * @param {number} previousEnd - The previous end value of the progress.
     * @param {number} previousTotalEnd - The previous total end value of the progress.
     * @param {boolean} refresh - Indicates whether to refresh the progress.
     * @returns {void}
     */
    renderCircularProgress(previousEnd?: number, previousTotalEnd?: number, refresh?: boolean): void;
    /**
     * Renders circular buffer for the progress bar.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} radius - The radius of the circular buffer.
     * @param {number} progressTotalAngle - The total angle covered by the progress.
     * @returns {void}
     * @private
     */
    private renderCircularBuffer;
    /**
     * To render the circular Label.
     *
     * @param {boolean} isProgressRefresh - Indicates whether progress should be refreshed. Defaults to false.
     * @returns {void}
     */
    renderCircularLabel(isProgressRefresh?: boolean): void;
    /**
     * Renders the active state of the circular progress.
     *
     * @param {Element} progressGroup - The group element containing the progress.
     * @param {number} radius - The radius of the circular progress.
     * @param {number} strokeWidth - The width of the progress stroke.
     * @param {string} circularPath - The path representing the circular progress.
     * @param {number} endAngle - The angle at which the progress ends.
     * @param {number} totalEnd - The total end value of the progress.
     * @param {boolean} refresh - Indicates whether the progress should be refreshed.
     * @returns {void}
     * @private
     */
    private renderActiveState;
    /**
     * Validates the segment size for the progress bar.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} thickness - The thickness of the progress segments.
     * @returns {string} - The validated segment size.
     * @private
     */
    private validateSegmentSize;
    /**
     * Checks and retrieves the color for the circular progress.
     *
     * @returns {string} - The color for the circular progress.
     * @private
     */
    private checkingCircularProgressColor;
}
