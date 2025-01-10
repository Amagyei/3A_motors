import { FormFieldsBase } from './index';
import { PdfViewer, PdfViewerBase } from '../index';
import { Rect } from '@syncfusion/ej2-drawings';
/**
 * SignatureBase
 *
 * @hidden
 */
export declare class SignatureBase {
    m_formFields: FormFieldsBase;
    private pdfViewer;
    private pdfViewerBase;
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     * @param {string} jsonObject - jsonObject
     * @param {any} loadedDocument - loadedDocument
     * @returns {void}
     */
    saveSignatureData(jsonObject: {
        [key: string]: string;
    }, loadedDocument: any): void;
    /**
     * getSignatureBounds
     *
     * @param {Rect} bounds - bounds
     * @param {number} pageHeight - pageHeight
     * @param {number} pageWidth - pageWidth
     * @param {number} rotateAngle - rotateAngle
     * @returns {void}
     */
    getSignatureBounds(bounds: Rect, pageHeight: number, pageWidth: number, rotateAngle: number): any;
    /**
     * @private
     * @param {string} jsonObject - jsonObject
     * @param {any} loadedDocument - loadedDocument
     * @returns {void}
     */
    saveSignatureAsAnnotatation(jsonObject: {
        [key: string]: string;
    }, loadedDocument: any): void;
    private convertPointToPixel;
    private convertPixelToPoint;
    private getRotateAngle;
}
