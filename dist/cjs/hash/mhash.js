"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MHASH_PRESET = void 0;
const tslib_1 = require("tslib");
const ImageDataWrapper_js_1 = require("../ImgClass/ImageDataWrapper.js");
const ImgHash_js_1 = tslib_1.__importDefault(require("../ImgHash.js"));
const util_js_1 = require("../util.js");
exports.MHASH_PRESET = {
    sampleSize: 8,
    convertSequence: 'gr',
    luma: ImageDataWrapper_js_1.LUMA_COEFFICIENTS.NTSC,
};
/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const mhash = (img, option = {}) => {
    var _a, _b;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : exports.MHASH_PRESET.sampleSize;
    const luma_c = (_b = option.luma) !== null && _b !== void 0 ? _b : exports.MHASH_PRESET.luma;
    //  const convertSequence = option.convertSequence ?? MHASH_PRESET.convertSequence;
    const sample = img.resize({ width: sampleSize, height: sampleSize }).getImageDataWrapper();
    const imgarray = new Array(sampleSize);
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = sample.getLuminance(x, y, luma_c);
        }
    }
    const med = (0, util_js_1.median)(imgarray);
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += (imgarray[x][y] > med ? '1' : '0');
        }
    }
    return new ImgHash_js_1.default('mhash', result, 'bin');
};
exports.default = mhash;
//# sourceMappingURL=mhash.js.map