import { BlockCellData } from './convertToObject'
import { arrayMap } from './object'

/**
 * Returns an array of the specified chunk from BlockCellData.
 * @param blockCellData BlockCellData
 * @param vertical The vertical position of the chunk
 * @param horizontal The horizontal position of the chunk
 * @param startVertical The vertical coordinate of the starting point
 * @param startHorizontal The horizontal coordinate of the starting point
 * @param defaultBlock The block data to use if no block exists at the target coordinates.
 * @returns An array of the specified chunk
 */
export function getOneChunkFromArray (
  blockCellData: BlockCellData[][],
  vertical: number,
  horizontal: number,
  startVertical: number = 0,
  startHorizontal: number = 0,
  defaultBlock: BlockCellData = { blockName: '', blockNumber: -1 }
): BlockCellData[][] {
  const chunkArray = arrayMap(16, () =>
    arrayMap(16, () => ({ ...defaultBlock }))
  )
  const maxV = blockCellData.length
  const maxH = blockCellData[0].length
  arrayMap(16, indexV => {
    arrayMap(16, indexH => {
      const veIndex = indexV + vertical * 16 - startVertical
      const hIndex = indexH + horizontal * 16 - startHorizontal
      if (veIndex >= 0 && veIndex < maxV && hIndex >= 0 && hIndex < maxH) {
        chunkArray[indexV][indexH] = blockCellData[veIndex][hIndex]
      }
    })
  })
  return chunkArray
}
