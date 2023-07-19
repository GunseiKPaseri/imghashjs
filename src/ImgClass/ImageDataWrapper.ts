export type LUM_C = {r: number, g: number, b: number}
export const LUMA_COEFFICIENTS = {
  // https://qiita.com/yoya/items/96c36b069e74398796f3
  AVERAGE: {r: 1/3, g: 1/3, b: 1/3},
  BT601: {r: 0.299, g: 0.587, b: 0.114},
  BT709: {r: 0.2126, g: 0.7152, b: 0.0722},
  G_ONLY: {r: 0, g: 1, b: 0},
  NTSC: {r: 0.298912, g: 0.586611, b: 0.114478},
  SMPTE240M: {r: 0.212, g: 0.701, b: 0.087},
  YCGCO: {r: 0.25, g: 0.5, b: 0.25},
} satisfies Record<string, LUM_C>;

/**
 * Image Data Wrapper
 */
export class ImageDataWrapper {
  readonly imageData: ImageData;
  readonly width: number;
  readonly height: number;
  constructor (imageData: ImageData) {
    this.imageData = imageData;
    this.width = imageData.width;
    this.height = imageData.height;
  }
  getR(x: number, y:number){
    return this.imageData.data[ (x + y * this.width)*4];
  }
  getG(x: number, y:number){
    return this.imageData.data[ (x + y * this.width)*4 + 1];
  }
  getB(x: number, y:number){
    return this.imageData.data[ (x + y * this.width)*4 + 2];
  }
  getA(x: number, y:number){
    return this.imageData.data[ (x + y * this.width)*4 + 3];
  }
  getLuminance(x: number, y:number, luma: {r: number, g: number, b: number}=LUMA_COEFFICIENTS.NTSC){
    const gamma = this.getR(x,y) * luma.r + this.getG(x,y) * luma.g + this.getB(x,y) * luma.b;
    return (gamma < 0 ? 0 : (gamma > 255 ? 255 : gamma));
  }
  getPixel(x:number,y:number){
    return {
      r: this.getR(x,y),
      g: this.getG(x,y),
      b: this.getB(x,y),
      a: this.getA(x,y),
    }
  }
  getRGB(x:number, y:number){
    return this.imageData.data.slice((x+y*this.width)*4, (x+y*this.width)*4 + 3).reduce((a,b)=> ((a << 8) + b), 0)
  }
}