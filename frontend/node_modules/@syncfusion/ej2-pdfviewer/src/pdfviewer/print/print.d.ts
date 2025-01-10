import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
import { AjaxHandler } from '../index';
/**
 * Print module
 */
export declare class Print {
    private pdfViewer;
    private pdfViewerBase;
    private printViewerContainer;
    private printCanvas;
    private printHeight;
    private printWidth;
    private maximumPixels;
    /**
     * @private
     */
    printRequestHandler: AjaxHandler;
    private frameDoc;
    private iframe;
    private printWindow;
    /**
     * @param {PdfViewer} viewer - It describes about the viewer
     * @param {PdfViewerBase} base - It describes about the base
     * @private
     * @returns {void}
     */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * Print the PDF document being loaded in the ejPdfViewer control.
     *
     * @returns {void}
     */
    print(): void;
    private createRequestForPrint;
    /**
     * @param {any} event - It describes about the event
     * @private
     * @returns {void}
     */
    printOnMessage(event: any): void;
    private printSuccess;
    private limitSize;
    private renderFieldsForPrint;
    private createFormDesignerFields;
    /**
     * @param {any} inputField - It describes about the input field
     * @param {any} bounds - It describes about the bounds
     * @param {any} font - It describes about the font
     * @param {number} heightRatio - It describes about the height ratio
     * @param {number} widthRatio - It describes about the width ratio
     * @param {boolean} isFormDesignerField - It describes about the isFormDesignerField
     * @param {number} zoomValue - It describes about the zoom value
     * @param {number} pageIndex - It describes about the page index value
     * @private
     * @returns {void}
     */
    applyPosition(inputField: any, bounds: any, font: any, heightRatio: number, widthRatio: number, isFormDesignerField?: boolean, zoomValue?: number, pageIndex?: number): void;
    private printWindowOpen;
    private createPrintLoadingIndicator;
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
