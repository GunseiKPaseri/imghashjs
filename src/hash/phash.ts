import { LUMA_COEFFICIENTS, type LUM_C } from '../ImgClass/ImageDataWrapper.js'
import ImgClass from '../ImgClass/ImgClass.js'
import ImgHash from '../ImgHash.js'
/**
 * phash option
 */
export interface PHASH_OPTION{
  /**
   * DCT Sampling square size (=32)
   */
  DCTSize?: number
  /**
   *  DCT low frequencies square size (=8)
   */
  lowSize?: number
  /**
   * convert sequence (=rg)
   * r: resize
   * g: glayscale
   */
  convertSequence?: 'rg' | 'gr'
  /**
   * luma coefficients
   */
  luma?: LUM_C
}

export const PHASH_PRESET = {
  DCTSize: 32,
  lowSize: 8,
  convertSequence: 'gr',
  luma: LUMA_COEFFICIENTS.NTSC,
} satisfies Required<PHASH_OPTION>

const INV_SQRT_2 = 1 / Math.sqrt(2.0)
const DCTCoefficients = (n: number) => (n === 0 ? INV_SQRT_2 : 1)

const MemoCOS: {[keyof: number]: number[][]} = {}

const initCOS = (N: number) => {
  if (MemoCOS[N]) return MemoCOS[N]
  MemoCOS[N] = new Array(N)
  const cosines = MemoCOS[N]
  for (let k = 0; k < N; k++) {
    cosines[k] = new Array(N)
    const t = ((2 * k + 1) / (2.0 * N)) * Math.PI
    for (let n = 0; n < N; n++) {
      cosines[k][n] = Math.cos(t * n)
    }
  }
  return cosines
}

initCOS(PHASH_PRESET.lowSize)

const applyDCT = (f: number[][], size: number, sampleSize: number) => {
  const COS = initCOS(sampleSize)

  const F: number[][] = new Array(size)
  for (let u = 0; u < size; u++) {
    F[u] = new Array(size)
    for (let v = 0; v < size; v++) {
      let sum = 0
      for (let i = 0; i < sampleSize; i++) {
        for (let j = 0; j < sampleSize; j++) {
          sum += COS[i][u] * COS[j][v] * f[i][j]
        }
      }
      F[u][v] = sum * (DCTCoefficients(u) * DCTCoefficients(v)) / 4
    }
  }
  return F
}

/**
 * Perseptual Hash (use DCT)
 * @param img Jimp object (**Destroyable**)
 * @param option
 * @returns phash
 */
const phash = (img: ImgClass, option: PHASH_OPTION = {}) => {
  const DCTSize = option.DCTSize ?? PHASH_PRESET.DCTSize
  const lowSize = option.lowSize ?? PHASH_PRESET.lowSize
  // const convertSequence = option.convertSequence ?? 'rg'
  const luma_c = option.luma ?? PHASH_PRESET.luma;

  const sample = img.resize({width: DCTSize, height: DCTSize}).getImageDataWrapper();

  const imgarray: number[][] = new Array(DCTSize)

  for (let x = 0; x < DCTSize; x++) {
    imgarray[x] = new Array(DCTSize)
    for (let y = 0; y < DCTSize; y++) {
      imgarray[x][y] = sample.getLuminance(x, y, luma_c);
    }
  }
  const dct = applyDCT(imgarray, lowSize, DCTSize)

  let sum = 0
  for (let x = 0; x < lowSize; x++) {
    for (let y = 0; y < lowSize; y++) {
      sum += dct[x][y]
    }
  }
  const avg = sum / (lowSize * lowSize)

  let result = ''
  for (let x = 0; x < lowSize; x++) {
    for (let y = 0; y < lowSize; y++) {
      result += (dct[x][y] > avg ? '1' : '0')
    }
  }
  return new ImgHash('phash', result, 'bin')
}

export default phash
