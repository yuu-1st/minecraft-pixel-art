import i18n, { TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'

export type ErrorType = keyof typeof resources['en']['translation']['errorMessage']

export const resources = {
  ja: {
    translation: {
      tableTitle: 'ドット絵展開図',
      zoom: 'ズーム',
      times: '{{count}}倍',
      inputFill: {
        header: 'Fill Commandを入力してください。',
        send: '生成'
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
        send: 'Generate'
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
      }
    }
  }
} as const satisfies {
  [key: string]: {
    translation: {
      tableTitle: string
      zoom: string
      times: string
      inputFill: {
        header: string
        send: string
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
  language: keyof typeof resources
): Promise<void> {
  await i18n.changeLanguage(language)
}

export const i18nInstance = await i18nInit()
