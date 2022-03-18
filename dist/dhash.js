import ImgHash from './ImgHash';
import { imgConvert } from './util';
const DHASH_SAMPLE_SIZE = 8;
/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param option
 * @returns dhash
 */
const dhash = (img, option = {}) => {
    var _a, _b, _c;
    const sampleSize = (_a = option.sampleSize) !== null && _a !== void 0 ? _a : DHASH_SAMPLE_SIZE;
    const diffComputesHorizontally = (_b = option.diffComputesHorizontally) !== null && _b !== void 0 ? _b : true;
    const convertSequence = (_c = option.convertSequence) !== null && _c !== void 0 ? _c : 'rg';
    const h = (diffComputesHorizontally ? 1 : 0);
    const v = (diffComputesHorizontally ? 0 : 1);
    imgConvert(img, sampleSize + h, sampleSize + v, convertSequence);
    const imgarray = new Array(sampleSize + h);
    for (let x = 0; x < sampleSize + h; x++) {
        imgarray[x] = new Array(sampleSize + v);
        for (let y = 0; y < sampleSize + v; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
        }
    }
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += (imgarray[x][y] > imgarray[x + h][y + v] ? '1' : '0');
        }
    }
    return new ImgHash('dhash', result, 'bin');
};
export default dhash;
//# sourceMappingURL=dhash.js.map