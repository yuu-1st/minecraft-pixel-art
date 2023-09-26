import assert from 'assert'
import { closest_lab, rgb_to_lab } from 'color-diff'
import { ResizeMode, JimpObject, JimpType } from '../@types/jimp'

declare const Jimp: JimpObject

interface RGBColor {
  r: number
  g: number
  b: number
  a?: number
}

interface LabColor {
  L: number
  a: number
  b: number
}

export interface ColorPalette {
  key: string
  color: RGBColor
}

/**
 * Convert from loaded Jimp to specified size.
 * @param image Jimp
 * @param height Height after conversion. If you want to maintain the aspect ratio, set either to null.
 * @param width Width after conversion. If you want to maintain the aspect ratio, set either to null.
 * @param resizeMode Resize mode. Default is Jimp.RESIZE_BICUBIC.
 * @returns Converted Jimp
 */
export function resizeImage (
  image: JimpType,
  height: number | null,
  width: number | null,
  resizeMode: ResizeMode = Jimp.RESIZE_BICUBIC
): JimpType {
  if (height === null && width === null) {
    throw new Error('height and width cannot be null at the same time')
  }
  if (height === null) {
    assert(width !== null)
    return image.resize(width, Jimp.AUTO, resizeMode)
  }
  if (width === null) {
    return image.resize(Jimp.AUTO, height, resizeMode)
  }
  return image.resize(width, height, resizeMode)
}

/**
 * Executes the specified function for each pixel of the loaded Jimp.
 * @param image Jimp
 * @param callback Function to execute for each cell
 * @returns Translated Jimp
 */
export function mapImage<T> (
  image: JimpType,
  callback: (x: number, y: number, index: number, color: RGBColor) => T
): T[][] {
  const result: T[][] = []
  for (let y = 0; y < image.getHeight(); y++) {
    const row: T[] = []
    for (let x = 0; x < image.getWidth(); x++) {
      const index = y * image.getWidth() + x
      const color = Jimp.intToRGBA(image.getPixelColor(x, y))
      row.push(callback(x, y, index, color))
    }
    result.push(row)
  }
  return result
}

/**
 * Converts an RGB array to a Lab array.
 * @param rgb RGB array
 * @returns Lab array
 */
export function rgbToLab (rgb: readonly RGBColor[]): LabColor[] {
  return rgb.map(color => rgb_to_lab({ R: color.r, G: color.g, B: color.b }))
}

/**
 * Converts the input image to the specified size and converts its color to a similar color.
 * @param image Jimp
 * @param height Convert to height. If you want to maintain the aspect ratio, set one to null.
 * @param width Convert to width. If you want to maintain the aspect ratio, set one to null.
 * @param palette palette
 * @returns Converted color array
 */
export function convertToPixelArt (
  image: JimpType,
  height: number | null,
  width: number | null,
  palette: readonly ColorPalette[]
): ColorPalette[][] {
  const resizedImage = resizeImage(image, height, width)
  const paletteLab = palette.map(({ key, color }) => {
    return { key, color: rgb_to_lab({ R: color.r, G: color.g, B: color.b }) }
  })
  const paletteLabColor = paletteLab.map(({ color }) => color)
  const resizedImageLab = mapImage(resizedImage, (_1, _2, _3, color) => {
    const lab = rgb_to_lab({ R: color.r, G: color.g, B: color.b })
    const closest = closest_lab(lab, paletteLabColor)
    return closest
  })
  const resizedImageLabColor = resizedImageLab.map(row => {
    return row.map(column => {
      const index = paletteLabColor.findIndex(color => {
        return (
          color.L === column.L && color.a === column.a && color.b === column.b
        )
      })
      return { ...palette[index] }
    })
  })
  return resizedImageLabColor
}
