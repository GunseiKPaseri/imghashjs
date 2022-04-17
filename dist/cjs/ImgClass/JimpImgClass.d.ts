import Jimp from 'jimp';
import ImgClass from './ImgClass';
export default class JimpImgClass implements ImgClass {
    private img;
    constructor(x?: Jimp);
    init(blobstr: string): Promise<this>;
    getPixelRGB(x: number, y: number): number;
    resize(width: number, height: number, algorithm: 'BICUBIC'): void;
    grayscale(): void;
    clone(): JimpImgClass;
    raw(): Jimp;
}
//# sourceMappingURL=JimpImgClass.d.ts.map