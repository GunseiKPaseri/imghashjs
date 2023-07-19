import { ImageDataWrapper } from './ImageDataWrapper';
import ImgClass from './ImgClass';
/**
 * Img Object
 */
export default class BrowserCanvas implements ImgClass {
    private ctx;
    readonly width: number;
    readonly height: number;
    constructor(img: CanvasImageSource, option?: {
        width: number;
        height: number;
    });
    resize(option?: {
        width: number;
        height: number;
    }): BrowserCanvas;
    clone(): BrowserCanvas;
    getImageDataWrapper(): ImageDataWrapper;
}
//# sourceMappingURL=BrowserCanvas.d.ts.map