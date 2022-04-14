"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHASH_PRESET = exports.ImgHash = exports.mhash = exports.phash = exports.dhash = exports.ahash = void 0;
const tslib_1 = require("tslib");
const ahash_1 = tslib_1.__importStar(require("./ahash"));
exports.ahash = ahash_1.default;
Object.defineProperty(exports, "AHASH_PRESET", { enumerable: true, get: function () { return ahash_1.AHASH_PRESET; } });
const dhash_1 = tslib_1.__importDefault(require("./dhash"));
exports.dhash = dhash_1.default;
const phash_1 = tslib_1.__importDefault(require("./phash"));
exports.phash = phash_1.default;
const mhash_1 = tslib_1.__importDefault(require("./mhash"));
exports.mhash = mhash_1.default;
const ImgHash_1 = tslib_1.__importDefault(require("./ImgHash"));
exports.ImgHash = ImgHash_1.default;
//# sourceMappingURL=index.js.map