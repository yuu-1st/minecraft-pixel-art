import Jimp from 'jimp'

type ResizeMode =
  | typeof Jimp.RESIZE_NEAREST_NEIGHBOR
  | typeof Jimp.RESIZE_BILINEAR
  | typeof Jimp.RESIZE_BICUBIC
  | typeof Jimp.RESIZE_HERMITE
  | typeof Jimp.RESIZE_BEZIER

type JimpObject = typeof Jimp
type JimpType = Jimp
