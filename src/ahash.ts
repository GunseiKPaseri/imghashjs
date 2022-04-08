import Jimp from 'jimp'
import ImgHash from './ImgHash'
import { average, imgConvert } from './util'
const AHASH_SAMPLE_SIZE = 8

/**
 * dhash option
 */
export interface AHASH_OPTION{
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
  /**
   * bytereading horizontally | vertically
   */
  byteReader?: 'horizontally' | 'vertically'
}

/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
const PyPIImgHash: AHASH_OPTION = {
  convertSequence: 'gr',
  byteReader: 'vertically'
}

/**
 * AHASH option preset
 */
export const AHASH_PRESET = { PyPIImgHash }

/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const ahash = (img: Jimp, option: AHASH_OPTION = {}) => {
  const sampleSize = option.sampleSize ?? AHASH_SAMPLE_SIZE
  const convertSequence = option.convertSequence ?? 'rg'
  const isByteReadingHorizontally = option.byteReader !== 'vertically'

  imgConvert(img, sampleSize, sampleSize, convertSequence)

  const imgarray: number[][] = new Array(sampleSize)

  for (let x = 0; x < sampleSize; x++) {
    imgarray[x] = new Array(sampleSize)
    for (let y = 0; y < sampleSize; y++) {
      imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff
    }
  }
  const avg = average(imgarray)

  let result = ''

  for (let x = 0; x < sampleSize; x++) {
    for (let y = 0; y < sampleSize; y++) {
      result += ((isByteReadingHorizontally ? imgarray[x][y] : imgarray[y][x]) > avg ? '1' : '0')
    }
  }
  return new ImgHash('ahash', result, 'bin')
}

export default ahash
