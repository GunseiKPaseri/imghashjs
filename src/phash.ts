import ImgClass from './ImgClass/ImgClass.js'
import ImgHash from './ImgHash.js'
import { imgConvert } from './util.js'

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
}

const PHASH_SAMPLE_SIZE = 32

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

let COS = initCOS(PHASH_SAMPLE_SIZE)

const applyDCT = (f: number[][], size: number, sampleSize: number) => {
  COS = initCOS(sampleSize)

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
  const DCTSize = option.DCTSize ?? 32
  const lowSize = option.lowSize ?? 8
  const convertSequence = option.convertSequence ?? 'rg'

  imgConvert(img, DCTSize, DCTSize, convertSequence)

  const imgarray: number[][] = new Array(DCTSize)

  for (let x = 0; x < DCTSize; x++) {
    imgarray[x] = new Array(DCTSize)
    for (let y = 0; y < DCTSize; y++) {
      imgarray[x][y] = (img.getPixelRGB(x, y) >> 16) & 0xff
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
