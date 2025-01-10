import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import { PdfViewer, PdfViewerBase, AnnotationToolbar, CustomToolbarItemModel } from '../index';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ToolbarItem } from '../base/types';
import { FormDesignerToolbar } from './formdesigner-toolbar';
/**
 * Toolbar module
 *
 * @param {string} args - args
 * @param {Event} event - args
 * @returns {void}
 */
export declare class Toolbar {
    /**
     * @private
     */
    toolbar: tool;
    private pdfViewer;
    private pdfViewerBase;
    private currentPageBox;
    private zoomDropDown;
    private currentPageBoxElement;
    /**
     * @private
     */
    uploadedFile: string | Uint8Array;
    /**
     * @private
     */
    uploadedDocumentName: string;
    /**
     * @private
     */
    toolbarElement: HTMLElement;
    private itemsContainer;
    private openDocumentItem;
    private firstPageItem;
    private previousPageItem;
    private nextPageItem;
    private lastPageItem;
    private zoomInItem;
    private zoomOutItem;
    private totalPageItem;
    private downloadItem;
    private zoomDropdownItem;
    /**
     * @private
     */
    submitItem: HTMLElement;
    private fileInputElement;
    private textSelectItem;
    private panItem;
    private printItem;
    private textSearchItem;
    private undoItem;
    private redoItem;
    private commentItem;
    /**
     * @private
     */
    annotationItem: HTMLElement;
    /**
     * @private
     */
    formDesignerItem: HTMLElement;
    private moreOptionItem;
    private organizePageItem;
    /**
     * @private
     */
    annotationToolbarModule: AnnotationToolbar;
    /**
     * @private
     */
    formDesignerToolbarModule: FormDesignerToolbar;
    /**
     * @private
     */
    moreDropDown: DropDownButton;
    private isPageNavigationToolDisabled;
    private isMagnificationToolDisabled;
    /**
     * @private
     */
    isSelectionToolDisabled: boolean;
    private isScrollingToolDisabled;
    private isOpenBtnVisible;
    private isNavigationToolVisible;
    private isMagnificationToolVisible;
    private isSelectionBtnVisible;
    private isScrollingBtnVisible;
    private isDownloadBtnVisible;
    private isPrintBtnVisible;
    private isSearchBtnVisible;
    /**
     * @private
     */
    isTextSearchBoxDisplayed: boolean;
    private isUndoRedoBtnsVisible;
    private isAnnotationEditBtnVisible;
    private isFormDesignerEditBtnVisible;
    private isCommentBtnVisible;
    private isSubmitbtnvisible;
    private toolItems;
    private itemsIndexArray;
    /**
     * @private
     */
    PanElement: any;
    /**
     * @private
     */
    SelectToolElement: HTMLElement;
    /**
     * @private
     */
    CommentElement: HTMLElement;
    /**
     * @param {PdfViewer} viewer - It describes about the viewer
     * @param {PdfViewerBase} viewerBase - It describes about the viewer base
     * @private
     * @returns {void}
     */
    constructor(viewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * @param {string} width - It describes about the width
     * @private
     * @returns {HTMLElement} - html element
     */
    intializeToolbar(width: string): HTMLElement;
    private bindOpenIconEvent;
    private InitializeMobileToolbarInBlazor;
    /**
     * Shows /hides the toolbar in the PdfViewer
     *
     * @param  {boolean} enableToolbar - If set true , its show the Toolbar
     * @returns {void}
     */
    showToolbar(enableToolbar: boolean): void;
    /**
     * Shows/hides the Navigation toolbar in the PdfViewer
     *
     * @param  {boolean} enableNavigationToolbar - If set true , its show the Navigation Toolbar
     * @returns {void}
     */
    showNavigationToolbar(enableNavigationToolbar: boolean): void;
    /**
     * Shows /hides the annotation toolbar in the PdfViewer
     *
     * @param  {boolean} enableAnnotationToolbar - If set true , its show the annotation Toolbar
     * @returns {void}
     */
    showAnnotationToolbar(enableAnnotationToolbar: boolean): void;
    /**
     * Shows /hides the the toolbar items in the PdfViewer
     *
     * @param  {string[]} items - Defines the toolbar items in the toolbar
     * @param  {boolean} isVisible - If set true, then its show the toolbar Items
     * @returns {void}
     */
    showToolbarItem(items: (CustomToolbarItemModel | ToolbarItem)[], isVisible: boolean): void;
    /**
     * Enables /disables the the toolbar items in the PdfViewer
     *
     * @param  {string[]} items - Defines the toolbar items in the toolbar
     * @param  {boolean} isEnable - If set true, then its Enable the toolbar Items
     * @returns {void}
     */
    enableToolbarItem(items: (CustomToolbarItemModel | ToolbarItem)[], isEnable: boolean): void;
    /**
     * @param {any} restrictionSummary - It describes about the restriction summary
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    DisableToolbarItems(restrictionSummary: any, isEnable: boolean): void;
    private showOpenOption;
    private showPageNavigationTool;
    private showMagnificationTool;
    private showSelectionTool;
    private showScrollingTool;
    private showDownloadOption;
    private showPageOrganizerToolbar;
    private showPrintOption;
    private showSearchOption;
    private showUndoRedoTool;
    private showCommentOption;
    private showAnnotationEditTool;
    private showFormDesignerEditTool;
    private showSubmitForm;
    private enableOpenOption;
    private enablePageNavigationTool;
    private enableMagnificationTool;
    private enableSelectionTool;
    private enableScrollingTool;
    private enableDownloadOption;
    private enablePrintOption;
    private enableSearchOption;
    private enableUndoRedoTool;
    private enableAnnotationEditTool;
    private enableFormDesignerEditTool;
    private enableCommentsTool;
    private enableOrganizePagesButton;
    /**
     * @private
     * @returns {void}
     */
    resetToolbar(): void;
    /**
     * @private
     * @returns {void}
     */
    updateToolbarItems(): void;
    /**
     * @private
     * @returns {void}
     */
    updateNavigationButtons(): void;
    /**
     * @private
     * @returns {void}
     */
    updateZoomButtons(): void;
    /**
     * @private
     * @returns {void}
     */
    updateUndoRedoButtons(): void;
    private enableCollectionAvailable;
    private enableCollectionAvailableInBlazor;
    private disableUndoRedoButtons;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private destroyComponent;
    private destroyDependentComponent;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    updateCurrentPage(pageIndex: number): void;
    /**
     * @private
     * @returns {void}
     */
    updateTotalPage(): void;
    /**
     * @param {event} event - It describes about the event
     * @private
     * @returns {void}
     */
    openFileDialogBox(event: Event): void;
    private createToolbar;
    /**
     * Create a custom toolbar item in the PdfViewer
     *
     * @param  {number} startIndex - It describes about the start index
     * @returns {void}
     */
    private createCustomItem;
    private createToolbarItems;
    private afterToolbarCreationInMobile;
    private afterToolbarCreation;
    /**
     * @param {string} idString - It describes about the idString value
     * @param {string} className - It describes about the class name
     * @param {string} tooltipText - It describes about the tooltip text
     * @private
     * @returns {HTMLElement} - html element
     */
    addClassToolbarItem(idString: string, className: string, tooltipText: string): HTMLElement;
    private addPropertiesToolItemContainer;
    private createZoomDropdownElement;
    private createZoomDropdown;
    private createCurrentPageInputTemplate;
    private createTotalPageTemplate;
    private createNumericTextBox;
    private onToolbarKeydown;
    private createToolbarItemsForMobile;
    private createMoreOption;
    private createToolbarItem;
    /**
     * @param {HTMLElement} toolbarItem - It describes about the toolbar item
     * @param {string} tooltipText - It describes about the tooltip text
     * @private
     * @returns {void}
     */
    createTooltip(toolbarItem: HTMLElement, tooltipText: string): void;
    private onTooltipBeforeOpen;
    private createFileElement;
    private wireEvent;
    private unWireEvent;
    /**
     * @param {number} viewerWidth - It describes about the viewer width
     * @private
     * @returns {void}
     */
    onToolbarResize(viewerWidth: number): void;
    private toolbarOnMouseup;
    private applyHideToToolbar;
    private toolbarClickHandler;
    private handleOpenIconClick;
    private handleToolbarBtnClick;
    addInkAnnotation(): void;
    deSelectCommentAnnotation(): void;
    /**
     * @param {any} targetElement - It describes about the target element
     * @private
     * @returns {void}
     */
    addComments(targetElement: any): void;
    openZoomDropdown(): void;
    private loadDocument;
    private navigateToPage;
    private textBoxFocusOut;
    private onZoomDropDownInput;
    private onZoomDropDownInputClick;
    private zoomPercentSelect;
    private zoomDropDownChange;
    /**
     * @param {number} zoomFactor - It describes about the zoom factor
     * @private
     * @returns {void}
     */
    updateZoomPercentage(zoomFactor: number): void;
    private updateInteractionItems;
    /**
     * @param {boolean} iskeyboardClick - It describes about the iskeyboardclick boolean value
     * @private
     * @returns {void}
     */
    textSearchButtonHandler(iskeyboardClick?: boolean): void;
    /**
     * @param {string} id - It describes about the id value
     * @param {boolean} isKeyBoardEvent - It describes about the whether isKeyBoardEvent true or not
     * @private
     * @returns {void}
     */
    initiateAnnotationMode(id?: string, isKeyBoardEvent?: boolean): void;
    private initiateFormDesignerMode;
    /**
     * @private
     * @returns {void}
     */
    DisableInteractionTools(): void;
    /**
     * @param {HTMLElement} element - It describes about the element value
     * @private
     * @returns {void}
     */
    selectItem(element: HTMLElement): void;
    /**
     * @param {HTMLElement} element - It describes about the element value
     * @private
     * @returns {void}
     */
    deSelectItem(element: HTMLElement): void;
    /**
     * @param {boolean} isTextSelect - It describes about the isTextSelect boolean value
     * @private
     * @returns {void}
     */
    updateInteractionTools(isTextSelect: boolean): void;
    private initialEnableItems;
    private showSeparator;
    /**
     * @private
     * @returns {void}
     */
    applyToolbarSettings(): void;
    /**
     * @private
     * @returns {void}
     */
    applyToolbarSettingsForMobile(): void;
    private getStampMode;
    private stampBeforeOpen;
    private stampBeforeClose;
    /**
     * @private
     * @returns {void}
     */
    updateStampItems(): void;
    private stampSelect;
    private enableItems;
    /**
     * @private
     * @returns {string} - string
     */
    getModuleName(): string;
}
