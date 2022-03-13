import Jimp from 'jimp'
import ImgHash from './ImgHash'
const AHASH_SAMPLE_SIZE = 8

/**
 * Averave Hash
 * @param img Jimp object (**Destroyable**)
 * @param sampleSize resize square size(=8)
 * @returns ahash
 */
const ahash = (img: Jimp, sampleSize: number = AHASH_SAMPLE_SIZE) => {
  img
    .resize(sampleSize, sampleSize)
    .grayscale()
  const imgarray: number[][] = new Array(sampleSize)

  let sum = 0
  for(let x = 0; x < sampleSize; x++){
    imgarray[x] = new Array(sampleSize)
    for(let y = 0; y < sampleSize; y++){
      imgarray[x][y] = (img.getPixelColor(x, y)>>16) & 0xff
      sum += imgarray[x][y]
    }
  }
  const avg = sum / (sampleSize * sampleSize)

  let result = ''

  for(let x = 0; x < sampleSize; x++){
    for(let y = 0; y < sampleSize; y++){
      result += (imgarray[x][y] > avg ? '1' : '0')
    }
  }
  return new ImgHash('ahash', result, 'bin')
}

export default ahash
