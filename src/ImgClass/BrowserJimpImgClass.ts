import Jimp from 'jimp/browser/lib/jimp'

import ImgClass from './ImgClass'

export default class BrowserJimpImgClass implements ImgClass {
  private img: Jimp | undefined

  constructor (x?:Jimp) {
    this.img = x
  }

  async init (blobstr: string) {
    this.img = await Jimp.read(blobstr)
    return this
  }

  getPixelRGB (x: number, y: number): number {
    if (!this.img) throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.')
    return this.img.getPixelColor(x, y)
  }

  resize (width: number, height: number, algorithm: 'BICUBIC'): void {
    if (!this.img) throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.')
    this.img.resize(width, height, Jimp.RESIZE_BICUBIC)
  }

  grayscale (): void {
    if (!this.img) throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.')
    this.img.grayscale()
  }

  clone (): BrowserJimpImgClass {
    if (!this.img) throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.')
    return new BrowserJimpImgClass(this.img.clone())
  }

  raw () {
    if (!this.img) throw new Error('img hasn\'t been loaded yet. You should initialize by `.init()`.')
    return this.img
  }
}
