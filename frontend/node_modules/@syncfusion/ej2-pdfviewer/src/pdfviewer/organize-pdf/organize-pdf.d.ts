import { PdfViewer, PdfViewerBase, ISize } from '../index';
interface IActionOrganizeElements {
    action: string;
    UndoRedoTileActions: OrganizeDetails[];
    toolbarActions: OrganizeDetails[];
    selectedPagesIndexes: number[];
    dropIndex: number;
    isRightInsertion: boolean;
}
/**
 * The `PageOrganizer` module is used to handle page organize operations of PDF viewer.
 *
 * @param {Event} event - The event triggering the page organization.
 * @param {Object} args - Additional arguments for the page organization.
 * @returns {void}
 */
export declare class PageOrganizer {
    private pdfViewer;
    private pdfViewerBase;
    private rotateRightButton;
    private rotateLeftButton;
    private insertRightButton;
    private insertLeftButton;
    private deleteButton;
    private copyButton;
    private toolbar;
    private importDocInputElement;
    private importedDocumentName;
    /**
     * @private
     */
    importedDocumentData: string;
    /**
     * @private
     */
    dataDetails: any[];
    /**
     * @private
     */
    dialogDivElement: HTMLElement;
    /**
     * @private
     */
    waitingPopup: HTMLElement;
    private thumbnail;
    private imageContainer;
    private organizeDialog;
    private tileAreaWrapper;
    private tileAreaDiv;
    private thumbnailImage;
    private importImageWrapper;
    private pageLink;
    private previewRequestHandler;
    private contextMenuObj;
    private mobileContextMenu;
    /**
     * @private
     */
    organizePagesCollection: OrganizeDetails[];
    private tempOrganizePagesCollection;
    private isSkipRevert;
    private isAllImagesReceived;
    private selectAllCheckBox;
    private totalCheckedCount;
    private selectedPageIndexes;
    private dragEndIndex;
    private dragHoveredIndex;
    private dragObj;
    private dropObj;
    private virtualEle;
    private previousClientY;
    private autoScrollInterval;
    private isRightInsertion;
    private gapBetweenDivs;
    /**
     * @private
     */
    isDocumentModified: boolean;
    /**
     * @private
     */
    undoOrganizeCollection: IActionOrganizeElements[];
    /**
     * @private
     */
    redoOrganizeCollection: IActionOrganizeElements[];
    /**
     * @private
     */
    toolbarUndoRedoCollection: OrganizeDetails[];
    private startTile;
    private ctrlKey;
    private shiftKey;
    private isClickedOnCheckBox;
    private isTouchEvent;
    private boundOnTileAreaMouseDown;
    private boundOnTileAreaKeyDown;
    private boundOnTileAreaKeyUp;
    /**
     * @private
     */
    isOrganizeWindowOpen: boolean;
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfviewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {boolean} isReConstruct - It describes about the isReConstruct
     * @private
     * @returns {void}
     */
    createOrganizeWindow(isReConstruct?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    createOrganizeWindowForMobile(): void;
    private initEventListeners;
    private removeEventListeners;
    private onTileAreaMouseDown;
    private onTileAreaKeyDown;
    private onTileAreaKeyUp;
    private onSelectAllClick;
    private selectRange;
    private selectTile;
    private deselectTile;
    private clearSelection;
    private selectAllTiles;
    private updateOrganizeDialogSize;
    private createContentArea;
    private createMobileContextMenu;
    private contextMenuBeforeOpen;
    private getCopiedItems;
    private getImportedItems;
    private contextMenuItemSelect;
    /**
     * @private
     * @returns {void}
     */
    createRequestForPreview(): any;
    private requestPreviewCreation;
    /**
     * @param {any} data - It describes about the data
     * @private
     * @returns {void}
     */
    updatePreviewCollection(data: any): void;
    /**
     * @param {any} event - It describes about the event
     * @private
     * @returns {void}
     */
    previewOnMessage(event: any): void;
    /**
     * @param {any} data - It describes about the data
     * @param {boolean} isClientRender - It describes about the isClientRender
     * @private
     * @returns {void}
     */
    getData(data: any, isClientRender: boolean): void;
    private createImportDocElement;
    private pageDragDrop;
    private movePDFpages;
    private rearrangePages;
    private updateCollection;
    /**
     * @private
     * @param {any} a - a value
     * @param {any} b - b value
     * @returns {number} - number
     */
    sorting(a: any, b: any): number;
    private containsPageDetails;
    private renderThumbnailImage;
    private bindImportDocEvent;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {number} subIndex - It describes about the sub index
     * @param {number} pageOrder - It describes about the page order
     * @param {HTMLElement} targetElement - It describes about the target element
     * @param {boolean} isNewPage - It describes about the isNewPage
     * @param {boolean} isBefore - It describes about the isBefore
     * @param {boolean} isEmptyPage - It describes about the isEmptyPage
     * @param {boolean} isImportedPage - It describes about the isImportedPage
     * @param {string} documentName - It describes about the documentName
     * @private
     * @returns {void}
     */
    tileImageRender(pageIndex: number, subIndex?: number, pageOrder?: number, targetElement?: HTMLElement, isNewPage?: boolean, isBefore?: boolean, isEmptyPage?: boolean, isImportedPage?: boolean, documentName?: string): void;
    private handleImageContainerClick;
    private movePages;
    private autoScroll;
    private handlePageMove;
    private isTileRightInsertion;
    private addSelectionRingStyle;
    private removeSelectionRingStyle;
    private isHoveredOnSelectedPages;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    thumbnailMouseOver: (event: MouseEvent) => void;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    thumbnailMouseLeave: (event: MouseEvent) => void;
    /**
     * @param {OrganizeDetails[]} UndoRedoTileActions - Specifies the details of the action occured page
     * @param {string} actionString - Specifies the Name of the action
     * @param {OrganizeDetails[]} toolbarActions - Collection to store multiple action as single action
     * @param {number[]} selectedPageIndexes - Collection to store selected page index
     * @param {number} dropIndex - Specifies where the page should be dropped
     * @param {boolean} isRightInsertion - Used to check whether the page should be dropped at right
     * @returns {void}
     * @private
     */
    addOrganizeAction(UndoRedoTileActions: OrganizeDetails[], actionString: string, toolbarActions: OrganizeDetails[], selectedPageIndexes: number[], dropIndex: number, isRightInsertion: boolean): void;
    private updateUndoRedoButtons;
    private enableDisableToolbarItems;
    private enableToolbarItem;
    private disableTileDeleteButton;
    private disableTileCopyRotateButton;
    private disableTileCopyButton;
    private onSelectClick;
    private updateSelectAllCheckbox;
    private setSelectionRingStyle;
    private onTooltipBeforeOpen;
    private rotateButtonClick;
    private openContextMenu;
    private rotateLeftButtonClick;
    private onToolbarRightButtonClick;
    private onToolbarLeftButtonClick;
    private onToolbarCopyButtonClick;
    private onToolbarDeleteButtonClick;
    private updateTempRotationDetail;
    private organizeWindowFocus;
    private getRotatedAngle;
    private getRotation;
    private updateRotationDetailCollection;
    private updatePageSize;
    private onSaveClicked;
    private blobToByteArray;
    private blobToBase64;
    /**
     * @param {boolean} isShow - specifies the isShow boolean.
     * @returns {void}
     * @private
     */
    showOrganizeLoadingIndicator(isShow: boolean): void;
    private updateOrganizePageDetailsInViewer;
    private getNextSubIndex;
    /**
     * @private
     * @returns {void}
     */
    undo: () => void;
    /**
     * @private
     * @returns {void}
     */
    redo: () => void;
    private removePage;
    private rotateImages;
    private rotateImage;
    private updatePageDetail;
    private insertRightButtonClick;
    private insertLeftButtonClick;
    private copyButtonClick;
    private deleteButtonClick;
    private deletePageElement;
    private deleteTempPage;
    private undoDeletedPage;
    private insertRemovedPages;
    private clonedCollection;
    private updateTotalPageCount;
    private updatePageNumber;
    private insertTempPage;
    private copyPage;
    private importPage;
    private organizeWireEvent;
    private organizeUnWireEvent;
    private importDocument;
    /**
     * @param {string} documentData - specifies the documentData.
     * @param {string} password - specifies the password.
     * @param {boolean} isPasswordCorrect - specifies the isPasswordCorrect.
     * @returns {void}
     * @private
     */
    loadImportDoc(documentData: string, password: string, isPasswordCorrect: boolean): void;
    private importDocuments;
    private updateOrganizePageCollection;
    /**
     *
     * @param {any} pageCanvas - It describes about the page canvas
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    applyElementStyles(pageCanvas: any, pageNumber: number): void;
    private onSaveasClicked;
    /**
     *
     * Rotates all pages in the PDF Viewer by the specified angle.
     *
     * @param {PdfPageRotateAngle} pageRotateAngle - The angle by which to rotate the pages (PdfPageRotateAngle).
     *                          The rotation can be 0, 90, 180, or 270 degrees.
     * @returns {void}
     * @private
     */
    rotateAllPages(pageRotateAngle: PdfPageRotateAngle): void;
    /**
     * Rotates the specified pages in the PDF Viewer by the specified angle.
     *
     * @param {number} pageIndexes - The array of page indexes to rotate.
     * @param {PdfPageRotateAngle} pageRotateAngle - The angle by which to rotate the pages (PdfPageRotateAngle).
     *                          The rotation can be 0, 90, 180, or 270 degrees.
     * @returns {void}
     * @private
     */
    rotatePages(pageIndexes: number[], pageRotateAngle: PdfPageRotateAngle): void;
    /**
     * @private
     * @returns {void}
     */
    rotatePages(pageStartIndex: number, pageEndIndex: number, pageRotateAngle: PdfPageRotateAngle): void;
    /**
     * @private
     * @returns {void}
     */
    rotatePages(pageRotations: PageRotation[]): void;
    private processRotation;
    private generateRange;
    private pdfRotateAngle;
    private createTooltip;
    /**
     * Rotates the specified pages clockwise by 90 degrees.
     *
     * @param {number} pageNumbers - Array of page numbers to rotate.
     * @private
     * @returns {void}
     */
    rotateClockwise(pageNumbers: number[]): void;
    /**
     * Rotates the specified pages counterclockwise by 90 degrees.
     *
     * @param {number} pageNumbers - Array of page numbers to rotate.
     * @private
     * @returns {void}
     */
    rotateCounterclockwise(pageNumbers: number[]): void;
    /**
     * Opens the page organizer dialog within the Pdf Viewer, allowing for management of PDF pages.
     *
     * ```html
     * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
     * ```
     * ```ts
     * let viewer: PdfViewer = new PdfViewer();
     * viewer.appendTo("#pdfViewer");
     * viewer.documentLoad = () => {
     *      viewer.pageOrganizer.openPageOrganizer();
     * }
     * ```
     *
     * @returns {void}
     */
    openPageOrganizer(): void;
    /**
     * Closes the currently open page organizer dialog within the PDF Viewer, if present.
     *
     * ```html
     * <div id="pdfViewer" style="height: 100%;width: 100%;"></div>
     * ```
     * ```ts
     * let viewer: PdfViewer = new PdfViewer();
     * viewer.appendTo("#pdfViewer");
     * viewer.documentLoad = () => {
     *      viewer.pageOrganizer.closePageOrganizer();
     * }
     * ```
     *
     * @returns {void}
     */
    closePageOrganizer(): void;
    /**
     * @private
     * @returns {void}
     */
    switchPageOrganizer(): void;
    /**
     * @private
     * @returns {void}
     */
    getModuleName(): string;
    private destroyDialogWindow;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): boolean;
}
/**
 * Enum for PdfPageRotateAngle
 */
export declare enum PdfPageRotateAngle {
    RotateAngle0 = 1,
    RotateAngle90 = 2,
    RotateAngle180 = 3,
    RotateAngle270 = 4,
    RotateAngle360 = 1
}
export declare class PageRotation {
    pageIndex: number;
    rotationAngle: PdfPageRotateAngle;
    constructor(pageIndex: number, rotationAngle: PdfPageRotateAngle);
}
/**
 * Interface representing details about a page, including rotation angle and page index.
 *
 * @hidden
 */
export interface PageDetails {
    rotateAngle: number;
    pageIndex: number;
}
/**
 * Interface representing details about organizing pages, including page ID, current page index, rotate angle, and status of insertion and deletion.
 */
export declare class OrganizeDetails {
    currentPageIndex: number;
    pageIndex: number;
    copiedPageIndex: number;
    isInserted: boolean;
    isDeleted: boolean;
    isCopied: boolean;
    istargetCopied: boolean;
    hasEmptyPageAfter: boolean;
    hasEmptyPageBefore: boolean;
    rotateAngle: number;
    pageSize: ISize;
    isImportedDoc: boolean;
    documentName: string;
    password: string;
    documentData: string;
    constructor(currentPageIndex: number, pageIndex: number, copiedPageIndex: number, isInserted: boolean, isDeleted: boolean, isCopied: boolean, istargetCopied: boolean, hasEmptyPageAfter: boolean, hasEmptyPageBefore: boolean, rotateAngle: number, pageSize: ISize, isImportedDoc: boolean, documentName: string, password: string, documentData: string);
}
export {};
