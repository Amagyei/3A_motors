import { PdfViewer, PdfViewerBase } from '../index';
/**
 * The `ThumbnailView` module is used to handle thumbnail view navigation of PDF viewer.
 *
 * @param {Event} event - args
 * @returns {void}
 */
export declare class ThumbnailView {
    private pdfViewer;
    private pdfViewerBase;
    private previousElement;
    private thumbnailSelectionRing;
    private thumbnailImage;
    private startIndex;
    private thumbnailLimit;
    private thumbnailThreshold;
    private thumbnailRequestsBatch;
    private thumbnailTopMargin;
    private thumbnailTop;
    private isRendered;
    private list;
    /**
     * @private
     */
    thumbnailPageSize: any[];
    private thumbnailRequestHandler;
    /**
     * @private
     */
    isThubmnailOpen: boolean;
    /**
     * @private
     */
    isThumbnailClicked: boolean;
    /**
     * @private
     */
    thumbnailView: HTMLElement;
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfviewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     * @returns {void}
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     * @returns {void}
     */
    createThumbnailContainer(): void;
    private thumbnailOnScroll;
    /**
     * Open the thumbnail pane of the PdfViewer.
     *
     * @returns {void}
     */
    openThumbnailPane(): void;
    /**
     * Close the thumbnail pane of the PdfViewer.
     *
     * @returns {void}
     */
    closeThumbnailPane(): void;
    /**
     * @private
     * @returns {void}
     */
    createRequestForThumbnails(): void;
    private isThumbnailViewOpen;
    /**
     * Checks if thumbnails have been requested for the given page number.
     *
     * @param {number} pageNumber The page number to check.
     * @returns {boolean} True if thumbnails have been requested, otherwise false.
     */
    private thumbnailsRequestedForPage;
    /**
     * @param {number} pageNumber - Specify the pageNumber.
     * @returns {void}
     * @private
     */
    updateScrollTopForThumbnail(pageNumber: number): void;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    private renderThumbnailEmptyPage;
    /**
     * @param {ThumbnailView} prox - It describes about the prox
     * @private
     * @returns {void}
     */
    renderViewPortThumbnailImage(prox?: ThumbnailView): void;
    /**
     * @param {any} event - It describes about the event
     * @private
     * @returns {void}
     */
    thumbnailOnMessage(event: any): void;
    /**
     * @param {any} data - It describes about the data
     * @private
     * @returns {void}
     */
    updateThumbnailCollection(data: any): void;
    private renderDiv;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    gotoThumbnailImage(pageNumber: number): void;
    /**
     * Determines if there is a need to request thumbnails based on the current page number.
     *
     * @param {number} currentPageNumber The current page number.
     * @returns {number} The page number to request thumbnails for.
     */
    private determineThumbnailsRequest;
    private checkThumbnailScroll;
    private getPageNumberFromID;
    private setFocusStyle;
    private renderThumbnailImage;
    private createRequestForThumbnailImages;
    private renderServerThumbnailImage;
    private renderClientThumbnailImage;
    private thumbnailImageRender;
    private wireUpEvents;
    private unwireUpEvents;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @param {boolean} isKeyboard - It describes about the isKeyboard value
     * @private
     * @returns {void}
     */
    thumbnailClick: (event: MouseEvent, isKeyboard?: boolean) => void;
    /**
     * @param {KeyboardEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    private thumbnailKeydown;
    private goToThumbnailPage;
    private setSelectionStyle;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    thumbnailMouseOver: (event: MouseEvent) => void;
    private setMouseOverStyle;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    thumbnailMouseLeave: (event: MouseEvent) => void;
    private setMouseLeaveStyle;
    private setMouseFocusStyle;
    private setMouseFocusToFirstPage;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    private getVisibleThumbs;
    private getVisibleElements;
    private binarySearchFirstItem;
    private backtrackBeforeAllVisibleElements;
    /**
     * @param {number} index - It describes about the index value
     * @private
     * @returns {HTMLElement} - html element
     */
    private getThumbnailElement;
    /**
     * @param {number} index - It describes about the index value
     * @private
     * @returns {HTMLElement} - html element
     */
    private getThumbnailLinkElement;
    /**
     * @param {number} index - It describes about the index value
     * @private
     * @returns {HTMLImageElement} - html image element
     */
    private getThumbnailImageElement;
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
/**
 * The `IVisibleThumbnailElement` module is used to handle visible thumbnail element collection of PDF viewer.
 *
 * @hidden
 */
export interface IVisibleThumbnailElement {
    id: string;
    x: number;
    y: number;
    view: HTMLElement;
    percent: number;
}
/**
 * The `IVisibleThumbnail` module is used to handle visible thumbnail collection of PDF viewer.
 *
 * @hidden
 */
export interface IVisibleThumbnail {
    first: IVisibleThumbnailElement;
    last: IVisibleThumbnailElement;
    views: Array<IVisibleThumbnailElement>;
}
