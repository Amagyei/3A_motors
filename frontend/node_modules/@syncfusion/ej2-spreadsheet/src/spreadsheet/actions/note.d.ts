import { Spreadsheet } from '../index';
/**
 * `Note` module
 */
export declare class SpreadsheetNote {
    private parent;
    /** @hidden */
    isNoteVisible: boolean;
    /** @hidden */
    isShowNote: boolean;
    /** @hidden */
    isNoteVisibleOnTouch: boolean;
    /** @hidden */
    noteCellIndexes: number[];
    /**
     * Constructor for Note module.
     *
     * @param {Spreadsheet} parent - Constructor for Note module.
     */
    constructor(parent: Spreadsheet);
    /**
     * To destroy the Note module.
     *
     * @returns {void} - To destroy the Note module.
     */
    protected destroy(): void;
    private addEventListener;
    private removeEventListener;
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    protected getModuleName(): string;
    private addNote;
    private deleteNote;
    private editNote;
    private createNoteIndicator;
    private mouseOver;
    private mouseOut;
    private createNoteContainer;
    private getNoteFocus;
    private createContainer;
    private createConnectorLine;
    private showNote;
    private removeNoteContainer;
    private updateNoteContainer;
}
