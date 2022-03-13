import Jimp from 'jimp'
import ImgHash from './ImgHash'
const MHASH_SAMPLE_SIZE = 8

/**
 * Median Hash
 * @param img Jimp object (**Destroyable**)
 * @param sampleSize resize square size(=8)
 * @returns ahash
 */
const mhash = (img: Jimp, sampleSize: number = MHASH_SAMPLE_SIZE) => {
  img
    .resize(sampleSize, sampleSize)
    .grayscale()
  const imgarray: number[][] = new Array(sampleSize)
  const sortedPx: number[] = []

  for(let x = 0; x < sampleSize; x++){
    imgarray[x] = new Array(sampleSize)
    for(let y = 0; y < sampleSize; y++){
      imgarray[x][y] = (img.getPixelColor(x, y)>>16) & 0xff
      sortedPx.push(imgarray[x][y])
    }
  }
  sortedPx.sort()
  const allPx = sampleSize * sampleSize
  const median = (
    allPx % 2 === 1
      ? sortedPx[allPx/2|0]
      : (sortedPx[allPx/2-1] + sortedPx[allPx/2])/2
    )

  let result = ''

  for(let x = 0; x < sampleSize; x++){
    for(let y = 0; y < sampleSize; y++){
      result += (imgarray[x][y] > median ? '1' : '0')
    }
  }
  return new ImgHash('ahash', result, 'bin')
}

export default mhash
