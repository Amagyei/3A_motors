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
import { PdfListMarkerAlignment, PdfLayoutType, PdfNumberStyle, PdfTextAlignment, PdfUnorderedListStyle } from '../enumerator';
import { PdfFontFamily, PdfStandardFont, PdfStringFormat, _PdfStringLayouter } from '../fonts';
import { PdfBrush } from '../graphics/pdf-graphics';
import { PdfTemplate } from '../graphics/pdf-template';
import { PdfLayoutResult, PdfLayoutFormat, _PdfLayoutParameters, _PageLayoutResult } from '../graphics';
import { PdfPage } from '../pdf-page';
import { PdfListItemCollection } from './pdf-list-item';
import { _convertNumber } from './../utils';
/**
 * Represents base class for lists.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Assign the array of string items
 * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
 * // Initialize a new brush
 * let brush: PdfBrush =  new PdfBrush([0, 255, 255])
 * // Add an item to item collection by passing the string array
 * let items: PdfListItemCollection = new PdfListItemCollection(products);
 * // Create a new instance of ordered list
 * let list: PdfList = new PdfOrderedList(items);
 * // Draw the ordered list with specified items
 * list.draw(page, 0, 20, 500, 700);
 * // Get the brush associated with the ordered list
 * let listBrush: PdfBrush = list.brush;
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
var PdfList = /** @class */ (function () {
    function PdfList() {
        this._textIndent = 5;
        this._indent = 10;
        this._alignment = PdfListMarkerAlignment.left;
        this._delimiter = '.';
        this._suffix = '.';
        this._enableHierarchy = false;
        this._currentIndex = 0;
        this._size = [0, 0];
        this._defaultFont = new PdfStandardFont(PdfFontFamily.helvetica, 8);
    }
    Object.defineProperty(PdfList.prototype, "brush", {
        /**
         * Gets the `PdfBrush` object associated with the list.
         *
         * @returns {PdfBrush} The `PdfBrush` object to specify fill text rendering mode.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Initialize a new brush
         * let brush: PdfBrush =  new PdfBrush([0, 255, 255]);
         * // Add an item to item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new instance of ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Draw the ordered list with specified items
         * list.draw(page, 0, 20, 500, 700);
         * // Get the brush associated with the ordered list
         * let listBrush: PdfBrush = list.brush;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._brush;
        },
        /**
         * Sets the `PdfBrush` object associated with the list.
         *
         * @param {PdfBrush} value The `PdfBrush` object to specify fill text rendering mode.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an item to item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new Ordered list and set the brush
         * let list: PdfOrderedList = new PdfOrderedList(items, {brush: new PdfBrush([255, 0, 0])});
         * // Set fill color to the list
         * list.brush = brush;
         * // Draw the ordered list with specified items
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._brush = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "pen", {
        /**
         * Gets the `PdfPen` object associated with the list.
         *
         * @returns {PdfPen} The `PdfPen` object to specify stroke properties for text rendering.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Create an instance of item collection and add the list item
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // create a new ordered list and draw the list
         * let list: PdfOrderedList = new PdfOrderedList(items, {pen: new PdfPen([0, 255, 255], 1)});
         * list.draw(page, 0, 20, 500, 700);
         * // Retrieve the pen associated with the ordered list
         * let itemPen: PdfPen = list.pen;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._pen;
        },
        /**
         * Sets the `PdfPen` object associated with the list.
         *
         * @param {PdfPen} value The `PdfPen` object to specify fill text rendering mode.
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Create an instance of item collection and add the list item
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new pen
         * let pen: PdfPen =  new PdfPen([0, 255, 255], 1);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the pen for the ordered list
         * list.pen = pen;
         * // Draw the list associated with items
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._pen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "font", {
        /**
         * Gets the font of the list item.
         *
         * @returns {PdfFont} The font used for the list items.
         * ```typescript
         * // Load the existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an item to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Draw the items on the page
         * list.draw(page, 0, 20, 500, 700);
         * /// Retrieve the font used for the list items
         * let itemPen: PdfFont = list.font;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._font;
        },
        /**
         * Sets the `PdfFont` object associated with the list.
         *
         * @param {PdfFont} value The `PdfPen` object to to set for the list items.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Create an instance of item collection and add the list item
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new font for list
         * let font: PdfStandardFont = new PdfStandardFont(PdfFontFamily.timesRoman, 12);
         * // Create a new ordered list with items and font
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * list.font = font;
         * // Draw the items on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._font = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "stringFormat", {
        /**
         * Gets the text layout format associated with the list item.
         *
         * @returns {PdfStringFormat} The `PdfStringFormat` object that specifies the text layout information.
         * ```typescript
         * // Load the existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an items to  listitem collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list with items
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Draw the items on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Getting the text layout format used by the list items
         * let itemFormat: PdfStringFormat = list.stringFormat;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._stringFormat;
        },
        /**
         * Sets the text layout format of the list item.
         *
         * @param {PdfStringFormat} value The `PdfStringFormat` object that specifies the text layout information.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Create an instance of item collection and add the list item
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new  format with alignment settings for list
         * let itemFormat: PdfStringFormat =  new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom);
         * // Add an item to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(items);
         * // Create a ordered list with the item collection
         * let list: PdfOrderedList = new PdfOrderedList();
         * // Set the text layout format for the list
         * list.stringFormat = itemFormat;
         * // Draw the items on the page with the updated format
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._stringFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "indent", {
        /**
         * Gets the indent of the list.
         *
         * @returns {number} The indent value of the list.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an item to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a of ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Draw the list on the page associated with items
         * list.draw(page, 0, 20, 500, 700);
         * // Get the current indent value used by the list
         * let itemIndent: number = list.indent;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._indent;
        },
        /**
         * Sets the indent of the list.
         *
         * @param {number} value The indent value to set for the list.
         * ```typescript
         * //Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an items to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a of ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the indent value for the list
         * list.indent = 40;
         * // Draw the items on the page with the specified indent
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._indent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "textIndent", {
        /**
         * Gets the text indent of the list.
         *
         * @returns {number} The text indent of the list.
         * ```typescript
         * // Load the existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an items to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create an new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Draw the list on the page associated with items
         * list.draw(page, 0, 20, 500, 700);
         * // Get the current text indent value of the list
         * let textIndent: number = list.textIndent;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._textIndent;
        },
        /**
         * Sets the text indent of the list.
         *
         * @param {number} value The text indent value to set for the list.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an item to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the text indent value for the list
         * list.textIndent = 40;
         * // Draw the items on the page with the updated text indent
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._textIndent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "delimiter", {
        /**
         * Gets the delimiter string used to separate items in the list.
         *
         * @returns {string} The delimiter string used in the list.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Create an instance of PdfListItemCollection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Draw the list on the page associated with items
         * list.draw(page, 0, 20, 500, 700);
         * // Get the delimiter used in the list
         * let delimiter: string = list.delimiter;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._delimiter;
        },
        /**
         * Sets the delimiter string used to separate items in the list.
         *
         * @param {string} value The delimiter string to be set.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an item to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the delimiter for the list
         * list.delimiter = ')';
         * // Draw the list on the page associated with items
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._delimiter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "suffix", {
        get: function () {
            return this._suffix;
        },
        set: function (value) {
            this._suffix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "enableHierarchy", {
        /**
         * Gets a value indicating whether hierarchical structure is enabled for the list.
         *
         * @returns {boolean} `true` if hierarchical structure is enabled; otherwise, `false`.
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an item to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Draw the items associated with the items
         * list.draw(page, 0, 20, 500, 700);
         * // Get the hierarchical structure status
         * let enableHierarchy: boolean = list.enableHierarchy;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._enableHierarchy;
        },
        /**
         * Sets a value indicating whether hierarchical structure is enabled for the list.
         *
         * @param {boolean} value The boolean flag to enable or disable hierarchical structure.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an item to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the hierarchical structure status
         * list.enableHierarchy = true;
         * / Draw the list on the page associated with items
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._enableHierarchy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "alignment", {
        /**
         * Gets the text alignment of the list.
         *
         * @returns {PdfTextAlignment} The text alignment.
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an item to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Draw the list on the page associated with items
         * list.draw(page, 0, 20, 500, 700);
         * // Get the alignment of the list
         * let listAlignment: PdfTextAlignment = list.alignment;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._alignment;
        },
        /**
         * Sets the text alignment of the list.
         *
         * @param {PdfTextAlignment} value The text alignment to set for the list.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an items to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the alignment for the list
         * list.alignment = PdfTextAlignment.left;
         * // Draw the items on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._alignment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "items", {
        /**
         * Gets the item collection of the list.
         *
         * @returns {PdfListItemCollection} The list item collection.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add an items to list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Get the item collection
         * let collection: PdfListItemCollection = list.items;
         * // Draw the list on the page associated with item collection
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._itemCollection;
        },
        /**
         * Sets the item collection of the list.
         *
         * @param {PdfListItemCollection} value The list item collection.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create a new ordered list
         * let list: PdfOrderedList = new PdfOrderedList();
         * // Sets the item collection
         * list.items = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
         * // Draw the list on the page associated with item collection
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._itemCollection = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfList.prototype, "_markerRightToLeft", {
        get: function () {
            return this._alignment === PdfListMarkerAlignment.right;
        },
        enumerable: true,
        configurable: true
    });
    PdfList.prototype.draw = function (arg1, arg2, arg3, arg4, arg5, arg6) {
        if (arg1 instanceof PdfPage) {
            if (arg1._isNew) {
                return this._drawInternal(arg1, arg2, arg3, arg4, arg5, arg6);
            }
            else {
                (new _PdfListLayouter(this)).layout(arg1.graphics, [arg2, arg3, 0, 0]);
            }
        }
        else {
            (new _PdfListLayouter(this)).layout(arg1, [arg2, arg3, 0, 0]);
        }
    };
    PdfList.prototype._drawInternal = function (arg1, arg2, arg3, arg4, arg5, arg6) {
        var parameter = new _PdfLayoutParameters();
        parameter._page = arg1;
        if (arg4 === null || typeof arg4 === 'undefined') {
            parameter._bounds = [arg2, arg3, 0, 0];
            parameter._format = new PdfLayoutFormat();
        }
        else if (typeof arg4 === 'number') {
            parameter._bounds = [arg2, arg3, arg4, arg5];
            if (arg6) {
                parameter._format = arg6;
            }
            else {
                parameter._format = new PdfLayoutFormat();
            }
        }
        else if (arg4 instanceof PdfLayoutFormat) {
            parameter._bounds = [arg2, arg3, 0, 0];
            parameter._format = arg4;
        }
        return this._layout(parameter);
    };
    PdfList.prototype._layout = function (parameter) {
        return (new _PdfListLayouter(this)).layoutInternal(parameter);
    };
    return PdfList;
}());
export { PdfList };
/**
 * Represents an ordered list in a PDF document.
 * ```typescript
 * // Load an existing document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Define an array of strings representing items to be added
 * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
 * // Add the items to list item collection by passing the array of products
 * let items: PdfListItemCollection = new PdfListItemCollection(products);
 * // Create an instance of ordered list
 * let list: PdfOrderedList = new PdfOrderedList(items);
 * // Draw the ordered list on the page
 * list.draw(page, 0, 20, layout);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ````
 */
var PdfOrderedList = /** @class */ (function (_super) {
    __extends(PdfOrderedList, _super);
    function PdfOrderedList(items, settings) {
        var _this = _super.call(this) || this;
        _this._startNumber = 1;
        if (items) {
            _this._itemCollection = items;
        }
        else {
            _this._itemCollection = new PdfListItemCollection();
        }
        if (settings) {
            if (settings.font) {
                _this._font = settings.font;
            }
            if (settings.format) {
                _this._stringFormat = settings.format;
            }
            if (settings.pen) {
                _this._pen = settings.pen;
            }
            if (settings.brush) {
                _this._brush = settings.brush;
            }
            if (settings.style) {
                _this._style = settings.style;
            }
            else {
                _this._style = PdfNumberStyle.numeric;
            }
            if (settings.indent) {
                _this._indent = settings.indent;
            }
            if (settings.textIndent) {
                _this._textIndent = settings.textIndent;
            }
            if (settings.alignment) {
                _this._alignment = settings.alignment;
            }
            if (settings.delimiter) {
                _this._delimiter = settings.delimiter;
            }
            if (settings.suffix) {
                _this._suffix = settings.suffix;
            }
        }
        else {
            _this._style = PdfNumberStyle.numeric;
        }
        return _this;
    }
    Object.defineProperty(PdfOrderedList.prototype, "style", {
        /**
         * Gets the numbering style used for the ordered list.
         *
         * @returns {PdfNumberStyle} The numbering style used for the ordered list.
         *  ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add the items to list item collection by passing the array of products
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Initialize the instance of ordered list and pass the item collection
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Get the numbering style used for the ordered list
         * let style: PdfNumberStyle = list.style;
         * // Draw the ordered list on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._style;
        },
        /**
         * Sets the numbering style used for the ordered list.
         *
         * @param {PdfNumberStyle} value The numbering style used for the ordered list.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         *  // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add the items to list item collection by passing the array of products
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Initialize the instance of ordered list and pass the item collection
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Define a style for the list
         * let style: PdfNumberStyle = PdfNumberStyle.lowerLatin;
         * // Set the numbering style for the list items
         * list.style = style;
         * // Draw the ordered list on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._style = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfOrderedList.prototype, "startNumber", {
        /**
         * Gets the starting number used for the ordered list.
         *
         * @returns {number} The starting number of the ordered list.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add the items to list item collection by passing the array of products
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Initialize the instance of ordered list and pass the item collection
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Get the starting number used for the ordered list
         * let startnumber: number = list.startNumber;
         * // Draw the ordered list on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._startNumber;
        },
        /**
         * Sets the starting number to be used for the ordered list.
         *
         * @param {number} value The starting number to set.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Assign the array of string items
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add the items to list item collection by passing the array of products
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Initialize the instance of ordered list and pass the item collection
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the starting number for the ordered list
         * list.startNumber = 5;
         * // Draw the ordered list on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            if (value <= 0) {
                throw new Error('Start number should be greater than 0.');
            }
            this._startNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    PdfOrderedList.prototype._getNumber = function () {
        return _convertNumber(this._startNumber + this._currentIndex, this._style);
    };
    return PdfOrderedList;
}(PdfList));
export { PdfOrderedList };
/**
 * Represents the Unordered lists.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Define the items in the unordered list
 * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
 * // Create an instance of PdfListItemCollection by passing the string array
 * let items: PdfListItemCollection = new PdfListItemCollection(products);
 * // Create an instance of PdfUnorderedList
 * let list: PdfUnorderedList = new PdfUnorderedList();
 * // Draw the unordered list on the page
 * list.draw(page, 0, 20, layout);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ````
 */
var PdfUnorderedList = /** @class */ (function (_super) {
    __extends(PdfUnorderedList, _super);
    function PdfUnorderedList(items, settings) {
        var _this = _super.call(this) || this;
        if (items) {
            _this._itemCollection = items;
        }
        else {
            _this._itemCollection = new PdfListItemCollection();
        }
        if (settings) {
            if (settings.font) {
                _this._font = settings.font;
            }
            if (settings.format) {
                _this._stringFormat = settings.format;
            }
            if (settings.pen) {
                _this._pen = settings.pen;
            }
            if (settings.brush) {
                _this._brush = settings.brush;
            }
            if (settings.style) {
                _this._style = settings.style;
            }
            else {
                _this._style = PdfUnorderedListStyle.disk;
            }
            if (settings.indent) {
                _this._indent = settings.indent;
            }
            if (settings.textIndent) {
                _this._textIndent = settings.textIndent;
            }
            if (settings.alignment) {
                _this._alignment = settings.alignment;
            }
            if (settings.delimiter) {
                _this._delimiter = settings.delimiter;
            }
            if (settings.suffix) {
                _this._suffix = settings.suffix;
            }
        }
        else {
            _this._style = PdfUnorderedListStyle.disk;
        }
        return _this;
    }
    Object.defineProperty(PdfUnorderedList.prototype, "style", {
        /**
         * Gets the style used for the unordered list.
         *
         * @returns {PdfUnorderedListStyle} The style used for the unordered list.
         * ```typescript
         * // Load an existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Define the items in the unordered list
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add the items to list item collection by passing the array of products
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Initialize an instance of the unordered list and pass the list item collection
         * let list: PdfUnorderedList = new PdfUnorderedList(items);
         * // Get the style used for the unordered list
         * let style: PdfUnorderedListStyle = list.style;
         * // Draw the unordered list on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._style;
        },
        /**
         * Sets the style used for the unordered list.
         *
         * @param {PdfUnorderedListStyle} value The style to set for the unordered list.
         * ```typescript
         * // Load the existing document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Define the items in the unordered list
         * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
         * // Add the items to list item collection by passing the array of products
         * let items: PdfListItemCollection = new PdfListItemCollection(products);
         * // Initialize an instance of the unordered list and pass the list item collection
         * let list: PdfUnorderedList = new PdfUnorderedList(items);
         * // Initialize a style for the unordered list
         * let style: PdfUnorderedListStyle = PdfUnorderedListStyle.circle;
         * // Set the style for the unordered list items
         * list.style = style;
         * // Draw the unordered list on the page
         * list.draw(page, 0, 20, 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._style = value;
        },
        enumerable: true,
        configurable: true
    });
    PdfUnorderedList.prototype._getStyledText = function () {
        switch (this._style) {
            case PdfUnorderedListStyle.disk:
                return '\x6C';
            case PdfUnorderedListStyle.square:
                return '\x6E';
            case PdfUnorderedListStyle.asterisk:
                return '\x5D';
            case PdfUnorderedListStyle.circle:
                return '\x6D';
            default:
                return '';
        }
    };
    PdfUnorderedList.prototype._draw = function (graphics, x, y, brush, pen) {
        var template = new PdfTemplate([0, 0, this._size[0], this._size[1]], graphics._crossReference);
        var bounds = [0, 0, 0, 0];
        if (pen) {
            bounds[0] = bounds[0] + pen._width;
            bounds[1] = bounds[1] + pen._width;
        }
        template.graphics.drawString(this._getStyledText(), this._unicodeFont, bounds, pen, brush);
        graphics.drawTemplate(template, { x: x, y: y, width: template.size[0], height: template.size[1] });
    };
    return PdfUnorderedList;
}(PdfList));
export { PdfUnorderedList };
var _PdfListInfo = /** @class */ (function () {
    function _PdfListInfo(list, index, number) {
        this._list = list;
        this._index = index;
        this._number = number;
    }
    return _PdfListInfo;
}());
export { _PdfListInfo };
var _PdfListLayouter = /** @class */ (function () {
    function _PdfListLayouter(element) {
        this._indent = 0;
        this._information = [];
        this._markerMaxWidth = 0;
        this._finish = false;
        this._usePaginateBounds = true;
        this._resultHeight = 0;
        this._size = [0, 0];
        this._index = 0;
        this._element = element;
    }
    _PdfListLayouter.prototype.layout = function (graphics, bounds) {
        this._graphics = graphics;
        var parameter = new _PdfLayoutParameters();
        parameter._bounds = bounds;
        parameter._format = new PdfLayoutFormat();
        parameter._format.layout = PdfLayoutType.onePage;
        this.layoutInternal(parameter);
    };
    _PdfListLayouter.prototype.layoutInternal = function (parameter) {
        this._currentPage = parameter._page;
        this._bounds = parameter._bounds.slice();
        if (this._currentPage) {
            if (parameter._bounds[2] === 0 && parameter._bounds[3] === 0) {
                var pageSize = this._currentPage.graphics.clientSize;
                this._bounds[2] = pageSize[0] - this._bounds[0];
                this._bounds[3] = pageSize[1] - this._bounds[1];
            }
            this._graphics = this._currentPage.graphics;
        }
        var pageResult = new _PageLayoutResult();
        pageResult.broken = false;
        pageResult.y = this._bounds[1];
        this._curList = this._element;
        this._indent = this._curList.indent;
        this._setCurrentParameters(this._curList);
        if (!this._curList.brush) {
            this._currentBrush = new PdfBrush([0, 0, 0]);
        }
        if (!this._curList.font) {
            this._currentFont = this._curList._defaultFont;
        }
        if (this._curList instanceof PdfOrderedList) {
            this._markerMaxWidth = this._getMarkerMaxWidth(this._curList, this._information);
        }
        var useOnPage = parameter._format.layout === PdfLayoutType.onePage;
        while (!this._finish) {
            pageResult.y = this._bounds[1];
            pageResult = this._layoutOnPage(pageResult);
            if (useOnPage) {
                break;
            }
            if (this._currentPage && !this._finish) {
                this._currentPage = this._getNextPage(this._currentPage);
            }
            this._graphics = this._currentPage.graphics;
            if (parameter._bounds[2] === 0 && parameter._bounds[3] === 0) {
                var pageSize = this._currentPage.graphics.clientSize;
                this._bounds[2] = pageSize[0] - this._bounds[0];
                this._bounds[3] = pageSize[1] - this._bounds[1];
            }
            if (parameter._format && parameter._format.usePaginateBounds && this._usePaginateBounds) {
                this._bounds = parameter._format._paginateBounds;
            }
        }
        this._information = [];
        var finalBounds = [this._bounds[0], pageResult.y, this._bounds[2], this._resultHeight];
        var result = new PdfLayoutResult(this._currentPage, finalBounds);
        if (this._currentFormat) {
            this._currentFormat._isList = false;
        }
        return result;
    };
    _PdfListLayouter.prototype._layoutOnPage = function (pageResult) {
        var height = 0;
        var resultantHeight = 0;
        var y = this._bounds[1];
        var x = this._bounds[0];
        this._size = [this._bounds[2] - this._indent, this._bounds[3]];
        while (true) { // eslint-disable-line
            for (; this._index < this._curList.items.count; ++this._index) {
                var item = this._curList.items.at(this._index);
                var result = this._drawItem(pageResult, x, this._curList, this._index, this._indent, this._information, item, height, y);
                pageResult = result.pageResult;
                height = result.height;
                y = result.y;
                resultantHeight += height;
                if (pageResult.broken) {
                    return pageResult;
                }
                pageResult.markerWrote = false;
                if (item.subList && item.subList.items.count > 0) {
                    if (this._curList instanceof PdfOrderedList) {
                        var oList = this._curList;
                        oList._currentIndex = this._index;
                        var info = new _PdfListInfo(this._curList, this._index, oList._getNumber());
                        info._brush = this._currentBrush;
                        info._font = this._currentFont;
                        info._format = this._currentFormat;
                        info._pen = this._currentPen;
                        info._markerWidth = this._markerMaxWidth;
                        this._information.push(info);
                    }
                    else {
                        var info = new _PdfListInfo(this._curList, this._index);
                        info._brush = this._currentBrush;
                        info._font = this._currentFont;
                        info._format = this._currentFormat;
                        info._pen = this._currentPen;
                        this._information.push(info);
                    }
                    this._curList = item.subList;
                    if (this._curList instanceof PdfOrderedList) {
                        this._markerMaxWidth = this._getMarkerMaxWidth(this._curList, this._information);
                    }
                    this._index = -1;
                    this._indent += this._curList.indent;
                    this._size[0] = this._size[0] - this._curList.indent;
                    this._setCurrentParameters(item);
                    this._setCurrentParameters(this._curList);
                }
            }
            if (this._information.length === 0) {
                this._resultHeight = resultantHeight;
                this._finish = true;
                break;
            }
            var listInfo = this._information.pop();
            this._index = listInfo._index + 1;
            this._indent -= this._curList.indent;
            this._size[0] = this._size[0] + this._curList.indent;
            this._markerMaxWidth = listInfo._markerWidth;
            this._currentBrush = listInfo._brush;
            this._currentPen = listInfo._pen;
            this._currentFont = listInfo._font;
            this._currentFormat = listInfo._format;
            this._curList = listInfo._list;
        }
        return pageResult;
    };
    _PdfListLayouter.prototype._drawItem = function (pageResult, x, curList, index, indent, info, item, height, y) {
        var layouter = new _PdfStringLayouter();
        var result;
        var textIndent = curList.textIndent;
        var posY = height + y;
        var posX = indent + x;
        var itemHeight = 0;
        var itemSize = this._size;
        var text = item.text;
        var markerText;
        var itemBrush = this._currentBrush;
        var markerHeight = 0;
        if (item.brush) {
            itemBrush = item.brush;
        }
        var itemPen = this._currentPen;
        if (item.pen) {
            itemPen = item.pen;
        }
        var itemFont = this._currentFont;
        if (item.font) {
            itemFont = item.font;
        }
        var itemFormat = this._currentFormat;
        if (item.stringFormat) {
            itemFormat = item.stringFormat;
        }
        if ((this._size[0] <= 0 || this._size[0] < itemFont.size) && this._currentPage) {
            throw new Error('There is not enough space to layout list.');
        }
        this._size[1] = this._size[1] - height;
        if (pageResult.broken) {
            text = pageResult.itemText;
            markerText = pageResult.markerText;
        }
        var canDrawMarker = true;
        var markerResult = this._createMarkerResult(index, curList, info, item);
        if (markerResult) {
            if (curList instanceof PdfOrderedList) {
                posX += this._markerMaxWidth;
                pageResult.markerWidth = this._markerMaxWidth;
            }
            else {
                posX += markerResult._actualSize[0];
                pageResult.markerWidth = markerResult._actualSize[0];
            }
            markerHeight = markerResult._actualSize[1];
            if (this._currentPage) {
                canDrawMarker = (markerHeight < this._size[1]);
            }
            if (markerResult._empty) {
                canDrawMarker = false;
            }
        }
        else {
            posX += curList._size[0];
            pageResult.markerWidth = curList._size[0];
            markerHeight = curList._size[1];
            if (this._currentPage) {
                canDrawMarker = (markerHeight < this._size[1]);
            }
        }
        if (!markerText || markerText === '') {
            canDrawMarker = true;
        }
        if (text && canDrawMarker) {
            itemSize = this._size;
            itemSize[0] = itemSize[0] - pageResult.markerWidth;
            if (item.textIndent === 0) {
                itemSize[0] = itemSize[0] - textIndent;
            }
            else {
                itemSize[0] = itemSize[0] - item.textIndent;
            }
            if ((itemSize[0] <= 0 || itemSize[0] < itemFont.size) && this._currentPage) {
                throw new Error('Not enough space to layout the text. The marker is too long or there is not enough space to draw it.');
            }
            var itemX = posX;
            if (!curList._markerRightToLeft) {
                if (item.textIndent === 0) {
                    itemX += textIndent;
                }
                else {
                    itemX += item.textIndent;
                }
            }
            else {
                itemX -= pageResult.markerWidth;
                if (itemFormat && (itemFormat.alignment === PdfTextAlignment.right || itemFormat.alignment === PdfTextAlignment.center)) {
                    itemX -= indent;
                }
            }
            if (!this._currentPage && itemFormat) {
                itemFormat = Object.assign({}, itemFormat);
                itemFormat.alignment = PdfTextAlignment.left;
            }
            result = layouter._layout(text, itemFont, itemFormat, itemSize);
            var rect = [itemX, posY, itemSize[0], itemSize[1]];
            this._graphics._drawStringLayoutResult(result, itemFont, itemPen, itemBrush, rect, itemFormat);
            y = posY;
            itemHeight = result._actualSize[1];
        }
        height = (itemHeight < markerHeight) ? markerHeight : itemHeight;
        if ((result && result._remainder && result._remainder !== '') ||
            (markerResult && markerResult._remainder && markerResult._remainder !== '') ||
            !canDrawMarker) {
            y = 0;
            height = 0;
            if (result) {
                pageResult.itemText = result._remainder;
                if (result._remainder === item.text) {
                    canDrawMarker = false;
                }
            }
            else {
                if (canDrawMarker) {
                    pageResult.itemText = undefined;
                }
                else {
                    pageResult.itemText = item.text;
                }
            }
            if (markerResult) {
                pageResult.markerText = markerResult._remainder;
            }
            else {
                pageResult.markerText = undefined;
            }
            pageResult.broken = true;
            pageResult.y = 0;
            this._bounds[1] = 0;
        }
        else {
            pageResult.broken = false;
        }
        if (result) {
            pageResult.markerX = posX;
            if (itemFormat) {
                switch (itemFormat.alignment) {
                    case PdfTextAlignment.right:
                        pageResult.markerX = posX + itemSize[0] - result._actualSize[0];
                        break;
                    case PdfTextAlignment.center:
                        pageResult.markerX = posX + (itemSize[0] / 2) - (result._actualSize[0] / 2);
                        break;
                }
            }
            if (curList._markerRightToLeft) {
                pageResult.markerX += result._actualSize[0];
                if (item.textIndent === 0) {
                    pageResult.markerX += textIndent;
                }
                else {
                    pageResult.markerX += item.textIndent;
                }
                if (itemFormat && (itemFormat.alignment === PdfTextAlignment.right || itemFormat.alignment === PdfTextAlignment.center)) {
                    pageResult.markerX -= indent;
                }
            }
        }
        if (canDrawMarker && !pageResult.markerWrote) {
            pageResult.markerWrote = this._drawMarker(curList, item, markerResult, posY, pageResult.markerX);
            if (curList instanceof PdfOrderedList) {
                pageResult.markerWidth = markerResult._actualSize[0];
            }
            else {
                pageResult.markerWidth = curList._size[0];
            }
        }
        return { pageResult: pageResult, height: height, y: y };
    };
    _PdfListLayouter.prototype._createMarkerResult = function (index, curList, info, item) {
        if (curList instanceof PdfOrderedList) {
            return this._createOrderedMarkerResult(curList, item, index, info, false);
        }
        else {
            return this._createUnorderedMarkerResult(curList, item);
        }
    };
    _PdfListLayouter.prototype._drawMarker = function (curList, item, markerResult, posY, posX) {
        if (curList instanceof PdfOrderedList) {
            if (curList.font && markerResult) {
                if (curList.font.size > markerResult._actualSize[1]) {
                    posY += (curList.font.size / 2) - (markerResult._actualSize[1] / 2);
                    markerResult._actualSize[1] = markerResult._actualSize[1] + posY;
                }
                this._drawOrderedMarker(curList, markerResult, item, posX, posY);
            }
        }
        else {
            if (curList.font && markerResult) {
                if (curList.font.size > markerResult._actualSize[1]) {
                    posY += (curList.font.size / 2) - (markerResult._actualSize[1] / 2);
                    markerResult._actualSize[1] = markerResult._actualSize[1] + posY;
                }
            }
            this._drawUnorderedMarker(curList, markerResult, item, posX, posY);
        }
        return true;
    };
    _PdfListLayouter.prototype._drawUnorderedMarker = function (curList, markerResult, item, posX, posY) {
        var markerFont = this._getMarkerFont(curList, item);
        var markerPen = this._getMarkerPen(curList, item);
        var markerBrush = this._getMarkerBrush(curList, item);
        if (markerResult) {
            curList._size = markerResult._actualSize;
            curList._unicodeFont = new PdfStandardFont(PdfFontFamily.zapfDingbats, markerFont.size);
            curList._draw(this._graphics, posX - markerResult._actualSize[0], posY, markerBrush, markerPen);
        }
        else {
            curList._size = [markerFont.size, markerFont.size];
            curList._draw(this._graphics, posX - markerFont.size, posY, markerBrush, markerPen);
        }
    };
    _PdfListLayouter.prototype._drawOrderedMarker = function (curList, markerResult, item, posX, posY) {
        var markerFont = this._getMarkerFont(curList, item);
        var markerPen = this._getMarkerPen(curList, item);
        var markerBrush = this._getMarkerBrush(curList, item);
        var rect = [posX - this._markerMaxWidth, posY, this._markerMaxWidth, markerResult._actualSize[1]];
        var markerFormat = this._setMarkerStringFormat(curList, this._getMarkerFormat(curList, item));
        this._graphics._drawStringLayoutResult(markerResult, markerFont, markerPen, markerBrush, rect, markerFormat);
    };
    _PdfListLayouter.prototype._setCurrentParameters = function (element) {
        if (element.brush) {
            this._currentBrush = element.brush;
        }
        if (element.pen) {
            this._currentPen = element.pen;
        }
        if (element.font) {
            this._currentFont = element.font;
        }
        if (element.stringFormat) {
            this._currentFormat = element.stringFormat;
            if (element instanceof PdfList) {
                this._currentFormat._isList = true;
            }
        }
    };
    _PdfListLayouter.prototype._getMarkerMaxWidth = function (list, infromation) {
        var width = -1;
        for (var i = 0; i < list.items.count; i++) {
            var result = this._createOrderedMarkerResult(list, list.items.at(i), i + list.startNumber, infromation, true);
            if (width < result._actualSize[0]) {
                width = result._actualSize[0];
            }
        }
        return width;
    };
    _PdfListLayouter.prototype._createUnorderedMarkerResult = function (list, item) {
        var markerFont = this._getMarkerFont(list, item);
        var layouter = new _PdfStringLayouter();
        var uFont = new PdfStandardFont(PdfFontFamily.zapfDingbats, markerFont.size);
        var result = layouter._layout(list._getStyledText(), uFont, null, this._size);
        list._size = result._actualSize;
        if (list.pen) {
            result._size = [result._actualSize[0] + 2 * list.pen._width, result._actualSize[1] + 2 * list.pen._width];
        }
        return result;
    };
    _PdfListLayouter.prototype._createOrderedMarkerResult = function (list, item, index, infromation, findMaxWidth) {
        list._currentIndex = index;
        var text = '';
        if (list.style !== PdfNumberStyle.none) {
            text = list._getNumber() + list.suffix;
        }
        if (list.enableHierarchy) {
            var collection = infromation.slice();
            for (var i = 0; i < collection.length; i++) {
                var listInfo = collection[Number.parseInt(i.toString(), 10)];
                var orderedList = listInfo._list;
                if (!(orderedList && orderedList instanceof PdfOrderedList && orderedList.style !== PdfNumberStyle.none)) {
                    break;
                }
                text = listInfo._number + orderedList.delimiter + text;
                if (!orderedList.enableHierarchy) {
                    break;
                }
            }
        }
        var layouter = new _PdfStringLayouter();
        var font = this._getMarkerFont(list, item);
        var format = this._getMarkerFormat(list, item);
        var markerSize = [0, 0];
        if (!findMaxWidth) {
            markerSize[0] = this._markerMaxWidth;
            format = this._setMarkerStringFormat(list, format);
        }
        return layouter._layout(text, font, format, markerSize);
    };
    _PdfListLayouter.prototype._setMarkerStringFormat = function (list, format) {
        if (format) {
            format = Object.assign({}, format);
        }
        else {
            format = new PdfStringFormat();
        }
        if (!list.stringFormat) {
            format.alignment = PdfTextAlignment.right;
            if (list._markerRightToLeft) {
                format.alignment = PdfTextAlignment.left;
            }
        }
        if (!this._currentPage && format) {
            format = Object.assign({}, format);
            format.alignment = PdfTextAlignment.left;
        }
        return format;
    };
    _PdfListLayouter.prototype._getMarkerFont = function (list, item) {
        var markerFont = list.font;
        if (!markerFont) {
            markerFont = item.font;
            if (!markerFont) {
                markerFont = this._currentFont;
            }
        }
        list.font = markerFont;
        return markerFont;
    };
    _PdfListLayouter.prototype._getMarkerFormat = function (list, item) {
        var markerFormat = list.stringFormat;
        if (!markerFormat) {
            markerFormat = item.stringFormat;
            if (!markerFormat) {
                markerFormat = this._currentFormat;
            }
        }
        return markerFormat;
    };
    _PdfListLayouter.prototype._getMarkerPen = function (list, item) {
        var markerPen = list.pen;
        if (!markerPen) {
            markerPen = item.pen;
            if (!markerPen) {
                markerPen = this._currentPen;
            }
        }
        return markerPen;
    };
    _PdfListLayouter.prototype._getMarkerBrush = function (list, item) {
        var markerBrush = list.brush;
        if (!markerBrush) {
            markerBrush = item.brush;
            if (!markerBrush) {
                markerBrush = this._currentBrush;
            }
        }
        return markerBrush;
    };
    _PdfListLayouter.prototype._getNextPage = function (page) {
        var document = page._crossReference._document;
        if (page._pageIndex < document.pageCount - 1) {
            return document.getPage(page._pageIndex + 1);
        }
        else {
            return document.addPage();
        }
    };
    return _PdfListLayouter;
}());
export { _PdfListLayouter };
