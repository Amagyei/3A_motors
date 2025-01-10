var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { LineTool, PolygonDrawingTool } from '../drawing/tools';
import { findObjectsUnderMouse } from '../drawing/action';
/**
 * The `LinkAnnotation` module is used to handle link annotation actions of PDF viewer.
 *
 * @hidden
 */
var LinkAnnotation = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer -It describes about the PdfViewer
     * @param {PdfViewerBase} viewerBase - It describes about the viewerbase
     * @private
     */
    function LinkAnnotation(pdfViewer, viewerBase) {
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = viewerBase;
    }
    /**
     * @param {any} data - It describes about the data
     * @param {number} pageIndex - It describes about the number
     * @private
     * @returns {void}
     */
    LinkAnnotation.prototype.renderHyperlinkContent = function (data, pageIndex) {
        if (this.pdfViewer.enableHyperlink) {
            var hyperlinks = data.hyperlinks;
            var hyperlinksBounds = data.hyperlinkBounds;
            this.linkAnnotation = data.linkAnnotation;
            this.linkPage = data.linkPage;
            this.annotationY = data.annotationLocation;
            if (hyperlinks && hyperlinks.length > 0 && hyperlinksBounds.length > 0) {
                this.renderWebLink(hyperlinks, hyperlinksBounds, pageIndex);
            }
            if (this.linkAnnotation && this.linkAnnotation.length > 0 && this.linkPage.length > 0) {
                this.renderDocumentLink(this.linkAnnotation, this.linkPage, this.annotationY, pageIndex);
            }
        }
    };
    /**
     * @param {HTMLElement} eventTarget - It describes about the event target
     * @param {MouseEvent} evt - It describes about the event
     * @param {any} element - It describes about the element
     * @private
     * @returns {void}
     */
    LinkAnnotation.prototype.disableHyperlinkNavigationUnderObjects = function (eventTarget, evt, element) {
        var objects = findObjectsUnderMouse(element, element.pdfViewer, evt);
        if (objects.length > 0) {
            if (evt.target.classList.contains('e-pv-hyperlink')) {
                eventTarget.style.cursor = 'move';
                eventTarget.style.pointerEvents = 'none';
                eventTarget.title = '';
            }
        }
        else {
            var hyperlinkObjects = document.getElementsByClassName('e-pv-hyperlink');
            if (hyperlinkObjects && hyperlinkObjects.length > 0) {
                for (var i = 0; i < hyperlinkObjects.length; i++) {
                    if (hyperlinkObjects[parseInt(i.toString(), 10)].style.pointerEvents === 'none') {
                        hyperlinkObjects[parseInt(i.toString(), 10)].style.pointerEvents = 'all';
                    }
                    if (!hyperlinkObjects[parseInt(i.toString(), 10)].title) {
                        hyperlinkObjects[parseInt(i.toString(), 10)].title = hyperlinkObjects[parseInt(i.toString(), 10)].href;
                    }
                }
            }
        }
    };
    LinkAnnotation.prototype.renderWebLink = function (hyperlinks, hyperlinksBounds, pageIndex) {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        var isHyperlinkClicked = false;
        var _loop_1 = function (i) {
            var aTag = createElement('a', { id: 'weblinkdiv_' + i + '_' + pageIndex });
            var rect = hyperlinksBounds[parseInt(i.toString(), 10)];
            aTag = this_1.setHyperlinkProperties(aTag, rect, pageIndex);
            aTag.title = hyperlinks[parseInt(i.toString(), 10)];
            if (hyperlinks[parseInt(i.toString(), 10)] && hyperlinks[parseInt(i.toString(), 10)].split('http').length === 1) {
                var hyperlinkText = 'http://' + hyperlinks[parseInt(i.toString(), 10)];
                aTag.setAttribute('href', hyperlinkText);
            }
            else {
                aTag.setAttribute('href', hyperlinks[parseInt(i.toString(), 10)]);
            }
            if (this_1.pdfViewer.hyperlinkOpenState === 'CurrentTab') {
                aTag.target = '_self';
                aTag.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var isCancel;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!isHyperlinkClicked) return [3 /*break*/, 4];
                                e.preventDefault();
                                if (!(proxy.pdfViewerBase.tool instanceof LineTool || proxy.pdfViewerBase.tool instanceof PolygonDrawingTool)) return [3 /*break*/, 1];
                                return [2 /*return*/, false];
                            case 1: return [4 /*yield*/, proxy.pdfViewer.fireHyperlinkClick(hyperlinks[parseInt(i.toString(), 10)], aTag)];
                            case 2:
                                isCancel = _a.sent();
                                if (isCancel && this.pdfViewer.selectedItems.annotations.length === 0 &&
                                    this.pdfViewer.selectedItems.formFields.length === 0) {
                                    isHyperlinkClicked = true;
                                    aTag.click();
                                }
                                return [2 /*return*/, isCancel];
                            case 3: return [3 /*break*/, 5];
                            case 4:
                                isHyperlinkClicked = false;
                                return [2 /*return*/, true];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                aTag.onmouseover = function () {
                    proxy.triggerHyperlinkEvent(aTag);
                };
            }
            else if (this_1.pdfViewer.hyperlinkOpenState === 'NewTab') {
                aTag.target = '_blank';
                aTag.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var isCancel;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!isHyperlinkClicked) return [3 /*break*/, 4];
                                e.preventDefault();
                                if (!(proxy.pdfViewerBase.tool instanceof LineTool || proxy.pdfViewerBase.tool instanceof PolygonDrawingTool)) return [3 /*break*/, 1];
                                return [2 /*return*/, false];
                            case 1: return [4 /*yield*/, proxy.pdfViewer.fireHyperlinkClick(hyperlinks[parseInt(i.toString(), 10)], aTag)];
                            case 2:
                                isCancel = _a.sent();
                                if (isCancel && this.pdfViewer.selectedItems.annotations.length === 0 &&
                                    this.pdfViewer.selectedItems.formFields.length === 0) {
                                    isHyperlinkClicked = true;
                                    aTag.click();
                                }
                                return [2 /*return*/, isCancel];
                            case 3: return [3 /*break*/, 5];
                            case 4:
                                isHyperlinkClicked = false;
                                return [2 /*return*/, true];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                aTag.onmouseover = function () {
                    proxy.triggerHyperlinkEvent(aTag);
                };
            }
            else if (this_1.pdfViewer.hyperlinkOpenState === 'NewWindow') {
                aTag.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var isCancel;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                e.preventDefault();
                                if (!(proxy.pdfViewerBase.tool instanceof LineTool || proxy.pdfViewerBase.tool instanceof PolygonDrawingTool)) return [3 /*break*/, 1];
                                return [2 /*return*/, false];
                            case 1: return [4 /*yield*/, proxy.pdfViewer.fireHyperlinkClick(hyperlinks[parseInt(i.toString(), 10)], aTag)];
                            case 2:
                                isCancel = _a.sent();
                                if (isCancel && this.pdfViewer.selectedItems.annotations.length === 0 &&
                                    this.pdfViewer.selectedItems.formFields.length === 0) {
                                    window.open(aTag.href, '_blank', 'scrollbars=yes,resizable=yes');
                                }
                                return [2 /*return*/, false];
                        }
                    });
                }); };
                aTag.onmouseover = function () {
                    proxy.triggerHyperlinkEvent(aTag);
                };
            }
            var pageDiv = document.getElementById(this_1.pdfViewer.element.id + '_pageDiv_' + pageIndex);
            if (!isNullOrUndefined(pageDiv)) {
                pageDiv.appendChild(aTag);
            }
        };
        var this_1 = this;
        for (var i = 0; i < hyperlinks.length; i++) {
            _loop_1(i);
        }
    };
    LinkAnnotation.prototype.triggerHyperlinkEvent = function (aTag) {
        if (this.pdfViewerBase.tool instanceof LineTool || this.pdfViewerBase.tool instanceof PolygonDrawingTool) {
            return false;
        }
        else {
            this.pdfViewer.fireHyperlinkHover(aTag);
            return true;
        }
    };
    LinkAnnotation.prototype.renderDocumentLink = function (linkAnnotation, linkPage, annotationY, pageIndex) {
        var _this = this;
        // eslint-disable-next-line
        var proxy = this;
        var _loop_2 = function (i) {
            var aTag = createElement('a', { id: 'linkdiv_' + i + '_' + pageIndex });
            var rect = linkAnnotation[parseInt(i.toString(), 10)];
            aTag = this_2.setHyperlinkProperties(aTag, rect, pageIndex);
            aTag.setAttribute('href', 'javascript:void(0)');
            var linkPageNum = linkPage[parseInt(i.toString(), 10)];
            if (linkPageNum !== undefined && linkPageNum >= 0) {
                var destPageHeight_1 = (this_2.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height);
                var destLocation_1;
                var scrollValue_1;
                var pageSize = this_2.pdfViewerBase.pageSize[parseInt(linkPageNum.toString(), 10)];
                if (pageSize) {
                    if (annotationY.length !== 0) {
                        destLocation_1 = (annotationY[parseInt(i.toString(), 10)]);
                        scrollValue_1 = pageSize.top * this_2.pdfViewerBase.getZoomFactor() +
                            ((destPageHeight_1 - destLocation_1) * this_2.pdfViewerBase.getZoomFactor());
                    }
                    else {
                        scrollValue_1 = pageSize.top * this_2.pdfViewerBase.getZoomFactor();
                    }
                }
                if (scrollValue_1 !== undefined) {
                    aTag.name = scrollValue_1.toString();
                    aTag.setAttribute('aria-label', scrollValue_1.toString());
                }
                else if ((isNullOrUndefined(pageSize) && linkPageNum > this_2.pdfViewerBase.pageSize.length)) {
                    aTag.dataset.annotationY = JSON.stringify(annotationY);
                    aTag.dataset.pageIndex = JSON.stringify(linkPageNum);
                    aTag.dataset.index = JSON.stringify(i);
                }
                aTag.onclick = function () {
                    if (proxy.pdfViewerBase.tool instanceof LineTool || proxy.pdfViewerBase.tool instanceof PolygonDrawingTool) {
                        return false;
                    }
                    else {
                        if (!aTag.name) {
                            if (aTag.dataset.pageIndex) {
                                var pageSize_1 = proxy.pdfViewerBase.pageSize[JSON.parse(aTag.dataset.pageIndex)];
                                var annotationVal = JSON.parse(aTag.dataset.annotationY);
                                var index = JSON.parse(aTag.dataset.index);
                                var zoomFactor = _this.pdfViewerBase.getZoomFactor();
                                if (annotationVal && annotationVal.length > 0) {
                                    destLocation_1 = (annotationY[parseInt(index.toString(), 10)]);
                                    scrollValue_1 = pageSize_1.top * zoomFactor +
                                        ((destPageHeight_1 - destLocation_1) * zoomFactor);
                                }
                                else {
                                    scrollValue_1 = pageSize_1.top * zoomFactor;
                                }
                            }
                            aTag.name = scrollValue_1.toString();
                            aTag.setAttribute('aria-label', scrollValue_1.toString());
                        }
                        proxy.pdfViewerBase.viewerContainer.scrollTop = parseInt(aTag.name, 10);
                        return false;
                    }
                };
                var pageDiv = document.getElementById(this_2.pdfViewer.element.id + '_pageDiv_' + pageIndex);
                if (!isNullOrUndefined(pageDiv)) {
                    pageDiv.appendChild(aTag);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < linkAnnotation.length; i++) {
            _loop_2(i);
        }
    };
    LinkAnnotation.prototype.setHyperlinkProperties = function (aTag, rect, pageIndex) {
        aTag.className = 'e-pv-hyperlink';
        aTag.style.background = 'transparent';
        aTag.style.position = 'absolute';
        aTag.style.left = (rect.Left * this.pdfViewerBase.getZoomFactor()) + 'px';
        aTag.style.top = (rect.Top * this.pdfViewerBase.getZoomFactor()) + 'px';
        aTag.style.width = (rect.Width * this.pdfViewerBase.getZoomFactor()) + 'px';
        if (rect.Height < 0) {
            aTag.style.height = (-rect.Height * this.pdfViewerBase.getZoomFactor()) + 'px';
            aTag.style.top = ((rect.Top + rect.Height) * this.pdfViewerBase.getZoomFactor()) + 'px';
        }
        else {
            aTag.style.height = ((rect.Height < 0 ? -rect.Height : rect.Height) * this.pdfViewerBase.getZoomFactor()) + 'px';
        }
        aTag.style.color = 'transparent';
        this.pdfViewerBase.applyElementStyles(aTag, pageIndex);
        return aTag;
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isAdd - It describes about the isAdd
     * @private
     * @returns {void}
     */
    LinkAnnotation.prototype.modifyZindexForTextSelection = function (pageNumber, isAdd) {
        if (this.pdfViewerBase.pageCount > 0) {
            var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + pageNumber);
            if (pageDiv) {
                var pageChildNodes = pageDiv.childNodes;
                for (var i = 0; i < pageChildNodes.length; i++) {
                    var childElement = pageChildNodes[parseInt(i.toString(), 10)];
                    if (childElement.tagName === 'A') {
                        if (isAdd) {
                            childElement.classList.add('e-pv-onselection');
                        }
                        else {
                            childElement.classList.remove('e-pv-onselection');
                        }
                    }
                }
            }
        }
    };
    /**
     * @param {HTMLElement} element - It describes about the element
     * @param {boolean} isAdd - It describes about the isAdd
     * @private
     * @returns {void}
     */
    LinkAnnotation.prototype.modifyZindexForHyperlink = function (element, isAdd) {
        if (isAdd) {
            element.classList.add('e-pv-onselection');
        }
        else {
            element.classList.remove('e-pv-onselection');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    LinkAnnotation.prototype.destroy = function () {
        for (var i = 0; i < this.pdfViewerBase.pageCount - 1; i++) {
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + i);
            if (pageDiv) {
                var aElement = pageDiv.getElementsByTagName('a');
                if (aElement.length !== 0) {
                    for (var index = aElement.length - 1; index >= 0; index--) {
                        aElement[parseInt(index.toString(), 10)].parentNode.removeChild(aElement[parseInt(index.toString(), 10)]);
                    }
                }
            }
        }
    };
    /**
     * @private
     * @returns {string} - string
     */
    LinkAnnotation.prototype.getModuleName = function () {
        return 'LinkAnnotation';
    };
    return LinkAnnotation;
}());
export { LinkAnnotation };
