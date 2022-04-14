"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHASH_PRESET = exports.ImgHash = exports.mhash = exports.phash = exports.dhash = exports.ahash = void 0;
const tslib_1 = require("tslib");
const ahash_js_1 = tslib_1.__importStar(require("./ahash.js"));
exports.ahash = ahash_js_1.default;
Object.defineProperty(exports, "AHASH_PRESET", { enumerable: true, get: function () { return ahash_js_1.AHASH_PRESET; } });
const dhash_js_1 = tslib_1.__importDefault(require("./dhash.js"));
exports.dhash = dhash_js_1.default;
const phash_js_1 = tslib_1.__importDefault(require("./phash.js"));
exports.phash = phash_js_1.default;
const mhash_js_1 = tslib_1.__importDefault(require("./mhash.js"));
exports.mhash = mhash_js_1.default;
const ImgHash_js_1 = tslib_1.__importDefault(require("./ImgHash.js"));
exports.ImgHash = ImgHash_js_1.default;
//# sourceMappingURL=index.js.map