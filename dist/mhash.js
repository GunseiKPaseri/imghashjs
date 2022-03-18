import ImgHash from './ImgHash';
import { imgConvert } from './util';
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
    imgConvert(img, sampleSize, sampleSize, convertSequence);
    const imgarray = new Array(sampleSize);
    const sortedPx = [];
    for (let x = 0; x < sampleSize; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
            sortedPx.push(imgarray[x][y]);
        }
    }
    sortedPx.sort();
    const allPx = sampleSize * sampleSize;
    const median = (allPx % 2 === 1
        ? sortedPx[allPx / 2 | 0]
        : (sortedPx[allPx / 2 - 1] + sortedPx[allPx / 2]) / 2);
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += (imgarray[x][y] > median ? '1' : '0');
        }
    }
    return new ImgHash('ahash', result, 'bin');
};
export default mhash;
//# sourceMappingURL=mhash.js.map