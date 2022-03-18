const alphabet =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
const table = Object.fromEntries(alphabet.split('').map((x, i) => [x, i]))

/**
 * ImgHash Object
 */
export default class ImgHash {
  readonly type: string
  readonly byte: number[]
  /**
   *
   * @param type hash type string
   * @param byte8 hash
   * @type hash string meaning (default 'hex')
   */
  constructor (type: string, byte8: number[] | string, hextype?: 'hex' | '64byte' | 'bin') {
    this.type = type
    if (typeof byte8 === 'string') {
      if (hextype === '64byte' || hextype === 'bin') {
        const bin = (hextype === 'bin' ? byte8 : byte8.split('').map(x => (table[x] ?? 0).toString(2).padStart(6, '0')).join(''))
        this.byte = bin.padStart(Math.ceil(bin.length / 8) * 8, '0').match(/.{8}/g)?.map(x => parseInt(x, 2)) ?? []
      } else {
        // hex
        this.byte = byte8.match(/.{2}/g)?.map(x => parseInt(x, 16)) ?? []
      }
    } else {
      this.byte = byte8
    }
  }

  /**
   * base 2 hash string
   */
  get bin () {
    return this.byte.map(x => x.toString(2).padStart(8, '0')).join('')
  }

  /**
   * base 16 hash string
   */
  get hex () {
    return this.byte.map(x => x.toString(16).padStart(2, '0')).join('')
  }

  /**
   * get hash string
   */
  toString () {
    return this.hex
  }

  /**
   * base 64 hash string
   * (This is the same format as the `jimpimg.hash()`)
   */
  get bit64 () {
    return this.bin.padStart(Math.ceil(this.byte.length * 8 / 6) * 6, '0').match(/.{6}/g)?.map(x => alphabet[parseInt(x, 2)]).join('') ?? ''
  }

  /**
   * Hash Uint8Array
   */
  get uint8array () {
    return new Uint8Array(this.byte)
  }

  /**
   * Calculate Hamming Distance
   * @param hash targetHash
   * @returns
   */
  distanceTo (hash: ImgHash) {
    if (this.type !== hash.type) throw new Error(`Different hash can't compare(${this.type} <==> ${hash.type})`)
    let distance = 0
    for (let i = 0; i < this.byte.length; i++) {
      let t = this.byte[i] ^ hash.byte[i]
      while (t) {
        if (t & 1)distance++
        t >>= 1
      }
    }
    return distance
  }

  /**
   * Calculation Degree Of Similarity (0 ... totally different, 1 ... unlimited match )
   * @param imghash
   * @returns
   */
  degreeOfSimilarity (hash: ImgHash) {
    const distance = this.distanceTo(hash)
    return 1 - (distance / (this.byte.length * 8))
  }
}
