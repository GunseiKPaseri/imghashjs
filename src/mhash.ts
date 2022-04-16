import ImgClass from './ImgClass/ImgClass.js'
import ImgHash from './ImgHash.js'
import { imgConvert, median } from './util.js'
const MHASH_SAMPLE_SIZE = 8

/**
 * mhash option
 */
export interface MHASH_OPTION{
  /**
   * resize square size (=8)
   */
  sampleSize?: number
  /**
   * convert sequence (=rg)
   * r: resize
   * g: glayscale
   */
  convertSequence?: 'rg' | 'gr'
}

/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const mhash = (img: ImgClass, option: MHASH_OPTION = {}) => {
  const sampleSize = option.sampleSize ?? MHASH_SAMPLE_SIZE

  const convertSequence = option.convertSequence ?? 'rg'

  imgConvert(img, sampleSize, sampleSize, convertSequence)

  const imgarray: number[][] = new Array(sampleSize)

  for (let x = 0; x < sampleSize; x++) {
    imgarray[x] = new Array(sampleSize)
    for (let y = 0; y < sampleSize; y++) {
      imgarray[x][y] = (img.getPixelRGB(x, y) >> 16) & 0xff
    }
  }
  const med = median(imgarray)

  let result = ''

  for (let x = 0; x < sampleSize; x++) {
    for (let y = 0; y < sampleSize; y++) {
      result += (imgarray[x][y] > med ? '1' : '0')
    }
  }
  return new ImgHash('ahash', result, 'bin')
}

export default mhash
