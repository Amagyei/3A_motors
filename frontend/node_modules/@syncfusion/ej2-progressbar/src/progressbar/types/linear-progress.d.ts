import { ProgressBar } from '../../progressbar';
/**
 * Progress Bar of type Linear
 */
export declare class Linear {
    private progress;
    delay: number;
    private segment;
    private animation;
    private isRange;
    linearProgressWidth: number;
    bufferWidth: number;
    constructor(progress: ProgressBar);
    /**
     * To render the linear track.
     *
     * @returns {void}
     */
    renderLinearTrack(): void;
    /**
     * Renders linear progress, optionally refreshing progress and specifying previous width.
     *
     * @param {boolean} refresh - Indicates whether to refresh the progress.
     * @param {number} previousWidth - The previous width of the progress. Defaults to 0.
     * @returns {void}
     */
    renderLinearProgress(refresh?: boolean, previousWidth?: number): void;
    /**
     * To render the linear buffer.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @returns {void}
     */
    private renderLinearBuffer;
    /**
     * Render the Linear Label.
     *
     * @param {boolean} isProgressRefresh - Indicates whether the progress should be refreshed. Defaults to false.
     * @returns {void}
     */
    renderLinearLabel(isProgressRefresh?: boolean): void;
    /**
     * Renders the active state of the linear progress.
     *
     * @param {Element} progressGroup - The group element containing the progress.
     * @param {number} progressWidth - The width of the progress.
     * @param {number} linearProgressWidth - The width of the linear progress.
     * @param {number} thickness - The thickness of the progress.
     * @param {boolean} refresh - Indicates whether the progress should be refreshed.
     * @returns {void}
     * @private
     */
    private renderActiveState;
    /**
     * Renders the linear progress with stripes.
     *
     * @param {string} color - The color of the progress stripes.
     * @param {Element} group - The group element containing the progress.
     * @param {ProgressBar} progress - The progress bar control.
     * @returns {void}
     * @private
     */
    private renderLinearStriped;
    /**
     * Checks and retrieves the color for the linear progress.
     *
     * @returns {string} - The color for the linear progress.
     * @private
     */
    private checkingLinearProgressColor;
    /**
     * Generates the SVG path string with rounded corners.
     *
     * @param {number} x - The x-coordinate of the starting point.
     * @param {number} y - The y-coordinate of the starting point.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {number} radius - The radius of the rounded corners.
     * @param {string} pathtype - The type of SVG path ('M' for move to, 'L' for line to).
     * @returns {string} - The SVG path string with rounded corners.
     * @private
     */
    private cornerRadius;
    /**
     * Creates a round-corner segment element for the progress bar.
     *
     * @param {string} id - The id of the segment element.
     * @param {string} stroke - The stroke color of the segment.
     * @param {number} thickness - The thickness of the segment.
     * @param {boolean} isTrack - Indicates whether the segment is a track.
     * @param {number} progressWidth - The width of the progress.
     * @param {ProgressBar} progress - The progress bar control.
     * @param {number} opacity - The opacity of the segment.
     * @returns {Element} - The created round-corner segment element.
     */
    createRoundCornerSegment(id: string, stroke: string, thickness: number, isTrack: boolean, progressWidth: number, progress: ProgressBar, opacity?: number): Element;
}
