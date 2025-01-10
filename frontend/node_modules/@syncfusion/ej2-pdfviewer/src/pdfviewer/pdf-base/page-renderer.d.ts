import { PdfViewer, PdfViewerBase } from '../index';
import { ShapeAnnotationBase, PopupAnnotationBase, FreeTextAnnotationBase, MeasureShapeAnnotationBase, TextMarkupAnnotationBase, InkSignatureAnnotation } from './index';
import { PdfRubberStampAnnotation, PdfAnnotation, PdfRubberStampAnnotationIcon } from '@syncfusion/ej2-pdf';
import { Matrix, Rect, Size } from '@syncfusion/ej2-drawings';
/**
 * PageRenderer
 *
 * @hidden
 */
export declare class PageRenderer {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    shapeAnnotationList: ShapeAnnotationBase[];
    /**
     * @private
     */
    textMarkupAnnotationList: TextMarkupAnnotationBase[];
    /**
     * @private
     */
    measureAnnotationList: MeasureShapeAnnotationBase[];
    /**
     * @private
     */
    stickyAnnotationList: PopupAnnotationBase[];
    /**
     * @private
     */
    rubberStampAnnotationList: StampAnnotationBase[];
    /**
     * @private
     */
    freeTextAnnotationList: FreeTextAnnotationBase[];
    /**
     * @private
     */
    signatureAnnotationList: any[];
    /**
     * @private
     */
    signatureInkAnnotationList: InkSignatureAnnotation[];
    /**
     * @private
     */
    annotationOrder: any[];
    /**
     * @private
     */
    hyperlinks: any[];
    /**
     * @private
     */
    imageData: string;
    /**
     * @private
     */
    isMaskedImage: boolean;
    /**
     * @private
     */
    hyperlinkBounds: any[];
    /**
     * @private
     */
    annotationDestPage: any[];
    /**
     * @private
     */
    annotationList: any[];
    /**
     * @private
     */
    annotationYPosition: any[];
    /**
     * @private
     */
    digitalSignaturePresent: boolean;
    private annotationCount;
    /**
     * @private
     */
    isAnnotationPresent: boolean;
    /**
     *
     * @private
     */
    htmldata: any[];
    /**
     *
     * @private
     */
    renderingMode: number;
    private textString;
    private currentFont;
    private baseFont;
    private fontSize;
    /**
     *
     * @private
     */
    Imagedata: string;
    private IsMaskedImage;
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {number} pageNumber - pageNumber
     * @param {Size} pageSize - pageSize
     * @private
     * @returns {void}
     */
    exportAnnotationComments(pageNumber: number, pageSize: Size): any;
    private IsStampExist;
    private getAnnotationFromPDF;
    private formatDate;
    private datePadding;
    /**
     * @private
     * @param {PdfAnnotation} annotation - annotation
     * @returns {void}
     */
    findStampImage(annotation: PdfAnnotation): void;
    /**
     * @private
     * @param {PdfRubberStampAnnotation} annotation - annotation
     * @param {any} rubberStampAnnotation - rubberStampAnnotation
     * @param {number} pageRotation - pageRotation
     * @param {number} collectionOrder - Gets the collection order
     * @param {boolean} isFormField - Optional flag indicating whether the annotation is for a form field.
     * @param {string} formFieldName - Optional name of the form field, if applicable.
     * @param {Array<any>} formFieldList - Optional list of form fields, if applicable.
     * @param {number} PageIndex - Optional page index, if applicable.
     * @returns {void}
     */
    findStampTemplate(annotation: PdfRubberStampAnnotation, rubberStampAnnotation: any, pageRotation: number, collectionOrder: number, isFormField?: boolean, formFieldName?: any, formFieldList?: any, PageIndex?: number): void;
    /**
     * @private
     * @param {any} data - data
     * @returns {void}
     */
    initialPagesRendered(data: any): void;
    /**
     * @private
     * @returns {void}
     */
    readFromResources(): string;
    /**
     * @private
     * @param {PdfRubberStampAnnotation} annotation - annotation
     * @returns {void}
     */
    getPageRotation(annotation: PdfRubberStampAnnotation): number;
    private stampAnnoattionRender;
    private getStateModelString;
    private getStateString;
    private getBounds;
    private getRubberStampBounds;
    private convertPixelToPoint;
    private convertPointToPixel;
    private getRotateAngleString;
    private checkName;
    private getAllFreeTextAnnotations;
    private getShapeFreeText;
    private setAnnotationName;
    private isFreeTextAnnotationType;
}
/**
 *
 * @hidden
 */
export declare class StampAnnotationBase {
    StampAnnotationtype: string;
    Author: string;
    pageNumber: number;
    AnnotationSelectorSettings: any;
    Matrix: Matrix;
    ModifiedDate: string;
    CreationDate: string;
    ExistingCustomData: string;
    IsCommentLock: boolean;
    IsLocked: boolean;
    Subject: string;
    Note: string;
    StrokeColor: string;
    FillColor: string;
    Opacity: number;
    Apperarance: any[];
    Rect: Rect;
    RotateAngle: number;
    Name: string;
    IsDynamic: boolean;
    AnnotName: string;
    AnnotationSettings: any;
    AllowedInteractions: string[];
    CustomData: {
        [key: string]: any;
    };
    IsPrint: boolean;
    IsMaskedImage: boolean;
    AnnotType: string;
    Icon: PdfRubberStampAnnotationIcon;
    IconName: string;
    State: string;
    StateModel: any;
    Comments: PopupAnnotationBase[];
}
