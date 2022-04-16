/**
 * comvert image
 * @param img Jimp img object
 * @param w Width
 * @param h height
 * @param sequence 'rg'(resize->grayscale) 'gr'(grayscale->resize)
 */
export const imgConvert = (img, w, h, sequence) => {
    if (sequence === 'rg') {
        img.resize(w, h, 'BICUBIC');
        img.grayscale();
    }
    else {
        img.grayscale();
        img.resize(w, h, 'BICUBIC');
    }
};
/**
 * get Average (mean)
 * @param array 2-dimensional array
 * @returns average
 */
export const average = (array) => {
    const values = array.flat();
    const sum = values.reduce((pre, cur) => pre + cur, 0);
    return sum / values.length;
};
/**
 * get Median
 * @param array 2-dimensional array
 * @returns median value
 */
export const median = (array) => {
    const values = array.flat();
    values.sort();
    const size = values.length;
    return (size % 2 === 1 ? values[size / 2 | 0] : (values[size / 2 - 1] + values[size / 2]) / 2);
};
/**
 * get representantive value
 * @param array 2-dimensional array
 * @param represent average | median
 * @returns representantive value
 */
export const representativeValue = (array, represent) => (represent === 'average' ? average(array) : median(array));
//# sourceMappingURL=util.js.map