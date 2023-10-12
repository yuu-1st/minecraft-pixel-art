import i18n, { TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'

export type ErrorType = keyof typeof resources['en']['translation']['errorMessage']

export const LanguageList = ['ja', 'en'] as const

export type LanguageType = typeof LanguageList[number]

export const resources = {
  ja: {
    translation: {
      tableTitle: 'ドット絵展開図',
      zoom: 'ズーム',
      times: '{{count}}倍',
      inputFill: {
        header: 'Fill Commandを入力してください。',
        send: '地図を生成する',
        inputImage: '画像から生成する'
      },
      errorMessage: {
        invalidFillCommand: '無効なFill Commandが含まれています。',
        notFillCommand: 'Fill Commandではないコマンドが含まれています。',
        unknownError: '不明なエラーが発生しました。'
      },
      imageToPixelArt: {
        header: '画像からドット絵を生成する',
        upload: '画像をアップロード',
        height: '高さ',
        fillCommand: 'Fill Commandを生成する',
        table: 'テーブルを表示する'
      },
      mapTable: {
        inputCoordinate: '左上の座標',
        noMapData: '他の項目で地図を生成すると表示されます。'
      },
      selectBlock: {
        dyeSelect: '染色を使ったブロックを選択する'
      }
    }
  },
  en: {
    translation: {
      tableTitle: 'pixel art expand',
      zoom: 'Zoom',
      times: '{{count}} times',
      inputFill: {
        header: 'Please enter the Fill Command.',
        send: 'Generate map',
        inputImage: 'Generate from image'
      },
      errorMessage: {
        invalidFillCommand: 'There is an invalid Fill Command.',
        notFillCommand: 'There is a non-Fill Command.',
        unknownError: 'An unknown error occurred.'
      },
      imageToPixelArt: {
        header: 'Generate pixel art from image',
        upload: 'Upload image',
        height: 'Height',
        fillCommand: 'Generate Fill Command',
        table: 'Show table'
      },
      mapTable: {
        inputCoordinate: 'Upper left coordinate',
        noMapData: 'It will be displayed when you generate a map with other items.'
      },
      selectBlock: {
        dyeSelect: 'Select a block using dye'
      }
    }
  }
} as const satisfies {
  [key in LanguageType]: {
    translation: {
      tableTitle: string
      zoom: string
      times: string
      inputFill: {
        header: string
        send: string
        inputImage: string
      }
      errorMessage: {
        invalidFillCommand: string
        notFillCommand: string
        unknownError: string
      }
      imageToPixelArt: {
        header: string
        upload: string
        height: string
        fillCommand: string
        table: string
      }
      mapTable: {
        inputCoordinate: string
        noMapData: string
      }
      selectBlock: {
        dyeSelect: string
      }
    }
  }
}

export async function i18nInit (): Promise<TFunction<'translation', undefined>> {
  return await i18n.use(initReactI18next).init({
    lng: 'ja',
    resources,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })
}

export async function changeLanguage (
  language: LanguageType
): Promise<void> {
  await i18n.changeLanguage(language)
}

export function getLanguage (): LanguageType {
  const language = i18n.language
  if (LanguageList.includes(language as LanguageType)) {
    return language as LanguageType
  }
  return 'en'
}

export const i18nInstance = await i18nInit()
