import Jimp from 'jimp';
import ImgHash from './ImgHash';
/**
 * dhash option
 */
export interface AHASH_OPTION {
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
    /**
     * bytereading horizontally | vertically
     */
    byteReader?: 'horizontally' | 'vertically';
}
/**
 * AHASH option preset
 */
export declare const AHASH_PRESET: {
    PyPIImgHash: AHASH_OPTION;
};
/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
declare const ahash: (img: Jimp, option?: AHASH_OPTION) => ImgHash;
export default ahash;
//# sourceMappingURL=ahash.d.ts.map