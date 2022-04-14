"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ImgHash_1 = tslib_1.__importDefault(require("./ImgHash"));
const util_1 = require("./util");
const PHASH_SAMPLE_SIZE = 32;
const INV_SQRT_2 = 1 / Math.sqrt(2.0);
const DCTCoefficients = (n) => (n === 0 ? INV_SQRT_2 : 1);
const MemoCOS = {};
const initCOS = (N) => {
    if (MemoCOS[N])
        return MemoCOS[N];
    MemoCOS[N] = new Array(N);
    const cosines = MemoCOS[N];
    for (let k = 0; k < N; k++) {
        cosines[k] = new Array(N);
        const t = ((2 * k + 1) / (2.0 * N)) * Math.PI;
        for (let n = 0; n < N; n++) {
            cosines[k][n] = Math.cos(t * n);
        }
    }
    return cosines;
};
let COS = initCOS(PHASH_SAMPLE_SIZE);
const applyDCT = (f, size, sampleSize) => {
    COS = initCOS(sampleSize);
    const F = new Array(size);
    for (let u = 0; u < size; u++) {
        F[u] = new Array(size);
        for (let v = 0; v < size; v++) {
            let sum = 0;
            for (let i = 0; i < sampleSize; i++) {
                for (let j = 0; j < sampleSize; j++) {
                    sum += COS[i][u] * COS[j][v] * f[i][j];
                }
            }
            F[u][v] = sum * (DCTCoefficients(u) * DCTCoefficients(v)) / 4;
        }
    }
    return F;
};
/**
 * Perseptual Hash (use DCT)
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns phash
 */
const phash = (img, option = {}) => {
    var _a, _b, _c;
    const DCTSize = (_a = option.DCTSize) !== null && _a !== void 0 ? _a : 32;
    const lowSize = (_b = option.lowSize) !== null && _b !== void 0 ? _b : 8;
    const convertSequence = (_c = option.convertSequence) !== null && _c !== void 0 ? _c : 'rg';
    (0, util_1.imgConvert)(img, DCTSize, DCTSize, convertSequence);
    const imgarray = new Array(DCTSize);
    for (let x = 0; x < DCTSize; x++) {
        imgarray[x] = new Array(DCTSize);
        for (let y = 0; y < DCTSize; y++) {
            imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff;
        }
    }
    const dct = applyDCT(imgarray, lowSize, DCTSize);
    let sum = 0;
    for (let x = 0; x < lowSize; x++) {
        for (let y = 0; y < lowSize; y++) {
            sum += dct[x][y];
        }
    }
    const avg = sum / (lowSize * lowSize);
    let result = '';
    for (let x = 0; x < lowSize; x++) {
        for (let y = 0; y < lowSize; y++) {
            result += (dct[x][y] > avg ? '1' : '0');
        }
    }
    return new ImgHash_1.default('phash', result, 'bin');
};
exports.default = phash;
//# sourceMappingURL=phash.js.map