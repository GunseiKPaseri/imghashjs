import Jimp from 'jimp';
import ImgHash from './ImgHash';
/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param sampleSize resize square size(=8)
 * @returns ahash
 */
declare const mhash: (img: Jimp, sampleSize?: number) => ImgHash;
export default mhash;
