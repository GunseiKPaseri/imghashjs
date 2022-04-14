"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_';
const table = Object.fromEntries(alphabet.split('').map((x, i) => [x, i]));
/**
 * ImgHash Object
 */
class ImgHash {
    /**
     *
     * @param type hash type string
     * @param byte8 hash
     * @type hash string meaning (default 'hex')
     */
    constructor(type, byte8, hextype) {
        var _a, _b, _c, _d;
        this.type = type;
        if (typeof byte8 === 'string') {
            if (hextype === '64byte' || hextype === 'bin') {
                const bin = (hextype === 'bin' ? byte8 : byte8.split('').map(x => { var _a; return ((_a = table[x]) !== null && _a !== void 0 ? _a : 0).toString(2).padStart(6, '0'); }).join(''));
                this.byte = (_b = (_a = bin.padStart(Math.ceil(bin.length / 8) * 8, '0').match(/.{8}/g)) === null || _a === void 0 ? void 0 : _a.map(x => parseInt(x, 2))) !== null && _b !== void 0 ? _b : [];
            }
            else {
                // hex
                this.byte = (_d = (_c = byte8.match(/.{2}/g)) === null || _c === void 0 ? void 0 : _c.map(x => parseInt(x, 16))) !== null && _d !== void 0 ? _d : [];
            }
        }
        else {
            this.byte = byte8;
        }
    }
    /**
     * base 2 hash string
     */
    get bin() {
        return this.byte.map(x => x.toString(2).padStart(8, '0')).join('');
    }
    /**
     * base 16 hash string
     */
    get hex() {
        return this.byte.map(x => x.toString(16).padStart(2, '0')).join('');
    }
    /**
     * get hash string
     */
    toString() {
        return this.hex;
    }
    /**
     * base 64 hash string
     * (This is the same format as the `jimpimg.hash()`)
     */
    get bit64() {
        var _a, _b;
        return (_b = (_a = this.bin.padStart(Math.ceil(this.byte.length * 8 / 6) * 6, '0').match(/.{6}/g)) === null || _a === void 0 ? void 0 : _a.map(x => alphabet[parseInt(x, 2)]).join('')) !== null && _b !== void 0 ? _b : '';
    }
    /**
     * Hash Uint8Array
     */
    get uint8array() {
        return new Uint8Array(this.byte);
    }
    /**
     * Calculate Hamming Distance
     * @param hash targetHash
     * @returns
     */
    distanceTo(hash) {
        if (this.type !== hash.type)
            throw new Error(`Different hash can't compare(${this.type} <==> ${hash.type})`);
        let distance = 0;
        for (let i = 0; i < this.byte.length; i++) {
            let t = this.byte[i] ^ hash.byte[i];
            while (t) {
                if (t & 1)
                    distance++;
                t >>= 1;
            }
        }
        return distance;
    }
    /**
     * Calculation Degree Of Similarity (0 ... totally different, 1 ... unlimited match )
     * @param imghash
     * @returns
     */
    degreeOfSimilarity(hash) {
        const distance = this.distanceTo(hash);
        return 1 - (distance / (this.byte.length * 8));
    }
}
exports.default = ImgHash;
//# sourceMappingURL=ImgHash.js.map