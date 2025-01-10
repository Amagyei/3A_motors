import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { _PdfName, _stringToBytes } from '@syncfusion/ej2-pdf';
/**
 * ImageStructureBase
 *
 * @hidden
 */
var ImageStructureBase = /** @class */ (function () {
    function ImageStructureBase(stream, fontDictionary) {
        this.mIsImageStreamParsed = false;
        this.mIsImageInterpolated = false;
        this.isDualFilter = false;
        this.numberOfComponents = 0;
        if (!isNullOrUndefined(fontDictionary)) {
            this.mImageStream = stream;
            this.mImageDictionary = fontDictionary;
        }
    }
    /**
     * @private
     *@returns {void}
     */
    ImageStructureBase.prototype.getImageStream = function () {
        this.mIsImageStreamParsed = true;
        var IsDecodeFilterDefined = true;
        var ImageDictionary = this.mImageDictionary;
        this.getImageInterpolation(ImageDictionary);
        var imageFilter = this.setImageFilter();
        var imageUnit8Array = this.imageStream();
        if (isNullOrUndefined(imageFilter)) {
            this.mImageFilter.push('FlateDecode');
            IsDecodeFilterDefined = false;
        }
        if (!isNullOrUndefined(imageFilter)) {
            for (var i = 0; i < imageFilter.length; i++) {
                if (imageFilter.length > 1) {
                    this.isDualFilter = true;
                }
                switch (imageFilter[parseInt(i.toString(), 10)]) {
                    case 'DCTDecode': {
                        if (!this.mImageDictionary.has('SMask') && !this.mImageDictionary.has('Mask')) {
                            var colorSpace = this.setColorSpace();
                            if (colorSpace.name === 'DeviceCMYK' || colorSpace.name === 'DeviceN' || colorSpace.name === 'DeviceGray' || colorSpace.name === 'Separation' || colorSpace.name === 'DeviceRGB' || (colorSpace.name === 'ICCBased' && this.numberOfComponents === 4)) {
                                if (colorSpace.name === 'DeviceRGB' && (this.mImageDictionary.has('DecodeParms') || this.mImageDictionary.has('Decode'))) {
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            this.mImageFilter = null;
            return imageUnit8Array;
        }
        return null;
    };
    ImageStructureBase.prototype.setColorSpace = function () {
        if (isNullOrUndefined(this.mColorspace)) {
            this.getColorSpace();
            return this.mColorspace;
        }
    };
    ImageStructureBase.prototype.getColorSpace = function () {
        if (this.mImageDictionary.has('ColorSpace')) {
            this.internalColorSpace = '';
            var value = null;
            if (this.mImageDictionary.has('ColorSpace')) {
                var array = this.mImageDictionary.getArray('ColorSpace');
                if (array && Array.isArray(array) && array.length > 0) {
                    value = this.mImageDictionary.get('ColorSpace');
                }
            }
            if (this.mImageDictionary.get('ColorSpace') instanceof _PdfName) {
                this.mColorspace = this.mImageDictionary.get('ColorSpace');
            }
        }
    };
    ImageStructureBase.prototype.setImageFilter = function () {
        if (isNullOrUndefined(this.mImageFilter)) {
            this.mImageFilter = this.getImageFilter();
        }
        return this.mImageFilter;
    };
    ImageStructureBase.prototype.getImageFilter = function () {
        var imageFilter = [];
        if (!isNullOrUndefined(this.mImageDictionary)) {
            if (this.mImageDictionary.has('Filter')) {
                if (this.mImageDictionary.get('Filter') instanceof _PdfName) {
                    imageFilter.push(this.mImageDictionary.get('Filter').name);
                }
            }
        }
        return imageFilter;
    };
    ImageStructureBase.prototype.getImageInterpolation = function (imageDictionary) {
        if (!isNullOrUndefined(imageDictionary) && imageDictionary.has('Interpolate')) {
            this.mIsImageInterpolated = imageDictionary.get('Interpolate');
        }
    };
    ImageStructureBase.prototype.imageStream = function () {
        var content = _stringToBytes(this.mImageStream.getString(), false, true);
        return content;
    };
    return ImageStructureBase;
}());
export { ImageStructureBase };
