import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
/**
 * The `FormFields` module is to render formfields in the PDF document.
 *
 * @hidden
 */
export declare class FormFields {
    private pdfViewer;
    private pdfViewerBase;
    private maxTabIndex;
    private minTabIndex;
    private maintainTabIndex;
    private maintanMinTabindex;
    private isSignatureField;
    /**
     * @private
     */
    paddingDifferenceValue: number;
    private indicatorPaddingValue;
    private isKeyDownCheck;
    /**
     * @private
     */
    signatureFontSizeConstent: number;
    /**
     * @private
     */
    readOnlyCollection: any;
    /**
     * @private
     */
    currentTarget: any;
    private isSignatureRendered;
    /**
     * @private
     */
    signatureFieldCollection: any;
    private data;
    private formFieldsData;
    private rotateAngle;
    private selectedIndex;
    /**
     * @private
     */
    renderedPageList: number[];
    /**
     * @param {PdfViewer} viewer - It describes about the viewer
     * @param {PdfViewerBase} base - It describes about the base
     * @private
     * @returns {void}
     */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isImportFormField - It describes about the isImportFormField
     * @private
     * @returns {void}
     */
    renderFormFields(pageIndex: number, isImportFormField: boolean): void;
    private setToolTip;
    private trim;
    private rgbaToHex;
    private getListValues;
    private createParentElement;
    /**
     * @param {number} pageIndex -  It describes about the page index
     * @private
     * @returns {number} - number
     */
    getAngle(pageIndex: number): number;
    nextField(): void;
    previousField(): void;
    private signatureFieldNavigate;
    private getSignatureIndex;
    private renderSignatureField;
    /**
     * @private
     * @returns {void}
     */
    formFieldCollections(): void;
    private retreiveFormFieldsData;
    private updateBoundsValue;
    /**
     * @param {any} formField - It describes about the form field
     * @private
     * @returns {void}
     */
    updateFormFieldsCollection(formField: any): void;
    updateFormFieldValues(formFields: any): void;
    /**
     * @param {any} currentData - It describes about the current data
     * @private
     * @returns {string} - string
     */
    retriveFieldName(currentData: any): string;
    private retriveCurrentValue;
    private getSignatureBounds;
    /**
     * @private
     * @returns {any} - any
     */
    downloadFormFieldsData(): any;
    private focusFormFields;
    private blurFormFields;
    updateFormFields(event: MouseEvent): void;
    /**
     * @param {string} signatureType - It describes about the signature type
     * @param {string} value - It describes about the value
     * @param {any} target - It describes about the target
     * @param {string} fontname - It describes about the font name
     * @param {any} signBounds - It contains a signatureBounds
     * @private
     * @returns {void}
     */
    drawSignature(signatureType?: string, value?: string, target?: any, fontname?: string, signBounds?: any): void;
    private imageOnLoad;
    private updateSignatureDataInSession;
    /**
     * @param {any} bounds - It describes about the bounds
     * @private
     * @returns {any} - any
     */
    getDefaultBoundsforSign(bounds: any): any;
    /**
     * @param {number} currentIndex - It describes about the current index
     * @param {number} rotateAngle - It describes about the rorate angle
     * @param {number} currentPage - It describes about the current page
     * @param {number} zoomvalue - It describes about the zoom value
     * @param {number} currentLeft - It describes about the current left
     * @param {number} currentTop - It describes about the current top
     * @param {number} currentWidth - It describes about the current width
     * @param {number} currentHeight - It describes about the current height
     * @param {boolean} isDraw - It describes about the isDraw
     * @private
     * @returns {any} - any
     */
    getSignBounds(currentIndex: number, rotateAngle: number, currentPage: number, zoomvalue: number, currentLeft: number, currentTop: number, currentWidth: number, currentHeight: number, isDraw?: boolean): any;
    private updateSameFieldsValue;
    private updateFormFieldsValue;
    private changeFormFields;
    /**
     * @param {any} target - It describes about the target
     * @param {any} signaturePath - It describes about the signature path
     * @param {any} signatureBounds - It describes about the signature bounds
     * @param {string} signatureFontFamily - It describes about the signature font family
     * @param {number} signatureFontSize   - It describes about the signature font size
     * @param {boolean} isUpdateSameField - It describes about the isUpdateSameField
     * @private
     * @returns {void}
     */
    updateDataInSession(target: any, signaturePath?: any, signatureBounds?: any, signatureFontFamily?: string, signatureFontSize?: number, isUpdateSameField?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    removeExistingFormFields(): void;
    private applyCommonProperties;
    /**
     * @param {any} currentData - It describes about the current data
     * @param {number} pageIndex - It describes about the page index
     * @param {number} index - It describes about the index
     * @param {any} printContainer - It describes about the print container
     * @param {number} count - It describes about the count
     * @private
     * @returns {any} - any
     */
    createFormFields(currentData: any, pageIndex: number, index?: number, printContainer?: any, count?: number): any;
    private getFormFieldType;
    private createButtonField;
    /**
     * Returns the boolean value based on the imgae source base64
     *
     * @param {string} imageSrc - Passing the image source.
     * @returns {boolean} - boolean
     */
    private isBase64;
    /**
     * Returns the boolean value based on the imgae source URL
     *
     * @param {string} imageSrc - Passing the image source.
     * @returns {boolean} - boolean
     */
    private isURL;
    private createTextBoxField;
    private checkIsReadonly;
    /**
     * @param {boolean} isReadonly - It describes about the isReadOnly value
     * @private
     * @returns {void}
     */
    formFieldsReadOnly(isReadonly: boolean): void;
    private makeformFieldsReadonly;
    private applyTabIndex;
    private checkIsRequiredField;
    private applyDefaultColor;
    private addAlignmentPropety;
    private addBorderStylePropety;
    private createRadioBoxField;
    private createDropDownField;
    private createListBoxField;
    private createSignatureField;
    private addSignaturePath;
    private getBounds;
    private getBoundsPosition;
    private applyPosition;
    private renderExistingAnnnot;
    /**
     * @param {any} bound - It describes about the bound
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isFieldRotated - It describes about the isFieldRotated
     * @private
     * @returns {any} - any
     */
    updateSignatureBounds(bound: any, pageIndex: number, isFieldRotated: boolean): any;
    resetFormFields(): void;
    /**
     * @private
     * @returns {void}
     */
    clearFormFieldStorage(): void;
    clearFormFields(formField?: any): void;
    /**
     * @param {any} number - It describes about the number
     * @private
     * @returns {number} - number
     */
    ConvertPointToPixel(number: number): number;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @private
     * @returns {string} - string
     */
    getModuleName(): string;
    /**
     * @private
     * @param {any} text - It describes about the text
     * @param {any} font - It describes about the font
     * @param {any} fontFamily - It describes about the font family
     * @returns {number} - number
     */
    getTextWidth(text: any, font: any, fontFamily: any): number;
    /**
     * @private
     * @param {number} fontSize - Font size.
     * @returns {number} - Returns the font size.
     */
    getFontSize(fontSize: number): number;
}
