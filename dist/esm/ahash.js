import ImgHash from './ImgHash.js';
import { average, imgConvert } from './util.js';
const AHASH_SAMPLE_SIZE = 8;
/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
const PyPIImgHash = {
    convertSequence: 'gr',
    byteReader: 'vertically'
};
/**
 * AHASH option preset
 */
export const AHASH_PRESET = { PyPIImgHash };
/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const ahash = (img, option = {}) => {
    var _a, _b;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : AHASH_SAMPLE_SIZE;
    const convertSequence = (_b = option.convertSequence) !== null && _b !== void 0 ? _b : 'rg';
    const isByteReadingHorizontally = option.byteReader !== 'vertically';
    imgConvert(img, sampleSize, sampleSize, convertSequence);
    const imgarray = new Array(sampleSize);
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
        }
    }
    const avg = average(imgarray);
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += ((isByteReadingHorizontally ? imgarray[x][y] : imgarray[y][x]) > avg ? '1' : '0');
        }
    }
    return new ImgHash('ahash', result, 'bin');
};
export default ahash;
//# sourceMappingURL=ahash.js.map