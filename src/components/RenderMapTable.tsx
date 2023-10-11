import React from 'react'
import {
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { useTranslation } from 'react-i18next'
import { BlockCellData, MapBlockData } from '../lib/convertToObject'
import { getOneChunkFromArray } from '../lib/getOneChunkFromArray'
import { convertBlockKeyToName } from '../lib/minecraftDataFunction'
import { arrayMap } from '../lib/object'

const selectedBlockBackgroundStyle: React.CSSProperties = {
  backgroundColor: 'yellow'
}

const tdStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  overflow: 'hidden'
}

const tableStyle: React.CSSProperties = {
  tableLayout: 'fixed'
}

interface SquareCellTableTemplateProps {
  /**
   * The Element to be included in each cell.
   * Since tr and td and div to align strings in the center are automatically inserted, it only contains the rest.
   */
  cellItem: React.JSX.Element[][]
}

function SquareCellTableTemplate ({
  cellItem
}: SquareCellTableTemplateProps): React.JSX.Element {
  const body = cellItem.map((row, i) => (
    <tr key={i}>
      {row.map((cell, j) => (
        <td key={j} className='overflow-hidden p-0' style={tdStyle}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            {cell}
          </div>
        </td>
      ))}
    </tr>
  ))
  return (
    <Table striped bordered className='border-primary m-0' style={tableStyle}>
      <tbody>{body}</tbody>
    </Table>
  )
}

function CellData ({
  data,
  selectedBlock
}: {
  data: BlockCellData
  selectedBlock: BlockCellData | null
}): React.JSX.Element {
  if (data.blockNumber === -1) {
    return <>-</>
  }
  const body = (
    <div
      className='h-100 w-100 d-flex justify-content-center align-items-center'
      {...(selectedBlock?.blockNumber === data.blockNumber
        ? { style: selectedBlockBackgroundStyle }
        : {})}
    >
      {data.blockNumber}
    </div>
  )
  const blockName = convertBlockKeyToName(data.blockName)
  return (
    <OverlayTrigger
      placement='top'
      overlay={<Tooltip id='tooltip-top'>{blockName}</Tooltip>}
    >
      {body}
    </OverlayTrigger>
  )
}

interface RenderTableMapOneChunkProps {
  /** Table data. */
  tableData: BlockCellData[][]
  /** Function to display side information. */
  showSideInfo: (items: BlockCellData[][]) => void
  /** The currently selected block. */
  selectedBlock: BlockCellData | null
  /** horizontal coordinate of the chunk to display. */
  chunkHorizontal: number
  /** vertical coordinate of the chunk to display. */
  chunkVertical: number
}

function RenderTableMapOneChunk ({
  tableData,
  showSideInfo,
  selectedBlock,
  chunkHorizontal,
  chunkVertical
}: RenderTableMapOneChunkProps): React.JSX.Element {
  const table = arrayMap(tableData.length, v => {
    return tableData[v].map((data, h) => {
      return <CellData key={h} data={data} selectedBlock={selectedBlock} />
    })
  })
  return (
    <div onClick={() => showSideInfo(tableData)}>
      <SquareCellTableTemplate cellItem={table} />
    </div>
  )
}

function MapTableCoordinateHorizontal ({
  chunkHorizontal,
  baseHorizontal
}: {
  chunkHorizontal: number
  baseHorizontal: number
}): React.JSX.Element {
  const table = (
    <SquareCellTableTemplate
      cellItem={[
        arrayMap(16, i => {
          return (
            <React.Fragment key={i}>
              {chunkHorizontal * 16 + i + baseHorizontal}
            </React.Fragment>
          )
        })
      ]}
    />
  )
  return (
    <th key={chunkHorizontal} className='p-0'>
      {table}
    </th>
  )
}

function MapTableCoordinateVertical ({
  chunkVertical,
  baseVertical
}: {
  chunkVertical: number
  baseVertical: number
}): React.JSX.Element {
  return (
    <SquareCellTableTemplate
      cellItem={arrayMap(16, i => {
        return [
          <React.Fragment key={i}>
            {chunkVertical * 16 + i + baseVertical}
          </React.Fragment>
        ]
      })}
    />
  )
}

function RenderTable ({
  tableData,
  showSideInfo,
  selectedBlock,
  baseVertical,
  baseHorizontal
}: {
  tableData: BlockCellData[][]
  showSideInfo: (items: BlockCellData[][]) => void
  selectedBlock: BlockCellData | null
  baseVertical: number
  baseHorizontal: number
}): React.JSX.Element {
  function getChunkCount (start: number, end: number): number {
    const startChunk = Math.floor(start / 16)
    const endChunk = Math.floor(end / 16)
    const chunkCount = endChunk - startChunk + 1
    return chunkCount
  }
  const useChunkVertical = getChunkCount(baseVertical, baseVertical + tableData.length - 1)
  const useChunkHorizontal = getChunkCount(baseHorizontal, baseHorizontal + tableData[0].length - 1)
  const hAxis = (
    <tr>
      <th style={{ position: 'sticky', left: 0 }} className='p-0'>
        <SquareCellTableTemplate
          cellItem={[[<React.Fragment key='cellItemKey'> </React.Fragment>]]}
        />
      </th>
      {arrayMap(useChunkHorizontal, h => {
        return (
          <MapTableCoordinateHorizontal
            key={`h-${h}`}
            chunkHorizontal={h}
            baseHorizontal={Math.floor(baseHorizontal / 16) * 16}
          />
        )
      })}
    </tr>
  )
  const tbody = arrayMap(useChunkVertical, v => {
    const vAxis = (
      <th
        key={`th-${v}`}
        style={{ position: 'sticky', left: 0 }}
        className='p-0'
      >
        <MapTableCoordinateVertical
          chunkVertical={v}
          baseVertical={Math.floor(baseVertical / 16) * 16}
        />
      </th>
    )
    const chunkV = Math.floor(baseVertical / 16) + v
    const chunk = arrayMap(useChunkHorizontal, h => {
      const chunkH = Math.floor(baseHorizontal / 16) + h
      return (
        <td key={`td-${v * useChunkHorizontal + h}`} className='p-0'>
          <RenderTableMapOneChunk
            tableData={getOneChunkFromArray(
              tableData,
              chunkV,
              chunkH,
              baseVertical,
              baseHorizontal
            )}
            showSideInfo={showSideInfo}
            selectedBlock={selectedBlock}
            chunkHorizontal={v}
            chunkVertical={h}
          />
        </td>
      )
    })
    return (
      <tr key={`hb-${v}`}>
        {vAxis}
        {chunk}
      </tr>
    )
  })
  return (
    <Table bordered className='m-0 bg-primary'>
      <thead className='bg-white sticky-top p-0'>{hAxis}</thead>
      <tbody>{tbody}</tbody>
    </Table>
  )
}

function ZoomControl ({
  zoom,
  setZoom
}: {
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
}): React.JSX.Element {
  const { t } = useTranslation()
  return (
    <div className='row m-0'>
      <div className='col-auto'>{t('zoom')}</div>
      <div className='col'>
        <input
          type='range'
          className='form-range'
          min='0.1'
          max='2'
          step='0.1'
          value={zoom}
          onChange={e => setZoom(Number(e.target.value))}
        />
      </div>
      <div className='col-auto'>{t('times', { count: zoom })}</div>
    </div>
  )
}

interface RenderSideInfoProps {
  /** Whether to display the side information. */
  showSideInfo: boolean
  /** Hide the button. */
  disableShowSideInfo: () => void
  /** Receive an array of items to display in SideInfo. */
  items: BlockCellData[][]
  /** The currently selected block. */
  selectedBlock: BlockCellData | null
  /** Update the selected block. */
  updateSelectBlock: (block: BlockCellData) => void
}

function RenderSideInfo ({
  showSideInfo,
  disableShowSideInfo,
  items,
  selectedBlock,
  updateSelectBlock
}: RenderSideInfoProps): React.JSX.Element {
  const sideInfoStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '20vw',
    height: '100vh',
    backgroundColor: 'lightgray'
  }
  // Count the number of each BlockCellData included in items and remove duplicates
  const itemFlat = items.flat()
  const itemLists = itemFlat.reduce<Array<BlockCellData & { count: number }>>(
    (acc, cur) => {
      const index = acc.findIndex(item => item.blockNumber === cur.blockNumber)
      if (index === -1) {
        const blockName = convertBlockKeyToName(cur.blockName)
        acc.push({ ...cur, count: 1, blockName })
      } else {
        acc[index].count += 1
      }
      return acc
    },
    []
  )

  if (showSideInfo) {
    return (
      <div className='position-relative'>
        <div style={sideInfoStyle}>
          {/* Display the close button to be hidden */}
          <button
            type='button'
            className='btn-close top-0 end-0 m-2'
            aria-label='Close'
            onClick={() => disableShowSideInfo()}
          />
          <div className='overflow-auto' style={{ height: '100vh' }}>
            {/* Display list of blockNumber and blockName based on itemList */}
            <ul className='p-1'>
              {itemLists.map((item, i) => {
                return (
                  <ListGroup key={i}>
                    <ListGroupItem
                      className='justify-content-center align-items-center'
                      {...(selectedBlock?.blockNumber === item.blockNumber
                        ? { style: selectedBlockBackgroundStyle }
                        : {})}
                      onClick={() => updateSelectBlock(item)}
                    >
                      <div className='row'>
                        <div className='col-auto justify-content-center'>
                          {item.blockNumber}
                        </div>
                        <div className='col'>
                          {item.blockName} ({item.count})
                        </div>
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

interface RenderMapTableProps {
  /** Data of the table to be displayed. */
  tableItem: MapBlockData
}

function RenderMapTable ({ tableItem }: RenderMapTableProps): React.JSX.Element {
  const { t } = useTranslation()
  const [zoom, setZoom] = React.useState(1)
  const [showSideInfo, setShowSideInfo] = React.useState(false)
  const [items, setItems] = React.useState<BlockCellData[][]>([])
  const [targetItem, setTargetItem] = React.useState<BlockCellData | null>(null)
  return (
    <div className='App'>
      <header className='App-header'>{t('tableTitle')}</header>
      <ZoomControl zoom={zoom} setZoom={setZoom} />
      <div
        className='table-responsive overflow-scroll'
        style={{
          transform: `scale(${zoom})`,
          height: `${100 / zoom}vh`,
          width: `${100 / zoom}vw`,
          transformOrigin: 'top left'
        }}
      >
        <RenderTable
          tableData={tableItem.blockMap}
          showSideInfo={(items: BlockCellData[][]) => {
            setShowSideInfo(true)
            setItems(items)
          }}
          selectedBlock={targetItem}
          baseVertical={tableItem.minZ}
          baseHorizontal={tableItem.minX}
        />
      </div>
      <RenderSideInfo
        showSideInfo={showSideInfo}
        disableShowSideInfo={() => {
          setShowSideInfo(false)
          setTargetItem(null)
        }}
        selectedBlock={targetItem}
        updateSelectBlock={(block: BlockCellData) => setTargetItem(block)}
        items={items}
      />
    </div>
  )
}
export default RenderMapTable
