import { addNote, editNote, deleteNote, showNote, removeNoteContainer, createNoteIndicator, updateNoteContainer, completeAction, setActionData } from '../common/index';
import { isNullOrUndefined, EventHandler, closest, detach } from '@syncfusion/ej2-base';
import { getCellIndexes, getRangeAddress } from '../../workbook/common/address';
import { getCell, updateCell, getSheetName, getRowHeight } from '../../workbook/index';
/**
 * `Note` module
 */
var SpreadsheetNote = /** @class */ (function () {
    /**
     * Constructor for Note module.
     *
     * @param {Spreadsheet} parent - Constructor for Note module.
     */
    function SpreadsheetNote(parent) {
        /** @hidden */
        this.isNoteVisible = false;
        /** @hidden */
        this.isNoteVisibleOnTouch = false;
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the Note module.
     *
     * @returns {void} - To destroy the Note module.
     */
    SpreadsheetNote.prototype.destroy = function () {
        this.removeEventListener();
        if (!this.parent.isDestroyed && !this.parent.refreshing) {
            var noteIndicators = this.parent.element.getElementsByClassName('e-addNoteIndicator');
            while (noteIndicators.length) {
                var cellEle = closest(noteIndicators[0], '.e-cell');
                if (cellEle) {
                    EventHandler.remove(cellEle, 'mouseover', this.mouseOver);
                    EventHandler.remove(cellEle, 'mouseout', this.mouseOut);
                }
                detach(noteIndicators[0]);
            }
        }
        this.parent = null;
        this.isNoteVisible = null;
    };
    SpreadsheetNote.prototype.addEventListener = function () {
        this.parent.on(addNote, this.addNote, this);
        this.parent.on(editNote, this.editNote, this);
        this.parent.on(deleteNote, this.deleteNote, this);
        this.parent.on(createNoteIndicator, this.createNoteIndicator, this);
        this.parent.on(showNote, this.showNote, this);
        this.parent.on(removeNoteContainer, this.removeNoteContainer, this);
        this.parent.on(updateNoteContainer, this.updateNoteContainer, this);
    };
    SpreadsheetNote.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(addNote, this.addNote);
            this.parent.off(editNote, this.editNote);
            this.parent.off(showNote, this.showNote);
            this.parent.off(deleteNote, this.deleteNote);
            this.parent.off(createNoteIndicator, this.createNoteIndicator);
            this.parent.off(removeNoteContainer, this.removeNoteContainer);
            this.parent.off(updateNoteContainer, this.updateNoteContainer);
        }
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    SpreadsheetNote.prototype.getModuleName = function () {
        return 'spreadsheetNote';
    };
    SpreadsheetNote.prototype.addNote = function () {
        var cellIndexes = !isNullOrUndefined(this.noteCellIndexes) ?
            this.noteCellIndexes : getCellIndexes(this.parent.getActiveSheet().activeCell);
        var targetElement = this.parent.getCell(cellIndexes[0], cellIndexes[1]);
        if (!isNullOrUndefined(targetElement) && ((targetElement.children.length === 0) || (targetElement.children.length > 0 && targetElement.children[targetElement.childElementCount - 1].className.indexOf('e-addNoteIndicator') === -1))) {
            this.createNoteIndicator({ targetElement: targetElement, rowIndex: cellIndexes[0], columnIndex: cellIndexes[1] });
            this.createNoteContainer(targetElement, cellIndexes[0], cellIndexes[1], false, true);
        }
    };
    SpreadsheetNote.prototype.deleteNote = function (args) {
        var cellIndexes = getCellIndexes(this.parent.getActiveSheet().activeCell);
        var rowIndex = !isNullOrUndefined(args) && !isNullOrUndefined(args.rowIndex) ? args.rowIndex : cellIndexes[0];
        var columnIndex = !isNullOrUndefined(args) && !isNullOrUndefined(args.columnIndex) ? args.columnIndex : cellIndexes[1];
        var targetElement = this.parent.getCell(rowIndex, columnIndex);
        if (targetElement.children.length > 0 && targetElement.children[targetElement.children.length - 1].className.indexOf('e-addNoteIndicator') > -1) {
            targetElement.removeChild(targetElement.children[targetElement.children.length - 1]);
            EventHandler.remove(targetElement, 'mouseover', this.mouseOver);
            EventHandler.remove(targetElement, 'mouseout', this.mouseOut);
            var address = getSheetName(this.parent, this.parent.activeSheetIndex) + '!' + this.parent.getActiveSheet().activeCell;
            var cell = getCell(rowIndex, columnIndex, this.parent.getActiveSheet());
            if (!isNullOrUndefined(args) && args.isDeleteFromMenu) {
                this.parent.notify(setActionData, { args: { action: 'beforeCellSave', eventArgs: { address: address } } });
            }
            if (!isNullOrUndefined(cell) && cell.notes) {
                delete cell.notes;
            }
            if (!isNullOrUndefined(args) && args.isDeleteFromMenu) {
                var eventArgs = { notes: cell.notes, address: address };
                this.parent.notify(completeAction, { eventArgs: eventArgs, action: 'deleteNote' });
                this.isShowNote = null;
            }
        }
    };
    SpreadsheetNote.prototype.editNote = function () {
        var cellIndexes = !isNullOrUndefined(this.noteCellIndexes) ?
            this.noteCellIndexes : getCellIndexes(this.parent.getActiveSheet().activeCell);
        this.showNote({ rowIndex: cellIndexes[0], columnIndex: cellIndexes[1], isNoteEditable: true });
        var noteContainerElement = document.getElementsByClassName('e-addNoteContainer')[0];
        updateCell(this.parent, this.parent.getActiveSheet(), { rowIdx: cellIndexes[0], colIdx: cellIndexes[1], preventEvt: true,
            cell: { isNoteEditable: true } });
        if (noteContainerElement) {
            this.getNoteFocus(noteContainerElement);
        }
    };
    SpreadsheetNote.prototype.createNoteIndicator = function (args) {
        var noteIndicator = this.parent.createElement('div', { className: 'e-addNoteIndicator', styles: 'position: absolute;top: 0;right: 0;width: 0;height: 0;border-left: 8px solid transparent;border-top: 8px solid red;cursor: pointer;' });
        if (args.targetElement.children.length > 0) {
            var rowHeight = getRowHeight(this.parent.getActiveSheet(), args.rowIndex);
            var defaultFilterButtonHeight = 20;
            for (var i = 0; i < args.targetElement.childElementCount; i++) {
                if (args.targetElement.children[i].className.indexOf('e-filter-btn') > -1) {
                    noteIndicator.style.right = (rowHeight < (defaultFilterButtonHeight + 10) ?
                        (args.targetElement.children[i].getBoundingClientRect().width <= 0 ? defaultFilterButtonHeight :
                            args.targetElement.children[i].getBoundingClientRect().width) : 0 + 2) + 'px';
                }
                if (args.targetElement.children[i].className.indexOf('e-validation-list') > -1) {
                    noteIndicator.style.right = (args.targetElement.children[i].getBoundingClientRect().width || 20) + 2 + "px";
                }
            }
        }
        if (!isNullOrUndefined(args.targetElement) && (args.targetElement.children.length === 0) || (args.targetElement.children.length > 0 && args.targetElement.children[args.targetElement.childElementCount - 1].className.indexOf('e-addNoteIndicator') === -1)) {
            if (!args.skipEvent) {
                EventHandler.add(args.targetElement, 'mouseover', this.mouseOver, [this, args.rowIndex, args.columnIndex]);
                EventHandler.add(args.targetElement, 'mouseout', this.mouseOut, this);
            }
            args.targetElement.appendChild(noteIndicator);
        }
    };
    SpreadsheetNote.prototype.mouseOver = function () {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var args = this;
        var noteModule = args[0];
        if ((noteModule.isNoteVisibleOnTouch && !isNullOrUndefined(document.getElementsByClassName('e-addNoteContainer')[0])) ||
            isNullOrUndefined(document.getElementsByClassName('e-addNoteContainer')[0])) {
            if (!isNullOrUndefined(document.getElementsByClassName('e-addNoteContainer')[0])) {
                noteModule.removeNoteContainer();
            }
            noteModule.showNote({ rowIndex: args[1], columnIndex: args[2], isNoteEditable: false });
            noteModule.isNoteVisible = true;
        }
    };
    SpreadsheetNote.prototype.mouseOut = function (e) {
        if (this.isNoteVisible && (!this.isNoteVisibleOnTouch && !isNullOrUndefined(document.getElementsByClassName('e-addNoteContainer')[0]))) {
            if (document.activeElement.className.indexOf('e-addNoteContainer') === -1 && !isNullOrUndefined(e.relatedTarget) && e.relatedTarget.className.indexOf('e-connectorLine') === -1 && e.relatedTarget.className.indexOf('e-addNoteContainer') === -1) {
                this.removeNoteContainer();
                this.isNoteVisible = false;
            }
        }
    };
    SpreadsheetNote.prototype.createNoteContainer = function (targetElement, rowIndex, columnIndex, isShowNote, isNoteEditable) {
        var sheet = this.parent.getActiveSheet();
        var cell = getCell(rowIndex, columnIndex, sheet);
        var cellRect = targetElement.getBoundingClientRect();
        var noteContainer = this.parent.createElement('textarea', { className: 'e-addNoteContainer' });
        this.createContainer(noteContainer, cell, cellRect, isShowNote);
        this.createConnectorLine(noteContainer, cellRect);
        if (isNoteEditable) {
            this.getNoteFocus(noteContainer);
        }
        EventHandler.add(noteContainer, 'mouseout', this.mouseOut, this);
        EventHandler.add(document.getElementsByClassName('e-connectorLine')[0], 'mouseout', this.mouseOut, this);
    };
    SpreadsheetNote.prototype.getNoteFocus = function (noteContainerElement) {
        noteContainerElement.selectionStart = noteContainerElement.value.length;
        noteContainerElement.focus();
    };
    SpreadsheetNote.prototype.createContainer = function (noteContainer, cell, cellRect, isShowNote) {
        var containerTop = 5;
        if (!isNullOrUndefined(document.getElementsByClassName('e-select-all-cell')[0]) && !isNullOrUndefined(document.getElementsByClassName('e-scroller')[0]) &&
            cellRect.top >= document.getElementsByClassName('e-select-all-cell')[0].getBoundingClientRect().bottom && cellRect.right >= document.getElementsByClassName('e-select-all-cell')[0].getBoundingClientRect().right &&
            cellRect.bottom <= document.getElementsByClassName('e-scroller')[0].getBoundingClientRect().top && cellRect.right <= document.getElementsByClassName('e-scroller')[0].getBoundingClientRect().width) {
            noteContainer.style.display = 'block';
            containerTop = cellRect.top === document.getElementsByClassName('e-select-all-cell')[0].getBoundingClientRect().bottom ? 0 : containerTop;
        }
        else {
            noteContainer.style.display = 'none';
        }
        var elementClientRect = this.parent.element.getBoundingClientRect();
        var elementPosition = this.parent.element.style.getPropertyValue('position');
        noteContainer.style.position = 'absolute';
        noteContainer.style.top = (cellRect.top - (elementClientRect.top - (elementPosition === 'absolute' ? 0 :
            this.parent.element.offsetTop)) - containerTop) + 'px';
        noteContainer.style.left = (cellRect.left + cellRect.width - (elementClientRect.left - (elementPosition === 'absolute' ?
            0 : this.parent.element.offsetLeft)) + 10) + 'px';
        noteContainer.style.width = '120px';
        noteContainer.style.height = '120px';
        noteContainer.style.zIndex = '5';
        noteContainer.style.color = 'black';
        noteContainer.style.backgroundColor = 'lightyellow';
        if (isShowNote && !isNullOrUndefined(cell) && !isNullOrUndefined(cell.notes)) {
            noteContainer.innerHTML = cell.notes;
        }
        else {
            noteContainer.innerHTML = '';
        }
        this.parent.element.appendChild(noteContainer);
    };
    SpreadsheetNote.prototype.createConnectorLine = function (noteContainer, cellRect) {
        var connectorLine = this.parent.createElement('canvas', { className: 'e-connectorLine', styles: 'width: 100px; position: absolute;  z-index: 1;' });
        var context = connectorLine.getContext('2d');
        var elementClientRect = this.parent.element.getBoundingClientRect();
        var elementPosition = this.parent.element.style.getPropertyValue('position');
        connectorLine.style.left = cellRect.left + cellRect.width - (elementClientRect.left - (elementPosition === 'absolute' ?
            0 : this.parent.element.offsetLeft)) + 'px';
        connectorLine.style.top = (noteContainer.getBoundingClientRect().top - (elementClientRect.top - (elementPosition === 'absolute' ?
            0 : this.parent.element.offsetTop)) - 5) + 'px';
        context.clearRect(0, 0, connectorLine.width, connectorLine.height);
        context.beginPath();
        if (noteContainer.getBoundingClientRect().top === cellRect.top) {
            context.moveTo(0, 16);
            context.lineTo(30, 15);
        }
        else {
            context.moveTo(0, 30);
            context.lineTo(30, 15);
        }
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.stroke();
        this.parent.element.appendChild(connectorLine);
        if (noteContainer.getBoundingClientRect().top > 0) {
            connectorLine.style.display = 'block';
            connectorLine.style.zIndex = '4';
        }
        else {
            connectorLine.style.display = 'none';
        }
    };
    SpreadsheetNote.prototype.showNote = function (args) {
        var targetElement = !isNullOrUndefined(this.parent.getCell(args.rowIndex, args.columnIndex)) ?
            this.parent.getCell(args.rowIndex, args.columnIndex) : args.cellElement;
        var contextMenuElement = document.getElementById(this.parent.element.id + '_contextmenu');
        var contextMenuDisplayStyle = !isNullOrUndefined(contextMenuElement) ? contextMenuElement.style.getPropertyValue('display') : 'none';
        var showNoteOverContextMenu = args.isNoteEditable ? true : contextMenuDisplayStyle !== 'block';
        if (!isNullOrUndefined(targetElement) && isNullOrUndefined(document.getElementsByClassName('e-addNoteContainer')[0]) && showNoteOverContextMenu
            && (args.isScrollWithNote || (targetElement.children !== null && targetElement.children.length > 0 && targetElement.children[targetElement.children.length - 1].classList.contains('e-addNoteIndicator')))) {
            this.createNoteContainer(targetElement, args.rowIndex, args.columnIndex, true, args.isNoteEditable);
            this.noteCellIndexes = [args.rowIndex, args.columnIndex];
        }
    };
    SpreadsheetNote.prototype.removeNoteContainer = function () {
        EventHandler.remove(document.getElementsByClassName('e-addNoteContainer')[0], 'mouseout', this.mouseOut);
        EventHandler.remove(document.getElementsByClassName('e-connectorLine')[0], 'mouseout', this.mouseOut);
        this.parent.element.removeChild(document.getElementsByClassName('e-addNoteContainer')[0]);
        this.parent.element.removeChild(document.getElementsByClassName('e-connectorLine')[0]);
        this.noteCellIndexes = null;
        this.isNoteVisible = false;
        this.isNoteVisibleOnTouch = false;
    };
    SpreadsheetNote.prototype.updateNoteContainer = function () {
        this.parent.selectionModule.isNoteActiveElement = document.activeElement.className.indexOf('e-addNoteContainer') > -1 ? true : this.parent.selectionModule.isNoteActiveElement;
        var cellIdxs = !isNullOrUndefined(this.noteCellIndexes) ?
            this.noteCellIndexes : getCellIndexes(this.parent.getActiveSheet().activeCell);
        var cell = getCell(cellIdxs[0], cellIdxs[1], this.parent.getActiveSheet());
        var noteContainer = document.getElementsByClassName('e-addNoteContainer')[0];
        if (((isNullOrUndefined(cell) || isNullOrUndefined(cell.notes)) || (cell.notes !== noteContainer.value))
            && this.parent.selectionModule.isNoteActiveElement) {
            var address = getSheetName(this.parent, this.parent.activeSheetIndex) + '!' + getRangeAddress(cellIdxs);
            this.parent.notify(setActionData, { args: { action: 'beforeCellSave', eventArgs: { address: address } } });
            var eventAction = !isNullOrUndefined(cell) && cell.notes ? 'editNote' : 'addNote';
            updateCell(this.parent, this.parent.getActiveSheet(), { rowIdx: cellIdxs[0], colIdx: cellIdxs[1], preventEvt: true,
                cell: { notes: noteContainer.value, isNoteEditable: true } });
            var eventArgs = { notes: noteContainer.value, address: address };
            this.parent.notify(completeAction, { eventArgs: eventArgs, action: eventAction });
            this.isShowNote = null;
        }
        this.isShowNote = isNullOrUndefined(this.isShowNote) ? this.parent.selectionModule.isNoteActiveElement : this.isShowNote;
        if (this.isShowNote) {
            var isScrollWithNote = !isNullOrUndefined(cell) && !isNullOrUndefined(cell.isNoteEditable) ?
                cell.isNoteEditable : false;
            this.parent.notify(removeNoteContainer, '');
            this.parent.notify(showNote, { rowIndex: cellIdxs[0], columnIndex: cellIdxs[1], isNoteEditable: true, isScrollWithNote: isScrollWithNote });
        }
        else {
            this.parent.notify(removeNoteContainer, '');
            this.isShowNote = null;
        }
    };
    return SpreadsheetNote;
}());
export { SpreadsheetNote };
