import Jimp from 'jimp';
/**
 * comvert image
 * @param img Jimp img object
 * @param w Width
 * @param h height
 * @param sequence 'rg'(resize->grayscale) 'gr'(grayscale->resize)
 */
export declare const imgConvert: (img: Jimp, w: number, h: number, sequence: 'rg' | 'gr') => void;
