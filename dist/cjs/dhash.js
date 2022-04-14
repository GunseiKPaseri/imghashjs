"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DHASH_PRESET = void 0;
const tslib_1 = require("tslib");
const ImgHash_1 = tslib_1.__importDefault(require("./ImgHash"));
const util_1 = require("./util");
const DHASH_SAMPLE_SIZE = 8;
/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
const PyPIImgHash = {
    convertSequence: 'gr',
    larger: 'right',
    byteReader: 'vertically'
};
/**
 * AHASH option preset
 */
exports.DHASH_PRESET = { PyPIImgHash };
/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param option
 * @returns dhash
 */
const dhash = (img, option = {}) => {
    var _a, _b;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : DHASH_SAMPLE_SIZE;
    const diffComputesHorizontally = option.diffCompute !== 'vertically';
    const isByteReadingHorizontally = option.byteReader !== 'vertically';
    const isGT = option.larger === 'left';
    const convertSequence = (_b = option.convertSequence) !== null && _b !== void 0 ? _b : 'rg';
    const h = (diffComputesHorizontally ? 1 : 0);
    const v = (diffComputesHorizontally ? 0 : 1);
    (0, util_1.imgConvert)(img, sampleSize + h, sampleSize + v, convertSequence);
    const imgarray = new Array(sampleSize + h);
    for (let x = 0; x < sampleSize + h; x++) {
        imgarray[x] = new Array(sampleSize + v);
        for (let y = 0; y < sampleSize + v; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
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
    return new ImgHash_1.default('dhash', result, 'bin');
};
exports.default = dhash;
//# sourceMappingURL=dhash.js.map