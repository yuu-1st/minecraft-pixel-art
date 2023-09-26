import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RenderMapTable from './components/RenderMapTable'
import {
  MapBlockData
} from './lib/convertToObject'
import { i18nInit } from './lib/i18n'
import { assertNever } from './lib/object'
import InputFillCommand from './components/InputFillCommand'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Popup } from './components/Popup'

await i18nInit()

const rootElement = document.getElementById('root')
if (rootElement === null) {
  throw new Error('root element not found')
}

type ShowComponent = 'inputFillCommand' | 'renderMapTable'

function App (): React.JSX.Element {
  const [showComponent, setShowComponent] =
    React.useState<ShowComponent>('inputFillCommand')
  const [fillCommand, setFillCommand] = React.useState<MapBlockData | null>(null)

  const onDisplayMapTable = (mapBlockData: MapBlockData): void => {
    setFillCommand(mapBlockData)
    setShowComponent('renderMapTable')
  }

  switch (showComponent) {
    case 'renderMapTable':
      if (fillCommand === null) {
        throw new Error('fillCommand is null')
      }
      return <RenderMapTable tableItem={fillCommand.blockMap} />
    case 'inputFillCommand':
      return <InputFillCommand onDisplayMapTable={onDisplayMapTable} />
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
