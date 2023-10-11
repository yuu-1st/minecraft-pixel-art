import { LanguageType, getLanguage } from './i18n'
import {
  colorBlockData,
  colorData,
  minecraftBlockData
} from './minecraftColorData'

/**
 * ブロックキーをブロック名に変換します。
 * @param key ブロックキー
 * @param lang 変換先の言語
 * @param needError 名前が存在しない場合にエラーを出すかどうか。出さない場合はキーをそのまま返します。
 * @returns ブロック名
 */
export function convertBlockKeyToName (
  key: string,
  lang: LanguageType = getLanguage(),
  needError: boolean = false
): string {
  if (key in minecraftBlockData) {
    return minecraftBlockData[key].name[lang]
  }
  const color = colorData.find(item => key.startsWith(item.key))
  const block = colorBlockData.find(item => key.endsWith(item.key))
  if (color !== undefined && block !== undefined) {
    const conjunction = lang === 'en' ? ' ' : 'の'
    // return `${color.name.ja} ${block.name.ja}`
    return `${color.name[lang]}${conjunction}${block.name[lang]}`
  }
  if (needError) {
    throw new Error(`Invalid block key: ${key}`)
  }
  return key
}
