import { ImageDataWrapper } from './ImageDataWrapper';
import ImgClass from './ImgClass';
/**
 * Img Object
 */
export default class BrowserCanvas implements ImgClass {
  private ctx: CanvasRenderingContext2D;
  readonly width: number;
  readonly height: number;

  constructor (img: CanvasImageSource, option?: {width: number, height: number}){
    const imgWidth = ('width' in img && typeof img.width === 'number' ? img.width : 10)
    const imgHeight = ('height' in img && typeof img.height === 'number' ? img.height : 10)
    this.width = option?.width ?? imgWidth;
    this.height = option?.height ?? imgHeight;

    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    const newctx = canvas.getContext('2d');
    if(newctx === null) throw new Error('can\'t create 2d context');
    newctx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, this.width, this.height);
    this.ctx = newctx;
  }

  resize(option?: {width: number, height: number}) {
    return new BrowserCanvas(this.ctx.canvas, option)
  }
  clone() {
    return new BrowserCanvas(this.ctx.canvas)
  }

  getImageDataWrapper() {
    return new ImageDataWrapper(this.ctx.getImageData(0, 0, this.width, this.height));
  }
}
