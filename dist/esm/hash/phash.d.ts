import { type LUM_C } from '../ImgClass/ImageDataWrapper.js';
import ImgClass from '../ImgClass/ImgClass.js';
import ImgHash from '../ImgHash.js';
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
    /**
     * luma coefficients
     */
    luma?: LUM_C;
}
export declare const PHASH_PRESET: {
    DCTSize: number;
    lowSize: number;
    convertSequence: "gr";
    luma: {
        r: number;
        g: number;
        b: number;
    };
};
/**
 * Perseptual Hash (use DCT)
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns phash
 */
declare const phash: (img: ImgClass, option?: PHASH_OPTION) => ImgHash;
export default phash;
//# sourceMappingURL=phash.d.ts.map