import { PdfViewer, PdfViewerBase, IRectangle, IPoint, ICommentsCollection, IReviewCollection, AnnotationType as AnnotType, LineHeadStyle, ShapeLabelSettingsModel, AllowedInteraction, AnnotationType } from '../../index';
import { PointModel } from '@syncfusion/ej2-drawings';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IShapeAnnotation {
    shapeAnnotationType: string;
    author: string;
    modifiedDate: string;
    subject: string;
    note: string;
    strokeColor: string;
    fillColor: string;
    opacity: number;
    bounds: IRectangle;
    thickness: number;
    borderStyle: string;
    borderDashArray: number;
    rotateAngle: string;
    isCloudShape: boolean;
    cloudIntensity: number;
    vertexPoints: PointModel[];
    lineHeadStart: string;
    lineHeadEnd: string;
    rectangleDifference: string[];
    isLocked: boolean;
    id: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    position?: string;
    pageNumber: number;
    enableShapeLabel: boolean;
    labelContent: string;
    labelFillColor: string;
    labelBorderColor: string;
    fontColor: string;
    fontSize: number;
    labelBounds: IRectangle;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    labelSettings?: ShapeLabelSettingsModel;
    annotationSettings?: any;
    customData: object;
    allowedInteractions?: AllowedInteraction[];
    isPrint: boolean;
    isCommentLock: boolean;
    isAnnotationRotated: boolean;
}
/**
 * @hidden
 */
export declare class ShapeAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    currentAnnotationMode: string;
    /**
     * @private
     */
    lineOpacity: number;
    /**
     * @private
     */
    arrowOpacity: number;
    /**
     * @private
     */
    rectangleOpacity: number;
    /**
     * @private
     */
    circleOpacity: number;
    /**
     * @private
     */
    polygonOpacity: number;
    /**
     * @private
     */
    lineFillColor: string;
    /**
     * @private
     */
    arrowFillColor: string;
    /**
     * @private
     */
    rectangleFillColor: string;
    /**
     * @private
     */
    circleFillColor: string;
    /**
     * @private
     */
    polygonFillColor: string;
    /**
     * @private
     */
    lineStrokeColor: string;
    /**
     * @private
     */
    arrowStrokeColor: string;
    /**
     * @private
     */
    rectangleStrokeColor: string;
    /**
     * @private
     */
    circleStrokeColor: string;
    /**
     * @private
     */
    polygonStrokeColor: string;
    /**
     * @private
     */
    lineThickness: number;
    /**
     * @private
     */
    arrowThickness: number;
    /**
     * @private
     */
    rectangleThickness: number;
    /**
     * @private
     */
    circleThickness: number;
    /**
     * @private
     */
    polygonThickness: number;
    /**
     * @private
     */
    lineDashArray: number;
    /**
     * @private
     */
    lineStartHead: LineHeadStyle;
    /**
     * @private
     */
    lineEndHead: LineHeadStyle;
    /**
     * @private
     */
    arrowDashArray: number;
    /**
     * @private
     */
    arrowStartHead: LineHeadStyle;
    /**
     * @private
     */
    arrowEndHead: LineHeadStyle;
    /**
     * @private
     */
    shapeCount: number;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isImportAcion - It describes about the whether the import action is true or not
     * @param {boolean} isAnnotOrderAction - It describes about the whether the annotation order action is true or not
     * @private
     * @returns {void}
     */
    renderShapeAnnotations(shapeAnnotations: any, pageNumber: number, isImportAcion?: boolean, isAnnotOrderAction?: boolean): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    getSettings(annotation: any): AnnotationSelectorSettingsModel;
    /**
     * @param {AnnotType} type - It describes about the annotation type
     * @private
     * @returns {void}
     */
    setAnnotationType(type: AnnotType): void;
    private updateShapeProperties;
    private setShapeType;
    private getShapeType;
    private getShapeAnnotType;
    /**
     * @param {string} property - It describes about the property
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotationBase - It describes about the annotation base
     * @param {any} toolMoved - It describes about the tool moved
     * @private
     * @returns {IShapeAnnotation} - Ishapeannotation
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any, toolMoved?: any): IShapeAnnotation;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {IShapeAnnotation} annotationBase - It describes about the annotation base
     * @private
     * @returns {void}
     */
    addInCollection(pageNumber: number, annotationBase: IShapeAnnotation): void;
    /**
     * @private
     * @returns {string} - string
     */
    saveShapeAnnotations(): string;
    private manageAnnotations;
    private createAnnotationObject;
    private getSelector;
    private getAnnotations;
    private getRgbCode;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    saveImportedShapeAnnotations(annotation: any, pageNumber: number): any;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    updateShapeAnnotationCollections(annotation: any, pageNumber: number): any;
    /**
     * This method used to add annotations with using program.
     *
     * @param {AnnotationType} annotationType - It describes the annotation type
     * @param {any} annotationObject - It describes type of annotation object
     * @param {IPoint} offset - It describes about the annotation bounds or location
     * @returns {object} - object
     * @private
     */
    updateAddAnnotationDetails(annotationType: AnnotationType, annotationObject: any, offset: IPoint): Object;
}
