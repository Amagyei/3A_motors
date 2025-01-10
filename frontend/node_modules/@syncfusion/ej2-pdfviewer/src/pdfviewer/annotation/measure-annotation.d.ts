import { PdfViewer, PdfViewerBase, IRectangle, IPoint, AnnotationType as AnnotType, ShapeLabelSettingsModel, AnnotationType } from '../../index';
import { PdfAnnotationBaseModel } from '../drawing/pdf-annotation-model';
import { PointModel } from '@syncfusion/ej2-drawings';
import { ICommentsCollection, IReviewCollection } from './sticky-notes-annotation';
import { LineHeadStyle, CalibrationUnit, AllowedInteraction } from '../base';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IMeasureShapeAnnotation {
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
    caption: boolean;
    captionPosition: string;
    leaderLineExtension: number;
    leaderLength: number;
    leaderLineOffset: number;
    indent: string;
    calibrate: any;
    id: string;
    annotName: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
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
    allowedInteractions?: AllowedInteraction;
    isPrint: boolean;
    isCommentLock: boolean;
    isAnnotationRotated: boolean;
}
/**
 * @hidden
 */
export interface IMeasure {
    ratio: string;
    x?: INumberFormat[];
    distance?: INumberFormat[];
    area?: INumberFormat[];
    angle?: INumberFormat[];
    volume?: INumberFormat[];
    targetUnitConversion?: number;
    depth?: number;
}
/**
 * @hidden
 */
export interface INumberFormat {
    unit: string;
    conversionFactor: number;
    fractionalType: string;
    denominator: number;
    formatDenominator: boolean;
}
/**
 * @hidden
 */
export declare class MeasureAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    currentAnnotationMode: string;
    /**
     * @private
     */
    distanceOpacity: number;
    /**
     * @private
     */
    perimeterOpacity: number;
    /**
     * @private
     */
    areaOpacity: number;
    /**
     * @private
     */
    radiusOpacity: number;
    /**
     * @private
     */
    volumeOpacity: number;
    /**
     * @private
     */
    distanceFillColor: string;
    /**
     * @private
     */
    perimeterFillColor: string;
    /**
     * @private
     */
    areaFillColor: string;
    /**
     * @private
     */
    radiusFillColor: string;
    /**
     * @private
     */
    volumeFillColor: string;
    /**
     * @private
     */
    distanceStrokeColor: string;
    /**
     * @private
     */
    perimeterStrokeColor: string;
    /**
     * @private
     */
    areaStrokeColor: string;
    /**
     * @private
     */
    radiusStrokeColor: string;
    /**
     * @private
     */
    volumeStrokeColor: string;
    /**
     * @private
     */
    distanceThickness: number;
    /**
     * @private
     */
    leaderLength: number;
    /**
     * @private
     */
    perimeterThickness: number;
    /**
     * @private
     */
    areaThickness: number;
    /**
     * @private
     */
    radiusThickness: number;
    /**
     * @private
     */
    volumeThickness: number;
    /**
     * @private
     */
    distanceDashArray: number;
    /**
     * @private
     */
    distanceStartHead: LineHeadStyle;
    /**
     * @private
     */
    distanceEndHead: LineHeadStyle;
    /**
     * @private
     */
    perimeterDashArray: number;
    /**
     * @private
     */
    perimeterStartHead: LineHeadStyle;
    /**
     * @private
     */
    perimeterEndHead: LineHeadStyle;
    private unit;
    /**
     * @private
     */
    displayUnit: CalibrationUnit;
    /**
     * @private
     */
    measureShapeCount: number;
    /**
     * @private
     */
    volumeDepth: number;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    private ratio;
    private srcValue;
    private destValue;
    private scaleRatioString;
    private scaleRatioDialog;
    private sourceTextBox;
    private convertUnit;
    private destTextBox;
    private dispUnit;
    private depthTextBox;
    private depthUnit;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     * @returns {number} - number
     */
    readonly pixelToPointFactor: number;
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isImportAction - It describes about whether the isImportAction is true or not
     * @param {boolean} isAnnotOrderAction - It describes about whether the isAnnotOrderAction is true or not
     * @private
     * @returns {void}
     */
    renderMeasureShapeAnnotations(shapeAnnotations: any, pageNumber: number, isImportAction?: boolean, isAnnotOrderAction?: boolean): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    getSettings(annotation: any): any;
    /**
     * @param {AnnotType} type - It describes about the annotation type
     * @private
     * @returns {void}
     */
    setAnnotationType(type: AnnotType): void;
    private updateMeasureproperties;
    private createAnnotationObject;
    private getSelector;
    private getShapeAnnotType;
    private getShapeType;
    private getMeasureType;
    private getIndent;
    private getNumberFormatArray;
    private createNumberFormat;
    /**
     * @private
     * @returns {string} - string
     */
    saveMeasureShapeAnnotations(): string;
    /**
     * @private
     * @returns {void}
     */
    createScaleRatioWindow(): void;
    private createRatioUI;
    private convertUnitSelect;
    private dispUnitSelect;
    private depthUnitSelect;
    private createContent;
    private createInputElement;
    /**
     * @private
     * @returns {void}
     */
    onOkClicked(): void;
    private restoreUnit;
    /**
     * @param {string} ratio - It describes about the ratio
     * @param {CalibrationUnit} displayUnit - It describes about the display unit
     * @param {CalibrationUnit} conversionUnit - It describes about the conversion unit
     * @param {number} depth - It describes about the depth
     * @private
     * @returns {void}
     */
    updateMeasureValues(ratio: string, displayUnit: CalibrationUnit, conversionUnit: CalibrationUnit, depth: number): void;
    private getAnnotationBaseModel;
    private getContent;
    /**
     * @param value
     * @param currentAnnot
     * @private
     */
    setConversion(value: number, currentAnnot: any): string;
    private onCancelClicked;
    /**
     * @param {string} property - It describes about the property
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotationBase - It describes about the annotation base
     * @param {boolean} isNewlyAdded - It describes about whether the isNewlyAdded is true or not
     * @private
     * @returns {IMeasureShapeAnnotation} - IMeasureShapeAnnotation
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any, isNewlyAdded?: boolean): IMeasureShapeAnnotation;
    /**
     * @param {number} pageNumber -It describes about the page number
     * @param {IMeasureShapeAnnotation} annotationBase - It describes about the annotation base
     * @private
     * @returns {void}
     */
    addInCollection(pageNumber: number, annotationBase: IMeasureShapeAnnotation): void;
    private manageAnnotations;
    private getAnnotations;
    private getCurrentObject;
    private getCurrentValues;
    private getCurrentRatio;
    /**
     * @param {PointModel} points - It describes about the points
     * @param {string} id - It describes about the id
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {string} - string
     */
    calculateArea(points: PointModel[], id?: string, pageNumber?: number): string;
    private getArea;
    /**
     * @param {PointModel} points - It describes about the points
     * @param {string} id - It describes about the id
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {string} - string
     */
    calculateVolume(points: PointModel[], id?: string, pageNumber?: number): string;
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - It describes about the pdf annotation base
     * @private
     * @returns {string} - string
     */
    calculatePerimeter(pdfAnnotationBase: PdfAnnotationBaseModel): string;
    private getFactor;
    private convertPointToUnits;
    private convertUnitToPoint;
    private getStringifiedMeasure;
    private getRgbCode;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    saveImportedMeasureAnnotations(annotation: any, pageNumber: number): any;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number value
     * @private
     * @returns {any} - any
     */
    updateMeasureAnnotationCollections(annotation: any, pageNumber: number): any;
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
