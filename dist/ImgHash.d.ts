/**
 * ImgHash Object
 */
export default class ImgHash {
    readonly type: string;
    readonly byte: number[];
    /**
     *
     * @param type hash type string
     * @param byte8 hash
     * @type hash string meaning (default 'hex')
     */
    constructor(type: string, byte8: number[] | string, hextype?: 'hex' | '64byte' | 'bin');
    /**
     * base 2 hash string
     */
    get bin(): string;
    /**
     * base 16 hash string
     */
    get hex(): string;
    /**
     * get hash string
     */
    toString(): string;
    /**
     * base 64 hash string
     * (This is the same format as the `jimpimg.hash()`)
     */
    get bit64(): string;
    /**
     * Hash Uint8Array
     */
    get uint8array(): Uint8Array;
    /**
     * Calculate Hamming Distance
     * @param hash targetHash
     * @returns
     */
    distanceTo(hash: ImgHash): number;
    /**
     * Calculation Degree Of Similarity (0 ... totally different, 1 ... unlimited match )
     * @param imghash
     * @returns
     */
    degreeOfSimilarity(hash: ImgHash): number;
}
