import { type LUM_C } from '../ImgClass/ImageDataWrapper.js';
import ImgClass from '../ImgClass/ImgClass.js';
import ImgHash from '../ImgHash.js';
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
     * convert sequence (=rg) **IGNORED**
     * r: resize
     * g: glayscale
     */
    convertSequence?: 'rg' | 'gr';
    /**
     * luma coefficients
     */
    luma?: LUM_C;
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
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
/**
 * DHASH option preset
 */
export declare const DHASH_PRESET: {
    sampleSize: number;
    diffCompute: "vertically";
    convertSequence: "gr";
    luma: {
        r: number;
        g: number;
        b: number;
    };
    byteReader: "vertically";
    larger: "left";
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