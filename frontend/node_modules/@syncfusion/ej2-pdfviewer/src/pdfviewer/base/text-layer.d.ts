import { PdfViewer, PdfViewerBase } from '../index';
/**
 * TextLayer module is used to handle the text content on the control.
 *
 * @hidden
 */
export declare class TextLayer {
    private pdfViewer;
    private pdfViewerBase;
    private textBoundsArray;
    /**
     * @private
     */
    characterBound: any[];
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {number} pageNumber - The pageNumber.
     * @param {number} pageWidth - The pageWidth.
     * @param {number} pageHeight - The pageHeight.
     * @param {HTMLElement} pageDiv - The pageDiv.
     * @returns {HTMLElement} - The HTMLElement.
     * @private
     */
    addTextLayer(pageNumber: number, pageWidth: number, pageHeight: number, pageDiv: HTMLElement): HTMLElement;
    /**
     * @param {number} pageNumber - The pageNumber.
     * @param {any} textContents - The textContents.
     * @param {any} textBounds - The textBounds.
     * @param {any} rotation - The rotation.
     * @param {any} rtldoc - The rtldoc
     * @returns {void}
     * @private
     */
    renderTextContents(pageNumber: number, textContents: any, textBounds: any, rotation: any, rtldoc: any): void;
    /**
     * @param {number} pageNumber -This is pageNumber
     * @param {any} textContents - This is textContents
     * @param {any} textBounds - This is textBounds
     * @param {any} rotation - This is rotation
     * @param {boolean} isTextSearch - This is isTextSearch
     * @private
     * @returns {void}
     */
    resizeTextContents(pageNumber: number, textContents: any, textBounds: any, rotation: any, isTextSearch?: boolean): void;
    private applyTextRotation;
    private setTextElementProperties;
    /**
     * @param {number} pageNumber - The pageNumber.
     * @returns {void}
     * @private
     */
    resizeTextContentsOnZoom(pageNumber: number): void;
    /**
     * EJ2-855106- Optimize performance by eliminating unnecessary getBoundingClientRect usage in this method.
     *
     * @param {HTMLElement} textLayer - This is textLayer
     * @param {HTMLElement} textDiv - This is textDiv
     * @returns {void}
     */
    private resizeExcessDiv;
    /**
     * @private
     * @param {boolean} isPinchZoomed - The isPinchZoomed.
     * @returns {void}
     */
    clearTextLayers(isPinchZoomed?: boolean): void;
    private removeElement;
    private removeForeignObjects;
    /**
     * @param {number} pageNumber - This is pageNumber
     * @param {number} divId - This is divId
     * @param {number} fromOffset - This is fromoffset
     * @param {number} toOffset - This is toOffset
     * @param {string} textString - This is textString
     * @param {string} className - This is className
     * @param {boolean} isRTLText - This is isRTLText
     * @private
     * @returns {void}
     */
    convertToSpan(pageNumber: number, divId: number, fromOffset: number, toOffset: number, textString: string, className: string, isRTLText?: boolean): void;
    /**
     * @param {number} startPage - This is startPage
     * @param {number} endPage - This is endPage
     * @param {number} anchorOffsetDiv - This is anchorOffsetDiv
     * @param {number} focusOffsetDiv - This is focusOffsetDiv
     * @param {number} anchorOffset - This is anchorOffset
     * @param {number} focusOffset - This is focusOffset
     * @private
     * @returns {void}
     */
    applySpanForSelection(startPage: number, endPage: number, anchorOffsetDiv: number, focusOffsetDiv: number, anchorOffset: number, focusOffset: number): void;
    /**
     * @private
     * @returns {void}
     */
    clearDivSelection(): void;
    private setStyleToTextDiv;
    private getTextSelectionStatus;
    /**
     * @param {boolean} isAdd - The isAdd.
     * @returns {void}
     * @private
     */
    modifyTextCursor(isAdd: boolean): void;
    /**
     * @param {Selection} selection - The Selection.
     * @returns {boolean} - Returns true or false.
     * @private
     */
    isBackWardSelection(selection: Selection): boolean;
    /**
     * @param {Node} element - The element.
     * @returns {number} - Returns number.
     * @private
     */
    getPageIndex(element: Node): number;
    /**
     * @param {Node} element - The element.
     * @param {number} pageIndex - The pageIndex.
     * @returns {number} - Returns number.
     * @private
     */
    getTextIndex(element: Node, pageIndex: number): number;
    private getPreviousZoomFactor;
    /**
     * @private
     * @returns {boolean} - Returns true or false.
     */
    getTextSearchStatus(): boolean;
}
