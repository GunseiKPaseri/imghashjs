import ahash, { type AHASH_OPTION, AHASH_PRESET } from './hash/ahash.js'
import dhash, { type DHASH_OPTION, DHASH_PRESET } from './hash/dhash.js'
import mhash, { type MHASH_OPTION, MHASH_PRESET } from './hash/mhash.js'
import phash, { type PHASH_OPTION, PHASH_PRESET } from './hash/phash.js'
import { LUMA_COEFFICIENTS, type LUM_C } from './ImgClass/ImageDataWrapper.js'
import ImgHash from './ImgHash.js'
import WasmCanvas from './ImgClass/WasmCanvas.js'
import BrowserCanvas from './ImgClass/BrowserCanvas.js'

export {
  ahash,
  dhash,
  phash,
  mhash,
  ImgHash,
  LUMA_COEFFICIENTS,
  AHASH_PRESET,
  DHASH_PRESET,
  MHASH_PRESET,
  PHASH_PRESET,
  WasmCanvas,
  BrowserCanvas
}

export type {
  AHASH_OPTION,
  DHASH_OPTION,
  MHASH_OPTION,
  PHASH_OPTION,
  LUM_C,
}
