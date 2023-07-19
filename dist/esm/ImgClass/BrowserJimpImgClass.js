import { __awaiter } from "tslib";
import Jimp from 'jimp/es';
export default class BrowserJimpImgClass {
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
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        return this.img.getPixelColor(x, y);
    }
    resize(width, height, algorithm) {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        this.img.resize(width, height, Jimp.RESIZE_BICUBIC);
    }
    grayscale() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        this.img.grayscale();
    }
    clone() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        return new BrowserJimpImgClass(this.img.clone());
    }
    raw() {
        if (!this.img)
            throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.');
        return this.img;
    }
}
//# sourceMappingURL=BrowserJimpImgClass.js.map