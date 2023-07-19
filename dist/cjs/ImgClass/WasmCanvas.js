"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("@napi-rs/canvas");
const ImageDataWrapper_1 = require("./ImageDataWrapper");
/**
 * Img Object
 */
class WasmCanvas {
    constructor(img, option) {
        var _a, _b;
        this.width = (_a = option === null || option === void 0 ? void 0 : option.width) !== null && _a !== void 0 ? _a : img.width;
        this.height = (_b = option === null || option === void 0 ? void 0 : option.height) !== null && _b !== void 0 ? _b : img.height;
        const canvas = (0, canvas_1.createCanvas)(this.width, this.height);
        const newctx = canvas.getContext('2d');
        newctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.width, this.height);
        this.ctx = newctx;
    }
    resize(option) {
        return new WasmCanvas(this.ctx.canvas, option);
    }
    clone() {
        return new WasmCanvas(this.ctx.canvas);
    }
    getImageDataWrapper() {
        return new ImageDataWrapper_1.ImageDataWrapper(this.ctx.getImageData(0, 0, this.width, this.height));
    }
}
exports.default = WasmCanvas;
//# sourceMappingURL=WasmCanvas.js.map