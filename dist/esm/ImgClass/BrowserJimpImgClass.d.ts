import Jimp from 'jimp/browser/lib/jimp';
import ImgClass from './ImgClass';
export default class BrowserJimpImgClass implements ImgClass {
    private img;
    constructor(x?: Jimp);
    init(blobstr: string): Promise<this>;
    getPixelRGB(x: number, y: number): number;
    resize(width: number, height: number, algorithm: 'BICUBIC'): void;
    grayscale(): void;
    clone(): BrowserJimpImgClass;
    raw(): Jimp;
}
//# sourceMappingURL=BrowserJimpImgClass.d.ts.map