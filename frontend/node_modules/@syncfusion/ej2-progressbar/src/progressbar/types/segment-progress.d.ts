import { ProgressBar } from '../progressbar';
/**
 * Progressbar Segment
 */
export declare class Segment {
    /**
     * Creates a linear segment element for the progress bar.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @param {string} id - The id of the segment element.
     * @param {number} width - The width of the segment.
     * @param {number} opacity - The opacity of the segment.
     * @param {number} thickness - The thickness of the segment.
     * @param {number} progressWidth - The width of the progress.
     * @returns {Element} - The created linear segment element.
     */
    createLinearSegment(progress: ProgressBar, id: string, width: number, opacity: number, thickness: number, progressWidth: number): Element;
    private getLinearSegmentPath;
    /**
     * Creates a circular segment element for the progress bar.
     *
     * @param {ProgressBar} progress - The progress bar control.
     * @param {string} id - The id of the segment element.
     * @param {number} x - The x-coordinate of the center of the circle.
     * @param {number} y - The y-coordinate of the center of the circle.
     * @param {number} r - The radius of the circle.
     * @param {number} value - The value determining the angle of the segment.
     * @param {number} opacity - The opacity of the segment.
     * @param {number} thickness - The thickness of the segment.
     * @param {number} totalAngle - The total angle covered by the progress.
     * @param {number} progressWidth - The width of the progress.
     * @returns {Element} - The created circular segment element.
     */
    createCircularSegment(progress: ProgressBar, id: string, x: number, y: number, r: number, value: number, opacity: number, thickness: number, totalAngle: number, progressWidth: number): Element;
    private widthToAngle;
    createLinearRange(totalWidth: number, progress: ProgressBar, progressWidth: number): Element;
    createCircularRange(centerX: number, centerY: number, radius: number, progress: ProgressBar): Element;
    private setLinearGradientColor;
    private setCircularGradientColor;
}
