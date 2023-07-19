import type { Canvas, Image, SKRSContext2D } from '@napi-rs/canvas'
import { createCanvas } from '@napi-rs/canvas'
import { ImageDataWrapper } from './ImageDataWrapper';
import ImgClass from './ImgClass';
/**
 * Img Object
 */
export default class WasmCanvas implements ImgClass {
  private ctx: SKRSContext2D;
  readonly width: number;
  readonly height: number;

  constructor (img: Canvas | Image, option?: {width: number, height: number}){
    this.width = option?.width ?? img.width;
    this.height = option?.height ?? img.height;

    const canvas = createCanvas(this.width, this.height);
    const newctx = canvas.getContext('2d');
    newctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.width, this.height);
    this.ctx = newctx;
  }
  resize(option?: {width: number, height: number}) {
    return new WasmCanvas(this.ctx.canvas, option)
  }
  clone() {
    return new WasmCanvas(this.ctx.canvas)
  }

  getImageDataWrapper() {
    return new ImageDataWrapper(this.ctx.getImageData(0, 0, this.width, this.height));
  }
}
