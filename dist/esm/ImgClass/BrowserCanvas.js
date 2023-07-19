import { ImageDataWrapper } from './ImageDataWrapper';
/**
 * Img Object
 */
export default class BrowserCanvas {
    constructor(img, option) {
        var _a, _b;
        const imgWidth = ('width' in img && typeof img.width === 'number' ? img.width : 10);
        const imgHeight = ('height' in img && typeof img.height === 'number' ? img.height : 10);
        this.width = (_a = option === null || option === void 0 ? void 0 : option.width) !== null && _a !== void 0 ? _a : imgWidth;
        this.height = (_b = option === null || option === void 0 ? void 0 : option.height) !== null && _b !== void 0 ? _b : imgHeight;
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        const newctx = canvas.getContext('2d');
        if (newctx === null)
            throw new Error('can\'t create 2d context');
        newctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, this.width, this.height);
        this.ctx = newctx;
    }
    resize(option) {
        return new BrowserCanvas(this.ctx.canvas, option);
    }
    clone() {
        return new BrowserCanvas(this.ctx.canvas);
    }
    getImageDataWrapper() {
        return new ImageDataWrapper(this.ctx.getImageData(0, 0, this.width, this.height));
    }
}
//# sourceMappingURL=BrowserCanvas.js.map