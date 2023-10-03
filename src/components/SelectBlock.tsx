import React from 'react'
import {
  minecraftColorData,
  minecraftBlockData,
  colorBlockData
} from '../lib/minecraftColorData'

const none: 'none' = 'none'

interface ShowColorBoxProps<I extends number> {
  colorData: typeof minecraftColorData[number]
  block: 'none' | typeof minecraftColorData[I]['block'][number]
  setBlock: (
    block: 'none' | typeof minecraftColorData[I]['block'][number]
  ) => void
}

function ShowColorBox ({
  colorData,
  block,
  setBlock
}: ShowColorBoxProps<number>): JSX.Element {
  return (
    <div className='row my-3'>
      {/* show box to display color */}
      <div
        className='col-auto mx-2 d-flex justify-content-center align-items-center p-0'
        style={{
          width: '30px',
          height: '30px'
        }}
      >
        <div
          className={`${block !== 'none' ? 'border border-2 border-dark' : ''}`}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: `rgb(${colorData.color.r},${colorData.color.g},${colorData.color.b})`
          }}
        />
      </div>
      {/* Select the block to use in that color */}
      <select
        className='col mx-2'
        onChange={e => {
          setBlock(e.target.value as any)
        }}
        value={block}
      >
        {[none, ...colorData.block].map(blockData => {
          const block = minecraftBlockData[blockData]
          return (
            <option key={blockData} value={blockData}>
              {block.name.ja}
            </option>
          )
        })}
      </select>
    </div>
  )
}

function SetColorBlock ({
  block,
  setBlock
}: {
  block: typeof colorBlockData[number]['key']
  setBlock: (block: typeof colorBlockData[number]['key']) => void
}): JSX.Element {
  return (
    <div className='row my-3'>
      {/* Display a box to display the color */}
      <div
        className='col-auto mx-2 d-flex justify-content-center align-items-center p-0'
        style={{
          width: '30px',
          height: '30px'
        }}
      />
      {/* Select the block to use in that color */}
      <select
        className='col mx-2'
        onChange={e => {
          setBlock(e.target.value as any)
        }}
        value={block}
      >
        {colorBlockData.map(blockData => {
          return (
            <option key={blockData.id} value={blockData.key}>
              {blockData.name.ja}
            </option>
          )
        })}
      </select>
    </div>
  )
}

type SetBlockType = 'none' | typeof minecraftColorData[number]['block'][number]

interface SelectBlockProps {
  selectBlock: SetBlockType[]
  updateSelectBlock: <I extends number>(
    index: I,
    block: 'none' | typeof minecraftColorData[I]['block'][number]
  ) => void
  selectColorBlock: typeof colorBlockData[number]['key']
  updateSelectColorBlock: (block: typeof colorBlockData[number]['key']) => void
}

function SelectBlock ({
  selectBlock,
  updateSelectBlock,
  selectColorBlock,
  updateSelectColorBlock
}: SelectBlockProps): JSX.Element {
  return (
    <div className='m-3'>
      <SetColorBlock
        block={selectColorBlock}
        setBlock={block => {
          updateSelectColorBlock(block)
        }}
      />
      {minecraftColorData.map((colorData, index) => {
        return (
          <ShowColorBox
            key={colorData.key}
            colorData={colorData}
            block={selectBlock[index]}
            setBlock={block => {
              updateSelectBlock(index, block)
            }}
          />
        )
      })}
    </div>
  )
}

export default SelectBlock
