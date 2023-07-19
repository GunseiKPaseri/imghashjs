"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DHASH_PRESET = void 0;
const tslib_1 = require("tslib");
const ImageDataWrapper_js_1 = require("../ImgClass/ImageDataWrapper.js");
const ImgHash_js_1 = tslib_1.__importDefault(require("../ImgHash.js"));
/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
// const PyPIImgHash: DHASH_OPTION = {
//   convertSequence: 'gr',
//   larger: 'right',
//   byteReader: 'vertically'
// }
/**
 * DHASH option preset
 */
exports.DHASH_PRESET = {
    sampleSize: 8,
    diffCompute: 'vertically',
    convertSequence: 'gr',
    luma: ImageDataWrapper_js_1.LUMA_COEFFICIENTS.NTSC,
    byteReader: 'vertically',
    larger: 'left'
};
/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param option
 * @returns dhash
 */
const dhash = (img, option = {}) => {
    var _a, _b, _c, _d, _e;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : exports.DHASH_PRESET.sampleSize;
    const diffComputesHorizontally = ((_b = option.diffCompute) !== null && _b !== void 0 ? _b : exports.DHASH_PRESET.diffCompute) !== 'vertically';
    const isByteReadingHorizontally = ((_c = option.byteReader) !== null && _c !== void 0 ? _c : exports.DHASH_PRESET.byteReader) !== 'vertically';
    const isGT = ((_d = option.larger) !== null && _d !== void 0 ? _d : exports.DHASH_PRESET.larger) === 'left';
    const luma_c = (_e = option.luma) !== null && _e !== void 0 ? _e : exports.DHASH_PRESET.luma;
    //const convertSequence = option.convertSequence ?? DHASH_PRESET
    const h = (diffComputesHorizontally ? 1 : 0);
    const v = (diffComputesHorizontally ? 0 : 1);
    const sample = img.resize({ width: sampleSize + h, height: sampleSize + v }).getImageDataWrapper();
    const imgarray = new Array(sampleSize + h);
    for (let x = 0; x < sampleSize + h; x++) {
        imgarray[x] = new Array(sampleSize + v);
        for (let y = 0; y < sampleSize + v; y++) {
            imgarray[x][y] = sample.getLuminance(x, y, luma_c);
        }
    }
    // console.log(imgarray)
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += ((isByteReadingHorizontally
                ? (isGT ? imgarray[x][y] > imgarray[x + h][y + v] : imgarray[x][y] < imgarray[x + h][y + v])
                : (isGT ? imgarray[y][x] > imgarray[y + h][x + v] : imgarray[y][x] < imgarray[y + h][x + v]))
                ? '1'
                : '0');
        }
    }
    return new ImgHash_js_1.default('dhash', result, 'bin');
};
exports.default = dhash;
//# sourceMappingURL=dhash.js.map