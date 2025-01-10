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
import { PdfDestinationMode, PdfRotationAngle, PdfTextStyle } from './enumerator';
import { PdfDestination } from './pdf-page';
import { _PdfDictionary, _PdfName, _PdfReference } from './pdf-primitives';
import { _checkRotation, _getPageIndex, _isNullOrUndefined, _obtainDestination, _parseColor } from './utils';
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
var PdfBookmarkBase = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PdfBookmarkBase` class.
     *
     * @private
     * @param {_PdfDictionary} dictionary Outline dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference.
     *
     */
    function PdfBookmarkBase(dictionary, crossReference) {
        this._bookMarkList = [];
        this._isExpanded = false;
        this._isLoadedBookmark = false;
        this._dictionary = dictionary;
        this._crossReference = crossReference;
    }
    Object.defineProperty(PdfBookmarkBase.prototype, "count", {
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
        get: function () {
            if (this._isLoadedBookmark && this._bookMarkList.length === 0) {
                this._reproduceTree();
            }
            return this._bookMarkList.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfBookmarkBase.prototype, "isExpanded", {
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
        get: function () {
            if (this._dictionary && this._dictionary.has('Count')) {
                return (this._dictionary.get('Count') >= 0);
            }
            else {
                return this._isExpanded;
            }
        },
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
        set: function (value) {
            this._isExpanded = value;
            if (this.count > 0 && this._dictionary) {
                this._dictionary.update('Count', value ? this._bookMarkList.length : (-this._bookMarkList.length));
            }
        },
        enumerable: true,
        configurable: true
    });
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
    PdfBookmarkBase.prototype.at = function (index) {
        var bookmark;
        if (index < 0 || index >= this.count) {
            throw Error('Index out of range.');
        }
        if (_isNullOrUndefined(this._bookMarkList) && this._bookMarkList.length > 0 && index < this._bookMarkList.length) {
            bookmark = this._bookMarkList[Number.parseInt(index.toString(), 10)];
        }
        return bookmark;
    };
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
    PdfBookmarkBase.prototype.contains = function (outline) {
        return this._bookMarkList.indexOf(outline) !== -1;
    };
    PdfBookmarkBase.prototype.add = function (title, index) {
        var bookmark;
        if (this._dictionary) {
            var dictionary = new _PdfDictionary(this._crossReference);
            dictionary.update('Parent', this._reference);
            var reference = this._crossReference._getNextReference();
            this._crossReference._cacheMap.set(reference, dictionary);
            bookmark = new PdfBookmark(dictionary, this._crossReference);
            bookmark._reference = reference;
            bookmark.title = title;
            if (typeof index === 'undefined') {
                if (this.count === 0) {
                    this._dictionary.update('First', reference);
                    this._dictionary.update('Last', reference);
                }
                else {
                    var last = this.at(this.count - 1);
                    this._dictionary.update('Last', reference);
                    if (last && last._reference) {
                        dictionary.update('Prev', last._reference);
                        last._dictionary.update('Next', reference);
                    }
                }
                this._bookMarkList.push(bookmark);
            }
            else {
                if (index < 0 || index > this.count) {
                    throw new Error('Index out of range');
                }
                if (this.count === 0) {
                    this._dictionary.update('First', reference);
                    this._dictionary.update('Last', reference);
                    this._bookMarkList.push(bookmark);
                }
                else if (index === this.count) {
                    var last = this.at(this.count - 1);
                    this._dictionary.update('Last', reference);
                    if (last && last._reference) {
                        dictionary.update('Prev', last._reference);
                        last._dictionary.update('Next', reference);
                    }
                    this._bookMarkList.push(bookmark);
                }
                else if (index === 0) {
                    var first = this.at(0);
                    this._dictionary.update('First', reference);
                    if (first && first._reference) {
                        dictionary.update('Next', first._reference);
                        first._dictionary.update('Prev', reference);
                    }
                    this._updateBookmarkList(index, bookmark);
                }
                else {
                    var next = this.at(index);
                    var prev = this.at(index - 1);
                    if (prev && prev._reference && next && next._reference) {
                        dictionary.update('Prev', prev._reference);
                        prev._dictionary.update('Next', reference);
                        next._dictionary.update('Prev', reference);
                        dictionary.update('Next', next._reference);
                    }
                    this._updateBookmarkList(index, bookmark);
                }
            }
            this._updateCount();
        }
        return bookmark;
    };
    PdfBookmarkBase.prototype.remove = function (value) {
        if (typeof value === 'string') {
            for (var i = this._bookMarkList.length - 1; i >= 0; i--) {
                var bookmark = this.at(i);
                if (bookmark.title === value) {
                    this.remove(i);
                }
                else if (bookmark.count > 0) {
                    bookmark.remove(value);
                }
            }
        }
        else {
            if (value >= 0 && value < this.count) {
                if (this.count === 1) {
                    this._removeFirst(this._dictionary);
                    this._removeLast(this._dictionary);
                    this._removeCount(this._dictionary);
                    this._bookMarkList = [];
                }
                else {
                    if (value === 0) {
                        var next = this.at(value + 1);
                        if (this._dictionary && next && next._reference) {
                            this._removePrevious(next._dictionary);
                            this._dictionary.update('First', next._reference);
                        }
                    }
                    else if (value === this.count - 1) {
                        var prev = this.at(value - 1);
                        if (this._dictionary && prev && prev._reference) {
                            this._removeNext(prev._dictionary);
                            this._dictionary.update('Last', prev._reference);
                        }
                    }
                    else {
                        var prev = this.at(value - 1);
                        var next = this.at(value + 1);
                        if (prev && prev._reference && next && next._reference) {
                            prev._dictionary.update('Next', next._reference);
                            next._dictionary.update('Prev', prev._reference);
                        }
                    }
                    this._updateBookmarkList(value);
                    if (this._dictionary) {
                        this._updateCount();
                    }
                }
            }
        }
    };
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
    PdfBookmarkBase.prototype.clear = function () {
        this._removeFirst(this._dictionary);
        this._removeLast(this._dictionary);
        this._removeCount(this._dictionary);
        this._bookMarkList = [];
    };
    PdfBookmarkBase.prototype._removeFirst = function (dictionary) {
        if (dictionary && dictionary.has('First')) {
            delete dictionary._map.First;
            dictionary._updated = true;
        }
    };
    PdfBookmarkBase.prototype._removeLast = function (dictionary) {
        if (dictionary && dictionary.has('Last')) {
            delete dictionary._map.Last;
            dictionary._updated = true;
        }
    };
    PdfBookmarkBase.prototype._removeNext = function (dictionary) {
        if (dictionary && dictionary.has('Next')) {
            delete dictionary._map.Next;
            dictionary._updated = true;
        }
    };
    PdfBookmarkBase.prototype._removePrevious = function (dictionary) {
        if (dictionary && dictionary.has('Prev')) {
            delete dictionary._map.Prev;
            dictionary._updated = true;
        }
    };
    PdfBookmarkBase.prototype._removeCount = function (dictionary) {
        if (dictionary && dictionary.has('Count')) {
            delete dictionary._map.Count;
            dictionary._updated = true;
        }
    };
    PdfBookmarkBase.prototype._updateBookmarkList = function (index, bookmark) {
        var updatedList = [];
        if (typeof bookmark === 'undefined') {
            for (var i = 0; i < this.count; i++) {
                var entry = this._bookMarkList[Number.parseInt(i.toString(), 10)];
                if (i !== index) {
                    updatedList.push(entry);
                }
                else {
                    var reference = entry._reference;
                    if (reference && this._crossReference._cacheMap.has(reference)) {
                        this._crossReference._cacheMap.get(reference)._updated = false;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < this.count; i++) {
                if (i === index) {
                    updatedList.push(bookmark);
                }
                updatedList.push(this._bookMarkList[Number.parseInt(i.toString(), 10)]);
            }
        }
        this._bookMarkList = updatedList;
    };
    PdfBookmarkBase.prototype._updateCount = function () {
        if (this.isExpanded || !this._dictionary.has('Count')) {
            this._dictionary.update('Count', this._bookMarkList.length);
        }
        else {
            this._dictionary.update('Count', -this._bookMarkList.length);
        }
    };
    PdfBookmarkBase.prototype._reproduceTree = function () {
        var firstBookmark = this._getBookmark(this);
        var isBookmark = (firstBookmark) ? true : false;
        while (isBookmark && firstBookmark._dictionary) {
            this._bookMarkList.push(firstBookmark);
            firstBookmark = firstBookmark._next;
            isBookmark = (firstBookmark) ? true : false;
        }
    };
    PdfBookmarkBase.prototype._getBookmark = function (bookmarkBase, isFirst) {
        if (isFirst === void 0) { isFirst = true; }
        var bookmarkBaseDictionary = bookmarkBase._dictionary;
        var bookMark;
        if (bookmarkBaseDictionary && bookmarkBaseDictionary.has(isFirst ? 'First' : 'Last')) {
            var reference = bookmarkBaseDictionary._get(isFirst ? 'First' : 'Last');
            if (_isNullOrUndefined(reference)) {
                var bookMarkDictionary = this._crossReference._fetch(reference);
                if (bookMarkDictionary) {
                    bookMark = new PdfBookmark(bookMarkDictionary, this._crossReference);
                    bookMark._reference = reference;
                }
            }
        }
        return bookMark;
    };
    return PdfBookmarkBase;
}());
export { PdfBookmarkBase };
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
var PdfBookmark = /** @class */ (function (_super) {
    __extends(PdfBookmark, _super);
    /**
     * Initializes a new instance of the `PdfBookmark` class.
     *
     * @private
     * @param {_PdfDictionary} dictionary Bookmark dictionary.
     * @param {_PdfCrossReference} crossReference Cross reference.
     *
     */
    function PdfBookmark(dictionary, crossReference) {
        var _this = _super.call(this, dictionary, crossReference) || this;
        if (_this._dictionary && !_this._dictionary.has('Dest') && _this._dictionary.has('A')) {
            var actionDictionary = _this._dictionary.get('A');
            if (actionDictionary && actionDictionary.has('D')) {
                var destinationArray = actionDictionary.getRaw('D'); // eslint-disable-line
                _this._dictionary.update('Dest', destinationArray);
            }
        }
        _this._isLoadedBookmark = true;
        return _this;
    }
    Object.defineProperty(PdfBookmark.prototype, "destination", {
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
        get: function () {
            if (!this._destination) {
                var namedDestination = this._obtainNamedDestination();
                if (namedDestination === null || typeof namedDestination === 'undefined') {
                    this._destination = _obtainDestination(this._dictionary, 'Dest');
                }
            }
            return this._destination;
        },
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
        set: function (value) {
            if (value) {
                value._parent = this;
                this._destination = value;
                this._destination._initializePrimitive();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfBookmark.prototype, "namedDestination", {
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
        get: function () {
            if (this._namedDestination === null || typeof this._namedDestination === 'undefined') {
                this._namedDestination = this._obtainNamedDestination();
            }
            return this._namedDestination;
        },
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
        set: function (value) {
            if (this._namedDestination !== value && this._dictionary) {
                this._namedDestination = value;
                var dictionary = new _PdfDictionary(this._crossReference);
                dictionary.update('D', value.title);
                dictionary.update('S', _PdfName.get('GoTo'));
                var reference = this._crossReference._getNextReference();
                this._crossReference._cacheMap.set(reference, dictionary);
                this._dictionary.update('A', reference);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfBookmark.prototype, "title", {
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
        get: function () {
            if (this._title === null || typeof this._title === 'undefined') {
                if (this._dictionary && this._dictionary.has('Title')) {
                    this._title = this._dictionary.get('Title');
                }
                else {
                    this._title = '';
                }
            }
            return this._title;
        },
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
        set: function (value) {
            this._title = value;
            if (this._dictionary) {
                this._dictionary.update('Title', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfBookmark.prototype, "color", {
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
        get: function () {
            if (this._color === null || typeof this._color === 'undefined') {
                if (this._dictionary && this._dictionary.has('C')) {
                    this._color = _parseColor(this._dictionary.getArray('C'));
                }
            }
            return (this._color) ? this._color : [0, 0, 0];
        },
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
        set: function (value) {
            this._color = value;
            if (this._dictionary) {
                this._dictionary.update('C', [Number.parseFloat((value[0] / 255).toFixed(7)),
                    Number.parseFloat((value[1] / 255).toFixed(7)),
                    Number.parseFloat((value[2] / 255).toFixed(7))]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfBookmark.prototype, "textStyle", {
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
        get: function () {
            if (this._textStyle === null || typeof this._textStyle === 'undefined') {
                this._textStyle = this._obtainTextStyle();
            }
            return this._textStyle;
        },
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
        set: function (value) {
            this._textStyle = value;
            this._updateTextStyle(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfBookmark.prototype, "_next", {
        get: function () {
            var nextBookmark;
            if (this._dictionary && this._dictionary.has('Next')) {
                var reference = this._dictionary._get('Next');
                if (_isNullOrUndefined(reference)) {
                    var dictionary = this._crossReference._fetch(reference);
                    if (dictionary) {
                        nextBookmark = new PdfBookmark(dictionary, this._crossReference);
                        nextBookmark._reference = reference;
                    }
                }
            }
            return nextBookmark;
        },
        enumerable: true,
        configurable: true
    });
    PdfBookmark.prototype._updateTextStyle = function (value) {
        if (value === PdfTextStyle.regular) {
            if (this._dictionary && this._dictionary.has('F')) {
                delete this._dictionary._map.F;
            }
        }
        else if (this._dictionary) {
            this._dictionary.update('F', value);
        }
    };
    PdfBookmark.prototype._obtainTextStyle = function () {
        var style = PdfTextStyle.regular;
        if (this._dictionary && this._dictionary.has('F')) {
            var flag = this._dictionary.get('F');
            var flagValue = 0;
            if (typeof flag !== 'undefined' && flag !== null) {
                flagValue = flag;
            }
            style |= flagValue;
        }
        return style;
    };
    PdfBookmark.prototype._obtainNamedDestination = function () {
        var document = this._crossReference._document;
        var destinationCollection;
        if (document) {
            destinationCollection = document._destinationCollection;
        }
        var destination; // eslint-disable-line
        var namedDestination;
        if (destinationCollection) {
            var dictionary = this._dictionary;
            if (dictionary) {
                if (dictionary.has('A')) {
                    var action = dictionary.get('A');
                    if (action && action.has('D')) {
                        destination = action.get('D');
                    }
                }
                else if (dictionary.has('Dest')) {
                    destination = dictionary.get('Dest');
                }
            }
            if (destination) {
                var value = void 0;
                if (destination instanceof _PdfName) {
                    value = destination.name;
                }
                else if (typeof destination === 'string') {
                    value = destination;
                }
                if (value) {
                    var namedDestinations = destinationCollection._namedDestinations;
                    for (var i = 0; i < namedDestinations.length; i++) {
                        namedDestination = namedDestinations[Number.parseInt(i.toString(), 10)];
                        if (namedDestination._title === value) {
                            destination = namedDestination;
                            break;
                        }
                    }
                }
            }
        }
        return namedDestination;
    };
    return PdfBookmark;
}(PdfBookmarkBase));
export { PdfBookmark };
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
var PdfNamedDestination = /** @class */ (function () {
    function PdfNamedDestination(element, crossReference) {
        if (typeof element === 'string') {
            this._initialize();
            this.title = element;
        }
        else {
            this._dictionary = element;
            this._crossReference = crossReference;
        }
    }
    Object.defineProperty(PdfNamedDestination.prototype, "destination", {
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
        get: function () {
            return this._destination;
        },
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
        set: function (value) {
            if (value) {
                value._parent = this;
                this._destination = value;
                this._destination._initializePrimitive();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfNamedDestination.prototype, "title", {
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
        get: function () {
            return this._title;
        },
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
        set: function (value) {
            if (value !== this._title && this._dictionary) {
                this._title = value;
                this._dictionary.update('Title', value);
                this._dictionary._updated = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    PdfNamedDestination.prototype._initialize = function () {
        this._dictionary = new _PdfDictionary();
        this._dictionary.update('S', _PdfName.get('GoTo'));
    };
    return PdfNamedDestination;
}());
export { PdfNamedDestination };
var _PdfNamedDestinationCollection = /** @class */ (function () {
    function _PdfNamedDestinationCollection(dictionary, crossReference) {
        this._namedDestinations = [];
        if (dictionary) {
            this._dictionary = dictionary;
        }
        if (crossReference) {
            this._crossReference = crossReference;
        }
        if (dictionary && dictionary.has('Dests')) {
            var destination = dictionary.get('Dests');
            if (destination) {
                if (destination.has('Names')) {
                    this._addCollection(destination);
                }
                else if (destination.has('Kids')) {
                    var destinationArray = destination.getArray('Kids'); // eslint-disable-line
                    for (var i = 0; i < destinationArray.length; i++) {
                        this._findDestination(destinationArray[Number.parseInt(i.toString(), 10)]);
                    }
                }
            }
        }
    }
    _PdfNamedDestinationCollection.prototype._findDestination = function (destination) {
        if (destination) {
            if (destination.has('Names')) {
                this._addCollection(destination);
            }
            else if (destination.has('Kids')) {
                var kids = destination.getArray('Kids'); // eslint-disable-line
                if (kids && Array.isArray(kids) && kids.length > 0) {
                    for (var i = 0; i < kids.length; i++) {
                        this._findDestination(kids[Number.parseInt(i.toString(), 10)]);
                    }
                }
            }
        }
    };
    _PdfNamedDestinationCollection.prototype._addCollection = function (destination) {
        var elements = destination.getRaw('Names'); // eslint-disable-line
        var ref; // eslint-disable-line
        var dictionary;
        if (elements && elements instanceof _PdfReference) {
            ref = this._crossReference._fetch(elements);
        }
        if (ref && Array.isArray(ref) && ref.length > 0) {
            elements = ref;
        }
        if (elements && Array.isArray(elements) && elements.length > 0) {
            for (var i = 1; i < elements.length; i = i + 2) {
                var reference = elements[i]; // eslint-disable-line
                if (reference && reference instanceof _PdfReference) {
                    var destinationArray = this._crossReference._fetch(reference); // eslint-disable-line
                    if (destinationArray && Array.isArray(destinationArray) && destinationArray.length > 0) {
                        dictionary = new _PdfDictionary();
                        dictionary.update('D', destinationArray);
                    }
                    else {
                        dictionary = this._crossReference._fetch(reference);
                    }
                }
                else if ((dictionary === null || typeof dictionary === 'undefined') && Array.isArray(reference)) {
                    dictionary = new _PdfDictionary();
                    dictionary.update('D', reference);
                }
                if (dictionary) {
                    var namedDestination = new PdfNamedDestination(dictionary, this._crossReference);
                    var value = elements[i - 1];
                    var destinationObject = void 0;
                    var destinationArray = void 0; // eslint-disable-line
                    if (value) {
                        namedDestination._title = value;
                        if (dictionary.has('D')) {
                            destinationArray = dictionary.get('D');
                            destinationObject = new PdfDestination();
                            var reference_1 = destinationArray[0];
                            if (reference_1 && destinationArray && destinationArray[0] instanceof _PdfReference) {
                                var pageDictionary = this._crossReference._fetch(reference_1);
                                var loadedDocument = this._crossReference._document;
                                var index = void 0;
                                if (loadedDocument && pageDictionary) {
                                    index = _getPageIndex(loadedDocument, pageDictionary);
                                    if (typeof index !== 'undefined' && index !== null && index >= 0) {
                                        destinationObject._index = index;
                                        destinationObject.page = loadedDocument.getPage(index);
                                    }
                                }
                            }
                        }
                    }
                    if (destinationArray[1] instanceof _PdfName) {
                        var left = void 0;
                        var height = void 0;
                        var zoom = void 0;
                        var mode = destinationArray[1].name;
                        var page = destinationObject.page;
                        switch (mode) {
                            case 'Fit':
                                destinationObject._destinationMode = PdfDestinationMode.fitToPage;
                                break;
                            case 'XYZ':
                                destinationObject._destinationMode = PdfDestinationMode.location;
                                if (destinationArray.length > 2) {
                                    left = destinationArray[2];
                                }
                                if (destinationArray.length > 3) {
                                    height = destinationArray[3];
                                }
                                if (destinationArray.length > 4) {
                                    zoom = destinationArray[4];
                                }
                                if (page) {
                                    var size = page.size;
                                    var topValue = (height === null || typeof height === 'undefined') ? 0 : size[1] - height;
                                    var leftValue = (left === null || typeof left === 'undefined') ? 0 : left;
                                    destinationObject._location = [leftValue, topValue];
                                    if (page.rotation !== PdfRotationAngle.angle0) {
                                        topValue = _checkRotation(page, height, left);
                                    }
                                    destinationObject._zoom = (typeof zoom !== 'undefined' && zoom !== null) ? zoom : 0;
                                    if (left === null || height === null || zoom === null || typeof left === 'undefined'
                                        || typeof height === 'undefined' || typeof zoom === 'undefined') {
                                        destinationObject._isValid = false;
                                    }
                                }
                                break;
                            case 'FitH':
                            case 'FitBH':
                                destinationObject._destinationMode = PdfDestinationMode.fitH;
                                if (destinationArray.length >= 3) {
                                    height = destinationArray[2];
                                }
                                if (page) {
                                    var size = page.size;
                                    var topValue = (height === null || typeof height === 'undefined') ? 0 : size[1] - height;
                                    destinationObject._location = [0, topValue];
                                }
                                if (height === null || typeof height === 'undefined') {
                                    destinationObject._isValid = false;
                                }
                                break;
                            case 'FitR':
                                destinationObject._destinationMode = PdfDestinationMode.fitR;
                                break;
                        }
                    }
                    destinationObject._parent = namedDestination;
                    namedDestination._destination = destinationObject;
                    this._namedDestinations.push(namedDestination);
                }
            }
        }
    };
    return _PdfNamedDestinationCollection;
}());
export { _PdfNamedDestinationCollection };
