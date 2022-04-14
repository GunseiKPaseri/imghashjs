import Jimp from 'jimp';
import ImgHash from './ImgHash.js';
/**
 * mhash option
 */
export interface MHASH_OPTION {
    /**
     * resize square size (=8)
     */
    sampleSize?: number;
    /**
     * convert sequence (=rg)
     * r: resize
     * g: glayscale
     */
    convertSequence?: 'rg' | 'gr';
}
/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
declare const mhash: (img: Jimp, option?: MHASH_OPTION) => ImgHash;
export default mhash;
//# sourceMappingURL=mhash.d.ts.map