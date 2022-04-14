"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ImgHash_1 = tslib_1.__importDefault(require("./ImgHash"));
const util_1 = require("./util");
const MHASH_SAMPLE_SIZE = 8;
/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const mhash = (img, option = {}) => {
    var _a, _b;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : MHASH_SAMPLE_SIZE;
    const convertSequence = (_b = option.convertSequence) !== null && _b !== void 0 ? _b : 'rg';
    (0, util_1.imgConvert)(img, sampleSize, sampleSize, convertSequence);
    const imgarray = new Array(sampleSize);
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
        }
    }
    const med = (0, util_1.median)(imgarray);
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += (imgarray[x][y] > med ? '1' : '0');
        }
    }
    return new ImgHash_1.default('ahash', result, 'bin');
};
exports.default = mhash;
//# sourceMappingURL=mhash.js.map