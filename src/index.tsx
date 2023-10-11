import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ImageToPixelArt from './components/ImageToPixelArt'
import InputFillCommand from './components/InputFillCommand'
import { Popup } from './components/Popup'
import RenderMapTable from './components/RenderMapTable'
import { MapBlockData } from './lib/convertToObject'
import { i18nInit } from './lib/i18n'
import { assertNever } from './lib/object'
import HeaderTab from './components/HeaderTab'
import { useTranslation } from 'react-i18next'

await i18nInit()

const rootElement = document.getElementById('root')
if (rootElement === null) {
  throw new Error('root element not found')
}

const ShowComponentList = [
  'command',
  'map',
  'image'
] as const

type ShowComponentType = typeof ShowComponentList[number]

const urlHash = window.location.hash.slice(1)
const defaultSelect = (
  ShowComponentList.includes(urlHash as ShowComponentType)
    ? urlHash
    : 'command'
) as ShowComponentType

function App (): React.JSX.Element {
  const { t } = useTranslation()
  const [showComponent, setShowComponent] =
    React.useState<ShowComponentType>(defaultSelect)
  const [mapBlockData, setMapBlockData] = React.useState<MapBlockData | null>(
    null
  )

  const onDisplayMapTable = (mapBlockData: MapBlockData): void => {
    setMapBlockData(mapBlockData)
    setShowComponent('map')
  }

  const onHeaderTabSelect = (select: string): void => {
    if (ShowComponentList.includes(select as ShowComponentType)) {
      setShowComponent(select as ShowComponentType)
      return
    }
    throw new Error(`${select} is not ShowComponent`)
  }

  const body = (() => {
    switch (showComponent) {
      case 'map':
        if (mapBlockData === null) {
          return <>{t('mapTable.noMapData')}</>
        }
        return <RenderMapTable tableItem={mapBlockData} />
      case 'command':
        return (
          <InputFillCommand
            onDisplayMapTable={onDisplayMapTable}
          />
        )
      case 'image':
        return <ImageToPixelArt onDisplayMapTable={onDisplayMapTable} />
      default:
        return assertNever(showComponent)
    }
  })()
  return (
    <>
      <HeaderTab select={showComponent} updateSelect={onHeaderTabSelect} />
      {body}
    </>
  )
}

const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <Popup />
    <App />
  </StrictMode>
)
