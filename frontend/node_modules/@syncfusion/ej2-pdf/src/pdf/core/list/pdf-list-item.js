/**
 * Represents the items of the list.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Create an instance of list item collection by passing the string array
 * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
 * // Create a new list item and add into the collection
 * items.add(new PdfListItem('PDF'));
 * // Create a new PDF ordered list
 * let list: PdfOrderedList = new PdfOrderedList(items);
 * // Draw the list items
 * list.draw(page, 0, 20);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ````
 */
var PdfListItem = /** @class */ (function () {
    /**
     * Creates a new `PdfListItem` instance with the specified text and optional settings for font, format, pen, and brush.
     *
     * @param {string} text The text content for the list item.
     * @param {object} [settings] Optional settings for the list item.
     * @param {PdfFont} [settings.font] The font used for rendering the text.
     * @param {PdfStringFormat} [settings.format] The string format used for text layout.
     * @param {PdfBrush} [settings.brush] The brush used for filling shapes or text.
     * @param {PdfPen} [settings.pen] The pen used for drawing outlines.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Create an instance of list item collection by passing the string array
     * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
     * // Create a new list item
     * let item: PdfListItem = new PdfListItem('PDF', {brush: new PdfBrush([255, 0, 0])});
     * // Add the list item into the collection
     * items.add(item);
     * // Create a new PDF ordered list
     * let list: PdfOrderedList = new PdfOrderedList(items);
     * // Draw the list items
     * list.draw(page, 0, 20);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ````
     */
    function PdfListItem(text, settings) {
        this._textIndent = 0;
        if (text === null || typeof text === 'undefined') {
            throw new Error('Text cannot be null or undenfied.');
        }
        this._text = text;
        if (settings) {
            if (settings.font) {
                this._font = settings.font;
            }
            if (settings.format) {
                this._stringFormat = settings.format;
            }
            if (settings.pen) {
                this._pen = settings.pen;
            }
            if (settings.brush) {
                this._brush = settings.brush;
            }
        }
    }
    Object.defineProperty(PdfListItem.prototype, "brush", {
        /**
         * Gets the brush associated with the list item.
         *
         * @returns {PdfBrush} The brush to specify the fill color of the list item.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('PDF', {brush: new PdfBrush([255, 0, 0])});
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Access the brush from the list item
         * let brush: PdfBrush = item.brush;
         * // Draw the list items
         * list.draw(page, 0, 20);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._brush;
        },
        /**
         * Sets the brush associated with the list item.
         *
         * @param {PdfBrush} value The brush to specify the fill color of the list item.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('PDF');
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the fill color
         * item.brush = new PdfBrush([255, 0, 0]);
         * // Draw the list items
         * list.draw(page, 0, 20);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._brush = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListItem.prototype, "pen", {
        /**
         * Gets the `PdfPen` object associated with the list item.
         *
         * @returns {PdfPen} The `PdfPen` object to specify specify stroke properties.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('PDF', {pen: new PdfPen([255, 0, 0], 1)});
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Access the pen from the list item
         * let pen: PdfPen = item.pen;
         * // Draw the list items
         * list.draw(page, 0, 20);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        get: function () {
            return this._pen;
        },
        /**
         * Sets the `Pdfpen` object associated with the list item.
         *
         * @param {PdfPen} value `PdfPen` object used to specify stroke properties.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('PDF');
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the stroke color
         * item.pen = new PdfPen([255, 0, 0], 1);
         * // Draw the list items
         * list.draw(page, 0, 20);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._pen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListItem.prototype, "font", {
        /**
         * Get the `PdfFont` object associated with the list item.
         *
         * @returns {PdfFont} The `PdfFont` object used for text rendering.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('PDF', {pen: new PdfStandardFont(PdfFontFamily.timesRoman, 12)});
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Access the font from the list item
         * let font: PdfFont = item.font;
         * // Draw the list items
         * list.draw(page, 0, 20);
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
         * Sets the `PdfFont` object associated with the list item.
         *
         * @param {PdfFont} value The `PdfFont` object to be set for text rendering.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('PDF');
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the font
         * item.font = new PdfStandardFont(PdfFontFamily.timesRoman, 12);
         * // Draw the list items
         * list.draw(page, 0, 20);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._font = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListItem.prototype, "stringFormat", {
        /**
         * Gets the `PdfStringFormat` object associated with the list item.
         *
         * @returns {PdfStringFormat} The `PdfStringFormat` object used to specify text formatting.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('PDF', {format: new PdfStringFormat(PdfTextAlignment.right, PdfVerticalAlignment.bottom)});
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Access the string format from the list item
         * let format: PdfStringFormat = item.stringFormat;
         * // Draw the list items
         * list.draw(page, 0, 20);
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
         * Sets the `PdfStringFormat` object associated with the list item.
         *
         * @param {PdfStringFormat} value The`PdfStringFormat` object to be set for text formatting.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('PDF');
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the font
         * item.font = new PdfStandardFont(PdfFontFamily.timesRoman, 12);
         * // Draw the list items
         * list.draw(page, 0, 20);
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
    Object.defineProperty(PdfListItem.prototype, "text", {
        /**
         * Gets the text content of the list item.
         *
         * @returns {string} The text content of the list item.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the first Page of the document
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of an ordered list
         * let list: OrderedList =  new OrderedList();
         * // Create a list item with text 'Products'
         * let item: PdfListItem = new PdfListItem('Products');
         * // Add the item to the list collection
         * list.items.add(item1);
         * // Get the text content of the item
         * let text: string = item.text;
         * // Draw the list items on the specified page
         * list.draw(page, 10, 50. 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._text;
        },
        /**
         * Sets string format of the list item.
         *
         * @param {string} value The text content to be set.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data);
         * // Access the first page
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of list item collection by passing the string array
         * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point']);
         * // Create a new list item
         * let item: PdfListItem = new PdfListItem('Word');
         * // Add the list item into the collection
         * items.add(item);
         * // Create a new PDF ordered list
         * let list: PdfOrderedList = new PdfOrderedList(items);
         * // Set the text of the list item
         * item.text = 'PDF';
         * // Draw the list items
         * list.draw(page, 0, 20);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ````
         */
        set: function (value) {
            this._text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListItem.prototype, "textIndent", {
        /**
         * Gets the text indent of the list.
         *
         * @returns {number} The text indent of the list item.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of an ordered list
         * let list: OrderedList =  new OrderedList();
         * // Create a list item with text 'Products'
         * let item: PdfListItem = new PdfListItem('Products');
         * // Add the item to the list collection
         * list.items.add(item);
         * // Get the text indent of the item
         * let textIndent: number = item.textIndent;
         * // Draw the list items on the specified page
         * list.draw(page, 10, 50. 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._textIndent;
        },
        /**
         * Sets the text indent of the list item.
         *
         * @param {number} value he text indent value to be set.
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the first Page of the document
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of an ordered list
         * let list: OrderedList =  new OrderedList();
         * // Create a list item with text 'Products'
         * let item: PdfListItem = new PdfListItem('Products');
         * // Set the text indent for the item
         * item.textIndent = 30;
         * // Add the item to the list collection
         * list.items.add(item);
         * // Draw the list items on the specified page at position (10, 50)
         * list.draw(page, 10, 50. 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._textIndent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfListItem.prototype, "subList", {
        /**
         * Get the sub-list associated with the current list item.
         *
         * @returns {PdfList} The `PdfList` object representing the sub-list.
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the first Page of the document
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of an ordered list
         * let list: OrderedList =  new OrderedList();
         * // Create a list item with text 'Products'
         * let item: PdfListItem = new PdfListItem('Products');
         * // Add the item to the list collection
         * list.items.add(item);
         * // create a sublist for the item
         * let sublist: OrderedList = new PdfOrderedList();
         * // Adding items to the sublist
         * subList.items.add(new PdfListItem('Sub Item 1'));
         * subList.items.add(new PdfListItem('Sub Item 2'));
         * // Set the sublist for the main list item
         * list.items._listItem[0].subList = subList;
         * // Get the sublist
         * let sublist: PdfList = list.items._listitem[0].sublist;
         * // Draw the list items on the specified page
         * list.draw(page, 10, 50. 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._subList;
        },
        /**
         * Sets the sub-list associated with the current list item.
         *
         * @param {PdfList} value The `PdfList` object to be set as the sub-list.
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the first Page of the document
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of an ordered list
         * let list: OrderedList =  new OrderedList();
         * // Create a list item with text 'Products'
         * let item: PdfListItem = new PdfListItem('Products');
         * // Add the item to the list collection
         * list.items.add(item);
         * // Create a sublist for the item
         * let sublist: OrderedList = new PdfOrderedList();
         * // Adding items to the sublist
         * subList.items.add(new PdfListItem('PDF'));
         * subList.items.add(new PdfListItem('Word'));
         * subList.items.add(new PdfListItem('PPT'));
         * // Set the sublist for the main list item
         * list.items._listItem[0].subList = subList;
         * // Draw the list items on the specified page
         * list.draw(page, 10, 50. 500, 700);
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        set: function (value) {
            this._subList = value;
        },
        enumerable: true,
        configurable: true
    });
    return PdfListItem;
}());
export { PdfListItem };
/**
 * Represents a collection of list items that can be drawn on a PDF page.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Create an instance of list item collection by passing the string array
 * let items: PdfListItemCollection = new PdfListItemCollection(['Excel', 'Power', 'Point', 'Word']);
 * // Create a new PDF ordered list
 * let list: PdfOrderedList = new PdfOrderedList(items);
 * // Draw the list items
 * list.draw(page, 0, 20);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ````
 */
var PdfListItemCollection = /** @class */ (function () {
    function PdfListItemCollection(items) {
        var _this = this;
        if (!this._listItems) {
            this._listItems = [];
        }
        if (items) {
            items.forEach(function (item) {
                _this.add(new PdfListItem(item));
            });
        }
    }
    Object.defineProperty(PdfListItemCollection.prototype, "count", {
        /**
         * Gets the count of the list item collection.
         *
         * @returns {number} The count of the list items.
         * ```typescript
         * // Load an existing PDF document
         * let document: PdfDocument = new PdfDocument(data, password);
         * // Access the first page of the document
         * let page: PdfPage = document.getPage(0);
         * // Create an instance of ordered list
         * let list: PdfOrderedList = new PdfOrderedList();
         * // Initialize an array of string items
         * let products: string[] = ['Word', 'Excel', 'PDF', 'Power Point'];
         * // Add the items to list item collection by passing the array of products
         * list.items = new PdfListCollection(products);
         * / Draw the list on the page at specified bounds
         * list.draw(page,0, 10, 500, 700);
         * // Get the count of items from the list
         * let count: number = list.items.count;
         * // Save the document
         * document.save('output.pdf');
         * // Destroy the document
         * document.destroy();
         * ```
         */
        get: function () {
            return this._listItems.length;
        },
        enumerable: true,
        configurable: true
    });
    PdfListItemCollection.prototype.add = function (item, itemIndent) {
        if (item) {
            this._listItems.push(item);
            if (itemIndent) {
                item.textIndent = itemIndent;
            }
        }
        else {
            throw new Error('item should not be null');
        }
    };
    /**
     * Retrieves the `PdfListItem` at the specified index in the collection.
     *
     * @param {number} index The zero-based index of the item to retrieve.
     * @returns {PdfListItem} The `PdfListItem` at the specified index.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Accessing the first page of the document
     * let page: PdfPage = document.getpage(0);
     * // Create a ordered list
     * let list: PdfOrderedList = new PdfOrderedList();
     * // Initialize an array of strings
     * let products: string[] = ['Excel', 'Power Point', 'Word', 'Windows', 'MAUI'];
     * // Add the items to list item collection by passing the array of products
     * let itemCollection: PdfListItemCollection = new PdfListItemCollection(products);
     * // Retrieve a specific item from the list collection at a particular index
     * let item: PdflistItem = list.itemCollection.itemAt(1);
     * // Draw the list items on the page at specified coordinates and dimensions
     * list.draw(page, 10, 50, 500, 700);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListItemCollection.prototype.at = function (index) {
        if (index === null) {
            throw new Error('index should not be null');
        }
        var item = this._listItems[Number.parseInt(index.toString(), 10)];
        return item;
    };
    /**
     * Removes a `PdfListItem` from the collection.
     *
     * @param {PdfListItem} item The list item to be removed from the collection.
     * @returns {void}
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(readFromResources('CircleAnnotation-Acrobat.pdf'));
     * // Access the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Create a ordered list
     * let list: PdfOrderedList = new PdfOrderedList();
     * // Initialize an array of strings
     * let products: string[] = [
     *   'PDF is a file format designed to present documents consistently across devices and platforms.',
     *   'Excel is a widely used spreadsheet application developed by Microsoft.',
     *   'PDF stands for Portable Document Format.',
     *   'PowerPoint is a presentation program developed by Microsoft for creating slideshows.',
     *   'PowerPoint is widely used in business settings for creating presentations.'
     * ];
     * // Add the items to list item collection by passing the array of products
     * let item: PdfListItemCollection = new PdfListItemCollection(products);
     * // Remove a specific item from the collection
     * let itemToRemove: PdfListItem = list.items.at(0);
     * list.items.remove(itemToRemove);
     * // Draw the list on the page at specified coordinates and dimensions
     * list.draw(page, 10, 40, 300, 500);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListItemCollection.prototype.remove = function (item) {
        if (!item) {
            throw new Error('item should not be null');
        }
        var found = false;
        for (var i = 0; i < this._listItems.length; i++) {
            if (this._listItems[Number.parseInt(i.toString(), 10)] === item) {
                found = true;
                this._listItems.splice(Number.parseInt(i.toString(), 10), 1);
                break;
            }
        }
        if (!found) {
            throw new Error('item collection does not contain the given content');
        }
    };
    /**
     * Removes a `PdfListItem` at the specified index from the collection.
     *
     * @param {number} index The zero-based index of the item to remove.
     * @returns {void}
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(readFromResources('CircleAnnotation-Acrobat.pdf'));
     * // Access the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Create a ordered list
     * let list: PdfOrderedList = new PdfOrderedList();
     * // Initialize an array of strings
     * let products: string[] = [
     *   'PDF is a file format designed to present documents consistently across devices and platforms.',
     *   'Excel is a widely used spreadsheet application developed by Microsoft.',
     *   'PDF stands for Portable Document Format.',
     *   'PowerPoint is a presentation program developed by Microsoft for creating slideshows.',
     *   'PowerPoint is widely used in business settings for creating presentations.'
     * ];
     * // Add the items to list item collection by passing the array of products
     * let item: PdfListItemCollection = new PdfListItemCollection(products);
     * // Remove a specific item from the collection by its index
     * list.items.removeAt(1);
     * // Draw the modified list on the page at specified bounds
     * list.draw(page, 10, 40, 300, 500);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListItemCollection.prototype.removeAt = function (index) {
        if (index < 0 || index >= this._listItems.length) {
            throw new Error('The index should be less than items count or equal to 0');
        }
        this._listItems.splice(index, 1);
    };
    /**
     * Clear the list item collection.
     *
     * @returns {void}
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(readFromResources('CircleAnnotation-Acrobat.pdf'));
     * // Access the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Create a ordered list
     * let list: PdfOrderedList = new PdfOrderedList();
     * // Initialize an array of strings
     * let products: string[] = [
     *   'PDF is a file format designed to present documents consistently across devices and platforms.',
     *   'Excel is a widely used spreadsheet application developed by Microsoft.',
     *   'PDF stands for Portable Document Format.',
     *   'PowerPoint is a presentation program developed by Microsoft for creating slideshows.',
     *   'PowerPoint is widely used in business settings for creating presentations.'
     * ];
     * // Add the items to list item collection by passing the array of products
     * let item: PdfListItemCollection = new PdfListItemCollection(products);
     * // Draw the initial list on the page at specified coordinates and dimensions
     * list.draw(page, 10, 40, 300, 500);
     * // Clear the list item collection
     * list.items.clear();
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListItemCollection.prototype.clear = function () {
        this._listItems = [];
    };
    /**
     * Inserts a `PdfListItem` into the collection at the specified index.
     *
     * @param {number} index The zero-based index at which the item should be inserted.
     * @param {PdfListItem} item The list item to be inserted into the collection.
     * @param {number} itemIndent The indent of the list item.
     * @returns {void}
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(readFromResources('CircleAnnotation-Acrobat.pdf'));
     * // Access the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Create a ordered list
     * let list: PdfOrderedList = new PdfOrderedList();
     * // Initialize an array of strings
     * let products: string[] = [
     *   'PDF is a file format designed to present documents consistently across devices and platforms.',
     *   'Excel is a widely used spreadsheet application developed by Microsoft.',
     *   'PDF stands for Portable Document Format.',
     *   'PowerPoint is a presentation program developed by Microsoft for creating slideshows.',
     *   'PowerPoint is widely used in business settings for creating presentations.'
     * ];
     * // Add the items to list item collection by passing the array of products
     * list.items = new PdfListItemCollection(products);
     * // Create a new PdfListItem instance with some text
     * let item: PdfListItem = new PdfListItem('text');
     * // Insert the new item into the list at index 1 with an indent of 40
     * list.items.insert(1, item, 40);
     * // Draw the updated list on the page at specified coordinates and dimensions
     * list.draw(page, 10, 40, 300, 500);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListItemCollection.prototype.insert = function (index, item, itemIndent) {
        if (index < 0 || index > this._listItems.length) {
            throw new Error('Index should be within the range of items count (inclusive).');
        }
        if (!item) {
            throw new Error('Item cannot be null.');
        }
        if (itemIndent) {
            item.textIndent = itemIndent;
        }
        this._listItems.splice(index, 0, item);
    };
    /**
     * Finds the index of a `PdfListItem` in the collection.
     *
     * @param {PdfListItem} item The list item to find in the collection.
     * @returns {number} The zero-based index of the item in the collection, or -1 if not found.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(readFromResources('CircleAnnotation-Acrobat.pdf'));
     * // Access the first page of the document
     * let page: PdfPage = document.getPage(0);
     * // Create a ordered list
     * let list: PdfOrderedList = new PdfOrderedList();
     * // Initialize an array of strings
     * let products: string[] = [
     *   'PDF is a file format designed to present documents consistently across devices and platforms.',
     *   'Excel is a widely used spreadsheet application developed by Microsoft.',
     *   'PDF stands for Portable Document Format.',
     *   'PowerPoint is a presentation program developed by Microsoft for creating slideshows.',
     *   'PowerPoint is widely used in business settings for creating presentations.'
     * ];
     * // Add the items to list item collection by passing the array of products
     * list.items = new PdfListItemCollection(products);
     * // Retrieve the first item from the collection
     * let item: PdfListItem = item._listItems[0];
     * // Find the index of the first item in the collection
     * let index: number = list.items.indexOf(item);
     * // Draw the list on the page at specified bounds
     * list.draw(page, 10, 40, 300, 500);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    PdfListItemCollection.prototype.indexOf = function (item) {
        if (!item) {
            throw new Error('Item should be defined.');
        }
        return this._listItems.indexOf(item);
    };
    return PdfListItemCollection;
}());
export { PdfListItemCollection };
