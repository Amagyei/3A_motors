import { PdfViewer, PdfViewerBase } from '../index';
/**
 * The `LinkAnnotation` module is used to handle link annotation actions of PDF viewer.
 *
 * @hidden
 */
export declare class LinkAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    linkAnnotation: number[];
    /**
     * @private
     */
    linkPage: number[];
    /**
     * @private
     */
    annotationY: number[];
    /**
     * @param {PdfViewer} pdfViewer -It describes about the PdfViewer
     * @param {PdfViewerBase} viewerBase - It describes about the viewerbase
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * @param {any} data - It describes about the data
     * @param {number} pageIndex - It describes about the number
     * @private
     * @returns {void}
     */
    renderHyperlinkContent(data: any, pageIndex: number): void;
    /**
     * @param {HTMLElement} eventTarget - It describes about the event target
     * @param {MouseEvent} evt - It describes about the event
     * @param {any} element - It describes about the element
     * @private
     * @returns {void}
     */
    disableHyperlinkNavigationUnderObjects(eventTarget: HTMLElement, evt: MouseEvent | TouchEvent, element: any): void;
    private renderWebLink;
    private triggerHyperlinkEvent;
    private renderDocumentLink;
    private setHyperlinkProperties;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isAdd - It describes about the isAdd
     * @private
     * @returns {void}
     */
    modifyZindexForTextSelection(pageNumber: number, isAdd: boolean): void;
    /**
     * @param {HTMLElement} element - It describes about the element
     * @param {boolean} isAdd - It describes about the isAdd
     * @private
     * @returns {void}
     */
    modifyZindexForHyperlink(element: HTMLElement, isAdd: boolean): void;
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
