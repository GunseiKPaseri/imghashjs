import Jimp from 'jimp';
import ImgHash from './ImgHash';
/**
 * dhash option
 */
export interface DHASH_OPTION {
    /**
     * resize square size (=8)
     */
    sampleSize?: number;
    /**
     * do you calc different horizontally? (=true)
     */
    diffComputesHorizontally?: boolean;
    /**
     * convert sequence (=rg)
     * r: resize
     * g: glayscale
     */
    convertSequence?: 'rg' | 'gr';
}
/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param option
 * @returns dhash
 */
declare const dhash: (img: Jimp, option?: DHASH_OPTION) => ImgHash;
export default dhash;
