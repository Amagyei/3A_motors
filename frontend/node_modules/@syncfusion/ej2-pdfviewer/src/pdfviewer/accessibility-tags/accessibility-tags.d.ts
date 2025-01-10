import { PdfViewer, PdfViewerBase, SizeBase } from '../index';
/**
 * The 'AccessibilityTags' module helps to access the tagged layers in a PDF document for the users with disabilities.
 *
 * @param {TaggedElements[]} taggedTextResponse - taggedTextResponse
 * @returns {AccessibilityTags} - AccessibilityTags
 */
export declare class AccessibilityTags {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    private addTaggedLayer;
    /**
     * @param {number} pageIndex - It describes about the page index value
     * @param {TaggedElements[]} taggedTextResponse - It describes about the tagged text response
     * @private
     * @returns {void}
     */
    renderAccessibilityTags(pageIndex: number, taggedTextResponse: TaggedElements[]): void;
    private createTag;
    private getTag;
    private setStyleToTaggedTextDiv;
    private setTextElementProperties;
    /**
     * @private
     * @returns {string} - string
     */
    getModuleName(): string;
    /**
     * @private
     * @returns {string} - string
     */
    destroy(): boolean;
}
/**
 *
 * @hidden
 * @private
 */
declare class TaggedElements {
    Order: number;
    TagType: string;
    ParentTagType: string;
    Text: string;
    AltText: string;
    FontSize: number;
    FontName: string;
    FontStyle: string;
    PageNumber: number;
    ChildElements: TaggedElements[];
    Bounds: RectBounds;
}
/**
 *
 * @hidden
 * @private
 */
export declare class RectBounds {
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
export {};
