/**
 * Specifies Circular-Gauge Common Helper methods
 */
import { FontModel } from '../model/base-model';
import { CircularGauge } from '../circular-gauge';
/**
 * @param {number} maxWidth - Specifies the maximum width.
 * @param {string} text - Specifies the text.
 * @param {FontModel} font - Specifies the font.
 * @returns {string} - Returns the label.
 * @private */
export declare function textTrim(maxWidth: number, text: string, font: FontModel): string;
/**
 * @param {string} text - Specifies the text.
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @param {CircularGauge} gauge - Specifies the circular gauge.
 * @param {string} type - Specifies the type
 * @returns {void}
 * @private */
export declare function showTooltip(text: string, x: number, y: number, gauge: CircularGauge, type: string): void;
/**
 * @param {Event} event - Specifies the event.
 * @param {number} x - Specifies the x value.
 * @param {number} y - Specifies the y value.
 * @param {CircularGauge} gauge - Specifies the gauge.
 * @param {boolean} isTitleTouch - Specifies the title touch with boolean.
 * @returns {void}
 * @private */
export declare function titleTooltip(event: Event, x: number, y: number, gauge: CircularGauge, isTitleTouch: boolean): void;
/**
 * @returns {void}
 * @private */
export declare function removeTooltip(): void;
