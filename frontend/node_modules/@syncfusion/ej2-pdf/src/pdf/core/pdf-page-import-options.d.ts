import { PdfRotationAngle } from './enumerator';
/**
 * `PdfPageImportOptions` class represents to customize the support of import PDF pages
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data);
 * // Options to customize the support of import PDF pages.
 * let options: PdfPageImportOptions = new PdfPageImportOptions();
 * // Sets the target page index to import
 * options.targetIndex = 1;
 * // Sets the rotation angle of the page to import
 * options.rotation = PdfRotationAngle.angle180;
 * // Sets the boolean value indicating whether the optimize resources while import pages or not
 * options.optimizeResources = true;
 * // Copy the first page and add it as second page with page rotation
 * document.importPage(0, options);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfPageImportOptions {
    _targetIndex: number;
    _rotation: PdfRotationAngle;
    _optimizeResources: boolean;
    _groupFormFields: boolean;
    /**
     * Gets the target page index to import
     *
     * @returns {PdfRotationAngle} Page rotation angle.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Options to customize the support of import PDF pages.
     * let options: PdfPageImportOptions = new PdfPageImportOptions();
     * // Gets the target page index to import
     * let targetIndex: number = options.targetIndex;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the target page index to import
    *
    * @param {number} value Target page index to import.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Options to customize the support of import PDF pages.
    * let options: PdfPageImportOptions = new PdfPageImportOptions();
    * // Sets the target page index to import
    * options.targetIndex = 1;
    * // Copy the first page and add it as second page with page rotation
    * document.importPage(0, options);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    targetIndex: number;
    /**
     * Gets the rotation angle of the page to import
     *
     * @returns {PdfRotationAngle} Page rotation angle.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Options to customize the support of import PDF pages.
     * let options: PdfPageImportOptions = new PdfPageImportOptions();
     * // Gets the rotation angle of the page to import
     * let rotation: PdfRotationAngle = options.rotation;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the rotation angle of the page to import
    *
    * @param {PdfRotationAngle} value Page rotation angle.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Options to customize the support of import PDF pages.
    * let options: PdfPageImportOptions = new PdfPageImportOptions();
    * // Sets the rotation angle of the page to import
    * options.rotation = PdfRotationAngle.angle270;
    * // Copy the first page and add it as second page with page rotation
    * document.importPage(0, options);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    rotation: PdfRotationAngle;
    /**
     * Gets the boolean value indicating whether the optimize resources while import pages or not
     *
     * @returns {boolean} Indicates resource optimization.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Options to customize the support of import PDF pages.
     * let options: PdfPageImportOptions = new PdfPageImportOptions();
     * // Gets the boolean value indicating whether the optimize resources while import pages or not
     * let resource: optimizeResources = options.optimizeResources;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean value indicating whether the optimize resources while import pages or not
    *
    * @param {boolean} value Indicates resource optimization.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Options to customize the support of import PDF pages.
    * let options: PdfPageImportOptions = new PdfPageImportOptions();
    * // Sets the boolean value indicating whether the optimize resources while import pages or not
    * options.optimizeResources = true;
    * // Copy the first page and add it as second page with page rotation
    * document.importPage(0, options);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    optimizeResources: boolean;
    /**
     * Gets the boolean value indicating whether the form fields are grouped or not while importing pages.
     *
     * @returns {boolean} value Indicates form fields grouping.
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data);
     * // Options to customize the support of import PDF pages.
     * let options: PdfPageImportOptions = new PdfPageImportOptions();
     * // Gets the boolean value indicating whether the form fields are grouped or not while importing pages.
     * let groupFormfields: number = options.groupFormFields;
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the boolean value indicating whether the form fields are grouped or not while importing pages.
    *
    * @param {boolean} value Indicates form fields grouping
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data);
    * // Options to customize the support of import PDF pages.
    * let options: PdfPageImportOptions = new PdfPageImportOptions();
    * // Sets the boolean value indicating whether the form fields are grouped or not while importing pages.
    * options.groupFormFields = true;
    * // Copy the first page and add it as second page.
    * document.importPage(0, options);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    groupFormFields: boolean;
}
