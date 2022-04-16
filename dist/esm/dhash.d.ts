import ImgClass from './ImgClass/ImgClass.js';
import ImgHash from './ImgHash.js';
/**
 * dhash option
 */
export interface DHASH_OPTION {
    /**
     * resize square size (=8)
     */
    sampleSize?: number;
    /**
     * diffcomputing `"horizontally" | "vertically"`
     */
    diffCompute?: 'horizontally' | 'vertically';
    /**
     * convert sequence (=rg)
     * r: resize
     * g: glayscale
     */
    convertSequence?: 'rg' | 'gr';
    /**
     * bytereading `"horizontally" | "vertically"`
     */
    byteReader?: 'horizontally' | 'vertically';
    /**
     * `left: (left > right)`, `right: (left < right)`
     */
    larger?: 'left' | 'right';
}
/**
 * AHASH option preset
 */
export declare const DHASH_PRESET: {
    PyPIImgHash: DHASH_OPTION;
};
/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param option
 * @returns dhash
 */
declare const dhash: (img: ImgClass, option?: DHASH_OPTION) => ImgHash;
export default dhash;
//# sourceMappingURL=dhash.d.ts.map