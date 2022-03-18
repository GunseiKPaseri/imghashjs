import Jimp from 'jimp'
import ImgHash from './ImgHash'
import { imgConvert } from './util'

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
   * do you calc different horizontally? (=true)
   */
  diffComputesHorizontally?: boolean
  /**
   * convert sequence (=rg)
   * r: resize
   * g: glayscale
   */
  convertSequence?: 'rg' | 'gr'
}

/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param option
 * @returns dhash
 */
const dhash = (img: Jimp, option: DHASH_OPTION = {}) => {
  const sampleSize = option.sampleSize ?? DHASH_SAMPLE_SIZE
  const diffComputesHorizontally = option.diffComputesHorizontally ?? true

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

  let result = ''
  for (let x = 0; x < sampleSize; x++) {
    for (let y = 0; y < sampleSize; y++) {
      result += (imgarray[x][y] > imgarray[x + h][y + v] ? '1' : '0')
    }
  }

  return new ImgHash('dhash', result, 'bin')
}

export default dhash
