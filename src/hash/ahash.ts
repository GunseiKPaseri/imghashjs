import { LUMA_COEFFICIENTS, type LUM_C } from '../ImgClass/ImageDataWrapper.js'
import ImgClass from '../ImgClass/ImgClass.js'
import ImgHash from '../ImgHash.js'
import { average } from '../util.js'


/**
 * dhash option
 */
export interface AHASH_OPTION{
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
  /**
   * bytereading horizontally | vertically
   */
  byteReader?: 'horizontally' | 'vertically'
}

/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
// const PyPIImgHash: AHASH_OPTION = {
//   convertSequence: 'gr',
//   byteReader: 'vertically'
// }

/**
 * AHASH option preset
 */
export const AHASH_PRESET = {
  byteReader: 'vertically',
  convertSequence: 'gr',
  luma: LUMA_COEFFICIENTS.NTSC,
  sampleSize: 8
} satisfies Required<AHASH_OPTION>;

/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns ahash
 */
const ahash = (img: ImgClass, option: AHASH_OPTION = {}) => {
  const sampleSize = option.sampleSize ?? AHASH_PRESET.sampleSize
  //const convertSequence = option.convertSequence ?? AHASH_PRESET.convertSequence
  const isByteReadingHorizontally = (option.byteReader ?? AHASH_PRESET.byteReader) !== 'vertically'
  const luma_c = option.luma ?? AHASH_PRESET.luma;

  const imgarray: number[][] = new Array();
  const sample = img.resize({width: sampleSize, height: sampleSize}).getImageDataWrapper();

  for (let x = 0; x < sampleSize; x++) {
    imgarray[x] = new Array(sampleSize)
    for (let y = 0; y < sampleSize; y++) {
      imgarray[x][y] = sample.getLuminance(x, y, luma_c);
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
