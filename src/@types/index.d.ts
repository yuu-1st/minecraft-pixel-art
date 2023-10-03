declare module 'jimp/browser/lib/jimp' {
  import type * as _Jimp from 'jimp'

  export type Jimp = _Jimp

  global {
    export const Jimp: typeof _Jimp
  }
}
