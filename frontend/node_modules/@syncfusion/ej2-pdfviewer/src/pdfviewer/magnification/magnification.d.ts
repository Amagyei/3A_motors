import { PdfViewer, PdfViewerBase } from '../index';
import { Rect } from '@syncfusion/ej2-drawings';
/**
 * Magnification module
 */
export declare class Magnification {
    /**
     * @private
     */
    zoomFactor: number;
    /**
     * @private
     */
    previousZoomFactor: number;
    private scrollWidth;
    private pdfViewer;
    private pdfViewerBase;
    private zoomLevel;
    private higherZoomLevel;
    private lowerZoomLevel;
    private zoomPercentages;
    private isNotPredefinedZoom;
    private pinchStep;
    private reRenderPageNumber;
    private magnifyPageRerenderTimer;
    private rerenderOnScrollTimer;
    private rerenderInterval;
    private previousTouchDifference;
    private touchCenterX;
    private touchCenterY;
    private mouseCenterX;
    private mouseCenterY;
    private pageRerenderCount;
    private imageObjects;
    private topValue;
    private isTapToFitZoom;
    /**
     * @private
     */
    isWaitingPopupUpdated: boolean;
    /**
     * @private
     */
    isInitialCustomZoomValues: boolean;
    /**
     * @private
     */
    fitType: string;
    /**
     * @private
     */
    isInitialLoading: boolean;
    /**
     * @private
     */
    isPinchZoomed: boolean;
    /**
     * @private
     */
    isPagePinchZoomed: boolean;
    /**
     * @private
     */
    isRerenderCanvasCreated: boolean;
    /**
     * @private
     */
    isMagnified: boolean;
    /**
     * @private
     */
    isPagesZoomed: boolean;
    /**
     * @private
     */
    isPinchScrolled: boolean;
    /**
     * @private
     */
    isAutoZoom: boolean;
    /**
     * @private
     */
    isDoubleTapZoom: boolean;
    /**
     * @private
     */
    isFormFieldPageZoomed: boolean;
    private isWebkitMobile;
    private isFitToPageMode;
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdf viewer
     * @param {PdfViewerBase} viewerBase - It describes about the viewer base
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * Zoom the PDF document to the given zoom value
     *
     * @param  {number} zoomValue - Specifies the Zoom Value for magnify the PDF document
     * @returns {void}
     */
    zoomTo(zoomValue: number): void;
    /**
     * Magnifies the page to the next value in the zoom drop down list.
     *
     * @returns {void}
     */
    zoomIn(): void;
    /**
     * Magnifies the page to the previous value in the zoom drop down list.
     *
     * @returns {void}
     */
    zoomOut(): void;
    /**
     * Scales the page to fit the page width to the width of the container in the control.
     *
     * @returns {void}
     */
    fitToWidth(): void;
    /**
     * @private
     * @returns {void}
     */
    fitToAuto(): void;
    /**
     * Scales the page to fit the page in the container in the control.
     *
     * @returns {void}
     */
    fitToPage(): void;
    /**
     * Returns zoom factor for the fit zooms.
     *
     * @param {string} type -It describes about the type
     * @returns {number} - number
     */
    private calculateFitZoomFactor;
    /**
     * Initiating cursor based zoom.
     *
     * @param {number} pointX - It describes about the pointX
     * @param {number} pointY - It describes about the pointY
     * @param {number} zoomValue - It describes about the zoom value
     * @private
     * @returns {void}
     */
    initiateMouseZoom(pointX: number, pointY: number, zoomValue: number): void;
    /**
     * Performs pinch in operation
     *
     * @returns {void}
     */
    private pinchIn;
    /**
     * Performs pinch out operation
     *
     * @returns {void}
     */
    private pinchOut;
    /**
     * returns zoom level for the zoom factor.
     *
     * @param {number} zoomFactor - It describes about the zoom factor
     * @returns {number} - number
     */
    private getZoomLevel;
    /**
     * @private
     * @returns {boolean} - boolean
     */
    checkZoomFactor(): boolean;
    /**
     * Executes when the zoom or pinch operation is performed
     *
     * @param {number} zoomValue - It describes about the zoom value
     * @returns {void}
     */
    private onZoomChanged;
    /**
     * @param {number} clientX - It describes about the clientX
     * @param {number} clientY - It describes about the clientY
     * @private
     * @returns {void}
     */
    setTouchPoints(clientX: number, clientY: number): void;
    /**
     * @param {number} pointX1 - It describes about the pointX1
     * @param {number} pointY1 - It describes about the pointY1
     * @param {number} pointX2 - It describes about the pointX2
     * @param {number} pointY2 - It describes about the pointY2
     * @private
     * @returns {void}
     */
    initiatePinchMove(pointX1: number, pointY1: number, pointX2: number, pointY2: number): void;
    private magnifyPages;
    private updatePageLocation;
    private updatePageContainer;
    private clearRerenderTimer;
    /**
     * @private
     * @returns {void}
     */
    clearIntervalTimer(): void;
    /**
     * @param {HTMLImageElement} image - It describes about the image
     * @private
     * @returns {void}
     */
    pushImageObjects(image: HTMLImageElement): void;
    private clearRendering;
    private rerenderMagnifiedPages;
    private renderInSeparateThread;
    private responsivePages;
    private calculateScrollValues;
    private calculateScrollValuesOnMouse;
    private rerenderOnScroll;
    /**
     * @private
     * @returns {void}
     */
    pinchMoveScroll(): void;
    private initiateRerender;
    private reRenderAfterPinch;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    rerenderAnnotations(pageNumber: number): void;
    private designNewCanvas;
    /**
     * @private
     * @returns {void}
     */
    pageRerenderOnMouseWheel(): void;
    /**
     * @private
     * @returns {void}
     */
    renderCountIncrement(): void;
    /**
     * @private
     * @returns {void}
     */
    rerenderCountIncrement(): void;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    resizeCanvas(pageNumber: number): void;
    private zoomOverPages;
    /**
     * @private
     * @returns {void}
     */
    pinchMoveEnd(): void;
    /**
     * @param {WheelEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    fitPageScrollMouseWheel(event: WheelEvent): void;
    /**
     * @param {KeyboardEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    magnifyBehaviorKeyDown(event: KeyboardEvent): void;
    private formElementcheck;
    private focusOnViewerContainer;
    private upwardScrollFitPage;
    /**
     * @param {number} currentPageIndex - It describes about the current page index
     * @private
     * @returns {void}
     */
    updatePagesForFitPage(currentPageIndex: number): void;
    /**
     * @private
     * @returns {void}
     */
    onDoubleTapMagnification(): void;
    private downwardScrollFitPage;
    private getMagnifiedValue;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * returns zoom factor when the zoom percent is passed.
     *
     * @param {number} zoomValue - It describes about the zoom value
     * @returns {number} - number
     */
    private getZoomFactor;
    /**
     * @private
     * @returns {string} - string
     */
    getModuleName(): string;
    /**
     * Returns the pinch step value.
     *
     * @param {number} higherValue - It describes about the higher value
     * @param {number} lowerValue - It describes about the lower value
     * @returns {number} - number
     */
    private getPinchStep;
    /**
     * @private
     * @param {Rect} zoomRect - Specifies the region in client coordinates that is to be brought to view.
     * @returns {void}
     */
    zoomToRect(zoomRect: Rect): void;
    /**
     * Returns Point value respect to Main container.
     *
     * @param {number} pointX - It describes about the pointX
     * @param {number} pointY - It describes about the pointY
     * @returns {any} - any
     */
    private positionInViewer;
}
