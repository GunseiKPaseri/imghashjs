import Jimp from 'jimp'
import ImgHash from './ImgHash.js'
import { imgConvert } from './util.js'

const DHASH_SAMPLE_SIZE = 8

/**
 * dhash option
 */
export interface DHASH_OPTION{
  /**
   * resize square size (=8)
   */
  sampleSize?: number
  /**
   * diffcomputing `"horizontally" | "vertically"`
   */
  diffCompute?: 'horizontally' | 'vertically'
  /**
   * convert sequence (=rg)
   * r: resize
   * g: glayscale
   */
  convertSequence?: 'rg' | 'gr'
  /**
   * bytereading `"horizontally" | "vertically"`
   */
  byteReader?: 'horizontally' | 'vertically'
  /**
   * `left: (left > right)`, `right: (left < right)`
   */
  larger?: 'left' | 'right'
}

/**
 * PyPI ImgHash (https://pypi.org/project/imghash/)
 * `imghash.average_hash`
 */
const PyPIImgHash: DHASH_OPTION = {
  convertSequence: 'gr',
  larger: 'right',
  byteReader: 'vertically'
}
/**
 * AHASH option preset
 */
export const DHASH_PRESET = { PyPIImgHash }

/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param option
 * @returns dhash
 */
const dhash = (img: Jimp, option: DHASH_OPTION = {}) => {
  const sampleSize = option.sampleSize ?? DHASH_SAMPLE_SIZE
  const diffComputesHorizontally = option.diffCompute !== 'vertically'
  const isByteReadingHorizontally = option.byteReader !== 'vertically'
  const isGT = option.larger === 'left'

  const convertSequence = option.convertSequence ?? 'rg'

  const h = (diffComputesHorizontally ? 1 : 0)
  const v = (diffComputesHorizontally ? 0 : 1)

  imgConvert(img, sampleSize + h, sampleSize + v, convertSequence)

  const imgarray: number[][] = new Array(sampleSize + h)

  for (let x = 0; x < sampleSize + h; x++) {
    imgarray[x] = new Array(sampleSize + v)
    for (let y = 0; y < sampleSize + v; y++) {
      imgarray[x][y] = (img.getPixelColor(x, y) >> 16) & 0xff
    }
  }

  // console.log(imgarray)
  let result = ''
  for (let x = 0; x < sampleSize; x++) {
    for (let y = 0; y < sampleSize; y++) {
      result += (
        (isByteReadingHorizontally
          ? (isGT ? imgarray[x][y] > imgarray[x + h][y + v] : imgarray[x][y] < imgarray[x + h][y + v])
          : (isGT ? imgarray[y][x] > imgarray[y + h][x + v] : imgarray[y][x] < imgarray[y + h][x + v])
        )
          ? '1'
          : '0')
    }
  }
  return new ImgHash('dhash', result, 'bin')
}

export default dhash
