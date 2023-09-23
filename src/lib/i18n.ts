import i18n, { TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'

export const resources = {
  ja: {
    translation: {
      tableTitle: 'ドット絵展開図',
      zoom: 'ズーム',
      times: '{{count}}倍'
    }
  },
  en: {
    translation: {
      tableTitle: 'pixel art expand',
      zoom: 'Zoom',
      times: '{{count}} times'
    }
  }
} as const satisfies {
  [key: string]: {
    translation: {
      tableTitle: string
      zoom: string
      times: string
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
