import { PdfViewer, PdfViewerBase } from '../..';
import { PointModel } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBaseModel } from '../drawing/pdf-annotation-model';
/**
 * @hidden
 */
export declare class InputElement {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    inputBoxElement: any;
    /**
     * @private
     */
    isInFocus: boolean;
    /**
     * @private
     */
    maxHeight: number;
    /**
     * @private
     */
    maxWidth: number;
    /**
     * @private
     */
    fontSize: number;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {PointModel} currentPosition - It describes about the current position
     * @param {PdfAnnotationBaseModel} annotation - It describes about the annotation
     * @private
     * @returns {void}
     */
    editLabel(currentPosition: PointModel, annotation: PdfAnnotationBaseModel): void;
    /**
     * @private
     * @returns {void}
     */
    onFocusOutInputBox(): void;
    /**
     * @param {any} bounds - It describes about the bounds value
     * @param {number} pageIndex - It describes about the page index value
     * @private
     * @returns {any} - any
     */
    calculateLabelBounds(bounds: any, pageIndex?: number): any;
    /**
     * @param bounds
     * @private
     */
    calculateLabelBoundsFromLoadedDocument(bounds: any): any;
}
