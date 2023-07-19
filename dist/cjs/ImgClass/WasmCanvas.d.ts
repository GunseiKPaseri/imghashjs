import type { Canvas, Image } from '@napi-rs/canvas';
import { ImageDataWrapper } from './ImageDataWrapper';
import ImgClass from './ImgClass';
/**
 * Img Object
 */
export default class WasmCanvas implements ImgClass {
    private ctx;
    readonly width: number;
    readonly height: number;
    constructor(img: Canvas | Image, option?: {
        width: number;
        height: number;
    });
    resize(option?: {
        width: number;
        height: number;
    }): WasmCanvas;
    clone(): WasmCanvas;
    getImageDataWrapper(): ImageDataWrapper;
}
//# sourceMappingURL=WasmCanvas.d.ts.map