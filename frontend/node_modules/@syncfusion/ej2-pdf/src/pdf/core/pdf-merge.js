import { PdfWidgetAnnotation } from './annotations/annotation';
import { PdfPageOrientation } from './enumerator';
import { PdfFontFamily, PdfFontStyle, PdfStandardFont } from './fonts/pdf-standard-font';
import { PdfButtonField, PdfCheckBoxField, PdfComboBoxField, PdfListField, PdfRadioButtonListField, PdfSignatureField, PdfTextBoxField } from './form/field';
import { PdfPageSettings } from './pdf-document';
import { PdfNamedDestination } from './pdf-outline';
import { PdfDestination } from './pdf-page';
import { PdfPageImportOptions } from './pdf-page-import-options';
import { _PdfDictionary, _PdfName, _PdfReference } from './pdf-primitives';
import { _getItemValue } from './utils';
import { _PdfBaseStream, _PdfContentStream, _PdfStream } from './base-stream';
var _PdfMergeHelper = /** @class */ (function () {
    function _PdfMergeHelper(crossReference, destination, source, pageReference, options) {
        this._namedDestinations = []; // eslint-disable-line
        this._bookmarks = []; // eslint-disable-line
        this._fields = []; // eslint-disable-line
        this._pageReference = new Map();
        this._bookmarksPageLinkReference = new Map();
        this._destination = []; // eslint-disable-line
        this._newList = new Map();
        this._annotationLayer = new Map();
        this._isLayersPresent = false;
        this._fieldNames = [];
        this._options = new PdfPageImportOptions();
        this._kidsReference = []; // eslint-disable-line
        this._formFieldsCollection = new Map();
        this._formFields = [];
        this._isDuplicatePage = false;
        this._fieldCount = 0;
        this._crossReference = crossReference;
        this._destinationDocument = destination;
        this._sourceDocument = source;
        this._pageReference = pageReference;
        if (typeof options !== 'undefined') {
            this._options = options;
        }
        this._copier = new _PdfCopier(this._crossReference, this._sourceDocument._crossReference);
    }
    _PdfMergeHelper.prototype._importPages = function (page, index, layers, isCopiedPage, options, isSplitDocument) {
        var _this = this;
        var template;
        var newPage;
        var pageDictionary = page._pageDictionary;
        this._isDuplicatePage = isCopiedPage;
        if (!options) {
            this._options.rotation = page.rotation;
        }
        else {
            this._options.rotation = options.rotation;
        }
        if (typeof index === 'number') {
            newPage = this._insertNewPage(page, index);
        }
        else if (this._isDuplicatePage) {
            newPage = this._insertNewPage(page, page._pageIndex + 1);
        }
        else {
            newPage = this._insertNewPage(page);
        }
        if ((isCopiedPage || isSplitDocument) && this._options.optimizeResources) {
            var newContents_1 = []; // eslint-disable-line
            pageDictionary.forEach(function (key, value) {
                if (key === 'Contents' && newContents_1.length === 0) {
                    var contents = value; // eslint-disable-line
                    if (contents instanceof _PdfReference) {
                        var pageContent = isSplitDocument ? _this._copier._copy(contents) : contents; // eslint-disable-line
                        newPage._pageDictionary.update(key, pageContent);
                    }
                    else if (contents instanceof Array) {
                        for (var i = 0; i < contents.length; i++) {
                            var newContent = isSplitDocument ? (_this._copier._copy(contents[Number.parseInt(i.toString(), 10)])) : // eslint-disable-line
                                contents[Number.parseInt(i.toString(), 10)];
                            newContents_1.push(newContent);
                        }
                        newPage._pageDictionary.update(key, newContents_1);
                    }
                }
                else if (key === 'Resources' && value) {
                    var resourceValue = isSplitDocument ? _this._copier._copy(value) : value; // eslint-disable-line
                    if (resourceValue) {
                        newPage._pageDictionary.update(key, resourceValue);
                    }
                }
                else if (key !== 'Resources' && key !== 'MediaBox' && key !== 'CropBox' && key !== 'Parent' && key !== 'Annots'
                    && key !== 'Contents' && key !== 'Rotate') {
                    newPage._pageDictionary.update(key, value);
                }
            });
        }
        else {
            template = page._contentTemplate;
            newPage.graphics.drawTemplate(template, { x: 0, y: 0, width: template._size[0], height: template._size[1] });
            template._content.dictionary.update('Resources', this._copier._copy(pageDictionary.getRaw('Resources')));
            this._pageReference.set(pageDictionary, newPage);
            if (!isCopiedPage) {
                this._bookmarksPageLinkReference.set(page._ref, newPage._pageIndex);
            }
        }
        if (pageDictionary.has('Annots')) {
            this._importAnnotation(page, newPage);
            if (typeof this._options !== 'undefined' && this._options.groupFormFields && this._sourceDocument._catalog._catalogDictionary.has('AcroForm')) {
                this._formFieldsGroupingSupport(this._sourceDocument.form, page, newPage);
            }
            else if (this._sourceDocument._catalog._catalogDictionary.has('AcroForm')) {
                this._importFormField(page, this._sourceDocument.form, newPage, this._sourceDocument._crossReference);
            }
        }
        if (!isCopiedPage) {
            var bookMarkMap = this._sourceDocument._parseBookmarkDestination();
            if (bookMarkMap && bookMarkMap.has(page)) {
                var bookmarks = bookMarkMap.get(page);
                for (var i = 0; i < bookmarks.length; i++) {
                    this._bookmarks.push(bookmarks[Number.parseInt(i.toString(), 10)]);
                }
            }
        }
        if ((!isCopiedPage && layers) || !this._options.optimizeResources) {
            this._mergeLayer(newPage._pageDictionary, pageDictionary, this._sourceDocument._crossReference);
        }
        newPage._pageDictionary._updated = true;
    };
    _PdfMergeHelper.prototype._importAnnotation = function (page, newPage) {
        var array = []; // eslint-disable-line
        var dest; // eslint-disable-line
        var isDestination = false;
        var oldCollection = page.annotations;
        var count = oldCollection.count;
        for (var i = 0; i < count; i++) {
            var annotationReference = oldCollection._annotations[Number.parseInt(i.toString(), 10)];
            if (annotationReference) {
                var annotationDictionary = this._sourceDocument._crossReference._fetch(annotationReference);
                if (annotationDictionary) {
                    if (annotationDictionary.has('Dest')) {
                        dest = [];
                        var destinationArray = annotationDictionary.get('Dest'); // eslint-disable-line
                        var destination = annotationDictionary._get('Dest'); // eslint-disable-line
                        if (destinationArray instanceof Array) {
                            var destArray = destinationArray; // eslint-disable-line
                            for (var j = 0; j < destArray.length; j++) {
                                dest.push(destArray[Number.parseInt(j.toString(), 10)]);
                            }
                            isDestination = true;
                        }
                        else if (destination instanceof _PdfReference) {
                            dest.push(destination);
                        }
                    }
                    if (dest && dest.length > 0) {
                        this._destination.push(dest);
                    }
                    if (annotationDictionary.has('OC')) {
                        var reference = annotationDictionary.getRaw('OC'); // eslint-disable-line
                        if (reference instanceof _PdfReference) {
                            this._annotationLayer.set(i, reference);
                        }
                    }
                    var copiedAnnotationReference = this._copier._copy(annotationReference);
                    var copiedAnnotationDictionary = this._destinationDocument._crossReference.
                        _fetch(copiedAnnotationReference);
                    if (isDestination) {
                        copiedAnnotationDictionary.update('Dest', dest);
                    }
                    copiedAnnotationDictionary.update('P', newPage._ref);
                    this._crossReference._cacheMap.set(copiedAnnotationReference, copiedAnnotationDictionary);
                    array.push(copiedAnnotationReference);
                }
            }
            isDestination = false;
            dest = [];
        }
        if (array.length > 0) {
            newPage._pageDictionary.update('Annots', array);
        }
    };
    _PdfMergeHelper.prototype._formFieldsGroupingSupport = function (form, oldPage, newPage) {
        var array = [];
        var fieldNames = [];
        var kidsArray = [];
        var formFields;
        var drEntry = form._dictionary.get('DR');
        if (form._dictionary.has('DR')) {
            drEntry = form._dictionary.get('DR');
        }
        if (newPage._pageDictionary.has('Annots')) {
            array = newPage._pageDictionary.get('Annots');
        }
        if (oldPage._pageDictionary.has('Annots')) {
            kidsArray = oldPage._pageDictionary.get('Annots');
        }
        if (!this._isDuplicatePage) {
            formFields = this._destinationDocument.form;
            this._fieldCount = formFields.count;
            for (var k = 0; k < this._fieldCount; k++) {
                fieldNames.push(formFields.fieldAt(k).name);
            }
        }
        for (var i = 0; i < form.count; i++) {
            var field = form.fieldAt(i);
            var formField = void 0;
            var destinationKids = [];
            var sourceKids = field._dictionary.get('Kids');
            if (fieldNames.indexOf(field.name) !== -1 || this._isDuplicatePage) {
                if (!this._isDuplicatePage) {
                    formField = formFields.fieldAt(fieldNames.indexOf(field.name));
                    if (formField._dictionary.get('Kids')) {
                        destinationKids = formField._dictionary.get('Kids');
                    }
                }
                else {
                    formField = field;
                    destinationKids = sourceKids;
                }
                field._isDuplicatePage = true;
                if ((field instanceof PdfSignatureField && formField instanceof PdfSignatureField) || !(field instanceof
                    PdfSignatureField)) {
                    if (sourceKids !== undefined && sourceKids.length > 0) {
                        for (var j = 0; j < sourceKids.length; j++) {
                            var fieldItem = field.itemAt(j); // eslint-disable-line
                            if (fieldItem.page === oldPage) {
                                formField._page = newPage;
                                array = this._groupFormFieldsKids(formField, field, kidsArray, destinationKids, sourceKids, newPage._ref, array, j, i, drEntry, fieldItem);
                            }
                        }
                    }
                    else {
                        array = this._groupFormFieldsKids(formField, field, kidsArray, destinationKids, sourceKids, newPage._ref, array, 0, i, drEntry);
                    }
                }
            }
            else {
                array = this._insertFormFields(i, form._crossReference, field, form, newPage._ref, array, kidsArray);
            }
        }
        if (array.length > 0) {
            newPage._pageDictionary.update('Annots', array);
        }
    };
    _PdfMergeHelper.prototype._groupFormFieldsKids = function (destinationField, field, kidsArray, destKids, oldKids, ref, array, index, fieldIndex, drEntry, widget) {
        if (field._dictionary.has('Kids') && destinationField._dictionary.has('Kids')) {
            if (kidsArray.indexOf(oldKids[Number.parseInt(index.toString(), 10)]) !== -1) {
                var oldDictionary = field._crossReference._fetch(oldKids[Number.parseInt(index.toString(), 10)]);
                var dictionary = this._copier._copyDictionary(oldDictionary, !this._isDuplicatePage);
                dictionary.update('P', ref);
                var reference = this._crossReference._getNextReference();
                this._crossReference._cacheMap.set(reference, dictionary);
                array.push(reference);
                dictionary.update('Parent', destinationField._ref);
                destKids.push(reference);
                dictionary._updated = true;
                destinationField._dictionary._updated = true;
                if (!this._isDuplicatePage) {
                    if ((destinationField instanceof PdfTextBoxField || destinationField instanceof PdfButtonField || destinationField instanceof PdfComboBoxField) && dictionary.has('AS')) {
                        delete dictionary._map.AS;
                    }
                    this._createAppearance(destinationField, field, oldDictionary, dictionary, drEntry, widget);
                }
            }
        }
        else if (field._dictionary.has('Kids') && !destinationField._dictionary.has('Kids') || this._isDuplicatePage) {
            var fieldDictionary = this._copier._copyDictionary(destinationField._dictionary, !this._isDuplicatePage);
            this._updateFieldsWithKids(destinationField, field, fieldDictionary, index, fieldIndex, ref, oldKids, array, drEntry, destinationField._dictionary);
        }
        else if ((!field._dictionary.has('Kids') && destinationField._dictionary.has('Kids'))) {
            var fieldDict = this._copier._copyDictionary(field._dictionary);
            this._updateFieldDictionary(fieldDict, ref, destinationField._ref);
            var reference = this._crossReference._getNextReference();
            this._crossReference._cacheMap.set(reference, fieldDict);
            destKids.push(reference);
            array.push(reference);
            destinationField._dictionary._updated = true;
            this._createAppearance(destinationField, field, field._dictionary, fieldDict, drEntry, widget);
        }
        else if (!field._dictionary.has('Kids') && !destinationField._dictionary.has('Kids')) {
            var fieldDictionary = this._copier._copyDictionary(destinationField._dictionary);
            var formFieldDict = this._copier._copyDictionary(field._dictionary, !this._isDuplicatePage);
            this._removeFieldDictionary(formFieldDict, ['Parent', 'FT', 'T', 'Ff']);
            formFieldDict.update('P', ref);
            this._updateFieldsWithKids(destinationField, field, fieldDictionary, index, fieldIndex, ref, oldKids, array, drEntry, formFieldDict);
        }
        return array;
    };
    _PdfMergeHelper.prototype._updateFieldsWithKids = function (destinationField, field, fieldDictionary, index, fieldIndex, ref, oldKids, array, drEntry, formFieldDictionary) {
        var newFieldReference = this._crossReference._getNextReference();
        var newFieldDict = this._createNewFieldDictionary(fieldDictionary, destinationField._dictionary);
        newFieldDict.objId = newFieldReference.toString();
        this._crossReference._cacheMap.set(newFieldReference, newFieldDict);
        var newField = this._destinationDocument.form._parseFields(newFieldDict, newFieldReference);
        destinationField._dictionary.update('Parent', newFieldReference);
        newField._dictionary._updated = true;
        this._updateFieldDictionary(fieldDictionary, ref, newFieldReference);
        this._destinationDocument.form._dictionary._updated = true;
        var oldDictionary;
        if (oldKids !== undefined && oldKids.length > 0) {
            oldDictionary = field._crossReference._fetch(oldKids[Number.parseInt(index.toString(), 10)]);
        }
        else {
            oldDictionary = formFieldDictionary;
        }
        var dictionary = this._copier._copyDictionary(oldDictionary, !this._isDuplicatePage);
        if ((destinationField instanceof PdfTextBoxField || destinationField instanceof PdfButtonField || destinationField instanceof PdfComboBoxField) && dictionary.has('AS')) {
            delete dictionary._map.AS;
        }
        var reference = this._crossReference._getNextReference();
        this._crossReference._cacheMap.set(reference, dictionary);
        dictionary.update('P', ref);
        array.push(reference);
        dictionary.update('Parent', newField._ref);
        var kidsElement = [];
        kidsElement.push(destinationField._ref);
        kidsElement.push(reference);
        dictionary._updated = true;
        destinationField._dictionary._updated = true;
        newFieldDict.update('Kids', kidsElement);
        newField._kids = kidsElement;
        this._formFieldsCollection.set(fieldIndex, newFieldReference);
        this._destinationDocument.form._parsedFields.set(fieldIndex, newField);
        if (!this._isDuplicatePage) {
            this._createAppearance(newField, field, oldDictionary, dictionary, drEntry);
        }
        newFieldDict._updated = true;
    };
    _PdfMergeHelper.prototype._removeFieldDictionary = function (dictionary, keys) {
        keys.forEach(function (key) {
            if (dictionary.has(key)) {
                delete dictionary._map[key]; // eslint-disable-line
            }
        });
        return dictionary;
    };
    _PdfMergeHelper.prototype._updateFieldDictionary = function (dictionary, pageRef, parentRef) {
        dictionary = this._removeFieldDictionary(dictionary, ['Parent', 'FT', 'T', 'Ff']);
        dictionary.update('P', pageRef);
        dictionary.update('Parent', parentRef);
        dictionary._updated = true;
    };
    _PdfMergeHelper.prototype._createNewFieldDictionary = function (fieldDictionary, destDictionary) {
        var newFieldDict = new _PdfDictionary(this._crossReference);
        ['Parent', 'FT', 'T', 'V', 'Ff', 'TU', 'Opt', 'I'].forEach(function (key) {
            if (fieldDictionary.has(key)) {
                newFieldDict.update(key, fieldDictionary.get(key));
                delete fieldDictionary._map[key]; // eslint-disable-line
                delete destDictionary._map[key]; // eslint-disable-line
            }
        });
        return newFieldDict;
    };
    _PdfMergeHelper.prototype._getItemStyle = function (item, field) {
        var mkDictionary = item._dictionary.get('MK');
        if (mkDictionary && mkDictionary.has('CA')) {
            item._styleText = mkDictionary.get('CA').charAt(0);
        }
        else {
            item._styleText = (field instanceof PdfRadioButtonListField) ? 'l' : '4';
        }
    };
    _PdfMergeHelper.prototype._createAppearance = function (destinationField, field, oldDictionary, dictionary, drEntry, widget) {
        var previousIndex = destinationField._kidsCount - 1;
        var itemValue;
        if (destinationField instanceof PdfCheckBoxField) {
            var item = destinationField.itemAt(previousIndex);
            item._enableGrouping = true;
            this._getItemStyle(item, destinationField);
            if (field instanceof PdfRadioButtonListField) {
                item._dictionary.update('AS', _PdfName.get('Off'));
                itemValue = _getItemValue(oldDictionary);
            }
            else {
                item._postProcess(destinationField.checked ? 'Yes' : 'Off');
            }
            destinationField._drawAppearance(item, itemValue);
        }
        else if (destinationField instanceof PdfRadioButtonListField) {
            var item = destinationField.itemAt(previousIndex);
            this._getItemStyle(item, destinationField);
            if (item._dictionary.has('AS')) {
                item._postProcess(item._dictionary.get('AS').name);
            }
            else {
                item._postProcess('Off');
            }
            item._enableGrouping = true;
            destinationField._enableGrouping = true;
            destinationField._drawAppearance(item);
        }
        else if (destinationField instanceof PdfListField) {
            var item = destinationField.itemAt(previousIndex);
            if (typeof widget !== 'undefined') {
                item.rotationAngle = widget.rotationAngle;
            }
            if (item && !destinationField._checkFieldFlag(item._dictionary)) {
                item._enableGrouping = true;
                var template = destinationField._createAppearance(item);
                destinationField._addAppearance(item._dictionary, template, 'N');
                item._dictionary._updated = true;
            }
        }
        else if (destinationField instanceof PdfTextBoxField || destinationField instanceof PdfButtonField || destinationField instanceof
            PdfSignatureField) {
            var widgetAnnotation = PdfWidgetAnnotation._load(dictionary, this._crossReference);
            if (typeof widget !== 'undefined' && widget !== null && destinationField instanceof PdfSignatureField) {
                destinationField._createAppearance(widget, false);
            }
            else {
                widgetAnnotation.setAppearance(true);
                widgetAnnotation._enableGrouping = true;
                var pdfFont = void 0;
                if (typeof widget !== 'undefined' && widget !== null) {
                    pdfFont = this._obtainFont(widget._dictionary, drEntry);
                }
                else {
                    pdfFont = this._obtainFont(dictionary, drEntry);
                }
                widgetAnnotation._pdfFont = pdfFont;
                if (destinationField instanceof PdfSignatureField) {
                    destinationField._createAppearance(widgetAnnotation, false);
                }
                else {
                    destinationField._postProcess(false, widgetAnnotation);
                }
            }
        }
    };
    _PdfMergeHelper.prototype._obtainFont = function (item, formDictionary) {
        var fontFamily = '';
        var fontSize = 8;
        var pdfFont;
        if (item && (item.has('DS') || item.has('DA'))) {
            if (item.has('DS')) {
                var collection = item.get('DS').split(';');
                for (var i = 0; i < collection.length; i++) {
                    var entry = collection[Number.parseInt(i.toString(), 10)].split(':');
                    if (collection[Number.parseInt(i.toString(), 10)].indexOf('font-family') !== -1) {
                        fontFamily = entry[1];
                    }
                    else if (collection[Number.parseInt(i.toString(), 10)].indexOf('font-style') === -1 && collection[Number.parseInt(i.toString(), 10)].indexOf('font') !== -1) {
                        var name_1 = entry[1];
                        var split = name_1.split(' ');
                        for (var j = 0; j < split.length; j++) {
                            if (split[Number.parseInt(j.toString(), 10)] !== '' && !split[Number.parseInt(j.toString(), 10)].endsWith('pt')) {
                                fontFamily += split[Number.parseInt(j.toString(), 10)] + ' ';
                            }
                        }
                        while (fontFamily !== ' ' && fontFamily.endsWith(' ')) {
                            fontFamily = fontFamily.substring(0, fontFamily.length - 2);
                        }
                        if (fontFamily.indexOf(',') !== -1) {
                            fontFamily = fontFamily.split(',')[0];
                        }
                    }
                }
            }
            else {
                var value = item.get('DA');
                if (value && value !== '' && value.indexOf('Tf') !== -1) {
                    var textCollection = value.split(' ');
                    for (var i = 0; i < textCollection.length; i++) {
                        if (textCollection[Number.parseInt(i.toString(), 10)].indexOf('Tf') !== -1) {
                            fontFamily = textCollection[i - 2];
                            while (fontFamily !== '' && fontFamily.length > 1 && fontFamily[0] === '/') {
                                fontFamily = fontFamily.substring(1);
                            }
                            fontSize = Number.parseFloat(textCollection[i - 1]);
                        }
                    }
                    if (fontSize === 0) {
                        fontSize = 8;
                    }
                }
            }
        }
        fontFamily = fontFamily.trim();
        var fontStyle = PdfFontStyle.regular;
        var baseFontName;
        if (typeof formDictionary != 'undefined' && formDictionary.has('Font')) {
            var dictionary = formDictionary.get('Font').get(fontFamily);
            if (typeof dictionary !== 'undefined') {
                baseFontName = dictionary.get('BaseFont').name;
                fontStyle = this._getFontStyle(baseFontName);
            }
        }
        switch (fontFamily) {
            case 'Helv':
                pdfFont = new PdfStandardFont(PdfFontFamily.helvetica, fontSize, fontStyle);
                break;
            case 'Courier':
            case 'Cour':
                pdfFont = new PdfStandardFont(PdfFontFamily.courier, fontSize, fontStyle);
                break;
            case 'Symb':
                pdfFont = new PdfStandardFont(PdfFontFamily.symbol, fontSize, fontStyle);
                break;
            case 'TiRo':
            case 'TiIt':
                pdfFont = new PdfStandardFont(PdfFontFamily.timesRoman, fontSize, fontStyle);
                break;
            case 'ZaDb':
                pdfFont = new PdfStandardFont(PdfFontFamily.zapfDingbats, fontSize, fontStyle);
                break;
            default:
                pdfFont = new PdfStandardFont(PdfFontFamily.helvetica, fontSize, fontStyle);
                break;
        }
        return pdfFont;
    };
    _PdfMergeHelper.prototype._getFontStyle = function (fontStyle) {
        var style = PdfFontStyle.regular;
        if (fontStyle.includes('Bold')) {
            style = PdfFontStyle.bold;
        }
        else if (fontStyle.includes('Italic')) {
            style = PdfFontStyle.italic;
        }
        return style;
    };
    _PdfMergeHelper.prototype._importFormField = function (page, pdfForm, newPage, crossReference) {
        var form = this._destinationDocument.form;
        var array = [];
        if (newPage && newPage._pageDictionary && newPage._pageDictionary.has('Annots')) {
            array = newPage._pageDictionary.get('Annots');
        }
        var kidsArray = [];
        var widgetArray = [];
        if (this._destinationDocument.form._dictionary.has('Fields')) {
            var formFields = this._destinationDocument.form;
            this._fieldCount = formFields.count;
            for (var k = 0; k < this._fieldCount; k++) {
                var name_2 = formFields.fieldAt(k).name;
                this._fieldNames.push(name_2);
            }
        }
        if (page._pageDictionary.has('Annots')) {
            widgetArray = page._pageDictionary.get('Annots');
        }
        var count = pdfForm.count;
        for (var i = 0; i < count; ++i) {
            var pdfField = pdfForm.fieldAt(i);
            if (pdfField._dictionary.has('Kids')) {
                kidsArray = pdfField._dictionary.get('Kids');
                if (kidsArray.length > 1) {
                    for (var j = 0; j < kidsArray.length; j++) {
                        var fieldItem = pdfField.itemAt(j); // eslint-disable-line
                        if (fieldItem.page === page) {
                            array = this._insertFormFields(i, crossReference, pdfField, form, newPage._ref, array, widgetArray);
                            break;
                        }
                    }
                }
                else if (kidsArray.length === 1) {
                    if (pdfField.page === page) {
                        array = this._insertFormFields(i, crossReference, pdfField, form, newPage._ref, array, widgetArray);
                    }
                }
            }
            else {
                if (pdfField.page === page) {
                    array = this._insertFormFields(i, crossReference, pdfField, form, newPage._ref, array, widgetArray);
                }
            }
        }
        if (pdfForm._dictionary.has('DR')) {
            var dr = pdfForm._dictionary.get('DR');
            var drDictionary = this._copier._copyDictionary(dr); // eslint-disable-line
            var font = void 0; // eslint-disable-line
            if (drDictionary.has('Font')) {
                font = drDictionary.get('Font');
            }
            if (this._destinationDocument.form._dictionary.has('DR')) {
                var curreneDR = this._destinationDocument.form._dictionary.get('DR');
                if (curreneDR.has('Font')) {
                    var currentFont_1 = curreneDR.get('Font'); // eslint-disable-line
                    if (font) {
                        font.forEach(function (key, value) {
                            currentFont_1.set(key, value);
                        });
                    }
                    currentFont_1._updated = true;
                }
            }
            else {
                this._destinationDocument.form._dictionary.update('DR', drDictionary);
            }
        }
        if (array.length > 0) {
            newPage._pageDictionary.update('Annots', array);
        }
    };
    _PdfMergeHelper.prototype._insertFormFields = function (index, crossReference, pdfField, form, ref, array, kidsArray) {
        var dictionary = new _PdfDictionary();
        if (pdfField._dictionary.has('Kids')) {
            pdfField._dictionary.forEach(function (key, value) {
                if (key !== 'Kids') {
                    dictionary.update(key, value);
                }
            });
        }
        else {
            dictionary = this._copier._copyDictionary(pdfField._dictionary);
        }
        var newReference = this._crossReference._getNextReference();
        dictionary.objId = newReference.toString();
        var field = form._parseFields(dictionary, ref);
        this._crossReference._cacheMap.set(newReference, field._dictionary);
        if (pdfField._dictionary.has('Kids')) {
            var oldKids = pdfField._dictionary.get('Kids');
            var kids = [];
            for (var j = 0; j < oldKids.length; j++) {
                if ((kidsArray.indexOf(oldKids[Number.parseInt(j.toString(), 10)]) !== -1)) {
                    var oldDictionary = pdfField._crossReference._fetch(oldKids[Number.parseInt(j.toString(), 10)]);
                    var dict = this._copier._copyDictionary(oldDictionary);
                    dict.update('P', ref);
                    dict.update('Parent', newReference);
                    dict._updated = true;
                    var reference = this._crossReference._getNextReference();
                    this._crossReference._cacheMap.set(reference, dict);
                    array.push(reference);
                    kids.push(reference);
                }
            }
            dictionary.update('Kids', kids);
            field._kids = kids;
        }
        else {
            field._dictionary.update('P', ref);
            array.push(newReference);
        }
        field._dictionary._updated = true;
        var i = 0;
        var fieldName = field.name;
        var modified = false;
        while (this._fieldNames.indexOf(fieldName) !== -1) {
            fieldName = field.name + i;
            modified = true;
            ++i;
        }
        if (modified) {
            field._dictionary.update('T', fieldName);
            field._name = fieldName;
        }
        field._dictionary._updated = true;
        if (this._fieldCount > 0) {
            this._destinationDocument.form._parsedFields.set(this._fieldCount, field);
            field._annotationIndex = this._fieldCount;
            this._fieldCount++;
        }
        else {
            this._destinationDocument.form._parsedFields.set(index, field);
            field._annotationIndex = index;
        }
        this._destinationDocument.form._fields.push(newReference);
        return array;
    };
    _PdfMergeHelper.prototype._mergeFormFieldsWithDocument = function () {
        var pdfFields;
        if (this._formFieldsCollection.size > 0) {
            pdfFields = this._destinationDocument.form._dictionary.get('Fields');
            this._formFieldsCollection.forEach(function (value, key) {
                pdfFields[Number.parseInt(key.toString(), 10)] = value;
            });
        }
        else {
            pdfFields = this._destinationDocument.form._fields;
        }
        if (this._destinationDocument.form._dictionary.get('NeedAppearances')) {
            this._destinationDocument.form._dictionary.set('NeedAppearances', false);
        }
        this._destinationDocument.form._dictionary.set('Fields', pdfFields);
        this._destinationDocument.form._fields = pdfFields;
        this._destinationDocument.form._dictionary._updated = true;
    };
    _PdfMergeHelper.prototype._importLayers = function (ocProperties, layers) {
        this._isLayersPresent = layers;
        if (this._isLayersPresent && this._destinationDocument._catalog._catalogDictionary.has('OCProperties')) {
            var destinationOCProperties = this._destinationDocument._catalog._catalogDictionary.get('OCProperties');
            var currentOCProperties = ocProperties.get('OCProperties');
            if (destinationOCProperties.has('OCGs')) {
                var ocgs = destinationOCProperties.get('OCGs'); // eslint-disable-line
                var Cocgs = currentOCProperties.get('OCGs'); // eslint-disable-line
                if (ocgs.length > 0) {
                    for (var i = 0; i < Cocgs.length; i++) {
                        ocgs.push(Cocgs[Number.parseInt(i.toString(), 10)]);
                    }
                }
            }
            destinationOCProperties._updated = true;
            if (destinationOCProperties.has('D') && currentOCProperties.has('D')) {
                var curreneDefaultView = destinationOCProperties.get('D');
                var existingDefaultView = currentOCProperties.get('D');
                if (curreneDefaultView && existingDefaultView) {
                    if (curreneDefaultView.has('Order') && existingDefaultView.has('Order')) {
                        var order = curreneDefaultView.get('Order'); // eslint-disable-line
                        var existingOrder = existingDefaultView.get('Order'); // eslint-disable-line
                        if (order.length > 0 && existingOrder.length > 0) {
                            for (var i = 0; i < existingOrder.length; i++) {
                                order.push(existingOrder[Number.parseInt(i.toString(), 10)]);
                            }
                        }
                    }
                    else if (existingDefaultView.has('Order')) {
                        curreneDefaultView.set('Order', existingDefaultView.get('Order'));
                    }
                    if (curreneDefaultView.has('RBGroups') && existingDefaultView.has('RBGroups')) {
                        var groups = curreneDefaultView.get('RBGroups'); // eslint-disable-line
                        var existingRBGroups = existingDefaultView.get('RBGroups'); // eslint-disable-line
                        if (groups.length > 0 && existingRBGroups.length > 0) {
                            for (var i = 0; i < existingRBGroups.length; i++) {
                                groups.push(existingRBGroups[Number.parseInt(i.toString(), 10)]);
                            }
                        }
                    }
                    else if (existingDefaultView.has('RBGroups')) {
                        curreneDefaultView.set('RBGroups', existingDefaultView.get('RBGroups'));
                        curreneDefaultView._updated = true;
                    }
                    if (curreneDefaultView.has('ON') && existingDefaultView.has('ON')) {
                        var on = curreneDefaultView.get('ON'); // eslint-disable-line
                        var existingON = existingDefaultView.get('ON'); // eslint-disable-line
                        if (on.length > 0 && existingON.length > 0) {
                            for (var i = 0; i < existingON.length; i++) {
                                on.push(existingON[Number.parseInt(i.toString(), 10)]);
                            }
                        }
                    }
                    else if (existingDefaultView.has('ON')) {
                        curreneDefaultView.set('ON', existingDefaultView.get('ON'));
                    }
                    if (curreneDefaultView.has('AS') && existingDefaultView.has('AS')) {
                        var elements = curreneDefaultView.get('AS'); // eslint-disable-line
                        var existingElements = existingDefaultView.get('AS'); // eslint-disable-line
                        if (elements.length > 0 && existingElements.length > 0) {
                            var asDictionary = existingElements[0];
                            var currentASDictionary = elements[0];
                            if (asDictionary instanceof _PdfReference && currentASDictionary instanceof _PdfReference) {
                                asDictionary = this._crossReference._fetch(asDictionary);
                                currentASDictionary = this._crossReference._fetch(currentASDictionary);
                            }
                            if (asDictionary.has('OCGs') && currentASDictionary.has('OCGs')) {
                                var usageGroup = asDictionary.get('OCGs'); // eslint-disable-line
                                var currentUsageGroup = currentASDictionary.get('OCGs'); // eslint-disable-line
                                if (usageGroup.length > 0 && currentUsageGroup.length > 0) {
                                    for (var i = 0; i < usageGroup.length; i++) {
                                        currentUsageGroup.push(usageGroup[Number.parseInt(i.toString(), 10)]);
                                    }
                                }
                            }
                            for (var i = 0; i < existingElements.length; i++) {
                                elements.push(existingElements[Number.parseInt(i.toString(), 10)]);
                            }
                        }
                    }
                    else if (existingDefaultView.has('AS')) {
                        curreneDefaultView.set('AS', existingDefaultView.get('AS'));
                    }
                    if (curreneDefaultView.has('OFF') && existingDefaultView.has('OFF')) {
                        var off = curreneDefaultView.get('OFF'); // eslint-disable-line
                        var existingOff = existingDefaultView.get('OFF'); // eslint-disable-line
                        if (off.length > 0 && existingOff.length > 0) {
                            for (var i = 0; i < existingOff.length; i++) {
                                off.push(existingOff[Number.parseInt(i.toString(), 10)]);
                            }
                        }
                    }
                    else if (existingDefaultView.has('OFF')) {
                        curreneDefaultView.set('OFF', existingDefaultView.get('OFF'));
                    }
                }
                if (curreneDefaultView.has('Locked') && existingDefaultView.has('Locked')) {
                    var locked = curreneDefaultView.get('Locked'); // eslint-disable-line
                    var existingLocked = existingDefaultView.get('Locked'); // eslint-disable-line
                    if (locked.length > 0 && existingLocked.length > 0) {
                        for (var i = 0; i < existingLocked.length; i++) {
                            locked.push(existingLocked[Number.parseInt(i.toString(), 10)]);
                        }
                    }
                }
                else if (existingDefaultView.has('Locked')) {
                    curreneDefaultView.set('Locked', existingDefaultView.get('Locked'));
                }
            }
            else if (currentOCProperties.has('D')) {
                destinationOCProperties.set('D', currentOCProperties.get('D'));
            }
            destinationOCProperties._updated = true;
            this._destinationDocument._catalog._catalogDictionary._updated = true;
            this._crossReference._allowCatalog = true;
        }
        else if (this._isLayersPresent) {
            this._destinationDocument._catalog._catalogDictionary.update('OCProperties', ocProperties.get('OCProperties'));
            this._destinationDocument._catalog._catalogDictionary._updated = true;
            this._crossReference._allowCatalog = true;
        }
    };
    _PdfMergeHelper.prototype._mergeLayer = function (newPageDictionary, oldPageDictionary, crossReference) {
        var _this = this;
        var res = newPageDictionary.get('Resources');
        var xobject = res.get('XObject');
        var xobjdict; // eslint-disable-line
        if (xobject) {
            xobject.forEach(function (key, value) {
                xobjdict = _this._crossReference._fetch(value);
            });
        }
        var resource;
        if (xobjdict) {
            resource = xobjdict.dictionary.get('Resources');
        }
        var XObject; // eslint-disable-line
        var oldPageList = new Map();
        var oldPageResource = oldPageDictionary.get('Resources');
        var layerDictionary; // eslint-disable-line
        var dict; // eslint-disable-line
        if (oldPageResource.has('Properties')) {
            layerDictionary = oldPageResource.get('Properties');
            layerDictionary.forEach(function (key, value) {
                oldPageList.set(key, value);
            });
            var properties_1 = new _PdfDictionary(this._crossReference);
            oldPageList.forEach(function (value, key) {
                _this._newList.forEach(function (layerValue, layerkey) {
                    if (value === layerkey) {
                        properties_1.set(key, layerValue);
                    }
                });
            });
            resource.set('Properties', properties_1);
            resource._updated = true;
            properties_1._updated = true;
        }
        else if (oldPageResource.has('XObject')) {
            XObject = resource.get('XObject');
            layerDictionary = oldPageResource.get('XObject');
            layerDictionary.forEach(function (key, value) {
                if (value instanceof _PdfReference) {
                    dict = crossReference._fetch(value);
                    dict.dictionary.forEach(function (annotationKey, annotationValue) {
                        if (annotationKey === 'OC') {
                            _this._newList.forEach(function (layerValue, layerKey) {
                                if (layerKey === annotationValue) {
                                    if (XObject.has(key)) {
                                        var xobjDictionary = XObject.get(key); // eslint-disable-line
                                        xobjDictionary.dictionary.set(annotationKey, layerValue);
                                        xobjDictionary._updated = true;
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
        if (this._annotationLayer.size > 0) {
            var annotations_1 = newPageDictionary._get('Annots'); // eslint-disable-line
            this._annotationLayer.forEach(function (reference, index) {
                var pdfAnnotation = annotations_1[Number.parseInt(index.toString(), 10)]; // eslint-disable-line
                var annotDictionary = _this._crossReference._fetch(pdfAnnotation);
                _this._newList.forEach(function (value, oldReference) {
                    if (reference === oldReference) {
                        annotDictionary.set('OC', value);
                    }
                });
            });
        }
    };
    _PdfMergeHelper.prototype._exportBookmarks = function (document, pageCount) {
        var _this = this;
        if (this._bookmarks.length > 0) {
            var bookmark = this._bookmarks;
            var currentBase = this._destinationDocument.bookmarks;
            var current = document.bookmarks;
            var bkCollection = void 0; // eslint-disable-line
            if (current) {
                var stack = [];
                var nodeInformation = { index: 0, base: currentBase, kids: current._bookMarkList };
                if (document.pageCount !== pageCount) {
                    nodeInformation = { index: 0, base: currentBase, kids: bookmark };
                    bkCollection = [];
                }
                do {
                    var _loop_1 = function () {
                        current = nodeInformation.kids[nodeInformation.index];
                        if (bookmark.indexOf(current) !== -1 && typeof bkCollection !== 'undefined' && bkCollection.indexOf(current.title) === -1) {
                            var bm = current;
                            var newBm = currentBase.add(bm.title);
                            var dest = bm.destination;
                            newBm.color = bm.color;
                            newBm.textStyle = bm.textStyle;
                            var newDest = null;
                            var newPage_1 = null;
                            var page_1 = null;
                            var nDest = bm.namedDestination;
                            if (nDest) {
                                if (nDest.destination) {
                                    page_1 = nDest.destination.page;
                                    this_1._bookmarksPageLinkReference.forEach(function (value, key) {
                                        if (page_1._ref === key) {
                                            newPage_1 = _this._destinationDocument.getPage(value);
                                        }
                                    });
                                    if (newPage_1) {
                                        var newNameddest = this_1._getNamedDestination(nDest, newPage_1);
                                        newBm.namedDestination = newNameddest;
                                        delete newBm._dictionary._map.C;
                                        this_1._namedDestinations.push(newNameddest._title);
                                        var reference_1 = this_1._crossReference._getNextReference();
                                        this_1._crossReference._cacheMap.set(reference_1, newNameddest._dictionary);
                                        this_1._namedDestinations.push(reference_1);
                                    }
                                }
                            }
                            else if (dest) {
                                page_1 = dest.page;
                                this_1._bookmarksPageLinkReference.forEach(function (value, key) {
                                    if (page_1._ref === key) {
                                        newPage_1 = _this._destinationDocument.getPage(value);
                                    }
                                });
                                if (newPage_1) {
                                    newDest = new PdfDestination(newPage_1, dest.location);
                                    newDest.mode = dest.mode;
                                    newDest.zoom = dest.zoom;
                                    newDest.location = dest.location;
                                    newBm.destination = newDest;
                                }
                            }
                            currentBase = newBm;
                            bkCollection.push(newBm.title);
                        }
                        else if (typeof bkCollection === 'undefined' || (typeof bkCollection !== 'undefined' && bkCollection.indexOf(current.title) === -1)) {
                            var bm = current;
                            var dest = bm.destination;
                            var newDest = null;
                            var newpage_1 = null;
                            var page_2 = null;
                            var nDest = bm.namedDestination;
                            if (document.pageCount === pageCount) {
                                var newBm = currentBase.add(bm.title);
                                if (bm._dictionary.has('A')) {
                                    newBm._dictionary.update('A', bm._dictionary.get('A'));
                                }
                                newBm.textStyle = bm.textStyle;
                                newBm.color = bm.color;
                                if (nDest) {
                                    if (nDest._destination) {
                                        page_2 = nDest.destination.page;
                                        this_1._bookmarksPageLinkReference.forEach(function (value, key) {
                                            if (page_2._ref === key) {
                                                newpage_1 = _this._destinationDocument.getPage(value);
                                            }
                                        });
                                        if (newpage_1) {
                                            var newNameddest = this_1._getNamedDestination(nDest, newpage_1);
                                            newBm.namedDestination = newNameddest;
                                            delete newBm._dictionary._map.C;
                                            this_1._namedDestinations.push(newNameddest._title);
                                            var reference_2 = this_1._crossReference._getNextReference();
                                            this_1._crossReference._cacheMap.set(reference_2, newNameddest._dictionary);
                                            this_1._namedDestinations.push(reference_2);
                                        }
                                    }
                                }
                                else if (dest) {
                                    page_2 = dest.page;
                                    this_1._bookmarksPageLinkReference.forEach(function (value, key) {
                                        if (page_2._ref === key) {
                                            newpage_1 = _this._destinationDocument.getPage(value);
                                        }
                                    });
                                    if (newpage_1) {
                                        newDest = new PdfDestination(newpage_1, dest.location);
                                        newDest.mode = dest.mode;
                                        newDest.zoom = dest.zoom;
                                        newDest.location = dest.location;
                                        newBm.destination = newDest;
                                    }
                                }
                                currentBase = newBm;
                            }
                        }
                        nodeInformation.index += 1;
                        if (current.count > 0) {
                            stack.push(nodeInformation);
                            nodeInformation = { index: 0, base: currentBase, kids: current._bookMarkList };
                        }
                        else {
                            currentBase = nodeInformation.base;
                        }
                    };
                    var this_1 = this;
                    for (; nodeInformation.index < nodeInformation.kids.length;) {
                        _loop_1();
                    }
                    if (stack.length > 0) {
                        nodeInformation = stack.pop();
                        while ((nodeInformation.index === nodeInformation.kids.length) && (stack.length > 0)) {
                            nodeInformation = stack.pop();
                        }
                        currentBase = nodeInformation.base;
                    }
                } while (nodeInformation.index < nodeInformation.kids.length);
            }
            var reference = void 0;
            if (this._namedDestinations.length > 0) {
                var dictionary = new _PdfDictionary(this._crossReference);
                dictionary.update('Names', this._namedDestinations);
                reference = this._crossReference._getNextReference();
                this._crossReference._cacheMap.set(reference, dictionary);
                dictionary = new _PdfDictionary(this._crossReference);
                dictionary.update('Dests', reference);
                reference = this._crossReference._getNextReference();
                this._crossReference._cacheMap.set(reference, dictionary);
                this._destinationDocument._catalog._catalogDictionary.set('Names', reference);
            }
            this._destinationDocument._catalog._catalogDictionary._updated = true;
            this._destinationDocument._catalog._catalogDictionary.isCatalog = true;
            this._crossReference._allowCatalog = true;
        }
    };
    _PdfMergeHelper.prototype._getNamedDestination = function (nDest, page) {
        var newNamedDest = new PdfNamedDestination(nDest.title); // eslint-disable-line
        newNamedDest.destination = this._getDestination(page, nDest.destination);
        return newNamedDest;
    };
    _PdfMergeHelper.prototype._getDestination = function (page, dest) {
        var newDest = new PdfDestination(page, dest.location);
        newDest._location = dest._location;
        newDest.mode = dest.mode;
        newDest.zoom = dest.zoom;
        newDest.location = dest.location;
        return newDest;
    };
    _PdfMergeHelper.prototype._writeObject = function (document, table, value, dictionary, key, array, ref) {
        if (value instanceof _PdfName || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            this._writeDictionary(value, table, key, array, ref, null);
        }
        else if (Array.isArray(value)) {
            var list = []; // eslint-disable-line
            this._writeArray(document, list, value, dictionary);
            this._writeDictionary(null, table, key, array, ref, list);
        }
        else if (value instanceof _PdfDictionary) {
            var subTable = new _PdfDictionary(this._crossReference);
            this._writePropertiesDictionary(document, subTable, value);
            this._writeDictionary(null, table, key, array, ref, subTable);
        }
        else if (value instanceof _PdfReference && this._crossReference) {
            this._writeObject(document, table, document._crossReference._fetch(value), dictionary, key, array, value);
        }
        else if (value === null || typeof value === 'undefined') {
            this._writeDictionary('null', table, key, array, ref, null);
        }
    };
    _PdfMergeHelper.prototype._writeDictionary = function (value, table, key, array, ref, list) {
        if (key && value) {
            table.set(key, value);
        }
        else if (key && list) {
            table.set(key, list);
        }
        else if (list && !ref) {
            array.push(list);
        }
        else if (value) {
            array.push(value);
        }
        else if (ref) {
            var reference_3;
            if (this._newList && this._newList.size > 0) {
                this._newList.forEach(function (value, key) {
                    if (key === ref) {
                        reference_3 = value;
                    }
                });
            }
            if (reference_3) {
                array.push(reference_3);
            }
            else {
                var layerList = list;
                reference_3 = this._crossReference._getNextReference();
                this._crossReference._cacheMap.set(reference_3, layerList);
                layerList._updated = true;
                array.push(reference_3);
                this._newList.set(ref, reference_3);
            }
        }
    };
    _PdfMergeHelper.prototype._writeArray = function (document, array, value, dictionary) {
        for (var i = 0; i < value.length; i++) {
            this._writeObject(document, null, value[Number.parseInt(i.toString(), 10)], dictionary, null, array);
        }
    };
    _PdfMergeHelper.prototype._writePropertiesDictionary = function (document, table, dictionary) {
        var _this = this;
        if (dictionary && dictionary.size > 0) {
            dictionary.forEach(function (key, value) {
                _this._writeObject(document, table, ((value instanceof _PdfReference) ? dictionary.get(key) : value), dictionary, key);
            });
        }
    };
    _PdfMergeHelper.prototype._fixDestinations = function (document) {
        var pageLinkReference = this._pageReference;
        if (this._destination.length > 0) {
            for (var i = 0; i < this._destination.length; i++) {
                var dest = this._destination[Number.parseInt(i.toString(), 10)]; // eslint-disable-line
                if (dest instanceof Array) {
                    var destination = dest; // eslint-disable-line
                    if (destination.length > 0 && destination[0] && destination[0] instanceof _PdfReference) {
                        var ref = document._crossReference._fetch(destination[0]); // eslint-disable-line
                        var index = pageLinkReference.get(ref);
                        if (ref && pageLinkReference.has(ref) && index !== null) {
                            destination[0] = index._ref;
                        }
                        if (ref && pageLinkReference.has(ref) && index === null) {
                            destination[0] = null;
                        }
                    }
                }
            }
        }
    };
    _PdfMergeHelper.prototype._insertNewPage = function (page, index) {
        var newPage;
        var pagesettings = new PdfPageSettings();
        pagesettings.size = page.size;
        pagesettings.margins.left = 0;
        pagesettings.margins.top = 0;
        pagesettings.margins.right = 0;
        pagesettings.margins.bottom = 0;
        if (typeof this._options !== 'undefined' && typeof this._options.rotation !== 'undefined') {
            pagesettings.rotation = this._options.rotation;
        }
        else {
            pagesettings.rotation = page.rotation;
        }
        pagesettings.orientation = (page.size[0] > page.size[1]) ? PdfPageOrientation.landscape : PdfPageOrientation.portrait;
        if (typeof index !== 'undefined') {
            newPage = this._destinationDocument.addPage(index, pagesettings);
        }
        else {
            newPage = this._destinationDocument.addPage(pagesettings);
        }
        var pageDictionary = page._pageDictionary;
        if (pageDictionary._get('MediaBox')) {
            var mBox = pageDictionary._get('MediaBox'); // eslint-disable-line
            newPage._pageDictionary.update('MediaBox', mBox);
        }
        if (pageDictionary._get('CropBox')) {
            var cBox = pageDictionary._get('CropBox'); // eslint-disable-line
            newPage._pageDictionary.update('CropBox', cBox);
        }
        if (typeof this._options.rotation !== 'undefined' || page._pageDictionary.has('Rotate')) {
            var rotate = void 0;
            if (typeof this._options.rotation !== 'undefined') {
                rotate = Math.floor(this._options.rotation) * 90;
            }
            else {
                rotate = Math.floor(page.rotation) * 90;
            }
            rotate = rotate >= 360 ? rotate % 360 : rotate;
            newPage._pageDictionary.update('Rotate', rotate);
        }
        return newPage;
    };
    _PdfMergeHelper.prototype._objectDispose = function () {
        this._bookmarkHashTable = new Map();
        this._namedDestinations = [];
        this._bookmarks = [];
        this._pageReference = new Map();
        this._bookmarksPageLinkReference.clear();
        this._destination = [];
        this._newList = new Map();
        this._annotationLayer = new Map();
        this._fieldNames = [];
        if (this._destinationDocument && this._destinationDocument._form && this._destinationDocument._form._widgetReferences) {
            this._destinationDocument._form._widgetReferences = [];
        }
    };
    return _PdfMergeHelper;
}());
export { _PdfMergeHelper };
var _PdfCopier = /** @class */ (function () {
    function _PdfCopier(targetCrossReference, sourceCrossReference) {
        this._traversedObjects = new Map();
        this._isGroupingSupport = false;
        this._targetCrossReference = targetCrossReference;
        this._sourceCrossReference = sourceCrossReference;
    }
    _PdfCopier.prototype._copy = function (object) {
        var clonedObject; // eslint-disable-line
        if (object instanceof _PdfDictionary) {
            clonedObject = this._copyDictionary(object);
        }
        else if (Array.isArray(object)) {
            clonedObject = this._copyArray(object);
        }
        else if (object instanceof _PdfBaseStream) {
            clonedObject = this._copyStream(object);
        }
        else if (object instanceof _PdfReference) {
            clonedObject = this._copyReference(object);
        }
        else if (object instanceof _PdfName || typeof object === 'number' ||
            typeof object === 'string' || typeof object === 'boolean') {
            clonedObject = object;
        }
        return clonedObject;
    };
    _PdfCopier.prototype._copyDictionary = function (element, copiedPage) {
        var _this = this;
        var clonedDictionary = new _PdfDictionary(this._targetCrossReference);
        if (element && element.size > 0) {
            element.forEach(function (key, value) {
                if (key === 'OC' && value instanceof Array || (key !== 'P' && key !== 'Parent' && key !== 'Dest' && key !== 'OC' && !(key === 'AP' && copiedPage))) {
                    var copiedValue = _this._copy(value); // eslint-disable-line
                    if (copiedValue !== null && typeof copiedValue !== 'undefined') {
                        clonedDictionary.update(key, copiedValue);
                    }
                }
            });
        }
        clonedDictionary._updated = true;
        return clonedDictionary;
    };
    _PdfCopier.prototype._copyArray = function (originalArray) {
        var newArray = []; // eslint-disable-line 
        for (var i = 0; i < originalArray.length; i++) {
            newArray.push(this._copy(originalArray[Number.parseInt(i.toString(), 10)]));
        }
        return newArray;
    };
    _PdfCopier.prototype._copyStream = function (originalStream) {
        var bytes;
        var imageStream = false;
        var baseStream = originalStream; // eslint-disable-line
        if (originalStream.dictionary.has('Subtype') && originalStream.dictionary.get('Subtype').name === 'Image') {
            imageStream = true;
            if (originalStream instanceof _PdfStream) {
                bytes = originalStream.getByteRange(originalStream.offset, originalStream.end);
            }
            else if (originalStream && baseStream.stream && baseStream.stream instanceof _PdfStream) {
                if (typeof baseStream._initialized === 'boolean' && baseStream._cipher) {
                    var streamLength = baseStream.stream.end - baseStream.stream.start;
                    baseStream.getBytes(streamLength);
                    bytes = baseStream.buffer.subarray(0, baseStream.bufferLength);
                }
                else {
                    var stream = baseStream.stream;
                    bytes = stream.getByteRange(stream.start, stream.end);
                }
            }
            else if (baseStream.stream && baseStream.stream.stream) {
                var flateStream = baseStream.stream; // eslint-disable-line
                if (flateStream.stream instanceof _PdfStream && typeof flateStream._initialized === 'boolean' && flateStream._cipher) {
                    var streamLength = flateStream.stream.end - flateStream.stream.start;
                    flateStream.getBytes(streamLength);
                    bytes = flateStream.buffer.subarray(0, flateStream.bufferLength);
                }
                else if (flateStream.stream && flateStream.stream instanceof _PdfStream) {
                    var stream = flateStream.stream;
                    bytes = stream.getByteRange(stream.start, stream.end);
                }
                else {
                    bytes = [];
                }
            }
            else {
                bytes = originalStream.getBytes();
                if ((!bytes || bytes.length === 0) && originalStream instanceof _PdfContentStream) {
                    bytes = originalStream._bytes;
                }
            }
        }
        else {
            bytes = originalStream.getBytes();
            if ((!bytes || bytes.length === 0) && originalStream instanceof _PdfContentStream) {
                bytes = originalStream._bytes;
            }
        }
        var content = new _PdfContentStream(Array.from(bytes));
        content._isImage = imageStream;
        content.dictionary = this._copyDictionary(originalStream.dictionary);
        content.dictionary._updated = true;
        return content;
    };
    _PdfCopier.prototype._copyReference = function (element) {
        if (this._traversedObjects.has(element)) {
            return this._traversedObjects.get(element);
        }
        else {
            this._traversedObjects.set(element, null);
            var dereferencedValue = this._sourceCrossReference._fetch(element); // eslint-disable-line
            var copyValue = this._copy(dereferencedValue); // eslint-disable-line
            if (copyValue instanceof _PdfDictionary || copyValue instanceof _PdfBaseStream) {
                var newRef = this._addToDestination(copyValue);
                this._traversedObjects.set(element, newRef);
                return newRef;
            }
            else {
                this._traversedObjects.set(element, copyValue);
                return copyValue;
            }
        }
    };
    _PdfCopier.prototype._addToDestination = function (element) {
        var newRef = this._targetCrossReference._getNextReference();
        this._targetCrossReference._cacheMap.set(newRef, element);
        element.objId = newRef.objectNumber + " " + newRef.generationNumber;
        return newRef;
    };
    return _PdfCopier;
}());
export { _PdfCopier };
