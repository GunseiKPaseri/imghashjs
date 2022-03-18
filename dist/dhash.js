import ImgHash from './ImgHash';
const DHASH_SAMPLE_SIZE = 8;
/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param sampleSize resize square size(=8)
 * @returns dhash
 */
const dhash = (img, sampleSize = DHASH_SAMPLE_SIZE) => {
    img
        .resize(sampleSize + 1, sampleSize)
        .grayscale();
    const imgarray = new Array(sampleSize + 1);
    for (let x = 0; x < sampleSize + 1; x++) {
        imgarray[x] = new Array(sampleSize);
        for (let y = 0; y < sampleSize; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
        }
    }
    let result = '';
    for (let x = 0; x < sampleSize; x++) {
        for (let y = 0; y < sampleSize; y++) {
            result += (imgarray[x][y] > imgarray[x + 1][y] ? '1' : '0');
        }
    }
    return new ImgHash('dhash', result, 'bin');
};
export default dhash;
//# sourceMappingURL=dhash.js.map