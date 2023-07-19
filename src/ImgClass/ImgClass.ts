import { ImageDataWrapper } from "./ImageDataWrapper";

export default interface ImgClass {
  readonly width: number;
  readonly height: number;
  getImageDataWrapper(): ImageDataWrapper
  resize(option?: {width: number, height: number}): ImgClass
  clone(): ImgClass
}
