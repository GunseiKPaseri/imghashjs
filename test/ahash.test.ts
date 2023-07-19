import { readFile } from 'fs/promises'
import { loadImage } from '@napi-rs/canvas'
import ahash from '../src/hash/ahash'
import WasmCanvas from '../src/ImgClass/WasmCanvas'

describe('#ahash', () => {
  test('can calc', async () => {
    const target = [
      './img/img_a_196.jpg',
      './img/img_a_256.jpg',
      './img/img_a_256_dirty.jpg',
      './img/img_b_256.jpg'
    ]
    const imgs = await Promise.all(
      target.map(async (address) => (new WasmCanvas(await loadImage(await readFile(address)))))
    )
    const hash = imgs.map(img => ahash(img))
    const score:number[][] = new Array(target.length)
    for (let i = 0; i < hash.length; i++) {
      score[i] = new Array(target.length)
      for (let j = 0; j < hash.length; j++) {
        score[i][j] = hash[i].degreeOfSimilarity(hash[j])
      }
    }
    // console.log(score)
    expect(score[0][1]).toBeGreaterThan(0.8)
    expect(score[0][2]).toBeGreaterThan(0.8)
    expect(score[0][3]).toBeLessThanOrEqual(0.91)
  })

  // test('Presets can be used to obtain the same values as other packages.', async () => {
  //   const target: [string, ({PyPIImgHash: string})][] = [
  //     ['./img/img_a_196.jpg', { PyPIImgHash: 'fffffffcf8000000' }],
  //     ['./img/img_a_256.jpg', { PyPIImgHash: 'fffffffcf8000000' }],
  //     ['./img/img_a_256_dirty.jpg', { PyPIImgHash: 'fffffffcf8000000' }],
  //     ['./img/img_b_256.jpg', { PyPIImgHash: 'ffffffff00000000' }]
  //   ]
  //   const imgs = await Promise.all(
  //     target.map(async (obj) => (new WasmCanvas(await loadImage(await readFile(obj[0])))))
  //   )
  //   for (let i = 0; i < imgs.length; i++) {
  //     const PyPIImgHash = ahash(imgs[i], AHASH_PRESET.PyPIImgHash)
  //     expect(PyPIImgHash.hex).toBe(target[i][1].PyPIImgHash)
  //   }
  // })
})
