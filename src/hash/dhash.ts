import { LUMA_COEFFICIENTS, type LUM_C } from '../ImgClass/ImageDataWrapper.js'
import ImgClass from '../ImgClass/ImgClass.js'
import ImgHash from '../ImgHash.js'

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
// const PyPIImgHash: DHASH_OPTION = {
//   convertSequence: 'gr',
//   larger: 'right',
//   byteReader: 'vertically'
// }
/**
 * DHASH option preset
 */
export const DHASH_PRESET = {
  sampleSize: 8,
  diffCompute: 'vertically',
  convertSequence: 'gr',
  luma: LUMA_COEFFICIENTS.NTSC,
  byteReader: 'vertically',
  larger: 'left'
} satisfies Required<DHASH_OPTION>

/**
 * Distance Hash
 * @param img Jimp object(**Destroyable**)
 * @param option
 * @returns dhash
 */
const dhash = (img: ImgClass, option: DHASH_OPTION = {}) => {
  const sampleSize = option.sampleSize ?? DHASH_PRESET.sampleSize
  const diffComputesHorizontally = (option.diffCompute ?? DHASH_PRESET.diffCompute) !== 'vertically'
  const isByteReadingHorizontally = (option.byteReader ?? DHASH_PRESET.byteReader) !== 'vertically'
  const isGT = (option.larger ?? DHASH_PRESET.larger) === 'left'
  const luma_c = option.luma ?? DHASH_PRESET.luma;

  //const convertSequence = option.convertSequence ?? DHASH_PRESET

  const h = (diffComputesHorizontally ? 1 : 0)
  const v = (diffComputesHorizontally ? 0 : 1)

  const sample = img.resize({width: sampleSize + h, height: sampleSize + v}).getImageDataWrapper()

  const imgarray: number[][] = new Array(sampleSize + h)

  for (let x = 0; x < sampleSize + h; x++) {
    imgarray[x] = new Array(sampleSize + v)
    for (let y = 0; y < sampleSize + v; y++) {
      imgarray[x][y] = sample.getLuminance(x, y, luma_c);
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
