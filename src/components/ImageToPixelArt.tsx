import 'jimp/browser/lib/jimp.js'
import type { Jimp } from 'jimp/browser/lib/jimp'
import { ColorPalette, convertToPixelArt } from '../lib/convertToPixelArt'
import {
  colorBlockData,
  minecraftBlockData,
  minecraftColorData
} from '../lib/minecraftColorData'
import React, { useEffect, useState } from 'react'
import {
  MapBlockData,
  convertArrayToNumberedArray
} from '../lib/convertToObject'
import { arrayMap, sleep } from '../lib/object'
import { useTranslation } from 'react-i18next'
import SelectBlock from './SelectBlock'

let jimpData: Jimp | null = null
let colorPalette: ColorPalette[][] | null = null

/**
 * files: List of files from HTML5 input or drop.
 */
async function read (files: FileList): Promise<Jimp> {
  const file = files[0]
  const arrayBuffer = await file.arrayBuffer()
  const image = await Jimp.read(Buffer.from(arrayBuffer))
  return image
}

type SetBlockType = string

async function updateCanvas (
  pixelArtHeight: number,
  selectBlocks: SetBlockType[]
): Promise<void> {
  if (jimpData === null) {
    return
  }
  await sleep(50)
  const processImage = convertToPixelArt(
    jimpData,
    pixelArtHeight,
    null,
    minecraftColorData.flatMap((color, index) => {
      const selectBlock = selectBlocks[index]
      if (selectBlock === 'none') {
        return []
      }
      const colorMag = 220 / 255
      return {
        color: {
          r: Math.round(color.color.r * colorMag),
          g: Math.round(color.color.g * colorMag),
          b: Math.round(color.color.b * colorMag)
        },
        key: `${color.id}`
      }
    })
  )
  colorPalette = processImage
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (canvas === null) {
    return
  }
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    return
  }
  const width = processImage[0].length
  const height = processImage.length
  canvas.width = width
  canvas.height = height
  const imageData = ctx.createImageData(width, height)
  const data = imageData.data
  for (let i = 0; i < processImage.length; i++) {
    for (let j = 0; j < processImage[i].length; j++) {
      const color = processImage[i][j]
      const index = (i * width + j) * 4
      data[index] = color.color.r
      data[index + 1] = color.color.g
      data[index + 2] = color.color.b
      data[index + 3] = 255
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

function InputCoordinate ({
  x,
  y,
  z,
  setX,
  setY,
  setZ
}: {
  x: number
  y: number
  z: number
  setX: React.Dispatch<React.SetStateAction<number>>
  setY: React.Dispatch<React.SetStateAction<number>>
  setZ: React.Dispatch<React.SetStateAction<number>>
}): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <div className='row m-0 align-items-center'>
      <div className='col-auto g-1'>{t('mapTable.inputCoordinate')}</div>
      <div className='col-auto'> x :</div>
      <input
        type='number'
        className='col form-control'
        value={x}
        onChange={e => setX(Number(e.target.value))}
      />
      <div className='col-auto'> y :</div>
      <input
        type='number'
        className='form-control col'
        value={y}
        onChange={e => setY(Number(e.target.value))}
      />
      <div className='col-auto'> z :</div>
      <input
        type='number'
        className='form-control col'
        value={z}
        onChange={e => setZ(Number(e.target.value))}
      />
    </div>
  )
}

type SelectButtonType = 'fill' | 'table' | null

function ImageToPixelArt ({
  onDisplayMapTable
}: {
  onDisplayMapTable: (mapBlockData: MapBlockData) => void
}): JSX.Element {
  const [isUpdateCanvas, setIsUpdateCanvas] = useState(false)
  const [pixelArtHeight, setPixelArtHeight] = useState(256)
  const [selectButton, setSelectButton] = useState<SelectButtonType>(null)
  const { t } = useTranslation()
  const [selectBlock, setSelectBlock] = React.useState<SetBlockType[]>(
    minecraftColorData.map(colorData => {
      return colorData.block[0]
    })
  )
  const [selectedBlockCount, setSelectedBlockCount] = React.useState<number[]>(
    arrayMap(minecraftColorData.length, () => 0)
  )
  const [selectColorBlock, setSelectColorBlock] = React.useState<
    typeof colorBlockData[number]['key']
  >(colorBlockData[0].key)
  const [positionX, setPositionX] = React.useState(0)
  const [positionY, setPositionY] = React.useState(0)
  const [positionZ, setPositionZ] = React.useState(0)

  useEffect(() => {
    if (isUpdateCanvas) {
      updateCanvas(pixelArtHeight, selectBlock)
        .then(() => {
          const counter = arrayMap(minecraftColorData.length, () => 0)
          colorPalette?.forEach(row => {
            row.forEach(color => {
              counter[Number(color.key) - 1]++
            })
          })
          setSelectedBlockCount(counter)
          setIsUpdateCanvas(false)
        })
        .catch(e => {
          console.error(e)
        })
    }
  }, [isUpdateCanvas])

  const onFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.target.files
    if (files === null) {
      return
    }
    const image = await read(files)
    jimpData = image
    setIsUpdateCanvas(true)
  }

  const onPixelArtHeightChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const height = parseInt(e.target.value)
    setPixelArtHeight(height)
    setIsUpdateCanvas(true)
  }

  const onClickDisplayMapTable = (): void => {
    if (colorPalette === null) {
      return
    }
    const nonNullColorPalette = colorPalette
    const blockIdList = selectBlock.map(block => {
      const colorData = minecraftBlockData[block]
      const colorBlock = (colorData.tag as unknown as string[]).includes(
        'color'
      )
        ? block.replace('item', selectColorBlock)
        : block
      return colorBlock
    })
    const blockData = nonNullColorPalette.map(row => {
      return row.map(color => {
        const key = Number(color.key)
        return blockIdList[key - 1]
      })
    })
    const mapData = convertArrayToNumberedArray({
      mapBlock: blockData,
      minX: positionX,
      minY: positionY,
      minZ: positionZ
    })
    setSelectButton('table')
    void (async () => {
      await sleep(50)
      onDisplayMapTable(mapData)
    })()
  }

  const updateSelectBlock = <I extends number>(
    index: I,
    block: 'none' | typeof minecraftColorData[I]['block'][number]
  ): void => {
    const newSelectBlock = [...selectBlock]
    const needUpdate =
      (selectBlock[index] !== 'none' && block === 'none') ||
      (selectBlock[index] === 'none' && block !== 'none')
    newSelectBlock[index] = block
    setSelectBlock(newSelectBlock)
    if (needUpdate) {
      setIsUpdateCanvas(true)
    }
  }

  return (
    <div>
      <p>{t('imageToPixelArt.header')}</p>
      <div className='m-3'>
        <label htmlFor='uploadImage' className='form-label'>
          {t('imageToPixelArt.upload')}
        </label>
        <input
          type='file'
          className='form-control'
          id='uploadImage'
          onChange={e => {
            void onFileInputChange(e)
          }}
        />
        {/* Display the input image in the canvas. Center alignment */}
        <div className='d-flex justify-content-center position-relative'>
          <canvas id='canvas' className='m-3' />
          {isUpdateCanvas && (
            <div className='position-absolute top-50 start-50 translate-middle m-3'>
              <div
                className='spinner-border'
                role='status'
                style={{ zIndex: 1 }}
              >
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}
        </div>

        {/* display a bar to specify the vertical width of the canvas. 128 is the upper limit for 2048. */}
        <div className='row m-0'>
          <div className='col-auto'>{t('imageToPixelArt.height')}</div>
          <div className='col'>
            <input
              type='range'
              className='form-range'
              min='128'
              max='2048'
              step='128'
              value={pixelArtHeight}
              onChange={onPixelArtHeightChange}
            />
          </div>
          <div className='col-auto'>{pixelArtHeight}</div>
        </div>
        <div>
          <InputCoordinate
            x={positionX}
            y={positionY}
            z={positionZ}
            setX={setPositionX}
            setY={setPositionY}
            setZ={setPositionZ}
          />
        </div>
        {/* Create two buttons, one to create Fill Command and one to display the table */}
        <div className='row justify-content-center m-0'>
          <div className='col-4'>
            <button type='button' className='btn btn-primary m-3'>
              {selectButton === 'fill' && (
                <span
                  className='spinner-border spinner-border-sm mx-1'
                  role='status'
                  aria-hidden='true'
                />
              )}
              {t('imageToPixelArt.fillCommand')}
            </button>
          </div>
          <div className='col-4'>
            <button
              type='button'
              className='btn btn-primary m-3'
              onClick={onClickDisplayMapTable}
            >
              {selectButton === 'table' && (
                <span
                  className='spinner-border spinner-border-sm mx-1'
                  role='status'
                  aria-hidden='true'
                />
              )}
              {t('imageToPixelArt.table')}
            </button>
          </div>
        </div>
        {/* display selectBlock */}
        <SelectBlock
          selectBlock={selectBlock}
          updateSelectBlock={updateSelectBlock}
          selectColorBlock={selectColorBlock}
          updateSelectColorBlock={setSelectColorBlock}
          count={selectedBlockCount}
        />
      </div>
    </div>
  )
}

export default ImageToPixelArt
