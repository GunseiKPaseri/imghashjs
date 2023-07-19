import { LUMA_COEFFICIENTS } from '../ImgClass/ImageDataWrapper.js';
import ImgHash from '../ImgHash.js';
import { median } from '../util.js';
export const MHASH_PRESET = {
    sampleSize: 8,
    convertSequence: 'gr',
    luma: LUMA_COEFFICIENTS.NTSC,
};
/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const mhash = (img, option = {}) => {
    var _a, _b;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : MHASH_PRESET.sampleSize;
    const luma_c = (_b = option.luma) !== null && _b !== void 0 ? _b : MHASH_PRESET.luma;
    //  const convertSequence = option.convertSequence ?? MHASH_PRESET.convertSequence;
    const sample = img.resize({ width: sampleSize, height: sampleSize }).getImageDataWrapper();
    const imgarray = new Array(sampleSize);
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = sample.getLuminance(x, y, luma_c);
        }
    }
    const med = median(imgarray);
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += (imgarray[x][y] > med ? '1' : '0');
        }
    }
    return new ImgHash('mhash', result, 'bin');
};
export default mhash;
//# sourceMappingURL=mhash.js.map