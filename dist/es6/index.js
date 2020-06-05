import { stringify } from "./json";
import { parse } from "./yastjson/lib/parse";
export { sort } from "./timsort";
export * from "./array-utilities";
export * from "./wrappers";
export * from "./coroutines";
export * from "./async-wrappers";
export * from "./lz-string/base64-string";
export * from "./lz-string/lz-string";
export { stringify, parse };
import { LZStringGenerator } from "./lz-string/lz-string";
export const compress = LZStringGenerator.compress;
export const decompress = LZStringGenerator.decompress;
import './polyfill'
