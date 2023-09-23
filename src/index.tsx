import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RenderMapTable from './components/RenderMapTable'
import { convertArrayToNumberedArray, createArrayFromFillCommands } from './lib/convertToObject'
import { i18nInit } from './lib/i18n'

await i18nInit()

const rootElement = document.getElementById('root')
if (rootElement === null) {
  throw new Error('root element not found')
}

/* テストデータ */
const fill = `
fill 1 0 1 10 0 50 stone
fill 11 0 1 20 0 50 white_wool
fill 21 0 1 30 0 50 red_wool
fill 31 0 1 40 0 50 white_wool
fill 41 0 1 50 0 50 blue_wool
`.split('\n').filter((line) => line !== '')
const fillString = createArrayFromFillCommands(fill)
const fillObject = convertArrayToNumberedArray(fillString)
/* テストデータここまで */

const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <RenderMapTable tableItem={fillObject.blockMap} />
  </StrictMode>
)
