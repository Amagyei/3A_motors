import { FreeTextSettings } from './../pdfviewer';
import { PdfViewer, PdfViewerBase, IPoint, AnnotationType as AnnotType, ICommentsCollection, IReviewCollection, AllowedInteraction, AnnotationsBase } from '../index';
import { PointModel } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBaseModel } from '../drawing/pdf-annotation-model';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IFreeTextAnnotation {
    shapeAnnotationType: string;
    author: string;
    modifiedDate: string;
    subject: string;
    note: string;
    opacity: number;
    bounds: any;
    thickness: number;
    borderStyle: string;
    borderDashArray: number;
    rotateAngle: string;
    isLocked: boolean;
    id: string;
    annotName: string;
    position?: string;
    fillColor: string;
    strokeColor: string;
    dynamicText: string;
    fontColor: string;
    fontSize: number;
    fontFamily: string;
    textAlign: string;
    font: any;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    annotationSettings?: any;
    allowedInteractions?: AllowedInteraction;
    isCommentLock: boolean;
    isReadonly: boolean;
}
/**
 * @hidden
 */
export declare class FreeTextAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    currentAnnotationMode: string;
    /**
     * @private
     */
    opacity: number;
    /**
     * @private
     */
    borderColor: string;
    /**
     * @private
     */
    borderWidth: number;
    /**
     * @private
     */
    defautWidth: number;
    /**
     * @private
     */
    defaultHeight: number;
    /**
     * @private
     */
    inputBoxElement: any;
    /**
     * @private
     */
    borderStyle: string;
    /**
     * @private
     */
    author: string;
    /**
     * @private
     */
    subject: string;
    /**
     * @private
     */
    isNewFreeTextAnnot: boolean;
    /**
     * @private
     */
    isNewAddedAnnot: boolean;
    /**
     * @private
     */
    inputBoxCount: number;
    /**
     * @private
     */
    selectedAnnotation: PdfAnnotationBaseModel;
    /**
     * @private
     */
    isFreeTextValueChange: boolean;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    /**
     * @private
     */
    isInuptBoxInFocus: boolean;
    /**
     * @private
     */
    fontSize: number;
    /**
     * @private
     */
    annodationIntent: string;
    /**
     * @private
     */
    annotationFlags: string;
    /**
     * @private
     */
    fillColor: string;
    /**
     * @private
     */
    fontColor: string;
    /**
     * @private
     */
    fontFamily: string;
    /**
     * @private
     */
    freeTextPageNumbers: any;
    /**
     * @private
     */
    selectedText: string;
    /**
     * @private
     */
    isTextSelected: boolean;
    private selectionStart;
    private selectionEnd;
    /**
     * @private
     */
    isBold: boolean;
    /**
     * @private
     */
    isItalic: boolean;
    /**
     * @private
     */
    isUnderline: boolean;
    /**
     * @private
     */
    isStrikethrough: boolean;
    /**
     * @private
     */
    textAlign: string;
    private defaultText;
    private isReadonly;
    private isMaximumWidthReached;
    private padding;
    private wordBreak;
    private freeTextPaddingLeft;
    private freeTextPaddingTop;
    private defaultFontSize;
    private lineGap;
    /**
     * @private
     */
    previousText: string;
    /**
     * @private
     */
    currentPosition: any;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     * @returns {void}
     */
    updateTextProperties(): void;
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number value
     * @param {boolean} isImportAction - It ensures whether the isImportAction is true or not
     * @param {boolean} isAnnotOrderAction - It ensures whether the isAnnotOrderAction is true or not
     * @private
     * @returns {void}
     */
    renderFreeTextAnnotations(shapeAnnotations: any, pageNumber: number, isImportAction?: boolean, isAnnotOrderAction?: boolean): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {AnnotationSelectorSettingsModel} - AnnotationSelectorSettingsModel
     */
    getSettings(annotation: AnnotationsBase): AnnotationSelectorSettingsModel;
    /**
     * @param {AnnotType} type - Annotation type
     * @private
     * @returns {void}
     */
    setAnnotationType(type: AnnotType): void;
    /**
     * @param {string} property - It describes about the property name
     * @param {number} pageNumber - It describes about the page number value
     * @param {any} annotationBase - It describes about the annotation base
     * @param {boolean} isNewAdded - It describes about whether the isNewAdded is true or not
     * @private
     * @returns {IFreeTextAnnotation} - Ifreetextannotation
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any, isNewAdded?: boolean): IFreeTextAnnotation;
    /**
     * @param {number} pageNumber - This is pageNumber
     * @param {IFreeTextAnnotation} annotationBase - This is annotationBase
     * @private
     * @returns {void}
     */
    addInCollection(pageNumber: number, annotationBase: IFreeTextAnnotation): void;
    /**
     * @private
     * @returns {string} - string
     */
    saveFreeTextAnnotations(): string;
    private getRotationValue;
    private getBoundsBasedOnRotation;
    private manageAnnotations;
    private getAnnotations;
    private getRgbCode;
    /**
     * @private
     * @returns {void}
     */
    onFocusOutInputBox(): void;
    /**
     * @param {KeyboardEvent} event - event
     * @private
     * @returns {void}
     */
    onKeyDownInputBox(event: KeyboardEvent): void;
    private updateFreeTextAnnotationSize;
    /**
     * @param {number} xPosition - This is xPosition
     * @param {number} yPosition - This is yPosition
     * @private
     * @returns {void}
     */
    autoFitFreeText(xPosition?: number, yPosition?: number): void;
    /**
     * @param {MouseEvent} event - This is Mouse event
     * @private
     * @returns {void}
     */
    onMouseUpInputBox(event: MouseEvent): void;
    /**
     * @param {PointModel} currentPosition - This is current position
     * @param {PdfAnnotationBaseModel} annotation - This is annotation
     * @param {number} pageIndex - This is pageIndex
     * @private
     * @returns {void}
     */
    addInuptElemet(currentPosition: PointModel, annotation?: PdfAnnotationBaseModel, pageIndex?: number): void;
    private applyFreetextStyles;
    /**
     * @private
     * @returns {void}
     */
    copySelectedText(): void;
    /**
     * @param {any} target - It describes about the target text
     * @private
     * @returns {void}
     */
    pasteSelectedText(target: any): void;
    /**
     * @param {any} target - It describes the targeted selected text
     * @private
     * @returns {void}
     */
    cutSelectedText(target: any): void;
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number value
     * @private
     * @returns {void}
     */
    saveImportedFreeTextAnnotations(shapeAnnotations: any, pageNumber: number): void;
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number value
     * @private
     * @returns {void}
     */
    updateFreeTextAnnotationCollections(shapeAnnotations: any, pageNumber: number): any;
    /**
     * This method used to add annotations with using program.
     *
     * @param {FreeTextSettings} annotationObject - This is annotation object
     * @param {IPoint} offset - It describes about the annotation bounds
     * @returns {object} - object
     * @private
     */
    updateAddAnnotationDetails(annotationObject: FreeTextSettings, offset: IPoint): Object;
    /**
     * This method used to get the padding.
     *
     * @param {number} fontSize - This is font size
     * @returns {any} - any
     */
    private getPaddingValues;
    /**
     * @param {any} currentPosition - currentPosition
     * @private
     * @returns {void}
     */
    addInputInZoom(currentPosition: any): void;
}
