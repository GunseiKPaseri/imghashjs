"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jimp_1 = tslib_1.__importDefault(require("jimp"));
class JimpImgClass {
    constructor(x) {
        this.img = x;
    }
    init(blobstr) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.img = yield jimp_1.default.read(blobstr);
            return this;
        });
    }
    getPixelRGB(x, y) {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        return this.img.getPixelColor(x, y);
    }
    resize(width, height, algorithm) {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        this.img.resize(width, height, jimp_1.default.RESIZE_BICUBIC);
    }
    grayscale() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        this.img.grayscale();
    }
    clone() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        return new JimpImgClass(this.img.clone());
    }
    raw() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        return this.img;
    }
}
exports.default = JimpImgClass;
//# sourceMappingURL=JimpImgClass.js.map