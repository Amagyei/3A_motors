import { _PdfBaseStream, _PdfDictionary } from '@syncfusion/ej2-pdf';
/**
 * ImageStructureBase
 *
 * @hidden
 */
export declare class ImageStructureBase {
    private pdfViewer;
    private pdfViewerBase;
    private mImageDictionary;
    private mIsImageStreamParsed;
    private mIsImageInterpolated;
    private mImageFilter;
    private isDualFilter;
    private mColorspace;
    private numberOfComponents;
    private internalColorSpace;
    private mImageStream;
    constructor(stream: _PdfBaseStream, fontDictionary: _PdfDictionary);
    /**
     * @private
     *@returns {void}
     */
    getImageStream(): Uint8Array;
    private setColorSpace;
    private getColorSpace;
    private setImageFilter;
    private getImageFilter;
    private getImageInterpolation;
    private imageStream;
}
