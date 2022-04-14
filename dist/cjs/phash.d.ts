import Jimp from 'jimp';
import ImgHash from './ImgHash.js';
/**
 * phash option
 */
export interface PHASH_OPTION {
    /**
     * DCT Sampling square size (=32)
     */
    DCTSize?: number;
    /**
     *  DCT low frequencies square size (=8)
     */
    lowSize?: number;
    /**
     * convert sequence (=rg)
     * r: resize
     * g: glayscale
     */
    convertSequence?: 'rg' | 'gr';
}
/**
 * Perseptual Hash (use DCT)
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns phash
 */
declare const phash: (img: Jimp, option?: PHASH_OPTION) => ImgHash;
export default phash;
//# sourceMappingURL=phash.d.ts.map