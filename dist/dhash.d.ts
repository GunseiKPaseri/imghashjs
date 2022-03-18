import Jimp from 'jimp';
import ImgHash from './ImgHash';
/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param sampleSize resize square size(=8)
 * @returns dhash
 */
declare const dhash: (img: Jimp, sampleSize?: number) => ImgHash;
export default dhash;
