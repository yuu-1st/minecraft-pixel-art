import { useTranslation } from 'react-i18next'
import { getLanguage } from '../lib/i18n'
import { colorBlockData, minecraftColorData } from '../lib/minecraftColorData'
import { convertBlockKeyToName } from '../lib/minecraftDataFunction'

const none: 'none' = 'none'

interface ShowColorBoxProps<I extends number> {
  colorData: typeof minecraftColorData[number]
  block: 'none' | typeof minecraftColorData[I]['block'][number]
  setBlock: (
    block: 'none' | typeof minecraftColorData[I]['block'][number]
  ) => void
  count: number
}

function ShowColorBox ({
  colorData,
  block,
  setBlock,
  count
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
      <div className='col mx-2'>
        <select
          className='form-select w-100'
          onChange={e => {
            setBlock(e.target.value as any)
          }}
          value={block}
        >
          {[none, ...colorData.block].map(blockData => {
            return (
              <option key={blockData} value={blockData}>
                {convertBlockKeyToName(blockData)}
              </option>
            )
          })}
        </select>
      </div>
      <div className='col-auto w-25 mx-2'>{count}</div>
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
  const { t } = useTranslation()
  return (
    <div className='row my-3'>
      {/* Display a box to display the color */}
      <div
        className='col mx-2 p-0'
      >
        {t('selectBlock.dyeSelect')} :
      </div>
      {/* Select the block to use in that color */}
      <select
        className='col mx-2 form-select'
        onChange={e => {
          setBlock(e.target.value as any)
        }}
        value={block}
      >
        {colorBlockData.map(blockData => {
          return (
            <option key={blockData.id} value={blockData.key}>
              {blockData.name[getLanguage()]}
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
  count: number[]
}

function SelectBlock ({
  selectBlock,
  updateSelectBlock,
  selectColorBlock,
  updateSelectColorBlock,
  count
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
            count={count[index]}
          />
        )
      })}
    </div>
  )
}

export default SelectBlock
