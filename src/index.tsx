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

await i18nInit()

const rootElement = document.getElementById('root')
if (rootElement === null) {
  throw new Error('root element not found')
}

type ShowComponent = 'inputFillCommand' | 'renderMapTable' | 'imageToPixelArt'

function App (): React.JSX.Element {
  const [showComponent, setShowComponent] =
    React.useState<ShowComponent>('inputFillCommand')
  const [mapBlockData, setMapBlockData] = React.useState<MapBlockData | null>(
    null
  )

  const onDisplayMapTable = (mapBlockData: MapBlockData): void => {
    setMapBlockData(mapBlockData)
    setShowComponent('renderMapTable')
  }

  const onDisplayImageToPixelArt = (): void => {
    setShowComponent('imageToPixelArt')
  }

  switch (showComponent) {
    case 'renderMapTable':
      if (mapBlockData === null) {
        throw new Error('fillCommand is null')
      }
      return <RenderMapTable tableItem={mapBlockData} />
    case 'inputFillCommand':
      return (
        <InputFillCommand
          onDisplayMapTable={onDisplayMapTable}
          onDisplayImageToPixelArt={onDisplayImageToPixelArt}
        />
      )
    case 'imageToPixelArt':
      return <ImageToPixelArt onDisplayMapTable={onDisplayMapTable} />
    default:
      return assertNever(showComponent)
  }
}

const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <Popup />
    <App />
  </StrictMode>
)
