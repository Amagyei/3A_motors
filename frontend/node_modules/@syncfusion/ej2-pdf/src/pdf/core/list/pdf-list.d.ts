import { PdfListMarkerAlignment, PdfNumberStyle, PdfUnorderedListStyle } from '../enumerator';
import { PdfFont, PdfStandardFont, PdfStringFormat } from '../fonts';
import { PdfBrush, PdfGraphics, PdfPen } from '../graphics/pdf-graphics';
import { PdfLayoutResult, PdfLayoutFormat, _PdfLayoutParameters } from '../graphics';
import { PdfPage } from '../pdf-page';
import { PdfListItemCollection } from './pdf-list-item';
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
export declare abstract class PdfList {
    _brush: PdfBrush;
    _pen: PdfPen;
    _font: PdfFont;
    _stringFormat: PdfStringFormat;
    _textIndent: number;
    _indent: number;
    _alignment: PdfListMarkerAlignment;
    _delimiter: string;
    _suffix: string;
    _enableHierarchy: boolean;
    _graphics: PdfGraphics;
    _bounds: number[];
    _itemCollection: PdfListItemCollection;
    _currentIndex: number;
    _size: number[];
    _unicodeFont: PdfStandardFont;
    _defaultFont: PdfFont;
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
    brush: PdfBrush;
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
    pen: PdfPen;
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
    font: PdfFont;
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
    stringFormat: PdfStringFormat;
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
    indent: number;
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
    textIndent: number;
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
    delimiter: string;
    suffix: string;
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
    enableHierarchy: boolean;
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
    alignment: PdfListMarkerAlignment;
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
    items: PdfListItemCollection;
    readonly _markerRightToLeft: boolean;
    /**
     * Draws the content on the specified `PdfPage` at the given coordinates.
     *
     * @param {PdfPage} page The PDF page on which to draw the content.
     * @param {number} x The x-coordinate where the list will be drawn.
     * @param {number} y The y-coordinate where the list will be drawn.
     * @returns {PdfLayoutResult} A layout result object indicating the outcome of the drawing operation.
     * ```typescript
     * // Load an existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new item collection
     * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
     * // Create a new ordered list
     * let list: PdfOrderedList = new PdfOrderedList(items);
     * // Draw the list on the page associated with item collection
     * list.draw(page, 0, 20);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ````
     */
    draw(page: PdfPage, x: number, y: number): PdfLayoutResult;
    /**
     * Draws the `PdfList` at the specified coordinates on the `PdfGraphics` context.
     *
     * @param {PdfGraphics} graphics The graphics context on which to draw the list.
     * @param {number} x The x-coordinate where the list will be drawn.
     * @param {number} y The y-coordinate where the list will be drawn.
     * @returns Nothing.
     * ```typescript
     * // Load an existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new item collection
     * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
     * // Create a new ordered list
     * let list: PdfOrderedList = new PdfOrderedList(items);
     * // Draw the list on the graphics of the page
     * list.draw(page.graphics, 0, 20);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ````
     */
    draw(graphics: PdfGraphics, x: number, y: number): void;
    /**
     * Draws the content on the specified `PdfPage` at the given coordinates with the specified layout format.
     *
     * @param {PdfPage} page The PDF page on which to draw the content.
     * @param {number} x The x-coordinate where the list will be drawn.
     * @param {number} y The y-coordinate where the list will be drawn.
     * @param {PdfLayoutFormat} format The layout format options for drawing.
     * @returns {PdfLayoutResult} A layout result object indicating the outcome of the drawing operation.
     * ```typescript
     * // Load an existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new item collection
     * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
     * // Create a new ordered list
     * let list: PdfOrderedList = new PdfOrderedList(items);
     * // Create an instance for PDF layout format
     * let layout: PdfLayoutFormat = new PdfLayoutFormat();
     * // Set the layout format
     * layout.break = PdfLayoutBreakType.fitPage;
     * layout.layout = pdfLayoutType.paginate;
     * // Draw the list on the page associated with item collection
     * list.draw(page, 0, 20, layout);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ````
     */
    draw(page: PdfPage, x: number, y: number, format: PdfLayoutFormat): PdfLayoutResult;
    /**
     * Draws the content on the specified `PdfPage` within the specified bounds.
     *
     * @param {PdfPage} page The PDF page on which to draw the content.
     * @param {number} x The x-coordinate where the list will be drawn.
     * @param {number} y The y-coordinate where the list will be drawn.
     * @param {number} width The width of the area to draw within.
     * @param {number} height The height of the area to draw within.
     * @returns {PdfLayoutResult} A layout result object indicating the outcome of the drawing operation.
     * ```typescript
     * // Load an existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new item collection
     * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
     * // Create a new ordered list
     * let list: PdfOrderedList = new PdfOrderedList(items);
     * // Draw the list on the page associated with item collection
     * list.draw(page, 0, 20, 400, 100);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ````
     */
    draw(page: PdfPage, x: number, y: number, width: number, height: number): PdfLayoutResult;
    /**
     * Draws the content on the specified `PdfPage` at the given bounds with the specified layout format.
     *
     * @param {PdfPage} page The PDF page on which to draw the content.
     * @param {number} x The x-coordinate where the list will be drawn.
     * @param {number} y The y-coordinate where the list will be drawn.
     * @param {number} width The width of the area to draw within.
     * @param {number} height The height of the area to draw within.
     * @param {PdfLayoutFormat} format The layout format options for drawing.
     * @returns {PdfLayoutResult} A layout result object indicating the outcome of the drawing operation.
     * ```typescript
     * // Load an existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create a new item collection
     * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word', 'PDF']);
     * // Create a new ordered list
     * let list: PdfOrderedList = new PdfOrderedList(items);
     * // Create an instance for PDF layout format
     * let layout: PdfLayoutFormat = new PdfLayoutFormat();
     * // Set the layout format
     * layout.break = PdfLayoutBreakType.fitPage;
     * layout.layout = pdfLayoutType.paginate;
     * // Draw the list on the page associated with item collection
     * list.draw(page, 0, 20, 400, 100, format);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ````
     */
    draw(page: PdfPage, x: number, y: number, width: number, height: number, format: PdfLayoutFormat): PdfLayoutResult;
    _drawInternal(arg1: PdfPage, arg2: number, arg3: number, arg4?: number | PdfLayoutFormat, arg5?: number, arg6?: PdfLayoutFormat): PdfLayoutResult;
    _layout(parameter: _PdfLayoutParameters): PdfLayoutResult;
}
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
export declare class PdfOrderedList extends PdfList {
    _style: PdfNumberStyle;
    _startNumber: number;
    /**
     * Initialize a new `PdfOrderedlist` instance with item collection.
     *
     * ```typescript
     * // Load an existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Define an array of strings representing items to be added
     * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
     * // Add the items to list item collection by passing the array of products
     * let items: PdfListItemCollection = new PdfListItemCollection(products);
     * // Initialize the instance of ordered list
     * let list: PdfOrderedList = new PdfOrderedList(items);
     * // Set the item collection
     * list.items = items;
     * // Draw the ordered list on the page
     * list.draw(page, 0, 20, 500, 700);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initialize a new `PdfOrderedlist` instance with item collection.
     *
     * @param {PdfListItemCollection} items The collection of items to be
     * included in the ordered list.
     * ```typescript
     * // Load an existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Define an array of strings representing items to be added
     * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
     * // Add the items to list item collection by passing the array of products
     * let items: PdfListItemCollection = new PdfListItemCollection(products);
     * // Initialize the instance of ordered list and pass the item collection
     * let list: PdfOrderedList = new PdfOrderedList(items);
     * // Draw the ordered list on the page
     * list.draw(page, 0, 20, 500, 700);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(items: PdfListItemCollection);
    /**
     * Creates a new `PdfOrderedList` instance with the specified array of string
     * items and optional settings for font, format, pen, brush, intent, style, and
     * delimiter.
     *
     * @param {PdfListItemCollection} items An array of strings representing the
     * items in the ordered list.
     * @param {object} settings Optional settings for the list item.
     * ```typescript
     * // Load an existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Assign the array of string items
     * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
     * // Create a new font for list
     * let itemFont: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
     * // Create a new brush for list
     * let itemBrush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new format for list
     * let itemFormat: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.center);
     * // Create a new pen for list
     * let itemPen: PdfPen = new PdfPen([0, 255, 0], 1);
     * // Initialize a PdfNumberStyle for items
     * let itemStyle: PdfNumberStyle = PdfNumberStyle.numeric.
     * // Initialize a delimiter for the items
     * let itemDelimiter: string = ')';
     * // Add the items to list item collection by passing the array of products
     * let items: PdfListItemCollection = new PdfListItemCollection(products);
     * // Initialize the instance of ordered list and pass the item collection
     * and optional settings
     * let list: PdfOrderedList = new PdfOrderedList(items, {
     *     font: itemFont,
     *     format: itemFormat,
     *     pen: itemPen,
     *     brush: itemBrush,
     *     indent: 30,
     *     textIndent: 50,
     *     style: itemStyle,
     *     delimiter: itemDelimiter
     * });
     * // Draw the ordered list on the page
     * list.draw(page, 0, 20, 500, 700);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(items: PdfListItemCollection, settings: {
        font?: PdfFont;
        format?: PdfStringFormat;
        pen?: PdfPen;
        brush?: PdfBrush;
        indent?: number;
        textIndent?: number;
        style?: PdfNumberStyle;
        delimiter?: string;
        suffix?: string;
        alignment?: PdfListMarkerAlignment;
    });
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
    style: PdfNumberStyle;
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
    startNumber: number;
    _getNumber(): string;
}
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
export declare class PdfUnorderedList extends PdfList {
    _style: PdfUnorderedListStyle;
    constructor();
    /** Initialize a new `PdfUnorderedList` instance with item collection.
     *
     * @param {PdfListItemCollection} items that are added in the item collection.
     * ```typescript
     * // Load the existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Define the items in the unordered list
     * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
     * // Add the items to list item collection by passing the array of products
     * let items: PdfListItemCollection = new PdfListItemCollection(products);
     * // Create a unordered list
     * let list: PdfUnorderedList = new PdfUnorderedList(items);
     * // Draw the unordered list on the page
     * list.draw(page, 0, 20, 500, 700);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(items: PdfListItemCollection);
    /**
     * Initialize a new `PdfUnorderedList` instance with the specified array of string items and optional settings
     * for font, format, pen, brush, intent, style, and delimiter.
     *
     * @param {PdfListItemCollection} items An array of strings representing the items in the Unordered list.
     * @param {object} settings Optional settings for the list item.
     * ```typescript
     * // Load the existing document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Define the items in the unordered list
     * let products: string[] = ['Excel', 'Power', 'Point', 'Word', 'PDF'];
     * // Create a new font for list
     * let itemFont: PdfStandardFont = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
     * // Create a new brush for list
     * let itemBrush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new format for list
     * let itemFormat: PdfStringFormat = new PdfStringFormat(PdfTextAlignment.center);
     * // Create a new pen for list
     * let itemPen: PdfPen = new PdfPen([0, 255, 0],1);
     * // Initialise a PdfUnorderedListStyle
     * let itemStyle: PdfNumberStyle = PdfUnorderedListStyle.square.
     * // Initialize a delimiter for the items
     * let itemDelimiter: string = ')';
     * // Add the items to list item collection by passing the array of products
     * let items: PdfListItemCollection = new PdfListItemCollection(products);
     * // Initialize the instance of the unordered list and pass the list item collection and settings
     * let list: PdfUnorderedList = new PdfUnorderedList(items, {
     *     font: itemFont,
     *     format: itemFormat,
     *     pen: itemPen,
     *     brush: itemBrush,
     *     indent: 30,
     *     textIndent: 50,
     *     style: itemStyle,
     *     delimiter: itemDelimiter
     * });
     * // Draw the unordered list on the page
     * list.draw(page, 0, 20, 500, 700);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(items?: PdfListItemCollection, settings?: {
        font?: PdfFont;
        format?: PdfStringFormat;
        pen?: PdfPen;
        brush?: PdfBrush;
        indent?: number;
        textIndent?: number;
        style?: PdfUnorderedListStyle;
        delimiter?: string;
        suffix?: string;
        alignment?: PdfListMarkerAlignment;
    });
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
    style: PdfUnorderedListStyle;
    _getStyledText(): string;
    _draw(graphics: PdfGraphics, x: number, y: number, brush: PdfBrush, pen: PdfPen): void;
}
export declare class _PdfListInfo {
    _index: number;
    _list: PdfList;
    _number: string;
    _brush: PdfBrush;
    _pen: PdfPen;
    _font: PdfFont;
    _format: PdfStringFormat;
    _markerWidth: number;
    constructor(list: PdfList, index?: number, number?: string);
}
export declare class _PdfListLayouter {
    _element: PdfList;
    _graphics: PdfGraphics;
    _currentFormat: PdfStringFormat;
    _currentPage: PdfPage;
    _bounds: number[];
    _curList: PdfList;
    _indent: number;
    _currentBrush: PdfBrush;
    _currentPen: PdfPen;
    _currentFont: PdfFont;
    _information: _PdfListInfo[];
    _markerMaxWidth: number;
    _finish: boolean;
    _usePaginateBounds: boolean;
    _resultHeight: number;
    _size: number[];
    _index: number;
    constructor(element: PdfList);
    layout(graphics: PdfGraphics, bounds: number[]): void;
    layoutInternal(parameter: _PdfLayoutParameters): PdfLayoutResult;
    private _layoutOnPage;
    private _drawItem;
    private _createMarkerResult;
    private _drawMarker;
    private _drawUnorderedMarker;
    private _drawOrderedMarker;
    private _setCurrentParameters;
    private _getMarkerMaxWidth;
    private _createUnorderedMarkerResult;
    private _createOrderedMarkerResult;
    private _setMarkerStringFormat;
    private _getMarkerFont;
    private _getMarkerFormat;
    private _getMarkerPen;
    private _getMarkerBrush;
    private _getNextPage;
}
