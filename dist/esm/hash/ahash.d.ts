import { type LUM_C } from '../ImgClass/ImageDataWrapper.js';
import ImgClass from '../ImgClass/ImgClass.js';
import ImgHash from '../ImgHash.js';
/**
 * dhash option
 */
export interface AHASH_OPTION {
    /**
     * resize square size (=8)
     */
    sampleSize?: number;
    /**
     * convert sequence (=rg) **IGNORED**
     * r: resize
     * g: glayscale
     */
    convertSequence?: 'rg' | 'gr';
    /**
     * luma coefficients
     */
    luma?: LUM_C;
    /**
     * bytereading horizontally | vertically
     */
    byteReader?: 'horizontally' | 'vertically';
}
/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
/**
 * AHASH option preset
 */
export declare const AHASH_PRESET: {
    byteReader: "vertically";
    convertSequence: "gr";
    luma: {
        r: number;
        g: number;
        b: number;
    };
    sampleSize: number;
};
/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
declare const ahash: (img: ImgClass, option?: AHASH_OPTION) => ImgHash;
export default ahash;
//# sourceMappingURL=ahash.d.ts.map