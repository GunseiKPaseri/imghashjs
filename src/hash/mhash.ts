import { LUMA_COEFFICIENTS, type LUM_C } from '../ImgClass/ImageDataWrapper.js'
import ImgClass from '../ImgClass/ImgClass.js'
import ImgHash from '../ImgHash.js'
import { median } from '../util.js'

/**
 * mhash option
 */
export interface MHASH_OPTION{
  /**
   * resize square size (=8)
   */
  sampleSize?: number
  /**
   * convert sequence (=rg) **IGNORED**
   * r: resize
   * g: glayscale
   */
  convertSequence?: 'rg' | 'gr'
  /**
   * luma coefficients
   */
  luma?: LUM_C
}

export const MHASH_PRESET = {
  sampleSize: 8,
  convertSequence: 'gr',
  luma: LUMA_COEFFICIENTS.NTSC,
} satisfies Required<MHASH_OPTION>

/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const mhash = (img: ImgClass, option: MHASH_OPTION = {}) => {
  const sampleSize = option.sampleSize ?? MHASH_PRESET.sampleSize
  const luma_c = option.luma ?? MHASH_PRESET.luma;

//  const convertSequence = option.convertSequence ?? MHASH_PRESET.convertSequence;

  const sample = img.resize({width: sampleSize, height: sampleSize}).getImageDataWrapper()

  const imgarray: number[][] = new Array(sampleSize)

  for (let x = 0; x < sampleSize; x++) {
    imgarray[x] = new Array(sampleSize)
    for (let y = 0; y < sampleSize; y++) {
      imgarray[x][y] = sample.getLuminance(x, y, luma_c)
    }
  }
  const med = median(imgarray)

  let result = ''

  for (let x = 0; x < sampleSize; x++) {
    for (let y = 0; y < sampleSize; y++) {
      result += (imgarray[x][y] > med ? '1' : '0')
    }
  }
  return new ImgHash('mhash', result, 'bin')
}

export default mhash
