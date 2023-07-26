# Image Hash JS

[![npm](https://img.shields.io/npm/v/imghashjs)](https://www.npmjs.com/package/imghashjs)
![npm](https://img.shields.io/npm/dw/imghashjs)
![CI](https://github.com/GunseiKPaseri/imghashjs/workflows/CI/badge.svg)

The image hash is a value representing a feature of the image.
Since the purpose is to look at the similarity of images, unlike SHA-256 and MD5, similar images will yield similar values.

## example usage(browser)
(react)

use Browser Canvas (without wasm)

```js
import BrowserCanvas from 'imghashjs/dist/esm/ImgClass/BrowserCanvas';
import { phash } from 'imghashjs';

const inputFile: React.ChangeEventHandler<HTMLInputElement> =(e) => {
  const file = e.target.files?.[0];
  if(!file)return;

  const reader = new FileReader();
  reader.readAsDataURL(file)
  reader.onload = () => {
    const src = reader.result as string
    const img = new Image();
    img.src=src
    img.onload = () => {
      // use Browser Canvas
      const imgcanvas = new BrowserCanvas(img)
      setHash(phash(imgcanvas).hex)
    }
  }
}
```

## example usage(node.js)
(ts-node)

use [@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas)

```js
import { readFile } from 'fs/promises'
import WasmCanvas from 'imghashjs/dist/esm/ImgClass/WasmCanvas';
import { phash } from 'imghashjs';

const target = [
  './img/img_a_196.jpg',
  './img/img_a_256.jpg',
]

const imgs = await Promise.all(
  target.map(async (address) => (new WasmCanvas(await loadImage(await readFile(address)))))
)
const hash = imgs.map(img => phash(img))
console.log(hash)
```

## support hash type

- ahash (Average Hash)
- dhash (Distance Hash)
- mhash (Median Hash)
- phash (Perseptual Hash)
