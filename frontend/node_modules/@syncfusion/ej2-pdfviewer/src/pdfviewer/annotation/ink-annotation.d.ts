import { InkAnnotationSettings } from './../pdfviewer';
import { IPoint, PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
export declare class InkAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    newObject: any;
    /**
     * @private
     */
    outputString: string;
    /**
     * @private
     */
    mouseX: number;
    /**
     * @private
     */
    mouseY: number;
    /**
     * @private
     */
    inkAnnotationindex: any;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    /**
     * @private
     */
    currentPageNumber: string;
    /**
     * @private
     */
    inkAnnotationInitialZoom: number;
    /**
     * @private
     */
    inkPathDataCollection: IInkPathDataCollection[];
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     * @returns {void}
     */
    drawInk(): void;
    drawInkAnnotation(pageNumber?: number): void;
    /**
     * @private
     * @returns {any} - any
     */
    updateInkDataWithZoom(): string;
    private updatePathDataWithZoom;
    /**
     * @private
     * @returns {void}
     */
    storePathData(): void;
    /**
     * @param {any} position - It describes about the position of the annotation
     * @param {number} pageIndex - It describes about the page index value
     * @private
     * @returns {void}
     */
    drawInkInCanvas(position: any, pageIndex: number): void;
    private convertToPath;
    private linePath;
    private movePath;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    addInk(pageNumber?: number): any;
    /**
     * @private
     * @returns {void}
     */
    setAnnotationMode(): void;
    saveInkSignature(): string;
    /**
     * @param {number} pageNumber - It describes about the page number value
     * @param {any} annotationBase - It describes about the annotation base
     * @private
     * @returns {void}
     */
    addInCollection(pageNumber: number, annotationBase: any): void;
    /**
     * @private
     * @param {string} data - data
     * @returns {any} - points
     */
    calculateInkSize(data: string): any;
    /**
     * @param {any} annotationCollection - It describes about the annotation collection
     * @param {number} pageIndex - page index value
     * @param {boolean} isImport - It ensures whether the isImport is true or not
     * @param {boolean} isAnnotOrderAction - It ensures whether the isAnnotOrderAction is true or not
     * @private
     * @returns {void}
     */
    renderExistingInkSignature(annotationCollection: any, pageIndex: number, isImport: boolean, isAnnotOrderAction?: boolean): void;
    /**
     * @param {any} annotation - This is annotation
     * @param {number} pageNumber - This is page number
     * @private
     * @returns {void}
     */
    saveImportedInkAnnotation(annotation: any, pageNumber: number): void;
    private getSettings;
    /**
     * @param {number} pageNumber - It describes about the page number value
     * @param {any} annotations - It describes about the annotations
     * @private
     * @returns {void}
     */
    storeInkSignatureData(pageNumber: number, annotations: any): void;
    getSelector(type: string, subject: string): AnnotationSelectorSettingsModel;
    private getAnnotations;
    /**
     * @param {string} property - It describes about the property
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotationBase - It is about the annotation base
     * @private
     * @returns {any} - any
     */
    modifySignatureInkCollection(property: string, pageNumber: number, annotationBase: any): any;
    private manageInkAnnotations;
    /**
     * @param {any} currentAnnotation - It describes about the current annotation
     * @param {number} pageIndex - It describes about the page index value
     * @param {boolean} isImport - It ensures whether the isImport is true or not
     * @private
     * @returns {any} - any
     */
    updateInkCollections(currentAnnotation: any, pageIndex: number, isImport?: boolean): any;
    /**
     * This method used to add annotations with using program.
     *
     * @param {InkAnnotationSettings} annotationObject - It describes type of annotation object
     * @param {IPoint} offset - It describes about the annotation bounds or location
     * @param {number} pageNumber - It describes about the annotation page number
     * @returns {object} - onject
     * @private
     */
    updateAddAnnotationDetails(annotationObject: InkAnnotationSettings, offset: IPoint, pageNumber: number): Object;
}
/**
 * Defines the FormFields Bound properties
 *
 * @hidden
 */
export interface IInkPathDataCollection {
    pathData: any;
    zoomFactor: number;
}
