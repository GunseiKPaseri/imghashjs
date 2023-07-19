export type LUM_C = {
    r: number;
    g: number;
    b: number;
};
export declare const LUMA_COEFFICIENTS: {
    AVERAGE: {
        r: number;
        g: number;
        b: number;
    };
    BT601: {
        r: number;
        g: number;
        b: number;
    };
    BT709: {
        r: number;
        g: number;
        b: number;
    };
    G_ONLY: {
        r: number;
        g: number;
        b: number;
    };
    NTSC: {
        r: number;
        g: number;
        b: number;
    };
    SMPTE240M: {
        r: number;
        g: number;
        b: number;
    };
    YCGCO: {
        r: number;
        g: number;
        b: number;
    };
};
/**
 * Image Data Wrapper
 */
export declare class ImageDataWrapper {
    readonly imageData: ImageData;
    readonly width: number;
    readonly height: number;
    constructor(imageData: ImageData);
    getR(x: number, y: number): number;
    getG(x: number, y: number): number;
    getB(x: number, y: number): number;
    getA(x: number, y: number): number;
    getLuminance(x: number, y: number, luma?: {
        r: number;
        g: number;
        b: number;
    }): number;
    getPixel(x: number, y: number): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    getRGB(x: number, y: number): number;
}
//# sourceMappingURL=ImageDataWrapper.d.ts.map