import { PdfAnnotationBorder, PdfDocument, PdfPage, PdfSquareAnnotation, PdfPopupAnnotation, PdfLineAnnotation, PdfFont, PdfFontStyle, PdfFontFamily, PdfRubberStampAnnotation, PdfPath, PdfPolyLineAnnotation, PdfFreeTextAnnotation, PdfPolygonAnnotation, PdfEllipseAnnotation, PdfTextMarkupAnnotation, PdfInkAnnotation } from '@syncfusion/ej2-pdf';
import { PdfViewer, PdfViewerBase, SizeBase, PageRenderer } from '../index';
/**
 * AnnotationRenderer
 *
 * @hidden
 */
export declare class AnnotationRenderer {
    private formats;
    private pdfViewer;
    private pdfViewerBase;
    private defaultWidth;
    private defaultHeight;
    m_renderer: PageRenderer;
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    addShape(details: any, page: PdfPage): void;
    /**
     * @private
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @returns {void}
     */
    saveInkSignature(details: any, page: PdfPage): PdfInkAnnotation;
    /**
     * @private
     * @param {number[]} linePoints - points
     * @param {number} rotationAngle - rotateAngle
     * @returns {PdfPath} - graphicsPath
     */
    getRotatedPath(linePoints: number[], rotationAngle: number): PdfPath;
    private getRotationMatrix;
    private getRotatedPoints;
    /**
     * Rotates a path based on the provided points collection and rotation angle.
     * @param {number[]} pointsCollection - The collection of points to be rotated.
     * @param {number} rotationAngle - The angle to rotate the points, in degrees.
     * @returns {Path} - The rotated graphics path.
     * @private
     */
    getRotatedPathForMinMax(pointsCollection: number[][], rotationAngle: number): Path;
    /**
     * @param {any} details -details
     * @param {PdfDocument} loadedDocument - loadedDocument
     * @private
     * @returns {void}
     */
    addTextMarkup(details: any, loadedDocument: PdfDocument): void;
    /**
     * @private
     * @param {PdfPage} page - page
     * @param {boolean} isPath - path
     * @returns {PointBase} - points
     */
    getCropBoxValue(page: PdfPage, isPath: boolean): PointBase;
    private getBothCropBoxValue;
    private preserveIsLockProperty;
    /**
     * @private
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @returns {void}
     */
    addCustomStampAnnotation(details: any, page: PdfPage): void;
    /**
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    addMeasure(details: any, page: PdfPage): void;
    /**
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    addStickyNotes(details: any, page: PdfPage): void;
    private static hasDynamicText;
    private static setFontFromKeys;
    /**
     * @param {any} details - details
     * @param {PdfPage} page - page
     * @param {string} textFont - textFont
     * @private
     * @returns {void}
     */
    addFreeText(details: any, page: PdfPage, textFont?: {
        [key: string]: any;
    }): void;
    private renderSignHereStamp;
    private retriveDefaultWidth;
    private renderDynamicStamp;
    private calculateBoundsXY;
    private setMeasurementUnit;
    private getRubberStampRotateAngle;
    private getFontFamily;
    private getFontStyle;
    private getPdfTextAlignment;
    private drawStampAsPath;
    private transformPoints;
    private transform;
    private getIconName;
    private addCircleMeasurementAnnotation;
    private setMeasureDictionary;
    private createNumberFormat;
    private checkAnnotationLock;
    private getSaveVertexPoints;
    private getLineEndingStyle;
    private getCaptionType;
    private addReviewCollections;
    private addCommentsCollection;
    private getReviewState;
    private convertPixelToPoint;
    private convertPointToPixel;
    private isTransparentColor;
    private getRDValues;
    private getRotateAngle;
    /**
     * @private
     * @param {string} angleString - height
     * @returns {number} - angle
     */
    getInkRotateAngle(angleString: string): number;
    /**
     * @private
     * @param {PdfInkAnnotation} inkAnnot - inkAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {number} pageNumber - pageNumber
     * @param {PdfPage} loadedPage - loadedPage
     * @returns {void}
     */
    loadSignature(inkAnnot: PdfInkAnnotation, height: number, width: number, pageRotation: number, pageNumber: number, loadedPage: PdfPage): SignatureAnnotationBase;
    /**
     * @private
     * @param {PdfInkAnnotation} inkAnnot - inkAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - PageRotation
     * @param {number} pageNumber - number
     * @param {PdfPage} loadedPage - loadedPage
     * @returns {void}
     */
    loadInkAnnotation(inkAnnot: PdfInkAnnotation, height: number, width: number, pageRotation: number, pageNumber: number, loadedPage: PdfPage): InkSignatureAnnotation;
    /**
     * @param {PdfSquareAnnotation} squareAnnot - squareAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeText
     * @private
     * @returns {void}
     */
    loadSquareAnnotation(squareAnnot: PdfSquareAnnotation, height: number, width: number, pageRotation: number, shapeFreeText: PdfFreeTextAnnotation): ShapeAnnotationBase;
    /**
     * @param {PdfLineAnnotation} lineAnnot - lineAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeText
     * @private
     * @returns {void}
     */
    loadLineAnnotation(lineAnnot: PdfLineAnnotation, height: number, width: number, pageRotation: number, shapeFreeText: PdfFreeTextAnnotation): ShapeAnnotationBase;
    private getLinePoints;
    /**
     * @param {PdfEllipseAnnotation} ellipseAnnot - ellipseAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeTezt
     * @private
     * @returns {void}
     */
    loadEllipseAnnotation(ellipseAnnot: PdfEllipseAnnotation, height: number, width: number, pageRotation: number, shapeFreeText: PdfFreeTextAnnotation): ShapeAnnotationBase;
    /**
     * @param {PdfPolygonAnnotation} polygonAnnot - polygonAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeText
     * @private
     * @returns {void}
     */
    loadPolygonAnnotation(polygonAnnot: PdfPolygonAnnotation, height: number, width: number, pageRotation: number, shapeFreeText: PdfFreeTextAnnotation): ShapeAnnotationBase;
    /**
     * @param {PdfPolyLineAnnotation} polyLineAnnot - polyLineAnnot
     * @param {number} height -height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfFreeTextAnnotation} shapeFreeText - shapeFreeText
     * @private
     * @returns {void}
     */
    loadPolylineAnnotation(polyLineAnnot: PdfPolyLineAnnotation, height: number, width: number, pageRotation: number, shapeFreeText: PdfFreeTextAnnotation): ShapeAnnotationBase;
    /**
     * @private
     * @param {PdfRubberStampAnnotation} annotation - annotation
     * @param {number} pageNumber - pageNumber
     * @returns {void}
     */
    loadSignatureImage(annotation: PdfRubberStampAnnotation, pageNumber: number): SignatureAnnotationBase;
    private getMeasureObject;
    private getMeasureValues;
    private getVertexPoints;
    private getLineIndentString;
    private getLineEndingStyleString;
    private getBorderStylesString;
    private getBorderStyle;
    private getRotateAngleString;
    private getValidNoteContent;
    private getBounds;
    /**
     * @private
     * @param {PdfPopupAnnotation} popupAnnot - popupAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @returns {void}
     */
    loadPopupAnnotation(popupAnnot: PdfPopupAnnotation, height: number, width: number, pageRotation: number): PopupAnnotationBase;
    /**
     * @param {PdfFreeTextAnnotation} freeTextAnnot - freeTextAnnot
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    loadFreeTextAnnotation(freeTextAnnot: PdfFreeTextAnnotation, height: number, width: number, pageRotation: number, page: PdfPage): FreeTextAnnotationBase;
    private getTextAlignmentString;
    /**
     * @param {PdfFreeTextAnnotation} inkAnnot - inkAnnot
     * @param {number} pageNumber - pageNumber
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @private
     * @returns {void}
     */
    loadSignatureText(inkAnnot: PdfFreeTextAnnotation, pageNumber: number, height: number, width: number, pageRotation: number): SignatureAnnotationBase;
    private getFontFamilyString;
    private getAnnotationFlagsString;
    private getAnnotationIntentString;
    private getStateString;
    private getStateModelString;
    private getPopupIconString;
    private formatDate;
    private datePadding;
    /**
     * @param {string} jsonObject - jsonObject
     * @param {PdfDocument} loadedDocument - loadedDocument
     * @private
     * @returns {void}
     */
    removeSignatureTypeAnnot(jsonObject: {
        [key: string]: string;
    }, loadedDocument: PdfDocument): void;
    /**
     * @private
     * @param {any} annotation - annotation
     * @param {any} AnnotFromPDF - AnnotFromPDF
     * @returns {void}
     */
    updateIsLockProperty(annotation: any, AnnotFromPDF: any): void;
    /**
     * @param {PdfTextMarkupAnnotation} textMarkup - textMarkup
     * @param {number} height - height
     * @param {number} width - width
     * @param {number} pageRotation - pageRotation
     * @param {PdfPage} page - page
     * @private
     * @returns {void}
     */
    loadTextMarkupAnnotation(textMarkup: PdfTextMarkupAnnotation, height: number, width: number, pageRotation: number, page: PdfPage): TextMarkupAnnotationBase;
    private getTextMarkupBounds;
    private getMarkupAnnotTypeString;
}
/**
 *
 * @hidden
 */
export declare class PointBase {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
/**
 *
 * @hidden
 */
export declare class FreeTextAnnotationBase {
    Author: string;
    AnnotationSelectorSettings: any;
    MarkupText: string;
    TextMarkupColor: string;
    Color: AnnotColor;
    Font: FontBase;
    BorderColor: AnnotColor;
    Border: PdfAnnotationBorder;
    LineEndingStyle: string;
    AnnotationFlags: string;
    IsCommentLock: boolean;
    IsLocked: boolean;
    Text: string;
    Opacity: number;
    CalloutLines: AnnotPoint[];
    ModifiedDate: string;
    AnnotName: string;
    AnnotType: string;
    Name: string;
    Comments: PopupAnnotationBase[];
    AnnotationIntent: string;
    CreatedDate: string;
    Flatten: boolean;
    FlattenPopups: boolean;
    InnerColor: string;
    Layer: PdfLayer;
    Location: string;
    Page: PdfPage;
    PageTags: string;
    ReviewHistory: string;
    Rotate: number;
    Size: SizeBase;
    Subject: string;
    State: string;
    StateModel: string;
    StrokeColor: string;
    FillColor: string;
    Thickness: number;
    FontColor: string;
    FontSize: number;
    FontFamily: string;
    FreeTextAnnotationType: string;
    TextAlign: string;
    Note: string;
    CustomData: {
        [key: string]: any;
    };
    AnnotationSettings: any;
    AllowedInteractions: string[];
    IsPrint: boolean;
    IsReadonly: boolean;
    ExistingCustomData: string;
    Bounds: AnnotBounds;
    PageRotation: number;
    IsTransparentSet: boolean;
}
/**
 *
 * @hidden
 */
export declare class InkSignatureAnnotation {
    Bounds: any;
    AnnotationType: string;
    CustomData: {
        [key: string]: any;
    };
    Opacity: number;
    StrokeColor: string;
    Thickness: number;
    PathData: string;
    IsLocked: boolean;
    IsCommentLock: boolean;
    PageNumber: number;
    AnnotName: string;
    Author: string;
    ModifiedDate: string;
    Subject: string;
    Note: string;
    State: string;
    StateModel: string;
    AnnotationSelectorSettings: any;
    AnnotationSettings: any;
    AllowedInteractions: string[];
    Comments: PopupAnnotationBase[];
    AnnotType: string;
    IsPrint: boolean;
    ExistingCustomData: string;
    constructor();
}
/**
 *
 * @hidden
 */
export declare class ShapeAnnotationBase {
    ShapeAnnotationType: string;
    Author: string;
    AnnotationSelectorSettings: any;
    ModifiedDate: string;
    Subject: string;
    Note: string;
    IsCommentLock: boolean;
    StrokeColor: string;
    FillColor: string;
    Opacity: number;
    Bounds: any;
    Thickness: number;
    BorderStyle: string;
    BorderDashArray: number;
    RotateAngle: string;
    IsCloudShape: boolean;
    CloudIntensity: number;
    RectangleDifference: string[];
    VertexPoints: AnnotPoint[];
    LineHeadStart: string;
    LineHeadEnd: string;
    IsLocked: boolean;
    AnnotName: string;
    Comments: PopupAnnotationBase[];
    State: string;
    StateModel: string;
    AnnotType: string;
    EnableShapeLabel: boolean;
    LabelContent: string;
    LabelFillColor: string;
    LabelBorderColor: string;
    FontColor: string;
    FontSize: number;
    CustomData: {
        [key: string]: any;
    };
    LabelBounds: AnnotBounds;
    LabelSettings: any;
    AnnotationSettings: any;
    AllowedInteractions: string[];
    IsPrint: boolean;
    ExistingCustomData: string;
    AnnotationRotation: number;
    constructor();
}
/**
 *
 * @hidden
 */
export declare class MeasureShapeAnnotationBase {
    /**
     * MeasureShapeAnnotation
     */
    ShapeAnnotationType: string;
    Author: string;
    AnnotationSelectorSettings: any;
    ModifiedDate: string;
    Subject: string;
    Note: string;
    IsCommentLock: boolean;
    StrokeColor: string;
    FillColor: string;
    Opacity: number;
    Bounds: any;
    Thickness: number;
    BorderStyle: string;
    BorderDashArray: number;
    RotateAngle: string;
    IsCloudShape: boolean;
    CloudIntensity: number;
    RectangleDifference: string[];
    VertexPoints: AnnotPoint[];
    LineHeadStart: string;
    LineHeadEnd: string;
    IsLocked: boolean;
    AnnotName: string;
    Comments: PopupAnnotationBase[];
    State: string;
    StateModel: string;
    AnnotType: string;
    EnableShapeLabel: boolean;
    LabelContent: string;
    LabelFillColor: string;
    LabelBorderColor: string;
    FontColor: string;
    FontSize: number;
    CustomData: {
        [key: string]: any;
    };
    LabelBounds: AnnotBounds;
    LabelSettings: any;
    AnnotationSettings: any;
    AllowedInteractions: string[];
    IsPrint: boolean;
    ExistingCustomData: string;
    AnnotationRotation: number;
    constructor(shapeAnnotation: ShapeAnnotationBase);
    Indent: string;
    Caption: boolean;
    CaptionPosition: string;
    LeaderLineExtension: number;
    LeaderLength: number;
    LeaderLineOffset: number;
    Calibrate: Measure;
}
/**
 *
 * @hidden
 */
export declare class SignatureAnnotationBase {
    AnnotationType: string;
    Bounds: any;
    Opacity: number;
    StrokeColor: string;
    Thickness: number;
    PathData: string;
    PageNumber: number;
    SignatureName: string;
    ExistingCustomData: string;
    FontFamily: string;
    FontSize: number;
}
declare class Measure {
    Ratio: string;
    X: NumberFormat[];
    Distance: NumberFormat[];
    Area: NumberFormat[];
    Angle: NumberFormat[];
    Volume: NumberFormat[];
    TargetUnitConversion: number;
    Depth: number;
}
declare class NumberFormat {
    Unit: string;
    ConversionFactor: number;
    FractionalType: string;
    Denominator: number;
    FormatDenominator: boolean;
    constructor();
}
/**
 *
 * @hidden
 */
export declare class PopupAnnotationBase {
    Author: string;
    AnnotationSelectorSettings: any;
    ModifiedDate: string;
    Subject: string;
    IsLock: boolean;
    IsCommentLock: boolean;
    AnnotationFlags: string;
    Note: string;
    Type: string;
    SubType: string;
    AnnotName: string;
    Icon: string;
    Comments: PopupAnnotationBase[];
    State: string;
    StateModel: string;
    Opacity: number;
    StrokeColor: string;
    Color: AnnotColor;
    Reference: any;
    AnnotType: string;
    CustomData: {
        [key: string]: any;
    };
    AnnotationSettings: any;
    IsPrint: boolean;
    ExistingCustomData: string;
    Bounds: AnnotBounds;
    Size: SizeBase;
    IsLocked: boolean;
    constructor();
}
/**
 *
 * @hidden
 */
export declare class TextMarkupAnnotationBase {
    TextMarkupAnnotationType: string;
    AnnotationSelectorSettings: any;
    Author: string;
    ModifiedDate: string;
    Subject: string;
    Note: string;
    IsCommentLock: boolean;
    Bounds: AnnotBounds[];
    Color: string;
    Opacity: number;
    Rect: RectangleBase;
    AnnotName: string;
    Comments: PopupAnnotationBase[];
    State: string;
    StateModel: string;
    AnnotType: string;
    CustomData: any;
    ExistingCustomData: string;
    IsMultiSelect: boolean;
    AnnotNameCollection: string[];
    AnnotpageNumbers: number[];
    AnnotationSettings: any;
    AllowedInteractions: string[];
    IsPrint: boolean;
    IsLocked: boolean;
    TextMarkupContent: string;
    AnnotationRotation: number;
    constructor();
}
/**
 *
 * @hidden
 */
export declare class PdfLayer {
}
/**
 *
 * @hidden
 */
export declare class AnnotPoint {
    X: number;
    Y: number;
    constructor(_X: number, _Y: number);
}
/**
 *
 * @hidden
 */
export declare class AnnotBounds {
    X: number;
    Y: number;
    Width: number;
    Height: number;
    Location: {
        X: number;
        Y: number;
    };
    Size: SizeBase;
    Left: number;
    Top: number;
    Right: number;
    Bottom: number;
    constructor(_X: number, _Y: number, _Width: number, _Height: number);
}
/**
 *
 * @hidden
 */
export declare class AnnotColor {
    R: number;
    G: number;
    B: number;
    IsEmpty: boolean;
    constructor(_R: number, _G: number, _B: number);
}
/**
 *
 * @hidden
 */
export declare class FontBase {
    Bold: boolean;
    FontFamily: PdfFontFamily;
    Height: number;
    Italic: boolean;
    Name: string;
    Size: number;
    Strikeout: boolean;
    Style: PdfFontStyle;
    Underline: boolean;
    constructor(pdfFont: PdfFont, fontFamilyString: string);
}
/**
 *
 * @hidden
 */
export declare class Path {
    points: [number, number][];
    constructor();
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    transform(matrix: [number, number, number][]): void;
}
/**
 *
 * @hidden
 */
export declare class RectangleBase {
    /**
     * Value of `left`.
     *
     * @private
     */
    left: number;
    /**
     * Value of `top`.
     *
     * @private
     */
    top: number;
    /**
     * Value of `right`.
     *
     * @private
     */
    right: number;
    /**
     * Value of `bottom`.
     *
     * @private
     */
    bottom: number;
    /**
     * @param {number} left - left
     * @param {number} top - top
     * @param {number} right - right
     * @param {number} bottom - bottom
     * @private
     */
    constructor(left: number, top: number, right: number, bottom: number);
    /**
     * Gets a value of width
     */
    readonly width: number;
    /**
     * Gets a value of height
     */
    readonly height: number;
}
export {};
