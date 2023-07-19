import { LUMA_COEFFICIENTS } from '../ImgClass/ImageDataWrapper.js';
import ImgHash from '../ImgHash.js';
import { average } from '../util.js';
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
export const AHASH_PRESET = {
    byteReader: 'vertically',
    convertSequence: 'gr',
    luma: LUMA_COEFFICIENTS.NTSC,
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
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : AHASH_PRESET.sampleSize;
    //const convertSequence = option.convertSequence ?? AHASH_PRESET.convertSequence
    const isByteReadingHorizontally = ((_b = option.byteReader) !== null && _b !== void 0 ? _b : AHASH_PRESET.byteReader) !== 'vertically';
    const luma_c = (_c = option.luma) !== null && _c !== void 0 ? _c : AHASH_PRESET.luma;
    const imgarray = new Array();
    const sample = img.resize({ width: sampleSize, height: sampleSize }).getImageDataWrapper();
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = sample.getLuminance(x, y, luma_c);
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