import { PathOption } from '@syncfusion/ej2-svg-base';
/**
 * helper for progress bar
 */
/** @private */
export declare class Rect {
    x: number;
    y: number;
    height: number;
    width: number;
    constructor(x: number, y: number, height: number, width: number);
}
/** @private */
export declare class Size {
    height: number;
    width: number;
    constructor(height: number, width: number);
}
/** @private */
export declare class Pos {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
/** @private */
export declare class RectOption extends PathOption {
    x: number;
    y: number;
    height: number;
    width: number;
    rx: number;
    ry: number;
    transform: string;
    constructor(id: string, fill: string, width: number, color: string, opacity: number, rect: Rect, rx?: number, ry?: number, transform?: string, dashArray?: string);
}
/** @private */
export declare class ColorValue {
    r: number;
    g: number;
    b: number;
    constructor(r?: number, g?: number, b?: number);
}
/**
 * Converts a color value to its hexadecimal representation.
 *
 * @param {ColorValue} value - The color value to convert.
 * @returns {string} - The hexadecimal representation of the color.
 * @private
 */
export declare function convertToHexCode(value: ColorValue): string;
/**
 * Converts a color component value to its hexadecimal representation.
 *
 * @param {number} value - The color component value to convert.
 * @returns {string} - The hexadecimal representation of the color component.
 * @private
 */
export declare function componentToHex(value: number): string;
/**
 * Converts a hexadecimal color code to a ColorValue.
 *
 * @param {string} hex - The hexadecimal color code to convert.
 * @returns {ColorValue} - The ColorValue representing the color.
 * @private
 */
export declare function convertHexToColor(hex: string): ColorValue;
/**
 * Converts a color name to its corresponding hexadecimal representation.
 *
 * @param {string} color - The color name to convert.
 * @returns {string} - The hexadecimal representation of the color.
 * @private
 */
export declare function colorNameToHex(color: string): string;
/** @private */
export declare class TextOption {
    id: string;
    ['font-size']: string;
    ['font-style']: string;
    ['font-family']: string;
    ['font-weight']: string;
    ['text-anchor']: string;
    fill: string;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(id: string, fontSize: string, fontStyle: string, fontFamily: string, fontWeight: string, textAnchor: string, fill: string, x: number, y: number, width?: number, height?: number);
}
/**
 * Converts polar coordinates (angle in degrees) to Cartesian coordinates.
 *
 * @param {number} centerX - The x-coordinate of the center point.
 * @param {number} centerY - The y-coordinate of the center point.
 * @param {number} radius - The radius from the center point.
 * @param {number} angleInDegrees - The angle in degrees.
 * @returns {Pos} - The Cartesian coordinates (x, y) corresponding to the given polar coordinates.
 */
export declare function degreeToLocation(centerX: number, centerY: number, radius: number, angleInDegrees: number): Pos;
/**
 * Generates an SVG path arc string based on given parameters.
 *
 * @param {number} x - The x-coordinate of the center of the arc.
 * @param {number} y - The y-coordinate of the center of the arc.
 * @param {number} radius - The radius of the arc.
 * @param {number} startAngle - The start angle of the arc in degrees.
 * @param {number} endAngle - The end angle of the arc in degrees.
 * @param {boolean} enableRtl - Indicates whether the drawing direction is right-to-left.
 * @param {boolean} pieView - Indicates whether the arc should be drawn as a pie slice.
 * @returns {string} - The SVG path arc string representing the arc.
 */
export declare function getPathArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, enableRtl: boolean, pieView?: boolean): string;
/**
 * Converts a string value to a number, considering the container size.
 *
 * @param {string} value - The string value to convert to a number.
 * @param {number} containerSize - The size of the container to consider for relative values.
 * @returns {number} - The converted number value.
 * @private
 */
export declare function stringToNumber(value: string, containerSize: number): number;
/**
 * Sets attributes on an HTML element based on the provided options.
 *
 * @param {any} options - The options object containing attributes to set.
 * @param {Element} element - The HTML element to set attributes on.
 * @returns {Element} - The modified HTML element.
 * @private
 */
export declare function setAttributes(options: any, element: Element): Element;
/**
 * Calculates the effect value at a given time based on the start and end values, duration, and direction.
 *
 * @param {number} currentTime - The current time in milliseconds.
 * @param {number} startValue - The start value of the effect.
 * @param {number} endValue - The end value of the effect.
 * @param {number} duration - The duration of the effect in milliseconds.
 * @param {boolean} enableRtl - Indicates whether the effect direction is right-to-left.
 * @returns {number} - The calculated effect value at the given time.
 * @private
 */
export declare function effect(currentTime: number, startValue: number, endValue: number, duration: number, enableRtl: boolean): number;
/**
 * @private
 */
export declare const annotationRender: string;
/**
 * Retrieves an HTML element from the DOM by its ID.
 *
 * @param {string} id - The ID of the HTML element to retrieve.
 * @returns {Element} - The HTML element with the specified ID.
 * @private
 */
export declare function getElement(id: string): Element;
/**
 * Removes an HTML element from the DOM.
 *
 * @param {string | Element} id - The ID of the HTML element or the element itself to remove.
 *                                If provided as a string, it's assumed to be the ID of the element.
 * @returns {void}
 * @private
 */
export declare function removeElement(id: string | Element): void;
/**
 * @private
 */
export declare class ProgressLocation {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
