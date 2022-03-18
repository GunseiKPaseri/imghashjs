import ImgHash from './ImgHash';
import { imgConvert } from './util';
const AHASH_SAMPLE_SIZE = 8;
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
    imgConvert(img, sampleSize, sampleSize, convertSequence);
    const imgarray = new Array(sampleSize);
    let sum = 0;
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
            sum += imgarray[x][y];
        }
    }
    const avg = sum / (sampleSize * sampleSize);
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += (imgarray[x][y] > avg ? '1' : '0');
        }
    }
    return new ImgHash('ahash', result, 'bin');
};
export default ahash;
//# sourceMappingURL=ahash.js.map