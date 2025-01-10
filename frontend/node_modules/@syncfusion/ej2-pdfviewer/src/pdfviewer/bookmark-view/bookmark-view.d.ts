import { PdfViewerBase, PdfViewer } from '../index';
import { ListView } from '@syncfusion/ej2-lists';
/**
 * The `BookmarkView` module is used to handle bookmark view navigation of PDF viewer.
 *
 * @param {EventArgs} args - args
 * @returns {void}
 */
export declare class BookmarkView {
    private pdfViewer;
    private pdfViewerBase;
    private bookmarkView;
    private isBookmarkViewDiv;
    private treeObj;
    private bookmarkRequestHandler;
    private isKeyboardNavigation;
    bookmarks: any;
    private bookmarkStyles;
    bookmarksDestination: any;
    /**
     * @private
     */
    childNavigateCount: number;
    /**
     * @private
     */
    bookmarkList: ListView;
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfViewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfViewerBase
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * Open the bookmark pane of the PDF Viewer.
     *
     * @returns {void}
     */
    openBookmarkPane(): void;
    /**
     * Close the bookmark pane of the PDF Viewer.
     *
     * @returns {void}
     */
    closeBookmarkPane(): void;
    /**
     * @private
     * @returns {void}
     */
    createRequestForBookmarks(): void;
    private renderBookmarksOnSuccess;
    /**
     * @private
     * @returns {void}
     */
    renderBookmarkcontent(): void;
    /**
     * @private
     * @returns {void}
     */
    renderBookmarkContentMobile(): void;
    private bookmarkClick;
    private nodeClick;
    private bookmarkKeypress;
    private bookmarkPanelBeforeOpen;
    private setHeight;
    /**
     * @private
     * @returns {void}
     */
    setBookmarkContentHeight(): void;
    private navigateToBookmark;
    /**
     * Get Bookmarks of the PDF document being loaded in the ejPdfViewer control
     *
     * @returns {any} - any
     */
    getBookmarks(): any;
    /**
     * Navigate To current Bookmark location of the PDF document being loaded in the ejPdfViewer control.
     *
     * @param  {number} pageIndex - Specifies the pageIndex for Navigate
     * @param  {number} y - Specifies the Y coordinates value of the Page
     * @returns {void}
     */
    goToBookmark(pageIndex: number, y: number): boolean;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @private
     * @returns {string} - string
     */
    getModuleName(): string;
}
