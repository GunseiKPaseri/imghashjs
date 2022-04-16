import { __awaiter } from "tslib";
import Jimp from 'jimp';
export default class JimpImgClass {
    constructor(x) {
        this.img = x;
    }
    init(blobstr) {
        return __awaiter(this, void 0, void 0, function* () {
            this.img = yield Jimp.read(blobstr);
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
        this.img.resize(width, height, Jimp.RESIZE_BICUBIC);
    }
    grayscale() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet');
        this.img.grayscale();
    }
    raw() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet');
        return this.img;
    }
}
//# sourceMappingURL=JimpImgClass.js.map