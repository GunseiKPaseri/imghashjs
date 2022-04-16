import ImgClass from './ImgClass';
export default class BrowserJimpImgClass implements ImgClass {
    private img;
    init(blobstr: string): Promise<this>;
    getPixelRGB(x: number, y: number): number;
    resize(width: number, height: number, algorithm: 'BICUBIC'): void;
    grayscale(): void;
}
//# sourceMappingURL=BrowserJimpImgClass.d.ts.map