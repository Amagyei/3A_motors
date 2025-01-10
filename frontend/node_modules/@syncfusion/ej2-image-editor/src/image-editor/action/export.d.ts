import { ImageEditor } from '../index';
export declare class Export {
    private parent;
    private lowerContext;
    private imageQuality;
    constructor(parent: ImageEditor);
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    private export;
    getModuleName(): string;
    private updatePvtVar;
    private exportImg;
    private beforeSaveEvent;
    private toSVGImg;
    private toBlobFn;
    private exportToCanvas;
    private drawAnnotation;
    private drawShape;
    private drawPen;
    private downScaleImgCanvas;
    private updateFrame;
    private downloadImg;
    private exportTransformedImage;
    private exportRotate;
    private exportFlip;
    private updateSaveContext;
    private setMaxDim;
}
