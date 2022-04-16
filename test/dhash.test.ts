import dhash, { DHASH_PRESET } from '../src/dhash'
import JimpImgClass from '../src/ImgClass/JimpImgClass'

describe('#dhash', () => {
  test('can calc', async () => {
    const target = [
      './img/img_a_196.jpg',
      './img/img_a_256.jpg',
      './img/img_a_256_dirty.jpg',
      './img/img_b_256.jpg'
    ]
    const imgs = await Promise.all(target.map(address => (new JimpImgClass()).init(address)))
    const hash = imgs.map(img => dhash(img))
    const score:number[][] = new Array(target.length)
    for (let i = 0; i < hash.length; i++) {
      score[i] = new Array(target.length)
      for (let j = 0; j < hash.length; j++) {
        score[i][j] = hash[i].degreeOfSimilarity(hash[j])
      }
    }
    // console.log(score)
    expect(score[0][1]).toBeGreaterThanOrEqual(0.8)
    expect(score[0][2]).toBeGreaterThanOrEqual(0.8)
    expect(score[0][3]).toBeLessThan(0.8)
  })

  test('Presets can be used to obtain the same values as other packages.', async () => {
    const target: [string, ({PyPIImgHash: string})][] = [
      ['./img/img_a_196.jpg', { PyPIImgHash: '19593870a199b9b4' }],
      ['./img/img_a_256.jpg', { PyPIImgHash: '19593870a199b9b4' }],
      ['./img/img_a_256_dirty.jpg', { PyPIImgHash: '59bbac48a199b9b4' }],
      ['./img/img_b_256.jpg', { PyPIImgHash: '62f0e160300c1a9b' }]
    ]
    const imgs = await Promise.all(target.map(obj => (new JimpImgClass()).init(obj[0])))
    for (let i = 0; i < imgs.length; i++) {
      const PyPIImgHash = dhash(imgs[i], DHASH_PRESET.PyPIImgHash)
      expect(PyPIImgHash.hex).toBe(target[i][1].PyPIImgHash)
    }
  })
})
