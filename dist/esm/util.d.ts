import ImgClass from './ImgClass/ImgClass';
/**
 * comvert image
 * @param img Jimp img object
 * @param w Width
 * @param h height
 * @param sequence 'rg'(resize->grayscale) 'gr'(grayscale->resize)
 */
export declare const imgConvert: (img: ImgClass, w: number, h: number, sequence: 'rg' | 'gr') => void;
/**
 * get Average (mean)
 * @param array 2-dimensional array
 * @returns average
 */
export declare const average: (array: number[][]) => number;
/**
 * get Median
 * @param array 2-dimensional array
 * @returns median value
 */
export declare const median: (array: number[][]) => number;
/**
 * get representantive value
 * @param array 2-dimensional array
 * @param represent average | median
 * @returns representantive value
 */
export declare const representativeValue: (array: number[][], represent: 'average' | 'median') => number;
//# sourceMappingURL=util.d.ts.map