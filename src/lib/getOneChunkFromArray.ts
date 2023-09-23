import { BlockCellData } from './convertToObject'
import { arrayMap } from './object'

/**
 * Returns an array of the specified chunk from BlockCellData.
 * @param blockCellData BlockCellData
 * @param chunkX The X-axis position of the chunk
 * @param chunkZ The Z-axis position of the chunk
 * @param startX The X coordinate of the starting point
 * @param startZ The Z coordinate of the starting point
 * @param defaultBlock The block data to use if no block exists at the target coordinates.
 * @returns An array of the specified chunk
 */
export function getOneChunkFromArray (
  blockCellData: BlockCellData[][],
  chunkX: number,
  chunkZ: number,
  startX: number = 0,
  startZ: number = 0,
  defaultBlock: BlockCellData = { blockName: '', blockNumber: -1 }
): BlockCellData[][] {
  const chunkArray = arrayMap(16, () =>
    arrayMap(16, () => ({ ...defaultBlock }))
  )
  const maxX = blockCellData.length
  const maxZ = blockCellData[0].length
  arrayMap(16, indexX => {
    arrayMap(16, indexZ => {
      const x = indexX + chunkX * 16 + startX
      const z = indexZ + chunkZ * 16 + startZ
      if (x >= 0 && x < maxX && z >= 0 && z < maxZ) {
        chunkArray[indexX][indexZ] = blockCellData[x - startX][z - startZ]
      }
    })
  })
  return chunkArray
}
