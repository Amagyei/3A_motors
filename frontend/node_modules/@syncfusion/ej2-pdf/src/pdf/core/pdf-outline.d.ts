import { PdfTextStyle } from './enumerator';
import { _PdfCrossReference } from './pdf-cross-reference';
import { PdfDestination } from './pdf-page';
import { _PdfDictionary, _PdfReference } from './pdf-primitives';
/**
 * Represents a base class for all bookmark objects.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get bookmarks
 * let bookmarks: PdfBookmarkBase = document.bookmarks;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfBookmarkBase {
    _dictionary: _PdfDictionary;
    _crossReference: _PdfCrossReference;
    _bookMarkList: PdfBookmark[];
    _destination: PdfDestination;
    _color: number[];
    _isExpanded: boolean;
    _namedDestination: PdfNamedDestination;
    _title: string;
    _textStyle: PdfTextStyle;
    _isLoadedBookmark: boolean;
    _reference: _PdfReference;
    /**
     * Initializes a new instance of the `PdfBookmarkBase` class.
     *
     * @private
     * @param {_PdfDictionary} dictionary Outline dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference.
     *
     */
    constructor(dictionary: _PdfDictionary, crossReference: _PdfCrossReference);
    /**
     * Gets the bookmark count (Read only).
     *
     * @returns {number} Number of bookmarks.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Get bookmark count
     * let bookmarkCount: number = bookmarks.count;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly count: number;
    /**
     * Gets the boolean flag indicating whether the bookmark is expanded or not.
     *
     * @returns {boolean} whether the bookmark is expanded or not.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the boolean flag indicating whether the bookmark is expanded or not
     * let isExpanded: boolean = bookmark.isExpanded;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean flag indicating whether the bookmark is expanded or not.
    *
    * @param {boolean} value whether the bookmark is expanded or not.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the bookmarks
    * let bookmarks: PdfBookmarkBase = document.bookmarks;
    * // Gets bookmark at the specified index
    * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
    * // Sets the boolean flag indicating whether the bookmark is expanded or not
    * bookmark.isExpanded = true;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    isExpanded: boolean;
    /**
     * Gets the `PdfBookmark` at the specified index.
     *
     * @param {number} index Bookmark index.
     * @returns {PdfBookmark} Bookmark at the specified index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Get bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    at(index: number): PdfBookmark;
    /**
     * Gets the boolean flag indicating whether `PdfBookmark` is present or not.
     *
     * @param {PdfBookmark} outline Bookmark.
     * @returns {boolean} whether the bookmark is present or not.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Get the bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the boolean flag indicating whether `PdfBookmark` is present or not.
     * let isPresent: boolean = bookmarks.contains(bookmark);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    contains(outline: PdfBookmark): boolean;
    /**
     * Creates and adds a new outline to the PDF document.
     *
     * @param {string} title The title of the outline.
     * @returns {PdfBookmark} PDF bookmark.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page of the PDF
     * let page: PdfPage = document.getPage(0);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Add a new outline to the PDF document
     * let bookmark: PdfBookmark = bookmarks.add('Introduction');
     * // Sets destination to the bookmark
     * bookmark.destination = new PdfDestination(page, [10, 10]);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    add(title: string): PdfBookmark;
    /**
     * Insert a new outline to the PDF document at specified index.
     *
     * @param {string} title The title of the outline.
     * @param {index} index The index to insert.
     * @returns {PdfBookmark} PDF bookmark.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page of the PDF
     * let page: PdfPage = document.getPage(0);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Add a new outline to the PDF document
     * let bookmark: PdfBookmark = bookmarks.add('Introduction');
     * // Sets destination to the bookmark
     * bookmark.destination = new PdfDestination(page, [10, 10]);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    add(title: string, index: number): PdfBookmark;
    /**
     * Remove specified bookmark from the document.
     *
     * @param {string} title The title of the outline.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page of the PDF
     * let page: PdfPage = document.getPage(0);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Remove specified bookmark from the document.
     * bookmarks.remove('Introduction');
     * // Sets destination to the bookmark
     * bookmark.destination = new PdfDestination(page, [10, 10]);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    remove(title: string): void;
    /**
     * Remove the bookmark from the document at the specified index.
     *
     * @param {number} index The index.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page of the PDF
     * let page: PdfPage = document.getPage(0);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Remove the bookmark from the document at the index 1.
     * bookmarks.remove(1);
     * // Sets destination to the bookmark
     * bookmark.destination = new PdfDestination(page, [10, 10]);
     * // Destroy the document
     * document.destroy();
     * ```
     */
    remove(index: number): void;
    /**
     * Removes all the bookmark from the collection.
     *
     * @returns {void} Nothing.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Remove all the bookmark from the collection.
     * bookmarks.clear();
     * // Get count after removal of all outlines.
     * let count: number = bookmarks.count;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    clear(): void;
    _removeFirst(dictionary: _PdfDictionary): void;
    _removeLast(dictionary: _PdfDictionary): void;
    _removeNext(dictionary: _PdfDictionary): void;
    _removePrevious(dictionary: _PdfDictionary): void;
    _removeCount(dictionary: _PdfDictionary): void;
    _updateBookmarkList(index: number, bookmark?: PdfBookmark): void;
    _updateCount(): void;
    _reproduceTree(): void;
    _getBookmark(bookmarkBase: PdfBookmarkBase, isFirst?: boolean): PdfBookmark;
}
/**
 * Represents a bookmark in a PDF document
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the bookmarks
 * let bookmarks: PdfBookmarkBase = document.bookmarks;
 * // Gets the bookmark at the specified index
 * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfBookmark extends PdfBookmarkBase {
    /**
     * Initializes a new instance of the `PdfBookmark` class.
     *
     * @private
     * @param {_PdfDictionary} dictionary Bookmark dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference.
     *
     */
    constructor(dictionary: _PdfDictionary, crossReference: _PdfCrossReference);
    /**
     * Gets the destination.
     *
     * @returns {PdfDestination} Page destination.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets the bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the destination
     * let destination: PdfDestination = bookmark.destination;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the destination.
    *
    * @param {PdfDestination} value destination.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the bookmarks
    * let bookmarks: PdfBookmarkBase = document.bookmarks;
    * // Gets the bookmark at the specified index
    * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
    * // Set the destination
    * bookmark.destination = new PdfDestination(page, [100, 200]);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    destination: PdfDestination;
    /**
     * Gets the named destination.
     *
     * @returns {PdfNamedDestination} Named destination.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the named destination
     * let namedDestination: PdfNamedDestination = bookmark.namedDestination;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the named destination.
    *
    * @param {PdfNamedDestination} value Named destination.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the bookmarks
    * let bookmarks: PdfBookmarkBase = document.bookmarks;
    * // Gets bookmark at the specified index
    * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
    * // Gets the named destination
    * let namedDestination: PdfNamedDestination = bookmark.namedDestination;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    namedDestination: PdfNamedDestination;
    /**
     * Gets the bookmark title.
     *
     * @returns {string} Bookmark title.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the bookmark title
     * let bookmarkTitle: string = bookmark.title;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bookmark title.
    *
    * @param {string} value Bookmark title.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the bookmarks
    * let bookmarks: PdfBookmarkBase = document.bookmarks;
    * // Gets bookmark at the specified index
    * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
    * // Sets the bookmark title
    * bookmark.title = 'Syncfusion';
    * // Destroy the document
    * document.destroy();
    * ```
    */
    title: string;
    /**
     * Gets the bookmark color.
     *
     * @returns {number[]} Bookmark color.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the bookmark color
     * let color: number[] = bookmark.color;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the bookmark color.
    *
    * @param {number[]} value Bookmark color.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the bookmarks
    * let bookmarks: PdfBookmarkBase = document.bookmarks;
    * // Gets bookmark at the specified index
    * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
    * // Sets the bookmark color
    * bookmark.color = [255, 0, 0];
    * // Destroy the document
    * document.destroy();
    * ```
    */
    color: number[];
    /**
     * Gets the text style.
     *
     * @returns {PdfTextStyle} Text style.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the textStyle
     * let textStyle: PdfTextStyle = bookmark.textStyle;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the text style.
    *
    * @param {PdfTextStyle} value Text style.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the bookmarks
    * let bookmarks: PdfBookmarkBase = document.bookmarks;
    * // Gets bookmark at the specified index
    * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
    * // Sets the textStyle
    * bookmark.textStyle = PdfTextStyle.italic;
    * // Destroy the document
    * document.destroy();
    * ```
    */
    textStyle: PdfTextStyle;
    readonly _next: PdfBookmark;
    _updateTextStyle(value: PdfTextStyle): void;
    _obtainTextStyle(): PdfTextStyle;
    _obtainNamedDestination(): PdfNamedDestination;
}
/**
 * Represents a named destination in a PDF document.
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Get the bookmarks
 * let bookmarks: PdfBookmarkBase = document.bookmarks;
 * // Gets the bookmark at the specified index
 * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
 * // Gets the named destination
 * let namedDestination: PdfNamedDestination = bookmark.namedDestination;
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfNamedDestination {
    _destination: PdfDestination;
    _title: string;
    _dictionary: _PdfDictionary;
    _crossReference: _PdfCrossReference;
    /**
     * Initializes a new instance of the `PdfNamedDestination` class.
     *
     * @param {string} title The title.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets the bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Sets the named destination
     * bookmark.namedDestination = new PdfNamedDestination('Chapter 1');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(title: string);
    /**
     * Initializes a new instance of the `PdfNamedDestination` class.
     *
     * @private
     * @param {_PdfDictionary} dictionary Destination dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference.
     *
     */
    constructor(dictionary: _PdfDictionary, crossReference: _PdfCrossReference);
    /**
     * Gets the destination.
     *
     * @returns {PdfDestination} Page destination.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets the bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the named destination
     * let namedDestination: PdfNamedDestination = bookmark.namedDestination;
     * // Gets the destination
     * let destination: PdfDestination = namedDestination.destination;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the destination.
    *
    * @param {PdfDestination} value destination.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the bookmarks
    * let bookmarks: PdfBookmarkBase = document.bookmarks;
    * // Gets the bookmark at the specified index
    * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
    * // Gets the named destination
    * let namedDestination: PdfNamedDestination = bookmark.namedDestination;
    * // Set the destination
    * namedDestination.destination = new PdfDestination(page, [100, 200]);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    destination: PdfDestination;
    /**
     * Gets the title.
     *
     * @returns {string} title.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Get the bookmarks
     * let bookmarks: PdfBookmarkBase = document.bookmarks;
     * // Gets the bookmark at the specified index
     * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
     * // Gets the named destination
     * let namedDestination: PdfNamedDestination = bookmark.namedDestination;
     * // Gets the title
     * let title: string = namedDestination.title;
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the title.
    *
    * @param {string} value title.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Get the bookmarks
    * let bookmarks: PdfBookmarkBase = document.bookmarks;
    * // Gets the bookmark at the specified index
    * let bookmark: PdfBookmark = bookmarks.at(0) as PdfBookmark;
    * // Gets the named destination
    * let namedDestination: PdfNamedDestination = bookmark.namedDestination;
    * // Set the title
    * namedDestination.title = 'Syncfusion';
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    title: string;
    _initialize(): void;
}
export declare class _PdfNamedDestinationCollection {
    _dictionary: _PdfDictionary;
    _crossReference: _PdfCrossReference;
    _namedDestinations: PdfNamedDestination[];
    constructor();
    constructor(dictionary: _PdfDictionary, crossReference: _PdfCrossReference);
    private _findDestination;
    _addCollection(destination: _PdfDictionary): void;
}
