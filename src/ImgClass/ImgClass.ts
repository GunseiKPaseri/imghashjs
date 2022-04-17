export default interface ImgClass {
  getPixelRGB(x:number, y:number): number
  resize(width: number, height: number, algorithm: 'BICUBIC'): void
  grayscale(): void,
  clone(): ImgClass
}
