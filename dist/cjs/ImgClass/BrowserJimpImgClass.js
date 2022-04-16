"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jimp_1 = tslib_1.__importDefault(require("jimp/browser/lib/jimp"));
class BrowserJimpImgClass {
    init(blobstr) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.img = yield jimp_1.default.read(blobstr);
            return this;
        });
    }
    getPixelRGB(x, y) {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet');
        return this.img.getPixelColor(x, y);
    }
    resize(width, height, algorithm) {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet');
        this.img.resize(width, height, jimp_1.default.RESIZE_BICUBIC);
    }
    grayscale() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet');
        this.img.grayscale();
    }
}
exports.default = BrowserJimpImgClass;
//# sourceMappingURL=BrowserJimpImgClass.js.map