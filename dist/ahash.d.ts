import Jimp from 'jimp';
import ImgHash from './ImgHash';
/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param sampleSize resize square size(=8)
 * @returns ahash
 */
declare const ahash: (img: Jimp, sampleSize?: number) => ImgHash;
export default ahash;
