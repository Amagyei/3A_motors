var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PathOption } from '@syncfusion/ej2-svg-base';
import { remove, createElement } from '@syncfusion/ej2-base';
/**
 * helper for progress bar
 */
/** @private */
var Rect = /** @class */ (function () {
    function Rect(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    return Rect;
}());
export { Rect };
/** @private */
var Size = /** @class */ (function () {
    function Size(height, width) {
        this.height = height;
        this.width = width;
    }
    return Size;
}());
export { Size };
/** @private */
var Pos = /** @class */ (function () {
    function Pos(x, y) {
        this.x = x;
        this.y = y;
    }
    return Pos;
}());
export { Pos };
/** @private */
var RectOption = /** @class */ (function (_super) {
    __extends(RectOption, _super);
    function RectOption(id, fill, width, color, opacity, rect, rx, ry, transform, dashArray) {
        var _this = _super.call(this, id, fill, width, color, opacity, dashArray) || this;
        _this.y = rect.y;
        _this.x = rect.x;
        _this.height = rect.height;
        _this.width = rect.width;
        _this.rx = rx ? rx : 0;
        _this.ry = ry ? ry : 0;
        _this.transform = transform ? transform : '';
        _this.stroke = (width !== 0 && _this.stroke !== '') ? color : 'transparent';
        return _this;
    }
    return RectOption;
}(PathOption));
export { RectOption };
/** @private */
var ColorValue = /** @class */ (function () {
    function ColorValue(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return ColorValue;
}());
export { ColorValue };
/**
 * Converts a color value to its hexadecimal representation.
 *
 * @param {ColorValue} value - The color value to convert.
 * @returns {string} - The hexadecimal representation of the color.
 * @private
 */
export function convertToHexCode(value) {
    return '#' + componentToHex(value.r) + componentToHex(value.g) + componentToHex(value.b);
}
/**
 * Converts a color component value to its hexadecimal representation.
 *
 * @param {number} value - The color component value to convert.
 * @returns {string} - The hexadecimal representation of the color component.
 * @private
 */
export function componentToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
/**
 * Converts a hexadecimal color code to a ColorValue.
 *
 * @param {string} hex - The hexadecimal color code to convert.
 * @returns {ColorValue} - The ColorValue representing the color.
 * @private
 */
export function convertHexToColor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new ColorValue(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) :
        new ColorValue(255, 255, 255);
}
/**
 * Converts a color name to its corresponding hexadecimal representation.
 *
 * @param {string} color - The color name to convert.
 * @returns {string} - The hexadecimal representation of the color.
 * @private
 */
export function colorNameToHex(color) {
    color = color === 'transparent' ? 'white' : color;
    document.body.appendChild(createElement('text', { id: 'chartmeasuretext' }));
    var element = document.getElementById('chartmeasuretext');
    element.style.color = color;
    color = window.getComputedStyle(element).color;
    remove(element);
    var isRGBValue;
    if (color.indexOf('rgb') === 0 || color.indexOf('hsl') === 0) {
        color = color.replace(/\s/g, '').replace(/[()]/g, '');
        isRGBValue = color.slice(3).split(',');
    }
    return convertToHexCode(new ColorValue(parseInt(isRGBValue[3], 10), parseInt(isRGBValue[4], 10), parseInt(isRGBValue[5], 10)));
}
/** @private */
var TextOption = /** @class */ (function () {
    function TextOption(id, fontSize, fontStyle, fontFamily, fontWeight, textAnchor, fill, x, y, width, height) {
        this.id = id;
        this['font-size'] = fontSize;
        this['font-style'] = fontStyle;
        this['font-family'] = fontFamily;
        this['font-weight'] = fontWeight;
        this['text-anchor'] = textAnchor;
        this.fill = fill;
        this.x = x;
        this.y = y;
        this.width = width ? width : 0;
        this.height = height ? height : 0;
    }
    return TextOption;
}());
export { TextOption };
/**
 * Converts polar coordinates (angle in degrees) to Cartesian coordinates.
 *
 * @param {number} centerX - The x-coordinate of the center point.
 * @param {number} centerY - The y-coordinate of the center point.
 * @param {number} radius - The radius from the center point.
 * @param {number} angleInDegrees - The angle in degrees.
 * @returns {Pos} - The Cartesian coordinates (x, y) corresponding to the given polar coordinates.
 */
export function degreeToLocation(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}
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
export function getPathArc(x, y, radius, startAngle, endAngle, enableRtl, pieView) {
    var start = degreeToLocation(x, y, radius, startAngle);
    var end = degreeToLocation(x, y, radius, endAngle);
    var largeArcFlag = '0';
    var sweepFlag = (enableRtl) ? '0' : '1';
    if (!enableRtl) {
        largeArcFlag = ((endAngle >= startAngle) ? endAngle : endAngle + 360) - startAngle <= 180 ? '0' : '1';
    }
    else {
        largeArcFlag = ((startAngle >= endAngle) ? startAngle : startAngle + 360) - endAngle <= 180 ? '0' : '1';
    }
    var d;
    if (pieView) {
        d = 'M ' + x + ' ' + y + ' L ' + start.x + ' ' + start.y + ' A ' + radius + ' ' +
            radius + ' ' + ' 0 ' + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' + end.x + ' ' + end.y + ' ' + 'Z';
    }
    else {
        d = 'M' + start.x + ' ' + start.y +
            'A' + radius + ' ' + radius + ' ' + '0' + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' + end.x + ' ' + end.y;
    }
    return d;
}
/**
 * Converts a string value to a number, considering the container size.
 *
 * @param {string} value - The string value to convert to a number.
 * @param {number} containerSize - The size of the container to consider for relative values.
 * @returns {number} - The converted number value.
 * @private
 */
export function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Sets attributes on an HTML element based on the provided options.
 *
 * @param {any} options - The options object containing attributes to set.
 * @param {Element} element - The HTML element to set attributes on.
 * @returns {Element} - The modified HTML element.
 * @private
 */
export function setAttributes(options, element) {
    var keys = Object.keys(options);
    for (var i = 0; i < keys.length; i++) {
        element.setAttribute(keys[i], options[keys[i]]);
    }
    return element;
}
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
export function effect(currentTime, startValue, endValue, duration, enableRtl) {
    var start = (enableRtl) ? endValue : -endValue;
    var end = startValue + ((enableRtl) ? -endValue : endValue);
    return start * Math.cos(currentTime / duration * (Math.PI / 2)) + end;
}
/**
 * @private
 */
export var annotationRender = 'annotationRender';
/**
 * Retrieves an HTML element from the DOM by its ID.
 *
 * @param {string} id - The ID of the HTML element to retrieve.
 * @returns {Element} - The HTML element with the specified ID.
 * @private
 */
export function getElement(id) {
    return document.getElementById(id);
}
/**
 * Removes an HTML element from the DOM.
 *
 * @param {string | Element} id - The ID of the HTML element or the element itself to remove.
 *                                If provided as a string, it's assumed to be the ID of the element.
 * @returns {void}
 * @private
 */
export function removeElement(id) {
    if (!id) {
        return null;
    }
    var element = typeof id === 'string' ? getElement(id) : id;
    if (element) {
        remove(element);
    }
}
/**
 * @private
 */
var ProgressLocation = /** @class */ (function () {
    function ProgressLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return ProgressLocation;
}());
export { ProgressLocation };
