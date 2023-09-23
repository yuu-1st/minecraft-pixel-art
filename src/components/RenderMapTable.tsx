import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { useTranslation } from 'react-i18next'
import { BlockCellData } from '../lib/convertToObject'
import { getOneChunkFromArray } from '../lib/getOneChunkFromArray'
import { arrayMap } from '../lib/object'

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

function CellData ({ data }: { data: BlockCellData }): React.JSX.Element {
  if (data.blockNumber === -1) {
    return <>-</>
  }
  return (
    <OverlayTrigger
      placement='top'
      overlay={<Tooltip id='tooltip-top'>{data.blockName}</Tooltip>}
    >
      <div>{data.blockNumber}</div>
    </OverlayTrigger>
  )
}

interface RenderTableMapOneChunkProps {
  /** Table data. */
  tableData: BlockCellData[][]
  /** X coordinate of the chunk to display. */
  chunkX: number
  /** Z coordinate of the chunk to display. */
  chunkZ: number
}

function RenderTableMapOneChunk ({
  tableData,
  chunkX,
  chunkZ
}: RenderTableMapOneChunkProps): React.JSX.Element {
  // exchange x and z because they have been reversed
  const table = arrayMap(tableData.length, z => {
    return tableData.map((data, x) => {
      return <CellData key={x} data={data[z]} />
    })
  })
  return <SquareCellTableTemplate cellItem={table} />
}

function MapTableCoordinateX ({
  chunkX,
  baseX
}: {
  chunkX: number
  baseX: number
}): React.JSX.Element {
  const table = (
    <SquareCellTableTemplate
      cellItem={[
        arrayMap(16, i => {
          return (
            <React.Fragment key={i}>{chunkX * 16 + i + baseX}</React.Fragment>
          )
        })
      ]}
    />
  )
  return (
    <th key={chunkX} className='p-0'>
      {table}
    </th>
  )
}

function MapTableCoordinateZ ({
  chunkZ,
  baseZ
}: {
  chunkZ: number
  baseZ: number
}): React.JSX.Element {
  const table = (
    <SquareCellTableTemplate
      cellItem={arrayMap(16, i => {
        return [
          <React.Fragment key={i}>{chunkZ * 16 + i + baseZ}</React.Fragment>
        ]
      })}
    />
  )
  return (
    <th key={chunkZ} className='p-0'>
      {table}
    </th>
  )
}

function RenderTable ({
  tableData
}: {
  tableData: BlockCellData[][]
}): React.JSX.Element {
  const chunkX = Math.ceil(tableData.length / 16)
  const chunkZ = Math.ceil(tableData[0].length / 16)
  const xAxis = (
    <tr>
      <th style={{ position: 'sticky', left: 0 }} className='p-0'>
        <SquareCellTableTemplate
          cellItem={[[<React.Fragment key='cellItemKey'> </React.Fragment>]]}
        />
      </th>
      {arrayMap(chunkX, x => {
        return <MapTableCoordinateX key={x} chunkX={x} baseX={0} />
      })}
    </tr>
  )
  const tbody = arrayMap(chunkZ, z => {
    const zAxis = (
      <th style={{ position: 'sticky', left: 0 }} className='p-0'>
        <MapTableCoordinateZ chunkZ={z} baseZ={0} />
      </th>
    )
    const chunk = arrayMap(chunkX, x => {
      return (
        <td key={z} className='p-0'>
          <RenderTableMapOneChunk
            key={z * chunkZ + x}
            tableData={getOneChunkFromArray(tableData, x, z)}
            chunkX={x}
            chunkZ={z}
          />
        </td>
      )
    })
    return (
      <tr key={z}>
        {zAxis}
        {chunk}
      </tr>
    )
  })
  return (
    <Table bordered className='m-0 bg-primary'>
      <thead className='bg-white sticky-top p-0'>{xAxis}</thead>
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
    <div className='row'>
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

interface RenderMapTableProps {
  /** Data of the table to be displayed. */
  tableItem: BlockCellData[][]
}

function RenderMapTable ({ tableItem }: RenderMapTableProps): React.JSX.Element {
  const { t } = useTranslation()
  const [zoom, setZoom] = React.useState(1)
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
        <RenderTable tableData={tableItem} />
      </div>
    </div>
  )
}
export default RenderMapTable
