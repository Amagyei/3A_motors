import { Toolbar as Tool } from '@syncfusion/ej2-navigations';
import { PdfViewer, PdfViewerBase, Toolbar } from '../index';
/**
 * @hidden
 */
export declare class FormDesignerToolbar {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    primaryToolbar: Toolbar;
    toolbarElement: HTMLElement;
    private textboxItem;
    private passwordItem;
    private checkboxItem;
    private radioButtonItem;
    private dropdownItem;
    private listboxItem;
    private signatureItem;
    private deleteItem;
    private closeItem;
    /**
     * @private
     */
    toolbar: Tool;
    /**
     * @private
     */
    isToolbarHidden: boolean;
    private isTextboxBtnVisible;
    private isPasswordBtnVisible;
    private isCheckboxBtnVisible;
    private isRadiobuttonBtnVisible;
    private isDropdownBtnVisible;
    private isListboxBtnVisible;
    private isSignatureBtnVisible;
    private isDeleteBtnVisible;
    private toolbarBorderHeight;
    /**
     * @private
     */
    handWrittenSignatureItem: HTMLElement;
    constructor(viewer: PdfViewer, viewerBase: PdfViewerBase, toolbar: Toolbar);
    initializeFormDesignerToolbar(): void;
    /**
     * @private
     * @returns {void}
     */
    resetFormDesignerToolbar(): void;
    /**
     * @param {HTMLElement} element - It describes about the element value
     * @param {boolean} isInitialLoading - It describes about the isInitialLoading boolean value
     * @private
     * @returns {void}
     */
    showFormDesignerToolbar(element?: HTMLElement, isInitialLoading?: boolean): void;
    /**
     * @param {boolean} isAdjust - It describes about the isAdjust boolean value
     * @private
     * @returns {void}
     */
    adjustViewer(isAdjust: boolean): void;
    private getElementHeight;
    private updateViewerHeight;
    private resetViewerHeight;
    private getNavigationToolbarHeight;
    private updateContentContainerHeight;
    private getToolbarHeight;
    private createToolbarItems;
    private createSignContainer;
    private hoverInitialBtn;
    private getTemplate;
    private onToolbarClicked;
    private clickSignature;
    private clickInitial;
    private afterToolbarCreation;
    showHideDeleteIcon(isEnable: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    applyFormDesignerToolbarSettings(): void;
    private showTextboxTool;
    private showPasswordTool;
    private showCheckboxTool;
    private showRadioButtonTool;
    private showDropdownTool;
    private showListboxTool;
    private showDrawSignatureTool;
    private showDeleteTool;
    private showSeparator;
    private applyHideToToolbar;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private destroyDependentComponent;
}
