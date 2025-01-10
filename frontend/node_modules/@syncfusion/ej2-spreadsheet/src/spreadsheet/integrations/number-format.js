import { refreshCellElement, rowFillHandler, getTextSpace } from '../../workbook/common/event';
import { getTextWidth, getExcludedColumnWidth } from '../common/index';
import { activeCellMergedRange } from '../../workbook/index';
/**
 * Specifies number format.
 */
var NumberFormat = /** @class */ (function () {
    function NumberFormat(parent) {
        this.parent = parent;
        this.addEventListener();
        //Spreadsheet.Inject(WorkbookNumberFormat);
    }
    NumberFormat.prototype.refreshCellElement = function (args) {
        this.parent.refreshNode(args.td, args);
    };
    NumberFormat.prototype.getTextSpace = function (args) {
        args.width = getTextWidth(args.char, args.cell.style, this.parent.cellStyle);
    };
    NumberFormat.prototype.rowFillHandler = function (args) {
        var cellElem = args.cellEle;
        if (cellElem) {
            var repeatCharSpan = void 0;
            var endCol = args.colIdx;
            if (args.cell.colSpan > 1) {
                var mergeArgs = { range: [args.rowIdx, args.colIdx, args.rowIdx, args.colIdx] };
                this.parent.notify(activeCellMergedRange, mergeArgs);
                endCol = mergeArgs.range[3];
            }
            var cellWidth = getExcludedColumnWidth(this.parent.getActiveSheet(), args.rowIdx, args.colIdx, endCol);
            var iconSetSpan = args.iconSetSpan || cellElem.querySelector('.e-iconsetspan');
            if (iconSetSpan) {
                cellWidth -= iconSetSpan.getBoundingClientRect().width;
            }
            if (args.updateFillSize) {
                repeatCharSpan = cellElem.querySelector('.e-fill');
                if (!repeatCharSpan || !repeatCharSpan.textContent) {
                    return;
                }
                args.repeatChar = repeatCharSpan.textContent[0];
                var beforeSpan = cellElem.querySelector('.e-fill-before');
                if (beforeSpan) {
                    cellWidth -= getTextWidth(beforeSpan.textContent, args.cell.style, this.parent.cellStyle);
                }
                var textSpan = cellElem.querySelector('.e-fill-sec');
                if (textSpan) {
                    cellWidth -= getTextWidth(textSpan.textContent, args.cell.style, this.parent.cellStyle);
                }
            }
            else {
                var noteIndicator = cellElem.querySelector('.e-addNoteIndicator');
                cellElem.innerText = '';
                if (args.beforeFillText) {
                    var beforeSpan = this.parent.createElement('span', { className: 'e-fill-before', styles: "float: " + (this.parent.enableRtl ? 'right' : 'left') });
                    beforeSpan.innerText = args.beforeFillText;
                    cellElem.appendChild(beforeSpan);
                    cellWidth -= getTextWidth(args.beforeFillText, args.cell.style, this.parent.cellStyle);
                }
                repeatCharSpan = this.parent.createElement('span', { className: 'e-fill' });
                cellElem.appendChild(repeatCharSpan);
                if (args.afterFillText) {
                    var textSpan = this.parent.createElement('span', { className: 'e-fill-sec' });
                    textSpan.innerText = args.afterFillText;
                    cellElem.appendChild(textSpan);
                    cellWidth -= getTextWidth(args.afterFillText, args.cell.style, this.parent.cellStyle);
                }
                if (iconSetSpan) {
                    cellElem.insertBefore(iconSetSpan, cellElem.childNodes[0]);
                }
                if (noteIndicator) {
                    cellElem.appendChild(noteIndicator);
                }
            }
            var repeatCharWidth = getTextWidth(args.repeatChar, args.cell.style, this.parent.cellStyle);
            var repeatCount = parseInt((cellWidth / repeatCharWidth).toString(), 10);
            args.formattedText = repeatCount > 0 ? args.repeatChar.repeat(repeatCount) : '';
            repeatCharSpan.textContent = args.formattedText;
        }
    };
    /**
     * Adding event listener for number format.
     *
     * @hidden
     * @returns {void} - Adding event listener for number format.
     */
    NumberFormat.prototype.addEventListener = function () {
        this.parent.on(refreshCellElement, this.refreshCellElement, this);
        this.parent.on(rowFillHandler, this.rowFillHandler, this);
        this.parent.on(getTextSpace, this.getTextSpace, this);
    };
    /**
     * Removing event listener for number format.
     *
     * @hidden
     * @returns {void} - Removing event listener for number format.
     */
    NumberFormat.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(refreshCellElement, this.refreshCellElement);
            this.parent.off(rowFillHandler, this.rowFillHandler);
            this.parent.off(getTextSpace, this.getTextSpace);
        }
    };
    /**
     * To Remove the event listeners.
     *
     * @returns {void} - To Remove the event listeners.
     */
    NumberFormat.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the workbook import module name.
     *
     * @returns {string} - Get the workbook import module name.
     */
    NumberFormat.prototype.getModuleName = function () {
        return 'numberFormat';
    };
    return NumberFormat;
}());
export { NumberFormat };
