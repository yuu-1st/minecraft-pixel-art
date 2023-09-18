export type PositionArray = [
  positionX: number,
  positionY: number,
  positionZ: number
]

export interface FillCommandObject {
  fromX: number
  fromY: number
  fromZ: number
  toX: number
  toY: number
  toZ: number
  block: string
}

/**
 * Convert fill command to object
 * @param command fill command
 * @param defaultX default x
 * @param defaultY default y
 * @param defaultZ default z
 * @returns object
 */
export function convertToObject (
  command: string,
  defaultPosition: PositionArray = [0, 0, 0]
): FillCommandObject {
  const fillCommand = command.split(' ')
  if (fillCommand[0] !== '/fill' && fillCommand[0] !== 'fill') {
    throw new Error('The command is not fill command.')
  }
  if (fillCommand.length < 8) {
    throw new Error('The command is invalid.')
  }
  const positions = fillCommand.slice(1, 7)
  const block = fillCommand[7]
  const checkPosition = positions.map((position, index) => {
    if (position.length === 0) {
      throw new Error(`The position ${index} is empty.`)
    } else if (position === '~') {
      return defaultPosition[index % 3]
    } else if (position === '^') {
      throw new Error('The command is not support ^.')
    } else if (/^(~|\^)?-?\d+$/.test(position)) {
      if (position.startsWith('~')) {
        return defaultPosition[index % 3] + Number(position.slice(1))
      }
      if (position.startsWith('^')) {
        throw new Error('The command is not support ^.')
      }
      return Number(position)
    } else {
      throw new Error(`The position ${position} is invalid.`)
    }
  })
  return {
    fromX: checkPosition[0],
    fromY: checkPosition[1],
    fromZ: checkPosition[2],
    toX: checkPosition[3],
    toY: checkPosition[4],
    toZ: checkPosition[5],
    block
  }
}

/**
 * Read FillCommandObject, and fill the specified area of 2D array.
 * @param fillCommandObject FillCommandObject
 * @param targetArray 2D array to fill. You need to secure the required size in advance.
 * @param startX X coordinate of 0,0
 * @param startY Y coordinate of 0,0
 * @param planePosition Plane axis
 * @param planeTarget Plane axis value
 * @returns Filled 2D array
 */
export function addFillCommandObjectToArray (
  fillCommandObject: FillCommandObject,
  targetArray: string[][],
  startX: number,
  startY: number,
  planePosition: 'x' | 'y' | 'z',
  planeTarget: number
): string[][] {
  const { fromX, fromY, fromZ, toX, toY, toZ, block } = fillCommandObject
  const minX = Math.min(fromX, toX)
  const maxX = Math.max(fromX, toX)
  const minY = Math.min(fromY, toY)
  const maxY = Math.max(fromY, toY)
  const minZ = Math.min(fromZ, toZ)
  const maxZ = Math.max(fromZ, toZ)
  const firstMin = (planePosition === 'x' ? minY : minX) - startX
  const firstMax = (planePosition === 'x' ? maxY : maxX) - startX
  const secondMin = (planePosition === 'z' ? minY : minZ) - startY
  const secondMax = (planePosition === 'z' ? maxY : maxZ) - startY
  const planeMin =
    planePosition === 'x' ? minX : planePosition === 'y' ? minY : minZ
  const planeMax =
    planePosition === 'x' ? maxX : planePosition === 'y' ? maxY : maxZ

  if (!(planeMin <= planeTarget && planeTarget <= planeMax)) {
    return targetArray.map(row => [...row])
  }

  const fillArray = targetArray.map((row, rowIndex) => {
    if (rowIndex < firstMin || rowIndex > firstMax) {
      return row
    }
    return row.map((column, columnIndex) => {
      if (columnIndex < secondMin || columnIndex > secondMax) {
        return column
      }
      return block
    })
  })
  return fillArray
}
