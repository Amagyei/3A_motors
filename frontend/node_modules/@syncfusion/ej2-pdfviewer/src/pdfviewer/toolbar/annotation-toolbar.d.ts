import { Toolbar as Tool } from '@syncfusion/ej2-navigations';
import { PdfViewer, PdfViewerBase, Toolbar } from '../index';
import { ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * @param {string} args - args
 * @param {any} buttonElement - button element
 * @param {any} colorElement - color element
 * @returns {void}
 * @hidden
 */
export declare class AnnotationToolbar {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    primaryToolbar: Toolbar;
    /**
     * @private
     */
    toolbarElement: HTMLElement;
    private highlightItem;
    private underlineItem;
    private strikethroughItem;
    private fontStyleStrikethroughItem;
    private fontStyleUnderlineItem;
    private deleteItem;
    private isSignatureIteam;
    /**
     * @private
     */
    freeTextEditItem: HTMLElement;
    /**
     * @private
     */
    colorDropDownElement: HTMLElement;
    /**
     * @private
     */
    colorDropDownElementInBlazor: HTMLElement;
    /**
     * @private
     */
    strokeDropDownElementInBlazor: HTMLElement;
    /**
     * @private
     */
    fontColorElementInBlazor: HTMLElement;
    private strokeDropDownElement;
    private thicknessElement;
    private shapeElement;
    private calibrateElement;
    private stampElement;
    private opacityDropDownElement;
    private colorDropDown;
    private opacityDropDown;
    private strokeDropDown;
    private thicknessDropDown;
    private shapeDropDown;
    private calibrateDropDown;
    private commentItem;
    private closeItem;
    private opacityIndicator;
    private thicknessIndicator;
    private HighlightElement;
    private UnderlineElement;
    private StrikethroughElement;
    private InkAnnotationElement;
    private FreeTextElement;
    /**
     * @private
     */
    toolbar: Tool;
    /**
     * @private
     */
    /**
     * @private
     */
    propertyToolbar: Tool;
    /**
     * @private
     */
    freeTextPropertyToolbar: Tool;
    /**
     * @private
     */
    stampPropertyToolbar: Tool;
    colorPalette: ColorPicker;
    private strokeColorPicker;
    private opacitySlider;
    private thicknessSlider;
    private toolbarBorderHeight;
    /**
     * @private
     */
    isToolbarHidden: boolean;
    /**
     * @private
     */
    isMobileAnnotEnabled: boolean;
    private isHighlightEnabled;
    private isMobileHighlightEnabled;
    private isUnderlineEnabled;
    private isMobileUnderlineEnabled;
    private isStrikethroughEnabled;
    private isMobileStrikethroughEnabled;
    private isHighlightBtnVisible;
    private isCommentBtnVisible;
    private isUnderlineBtnVisible;
    private isStrikethroughBtnVisible;
    private isColorToolVisible;
    private isOpacityToolVisible;
    private isDeleteAnnotationToolVisible;
    private isCurrentAnnotationOpacitySet;
    private isStampBtnVisible;
    private isShapeBtnVisible;
    private isSignatureBtnVisible;
    private isInkBtnVisible;
    private isFontFamilyToolVisible;
    private isFontSizeToolVisible;
    private isFontAlignToolVisible;
    private isFontColorToolVisible;
    private isFontStylesToolVisible;
    private isCommentPanelBtnVisible;
    private isFreeTextBtnVisible;
    private isCalibrateBtnVisible;
    private isStrokeColorToolVisible;
    private isThicknessToolVisible;
    private menuItems;
    private fontSize;
    private fontFamily;
    private stampMenu;
    private stampParentID;
    private fontColorPalette;
    private fontFamilyElement;
    private fontSizeElement;
    private fontColorElement;
    private textAlignElement;
    private textPropElement;
    private lineElement;
    private arrowElement;
    private rectangleElement;
    private circleElement;
    private polygonElement;
    private calibrateDistance;
    private calibratePerimeter;
    private calibrateArea;
    private calibrateRadius;
    private calibrateVolume;
    private alignLeftElement;
    private alignRightElement;
    private alignCenterElement;
    private alignJustifyElement;
    private boldElement;
    private italicElement;
    private alignmentToolbar;
    private propertiesToolbar;
    private fontColorDropDown;
    private textAlignDropDown;
    private textPropertiesDropDown;
    /**
     * @private
     */
    handWrittenSignatureItem: HTMLElement;
    /**
     * @private
     */
    inkAnnotationItem: HTMLElement;
    /**
     * @private
     */
    inkAnnotationSelected: boolean;
    /**
     * @private
     */
    openSignaturePopup: boolean;
    private isSavedSignatureClicked;
    private saveSignatureCount;
    private saveInitialCount;
    private shapesItem;
    private calibrateItem;
    /**
     * @private
     */
    toolbarCreated: boolean;
    /**
     * @private
     */
    isToolbarCreated: boolean;
    /**
     * @private
     */
    textMarkupToolbarElement: HTMLElement;
    /**
     * @private
     */
    shapeToolbarElement: HTMLElement;
    private stampToolbarElement;
    private calibrateToolbarElement;
    private freetextToolbarElement;
    private signatureInkToolbarElement;
    constructor(viewer: PdfViewer, viewerBase: PdfViewerBase, toolbar: Toolbar);
    /**
     * @private
     * @returns {void}
     */
    initializeAnnotationToolbar(): void;
    createMobileAnnotationToolbar(isEnable: boolean, isPath?: boolean): void;
    hideMobileAnnotationToolbar(): void;
    private FreeTextForMobile;
    /**
     * @param {string} shapeType - It describes about the shape type
     * @private
     * @returns {void}
     */
    createPropertyTools(shapeType: string): void;
    private showPropertyTool;
    private stampToolMobileForMobile;
    private shapeToolMobile;
    private calibrateToolMobile;
    private textMarkupForMobile;
    private showShapeTool;
    private signatureInkForMobile;
    private hideExistingTool;
    private applyProperiesToolSettings;
    private showImagePropertyTool;
    private showFreeTextPropertiesTool;
    private shapePropertiesTool;
    private showStampPropertiesTool;
    private showTextMarkupPropertiesTool;
    private showInkPropertiesTool;
    /**
     * @param {string} id - It describes about the id value
     * @private
     * @returns {any} - any
     */
    createAnnotationToolbarForMobile(id?: string): any[];
    /**
     * @private
     * @returns {void}
     */
    adjustMobileViewer(): void;
    /**
     * Shows /hides the toolbar in the PdfViewer
     *
     * @param {boolean} enable - If set true , its show the Toolbar
     * @returns {void}
     */
    showToolbar(enable: boolean): void;
    private createMobileToolbarItems;
    private goBackToToolbar;
    private createToolbarItems;
    private createSignContainer;
    private updateSignatureCount;
    private openSignature;
    private hoverSignatureDelete;
    private hoverInitialBtn;
    private hoverSignatureImage;
    private leaveSignatureDelete;
    private clickSignature;
    private clickInitial;
    private leaveSignatureImage;
    private addSignature;
    renderAddedSignature(): void;
    deleteSavedSign(event: any): void;
    private getTemplate;
    private createStampContainer;
    /**
     * @private
     * @returns {void}
     */
    createCustomStampElement(): void;
    addStampImage: (args: any) => void;
    checkStampAnnotations(): void;
    private createDropDowns;
    private mobileColorpicker;
    private opacityDropDownOpen;
    private onColorPickerCancelClick;
    private onStrokePickerCancelClick;
    private colorDropDownBeforeOpen;
    /**
     * @private
     * @returns {void}
     */
    setCurrentColorInPicker(): void;
    private colorDropDownOpen;
    private strokeDropDownBeforeOpen;
    private setCurrentStrokeColorInPicker;
    private strokeDropDownOpen;
    private popupPosition;
    private onFontColorChange;
    private onFontFamilyChange;
    private onFontSizeChange;
    private textAlignDropDownBeforeOpen;
    private textPropertiesDropDownBeforeOpen;
    private onClickTextAlignment;
    private onClickTextProperties;
    private opacityChange;
    private opacityDropDownBeforeOpen;
    private thicknessDropDownBeforeOpen;
    private thicknessDropDownOpen;
    private calculateToolbarPosition;
    private thicknessChangeInBlazor;
    private thicknessChange;
    private ShapeThickness;
    private createDropDownButton;
    private createShapeOptions;
    private createPropertyToolbarForMobile;
    private createStampToolbarItemsForMobile;
    private createShapeToolbarItemsForMobile;
    private createCalibrateToolbarItemsForMobile;
    private handleShapeTool;
    private createPropDropDownButton;
    private textAlignmentToolbarItems;
    private afterAlignmentToolbarCreation;
    private afterPropertiesToolbarCreation;
    private createDropDownListForSize;
    private createDropDownListForFamily;
    private textPropertiesToolbarItems;
    private createShapeToolbarItems;
    private createCalibrateToolbarItems;
    private onShapeToolbarClicked;
    private onCalibrateToolbarClicked;
    private onShapeDrawSelection;
    private afterCalibrateToolbarCreationForMobile;
    private afterShapeToolbarCreationForMobile;
    private afterShapeToolbarCreation;
    private afterCalibrateToolbarCreation;
    private afterMobileToolbarCreation;
    private createColorPicker;
    private onColorPickerChange;
    private onStrokePickerChange;
    /**
     * @param {HTMLElement} element - It describes about the element
     * @param {string} color - It describes about the color
     * @private
     * @returns {void}
     */
    updateColorInIcon(element: HTMLElement, color: string): void;
    /**
     * @param {string} currentOption - It describes about the current option
     * @private
     * @returns {void}
     */
    updateTextPropertySelection(currentOption: string): void;
    /**
     * @param {string} family - It describes about the family value
     * @private
     * @returns {void}
     */
    updateFontFamilyInIcon(family: string): void;
    /**
     * @param {string} align - It describes about the align
     * @private
     * @returns {void}
     */
    updateTextAlignInIcon(align: string): void;
    /**
     * @param {number} size - It describes about the size value
     * @private
     * @returns {void}
     */
    updateFontSizeInIcon(size: number): void;
    private updateOpacityIndicator;
    private updateThicknessIndicator;
    private createSlider;
    private createThicknessSlider;
    private afterToolbarCreation;
    private onToolbarClicked;
    private addInkAnnotation;
    /**
     * @private
     * @returns {void}
     */
    deselectInkAnnotation(): void;
    private drawInkAnnotation;
    resetFreeTextAnnot(): void;
    private updateInkannotationItems;
    private showSignaturepanel;
    private handleFreeTextEditor;
    private updateFontFamily;
    private updateFontFamilyIcon;
    /**
     * @param {HTMLElement} element - It describes about the element value
     * @param {boolean} isInitialLoading - It describes about the isInitialLoading boolean value
     * @private
     * @returns {void}
     */
    showAnnotationToolbar(element?: HTMLElement, isInitialLoading?: boolean, isShow?: boolean): void;
    private enablePropertiesTool;
    /**
     * @private
     * @returns {void}
     */
    applyAnnotationToolbarSettings(): void;
    /**
     * @private
     * @returns {void}
     */
    applyMobileAnnotationToolbarSettings(): void;
    private showStickyNoteToolInMobile;
    private showSeparatorInMobile;
    private showInkAnnotationTool;
    private showSeparator;
    private showHighlightTool;
    private showUnderlineTool;
    private showStrikethroughTool;
    private showShapeAnnotationTool;
    private showCalibrateAnnotationTool;
    private showFreeTextAnnotationTool;
    private showStampAnnotationTool;
    private showSignatureTool;
    private showInkTool;
    private showFontFamilyAnnotationTool;
    private showFontSizeAnnotationTool;
    private showFontAlignAnnotationTool;
    private showFontColorAnnotationTool;
    private showFontStylesAnnotationTool;
    private showColorEditTool;
    private showStrokeColorEditTool;
    private showThicknessEditTool;
    private showOpacityEditTool;
    private showAnnotationDeleteTool;
    private showCommentPanelTool;
    private applyHideToToolbar;
    /**
     * @param {boolean} isAdjust - It describes about the isAdjust boolean value
     * @private
     * @returns {void}
     */
    adjustViewer(isAdjust: boolean): void;
    private updateContentContainerHeight;
    private getToolbarHeight;
    private getNavigationToolbarHeight;
    private handleHighlight;
    private handleUnderline;
    private handleStrikethrough;
    /**
     * @private
     * @returns {void}
     */
    deselectAllItemsInBlazor(): void;
    /**
     * @private
     * @returns {void}
     */
    deselectAllItemsForMobile(): void;
    /**
     * @private
     * @returns {void}
     */
    deselectAllItems(): void;
    private updateInteractionTools;
    /**
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @param {boolean} deleteIconCicked - It describes about the delete icon clicked boolean value
     * @private
     * @returns {void}
     */
    selectAnnotationDeleteItem(isEnable: boolean, deleteIconCicked?: boolean): void;
    /**
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    enableTextMarkupAnnotationPropertiesTools(isEnable: boolean): void;
    private checkAnnotationPropertiesChange;
    /**
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    enableAnnotationPropertiesTools(isEnable: boolean): void;
    /**
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    enableSignaturePropertiesTools(isEnable: boolean): void;
    /**
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    enableStampAnnotationPropertiesTools(isEnable: boolean): void;
    /**
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    enableFreeTextAnnotationPropertiesTools(isEnable: boolean): void;
    /**
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    enableAnnotationAddTools(isEnable: boolean): void;
    /**
     * @private
     * @returns {boolean} - boolean
     */
    isAnnotationButtonsEnabled(): boolean;
    /**
     * @param {boolean} isEnable - It describes about the isEnable boolean value
     * @private
     * @returns {void}
     */
    enableCommentPanelTool(isEnable: boolean): void;
    private updateToolbarItems;
    private enableTextMarkupAddTools;
    /**
     * @private
     * @returns {void}
     */
    updateAnnnotationPropertyItems(): void;
    private getColorHexValue;
    private setColorInPicker;
    /**
     * @private
     * @returns {void}
     */
    resetToolbar(): void;
    /**
     * @private
     * @returns {void}
     */
    clearTextMarkupMode(): void;
    /**
     * @private
     * @returns {void}
     */
    clearShapeMode(): void;
    /**
     * @private
     * @returns {void}
     */
    clearMeasureMode(): void;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    private destroyComponent;
    private destroyDependentComponent;
    private getElementHeight;
    private updateViewerHeight;
    private resetViewerHeight;
    /**
     * @private
     * @returns {void}
     */
    afterAnnotationToolbarCreationInBlazor(): void;
    private addClassToToolbarInBlazor;
    private handleHighlightInBlazor;
    private handleUnderlineInBlazor;
    private handleStrikethroughInBlazor;
    private AnnotationSliderOpened;
    private DropDownOpened;
    private enableItems;
}
