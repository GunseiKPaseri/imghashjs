import Jimp from 'jimp';
import ImgHash from './ImgHash';
/**
 * phash option
 */
export interface PHASH_SAMPLING_SIZE {
    /**
     * DCT Sampling square size
     */
    DCTSize: number;
    /**
     *  DCT low frequencies square size
     */
    lowSize: number;
}
/**
 * Perseptual Hash (use DCT)
 * @param img Jimp object (**Destroyable**)
 * @param option DCT Sampling Square size(=32) & Low frequencies Square Size(=8) O(DCTSize^2 * lowSize^2)
 * @returns phash
 */
declare const phash: (img: Jimp, option?: PHASH_SAMPLING_SIZE) => ImgHash;
export default phash;
