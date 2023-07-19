import { type LUM_C } from '../ImgClass/ImageDataWrapper.js';
import ImgClass from '../ImgClass/ImgClass.js';
import ImgHash from '../ImgHash.js';
/**
 * mhash option
 */
export interface MHASH_OPTION {
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
}
export declare const MHASH_PRESET: {
    sampleSize: number;
    convertSequence: "gr";
    luma: {
        r: number;
        /**
         * convert sequence (=rg) **IGNORED**
         * r: resize
         * g: glayscale
         */
        g: number;
        b: number;
    };
};
/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
declare const mhash: (img: ImgClass, option?: MHASH_OPTION) => ImgHash;
export default mhash;
//# sourceMappingURL=mhash.d.ts.map