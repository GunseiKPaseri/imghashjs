"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHASH_PRESET = void 0;
const tslib_1 = require("tslib");
const ImageDataWrapper_js_1 = require("../ImgClass/ImageDataWrapper.js");
const ImgHash_js_1 = tslib_1.__importDefault(require("../ImgHash.js"));
const util_js_1 = require("../util.js");
/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
// const PyPIImgHash: AHASH_OPTION = {
//   convertSequence: 'gr',
//   byteReader: 'vertically'
// }
/**
 * AHASH option preset
 */
exports.AHASH_PRESET = {
    byteReader: 'vertically',
    convertSequence: 'gr',
    luma: ImageDataWrapper_js_1.LUMA_COEFFICIENTS.NTSC,
    sampleSize: 8
};
/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const ahash = (img, option = {}) => {
    var _a, _b, _c;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : exports.AHASH_PRESET.sampleSize;
    //const convertSequence = option.convertSequence ?? AHASH_PRESET.convertSequence
    const isByteReadingHorizontally = ((_b = option.byteReader) !== null && _b !== void 0 ? _b : exports.AHASH_PRESET.byteReader) !== 'vertically';
    const luma_c = (_c = option.luma) !== null && _c !== void 0 ? _c : exports.AHASH_PRESET.luma;
    const imgarray = new Array();
    const sample = img.resize({ width: sampleSize, height: sampleSize }).getImageDataWrapper();
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = sample.getLuminance(x, y, luma_c);
        }
    }
    const avg = (0, util_js_1.average)(imgarray);
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += ((isByteReadingHorizontally ? imgarray[x][y] : imgarray[y][x]) > avg ? '1' : '0');
        }
    }
    return new ImgHash_js_1.default('ahash', result, 'bin');
};
exports.default = ahash;
//# sourceMappingURL=ahash.js.map