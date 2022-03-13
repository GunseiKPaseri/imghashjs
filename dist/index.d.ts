import ahash from './ahash';
import dhash from './dhash';
import phash from './phash';
export { ahash, dhash, phash };
declare const _default: {
    ahash: (img: import("jimp/*"), sampleSize?: number) => import("./ImgHash").default;
    dhash: (img: import("jimp/*"), sampleSize?: number) => import("./ImgHash").default;
    phash: (img: import("jimp/*"), option?: import("./phash").PHASH_SAMPLING_SIZE) => import("./ImgHash").default;
};
export default _default;
