import phash from '../src/phash'
import jimp from 'jimp'

test('#phash', async () => {
  const target = [
    './img/img_a_196.jpg',
    './img/img_a_256.jpg',
    './img/img_a_256_dirty.jpg',
    './img/img_b_256.jpg',
    './img/lena.jpg'
  ]
  const imgs = await Promise.all(target.map(address => jimp.read(address)))
  const hash = imgs.map(img => phash(img.clone()))
  // console.log(hash.map(x => x.hex))
  const score:number[][] = new Array(target.length)
  for (let i = 0; i < hash.length; i++) {
    expect(hash[i].bit64).toBe(imgs[i].hash())
    score[i] = new Array(target.length)
    for (let j = 0; j < hash.length; j++) {
      score[i][j] = hash[i].degreeOfSimilarity(hash[j])
    }
  }
  // console.log(score)
  expect(score[0][1]).toBeGreaterThanOrEqual(0.84375)
  expect(score[0][2]).toBeGreaterThanOrEqual(0.84375)
  expect(score[0][3]).toBeLessThan(0.84375)
})
